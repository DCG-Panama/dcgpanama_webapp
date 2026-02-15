/* ============================================
   DCG PANAMA — MAIN JS
   Matrix rain, navigation, shared utilities
   ============================================ */

// --- Matrix Rain ---
function initMatrixRain() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01>_{}[]|/\\';
  const fontSize = 14;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = new Array(columns).fill(1);

  function draw() {
    ctx.fillStyle = 'rgba(24, 24, 24, 0.22)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff41';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.globalAlpha = Math.random() * 0.5 + 0.1;
      ctx.fillText(char, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
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

// --- Navigation ---
function initNavigation() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.textContent = links.classList.contains('open') ? '[X]' : '[=]';
    });

    // Close on link click (mobile)
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.textContent = '[=]';
      });
    });
  }

  // Active link
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current || (current === 'index.html' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

// --- Boot Sequence Animation ---
function initBootSequence() {
  const bootEl = document.querySelector('.boot-sequence');
  if (!bootEl) return;

  const lines = [
    '> BIOS CHECK .............. OK',
    '> MEMORY TEST ............. 64MB OK',
    '> LOADING KERNEL .......... DONE',
    '> MOUNTING /dev/hack ...... OK',
    '> INIT NETWORK SCAN ....... OK',
    '> LOADING DCG_PANAMA.sys .. OK',
    '> STATUS: OPERATIONAL',
    '> WELCOME, OPERATOR.'
  ];

  lines.forEach((text, i) => {
    const span = document.createElement('div');
    span.className = 'line';
    span.textContent = text;
    span.style.animationDelay = `${0.5 + i * 0.3}s`;
    bootEl.appendChild(span);
  });
}

// --- Counter Animation ---
function animateCounters() {
  const counters = document.querySelectorAll('[data-count]');
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.count);
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.floor(target * eased);
      if (progress < 1) requestAnimationFrame(update);
    }

    // Start when visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          requestAnimationFrame(update);
          observer.disconnect();
        }
      });
    });
    observer.observe(counter);
  });
}

// --- Initialize on DOM Ready ---
document.addEventListener('DOMContentLoaded', () => {
  initMatrixRain();
  initNavigation();
  initBootSequence();
  animateCounters();
});
