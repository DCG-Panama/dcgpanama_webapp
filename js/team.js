/* ============================================
   DCG PANAMA — TEAM PAGE JS
   Matrix rain, navigation, rack clock, syslog
============================================ */

// ----- Matrix Rain -----
(function () {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ01>_{}[]|/\\';
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
})();


// ----- Navigation -----
(function () {
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
})();


// ----- Rack Clock -----
function updateClock() {
  const el = document.getElementById('rack-clock');
  if (!el) return;
  const now = new Date();
  el.textContent = now.toTimeString().slice(0, 8);
}

updateClock();
setInterval(updateClock, 1000);


// ----- Syslog Feed -----
(function () {
  const feed = document.getElementById('syslog-feed');
  if (!feed) return;

  const logMessages = [
    { level: 'INFO', msg: 'UNIT-01 :: Red team simulation initiated — target: internal lab network' },
    { level: 'WARN', msg: 'UNIT-03 :: Anomalous RF signal detected on 433MHz — investigation started' },
    { level: 'INFO', msg: 'UNIT-02 :: SQL injection chain executed — target neutralized in 00:04:22' },
    { level: 'CRIT', msg: 'UNIT-04 :: EDR process killed — payload deployed, persistence established' },
    { level: 'INFO', msg: 'UNIT-05 :: CAN bus frame injected — ECU responded as expected' },
    { level: 'WARN', msg: 'UNIT-01 :: AD domain controller responding — Kerberoasting in progress' },
    { level: 'INFO', msg: 'UNIT-03 :: Badge cloned successfully — physical layer breached in 00:00:47' },
    { level: 'CRIT', msg: 'UNIT-02 :: SSRF chain bypassed WAF — internal metadata exposed' },
    { level: 'INFO', msg: 'DCG-CORE :: New session registered — community asset updated' },
    { level: 'WARN', msg: 'UNIT-04 :: Syscall stomping technique validated against target AV' },
    { level: 'INFO', msg: 'UNIT-05 :: Firmware extracted from target device — analysis pending' },
    { level: 'CRIT', msg: 'UNIT-01 :: LSASS dumped — credential harvest complete' },
    { level: 'INFO', msg: 'DCG-CORE :: Event planning cycle initiated for next DEF CON meetup' },
    { level: 'WARN', msg: 'UNIT-03 :: SDR sweep complete — undocumented frequency bands logged' },
    { level: 'INFO', msg: 'UNIT-02 :: Deserialization gadget chain compiled — awaiting test' },
  ];

  let idx = 0;

  function appendLog() {
    const entry = logMessages[idx % logMessages.length];
    idx++;

    const now = new Date();
    const ts  = now.toTimeString().slice(0, 8);

    const div = document.createElement('div');
    div.className = 'log-entry';
    div.innerHTML = `<span class="log-time">${ts}</span><span class="log-level ${entry.level}">[${entry.level}]</span><span class="log-msg">${entry.msg}</span>`;
    feed.appendChild(div);

    // Keep only last 20 entries
    while (feed.children.length > 20) feed.removeChild(feed.firstChild);
    feed.scrollTop = feed.scrollHeight;
  }

  // Populate initial entries
  for (let i = 0; i < 6; i++) appendLog();
  setInterval(appendLog, 2200);
})();

// Nav fallback (por si main.js no carga)
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (!toggle || !links) return;

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
});