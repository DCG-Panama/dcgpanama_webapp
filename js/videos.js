/* ============================================
   DCG PANAMA — VIDEO HUB JS
   Search, filtering, player view, mini player
============================================ */

// ============================================
// VIDEO DATABASE
// Add your videos here. Each entry:
// {
//   id:        unique string
//   title:     string
//   odyseeUrl: the full embed src URL from Odysee
//   thumbnail: URL to thumbnail image (or null for placeholder)
//   date:      'YYYY-MM-DD'
//   duration:  '00:00' string
//   tags:      ['tag1', 'tag2', ...]
//   desc:      string description
// }
// ============================================
const VIDEOS = [
  {
    id: 'v001',
    title: "Hallucinations and Evasions: Red Teaming with AI-Generated Malware - Alejandro Torres",
    odyseeUrl: 'https://odysee.com/%24/embed/%40zerotrustoffsec%3A1%2Fdcgpa01-Red-Teaming-with-AI-Generated-Malware%3Ab?r=HzgmZTDLvBSdTiNaRMh2nPPTYZMPEj61',
    thumbnail: 'https://thumbs.odycdn.com/2970d2eb170506fa12b7b5e917c837fc.webp',
    date: '2026-05-02',
    duration: '00:31:17',
    tags: ['Conference', 'hacking', 'culture', 'AI', 'malware'],
    desc: "Hallucinations and Evasions: Red Teaming with AI-Generated Malware"
  },
  {
    id: 'v002',
    title: "Post-Compromise Session - Attacks Entra ID - Elzer Pineda",
    odyseeUrl: 'https://odysee.com/%24/embed/%40zerotrustoffsec%3A1%2Fdcgpa02-Post-Compromise-Session-Attacks-Entra-ID%3A2?r=HzgmZTDLvBSdTiNaRMh2nPPTYZMPEj61',
    thumbnail: 'https://thumbs.odycdn.com/4263fe862e4430695283db8f1754ee2a.webp',
    date: '2026-05-02',
    duration: '00:36:22',
    tags: ['Azure', 'Red Team', 'EDR Bypass', 'hacking', 'malware'],
    desc: "Post-Compromise Session - Attacks Entra ID - Elzer Pineda"
  }
  //,
  //{
  //  id: 'v006',
  //  title: "Official DCG Panama Meetup #1 AI generated Teaser Video",
  //  odyseeUrl: 'https://odysee.com/%24/embed/%40zerotrustoffsec%3A1%2Fdcg-panama-meetup1-teaser%3A5?r=HzgmZTDLvBSdTiNaRMh2nPPTYZMPEj61&autoplay=true',
  //  thumbnail: 'https://thumbs.odycdn.com/d9351de6521771c0506943dd2a8898f3.webp',
  //  date: '2026-03-02',
  //  duration: '00:14',
  //  tags: ['Teaser', 'Conference', 'hacking', 'red team'],
  //  desc: "Official DCG Panama Meetup #1 AI generated Teaser Video"
  //}
];

// ============================================
// ALLOWED EMBED ORIGINS
// Only URLs from these origins are permitted as iframe src.
// ============================================
const ALLOWED_EMBED_ORIGINS = [
  'https://www.youtube.com',
  'https://youtube.com',
  'https://odysee.com',
];

// ============================================
// ALLOWED THUMBNAIL ORIGINS
// Only images from these origins are permitted as img src.
// ============================================
const ALLOWED_THUMBNAIL_ORIGINS = [
  'https://i.ytimg.com',
  'https://thumbs.odycdn.com',
  'https://odysee.com',
];

// ============================================
// STATE
// ============================================
let state = {
  view: 'grid',        // 'grid' | 'player'
  currentVideo: null,
  searchQuery: '',
  activeTag: null,
  filteredVideos: [...VIDEOS],
};

// ============================================
// DOM REFS
// ============================================
const gridView     = document.getElementById('hub-grid-view');
const playerView   = document.getElementById('hub-player-view');
const videosGrid   = document.getElementById('videos-grid');
const videoCount   = document.getElementById('video-count');
const tagFilters   = document.getElementById('tag-filters');
const searchInput  = document.getElementById('search-input');

