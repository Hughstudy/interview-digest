/* AI PodCast — static markdown reader for GitHub Pages.
 * Homepage (index.html) lists entries from manifest.json; read.html renders one file.
 * manifest.json is produced by scripts/build-manifest.ps1 (run locally or by the deploy workflow).
 */

const CONFIG = {
  siteName: "AI PodCast",
  wordmark: ["AI", "PodCast"],
  tagline: "AI 每日抓取 · 长访谈精读",
  contentDir: "InterviewMarkdown/",
  manifest: "manifest.json",
  charsPerMinute: 450,
  spiralCount: 12, // most recent reports placed on the homepage spiral
};

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const MONTHS_LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const WEEKDAYS_ZH = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

const $ = (sel, root = document) => root.querySelector(sel);

function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/* Per-letter spans; the motion layer animates these */
function letters(word) {
  return [...word].map((c) => `<span class="wm-l">${esc(c)}</span>`).join("");
}

/* Tell the motion layer (motion.js) that new content is in the DOM */
function emit(what) {
  document.dispatchEvent(new CustomEvent("digest:render", { detail: { what } }));
}

function readUrl(slug) {
  return `read.html?f=${encodeURIComponent(slug)}`;
}

function dateParts(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  const wd = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return {
    y, m, d,
    mm: String(m).padStart(2, "0"),
    dd: String(d).padStart(2, "0"),
    mon: MONTHS[m - 1],
    monthLong: MONTHS_LONG[m - 1],
    wd: WEEKDAYS[wd],
    wdZh: WEEKDAYS_ZH[wd],
  };
}

/* Derive date/kind from a filename like 2026-10-05.md or 2026-10-05-some-topic.md */
function parseSlug(slug) {
  const m = /^(\d{4}-\d{2}-\d{2})(?:-(.+))?$/.exec(slug);
  if (!m) return { slug, date: null, kind: "note", topic: slug };
  return { slug, date: m[1], kind: m[2] ? "extra" : "daily", topic: m[2] || "" };
}

/* "📹 长访谈加更 | 2026-10-05 · 数据中心的真实账单" -> { kicker: "长访谈加更", headline: "数据中心的真实账单" } */
function splitTitle(title, entry) {
  let t = String(title || "")
    .replace(/^[\p{Extended_Pictographic}\u{FE0F}\u{200D}\s]+/u, "")
    .replace(/\d{4}[-/.]\d{1,2}[-/.]\d{1,2}/g, "")
    .trim();
  const parts = t.split(/\s*[|｜·•]\s*/).map((s) => s.trim()).filter(Boolean);
  if (parts.length > 1) return { kicker: parts.slice(0, -1).join(" · "), headline: parts[parts.length - 1] };
  if (parts.length === 1) return { kicker: "", headline: parts[0] };
  if (entry && entry.kind === "extra") return { kicker: "", headline: entry.topic.replace(/[-_]+/g, " ") };
  return { kicker: "", headline: "每日精选" };
}

/* Display title for an entry: the video's 标题 (from 视频信息) when the report has one, since the
 * first heading of daily reports is the same every day. The show name (节目) becomes the label. */
function titleOf(entry) {
  const h1 = splitTitle(entry.title, entry);
  if (!entry.videoTitle) return h1;
  return { kicker: entry.show || [h1.kicker, h1.headline].filter(Boolean).join(" · "), headline: entry.videoTitle };
}

