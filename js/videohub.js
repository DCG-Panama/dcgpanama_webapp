/* ============================================
   DCG PANAMA — VIDEO HUB
   Embeds and thumbnails are accepted only from an explicit origin allow-list,
   so a bad entry in VIDEOS cannot turn into an arbitrary iframe.
============================================ */
(function () {
  'use strict';

  const VIDEOS = [
    {
      id: 'v001',
      title: 'Hallucinations and Evasions: Red Teaming with AI-Generated Malware - Alejandro Torres',
      embed: 'https://odysee.com/%24/embed/%40zerotrustoffsec%3A1%2Fdcgpa01-Red-Teaming-with-AI-Generated-Malware%3Ab?r=HzgmZTDLvBSdTiNaRMh2nPPTYZMPEj61',
      thumbnail: 'https://thumbs.odycdn.com/2970d2eb170506fa12b7b5e917c837fc.webp',
      date: '2026-05-02',
      duration: '31:17',
      tags: ['Conference', 'AI', 'malware', 'Red Team'],
      desc: 'Red teaming with AI-generated malware: hallucinations, evasions and what actually survives contact with a defended environment.',
    },
    {
      id: 'v002',
      title: 'Post-Compromise Session — Attacks on Entra ID - Elzer Pineda',
      embed: 'https://odysee.com/%24/embed/%40zerotrustoffsec%3A1%2Fdcgpa02-Post-Compromise-Session-Attacks-Entra-ID%3A2?r=HzgmZTDLvBSdTiNaRMh2nPPTYZMPEj61',
      thumbnail: 'https://thumbs.odycdn.com/4263fe862e4430695283db8f1754ee2a.webp',
      date: '2026-05-02',
      duration: '36:22',
      tags: ['Azure', 'Red Team', 'EDR Bypass'],
      desc: 'What an operator does after the first foothold in an Entra ID tenant.',
    },
    {
      id: 'v003',
      title: 'Economía Oscura: XMR to $$$ — Raul Moreno',
      embed: 'https://odysee.com/%24/embed/%40zerotrustoffsec%3A1%2Feconomia-oscura-raul-moreno%3A2?r=HzgmZTDLvBSdTiNaRMh2nPPTYZMPEj61',
      thumbnail: 'https://thumbs.odycdn.com/8640933c9964b4e649e40b1f8d34f123.webp',
      date: '2026-07-19',
      duration: '40:59',
      tags: ['Conference', 'Crypto'],
      desc: 'Economía Oscura: XMR to $$$ — talk by Raul Moreno at a DCG Panama meetup.',
    },
    {
      id: 'v004',
      title: 'Tácticas, Técnicas y Procedimientos: Estrategia para una operación ofensiva — John Kent',
      embed: 'https://odysee.com/%24/embed/%40zerotrustoffsec%3A1%2FTacticas%2C-Tecnicas-y-Procedimientos---john-kent%3Ae?r=HzgmZTDLvBSdTiNaRMh2nPPTYZMPEj61',
      thumbnail: 'https://thumbs.odycdn.com/dbfafc8bf4b04a786a00035033123185.webp',
      date: '2026-07-19',
      duration: '29:22',
      tags: ['Conference', 'Red Team', 'TTPs'],
      desc: 'Tácticas, Técnicas y Procedimientos: estrategia para una operación ofensiva — talk by John Kent at a DCG Panama meetup.',
    },
  ];

  const EMBED_ORIGINS = ['https://odysee.com', 'https://www.youtube.com', 'https://youtube.com'];
  const THUMB_ORIGINS = ['https://thumbs.odycdn.com', 'https://i.ytimg.com', 'https://odysee.com'];

  function allowed(url, origins) {
    try {
      return origins.indexOf(new URL(url).origin) !== -1;
    } catch (err) {
      // A malformed URL is simply not renderable; treat it as disallowed.
      return false;
    }
  }

  function tr(key, fallback) {
    return (window.I18N ? window.I18N.t('vid.' + key) : null) ?? fallback;
  }

  const grid = document.getElementById('video-grid');
  const gridView = document.getElementById('hub-grid');
  const playerView = document.getElementById('hub-player');
  const countEl = document.getElementById('video-count');
  const pills = document.getElementById('tag-filters');
  const search = document.getElementById('hub-search');
  if (!grid) return;

  let query = '';
  let activeTag = null;

  const fmtDate = iso => {
    const [y, m, d] = iso.split('-');
    return `${d}.${m}.${y}`;
  };

  function visible() {
    const q = query.toLowerCase().trim();
    return VIDEOS.slice().sort((a, b) => b.date.localeCompare(a.date)).filter(v => {
      const byTag = !activeTag || v.tags.indexOf(activeTag) !== -1;
      const byQuery = !q || v.title.toLowerCase().includes(q) || v.desc.toLowerCase().includes(q)
        || v.tags.some(t => t.toLowerCase().includes(q));
      return byTag && byQuery;
    });
  }

  function renderPills() {
    const tags = [...new Set(VIDEOS.flatMap(v => v.tags))].sort();
    pills.replaceChildren();

    const clear = document.createElement('button');
    clear.type = 'button';
    clear.className = 'pill';
    clear.textContent = tr('clear', '× CLEAR');
    clear.addEventListener('click', () => { activeTag = null; query = ''; search.value = ''; renderAll(); });
    pills.appendChild(clear);

    tags.forEach(tag => {
      const p = document.createElement('button');
      p.type = 'button';
      p.className = 'pill' + (activeTag === tag ? ' active' : '');
      p.setAttribute('aria-pressed', String(activeTag === tag));
      p.textContent = tag;
      p.addEventListener('click', () => { activeTag = activeTag === tag ? null : tag; renderAll(); });
      pills.appendChild(p);
    });
  }

  function card(v) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'video-card';

    const thumb = document.createElement('div');
    thumb.className = 'video-thumb';
    if (allowed(v.thumbnail, THUMB_ORIGINS)) {
      const img = document.createElement('img');
      img.src = v.thumbnail;
      img.alt = '';
      img.loading = 'lazy';
      // Thumbnails come from a third-party CDN; if one is unreachable the card
      // falls back to the placeholder instead of showing a broken image.
      img.addEventListener('error', () => {
        img.remove();
        const ph = document.createElement('div');
        ph.className = 'empty-state';
        ph.textContent = tr('noPreview', '[ NO PREVIEW ]');
        thumb.prepend(ph);
      });
      thumb.appendChild(img);
    } else {
      const ph = document.createElement('div');
      ph.className = 'empty-state';
      ph.textContent = tr('noPreview', '[ NO PREVIEW ]');
      thumb.appendChild(ph);
    }
    const dur = document.createElement('span');
    dur.className = 'video-dur';
    dur.textContent = v.duration;
    thumb.appendChild(dur);

    const body = document.createElement('div');
    body.className = 'video-body';
    const title = document.createElement('div');
    title.className = 'video-title';
    title.textContent = v.title;
    const meta = document.createElement('div');
    meta.className = 'video-meta';
    meta.textContent = `${fmtDate(v.date)} · ${v.tags.join(' · ')}`;
    body.append(title, meta);

    btn.append(thumb, body);
    btn.addEventListener('click', () => openPlayer(v));
    return btn;
  }

  function renderGrid() {
    const list = visible();
    countEl.textContent = `${list.length} ${tr('signals', 'SIGNALS')}`;
    grid.replaceChildren();

    if (!list.length) {
      const empty = document.createElement('div');
      empty.className = 'empty-state';
      empty.textContent = tr('noSignalSub', 'No videos match your query. Try different tags or keywords.');
      grid.appendChild(empty);
      return;
    }
    list.forEach(v => grid.appendChild(card(v)));
  }

  function openPlayer(v) {
    if (!allowed(v.embed, EMBED_ORIGINS)) return;

    document.getElementById('player-iframe').src = v.embed;
    document.getElementById('player-title').textContent = v.title;
    document.getElementById('player-meta').textContent = `${fmtDate(v.date)} · ${v.duration} · ${v.tags.join(' · ')}`;
    document.getElementById('player-desc').textContent = v.desc;

    const side = document.getElementById('player-side');
    side.replaceChildren();
    VIDEOS.filter(o => o.id !== v.id).forEach(o => side.appendChild(card(o)));

    gridView.hidden = true;
    playerView.hidden = false;
    playerView.scrollIntoView({ block: 'start', behavior: 'auto' });
  }

  function closePlayer() {
    // about:blank, not '': an empty src resolves against the document URL, so
    // the iframe would reload this very page inside itself.
    document.getElementById('player-iframe').src = 'about:blank';
    // Drop the sidebar too, so no stale cards linger in the hidden subtree.
    document.getElementById('player-side').replaceChildren();
    playerView.hidden = true;
    gridView.hidden = false;
  }

  function renderAll() { renderPills(); renderGrid(); }

  document.getElementById('player-back').addEventListener('click', closePlayer);
  search.addEventListener('input', () => { query = search.value; renderGrid(); });

  if (window.I18N) window.I18N.onChange(renderAll);

  renderAll();
})();
