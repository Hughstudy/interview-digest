#!/usr/bin/env python3
"""Scans InterviewMarkdown/*.md and writes manifest.json for the homepage.

Python port of scripts/build-manifest.ps1 (byte-for-byte logic, verified against
the Actions-generated manifest). Run on Pi5 before git push; the result is
committed, so GitHub Pages branch deployment needs no runner.

  yyyy-mm-dd.md        -> kind "daily"
  yyyy-mm-dd-topic.md  -> kind "extra"
"""
import json
import math
import re
import sys
import urllib.parse
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONTENT_DIR = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "InterviewMarkdown"
OUT_FILE = Path(sys.argv[2]) if len(sys.argv) > 2 else ROOT / "manifest.json"
CHARS_PER_MINUTE = 450
HEADER_LINES = 60

# PowerShell uses case-insensitive -match / -replace; mirror that.
RE_I = re.IGNORECASE

# --- Remove-Markdown: plain-text version of an inline markdown snippet -------
def remove_markdown(s: str) -> str:
    s = re.sub(r"!\[[^\]]*\]\([^)]*\)", "", s)          # images
    s = re.sub(r"\[([^\]]+)\]\([^)]*\)", r"\1", s)      # links -> text
    s = re.sub(r"[*_`]{1,3}", "", s)                    # emphasis
    s = re.sub(r"\\([\\`*_{}\[\]()#+\-.!~|>])", r"\1", s)  # escapes
    return s.strip()

# --- Field patterns (labels like "**标题：** value") --------------------------
COLON = "："  # full-width colon, U+FF1A

def field_pattern(keys: str) -> re.Pattern:
    return re.compile(
        r"^\s*\**\s*(?:" + keys + r")\s*\**\s*[" + COLON + r":]\s*\**\s*(.+?)\s*$",
        RE_I,
    )

SUMMARY_KEY = field_pattern("一句话推荐|摘要|TL;?DR|Summary")
VIDEO_KEY = field_pattern("标题")
SHOW_KEY = field_pattern("节目")

TITLE_RE = re.compile(r"^\s*#\s+(.+?)\s*#*\s*$", RE_I)
FALLBACK_EXCLUDE_RE = re.compile(r"^\s*([#|>\-*+]|\d+\.|```|---)", RE_I)
FALLBACK_BOLD_RE = re.compile(r"^\s*\*\*", RE_I)
SHOW_STRIP_RE = re.compile(r"\s*[\(\uFF08].*$")
CHARS_STRIP_RE = re.compile(r"[\s#*|>`\-\[\]()_~]")
SLUG_RE = re.compile(r"^(\d{4}-\d{2}-\d{2})(?:-(.+))?$")

def utf16_len(s: str) -> int:
    # PowerShell/.NET string .Length counts UTF-16 code units (emoji = 2).
    return len(s.encode("utf-16-le", "surrogatepass")) // 2

def build_entry(path: Path) -> dict | None:
    slug = path.stem
    m = SLUG_RE.match(slug)
    if not m:
        print(f"WARNING: skipping {path.name}: name must start with yyyy-mm-dd", file=sys.stderr)
        return None
    date, topic = m.group(1), m.group(2)
    kind = "extra" if topic else "daily"

    text = path.read_text(encoding="utf-8")
    lines = re.split(r"\r?\n", text)

    title = summary = fallback = video_title = show = ""
    n = 0
    for line in lines:
        n += 1
        if n > HEADER_LINES and title:
            break
        if not title:
            m = TITLE_RE.match(line)
            if m:
                title = remove_markdown(m.group(1))
                continue
        if not video_title:
            m = VIDEO_KEY.match(line)
            if m:
                video_title = remove_markdown(m.group(1))
                continue
        if not show:
            m = SHOW_KEY.match(line)
            if m:
                show = remove_markdown(m.group(1))
                continue
        if not summary:
            m = SUMMARY_KEY.match(line)
            if m:
                summary = remove_markdown(m.group(1))
                continue
        if not fallback and line.strip() and not FALLBACK_EXCLUDE_RE.match(line) and not FALLBACK_BOLD_RE.match(line):
            fallback = remove_markdown(line)

    if not summary:
        summary = fallback
    if utf16_len(summary) > 220:
        summary = summary[:218].rstrip() + "..."  # may split a surrogate pair, as PowerShell does
    show = SHOW_STRIP_RE.sub("", show).strip()

    chars = utf16_len(CHARS_STRIP_RE.sub("", text))
    read_minutes = max(1, round(chars / CHARS_PER_MINUTE))  # round-half-to-even, same as [Math]::Round

    return {
        "slug": slug,
        "file": path.name,
        "date": date,
        "kind": kind,
        "title": title,
        "videoTitle": video_title,
        "show": show,
        "summary": summary,
        "chars": chars,
        "readMinutes": read_minutes,
    }

def main() -> None:
    entries = []
    for path in sorted(CONTENT_DIR.glob("*.md")):
        entry = build_entry(path)
        if entry is not None:
            entries.append(entry)

    # Newest first; same day: daily before extras; then by slug.
    # (Three stable sorts in reverse priority order == PS Sort-Object multi-key.)
    entries.sort(key=lambda e: e["slug"])
    entries.sort(key=lambda e: 0 if e["kind"] == "daily" else 1)
    entries.sort(key=lambda e: e["date"], reverse=True)

    manifest = {
        "generated": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "count": len(entries),
        "entries": entries,
    }
    OUT_FILE.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"manifest.json: {len(entries)} entries")

if __name__ == "__main__":
    main()
