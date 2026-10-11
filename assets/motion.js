/* Motion layer: smooth scrolling (Lenis) + scroll-linked animation (GSAP ScrollTrigger).
 * - Hero: recent titles drift along a spiral around the wordmark; scrolling turns it while pinned
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
    drift: 0,        // slow continuous travel along the spiral (px)
    scrollShift: 0,  // extra travel driven by scrolling through the pinned hero
    hover: false,

    init() {
      const hero = document.querySelector(".hero");
      if (!hero) return;
      ScrollTrigger.clearScrollMemory("manual"); // reloads start from the top, where the pinned hero begins

      // Pin the first screen while the spiral turns, then release it
      const pin = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: `top ${NAV_H}px`,
          end: () => `+=${Math.round(innerHeight * 0.9)}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (st) => root.classList.toggle("wm-docked", st.progress > 0.85),
        },
      })
        .to(this, { scrollShift: () => (window.spiral.L || 4000) * 0.3, ease: "none", duration: 1 }, 0)
        .to(".spiral-stage", { scale: 1.12, ease: "power1.in", duration: 1 }, 0)
        .to([".hero-top", ".hero-bottom"], { y: -30, opacity: 0, ease: "power1.in", duration: 0.3 }, 0)
        .to(".hero-center", { scale: 0.6, opacity: 0, ease: "power2.in", duration: 0.55 }, 0.35);

      // Wordmark letters rise in on load
      const intro = () => {
        if (scrollY > 40) return;
        gsap.timeline()
          .from("#wordmark .wm-l", { yPercent: 70, opacity: 0, filter: "blur(14px)", duration: 1.3, ease: "expo.out", stagger: 0.05, clearProps: "filter" })
          .from([".hero-top > *", "#tagline", ".hero-bottom > *"], { y: 18, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.08 }, 0.4);
      };
      (document.fonts ? document.fonts.ready : Promise.resolve()).then(intro);

      // Titles keep drifting outward; hovering one eases the drift to a stop so it can be clicked
      const list = document.querySelector(".spiral-items");
      list.addEventListener("pointerover", (e) => { this.hover = !!e.target.closest(".sp-item"); });
      list.addEventListener("pointerleave", () => { this.hover = false; });
      const visible = () => scrollY < pin.scrollTrigger.end + innerHeight;   // skip work once the hero is gone
      let speed = 1;
      gsap.ticker.add((time, dt) => {
        if (!visible() || !window.spiral.L) return;
        speed += ((this.hover ? 0 : 1) - speed) * 0.08;
        this.drift += dt * 0.02 * speed;
        window.spiral.render(this.drift + this.scrollShift);
      });
    },

    // Once the titles exist: draw the spiral line, then let the titles fade in from the centre outward
    introSpiral(tries = 0) {
      const path = document.querySelector(".spiral-line path");
      const items = document.querySelectorAll(".sp-item");
      if (!items.length || this.spiralShown) return;
      if (path && !path.getTotalLength() && tries < 60) return requestAnimationFrame(() => this.introSpiral(tries + 1));
      this.spiralShown = true;
      const tl = gsap.timeline();
      if (path && path.getTotalLength) {
        const len = path.getTotalLength();
        tl.fromTo(path, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 2.6, ease: "power2.inOut", clearProps: "strokeDasharray,strokeDashoffset" }, 0);
      }
      tl.fromTo(items, { "--in": 0 }, { "--in": 1, duration: 0.9, ease: "power2.out", stagger: 0.07 }, 0.5);
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
    home.introSpiral();
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
    // the pinned hero first, so triggers further down account for its pin spacing
    if (document.body.dataset.page === "home") home.init();
    initSections();
    initFooter();
    if (document.body.dataset.page === "read") root.classList.add("wm-docked");
  });
})();