// ============================================
// COLLECT ALL UNIQUE TAGS
// ============================================
function getAllTags() {
  const set = new Set();
  VIDEOS.forEach(v => v.tags.forEach(t => set.add(t)));
  return [...set].sort();
}

// ============================================
// RENDER TAG FILTERS
// ============================================
function renderTagFilters() {
  const tags = getAllTags();
  tagFilters.innerHTML = '';

  const clearBtn = document.createElement('button');
  clearBtn.className = 'tag-pill-clear';
  clearBtn.textContent = '× CLEAR';
  clearBtn.onclick = () => {
    state.activeTag = null;
    state.searchQuery = '';
    searchInput.value = '';
    filterVideos();
    renderTagFilters();
  };
  tagFilters.appendChild(clearBtn);

  tags.forEach(tag => {
    const pill = document.createElement('button');
    pill.className = 'tag-pill' + (state.activeTag === tag ? ' active' : '');
    pill.textContent = tag;
    pill.onclick = () => {
      state.activeTag = state.activeTag === tag ? null : tag;
      filterVideos();
      renderTagFilters();
    };
    tagFilters.appendChild(pill);
  });
}

// ============================================
// FILTER VIDEOS
// ============================================
function filterVideos() {
  const q = state.searchQuery.toLowerCase().trim();
  state.filteredVideos = VIDEOS.filter(v => {
    const matchTag = !state.activeTag || v.tags.includes(state.activeTag);
    const matchQ   = !q || (
      v.title.toLowerCase().includes(q) ||
      v.desc.toLowerCase().includes(q) ||
      v.tags.some(t => t.toLowerCase().includes(q))
    );
    return matchTag && matchQ;
  });
  renderGrid();
}

// ============================================
// RENDER GRID
// ============================================
function renderGrid() {
  videosGrid.innerHTML = '';
  videoCount.textContent = `${state.filteredVideos.length} SIGNALS`;

  if (state.filteredVideos.length === 0) {
    videosGrid.innerHTML = `
      <div class="no-results">
        <div class="no-results-title">[ NO SIGNAL ]</div>
        <div class="no-results-sub">No videos match your query. Try different tags or keywords.</div>
      </div>`;
    return;
  }

  state.filteredVideos.forEach(video => {
    const card = document.createElement('div');
    card.className = 'video-card';

    const thumbContainer = document.createElement('div');
    thumbContainer.className = 'card-thumb';

    if (video.thumbnail && isSafeUrl(video.thumbnail, ALLOWED_THUMBNAIL_ORIGINS)) {
      const img = document.createElement('img');
      img.src     = video.thumbnail;          // safe — origin validated above
      img.alt     = video.title;              // textContent-equivalent via property
      img.loading = 'lazy';
      thumbContainer.appendChild(img);
    } else {
      const placeholder = document.createElement('div');
      placeholder.className = 'card-thumb-placeholder';
      placeholder.textContent = '[ NO PREVIEW ]';
      thumbContainer.appendChild(placeholder);
    }

    const overlay = document.createElement('div');
    overlay.className = 'card-play-overlay';
    const playIcon = document.createElement('div');
    playIcon.className = 'play-icon';
    overlay.appendChild(playIcon);
    thumbContainer.appendChild(overlay);

    const body = document.createElement('div');
    body.className = 'card-body';

    const titleEl = document.createElement('div');
    titleEl.className = 'card-title';
    titleEl.textContent = video.title;        // textContent — no XSS

    const metaEl = document.createElement('div');
    metaEl.className = 'card-meta';
    const dateSpan = document.createElement('span');
    dateSpan.textContent = formatDate(video.date);
    const durSpan = document.createElement('span');
    durSpan.textContent = video.duration;
    metaEl.appendChild(dateSpan);
    metaEl.appendChild(durSpan);

    const descEl = document.createElement('div');
    descEl.className = 'card-desc';
    descEl.textContent = video.desc;          // textContent — no XSS

    const tagsEl = document.createElement('div');
    tagsEl.className = 'card-tags';
    video.tags.forEach(t => {
      const span = document.createElement('span');
      span.className = 'card-tag';
      span.dataset.tag = t;                   // safe property assignment
      span.textContent = t;                   // safe
      tagsEl.appendChild(span);
    });

    body.appendChild(titleEl);
    body.appendChild(metaEl);
    body.appendChild(descEl);
    body.appendChild(tagsEl);
    card.appendChild(thumbContainer);
    card.appendChild(body);

    // Click card → open player
    card.addEventListener('click', (e) => {
      if (e.target.classList.contains('card-tag')) {
        e.stopPropagation();
        state.activeTag = e.target.dataset.tag;
        filterVideos();
        renderTagFilters();
        return;
      }
      openPlayer(video);
    });

    videosGrid.appendChild(card);
  });
}