/* Same fields read straight from markdown, for the reader when manifest.json is unavailable */
function headerField(md, label) {
  const head = md.split(/\r?\n/).slice(0, 60).join("\n");
  const m = new RegExp(`^\\s*\\**\\s*${label}\\s*\\**\\s*[：:]\\s*\\**\\s*(.+?)\\s*$`, "m").exec(head);
  return m ? m[1].replace(/[*_`]/g, "").trim() : "";
}

function kindBadge(kind) {
  if (kind === "extra") return `<span class="badge is-extra">Extra · 加更</span>`;
  if (kind === "daily") return `<span class="badge">Daily · 日报</span>`;
  return `<span class="badge">Note</span>`;
}

async function loadManifest() {
  try {
    const res = await fetch(CONFIG.manifest, { cache: "no-cache" });
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();
    return Array.isArray(data) ? data : data.entries || [];
  } catch (e) {
    console.warn("manifest.json unavailable:", e);
    return null;
  }
}

/* --------------------------------------------------------------------------
   Shared chrome: theme, ruler, progress, back-to-top
   -------------------------------------------------------------------------- */

function initTheme() {
  const btn = $("#theme-toggle");
  if (!btn) return;
  const root = document.documentElement;
  const current = () =>
    root.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const paint = () => {
    btn.innerHTML = current() === "dark"
      ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>`
      : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>`;
    btn.setAttribute("aria-label", current() === "dark" ? "Switch to light theme" : "Switch to dark theme");
  };
  btn.addEventListener("click", () => {
    root.dataset.theme = current() === "dark" ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
    paint();
  });
  paint();
}

function initScrollChrome() {
  const mark = $(".ruler-mark");
  const label = mark && mark.querySelector("span");
  const bar = $(".progress");
  const top = $(".to-top");
  const navH = 44;
  const update = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
    if (mark) {
      mark.style.top = `${p * (innerHeight - navH - 1)}px`;
      label.textContent = String(Math.round(p * 100)).padStart(2, "0");
    }
    if (bar) bar.style.width = `${p * 100}%`;
    if (top) top.classList.toggle("is-visible", scrollY > innerHeight * 1.2);
  };
  addEventListener("scroll", update, { passive: true });
  addEventListener("resize", update);
  if (top) top.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));
  update();
  return update;
}

function setLatestLink(entries) {
  const cta = $("#nav-latest");
  if (cta && entries && entries.length) cta.href = readUrl(entries[0].slug);
  const meta = $("#nav-date");
  if (meta) {
    const now = new Date();
    meta.textContent = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}.${String(now.getDate()).padStart(2, "0")} · ${WEEKDAYS[now.getDay()]}`;
  }
}

/* --------------------------------------------------------------------------
   Homepage
   -------------------------------------------------------------------------- */

async function initHome() {
  const wm = $("#wordmark");
  wm.setAttribute("aria-label", CONFIG.wordmark.join(" "));
  wm.innerHTML = CONFIG.wordmark
    .map((w, i) => `<span class="wm-word${i % 2 ? " is-outline" : ""}" aria-hidden="true">${letters(w)}</span>`)
    .join("");
  $("#tagline").textContent = CONFIG.tagline;

  const entries = await loadManifest();
  setLatestLink(entries);

  if (!entries || !entries.length) {
    const msg = entries
      ? `<p>还没有内容。把 Markdown 放进 <code>${esc(CONFIG.contentDir)}</code> 后重新生成 manifest。</p>`
      : `<p>找不到 <code>manifest.json</code>。本地请运行 <code>scripts/build-manifest.ps1</code>；线上由部署工作流自动生成。</p>`;
    $("#latest").innerHTML = `<div class="empty">${msg}</div>`;
    $("#archive-list").innerHTML = "";
    return;
  }

  const daily = entries.filter((e) => e.kind === "daily").length;
  const extra = entries.filter((e) => e.kind === "extra").length;
  const days = new Set(entries.map((e) => e.date)).size;
  $("#stats").innerHTML = [
    ["Entries", entries.length],
    ["Daily", daily],
    ["Extras", extra],
    ["Updated", entries[0].date ? entries[0].date.slice(5).replace("-", ".") : "—"],
  ].map(([k, v]) => `<div class="stat"><span class="mono">${k}</span><b>${typeof v === "number" ? String(v).padStart(2, "0") : esc(v)}</b></div>`).join("");
  $("#archive-count").textContent = `${entries.length} files · ${days} days`;

  renderLatest(entries);
  renderTicker(entries);
  spiral.init(entries);
  initArchive(entries, { all: entries.length, daily, extra });
  emit("home");
}

/* Spiral of recent titles winding out from the wordmark. Titles are upright links placed
 * along the curve; render(shift) slides them outward along it (motion.js animates shift). */
const spiral = {
  items: [],
  shift: 0,

  init(entries) {
    this.root = $("#spiral");
    if (!this.root) return;
    this.list = this.root.querySelector(".spiral-items");
    this.path = this.root.querySelector(".spiral-line path");
    this.list.innerHTML = entries.slice(0, CONFIG.spiralCount).map((e) => {
      const p = e.date ? dateParts(e.date) : null;
      return `<a class="sp-item${e.kind === "extra" ? " is-extra" : ""}" href="${readUrl(e.slug)}">` +
        `<span class="sp-card"><span class="sp-top"><span class="sp-date">${p ? `${p.mm}.${p.dd}` : ""}</span><i></i></span>` +
        `<span class="sp-title">${esc(titleOf(e).headline)}</span>` +
        `<span class="sp-kind">${esc(e.show || (e.kind === "extra" ? "Extra" : "Daily"))}</span></span></a>`;
    }).join("");
    this.items = [...this.list.children];
    this.layout();
    // ...and again whenever the hero's size settles or changes (fonts, pinning, window resize)
    let frame;
    new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => this.layout());
    }).observe(this.root);
  },

  // Sample the curve: an Archimedean spiral stretched from around the wordmark out towards the corners
  layout() {
    const box = this.root.getBoundingClientRect();
    const w = box.width, h = box.height;
    if (!w || !h || !this.items.length) return;
    const wm = $("#wordmark"), center = wm.parentElement.getBoundingClientRect();
    const cx = center.left - box.left + wm.offsetLeft + wm.offsetWidth / 2;
    const cy = center.top - box.top + wm.offsetTop + wm.offsetHeight / 2;
    const card = this.items[0].firstElementChild.offsetWidth || 136;
    // innermost ring clears the wordmark by a little more than half a card
    const rx0 = wm.offsetWidth / 2 + card * 0.62, ry0 = wm.offsetHeight / 2 + card * 0.62;
    const reach = Math.hypot(Math.max(cx, w - cx), Math.max(cy, h - cy)) * 0.94;
    // as many turns as fit with a card's worth of space between neighbouring rings
    const turns = Math.min(3, Math.max(1.5, (reach - Math.min(rx0, ry0)) / (card * 1.5)));
    const tMax = turns * Math.PI * 2, start = -Math.PI * 0.62;

    const xs = [], ys = [], len = [0];
    for (let t = 0; t <= tMax; t += 0.015) {
      const k = t / tMax;
      const rx = rx0 + (reach - rx0) * k, ry = ry0 + (reach - ry0) * k;
      xs.push(cx + rx * Math.cos(start + t));
      ys.push(cy + ry * Math.sin(start + t));
      const n = xs.length - 1;
      if (n) len.push(len[n - 1] + Math.hypot(xs[n] - xs[n - 1], ys[n] - ys[n - 1]));
    }
    const L = len[len.length - 1];
    // only as many cards as the path can hold without overlapping
    const count = Math.max(1, Math.min(this.items.length, Math.floor(L / (card * 1.75))));
    Object.assign(this, { xs, ys, len, L, count, card });
    this.items.forEach((el, i) => { el.hidden = i >= count; });

    const svg = this.path.ownerSVGElement;
    svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    this.path.setAttribute("d", "M" + xs.map((x, i) => `${x.toFixed(1)},${ys[i].toFixed(1)}`).join("L"));
    this.render(this.shift);
  },

  pointAt(s) {
    const { len, xs, ys } = this;
    let lo = 0, hi = len.length - 1;
    while (lo < hi - 1) { const mid = (lo + hi) >> 1; if (len[mid] < s) lo = mid; else hi = mid; }
    const f = (s - len[lo]) / (len[hi] - len[lo] || 1);
    return { x: xs[lo] + (xs[hi] - xs[lo]) * f, y: ys[lo] + (ys[hi] - ys[lo]) * f };
  },

  // shift (px along the curve) slides every card outward; a card leaving the end of its loop re-enters at the
  // centre. With few cards the loop covers only the inner part of the spiral, so they stay close together and
  // on screen. Cards only translate (and grow slightly with distance), they never rotate.
  render(shift) {
    if (!this.L) return;
    this.shift = shift;
    const loop = Math.min(this.L, this.count * this.card * 2.3);
    const gap = loop / this.count, first = gap * 0.35;
    for (let i = 0; i < this.count; i++) {
      const el = this.items[i];
      let s = (first + i * gap + shift) % loop;
      if (s < 0) s += loop;
      const u = s / this.L, v = s / loop;
      const p = this.pointAt(s);
      const scale = 0.9 + u * 0.18;
      const fade = Math.min(1, v / 0.05, (1 - v) / 0.1);
      el.style.transform = `translate(${p.x.toFixed(1)}px,${p.y.toFixed(1)}px) scale(${scale.toFixed(3)})`;
      el.style.setProperty("--o", Math.max(0, fade).toFixed(3));
      el.style.zIndex = String(Math.round(u * 100));
    }
  },
};
window.spiral = spiral;

