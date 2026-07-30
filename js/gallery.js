/* ============================================
   DCG PANAMA — EVENT GALLERY
   Grid of 640px thumbnails; the viewer loads the 1920px rendition on demand.
============================================ */
(function () {
  'use strict';

  const ROOT = '../assets/events/';
  const PREVIEW = 8;

  const metaEl = document.getElementById('gallery-meta');
  const host = document.getElementById('galleries');
  if (!host) return;

  function tr(key, vars, fallback) {
    let text = (window.I18N ? window.I18N.t('snap.' + key) : null) ?? fallback;
    if (vars) Object.keys(vars).forEach(n => { text = text.split('{' + n + '}').join(vars[n]); });
    return text;
  }

  const title = s => s.replace(/[-_]+/g, ' ').trim().replace(/\b\w/g, c => c.toUpperCase());
  const thumb = (ev, f) => `${ROOT}${encodeURIComponent(ev)}/thumb/${encodeURIComponent(f)}`;
  const full  = (ev, f) => `${ROOT}${encodeURIComponent(ev)}/full/${encodeURIComponent(f)}`;

  // ── Viewer ────────────────────────────────
  const lb = { root: null, img: null, count: null, save: null, photos: [], event: '', i: 0, opener: null };

  function buildViewer() {
    const root = document.createElement('div');
    root.className = 'lightbox';
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    root.setAttribute('aria-label', tr('viewer', null, 'Photo viewer'));
    root.hidden = true;

    const stage = document.createElement('div');
    stage.className = 'lb-stage';
    const img = document.createElement('img');
    img.decoding = 'async';
    stage.appendChild(img);

    const bar = document.createElement('div');
    bar.className = 'lb-bar';
    const count = document.createElement('span');
    count.className = 'lb-count';

    const controls = document.createElement('div');
    controls.className = 'lb-controls';
    const mk = (label, text, fn) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'btn';
      b.setAttribute('aria-label', label);
      b.textContent = text;
      b.addEventListener('click', fn);
      return b;
    };
    const save = document.createElement('a');
    save.className = 'btn';
    save.textContent = tr('save', null, '↓ SAVE');

    controls.append(
      mk(tr('prevLabel', null, 'Previous photo'), tr('prev', null, '← PREV'), () => step(-1)),
      mk(tr('nextLabel', null, 'Next photo'), tr('next', null, 'NEXT →'), () => step(1)),
      save,
      mk(tr('closeLabel', null, 'Close viewer'), tr('close', null, '✕ CLOSE'), close)
    );
    bar.append(count, controls);
    root.append(stage, bar);
    root.addEventListener('click', e => { if (e.target === root || e.target === stage) close(); });
    document.body.appendChild(root);

    Object.assign(lb, { root, img, count, save });
  }

  function show(i) {
    const n = lb.photos.length;
    lb.i = (i + n) % n;
    const photo = lb.photos[lb.i];
    const src = full(lb.event, photo.file);

    lb.img.width = photo.w;
    lb.img.height = photo.h;
    lb.img.src = src;
    lb.img.alt = tr('photoOf', { name: title(lb.event), i: lb.i + 1, n },
      `${title(lb.event)} photo ${lb.i + 1} of ${n}`);
    lb.save.href = src;
    lb.save.download = photo.file;
    lb.count.textContent = `${lb.i + 1} / ${n}`;

    [-1, 1].forEach(d => { new Image().src = full(lb.event, lb.photos[(lb.i + d + n) % n].file); });
  }

  const step = d => show(lb.i + d);

  function onKey(e) {
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') step(-1);
    else if (e.key === 'ArrowRight') step(1);
    else if (e.key === 'Tab') {
      const f = lb.root.querySelectorAll('button, a[href]');
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }

  function inertBackground(on) {
    Array.from(document.body.children).forEach(c => { if (c !== lb.root) c.inert = on; });
  }

  function open(event, photos, i, opener) {
    if (!lb.root) buildViewer();
    lb.event = event; lb.photos = photos; lb.opener = opener;
    show(i);
    lb.root.hidden = false;
    inertBackground(true);
    document.body.classList.add('lb-open');
    document.addEventListener('keydown', onKey);
    lb.root.querySelector('button').focus();
  }

  function close() {
    lb.root.hidden = true;
    inertBackground(false);
    document.body.classList.remove('lb-open');
    document.removeEventListener('keydown', onKey);
    lb.img.removeAttribute('src');
    if (lb.opener && document.contains(lb.opener)) lb.opener.focus();
    lb.opener = null;
  }

  // ── Tiles ─────────────────────────────────
  function makeTile(event, photos, i) {
    const photo = photos[i];
    const label = tr('photoLabel', { name: title(event), i: i + 1 }, `${title(event)} photo ${i + 1}`);

    const fig = document.createElement('figure');
    fig.className = 'tile';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute('aria-label', tr('openPhoto', { label }, `Open ${label}`));
    btn.addEventListener('click', () => open(event, photos, i, btn));

    const img = document.createElement('img');
    img.src = thumb(event, photo.file);
    img.alt = label;
    img.loading = 'lazy';
    img.decoding = 'async';
    btn.appendChild(img);

    const save = document.createElement('a');
    save.className = 'tile-save';
    save.href = full(event, photo.file);
    save.download = photo.file;
    save.setAttribute('aria-label', tr('downloadPhoto', { label }, `Download ${label}`));
    save.textContent = tr('save', null, '↓ SAVE');

    fig.append(btn, save);
    return fig;
  }

  // ── Render ────────────────────────────────
  let manifest = null;

  function render() {
    const events = Object.keys(manifest)
      .filter(n => Array.isArray(manifest[n]))
      .sort((a, b) => b.localeCompare(a));

    host.replaceChildren();

    events.forEach(name => {
      const photos = manifest[name].filter(p =>
        p && typeof p.file === 'string' && Number.isFinite(p.w) && Number.isFinite(p.h));
      if (!photos.length) return;

      const section = document.createElement('section');
      section.style.marginBottom = 'var(--s6)';

      const head = document.createElement('div');
      head.className = 'section-head';
      const eyebrow = document.createElement('p');
      eyebrow.className = 'eyebrow';
      eyebrow.textContent = `${photos.length} ` + (photos.length === 1
        ? tr('snapshot', null, 'SNAPSHOT') : tr('snapshots', null, 'SNAPSHOTS'));
      const h2 = document.createElement('h2');
      h2.textContent = title(name);
      head.append(eyebrow, h2);

      const grid = document.createElement('div');
      grid.className = 'gallery-grid';
      photos.slice(0, PREVIEW).forEach((_, i) => grid.appendChild(makeTile(name, photos, i)));

      section.append(head, grid);

      if (photos.length > PREVIEW) {
        const more = document.createElement('button');
        more.type = 'button';
        more.className = 'btn gallery-more';
        more.setAttribute('aria-expanded', 'false');
        more.textContent = tr('viewAll', { n: photos.length }, `VIEW ALL ${photos.length} SNAPSHOTS`);
        let expanded = false;
        more.addEventListener('click', () => {
          expanded = !expanded;
          more.setAttribute('aria-expanded', String(expanded));
          if (expanded) {
            const frag = document.createDocumentFragment();
            photos.slice(PREVIEW).forEach((_, k) => frag.appendChild(makeTile(name, photos, k + PREVIEW)));
            grid.appendChild(frag);
            more.textContent = tr('collapse', null, 'COLLAPSE GALLERY');
          } else {
            while (grid.children.length > PREVIEW) grid.lastChild.remove();
            more.textContent = tr('viewAll', { n: photos.length }, `VIEW ALL ${photos.length} SNAPSHOTS`);
          }
        });
        section.appendChild(more);
      }

      host.appendChild(section);
    });

    if (metaEl) {
      metaEl.textContent = `${events.length} ` + (events.length === 1
        ? tr('gallery', null, 'EVENT GALLERY LOADED') : tr('galleries', null, 'EVENT GALLERIES LOADED'));
    }
  }

  async function init() {
    if (metaEl) metaEl.textContent = tr('scanning', null, 'Scanning event archives...');
    try {
      const res = await fetch(ROOT + 'manifest.json', { cache: 'no-store' });
      if (!res.ok) throw new Error(`manifest.json not found (${res.status})`);
      manifest = await res.json();
      render();
    } catch (err) {
      console.error(err);
      if (metaEl) metaEl.textContent = tr('unavailable', null, 'Unable to load galleries.');
      const box = document.createElement('div');
      box.className = 'empty-state';
      box.textContent = tr('loadError', null, 'Could not load the gallery manifest.');
      host.replaceChildren(box);
    }
  }

  if (window.I18N) {
    window.I18N.onChange(() => {
      if (lb.root) {
        const wasOpen = !lb.root.hidden;
        const state = { event: lb.event, photos: lb.photos, i: lb.i, opener: lb.opener };
        if (wasOpen) close();
        lb.root.remove();
        lb.root = null;
        if (wasOpen) open(state.event, state.photos, state.i, state.opener);
      }
      if (manifest) render();
    });
  }

  init();
})();
