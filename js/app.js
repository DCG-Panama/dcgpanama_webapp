/* ============================================
   DCG PANAMA — SHARED BEHAVIOUR
   Navigation and a single reveal-on-scroll effect. Nothing else animates.
============================================ */
(function () {
  'use strict';

  // ── Mobile navigation ──────────────────────
  function initNav() {
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    if (!toggle || !links) return;

    const setOpen = open => {
      links.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? '✕' : '≡';
    };

    toggle.addEventListener('click', () => setOpen(!links.classList.contains('open')));
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));

    // Escape closes the panel and returns focus to the control that opened it.
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && links.classList.contains('open')) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  // ── Reveal on scroll ───────────────────────
  // The opt-in class is added here so that with JS disabled nothing is ever
  // left invisible.
  //
  // Deliberately a scroll sweep rather than IntersectionObserver: IO reports at
  // frame boundaries, so a fast flick or an End keypress can carry an element
  // past the viewport without ever firing, leaving it stuck at opacity 0. A
  // pass over the remaining elements cannot miss one, and the list empties as
  // the page is read, so the cost trends to nothing.
  function initReveal() {
    let pending = Array.from(document.querySelectorAll('[data-reveal]'));
    if (!pending.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.documentElement.classList.add('reveal-ready');

    // A short stagger inside each group reads as one motion, not fifty.
    pending.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i % 6, 5) * 55}ms`;
    });

    let queued = false;

    function sweep() {
      queued = false;
      const limit = window.innerHeight * 0.92;
      const still = [];
      for (const el of pending) {
        // Anything at or above the fold — including everything already scrolled
        // past, whose top is negative — is revealed.
        if (el.getBoundingClientRect().top < limit) el.classList.add('is-visible');
        else still.push(el);
      }
      pending = still;
      if (!pending.length) {
        window.removeEventListener('scroll', request);
        window.removeEventListener('resize', request);
      }
    }

    function request() {
      if (queued) return;
      queued = true;
      requestAnimationFrame(sweep);
    }

    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request, { passive: true });
    sweep();
  }

  // ── Counters ───────────────────────────────
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    counters.forEach(el => {
      const target = Number(el.dataset.count);
      if (!Number.isFinite(target)) return;
      if (reduce || !('IntersectionObserver' in window)) {
        el.textContent = String(target);
        return;
      }

      const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          io.disconnect();
          const start = performance.now();
          const step = now => {
            const p = Math.min((now - start) / 1100, 1);
            el.textContent = String(Math.floor(target * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
      }, { threshold: 0.4 });
      io.observe(el);
    });
  }

  function init() {
    initNav();
    initReveal();
    initCounters();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
