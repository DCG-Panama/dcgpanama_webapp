/* ============================================
   DCG PANAMA — LANGUAGE ENGINE

   English is not stored in the dictionary. The markup in the HTML *is* the
   English copy: on load the engine snapshots every tagged node, so lang.js
   only carries Spanish and the two can never drift apart. Strings that never
   exist in markup — terminal documents, JS-built UI — are the exception and
   declare both languages under `strings`.

   Markup contract:
     data-i18n="a.b.c"                       -> replaces textContent
     data-i18n-attrs="alt:a.b;aria-label:c"  -> replaces those attributes

   Because data-i18n overwrites textContent, only tag elements whose content
   is a single text node. Wrap the translatable part in a <span> otherwise.
============================================ */
(function () {
  'use strict';

  const SUPPORTED   = ['en', 'es'];
  const FALLBACK    = 'en';
  const STORAGE_KEY = 'dcg-lang';

  const bundle  = window.DCG_TRANSLATIONS || {};
  const markup  = bundle.es || {};          // Spanish for tagged DOM nodes
  const strings = bundle.strings || {};     // { en: {...}, es: {...} } for JS-only copy

  // English captured from the DOM, keyed the same way as `markup`.
  const baseline     = Object.create(null);
  const baselineAttr = Object.create(null);

  let current = FALLBACK;
  let captured = false;
  const listeners = [];

  // ─── Preference resolution ────────────────────────────────
  function readStored() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (err) {
      // Storage throws in private mode or with cookies blocked. Not worth
      // surfacing — detection below still yields a language.
      return null;
    }
  }

  function writeStored(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (err) {
      // Same as above: the choice just does not survive a reload.
    }
  }

  function resolveInitial() {
    // An explicit ?lang= wins so a link can be shared in a chosen language.
    const requested = new URLSearchParams(window.location.search).get('lang');
    if (SUPPORTED.indexOf(requested) !== -1) return requested;

    const stored = readStored();
    if (SUPPORTED.indexOf(stored) !== -1) return stored;

    const navLang = (navigator.language || '').slice(0, 2).toLowerCase();
    return SUPPORTED.indexOf(navLang) !== -1 ? navLang : FALLBACK;
  }

  // ─── Lookup ───────────────────────────────────────────────
  function resolve(dict, key) {
    if (!dict) return null;
    const parts = key.split('.');
    let node = dict;
    for (let i = 0; i < parts.length; i++) {
      if (node === null || typeof node !== 'object') return null;
      node = node[parts[i]];
    }
    return typeof node === 'string' ? node : null;
  }

  // For copy that only exists in JS. English is never stored: the literal at
  // the call site is the English, so this returns null in English and every
  // caller passes that literal as its fallback. Same single-source rule as the
  // markup, applied to script-built copy.
  function t(key) {
    if (current === FALLBACK) return null;
    return resolve(strings[current], key);
  }

  // Only inert, text-carrying attributes may be written. Without this an
  // author could reach an event handler or a URL through data-i18n-attrs;
  // nothing legitimately needs to localise those.
  const WRITABLE_ATTRS = ['alt', 'title', 'placeholder', 'aria-label', 'content', 'data-text'];

  function parseAttrSpec(spec) {
    const out = [];
    spec.split(';').forEach(pair => {
      const split = pair.indexOf(':');
      if (split === -1) return;
      const attr = pair.slice(0, split).trim();
      const key  = pair.slice(split + 1).trim();
      if (attr && key && WRITABLE_ATTRS.indexOf(attr) !== -1) out.push({ attr, key });
    });
    return out;
  }

  // ─── Snapshot the authored English ────────────────────────
  function capture(root) {
    root.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (!(key in baseline)) baseline[key] = el.textContent;
    });
    root.querySelectorAll('[data-i18n-attrs]').forEach(el => {
      parseAttrSpec(el.dataset.i18nAttrs).forEach(({ attr, key }) => {
        if (!(key in baselineAttr)) baselineAttr[key] = el.getAttribute(attr);
      });
    });
  }

  function valueFor(key) {
    if (current === FALLBACK) return key in baseline ? baseline[key] : null;
    return resolve(markup, key) ?? (key in baseline ? baseline[key] : null);
  }

  function attrValueFor(key) {
    if (current === FALLBACK) return key in baselineAttr ? baselineAttr[key] : null;
    return resolve(markup, key) ?? (key in baselineAttr ? baselineAttr[key] : null);
  }

  // ─── DOM application ──────────────────────────────────────
  function applyTo(root) {
    root.querySelectorAll('[data-i18n]').forEach(el => {
      const value = valueFor(el.dataset.i18n);
      if (value !== null) el.textContent = value;
    });
    root.querySelectorAll('[data-i18n-attrs]').forEach(el => {
      parseAttrSpec(el.dataset.i18nAttrs).forEach(({ attr, key }) => {
        const value = attrValueFor(key);
        if (value !== null) el.setAttribute(attr, value);
      });
    });
  }

  // ─── Switching ────────────────────────────────────────────
  function setLanguage(lang, persist) {
    if (SUPPORTED.indexOf(lang) === -1) return;
    current = lang;
    document.documentElement.lang = lang;
    if (persist) writeStored(lang);

    applyTo(document);
    syncSwitchers();
    listeners.forEach(fn => fn(lang));
  }

  function syncSwitchers() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      const active = btn.dataset.lang === current;
      btn.classList.toggle('active', active);
      // aria-current marks the language in use; both buttons stay operable.
      if (active) btn.setAttribute('aria-current', 'true');
      else btn.removeAttribute('aria-current');
    });
  }

  function bindSwitchers() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => setLanguage(btn.dataset.lang, true));
    });
  }

  // ─── Public surface for page scripts ──────────────────────
  window.I18N = {
    t,
    lang: () => current,
    // Page scripts that build DOM register here to re-render on a switch.
    onChange(fn) {
      if (typeof fn === 'function') listeners.push(fn);
    },
    // Call after injecting tagged markup so the new nodes get captured/translated.
    apply(root) {
      capture(root || document);
      applyTo(root || document);
    },
  };

  function init() {
    if (!captured) {
      capture(document);
      captured = true;
    }
    bindSwitchers();
    setLanguage(resolveInitial(), false);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