function renderTicker(entries) {
  const band = $("#ticker");
  if (!band) return;
  const items = entries.slice(0, 12).map((e) => {
    const p = e.date ? dateParts(e.date) : null;
    return `<a class="ticker-item" href="${readUrl(e.slug)}"><span>${p ? `${p.mm}.${p.dd}` : ""} · ${e.kind === "extra" ? "Extra" : "Daily"}</span><b>${esc(titleOf(e).headline)}</b></a>`;
  }).join("");
  band.innerHTML = `<div class="ticker-track"><div class="ticker-group">${items}</div></div>`;
}

function renderLatest(entries) {
  const lead = entries[0];
  const p = lead.date ? dateParts(lead.date) : null;
  const { kicker, headline } = titleOf(lead);
  const sameDay = entries.filter((e) => e !== lead && e.date && e.date === lead.date);

  $("#latest").innerHTML = `
    <div class="feature">
      <div class="feature-date">
        <div class="big">${p ? `${p.mm}.${p.dd}` : "—"}</div>
        <div class="mono">${p ? `${p.y} · ${p.wd} · ${p.wdZh}` : ""}</div>
      </div>
      <div class="feature-body">
        ${kindBadge(lead.kind)}
        ${kicker ? `<div class="kicker">${esc(kicker)}</div>` : ""}
        <h2 class="feature-title"><a href="${readUrl(lead.slug)}">${esc(headline)}</a></h2>
        ${lead.summary ? `<p class="feature-summary">${esc(lead.summary)}</p>` : ""}
        <div class="feature-actions">
          <a class="btn" href="${readUrl(lead.slug)}">Start reading <span class="arrow">→</span></a>
          <span class="mono" style="color:var(--ink-3)">≈ ${lead.readMinutes || "?"} min · ${(lead.chars || 0).toLocaleString()} 字</span>
        </div>
        ${sameDay.length ? `
          <div class="siblings">
            ${sameDay.map((e) => `
              <a class="sibling" href="${readUrl(e.slug)}">
                ${kindBadge(e.kind)}
                <span class="sibling-title">${esc(titleOf(e).headline)}</span>
                <span class="arrow">→</span>
              </a>`).join("")}
          </div>` : ""}
      </div>
    </div>`;
}

