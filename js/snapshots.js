const EVENTS_ROOT  = '../assets/events/';
const MANIFEST_URL = `${EVENTS_ROOT}manifest.json`;

const metaEl    = document.getElementById('gallery-meta');
const galleryEl = document.getElementById('events-gallery');

const PREVIEW_COUNT = 4;   // tiles shown before "View All"

// ─── Helpers ──────────────────────────────────────────────
function toTitle(str) {
  return str.replace(/[-_]+/g, ' ').trim()
            .replace(/\b\w/g, c => c.toUpperCase());
}

function renderMessage(msg) {
  const box = document.createElement('div');
  box.className = 'gallery-message';
  box.textContent = msg;
  galleryEl.replaceChildren(box);
}

// Derivative paths — see tools/build-gallery.py for how these are produced.
function thumbURL(eventName, file) {
  return `${EVENTS_ROOT}${encodeURIComponent(eventName)}/thumb/${encodeURIComponent(file)}`;
}

function fullURL(eventName, file) {
  return `${EVENTS_ROOT}${encodeURIComponent(eventName)}/full/${encodeURIComponent(file)}`;
}

// ─── Lightbox ─────────────────────────────────────────────
// One instance serves every gallery on the page; it is built on first open so
// pages that are never opened pay nothing for it.
const lightbox = {
  root: null,
  img: null,
  counter: null,
  photos: [],
  eventName: '',
  index: 0,
  lastFocused: null,
};

function buildLightbox() {
  const root = document.createElement('div');
  root.className = 'lightbox';
  root.setAttribute('role', 'dialog');
  root.setAttribute('aria-modal', 'true');
  root.setAttribute('aria-label', 'Photo viewer');
  root.hidden = true;

  const stage = document.createElement('div');
  stage.className = 'lightbox-stage';

  const img = document.createElement('img');
  img.className = 'lightbox-img';
  img.decoding = 'async';
  stage.appendChild(img);

  const bar = document.createElement('div');
  bar.className = 'lightbox-bar';

  const counter = document.createElement('span');
  counter.className = 'lightbox-counter';

  const controls = document.createElement('div');
  controls.className = 'lightbox-controls';

  const makeControl = (label, text, onClick) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'lightbox-btn';
    button.setAttribute('aria-label', label);
    button.textContent = text;
    button.addEventListener('click', onClick);
    return button;
  };

  const save = document.createElement('a');
  save.className = 'lightbox-btn';
  save.textContent = '↓ SAVE';

  controls.appendChild(makeControl('Previous photo', '← PREV', () => step(-1)));
  controls.appendChild(makeControl('Next photo', 'NEXT →', () => step(1)));
  controls.appendChild(save);
  controls.appendChild(makeControl('Close viewer', '✕ CLOSE', closeLightbox));

  bar.appendChild(counter);
  bar.appendChild(controls);
  root.appendChild(stage);
  root.appendChild(bar);

  // Clicking the backdrop (but not the image or the bar) closes the viewer.
  root.addEventListener('click', e => {
    if (e.target === root || e.target === stage) closeLightbox();
  });

  document.body.appendChild(root);

  lightbox.root = root;
  lightbox.img = img;
  lightbox.counter = counter;
  lightbox.save = save;
}

function showPhoto(index) {
  const total = lightbox.photos.length;
  // Wrap around so arrow keys never dead-end at either edge.
  lightbox.index = (index + total) % total;

  const photo = lightbox.photos[lightbox.index];
  const src = fullURL(lightbox.eventName, photo.file);

  // Declaring the intrinsic size lets the browser reserve the correct box
  // before the image decodes, so the viewer does not jump between photos.
  lightbox.img.width = photo.w;
  lightbox.img.height = photo.h;
  lightbox.img.src = src;
  lightbox.img.alt = `${toTitle(lightbox.eventName)} photo ${lightbox.index + 1} of ${total}`;

  lightbox.save.href = src;
  lightbox.save.download = photo.file;
  lightbox.save.setAttribute('aria-label', `Download photo ${lightbox.index + 1}`);

  lightbox.counter.textContent = `${lightbox.index + 1} / ${total}`;

  // Warm the neighbours so stepping through the gallery feels instant.
  [-1, 1].forEach(offset => {
    const neighbour = lightbox.photos[(lightbox.index + offset + total) % total];
    new Image().src = fullURL(lightbox.eventName, neighbour.file);
  });
}

