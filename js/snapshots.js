const EVENTS_ROOT = '../assets/events/';
const IMAGE_PATTERN = /\.(jpg|jpeg|png|webp|gif|avif)$/i;

const metaEl = document.getElementById('gallery-meta');
const galleryEl = document.getElementById('events-gallery');

function toTitle(input) {
  return input
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, char => char.toUpperCase());
}

function normalizeHref(href) {
  return href.split('#')[0].split('?')[0].trim();
}

function decodeEntry(entry) {
  try {
    return decodeURIComponent(entry);
  } catch {
    return entry;
  }
}

async function fetchDirectoryEntries(url) {
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Cannot access ${url} (${response.status})`);
  }

  const html = await response.text();
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const baseUrl = new URL(url, window.location.href);
  const basePath = baseUrl.pathname.endsWith('/') ? baseUrl.pathname : `${baseUrl.pathname}/`;
  const entries = [];

  doc.querySelectorAll('a[href]').forEach(anchor => {
    const href = anchor.getAttribute('href') || '';
    const raw = normalizeHref(href);
    if (!raw || raw === '/' || raw === './' || raw.startsWith('#')) return;

    let parsed;
    try {
      parsed = new URL(href, baseUrl);
    } catch {
      return;
    }

    if (parsed.origin !== baseUrl.origin) return;
    if (!parsed.pathname.startsWith(basePath)) return;

    const relative = parsed.pathname.slice(basePath.length);
    if (!relative) return;

    // Keep only direct children from the current folder
    if (relative.includes('/')) {
      if (!relative.endsWith('/')) return;
      const folderName = relative.slice(0, -1);
      if (!folderName || folderName.includes('/')) return;
      entries.push(`${decodeEntry(folderName)}/`);
      return;
    }

    entries.push(decodeEntry(relative));
  });

  return [...new Set(entries)];
}

function getEventDirectories(entries) {
  return entries
    .filter(entry => entry.endsWith('/'))
    .map(entry => entry.replace(/\/$/, ''))
    .sort((a, b) => b.localeCompare(a));
}

function getImageFiles(entries) {
  return entries
    .filter(entry => !entry.endsWith('/'))
    .filter(entry => IMAGE_PATTERN.test(entry))
    .sort((a, b) => a.localeCompare(b));
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

  const grid = document.createElement('div');
  grid.className = 'event-photo-grid';

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

  eventCard.appendChild(header);

  if (imageFiles.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'event-empty';
    empty.textContent = 'No image files found in this event folder.';
    eventCard.appendChild(empty);
    return eventCard;
  }

  eventCard.appendChild(grid);
  return eventCard;
}

async function initSnapshots() {
  try {
    metaEl.textContent = 'Scanning event archives...';
    const rootEntries = await fetchDirectoryEntries(EVENTS_ROOT);
    const events = getEventDirectories(rootEntries);

    if (events.length === 0) {
      metaEl.textContent = 'No event folders found.';
      renderMessage('No event galleries found. Add folders under /assets/events/<event-name>/ with image files.');
      return;
    }

    galleryEl.innerHTML = '';

    for (const eventName of events) {
      const eventUrl = `${EVENTS_ROOT}${encodeURIComponent(eventName)}/`;
      let imageFiles = [];

      try {
        const eventEntries = await fetchDirectoryEntries(eventUrl);
        imageFiles = getImageFiles(eventEntries);
      } catch (error) {
        console.warn(`Failed to read event folder: ${eventName}`, error);
      }

      galleryEl.appendChild(renderEventGallery(eventName, imageFiles));
    }

    metaEl.textContent = `${events.length} EVENT GALLER${events.length === 1 ? 'Y' : 'IES'} LOADED`;
  } catch (error) {
    console.error(error);
    metaEl.textContent = 'Unable to load event galleries.';
    const detail = error instanceof Error ? error.message : 'Unknown error';
    renderMessage(`Could not read /assets/events/. Check server directory listing and path access. Detail: ${detail}`);
  }
}

document.addEventListener('DOMContentLoaded', initSnapshots);
