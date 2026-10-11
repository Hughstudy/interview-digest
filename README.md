# Interview Digest

A static reader for the daily AI-fetched markdown reports, hosted on GitHub Pages.

```
InterviewMarkdown/
  2026-10-05.md                          # daily digest      -> "Daily · 日报"
  2026-10-05-datacenter-cost-breakdown.md  # additional report -> "Extra · 加更"
```

- **Homepage** (`index.html`) shows the latest entry, plus a searchable archive grouped by month with All / Daily / Extra filters.
- **Reader** (`read.html?f=<file-name-without-.md>`) renders the markdown with a table of contents, reading progress, and older/newer links.
- The first `# Heading` becomes the title. A line like `一句话推荐： …` (or `摘要：`, `TL;DR:`, `Summary:`) becomes the card summary; otherwise the first paragraph is used.
- Links to other `.md` files open in the reader.

## How it works

`scripts/build-manifest.ps1` scans `InterviewMarkdown/` and writes `manifest.json` (title, date, type, summary, length) for the homepage. You don't commit it: the workflow in `.github/workflows/deploy.yml` builds it and deploys the site on every push to `main`.

## One-time GitHub setup

1. Create a repo and push this folder to `main`.
2. In the repo, go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
3. The site will be at `https://<user>.github.io/<repo>/`.

After that, a new markdown file pushed to `InterviewMarkdown/` (by you or your AI job) shows up about a minute later.

## Local preview

```powershell
powershell -ExecutionPolicy Bypass -File scripts/serve.ps1
```

Then open http://localhost:8080. The manifest is rebuilt on every page load, so new files appear when you refresh.

## Customize

The site name, wordmark, and tagline are in `CONFIG` at the top of `assets/app.js`. Colors and fonts are CSS variables at the top of `assets/style.css`.