function step(delta) {
  showPhoto(lightbox.index + delta);
}

function onLightboxKeydown(e) {
  if (e.key === 'Escape') {
    closeLightbox();
  } else if (e.key === 'ArrowLeft') {
    step(-1);
  } else if (e.key === 'ArrowRight') {
    step(1);
  } else if (e.key === 'Tab') {
    // Keep focus inside the dialog while it is modal.
    const focusable = lightbox.root.querySelectorAll('button, a[href]');
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}

// `opener` is passed in rather than read from document.activeElement: not every
// browser focuses a button when it is clicked, and focus must return somewhere
// predictable when the viewer closes.
function openLightbox(eventName, photos, index, opener) {
  if (!lightbox.root) buildLightbox();

  lightbox.eventName = eventName;
  lightbox.photos = photos;
  lightbox.lastFocused = opener;

  showPhoto(index);
  lightbox.root.hidden = false;
  // The Tab trap keeps sighted keyboard users in, but a screen reader can still
  // browse the page behind a dialog; `inert` takes the rest of the page out.
  setBackgroundInert(true);
  document.body.classList.add('lightbox-open');
  document.addEventListener('keydown', onLightboxKeydown);
  lightbox.root.querySelector('.lightbox-btn').focus();
}

function setBackgroundInert(inert) {
  Array.from(document.body.children).forEach(child => {
    if (child !== lightbox.root) child.inert = inert;
  });
}

function closeLightbox() {
  lightbox.root.hidden = true;
  setBackgroundInert(false);
  document.body.classList.remove('lightbox-open');
  document.removeEventListener('keydown', onLightboxKeydown);
  // Drop the decoded image so a long browsing session does not retain it.
  lightbox.img.removeAttribute('src');

  if (lightbox.lastFocused && document.contains(lightbox.lastFocused)) {
    lightbox.lastFocused.focus();
  }
  lightbox.lastFocused = null;
}

// ─── Tiles ────────────────────────────────────────────────
// The tile box is a fixed 1/1 aspect ratio in CSS, so the thumbnail needs no
// intrinsic size attributes to avoid layout shift.
function makeTile(eventName, photos, index) {
  const photo = photos[index];
  const label = `${toTitle(eventName)} photo ${index + 1}`;

  const figure = document.createElement('figure');
  figure.className = 'event-photo';

  const opener = document.createElement('button');
  opener.type = 'button';
  opener.className = 'photo-open';
  opener.setAttribute('aria-label', `Open ${label}`);
  opener.addEventListener('click', () => openLightbox(eventName, photos, index, opener));

  const img = document.createElement('img');
  img.src = thumbURL(eventName, photo.file);
  img.alt = label;
  img.loading = 'lazy';
  img.decoding = 'async';
  opener.appendChild(img);

  const overlay = document.createElement('div');
  overlay.className = 'photo-dl-overlay';
  const dlBtn = document.createElement('a');
  dlBtn.className = 'photo-dl-btn';
  dlBtn.href = fullURL(eventName, photo.file);
  dlBtn.download = photo.file;
  dlBtn.setAttribute('aria-label', `Download ${label}`);
  dlBtn.textContent = '↓ SAVE';
  overlay.appendChild(dlBtn);

  figure.appendChild(opener);
  figure.appendChild(overlay);
  return figure;
}

// ─── Render one event card ─────────────────────────────────
function renderEventGallery(eventName, photos) {
  const card = document.createElement('section');
  card.className = 'event-gallery-card';

  // Header
  const head = document.createElement('div');
  head.className = 'event-gallery-head';
  const titleEl = document.createElement('div');
  titleEl.className = 'event-name';
  titleEl.textContent = toTitle(eventName);
  const countEl = document.createElement('div');
  countEl.className = 'event-count';
  countEl.textContent = `${photos.length} SNAPSHOT${photos.length === 1 ? '' : 'S'}`;
  head.appendChild(titleEl);
  head.appendChild(countEl);
  card.appendChild(head);

  if (photos.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'event-empty';
    empty.textContent = 'No image files found in this event folder.';
    card.appendChild(empty);
    return card;
  }

  // ── Preview grid ──
  const previewGrid = document.createElement('div');
  previewGrid.className = 'event-photo-grid';
  photos.slice(0, PREVIEW_COUNT).forEach((_, i) => {
    previewGrid.appendChild(makeTile(eventName, photos, i));
  });
  card.appendChild(previewGrid);

  if (photos.length <= PREVIEW_COUNT) return card;

  // ── "View All" button ──
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'event-gallery-expand';
  btn.setAttribute('aria-expanded', 'false');

  const label = document.createElement('span');
  label.className = 'expand-label';
  label.textContent = `VIEW ALL ${photos.length} SNAPSHOTS`;
  const arrow = document.createElement('span');
  arrow.className = 'expand-arrow';
  arrow.textContent = '▾';
  btn.appendChild(label);
  btn.appendChild(arrow);
  card.appendChild(btn);

  // ── Scroll container (hidden until the button is clicked) ──
  const scrollWrap = document.createElement('div');
  scrollWrap.className = 'gallery-scroll-wrap';
  scrollWrap.hidden = true;

  const scrollGrid = document.createElement('div');
  scrollGrid.className = 'gallery-scroll-grid';
  scrollWrap.appendChild(scrollGrid);
  card.appendChild(scrollWrap);

  const scrollWrapId = `gallery-scroll-${encodeURIComponent(eventName)}`;
  scrollWrap.id = scrollWrapId;
  btn.setAttribute('aria-controls', scrollWrapId);

  // Tiles are built once, on first expand. At ~17 KB per thumbnail the whole
  // set is a few MB, and native lazy loading keeps off-screen tiles unfetched,
  // so there is nothing to gain from batching them in on scroll.
  let built = false;
  let isOpen = false;

  btn.addEventListener('click', () => {
    isOpen = !isOpen;

    if (isOpen && !built) {
      const frag = document.createDocumentFragment();
      photos.forEach((_, i) => frag.appendChild(makeTile(eventName, photos, i)));
      scrollGrid.appendChild(frag);
      built = true;
    }

    // Hide the preview while the full scroll view is open.
    previewGrid.hidden = isOpen;
    scrollWrap.hidden = !isOpen;

    btn.classList.toggle('expanded', isOpen);
    btn.setAttribute('aria-expanded', String(isOpen));
    label.textContent = isOpen
      ? 'COLLAPSE GALLERY'
      : `VIEW ALL ${photos.length} SNAPSHOTS`;

    if (isOpen) {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      scrollWrap.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest' });
    }
  });

  return card;
}

// ─── Init ─────────────────────────────────────────────────
// A manifest entry is { file, w, h }; w/h are the full rendition's dimensions.
function isValidPhoto(entry) {
  return entry
    && typeof entry.file === 'string'
    && entry.file.length > 0
    && Number.isFinite(entry.w) && entry.w > 0
    && Number.isFinite(entry.h) && entry.h > 0;
}

async function initSnapshots() {
  try {
    metaEl.textContent = 'Scanning event archives...';

    const res = await fetch(MANIFEST_URL, { cache: 'no-store' });
    if (!res.ok) throw new Error(`manifest.json not found (${res.status})`);

    const manifest = await res.json();
    const events = Object.keys(manifest)
      .filter(name => Array.isArray(manifest[name]))
      .sort((a, b) => b.localeCompare(a));

    if (events.length === 0) {
      metaEl.textContent = 'No event folders found.';
      renderMessage('No galleries found. Add folders under /assets/events/ and run tools/build-gallery.py.');
      return;
    }

    galleryEl.replaceChildren();
    events.forEach(name => {
      const photos = manifest[name].filter(isValidPhoto);
      galleryEl.appendChild(renderEventGallery(name, photos));
    });
    metaEl.textContent = `${events.length} EVENT GALLER${events.length === 1 ? 'Y' : 'IES'} LOADED`;

  } catch (err) {
    console.error(err);
    metaEl.textContent = 'Unable to load galleries.';
    renderMessage('Could not load the gallery manifest. See the browser console for details.');
  }
}

document.addEventListener('DOMContentLoaded', initSnapshots);
