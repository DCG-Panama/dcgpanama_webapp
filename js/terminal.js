/* ============================================
   DCG PANAMA — TERMINAL JS
   Interactive shell emulator
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const output = document.querySelector('.terminal-output');
  const input = document.querySelector('.terminal-input');
  const promptPath = document.querySelector('.prompt-path');
  const terminalBody = document.querySelector('.terminal-body');

  // --- Virtual Filesystem ---
  const fs = {
    '/': {
      type: 'dir',
      children: ['about', 'community', 'operations', 'README.txt']
    },
    '/README.txt': {
      type: 'file',
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
      content: `>> MISSION STATEMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

To build and strengthen Panama's offensive security community by creating a collaborative environment where hackers, penetration testers, and security researchers can share knowledge, develop technical skills, and advance real-world cybersecurity capabilities through hands-on learning, research, and ethical experimentation.
\\
We aim to foster a culture of responsible hacking, technical excellence, and continuous learning by organizing meetups, workshops, challenges, and research initiatives focused on offensive security disciplines.`
    },
    '/about/vision.txt': {
      type: 'file',
      content: `>> VISION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

To establish DEF CON Group Panama as one of the leading offensive security communities in Panama, recognized for developing highly skilled security professionals, advancing offensive security research, and contributing to the global hacker ecosystem.
\\
Our vision is to create a self-sustaining hacker culture where knowledge flows openly, innovation thrives, and members evolve into world-class offensive security practitioners.`
    },
    '/about/core_values.txt': {
      type: 'file',
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
Breaking applications at their core. Injection, logic abuse, auth bypass, and weaponizing code flaws to achieve full compromise.`
},
    '/operations/activities.txt': {
      type: 'file',
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

  let currentPath = '/';
  const commandHistory = [];
  let historyIndex = -1;

  // --- Resolve path ---
  function resolvePath(input) {
    if (!input) return currentPath;
    
    let path;
    if (input.startsWith('/')) {
      path = input;
    } else {
      path = currentPath === '/' ? '/' + input : currentPath + '/' + input;
    }

    // Handle .. and .
    const parts = path.split('/').filter(Boolean);
    const resolved = [];
    for (const part of parts) {
      if (part === '..') {
        resolved.pop();
      } else if (part !== '.') {
        resolved.push(part);
      }
    }
    return '/' + resolved.join('/') || '/';
  }
  
  // --- Add line to output ---
  function addLine(text, className = '') {
    const div = document.createElement('div');
    div.className = `line ${className}`;
    div.textContent = text;
    output.appendChild(div);
  }

  function addHTML(html, className = '') {
    const div = document.createElement('div');
    div.className = `line ${className}`;
    div.innerHTML = html;
    output.appendChild(div);
  }

  // --- Print prompt record ---
  function addCommandLine(cmd) {
    const pathDisplay = currentPath === '/' ? '~' : '~' + currentPath;
    addHTML(
      `<span style="color:var(--red-primary);text-shadow:0 0 5px var(--red-glow)">operator@dcgpanama</span><span style="color:var(--white-dim)">:</span><span style="color:var(--cyan-accent)">${pathDisplay}</span><span style="color:var(--white)">$ ${escapeHtml(cmd)}</span>`,
      'command'
    );
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // --- Commands ---
  const commands = {
    help() {
      addLine('');
      addLine('Available commands:', 'highlight');
      addLine('');
      const cmds = [
        ['ls', 'List directory contents'],
        ['cd', 'Change directory'],
        ['cat', 'Display file contents'],
        ['pwd', 'Print working directory'],
        ['whoami', 'Display current user'],
        ['tree', 'Show full directory tree'],
        ['clear', 'Clear terminal'],
        ['help', 'Show this help message'],
        ['uname -a', 'Show system info'],
        ['id', 'Show user identity'],
        ['date', 'Show current date'],
        ['echo <text>', 'Print text'],
        ['history', 'Show command history'],
        ['banner', 'Show DCG Panama banner'],
      ];
      cmds.forEach(([cmd, desc]) => {
        addHTML(
          `  <span style="color:var(--red-primary);min-width:180px;display:inline-block;font-weight:bold">${cmd.padEnd(20)}</span> <span style="color:var(--white-dim)">${desc}</span>`
        );
      });
      addLine('');
    },

    ls(args) {
      const targetPath = args[0] ? resolvePath(args[0]) : currentPath;
      const node = fs[targetPath];

      if (!node || node.type !== 'dir') {
        addLine(`ls: cannot access '${args[0] || targetPath}': No such directory`, 'error');
        return;
      }

      const items = node.children;
      let listing = '';
      items.forEach(item => {
        const fullPath = targetPath === '/' ? '/' + item : targetPath + '/' + item;
        const isDir = fs[fullPath] && fs[fullPath].type === 'dir';
        if (isDir) {
          listing += `<span style="color:var(--cyan-accent);font-weight:bold">${item}/</span>    `;
        } else {
          listing += `<span style="color:var(--red-dim)">${item}</span>    `;
        }
      });
      addHTML(listing);
    },

    cd(args) {
      if (!args[0] || args[0] === '~') {
        currentPath = '/';
        updatePrompt();
        return;
      }

      const target = resolvePath(args[0]);
      const node = fs[target];

      if (!node) {
        addLine(`cd: no such file or directory: ${args[0]}`, 'error');
        return;
      }
      if (node.type !== 'dir') {
        addLine(`cd: not a directory: ${args[0]}`, 'error');
        return;
      }

      currentPath = target;
      updatePrompt();
    },

    cat(args) {
      if (!args[0]) {
        addLine('cat: missing operand', 'error');
        return;
      }

      const target = resolvePath(args[0]);
      const node = fs[target];

      if (!node) {
        addLine(`cat: ${args[0]}: No such file or directory`, 'error');
        return;
      }
      if (node.type === 'dir') {
        addLine(`cat: ${args[0]}: Is a directory`, 'error');
        return;
      }

      addLine('');
      node.content.split('\n').forEach(line => {
        if (line.startsWith('>>')) {
          addLine(line, 'header');
        } else if (line.startsWith('━')) {
          addLine(line, 'dim');
        } else if (line.startsWith('  >')) {
          addLine(line, 'highlight');
        } else if (line.match(/^\[.*\]/)) {
          addLine(line, 'info');
        } else if (line.startsWith('╔') || line.startsWith('║') || line.startsWith('╚')) {
          addLine(line, 'header');
        } else {
          addLine(line, 'output');
        }
      });
      addLine('');
    },

    pwd() {
      addLine(currentPath === '/' ? '/' : currentPath, 'output');
    },

    whoami() {
      addLine('operator', 'highlight');
    },

    id() {
      addLine('uid=1337(operator) gid=1337(dcgpanama) groups=1337(dcgpanama),31337(hackers)', 'output');
    },

    uname(args) {
      addLine('DCG-Panama-OS 5.15.0-dcg #1337 SMP PREEMPT x86_64 GNU/Hack', 'output');
    },

    date() {
      addLine(new Date().toString(), 'output');
    },

    echo(args) {
      addLine(args.join(' '), 'output');
    },

    clear() {
      output.innerHTML = '';
    },

    history() {
      commandHistory.forEach((cmd, i) => {
        addLine(`  ${(i + 1).toString().padStart(4)}  ${cmd}`, 'output');
      });
    },

    tree() {
      addLine('');
      addLine('.', 'highlight');
      addLine('├── README.txt', 'output');
      addLine('├── about/', 'info');
      addLine('│   ├── mission.txt', 'output');
      addLine('│   ├── vision.txt', 'output');
      addLine('│   ├── core_values.txt', 'output');
      addLine('│   └── operating_principles.txt', 'output');
      addLine('├── community/', 'info');
      addLine('│   ├── core_goals.txt', 'output');
      addLine('│   ├── who_we_are.txt', 'output');
      addLine('│   └── join.txt', 'output');
      addLine('└── operations/', 'info');
      addLine('    ├── focus_areas.txt', 'output');
      addLine('    └── activities.txt', 'output');
      addLine('');
      addLine('3 directories, 10 files', 'dim');
    },

    banner() {
      const welcomeLines = [
        { text: '      :::::::::   ::::::::   ::::::::          :::::::::     :::  ', cls: 'header' },
        { text: '     :+:    :+: :+:    :+: :+:    :+:         :+:    :+:  :+: :+: ', cls: 'header' },
        { text: '    +:+    +:+ +:+        +:+                +:+    +:+ +:+   +:+ ', cls: 'header' },
        { text: '   +#+    +:+ +#+        :#:                +#++:++#+ +#++:++#++: ', cls: 'header' },
        { text: '  +#+    +#+ +#+        +#+   +#+#         +#+       +#+     +#+  ', cls: 'header' },
        { text: ' #+#    #+# #+#    #+# #+#    #+#         #+#       #+#     #+#   ', cls: 'header' },
        { text: '#########   ########   ########          ###       ###     ###    ', cls: 'header' },
        { text: '', cls: '' },
        { text: "Panama's First DEF CON Group Chapter", cls: 'highlight' },
        { text: '', cls: '' },
      ];

      let delay = 0;
      welcomeLines.forEach((line, i) => {
        setTimeout(() => {
          addLine(line.text, line.cls);
          terminalBody.scrollTop = terminalBody.scrollHeight;
        }, delay);
        delay += 70;
      });
    }
  };

  // --- Update prompt path display ---
  function updatePrompt() {
    if (promptPath) {
      promptPath.textContent = currentPath === '/' ? '~' : '~' + currentPath;
    }
  }

  // --- Process command ---
  function processCommand(cmdStr) {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    // ===== SECURITY CHECK =====
    // Check for attack patterns BEFORE processing
    if (window._0xSECCHECK) {
      const secCheck = window._0xSECCHECK(trimmed);
      if (secCheck._0x8j9k) {
        commandHistory.push(trimmed);
        historyIndex = commandHistory.length;
        addCommandLine(trimmed);
        addLine('');
        addLine(secCheck._0x9l0m, 'error');
        addLine('');
        
        // Log the attack
        if (window._0xLOGATTACK) {
          window._0xLOGATTACK(secCheck._0xan1b, trimmed);
        }
        
        setTimeout(() => {
          terminalBody.scrollTop = terminalBody.scrollHeight;
        }, 10);
        return;
      }
    }

    // Check Easter eggs
    if (window._0xEASTEREGG && window._0xEASTEREGG[trimmed]) {
      commandHistory.push(trimmed);
      historyIndex = commandHistory.length;
      addCommandLine(trimmed);
      addLine('');
      addLine(window._0xEASTEREGG[trimmed], 'highlight');
      addLine('');
      
      setTimeout(() => {
        terminalBody.scrollTop = terminalBody.scrollHeight;
      }, 10);
      return;
    }
    // ===== END SECURITY CHECK =====

    commandHistory.push(trimmed);
    historyIndex = commandHistory.length;

    addCommandLine(trimmed);

    const parts = trimmed.split(/\s+/);
    let cmdName = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Handle composite commands
    if (cmdName === 'uname' && args[0] === '-a') {
      commands.uname(args);
    } else if (commands[cmdName]) {
      commands[cmdName](args);
    } else {
      addLine(`bash: ${cmdName}: command not found. Type 'help' for available commands.`, 'error');
    }

    // Scroll to bottom
    setTimeout(() => {
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }, 10);
  }

  // --- Input handling ---
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        processCommand(input.value);
        input.value = '';
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
          historyIndex--;
          input.value = commandHistory[historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
          historyIndex++;
          input.value = commandHistory[historyIndex];
        } else {
          historyIndex = commandHistory.length;
          input.value = '';
        }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        autocomplete(input);
      } else if (e.key === 'l' && e.ctrlKey) {
        e.preventDefault();
        commands.clear();
      }
    });

    // Focus on click anywhere in terminal
    terminalBody.addEventListener('click', () => {
      input.focus();
    });

    // Initial focus
    input.focus();
  }

  // --- Tab autocomplete ---
  function autocomplete(inputEl) {
    const value = inputEl.value;
    const parts = value.split(/\s+/);
    
    if (parts.length <= 1) {
      // Command autocomplete
      const partial = parts[0].toLowerCase();
      const matches = Object.keys(commands).filter(c => c.startsWith(partial));
      if (matches.length === 1) {
        inputEl.value = matches[0] + ' ';
      }
    } else {
      // File/dir autocomplete
      const partial = parts[parts.length - 1];
      const dirPath = currentPath;
      const node = fs[dirPath];
      if (node && node.type === 'dir') {
        const matches = node.children.filter(c => c.startsWith(partial));
        if (matches.length === 1) {
          parts[parts.length - 1] = matches[0];
          inputEl.value = parts.join(' ');
        }
      }
    }
  }

  // --- Show welcome message ---
  function showWelcome() {
    const welcomeLines = [
      { text: '  ╔══════════════════════════════════════════════╗', cls: 'header' },
      { text: '            DCG PANAMA — INFORMATION TERMINAL         ', cls: 'header' },
      { text: '           Type "help" for available commands         ', cls: 'header' },
      { text: '  ╚══════════════════════════════════════════════╝', cls: 'header' },
      { text: '', cls: '' },
      { text: '  System initialized. Welcome, operator.', cls: 'highlight' },
      { text: '  Current date: ' + new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }), cls: 'dim' },
      { text: '', cls: '' },
      { text: '  Hint: Start with "ls" to explore, "cat README.txt" to read.', cls: 'dim' },
      { text: '', cls: '' },
    ];

    let delay = 0;
    welcomeLines.forEach((line, i) => {
      setTimeout(() => {
        addLine(line.text, line.cls);
        terminalBody.scrollTop = terminalBody.scrollHeight;
      }, delay);
      delay += 60;
    });
  }

  showWelcome();
});