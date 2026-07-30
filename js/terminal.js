/* ============================================
   DCG PANAMA — INFORMATION TERMINAL
   A real, navigable filesystem. Output is built with createElement and
   textContent only: nothing typed into the prompt is ever parsed as markup.
============================================ */
(function () {
  'use strict';

  const out = document.getElementById('term-out');
  const input = document.getElementById('term-in');
  const promptEl = document.getElementById('term-prompt');
  if (!out || !input) return;

  // Copy that only exists here; the literal is the English, lang.js has Spanish.
  function tr(key, fallback) {
    return (window.I18N ? window.I18N.t('term.' + key) : null) ?? fallback;
  }

  const fs = {
    '/': {
      type: 'dir',
      children: ['about', 'community', 'operations', 'README.txt']
    },
    '/README.txt': {
      type: 'file',
      key: 'readme',
      content: `══════════════════════════════════════════════════════
           DEF CON GROUP PANAMA (DCG PANAMA)          
          Panama's First DEF CON Group Chapter         
══════════════════════════════════════════════════════

Welcome, operator.

This is the official information terminal for DCG Panama.
Navigate the filesystem to learn about our group.

Start with: ls
Then explore directories with: cd <directory>
Read files with: cat <filename>

Type 'help' for available commands.
Type 'tree' for a full overview of available content.`
    },
    '/about': {
      type: 'dir',
      children: ['mission.txt', 'vision.txt', 'core_values.txt', 'operating_principles.txt']
    },
    '/about/mission.txt': {
      type: 'file',
      key: 'mission',
      content: `>> MISSION STATEMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

To build and strengthen Panama's offensive security community by creating a collaborative environment where hackers, penetration testers, and security researchers can share knowledge, develop technical skills, and advance real-world cybersecurity capabilities through hands-on learning, research, and ethical experimentation.
\\
We aim to foster a culture of responsible hacking, technical excellence, and continuous learning by organizing meetups, workshops, challenges, and research initiatives focused on offensive security disciplines.`
    },
    '/about/vision.txt': {
      type: 'file',
      key: 'vision',
      content: `>> VISION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

To establish DEF CON Group Panama as one of the leading offensive security communities in Panama, recognized for developing highly skilled security professionals, advancing offensive security research, and contributing to the global hacker ecosystem.
\\
Our vision is to create a self-sustaining hacker culture where knowledge flows openly, innovation thrives, and members evolve into world-class offensive security practitioners.`
    },
    '/about/core_values.txt': {
      type: 'file',
      key: 'values',
      content: `>> CORE VALUES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[1] KNOWLEDGE SHARING
    We believe knowledge grows when shared openly among trusted peers.
\\
[2] HANDS-ON LEARNING
    Real skill comes from practice, experimentation, and technical exploration.
\\
[3] ETHICAL RESPONSIBILITY
    We promote responsible hacking and the ethical use of offensive security skills.
\\
[4] CURIOSITY AND INNOVATION
    We encourage exploration, creativity, and pushing technical boundaries.
\\
[5] COMMUNITY AND COLLABORATION
    We grow stronger by learning and building together.`
    },
    '/about/operating_principles.txt': {
      type: 'file',
      key: 'principles',
      content: `>> OPERATING PRINCIPLES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

> Open to offensive security professionals and serious learners
> Focus on technical depth, not superficial content
> Encourage hands-on experimentation and research
> Maintain a respectful and collaborative environment
> Preserve the authentic hacker culture aligned with DEF CON values`
    },
    '/community': {
      type: 'dir',
      children: ['core_goals.txt', 'who_we_are.txt', 'join.txt']
    },
    '/community/core_goals.txt': {
      type: 'file',
      key: 'goals',
      content: `>> CORE GOALS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[GOAL 1] BUILD A STRONG HACKER COMMUNITY IN PANAMA
  Create a trusted, collaborative space where offensive security professionals and enthusiasts can connect, learn, and grow together.
\\
[GOAL 2] ADVANCE OFFENSIVE SECURITY SKILLS AND RESEARCH
  Promote deep technical knowledge in areas such as:
  > Red Team operations
  > Network and Web exploitation
  > EDR evasion and detection bypass
  > Physical security and access bypass
  > Hardware and embedded systems hacking
  > Radio Frequency (RF) hacking
  > Automotive security research
  > Threat emulation and adversary simulation
  > Active Directory attacks
  > APPSEC
  > Social engineering
  > Cloud hacking
\\
[GOAL 3] PROMOTE HANDS-ON LEARNING
  Encourage practical experimentation through:
  > Capture The Flag (CTF) events
  > Tool demonstrations
  > Live attack simulations
  > Hardware hacking labs
  > Offensive tool development
\\
[GOAL 4] CONTRIBUTE TO THE GLOBAL HACKER ECOSYSTEM
  Position Panama as an active contributor to the international offensive security community by fostering talent capable of participating in:
  > DEF CON and other cybersecurity conferences
  > Global CTF competitions
  > Security research
  > Bug bounty programs
  > Red Team engagements`
    },
    '/community/who_we_are.txt': {
      type: 'file',
      key: 'who',
      content: `>> WHO WE ARE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DCG Panama is the first official DEF CON Group in Panama.
<tr>
We are a community of:
  > Penetration Testers
  > Red Team Operators
  > Security Researchers
  > Hardware Hackers
  > Reverse Engineers
  > Bug Bounty Hunters
  > Offensive Tool Developers

And anyone with genuine curiosity about how systems really work.

We are not spectators. We are operators.`
    },
    '/community/join.txt': {
      type: 'file',
      key: 'join',
      content: `>> JOIN DCG PANAMA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Want to be part of Panama's offensive security community?

REQUIREMENTS:
  > Genuine interest in offensive security
  > Willingness to learn and share knowledge
  > Respect for ethical boundaries
  > Desire to contribute, not just consume
\\
HOW TO CONNECT:
  > Attend our meetups and events
  > Follow our community channels
  > Participate in CTF challenges
  > Share your research and tools

There are no spectators here.

// Stay connected for upcoming events and meetups.`
    },
    '/operations': {
      type: 'dir',
      children: ['focus_areas.txt', 'activities.txt']
    },
    '/operations/focus_areas.txt': {
      type: 'file',
      key: 'focus',
      content: `>> FOCUS AREAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[01] Red Team Operations
We become the adversary. Full-spectrum intrusion, persistence, lateral movement, and complete domain domination without detection.
\\
[02] Network & Web Exploitation
Breaking exposed surfaces. Exploiting services, abusing protocols, and tearing through web applications to gain initial footholds.
\\
[03] EDR Evasion & Detection Bypass
Silencing the watchdogs. Bypassing EDR, evading telemetry, and executing payloads while remaining invisible to defensive controls.
\\
[04] Physical Security & Access Bypass
When firewalls fail, doors fall next. Lock bypass, badge cloning, and physical intrusion to access what was never meant to be reached.
\\
[05] Hardware & Embedded Systems Hacking
Owning devices below the operating system. Firmware extraction, hardware implants, and embedded system compromise.
\\
[06] Radio Frequency (RF) Hacking
Weaponizing the airwaves. Intercepting, decoding, and exploiting wireless communications across unknown frequencies.
\\
[07] Automotive Security Research
Breaking machines in motion. CAN bus injection, ECU compromise, and full control over vehicle systems.
\\
[08] Threat Emulation & Adversary Simulation
Thinking like real attackers. Reproducing nation-state tradecraft, adversary TTPs, and real-world attack chains.
\\
[09] Active Directory Attacks
Total enterprise takeover. Privilege escalation, credential harvesting, and complete domain compromise.
\\
[10] APPSEC
Breaking applications at their core. Injection, logic abuse, auth bypass, and weaponizing code flaws to achieve full compromise.
\\
[11] Social Engineering
Attacking the human layer. Pretexting, phishing infrastructure, and physical impersonation to bypass controls no exploit can reach.
\\
[12] Cloud Hacking
Breaking managed infrastructure. Identity abuse, misconfigured IAM, exposed metadata services, and lateral movement across cloud tenants.`
},
    '/operations/activities.txt': {
      type: 'file',
      key: 'activities',
      content: `>> ACTIVITIES & OPERATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

REGULAR ACTIVITIES:
  > Capture The Flag (CTF) Events
  > Tool Demonstrations & Workshops
  > Live Attack Simulations
  > Hardware Hacking Labs
  > Offensive Tool Development Sessions
\\
RESEARCH INITIATIVES:
  > Vulnerability Research
  > Exploit Development
  > Security Tool Creation
  > Technique Documentation
\\
COMMUNITY EVENTS:
  > Monthly Meetups
  > Conference Prep Sessions
  > Knowledge Sharing Talks
  > Collaborative Research Projects`
    }
  };

  let cwd = '/';
  const history = [];
  let histIndex = -1;

  // ── Output ────────────────────────────────
  function line(text, cls) {
    const div = document.createElement('div');
    div.className = 'ln' + (cls ? ' ' + cls : '');
    div.textContent = text;              // never innerHTML
    out.appendChild(div);
    out.scrollTop = out.scrollHeight;
    return div;
  }

  function blank() { line(' '); }

  function setPrompt() {
    promptEl.textContent = (cwd === '/' ? '~' : '~' + cwd) + ' $';
  }

  // ── Path handling ─────────────────────────
  function resolve(p) {
    if (!p) return cwd;
    const abs = p.startsWith('/') ? p : (cwd === '/' ? '/' + p : cwd + '/' + p);
    const parts = abs.split('/').filter(Boolean);
    const stack = [];
    parts.forEach(part => {
      if (part === '.') return;
      if (part === '..') { stack.pop(); return; }
      stack.push(part);
    });
    return '/' + stack.join('/');
  }

  // ── Commands ──────────────────────────────
  const commands = {
    help() {
      blank();
      line(tr('help.title', 'Available commands:'), 'head');
      [['ls', tr('help.ls', 'List directory contents')],
       ['cd', tr('help.cd', 'Change directory')],
       ['cat', tr('help.cat', 'Display file contents')],
       ['pwd', tr('help.pwd', 'Print working directory')],
       ['tree', tr('help.tree', 'Show full directory tree')],
       ['whoami', tr('help.whoami', 'Display current user')],
       ['clear', tr('help.clear', 'Clear terminal')],
       ['help', tr('help.help', 'Show this help message')],
      ].forEach(([cmd, desc]) => line('  ' + cmd.padEnd(10) + desc));
      blank();
    },

    ls(args) {
      const target = resolve(args[0]);
      const node = fs[target];
      if (!node || node.type !== 'dir') {
        line('ls: ' + (args[0] || target) + ': No such directory', 'err');
        return;
      }
      node.children.forEach(child => {
        const full = target === '/' ? '/' + child : target + '/' + child;
        const isDir = fs[full] && fs[full].type === 'dir';
        line((isDir ? '  ' + child + '/' : '  ' + child), isDir ? 'accent' : null);
      });
    },

    cd(args) {
      if (!args[0] || args[0] === '~') { cwd = '/'; setPrompt(); return; }
      const target = resolve(args[0]);
      const node = fs[target];
      if (!node) { line('cd: ' + args[0] + ': No such file or directory', 'err'); return; }
      if (node.type !== 'dir') { line('cd: ' + args[0] + ': Not a directory', 'err'); return; }
      cwd = target;
      setPrompt();
    },

    cat(args) {
      if (!args[0]) { line('cat: missing operand', 'err'); return; }
      const target = resolve(args[0]);
      const node = fs[target];
      if (!node) { line('cat: ' + args[0] + ': No such file or directory', 'err'); return; }
      if (node.type === 'dir') { line('cat: ' + args[0] + ': Is a directory', 'err'); return; }

      blank();
      tr(node.key, node.content).split('\n').forEach(raw => {
        const text = raw.replace(/\s+$/, '');
        if (!text) { blank(); return; }
        if (text.startsWith('>>')) line(text.replace(/^>>\s*/, ''), 'head');
        else if (/^[━═]/.test(text)) return;              // the rules are drawn by CSS now
        else if (text === '\\') { blank(); }
        else if (/^\s*>/.test(text)) line(text, 'accent');
        else if (/^\[/.test(text)) line(text, 'head');
        else line(text);
      });
      blank();
    },

    pwd() { line(cwd); },

    whoami() { line('operator'); },

    tree() {
      blank();
      (function walk(path, prefix) {
        const node = fs[path];
        if (!node || node.type !== 'dir') return;
        node.children.forEach((child, i) => {
          const last = i === node.children.length - 1;
          const full = path === '/' ? '/' + child : path + '/' + child;
          const isDir = fs[full] && fs[full].type === 'dir';
          line(prefix + (last ? '└─ ' : '├─ ') + child + (isDir ? '/' : ''), isDir ? 'accent' : null);
          if (isDir) walk(full, prefix + (last ? '   ' : '│  '));
        });
      })('/', '');
      blank();
    },

    clear() { out.replaceChildren(); },
  };

  // ── Input ─────────────────────────────────
  function run(raw) {
    const trimmed = raw.trim();
    line((cwd === '/' ? '~' : '~' + cwd) + ' $ ' + trimmed, 'cmd');
    if (!trimmed) return;

    history.push(trimmed);
    histIndex = history.length;

    // Attack-detection layer (js/attkdetct.js). Payloads never reach the
    // dispatcher; the terminal answers with a taunt instead.
    if (window._0xSECCHECK) {
      const verdict = window._0xSECCHECK(trimmed);
      if (verdict._0x8j9k) {
        blank();
        line(verdict._0x9l0m, 'err');
        blank();
        if (window._0xLOGATTACK) window._0xLOGATTACK(verdict._0xan1b, trimmed);
        return;
      }
    }

    // hasOwnProperty, not a bare lookup: otherwise 'toString' or 'constructor'
    // would resolve up the prototype chain and print a function body.
    if (window._0xEASTEREGG &&
        Object.prototype.hasOwnProperty.call(window._0xEASTEREGG, trimmed)) {
      blank();
      line(window._0xEASTEREGG[trimmed], 'accent');
      blank();
      return;
    }

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (Object.prototype.hasOwnProperty.call(commands, cmd)) {
      commands[cmd](args);
    } else {
      line(cmd + ': command not found', 'err');
      line(tr('notFound', "Type 'help' for available commands."), 'mute');
    }
  }

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      run(input.value);
      input.value = '';
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (histIndex > 0) { histIndex--; input.value = history[histIndex]; }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIndex < history.length - 1) { histIndex++; input.value = history[histIndex]; }
      else { histIndex = history.length; input.value = ''; }
    }
  });

  // Clicking anywhere in the terminal focuses the prompt, as a real one would.
  out.parentElement.addEventListener('click', e => {
    if (window.getSelection().toString()) return;   // don't steal a text selection
    if (e.target.tagName !== 'A') input.focus();
  });

  function greet() {
    out.replaceChildren();
    commands.cat(['/README.txt']);
  }

  setPrompt();
  greet();

  if (window.I18N) window.I18N.onChange(greet);
})();