// ============================================
// OPEN PLAYER VIEW
// ============================================
function openPlayer(video) {
  state.view = 'player';
  state.currentVideo = video;

  gridView.style.display = 'none';
  playerView.classList.add('active');

  const safeId = sanitizeVideoId(video.id);
  history.pushState({ videoId: safeId }, '', `?v=${encodeURIComponent(safeId)}`);

  loadPlayerContent(video);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Shared logic for populating the player view
function loadPlayerContent(video) {
  const mainIframe = document.getElementById('player-iframe');

  if (isSafeUrl(video.odyseeUrl, ALLOWED_EMBED_ORIGINS)) {
    mainIframe.src = video.odyseeUrl;
  } else {
    mainIframe.src = '';
    console.warn('Blocked unsafe embed URL:', video.odyseeUrl);
  }

  // uning textContent for all user-visible fields — no XSS possible
  document.getElementById('player-title').textContent    = video.title;
  document.getElementById('player-date').textContent     = formatDate(video.date);
  document.getElementById('player-duration').textContent = video.duration;
  document.getElementById('player-desc').textContent     = video.desc;

  // build player tags via DOM API
  const tagsEl = document.getElementById('player-tags');
  tagsEl.innerHTML = '';
  video.tags.forEach(t => {
    const span = document.createElement('span');
    span.className = 'player-tag';
    span.dataset.tag = t;
    span.textContent = t;
    span.addEventListener('click', () => {
      state.activeTag = t;
      closePlayer();
      filterVideos();
      renderTagFilters();
    });
    tagsEl.appendChild(span);
  });

  renderSidebar(video);
}

// ============================================
// RENDER SIDEBAR
// ============================================
function renderSidebar(currentVideo) {
  const sidebar = document.getElementById('player-sidebar');
  sidebar.innerHTML = '';

  const label = document.createElement('div');
  label.className = 'sidebar-label';
  label.textContent = 'MORE TRANSMISSIONS';
  sidebar.appendChild(label);

  const others = VIDEOS.filter(v => v.id !== currentVideo.id);
  others.forEach(v => buildSidebarCard(sidebar, v));
}

function buildSidebarCard(container, v) {
  const card = document.createElement('div');
  card.className = 'sidebar-card';

  const thumbDiv = document.createElement('div');
  thumbDiv.className = 'sidebar-thumb';

  if (v.thumbnail && isSafeUrl(v.thumbnail, ALLOWED_THUMBNAIL_ORIGINS)) {
    const img = document.createElement('img');
    img.src     = v.thumbnail;
    img.alt     = v.title;
    img.loading = 'lazy';
    thumbDiv.appendChild(img);
  } else {
    const ph = document.createElement('div');
    ph.className = 'sidebar-thumb-placeholder';
    ph.textContent = '[ NO SIG ]';
    thumbDiv.appendChild(ph);
  }

  const info = document.createElement('div');
  info.className = 'sidebar-card-info';

  const titleEl = document.createElement('div');
  titleEl.className = 'sidebar-card-title';
  titleEl.textContent = v.title;

  const metaEl = document.createElement('div');
  metaEl.className = 'sidebar-card-meta';
  metaEl.textContent = `${formatDate(v.date)} · ${v.duration}`;

  info.appendChild(titleEl);
  info.appendChild(metaEl);
  card.appendChild(thumbDiv);
  card.appendChild(info);
  card.addEventListener('click', () => openPlayer(v));
  container.appendChild(card);
}

// ============================================
// CLOSE PLAYER — BACK TO GRID
// ============================================
function closePlayer() {
  document.getElementById('player-iframe').src = '';

  state.view = 'grid';
  state.currentVideo = null;
  playerView.classList.remove('active');
  gridView.style.display = '';

  history.replaceState(null, '', window.location.pathname);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// SEARCH
// ============================================
function initSearch() {
  function doSearch() {
    state.searchQuery = searchInput.value;
    if (state.view === 'player') {
      renderSidebarFiltered(state.currentVideo, state.searchQuery);
    } else {
      filterVideos();
    }
  }

  searchInput.addEventListener('input', doSearch);
  document.getElementById('search-btn').addEventListener('click', doSearch);
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') doSearch();
  });
}