function initArchive(entries, counts) {
  const input = $("#search");
  const seg = $("#seg");
  let filter = "all";
  try { filter = sessionStorage.getItem("filter") || "all"; } catch (e) {}

  seg.innerHTML = [["all", "All"], ["daily", "Daily"], ["extra", "Extra"]]
    .map(([k, label]) => `<button data-k="${k}" class="${k === filter ? "is-active" : ""}">${label}<sup>${counts[k]}</sup></button>`)
    .join("");
  seg.addEventListener("click", (ev) => {
    const b = ev.target.closest("button");
    if (!b) return;
    filter = b.dataset.k;
    try { sessionStorage.setItem("filter", filter); } catch (e) {}
    seg.querySelectorAll("button").forEach((x) => x.classList.toggle("is-active", x === b));
    render();
  });
  input.addEventListener("input", render);
  addEventListener("keydown", (ev) => {
    if (ev.key === "/" && document.activeElement !== input) { ev.preventDefault(); input.focus(); }
    if (ev.key === "Escape" && document.activeElement === input) { input.value = ""; render(); input.blur(); }
  });

  function highlight(text, q) {
    if (!q) return esc(text);
    const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    return String(text).split(re).map((s, i) => (i % 2 ? `<mark>${esc(s)}</mark>` : esc(s))).join("");
  }

  function render() {
    const q = input.value.trim();
    const ql = q.toLowerCase();
    const list = entries.filter((e) =>
      (filter === "all" || e.kind === filter) &&
      (!ql || `${e.title} ${e.videoTitle || ""} ${e.show || ""} ${e.summary} ${e.slug}`.toLowerCase().includes(ql)));

    if (!list.length) {
      $("#archive-list").innerHTML = `<div class="empty">没有匹配「${esc(q)}」的内容</div>`;
      return;
    }

    const groups = new Map();
    for (const e of list) {
      const key = e.date ? e.date.slice(0, 7) : "other";
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(e);
    }

    $("#archive-list").innerHTML = [...groups].map(([key, items]) => {
      const [y, m] = key.split("-");
      const name = key === "other" ? "Other" : `${MONTHS_LONG[Number(m) - 1]} ${y}`;
      return `
        <div class="month-head">
          <span class="month-name">${name}</span>
          <span class="mono">${key === "other" ? "" : `${y} / ${m} · `}${items.length} files</span>
        </div>
        <div class="grid">
          ${items.map((e) => {
            const p = e.date ? dateParts(e.date) : null;
            const { kicker, headline } = titleOf(e);
            return `
              <a class="card ${e.kind === "extra" ? "is-extra" : ""}" href="${readUrl(e.slug)}">
                <div class="card-top">
                  <span class="card-day">${p ? p.dd : "··"}<small>${p ? `${p.mon} · ${p.wd}` : ""}</small></span>
                  ${kindBadge(e.kind)}
                </div>
                ${kicker ? `<div class="card-kicker">${highlight(kicker, q)}</div>` : ""}
                <h3 class="card-title">${highlight(headline, q)}</h3>
                ${e.summary ? `<p class="card-summary">${highlight(e.summary, q)}</p>` : ""}
                <div class="card-foot mono"><span>${esc(e.date || e.slug)}</span><span>≈ ${e.readMinutes || "?"} min <span class="arrow">→</span></span></div>
              </a>`;
          }).join("")}
        </div>`;
    }).join("");
    emit("archive");
  }

  render();
}

