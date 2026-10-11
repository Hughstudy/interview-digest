# Scans InterviewMarkdown/*.md and writes manifest.json for the homepage.
#   yyyy-mm-dd.md        -> kind "daily"
#   yyyy-mm-dd-topic.md  -> kind "extra"
# Works in Windows PowerShell 5.1 and PowerShell 7 (used by the GitHub Actions workflow).
param(
  [string]$ContentDir = (Join-Path $PSScriptRoot '..\InterviewMarkdown'),
  [string]$OutFile    = (Join-Path $PSScriptRoot '..\manifest.json'),
  [int]$CharsPerMinute = 450
)

$ErrorActionPreference = 'Stop'
$utf8 = New-Object System.Text.UTF8Encoding $false

# Plain-text version of an inline markdown snippet
function Remove-Markdown([string]$s) {
  $s = $s -replace '!\[[^\]]*\]\([^)]*\)', ''
  $s = $s -replace '\[([^\]]+)\]\([^)]*\)', '$1'
  $s = $s -replace '[*_`]{1,3}', ''
  $s = $s -replace '\\([\\`*_{}\[\]()#+\-.!~|>])', '$1'
  return $s.Trim()
}

# Header fields like "<label><colon> value", with or without bold markers (labels are built from char codes so this file stays ASCII)
$zh = { param([int[]]$codes) -join ($codes | ForEach-Object { [char]$_ }) }
$colon = & $zh 0xFF1A                                          # full-width colon
function Get-FieldPattern([string]$keys) { "^\s*\**\s*(?:$keys)\s*\**\s*[$colon" + ':]\s*\**\s*(.+?)\s*$' }
$summaryKey = Get-FieldPattern ((& $zh 0x4E00,0x53E5,0x8BDD,0x63A8,0x8350) + '|' + (& $zh 0x6458,0x8981) + '|TL;?DR|Summary')  # one-line recommendation / abstract
$videoKey   = Get-FieldPattern (& $zh 0x6807,0x9898)           # video title
$showKey    = Get-FieldPattern (& $zh 0x8282,0x76EE)           # show / programme
$headerLines = 60                                              # fields are only read from the top of the file

$entries = @()
foreach ($file in Get-ChildItem -LiteralPath $ContentDir -Filter '*.md' -File) {
  $slug = [System.IO.Path]::GetFileNameWithoutExtension($file.Name)
  if ($slug -notmatch '^(\d{4}-\d{2}-\d{2})(?:-(.+))?$') {
    Write-Warning "Skipping $($file.Name): name must start with yyyy-mm-dd"
    continue
  }
  $date = $Matches[1]
  $kind = if ($Matches[2]) { 'extra' } else { 'daily' }

  $text  = [System.IO.File]::ReadAllText($file.FullName, $utf8)
  $lines = $text -split "`r?`n"

  $title = ''
  $summary = ''
  $fallback = ''
  $videoTitle = ''
  $show = ''
  $n = 0
  foreach ($line in $lines) {
    if (++$n -gt $headerLines -and $title) { break }
    if (-not $title -and $line -match '^\s*#\s+(.+?)\s*#*\s*$') { $title = Remove-Markdown $Matches[1]; continue }
    if (-not $videoTitle -and $line -match $videoKey) { $videoTitle = Remove-Markdown $Matches[1]; continue }
    if (-not $show -and $line -match $showKey) { $show = Remove-Markdown $Matches[1]; continue }
    if (-not $summary -and $line -match $summaryKey) { $summary = Remove-Markdown $Matches[1]; continue }
    if (-not $fallback -and $line.Trim() -and $line -notmatch '^\s*([#|>\-*+]|\d+\.|```|---)' -and $line -notmatch '^\s*\*\*') {
      $fallback = Remove-Markdown $line
    }
  }
  if (-not $summary) { $summary = $fallback }
  if ($summary.Length -gt 220) { $summary = $summary.Substring(0, 218).TrimEnd() + '...' }
  # "Show (host...)" -> "Show"
  $show = ($show -replace '\s*[\(\uFF08].*$', '').Trim()

  $chars = ($text -replace '[\s#*|>`\-\[\]()_~]', '').Length

  $entries += [pscustomobject][ordered]@{
    slug        = $slug
    file        = $file.Name
    date        = $date
    kind        = $kind
    title       = $title
    videoTitle  = $videoTitle
    show        = $show
    summary     = $summary
    chars       = $chars
    readMinutes = [Math]::Max(1, [int][Math]::Round($chars / $CharsPerMinute))
  }
}

# Newest first; on the same day the daily digest comes before extras
$entries = @($entries | Sort-Object -Property `
  @{ Expression = 'date'; Descending = $true },
  @{ Expression = { if ($_.kind -eq 'daily') { 0 } else { 1 } } },
  @{ Expression = 'slug' })

$manifest = [ordered]@{
  generated = (Get-Date).ToUniversalTime().ToString('yyyy-MM-ddTHH:mm:ssZ')
  count     = $entries.Count
  entries   = $entries
}
$json = ConvertTo-Json -InputObject $manifest -Depth 5
[System.IO.File]::WriteAllText([System.IO.Path]::GetFullPath($OutFile), $json, $utf8)
Write-Host "manifest.json: $($entries.Count) entries"
