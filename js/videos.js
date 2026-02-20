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
    title: 'DEF CON 25 - SupaFraud - Official DEF CON Teaser Video',
    odyseeUrl: 'https://www.youtube.com/embed/FNtVqHaWFbU?si=lvxGpN0_F0Quk_z3',
    thumbnail: 'https://i.ytimg.com/vi/FNtVqHaWFbU/hq720.jpg',
    date: '2017-07-18',
    duration: '1:08',
    tags: ['teaser', 'hacking'],
    desc: 'The official DEF CON 25 Teaser Video.'
  },
  {
    id: 'v002',
    title: "DEF CON 33 - Stories from a Tor dev - Roger 'arma' Dingledine",
    odyseeUrl: 'https://www.youtube.com/embed/djM70O0SnsY?si=IOj-1OBBJHjo-Axb',
    thumbnail: 'https://i.ytimg.com/vi/djM70O0SnsY/hqdefault.jpg',
    date: '2025-10-10',
    duration: '42:46',
    tags: ['tor', 'talk', 'anonymity', 'stealth'],
    desc: "What is it actually like to support and balance a global anonymity network, with users ranging from political dissidents to national security analysts? You say it's important to teach law enforcement and governments about privacy and end-to-end encryption, but how do those conversations go in practice? I heard you accidentally got Russia to block all of Azure for a day? Are you ever going to do a Tor talk in China? Wait, who exactly tried to bribe you to leave bugs in Tor to support their criminal schemes?"
  },
  {
    id: 'v003',
    title: "DEF CON 32 - Winning the Game of Active Directory - Brandon Colley",
    odyseeUrl: 'https://www.youtube.com/embed/M-2d3sM3I2o?si=PhwSz-RpbCcXUimp',
    thumbnail: 'https://i.ytimg.com/vi/M-2d3sM3I2o/hqdefault.jpg',
    date: '2024-10-16',
    duration: '43:04',
    tags: ['active directory', 'GOAD', 'talk', 'anonymity', 'pass spray', 'kerberoasting', 'asreproasting','printnightmare'],
    desc: "The Game Of Active Directory (GOAD) is a prebuilt vulnerable Active Directory (AD) environment primarily created for pentesters. Touting over 30 methods of attack, GOAD offers multiple paths to full AD takeover. But is that really how you win the game? Regardless of color, as security professions our goal should be to better secure environments. This talk walks through AD attack strategies, exploiting misconfigurations that ultimately pwn AD. Mitigations for these attacks are discussed and implemented, showcasing how they stop common attacks. Implementing these protections in your environment is truly how you win the Game Of Active Directory."
  },
  {
    id: 'v004',
    title: "DEF CON 32 - RF Attacks on Aviation's Defense Against Mid-Air Collisions - G. Longo, V. Lenders",
    odyseeUrl: 'https://www.youtube.com/embed/p1H6-0clP7U?si=ivJ4O7dgzTimjKPQ',
    thumbnail: 'https://i.ytimg.com/vi/p1H6-0clP7U/sddefault.jpg',
    date: '2024-10-16',
    duration: '26:22',
    tags: ['RF', 'Aviation', 'talk', 'Aviation Radar', 'survillance', 'GPS'],
    desc: "Aviation's Traffic Collision Avoidance System (TCAS) II has been touted as a foolproof safety net since its introduction in the 1980s. But what if we told you that this supposedly impenetrable system can be compromised? For years, attacks on TCAS have been mere theoretical exercises, foiled by an (accidental) built in security feature. That is, until now. In this presentation, we'll reveal the first working RF attacks on TCAS II, demonstrating how to hijack collision avoidance displays and create fake Traffic Advisories (TAs) and Resolution Advisories (RAs). We'll walk you through the technical challenges of building the necessary tooling using commercial off-the-shelf hardware. But that's not all. Our research has also uncovered a second attack capable of remotely disabling an aircraft's TCAS capabilities, rendering it vulnerable to mid-air collisions. The implications are clear: if our findings can be exploited in real-world scenarios, the safety of millions of passengers hangs in the balance. Join us as we lift the lid on this shocking vulnerability and explore the dark side of aviation security."
  },
  {
    id: 'v005',
    title: "🏴‍☠️ DEFCON: Inside the World’s Most Infamous Hacking Conference | Full Documentary",
    odyseeUrl: 'https://www.youtube.com/embed/YcQEXZWSSFE?si=tE322-fehS4EEGQp',
    thumbnail: 'https://i.ytimg.com/vi/YcQEXZWSSFE/sddefault.jpg',
    date: '2024-10-16',
    duration: '26:22',
    tags: ['Documentary', 'Conference', 'hacking', 'culture'],
    desc: "DEFCON: The Full Documentary takes you inside the world's largest and most legendary hacking conference. Witness how ethical hackers, security experts, and cybercriminals gather annually in Las Vegas to discuss vulnerabilities, showcase exploits, and push the boundaries of cybersecurity. This film explores DEFCON's origins, the hacking culture, and the evolving world of cybersecurity, ethical hacking, and digital warfare. Whether you’re a hacker, pentester, or cybersecurity enthusiast, this documentary is a must-watch!"
  }
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
    card.innerHTML = `
      <div class="card-thumb">
        ${video.thumbnail
          ? `<img src="${video.thumbnail}" alt="${escHtml(video.title)}" loading="lazy">`
          : `<div class="card-thumb-placeholder">[ NO PREVIEW ]</div>`
        }
        <div class="card-play-overlay"><div class="play-icon"></div></div>
      </div>
      <div class="card-body">
        <div class="card-title">${escHtml(video.title)}</div>
        <div class="card-meta">
          <span>${formatDate(video.date)}</span>
          <span>${video.duration}</span>
        </div>
        <div class="card-desc">${escHtml(video.desc)}</div>
        <div class="card-tags">${video.tags.map(t =>
          `<span class="card-tag" data-tag="${t}">${t}</span>`
        ).join('')}</div>
      </div>`;

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

  // Load video — pass the URL as-is, no mute param
  const mainIframe = document.getElementById('player-iframe');
  mainIframe.src = video.odyseeUrl;

  // Info
  document.getElementById('player-title').textContent = video.title;
  document.getElementById('player-date').textContent = formatDate(video.date);
  document.getElementById('player-duration').textContent = video.duration;
  document.getElementById('player-desc').textContent = video.desc;

  // Tags
  const tagsEl = document.getElementById('player-tags');
  tagsEl.innerHTML = video.tags.map(t =>
    `<span class="player-tag" data-tag="${t}">${t}</span>`
  ).join('');

  tagsEl.querySelectorAll('.player-tag').forEach(t => {
    t.addEventListener('click', () => {
      state.activeTag = t.dataset.tag;
      closePlayer();
      filterVideos();
      renderTagFilters();
    });
  });

  // Sidebar — all other videos
  renderSidebar(video);

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// RENDER SIDEBAR
// ============================================
function renderSidebar(currentVideo) {
  const sidebar = document.getElementById('player-sidebar');
  sidebar.innerHTML = `<div class="sidebar-label">MORE TRANSMISSIONS</div>`;

  const others = VIDEOS.filter(v => v.id !== currentVideo.id);
  others.forEach(v => {
    const card = document.createElement('div');
    card.className = 'sidebar-card';
    card.innerHTML = `
      <div class="sidebar-thumb">
        ${v.thumbnail
          ? `<img src="${v.thumbnail}" alt="${escHtml(v.title)}" loading="lazy">`
          : `<div class="sidebar-thumb-placeholder">[ NO SIG ]</div>`
        }
      </div>
      <div class="sidebar-card-info">
        <div class="sidebar-card-title">${escHtml(v.title)}</div>
        <div class="sidebar-card-meta">${formatDate(v.date)} · ${v.duration}</div>
      </div>`;
    card.addEventListener('click', () => openPlayer(v));
    sidebar.appendChild(card);
  });
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

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// SEARCH
// Search filters the sidebar if in player view,
// or the grid if in grid view. Never closes player.
// ============================================
function initSearch() {
  function doSearch() {
    state.searchQuery = searchInput.value;
    if (state.view === 'player') {
      // Filter sidebar results without closing player
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

// Render sidebar with search filter applied (used while player is open)
function renderSidebarFiltered(currentVideo, query) {
  const q = query.toLowerCase().trim();
  const sidebar = document.getElementById('player-sidebar');
  sidebar.innerHTML = `<div class="sidebar-label">MORE TRANSMISSIONS</div>`;

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

  others.forEach(v => {
    const card = document.createElement('div');
    card.className = 'sidebar-card';
    card.innerHTML = `
      <div class="sidebar-thumb">
        ${v.thumbnail
          ? `<img src="${v.thumbnail}" alt="${escHtml(v.title)}" loading="lazy">`
          : `<div class="sidebar-thumb-placeholder">[ NO SIG ]</div>`
        }
      </div>
      <div class="sidebar-card-info">
        <div class="sidebar-card-title">${escHtml(v.title)}</div>
        <div class="sidebar-card-meta">${formatDate(v.date)} · ${v.duration}</div>
      </div>`;
    card.addEventListener('click', () => openPlayer(v));
    sidebar.appendChild(card);
  });
}

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.textContent = links.classList.contains('open') ? '[X]' : '[=]';
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.textContent = '[=]';
      });
    });
  }
}

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
function escHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { year:'numeric', month:'short', day:'2-digit' });
}

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initMatrixRain();
  initNavigation();
  renderTagFilters();
  filterVideos();
  initSearch();

  document.getElementById('player-back-btn').addEventListener('click', closePlayer);
});