/* --------------------------------------------------------------------------
   Reader
   -------------------------------------------------------------------------- */

async function initReader(updateScroll) {
  const raw = new URLSearchParams(location.search).get("f") || "";
  const slug = raw.replace(/\.md$/i, "");
  const body = $("#doc-body");

  if (!slug || /[\\/]|\.\./.test(slug)) return showState("Not found", "缺少或无效的文件参数。");

  const [entries, md] = await Promise.all([
    loadManifest(),
    fetch(`${CONFIG.contentDir}${encodeURIComponent(slug)}.md`, { cache: "no-cache" })
      .then((r) => (r.ok ? r.text() : Promise.reject(r.status)))
      .catch(() => null),
  ]);
  setLatestLink(entries);
  if (md == null) return showState("Not found", `找不到 ${esc(slug)}.md`);

  const info = parseSlug(slug);
  const entry = (entries || []).find((e) => e.slug === slug) || info;

  // Title = first H1 (removed from body since the header shows it)
  let title = entry.title || "";
  const src = md.replace(/^\uFEFF/, "").replace(/^\s*#\s+(.+?)\s*#*\s*$/m, (_, h) => { if (!title) title = h; return ""; });
  const videoTitle = entry.videoTitle || headerField(src, "标题");
  const show = entry.show || headerField(src, "节目").replace(/\s*[（(].*$/, "");
  const h1 = splitTitle(title, entry);
  const { kicker, headline } = videoTitle
    ? { kicker: [h1.kicker, h1.headline, show].filter(Boolean).join(" · "), headline: videoTitle }
    : h1;
  document.title = `${headline} · ${CONFIG.siteName}`;

  // Render markdown -> sanitized HTML -> enhance
  marked.setOptions({ gfm: true, breaks: false });
  body.innerHTML = DOMPurify.sanitize(marked.parse(src));
  enhanceProse(body);
  const toc = buildToc(body);

  // Header
  const p = entry.date ? dateParts(entry.date) : null;
  const chars = entry.chars || body.textContent.replace(/\s/g, "").length;
  const minutes = entry.readMinutes || Math.max(1, Math.round(chars / CONFIG.charsPerMinute));
  $("#crumbs").innerHTML = `
    <a class="mono" href="./">Home</a><span class="mono">/</span>
    <a class="mono" href="./#archive">Archive</a><span class="mono">/</span>
    <span class="mono">${esc(slug)}.md</span>`;
  $("#doc-title-wrap").innerHTML = `
    ${kindBadge(entry.kind)}
    ${kicker ? `<div class="doc-kicker">${esc(kicker)}</div>` : `<div style="height:18px"></div>`}
    <h1 class="doc-title">${esc(headline)}</h1>`;
  $("#doc-meta").innerHTML = [
    ["Date", p ? `${p.y}.${p.mm}.${p.dd} ${p.wd}` : "—"],
    ["Type", entry.kind === "extra" ? "Extra 加更" : entry.kind === "daily" ? "Daily 日报" : "Note"],
    ["Reading", `≈ ${minutes} min`],
    ["Length", `${chars.toLocaleString()} 字 · ${toc.filter((t) => t.level === 2).length} 节`],
  ].map(([k, v]) => `<div><span class="mono">${k}</span><b>${esc(v)}</b></div>`).join("");

  // Prev / next (manifest is sorted newest first)
  if (entries && entries.length) {
    const i = entries.findIndex((e) => e.slug === slug);
    const newer = i > 0 ? entries[i - 1] : null;
    const older = i >= 0 && i < entries.length - 1 ? entries[i + 1] : null;
    const cell = (e, cls, label) => e
      ? `<a class="${cls}" href="${readUrl(e.slug)}"><span class="mono">${label} · ${esc(e.date || "")}</span><b>${esc(titleOf(e).headline)}</b></a>`
      : `<span class="${cls}"><span class="mono">${label}</span><b style="color:var(--ink-3)">—</b></span>`;
    $("#doc-nav").innerHTML = cell(older, "prev", "← Older") + cell(newer, "next", "Newer →");
  }

  if (location.hash) {
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) requestAnimationFrame(() => target.scrollIntoView());
  }
  updateScroll();
  emit("read");
}

function slugify(text, used) {
  let base = text.trim().toLowerCase()
    .replace(/[（）()【】\[\]「」『』""''：:，,。.、!?！？|｜/\\]+/g, " ")
    .trim().replace(/\s+/g, "-").slice(0, 60) || "section";
  let id = base, n = 2;
  while (used.has(id)) id = `${base}-${n++}`;
  used.add(id);
  return id;
}

function enhanceProse(root) {
  // Paragraphs made of "标签： 内容" lines (joined by <br>) -> definition grid
  root.querySelectorAll("p").forEach((p) => {
    if (!p.querySelector("br")) return;
    const lines = p.innerHTML.split(/<br\s*\/?>\s*/i).map((s) => s.trim()).filter(Boolean);
    // "标签： 内容", also with the label in bold: "<strong>标签：</strong> 内容" or "<strong>标签</strong>："
    const re = /^(?:<strong>)?([^<>：:]{1,12})(?:<\/strong>)?[：:]\s*(?:<\/strong>)?\s*([\s\S]*)$/;
    if (lines.length < 2 || !lines.every((l) => re.test(l))) return;
    const dl = document.createElement("dl");
    dl.className = "meta";
    dl.innerHTML = lines.map((l) => {
      const [, k, v] = re.exec(l);
      return `<dt>${k}</dt><dd>${v}</dd>`;
    }).join("");
    p.replaceWith(dl);
  });

  // Tables scroll horizontally on narrow screens
  root.querySelectorAll("table").forEach((t) => {
    const wrap = document.createElement("div");
    wrap.className = "table-wrap";
    t.replaceWith(wrap);
    wrap.appendChild(t);
  });

  // Links: other markdown files open in the reader, external links in a new tab
  root.querySelectorAll("a[href]").forEach((a) => {
    const href = a.getAttribute("href");
    const mdLink = /^(?:\.\/)?([^/:#?]+)\.md(#.*)?$/i.exec(href);
    if (mdLink) a.setAttribute("href", readUrl(mdLink[1]) + (mdLink[2] || ""));
    else if (/^https?:\/\//i.test(href)) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
  });

  // Relative images resolve against the content folder
  root.querySelectorAll("img[src]").forEach((img) => {
    const src = img.getAttribute("src");
    if (!/^(?:[a-z]+:|\/|data:)/i.test(src)) img.src = CONFIG.contentDir + src.replace(/^\.\//, "");
    img.loading = "lazy";
  });
}

function buildToc(root) {
  const used = new Set();
  const items = [...root.querySelectorAll("h2, h3")].map((h) => {
    h.id = slugify(h.textContent, used);
    const a = document.createElement("a");
    a.className = "anchor";
    a.href = `#${h.id}`;
    a.textContent = "#";
    a.setAttribute("aria-label", "Link to section");
    h.appendChild(a);
    return { el: h, id: h.id, level: Number(h.tagName[1]), text: h.textContent.replace(/#$/, "").trim() };
  });

  const toc = $("#toc");
  if (!items.length) { toc.remove(); return items; }
  toc.innerHTML = `<div class="toc-label mono">Contents</div><ol>${items
    .map((t) => `<li class="lvl-${t.level}"><a href="#${t.id}" data-id="${t.id}">${esc(t.text)}</a></li>`)
    .join("")}</ol>`;

  const links = new Map([...toc.querySelectorAll("a")].map((a) => [a.dataset.id, a]));
  let active = null;
  const setActive = (id) => {
    if (id === active) return;
    if (active) links.get(active)?.classList.remove("is-active");
    active = id;
    const a = links.get(id);
    if (a) {
      a.classList.add("is-active");
      const r = a.getBoundingClientRect(), tr = toc.getBoundingClientRect();
      if (r.top < tr.top + 40 || r.bottom > tr.bottom - 40) toc.scrollTop += r.top - tr.top - tr.height / 3;
    }
  };
  const spy = () => {
    let current = items[0].id;
    for (const t of items) {
      if (t.el.getBoundingClientRect().top < 120) current = t.id;
      else break;
    }
    setActive(current);
  };
  addEventListener("scroll", spy, { passive: true });
  spy();
  return items;
}

function showState(title, html) {
  $("#doc-layout").innerHTML = `<div class="state"><h2>${esc(title)}</h2><p>${html}</p><p><a class="btn btn-ghost" href="./">← Back to archive</a></p></div>`;
  $("#doc-title-wrap").innerHTML = "";
  $("#doc-meta").remove();
}

/* -------------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  const mini = $(".nav-wordmark");
  if (mini) {
    mini.setAttribute("aria-label", CONFIG.siteName);
    mini.innerHTML = CONFIG.wordmark.map(letters).join(`<span class="wm-gap"></span>`);
  }
  const updateScroll = initScrollChrome();
  if (document.body.dataset.page === "home") initHome();
  if (document.body.dataset.page === "read") initReader(updateScroll);
});
