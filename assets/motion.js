/* Motion layer: smooth scrolling (Lenis) + scroll-linked animation (GSAP ScrollTrigger).
 * - Hero wordmark letters scatter on scroll, then fly into the small wordmark in the nav
 * - Headline ticker whose speed/direction follows the scroll
 * - Split-text and fade-up reveals, fixed section index, footer wordmark fill
 * The page is fully usable without this file; it only adds motion when the libraries load
 * and the visitor hasn't asked for reduced motion.
 */
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !window.gsap || !window.ScrollTrigger || !window.Lenis) return;

  const root = document.documentElement;
  root.classList.add("motion");
  gsap.registerPlugin(ScrollTrigger);

  const NAV_H = 44;
  const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
  window.lenis = lenis;
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  // Deterministic random so the scatter pattern is the same on every visit
  function rng(seed) {
    return () => {
      seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* ------------------------------------------------------------------------
     In-page anchors scroll smoothly through Lenis
     ------------------------------------------------------------------------ */
  function scrollToHash(hash, immediate) {
    const el = hash && document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!el) return false;
    lenis.scrollTo(el, { offset: -(NAV_H + 12), duration: 1.4, immediate });
    return true;
  }
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href*='#']");
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const url = new URL(a.href, location.href);
    if (url.pathname !== location.pathname || url.search !== location.search || !url.hash) return;
    if (scrollToHash(url.hash)) {
      e.preventDefault();
      history.replaceState(null, "", url.hash);
    }
  });

  /* ------------------------------------------------------------------------
     Reveal on enter: [data-split] text rises letter by letter, .reveal fades up
     ------------------------------------------------------------------------ */
  const io = new IntersectionObserver((list) => {
    for (const en of list) {
      if (!en.isIntersecting) continue;
      const el = en.target;
      io.unobserve(el);
      void el.offsetWidth;
      requestAnimationFrame(() => el.classList.add("is-in"));
      if ("scramble" in el.dataset) scramble(el);
    }
  }, { rootMargin: "0px 0px -6% 0px", threshold: 0.05 });

  function split(el) {
    if (el.dataset.splitDone) return;
    el.dataset.splitDone = "1";
    const text = el.textContent.trim();
    const tokens = text.match(/\s+|\p{Script=Han}|[^\s\p{Script=Han}]+/gu) || [];
    let i = 0;
    el.setAttribute("aria-label", text);
    el.innerHTML = tokens.map((tok) => /^\s+$/.test(tok) ? " "
      : `<span class="w" aria-hidden="true">${[...tok].map((c) => `<span class="ch"><span style="--i:${i++}">${esc(c)}</span></span>`).join("")}</span>`
    ).join("");
  }

  function reveal(selector, scope = document, step = 70, cols = 0) {
    scope.querySelectorAll(selector).forEach((el, i) => {
      if (el.classList.contains("reveal")) return;
      el.classList.add("reveal");
      el.style.setProperty("--d", `${(cols ? i % cols : i) * step}ms`);
      io.observe(el);
    });
  }

  function splitAll(selector, scope = document) {
    scope.querySelectorAll(selector).forEach((el) => {
      if (el.dataset.splitDone) return;
      el.setAttribute("data-split", "");
      split(el);
      io.observe(el);
    });
  }

  // Digits shuffle before settling on their final value
  function scramble(el, duration = 1.1) {
    const final = el.dataset.final || el.textContent;
    el.dataset.final = final;
    const p = { v: 0 };
    gsap.to(p, {
      v: 1, duration, ease: "power2.out",
      onUpdate: () => {
        const n = Math.floor(p.v * final.length);
        el.textContent = [...final].map((c, i) => (i < n || !/\d/.test(c) ? c : (Math.random() * 10) | 0)).join("");
      },
      onComplete: () => { el.textContent = final; },
    });
  }

  let refreshQueued = false;
  function queueRefresh() {
    if (refreshQueued) return;
    refreshQueued = true;
    requestAnimationFrame(() => { refreshQueued = false; ScrollTrigger.refresh(); });
  }

  /* ------------------------------------------------------------------------
     Fixed section index + vertical label in the ruler
     ------------------------------------------------------------------------ */
  function initSections() {
    const label = document.querySelector(".ruler-label");
    const links = [...document.querySelectorAll(".side-index a")];
    const setActive = (name, id) => {
      links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${id}`));
      if (!label || label.dataset.current === name) return;
      label.dataset.current = name;
      const old = [...label.children];
      const span = document.createElement("span");
      span.textContent = name;
      label.appendChild(span);
      gsap.fromTo(span, { yPercent: -100 }, { yPercent: 0, duration: 0.7, ease: "expo.out" });
      old.forEach((o) => gsap.to(o, { yPercent: 100, duration: 0.7, ease: "expo.out", onComplete: () => o.remove() }));
    };
    const secs = [...document.querySelectorAll("[data-section]")];
    secs.forEach((sec, i) => {
      ScrollTrigger.create({
        trigger: sec,
        // the footer is short and never reaches mid-screen, so it activates as soon as it shows
        start: i === secs.length - 1 && secs.length > 1 ? "top 92%" : "top 55%",
        end: "bottom 55%",
        onToggle: (st) => st.isActive && setActive(sec.dataset.section, sec.id),
      });
    });
  }

  /* ------------------------------------------------------------------------
     Footer: giant outline wordmark fills in as you reach the bottom
     ------------------------------------------------------------------------ */
  function initFooter() {
    document.querySelectorAll(".footer-mark").forEach((fm) => {
      const text = fm.textContent.trim();
      fm.setAttribute("aria-label", text);
      fm.innerHTML = [...text].map((c) => `<span class="fm-l" aria-hidden="true">${esc(c)}</span>`).join("");
      const ls = fm.querySelectorAll(".fm-l");
      gsap.set(ls, { "--fill": 0 });
      gsap.timeline({ scrollTrigger: { trigger: fm, start: "top bottom", end: "bottom bottom", scrub: 0.6 } })
        .from(ls, { yPercent: 80, rotation: (i) => (i % 2 ? 10 : -10), ease: "power3.out", stagger: 0.06, duration: 1 }, 0)
        .to(ls, { "--fill": 1, ease: "none", stagger: 0.08, duration: 0.5 }, 0.35);
    });
  }

  /* ------------------------------------------------------------------------
     Homepage
     ------------------------------------------------------------------------ */
  const home = {
    letters: [],
    tl: null,

    init() {
      this.letters = [...document.querySelectorAll("#wordmark .wm-l")];
      this.mini = [...document.querySelectorAll(".nav-wordmark .wm-l")];
      this.fade = [".hero-top", "#tagline", ".hero-bottom"].map((s) => document.querySelector(s)).filter(Boolean);
      gsap.set(this.letters, { "--fill": 0 });

      const start = () => {
        if (scrollY > 40) return this.build();
        gsap.timeline({ onComplete: () => this.build() })
          .from(this.letters, {
            yPercent: 70, opacity: 0, rotationX: -70, filter: "blur(14px)",
            duration: 1.3, ease: "expo.out", stagger: { each: 0.045, from: "start" },
            clearProps: "filter,rotationX",
          })
          .from(this.fade, { y: 18, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.1 }, 0.45)
          .from(".hero-rings", { scale: 0.7, opacity: 0, duration: 2, ease: "expo.out" }, 0);
      };
      (document.fonts ? document.fonts.ready : Promise.resolve()).then(start);

      let t;
      addEventListener("resize", () => { clearTimeout(t); t = setTimeout(() => this.tl && this.build(), 200); });
    },

    // Scroll-scrubbed flight: big letter -> scattered -> docked into the nav wordmark
    build() {
      if (this.tl) { this.tl.scrollTrigger.kill(); this.tl.kill(); }
      root.classList.remove("wm-docked");
      gsap.set(this.letters, { clearProps: "transform,yPercent" });

      const hero = document.querySelector(".hero");
      const D = Math.max(320, hero.offsetHeight * 0.85);   // scroll distance of the whole flight
      const sy = scrollY;
      const vw = innerWidth, vh = innerHeight;
      const rand = rng(11);

      this.tl = gsap.timeline({
        scrollTrigger: {
          start: 0,
          end: D,
          scrub: 0.9,
          onUpdate: (st) => root.classList.toggle("wm-docked", st.progress > 0.995),
        },
      });

      this.letters.forEach((l, i) => {
        const m = this.mini[i];
        if (!m) return;
        const a = l.getBoundingClientRect();
        const b = m.getBoundingClientRect();
        const ax = a.left + a.width / 2, ay = a.top + sy + a.height / 2;   // document coords
        const bx = b.left + b.width / 2, by = b.top + b.height / 2;        // nav is pinned at top
        const s = parseFloat(getComputedStyle(m).fontSize) / parseFloat(getComputedStyle(l).fontSize);
        const tx = bx - ax;
        const ty = by - (ay - D);                                          // page has moved up by D at the end
        const mx = (rand() - 0.5) * vw * 0.7 + tx * 0.15;
        const my = D * 0.5 + (rand() - 0.55) * vh * 0.5;                   // keep the scatter on screen
        const t0 = i * 0.012;
        this.tl
          .to(l, { x: mx, y: my, rotation: (rand() - 0.5) * 80, scale: 0.45 + rand() * 0.7, ease: "sine.inOut", duration: 0.5 }, t0)
          .to(l, { x: tx, y: ty, rotation: 0, scale: s, "--fill": 1, ease: "power3.inOut", duration: 0.48 }, t0 + 0.5);
      });

      this.tl
        .to(this.fade, { y: -70, opacity: 0, ease: "power1.in", duration: 0.4, stagger: 0.04 }, 0)
        .to(".hero-rings", { scale: 1.7, rotation: 30, ease: "none", duration: 1 }, 0)
        .to(".hero-bg", { opacity: 0, ease: "none", duration: 1 }, 0);
    },
  };

  // Ticker: drifts left; scrolling speeds it up and flips its direction, with a little skew
  function initTicker() {
    const track = document.querySelector(".ticker-track");
    if (!track || track.dataset.live) return;
    track.dataset.live = "1";
    const group = track.firstElementChild;
    if (!group || !group.offsetWidth) return;
    while (track.scrollWidth < innerWidth * 2 + group.offsetWidth) {
      const c = group.cloneNode(true);
      c.setAttribute("aria-hidden", "true");
      c.querySelectorAll("a").forEach((a) => (a.tabIndex = -1));
      track.appendChild(c);
    }
    const w = group.offsetWidth;
    let x = 0, dir = 1, skew = 0;
    gsap.ticker.add((time, dt) => {
      const v = lenis.velocity || 0;
      if (Math.abs(v) > 0.2) dir = v > 0 ? 1 : -1;
      x -= dt * 0.05 * (1 + Math.min(Math.abs(v), 60) * 0.18) * dir;
      x %= w;
      if (x > 0) x -= w;
      skew += (clamp(-v * 0.35, -10, 10) - skew) * 0.12;
      track.style.transform = `translate3d(${x}px,0,0) skewX(${skew}deg)`;
    });
  }

  function onHomeRender() {
    initTicker();
    splitAll(".section-title, .month-name");
    reveal(".section-head .mono");
    document.querySelectorAll(".section-head").forEach((h) => io.observe(h));
    reveal(".feature-date > *, .feature-body > *", document, 90);
    reveal(".sibling", document, 80);
    const big = document.querySelector(".feature-date .big");
    if (big && !("scramble" in big.dataset)) { big.dataset.scramble = ""; io.observe(big); }
    document.querySelectorAll(".stat b").forEach((b) => { if (!b.dataset.final) scramble(b, 1.4); });
    queueRefresh();
    if (location.hash && !home.jumped) { home.jumped = true; setTimeout(() => scrollToHash(location.hash, true), 50); }
  }

  function onArchiveRender() {
    const list = document.getElementById("archive-list");
    if (!list) return;
    splitAll(".month-name", list);
    reveal(".month-head .mono", list);
    list.querySelectorAll(".grid").forEach((g) => {
      const cols = Math.max(1, getComputedStyle(g).gridTemplateColumns.split(" ").length);
      reveal(".card", g, 90, cols);
    });
    queueRefresh();
  }

  /* ------------------------------------------------------------------------
     Reader
     ------------------------------------------------------------------------ */
  function onReadRender() {
    root.classList.add("wm-docked");
    splitAll(".doc-title");
    reveal(".crumbs, #doc-title-wrap > :not(.doc-title)", document, 80);
    reveal("#doc-meta > div", document, 70);
    reveal(".prose > h2, .prose > h3, .prose > .table-wrap, .prose > blockquote, .prose > dl.meta, .prose > pre, .prose > ul, .prose > ol, .prose > p", document, 0);
    reveal(".doc-nav > *", document, 90);
    queueRefresh();
  }

  /* ------------------------------------------------------------------------ */

  document.addEventListener("digest:render", (e) => {
    const what = e.detail && e.detail.what;
    if (what === "home") onHomeRender();
    if (what === "archive") onArchiveRender();
    if (what === "read") onReadRender();
  });

  document.addEventListener("DOMContentLoaded", () => {
    initSections();
    initFooter();
    if (document.body.dataset.page === "home") home.init();
    if (document.body.dataset.page === "read") root.classList.add("wm-docked");
  });
})();