function renderSidebarFiltered(currentVideo, query) {
  const q = query.toLowerCase().trim();
  const sidebar = document.getElementById('player-sidebar');
  sidebar.innerHTML = '';

  const label = document.createElement('div');
  label.className = 'sidebar-label';
  label.textContent = 'MORE TRANSMISSIONS';
  sidebar.appendChild(label);

  const others = VIDEOS.filter(v => {
    if (v.id === currentVideo.id) return false;
    if (!q) return true;
    return (
      v.title.toLowerCase().includes(q) ||
      v.desc.toLowerCase().includes(q) ||
      v.tags.some(t => t.toLowerCase().includes(q))
    );
  });

  if (others.length === 0) {
    const empty = document.createElement('div');
    empty.style.cssText = 'font-family:var(--font-mono);font-size:0.62rem;color:#1a1a1a;padding:1rem;letter-spacing:2px;';
    empty.textContent = '[ NO MATCH ]';
    sidebar.appendChild(empty);
    return;
  }

  others.forEach(v => buildSidebarCard(sidebar, v));
}

// Navigation is handled by main.js — no duplicate needed here.

// ============================================
// MATRIX RAIN
// ============================================
function initMatrixRain() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const chars = 'アイウエオカキクケコサシスセソタチツテト01>_{}[]|/\\';
  const fontSize = 14;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = new Array(columns).fill(1);
  function draw() {
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ff0000';
    ctx.font = `${fontSize}px monospace`;
    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.globalAlpha = Math.random() * 0.4 + 0.05;
      ctx.fillText(char, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  draw();
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// ============================================
// UTILS
// ============================================

// escHtml kept for any legacy use, but main rendering now uses DOM API instead
function escHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { year:'numeric', month:'short', day:'2-digit' });
}

/**
 * URL origin allowlist validator.
 * Returns true only if the URL starts with an approved origin.
 * Prevents javascript:, data:, and off-origin URLs from being
 * injected into img.src or iframe.src.
 */
function isSafeUrl(url, allowedOrigins) {
  try {
    const parsed = new URL(url);
    // Only allow https:
    if (parsed.protocol !== 'https:') return false;
    return allowedOrigins.some(origin => {
      const o = new URL(origin);
      return parsed.origin === o.origin;
    });
  } catch {
    return false;
  }
}

/**
 * Sanitize video ID before using in URL / history state.
 * Allows only alphanumeric characters and hyphens.
 */
function sanitizeVideoId(id) {
  return String(id).replace(/[^a-zA-Z0-9\-_]/g, '');
}

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  renderTagFilters();
  filterVideos();
  initSearch();

  document.getElementById('player-back-btn').addEventListener('click', () => {
    closePlayer();
  });

  window.addEventListener('popstate', (e) => {
    if (e.state && e.state.videoId) {
      const video = VIDEOS.find(v => v.id === e.state.videoId);
      if (video) openPlayerWithoutPush(video);
    } else {
      closePlayerWithoutReplace();
    }
  });

  // Deep-link: if page loads with ?v=id, open that video directly
  const params = new URLSearchParams(window.location.search);
  const rawId  = params.get('v');
  if (rawId) {
    // sanitize before lookup
    const safeId = sanitizeVideoId(rawId);
    const video  = VIDEOS.find(v => v.id === safeId);
    if (video) openPlayerWithoutPush(video);
  }
});

// Opens player without pushing to history (used by popstate)
function openPlayerWithoutPush(video) {
  state.view = 'player';
  state.currentVideo = video;

  gridView.style.display = 'none';
  playerView.classList.add('active');

  loadPlayerContent(video);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Closes player without replacing URL (used by popstate)
function closePlayerWithoutReplace() {
  document.getElementById('player-iframe').src = '';
  state.view = 'grid';
  state.currentVideo = null;
  playerView.classList.remove('active');
  gridView.style.display = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Nav fallback removed — handled by main.js