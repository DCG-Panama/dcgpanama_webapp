const EVENTS_ROOT  = '../assets/events/';
const MANIFEST_URL = `${EVENTS_ROOT}manifest.json`;

const metaEl    = document.getElementById('gallery-meta');
const galleryEl = document.getElementById('events-gallery');

const PREVIEW_COUNT  = 4;   // tiles shown before "View All"
const SCROLL_BATCH   = 20;  // images loaded per scroll trigger
const SCROLL_TRIGGER = 400; // px from bottom to trigger next batch

// ─── Helpers ──────────────────────────────────────────────
function toTitle(str) {
  return str.replace(/[-_]+/g, ' ').trim()
            .replace(/\b\w/g, c => c.toUpperCase());
}

function renderMessage(msg) {
  galleryEl.innerHTML = `<div class="gallery-message">${msg}</div>`;
}

function makeTile(src, alt) {
  const figure = document.createElement('figure');
  figure.className = 'event-photo';
  const img = document.createElement('img');
  img.dataset.src = src;
  img.alt = alt;
  img.decoding = 'async';
  // download button overlay
  const overlay = document.createElement('div');
  overlay.className = 'photo-dl-overlay';
  const dlBtn = document.createElement('a');
  dlBtn.className = 'photo-dl-btn';
  dlBtn.href = src;
  dlBtn.download = src.split('/').pop();
  dlBtn.setAttribute('aria-label', `Download ${alt}`);
  dlBtn.innerHTML = '&#x2193; SAVE';
  dlBtn.addEventListener('click', e => e.stopPropagation());
  overlay.appendChild(dlBtn);
  figure.appendChild(img);
  figure.appendChild(overlay);
  return figure;
}

// Assign src to an img that still has data-src
function loadTile(figure) {
  const img = figure.querySelector('img');
  if (img && img.dataset.src) {
    img.src = img.dataset.src;
    delete img.dataset.src;
  }
}

// ─── Page-level lazy loader (for the 9-tile preview grid) ─
const pageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    loadTile(entry.target);
    pageObserver.unobserve(entry.target);
  });
}, { rootMargin: '200px 0px' });

// ─── Render one event card ─────────────────────────────────
function renderEventGallery(eventName, imageFiles) {
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
  countEl.textContent = `${imageFiles.length} SNAPSHOT${imageFiles.length === 1 ? '' : 'S'}`;
  head.appendChild(titleEl);
  head.appendChild(countEl);
  card.appendChild(head);

  if (imageFiles.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'event-empty';
    empty.textContent = 'No image files found in this event folder.';
    card.appendChild(empty);
    return card;
  }

  const hasMore = imageFiles.length > PREVIEW_COUNT;

  // ── Preview grid (9 tiles, page-level lazy) ──
  const previewGrid = document.createElement('div');
  previewGrid.className = 'event-photo-grid';

  imageFiles.slice(0, PREVIEW_COUNT).forEach((f, i) => {
    const src   = `${EVENTS_ROOT}${encodeURIComponent(eventName)}/${encodeURIComponent(f)}`;
    const tile  = makeTile(src, `${toTitle(eventName)} ${i + 1}`);
    pageObserver.observe(tile);
    previewGrid.appendChild(tile);
  });

  card.appendChild(previewGrid);

  if (!hasMore) return card;

  // ── "View All" button ──
  const btn = document.createElement('button');
  btn.className = 'event-gallery-expand';
  btn.innerHTML = `<span class="expand-label">VIEW ALL ${imageFiles.length} SNAPSHOTS</span><span class="expand-arrow">&#x25BE;</span>`;
  card.appendChild(btn);

  // ── Scroll container (hidden until button clicked) ──
  const scrollWrap = document.createElement('div');
  scrollWrap.className = 'gallery-scroll-wrap';   // height-limited, overflow-y scroll
  scrollWrap.style.display = 'none';

  const scrollGrid = document.createElement('div');
  scrollGrid.className = 'gallery-scroll-grid';
  scrollWrap.appendChild(scrollGrid);
  card.appendChild(scrollWrap);

  // Build ALL tile elements upfront (no src yet — just placeholders)
  const allTiles = imageFiles.map((f, i) => {
    const src = `${EVENTS_ROOT}${encodeURIComponent(eventName)}/${encodeURIComponent(f)}`;
    return makeTile(src, `${toTitle(eventName)} ${i + 1}`);
  });

  let loaded = 0;

  function loadBatch(count) {
    const end = Math.min(loaded + count, allTiles.length);
    for (let i = loaded; i < end; i++) {
      scrollGrid.appendChild(allTiles[i]);
      loadTile(allTiles[i]);
    }
    loaded = end;
  }

  // Load more when near the bottom of the scroll container
  scrollWrap.addEventListener('scroll', () => {
    if (loaded >= allTiles.length) return;
    if (scrollWrap.scrollTop + scrollWrap.clientHeight >= scrollWrap.scrollHeight - SCROLL_TRIGGER) {
      loadBatch(SCROLL_BATCH);
    }
  }, { passive: true });

  // Toggle open/close
  let isOpen = false;
  btn.addEventListener('click', () => {
    isOpen = !isOpen;

    // Hide the 9-tile preview while the full scroll view is open
    previewGrid.style.display = isOpen ? 'none' : '';
    scrollWrap.style.display  = isOpen ? '' : 'none';

    btn.classList.toggle('expanded', isOpen);
    btn.querySelector('.expand-label').textContent = isOpen
      ? 'COLLAPSE GALLERY'
      : `VIEW ALL ${imageFiles.length} SNAPSHOTS`;

    // Load first batch only once
    if (isOpen && loaded === 0) {
      loadBatch(SCROLL_BATCH);
    }

    if (isOpen) {
      setTimeout(() => scrollWrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
    }
  });

  return card;
}

// ─── Init ─────────────────────────────────────────────────
async function initSnapshots() {
  try {
    metaEl.textContent = 'Scanning event archives...';

    const res = await fetch(MANIFEST_URL, { cache: 'no-store' });
    if (!res.ok) throw new Error(`manifest.json not found (${res.status})`);

    const manifest = await res.json();
    const events   = Object.keys(manifest).sort((a, b) => b.localeCompare(a));

    if (events.length === 0) {
      metaEl.textContent = 'No event folders found.';
      renderMessage('No galleries found. Add folders under /assets/events/ and regenerate manifest.json.');
      return;
    }

    galleryEl.innerHTML = '';
    events.forEach(name => galleryEl.appendChild(renderEventGallery(name, manifest[name])));
    metaEl.textContent = `${events.length} EVENT GALLER${events.length === 1 ? 'Y' : 'IES'} LOADED`;

  } catch (err) {
    console.error(err);
    metaEl.textContent = 'Unable to load galleries.';
    renderMessage(`Could not load gallery manifest. ${err.message}`);
  }
}

document.addEventListener('DOMContentLoaded', initSnapshots);