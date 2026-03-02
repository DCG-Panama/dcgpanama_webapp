const EVENTS_ROOT = '../assets/events/';
const MANIFEST_URL = `${EVENTS_ROOT}manifest.json`;

const metaEl = document.getElementById('gallery-meta');
const galleryEl = document.getElementById('events-gallery');

function toTitle(input) {
  return input
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, char => char.toUpperCase());
}

function renderMessage(message) {
  galleryEl.innerHTML = `<div class="gallery-message">${message}</div>`;
}

function renderEventGallery(eventName, imageFiles) {
  const eventCard = document.createElement('section');
  eventCard.className = 'event-gallery-card';

  const header = document.createElement('div');
  header.className = 'event-gallery-head';

  const title = document.createElement('div');
  title.className = 'event-name';
  title.textContent = toTitle(eventName);

  const count = document.createElement('div');
  count.className = 'event-count';
  count.textContent = `${imageFiles.length} SNAPSHOT${imageFiles.length === 1 ? '' : 'S'}`;

  header.appendChild(title);
  header.appendChild(count);
  eventCard.appendChild(header);

  if (imageFiles.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'event-empty';
    empty.textContent = 'No image files found in this event folder.';
    eventCard.appendChild(empty);
    return eventCard;
  }

  const PREVIEW_COUNT = 9;
  const hasMore = imageFiles.length > PREVIEW_COUNT;

  const grid = document.createElement('div');
  grid.className = hasMore ? 'event-photo-grid collapsed' : 'event-photo-grid';

  imageFiles.forEach((imageFile, index) => {
    const figure = document.createElement('figure');
    figure.className = 'event-photo';

    const img = document.createElement('img');
    img.loading = 'lazy';
    img.decoding = 'async';
    img.src = `${EVENTS_ROOT}${encodeURIComponent(eventName)}/${encodeURIComponent(imageFile)}`;
    img.alt = `${toTitle(eventName)} snapshot ${index + 1}`;

    figure.appendChild(img);
    grid.appendChild(figure);
  });

  eventCard.appendChild(grid);

  if (hasMore) {
    const hidden = imageFiles.length - PREVIEW_COUNT;
    const btn = document.createElement('button');
    btn.className = 'event-gallery-expand';
    btn.innerHTML = `<span class="expand-label">VIEW ALL ${imageFiles.length} SNAPSHOTS</span><span class="expand-arrow">&#x25BE;</span>`;

    btn.addEventListener('click', () => {
      const collapsed = grid.classList.toggle('collapsed');
      btn.classList.toggle('expanded', !collapsed);
      btn.querySelector('.expand-label').textContent = collapsed
        ? `VIEW ALL ${imageFiles.length} SNAPSHOTS`
        : 'COLLAPSE GALLERY';
    });

    eventCard.appendChild(btn);
  }

  return eventCard;
}

async function initSnapshots() {
  try {
    metaEl.textContent = 'Scanning event archives...';

    const response = await fetch(MANIFEST_URL, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Could not load manifest.json (${response.status})`);
    }

    const manifest = await response.json();
    const events = Object.keys(manifest).sort((a, b) => b.localeCompare(a));

    if (events.length === 0) {
      metaEl.textContent = 'No event folders found.';
      renderMessage('No event galleries found. Add folders under /assets/events/<event-name>/ and regenerate manifest.json.');
      return;
    }

    galleryEl.innerHTML = '';
    events.forEach(eventName => {
      galleryEl.appendChild(renderEventGallery(eventName, manifest[eventName]));
    });

    metaEl.textContent = `${events.length} EVENT GALLER${events.length === 1 ? 'Y' : 'IES'} LOADED`;
  } catch (error) {
    console.error(error);
    metaEl.textContent = 'Unable to load event galleries.';
    renderMessage(`Could not load gallery manifest. Detail: ${error.message}`);
  }
}

document.addEventListener('DOMContentLoaded', initSnapshots);
