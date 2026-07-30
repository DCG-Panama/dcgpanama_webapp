/* ============================================
   DCG PANAMA — SPANISH DICTIONARY

   `es` holds Spanish for every data-i18n key in the markup. English is not
   here on purpose: i18n.js snapshots it from the DOM, so the HTML stays the
   single source of the English copy.

   `strings` holds Spanish for copy that never exists in markup — terminal
   documents and UI built by JS. English is not here either: the literal passed
   as the fallback at each call site is the English.

   Translation rule: keep the trade's own vocabulary in English (red team,
   pentesting, EDR evasion, reverse engineers, payload, badge cloning, CAN bus,
   tradecraft). Translate the prose around it. The register is terse and hard;
   Spanish should hit the same way, not read like a manual.
============================================ */
window.DCG_TRANSLATIONS = {

  es: {

    a11y: { skip: 'Saltar al contenido' },

    nav: {
      home: 'Inicio',
      manifesto: 'Manifiesto',
      about: 'Nosotros',
      events: 'Eventos',
      sponsors: 'Patrocinadores',
      team: 'Equipo',
      media: 'Media',
      vidhub: 'VidHub',
      snapshots: 'Snapshots',
      toggleMenu: 'Abrir menú',
      langGroup: 'Idioma',
    },

    footer: {
      rights: '© 2026. Todos los derechos reservados. Desarrollado por:',
      tag: {
        apart: 'No pedimos permiso para entender los sistemas. Los desarmamos.',
        capability: 'La capacidad lo es todo.',
        resist: 'Buscamos sistemas diseñados para detenernos.',
        takeapart: 'Los desarmamos.',
      },
    },

    page: {
      home:      { title: 'DCG Panama — DEF CON Group Panamá',
                   desc:  'DEF CON Group Panamá — El primer DEF CON Group de Panamá, comunidad de Offensive Security. Hackers, pentesters, researchers. Aquí no hay espectadores.' },
      about:     { title: 'DCG Panama — Nosotros // Terminal' },
      events:    { title: 'DCG Panama — Eventos' },
      manifesto: { title: 'DCG Panama — Manifiesto' },
      snapshots: { title: 'DCG Panama - Snapshots',
                   desc:  'DEF CON Group Panamá - Snapshots y archivos de galerías de eventos.' },
      sponsors:  { title: 'DCG Panama – Patrocinadores',
                   desc:  'DEF CON Group Panamá — Apoya a los hackers que rompen las cosas antes que tus adversarios.' },
      team:      { title: 'DCG Panama – Operadores Fundadores',
                   desc:  'DEF CON Group Panamá — Conoce a los operadores fundadores.' },
      videohub:  { title: 'DCG Panama – Flujo de Señal',
                   desc:  'DEF CON Group Panamá — Transmisiones interceptadas. Video hub.' },
    },

    // ── Home ──────────────────────────────────────
    home: {
      ctaEvents: 'Próximos eventos',
      ctaManifesto: 'Leer el manifiesto',
      ctaSponsor: 'Patrocínanos',
      focusEyebrow: 'Capacidades',
      focusHeading: 'Lo que hacemos de verdad',
      focusIntro: 'Doce disciplinas, practicadas con las manos. Nada de teoría por la teoría.',
      tagline: 'Aquí No Hay Espectadores',
      sub: 'El Primer DEF CON Group de Panamá — Comunidad de Offensive Security',
      stats: { 1: 'Áreas de Enfoque', 2: 'Valores Fundamentales', 3: 'Objetivos Centrales', 4: 'Capítulo' },
      focusHeader: '// Áreas de Enfoque',
      focus: {
        1: { title: 'Red Team Operations',
             desc: 'Nos convertimos en el adversario. Intrusión de espectro completo, persistencia, movimiento lateral y control total del dominio sin ser detectados.' },
        2: { title: 'Network & Web Exploitation',
             desc: 'Rompemos las superficies expuestas. Explotamos servicios, abusamos de protocolos y atravesamos aplicaciones web para lograr el acceso inicial.' },
        3: { title: 'EDR Evasion',
             desc: 'Silenciar a los perros guardianes. Bypass de EDR, evasión de telemetría y ejecución de payloads permaneciendo invisibles ante los controles defensivos.' },
        4: { title: 'Seguridad Física',
             desc: 'Cuando el firewall falla, la siguiente en caer es la puerta. Lock bypass, clonado de badges e intrusión física para llegar adonde nadie debía llegar.' },
        5: { title: 'Hardware Hacking',
             desc: 'Dominar dispositivos por debajo del sistema operativo. Extracción de firmware, implantes de hardware y compromiso de sistemas embebidos.' },
        6: { title: 'RF Hacking',
             desc: 'Convertir el espectro en un arma. Interceptamos, decodificamos y explotamos comunicaciones inalámbricas en frecuencias no documentadas.' },
        7: { title: 'Seguridad Automotriz',
             desc: 'Romper máquinas en movimiento. Inyección en el CAN bus, compromiso de ECUs y control total sobre los sistemas del vehículo.' },
        8: { title: 'Threat Emulation',
             desc: 'Pensar como atacantes reales. Reproducimos tradecraft de actores estatales, TTPs de adversarios y cadenas de ataque del mundo real.' },
        9: { title: 'Active Directory',
             desc: 'Toma completa de la empresa. Escalada de privilegios, robo de credenciales y compromiso total del dominio.' },
        10: { title: 'APPSEC',
              desc: 'Romper aplicaciones desde su núcleo. Inyección, abuso de lógica, bypass de autenticación y explotación de fallas de código hasta el compromiso total.' },
        11: { title: 'Social Engineering',
              desc: 'Atacar la capa humana. Pretexting, infraestructura de phishing e impersonación física para saltar controles que ningún exploit alcanza.' },
        12: { title: 'Cloud Hacking',
              desc: 'Romper infraestructura gestionada. Abuso de identidades, IAM mal configurado, metadata services expuestos y movimiento lateral entre tenants.' },
      },
      cta: {
        text: 'O sigues siendo ordinario. O te conviertes en otra cosa.',
        btn: 'Acceder a la Terminal →',
      },
    },

    // ── Events ────────────────────────────────────
    events: {
      calendarEyebrow: 'Calendario',
      calendarHeading: 'Próximos eventos',
      calendarIntro: 'Regístrate desde nuestro calendario de Luma. Las sesiones nuevas se anuncian ahí primero.',
      calendarTitle: 'Calendario de DCG Panamá',
      title: '// Eventos',
      subtitle: 'Meetups, CTFs, Workshops y Operaciones',
      status: 'Sistema Activo — Monitoreando eventos',
      archived: '// Operaciones Archivadas',
      tag: { meetup: 'Meetup' },
      card1: { desc: 'El primer meetup del DEF CON Group de Panamá. Conocimos a la comunidad, discutimos el roadmap y conectamos con otros operadores. Aquí empezó todo.' },
      talks: 'Charlas',
      speaker: 'Ponente:',
      contact: {
        l1: '¿Quieres proponer una charla, un workshop, un evento o patrocinarnos?',
        l2: 'Esto lo construimos entre todos.',
        email: 'Escríbenos',
        chat: 'Chatea con nosotros',
      },
    },

    // ── Snapshots ─────────────────────────────────
    snap: {
      heading: 'Snapshots de los eventos',
      lead: 'Fotografías de nuestros meetups.',
      title: '// Snapshots',
      intro: 'Galerías de eventos indexadas automáticamente desde',
    },

    // ── Video hub ─────────────────────────────────
    vid: {
      heading: 'Charlas y grabaciones',
      intro: 'Sesiones grabadas en nuestros meetups.',
      searchLabel: 'Buscar charlas',
      label: '// FLUJO DE SEÑAL',
      searchPlaceholder: 'BUSCAR TRANSMISIONES...',
      scan: '[ESCANEAR]',
      intercepted: 'TRANSMISIONES INTERCEPTADAS',
      back: 'VOLVER AL FLUJO',
      date: 'FECHA:',
      duration: 'DURACIÓN:',
    },

    // ── About / terminal chrome ───────────────────
    about: {
      eyebrow: 'Nosotros',
      heading: 'Explora el grupo desde una shell',
      intro: 'Todo sobre DCG Panamá vive en este filesystem. Empieza con ls, muévete con cd, lee con cat.',
      inputLabel: 'Comando de terminal',
      inputPlaceholder: 'escribe un comando...',
      helpHint: 'Escribe "help" para ver los comandos',
    },

    // ── Team ──────────────────────────────────────
    team: {
      eyebrow: 'El equipo',
      specLabel: 'Especialización',
      h1a: 'Operadores',
      h1b: 'Fundadores',
      sub: 'Las personas que construyeron esto desde cero.',
      classified: '[ NIVEL DE CLASIFICACIÓN: CREW ]',
      role: {
        1: 'ROLE // Fundador y Líder del Capítulo',
        2: 'ROLE // Cofundador y Líder de Exploit Development',
        3: 'ROLE // Cofundador y Líder Técnico',
        4: 'ROLE // Cofundador y Líder de Threat Intel',
        5: 'ROLE // Cofundador y Líder de Offensive Security',
        6: 'ROLE // Cofundador y Líder de Ethical Hacking',
      },
      syslogHeader: 'ACTIVIDAD DE OPERADORES',
      stat: { 1: 'Operadores Fundadores', 2: 'Uptime Desde el Día 1', 3: 'Intrusiones Sufridas', 4: 'Sistemas Comprometidos' },
    },

    // ── Sponsors ──────────────────────────────────
    spon: {
      briefHead: {
        1: 'Quiénes somos',
        2: 'Por qué importa',
        3: 'Por qué las empresas patrocinan',
      },
      briefWhy: 'Formamos mentes que piensan como atacantes — porque el defensor que no entiende el tradecraft ofensivo está ciego.',
      gainsHeading: 'Qué obtienes al patrocinar',
      h1a: 'Nuestros',
      h1b: 'Patrocinadores',
      sub: 'Las organizaciones que invierten en capacidad ofensiva real.',
      label: {
        1: 'patrocinadores activos',
        2: 'Nivel Platino',
        3: 'Nivel Oro',
        4: 'Nivel Plata',
        5: 'Nivel Infraestructura',
        6: 'info de patrocinio',
        7: 'lo que ganas',
        8: 'niveles de patrocinio',
        9: 'lo que tu aporte hace posible',
      },
      title: { 1: 'Registro de Patrocinadores', 2: 'Por Qué Patrocinarnos', 3: 'Elige Tu Nivel de Acceso' },
      slot: {
        platinum: 'Patrocinador Platino',
        gold: 'Patrocinador Oro',
        silver: 'Patrocinador Plata',
        infrastructure: 'Patrocinador de Infraestructura',
      },
      ticker: { slot: 'CUPO LIBRE', recruiting: 'BUSCAMOS PATROCINADORES' },
      brief: {
        1: 'DEF CON Group Panamá no es un aula. Tampoco un evento de marketing.',
        2: 'Es un punto de encuentro para gente que de verdad entiende cómo fallan los sistemas.',
        // Los oficios se dejan en inglés: así se nombran en el gremio.
        3: 'Penetration testers. Red team operators. Hardware hackers. Reverse engineers.',
        4: 'Security researchers operando en Panamá.',
        5: 'Este grupo existe para desarrollar capacidad ofensiva real. No teoría. Capacidad.',
        6: 'Hoy toda organización es un objetivo.',
        7: 'Los atacantes no esperan. Evolucionan.',
        8: 'Ya están dentro de entornos en todo el mundo.',
        9: 'Formamos mentes que piensan como atacantes — porque el defensor que no',
        10: 'entiende el tradecraft ofensivo está ciego.',
        11: 'No por marketing. Por cercanía.',
        12: 'Cercanía al talento. Cercanía al conocimiento. Cercanía a la capacidad.',
        13: 'Los patrocinadores obtienen visibilidad y acceso directo a gente capaz de',
        14: 'encontrar vulnerabilidades críticas antes que los adversarios reales.',
        15: 'Esto es acceso al underground del offensive security — legal, ético y transparente.',
      },
      enable: {
        title: {
          1: 'Acceso al Talento', 2: 'Visibilidad de Marca', 3: 'Acceso a la Comunidad',
          4: 'Credibilidad Real en Seguridad', 5: 'Base Regional', 6: 'Presencia Técnica',
          7: 'Labs Prácticos de Hacking', 8: 'Workshops Técnicos', 9: 'Competencias CTF',
          10: 'Entornos de Hardware', 11: 'Infraestructura de la Comunidad',
        },
        desc: {
          1: 'Línea directa con profesionales de offensive security de alto nivel — la gente que las empresas intentan contratar y rara vez encuentran.',
          2: 'Presencia en todos los materiales oficiales, en los eventos y en el sitio de DCG Panamá — dentro del ecosistema hacker panameño.',
          3: 'Presencia directa en nuestros eventos. Networking con red team operators, researchers y futuros especialistas en offensive security.',
          4: 'Posiciona a tu organización como impulsora de capacidad real en ciberseguridad — no seguridad de marketing. Seguridad de verdad.',
          5: 'Los primeros patrocinadores se vuelven parte de los cimientos del offensive security en Panamá, mientras crecemos hacia un hub latinoamericano reconocido.',
          6: 'Los patrocinadores Platino pueden presentar contenido técnico directamente ante una audiencia que sí evalúa lo que ve.',
          7: 'Entornos operativos en vivo donde los miembros comprometen sistemas reales bajo condiciones controladas.',
          8: 'Sesiones a fondo sobre tradecraft ofensivo, desarrollo de herramientas y reproducción de cadenas de ataque reales.',
          9: 'Operaciones Capture The Flag que desarrollan habilidades ofensivas competitivas y probadas en combate.',
          10: 'Labs físicos para investigación de sistemas embebidos, análisis de firmware, RF hacking y trabajo en automotive security.',
          11: 'Servidores, herramientas, plataformas y recursos que mantienen al grupo operativo y en crecimiento.',
        },
      },
      tier: {
        period: {
          1: '/ año — Máxima visibilidad',
          2: '/ año — Alta participación',
          3: '/ año — Apoyo a la comunidad',
          4: 'Reconocimiento según el aporte',
        },
        desc: {
          1: 'Máximo nivel de visibilidad e influencia. Impacto total en todas las plataformas.',
          2: 'Fuerte visibilidad y participación en la comunidad. Presencia directa en nuestro ecosistema.',
          3: 'Impulsa el crecimiento de la comunidad y gana visibilidad sostenida dentro del grupo.',
          4: 'Aporta la infraestructura física o digital que hace posibles nuestras operaciones.',
        },
      },
      feat: {
        1: 'Logo principal en todos los materiales oficiales',
        2: 'Acceso directo a los miembros durante los eventos',
        3: 'Oportunidad de presentar contenido técnico',
        4: 'Reconocimiento prioritario en todas las plataformas',
        5: 'Reconocimiento permanente como patrocinador',
        6: 'Logo en los materiales de los eventos',
        7: 'Reconocimiento durante las reuniones oficiales',
        8: 'Acceso a oportunidades de networking en la comunidad',
        9: 'Logo en el sitio web',
        10: 'Reconocimiento en eventos seleccionados',
        11: 'Espacio físico para eventos',
        12: 'Hardware y equipos embebidos',
        13: 'Infraestructura cloud',
        14: 'Reconocimiento equivalente al valor del aporte',
      },
      cta: {
        headline: { 1: 'Los atacantes ya están organizados.' },
        sub: { 1: '// Así es como los defensores se ponen al día.' },
        primary: 'Conviértete en Patrocinador →',
        secondary: 'Descargar Propuesta',
      },
      contact: {
        key: { 1: 'email:', 2: 'web:', 3: 'ubicación:' },
        location: 'Ciudad de Panamá, Panamá',
      },
    },

    // ── Manifesto ─────────────────────────────────
    // Line-for-line: the CRT scroll depends on each line staying its own line,
    // so the Spanish keeps the same breaks and roughly the same width.
    mf: {
      1: 'DCG PANAMÁ — MANIFIESTO',
      2: 'Aquí no hay espectadores…',
      3: 'Lee esto con calma. No es para todos.',
      4: 'El mundo funciona sobre sistemas construidos por gente',
      5: 'que asume que nadie está mirando.',
      6: 'Nosotros somos los que miran.',
      7: 'Somos los que se niegan a confiar en las superficies.',
      8: 'Somos los que se niegan a confiar en las promesas.',
      9: 'Somos los que se niegan a confiar en una seguridad',
      10: 'que no ha sido rota y comprobada.',
      11: 'No aceptamos ilusiones.',
      12: 'Verificamos.',
      13: 'Todo sistema filtra la verdad bajo presión.',
      14: 'El código filtra.',
      15: 'El hardware filtra.',
      16: 'Las redes filtran.',
      17: 'Las personas filtran.',
      18: 'Casi nadie lo nota.',
      19: 'Nosotros lo notamos.',
      20: 'Obligamos a los sistemas a revelarse.',
      21: 'Arrancamos la abstracción.',
      22: 'Exponemos los límites de confianza.',
      23: 'Mapeamos el control.',
      24: 'Mapeamos la debilidad.',
      25: 'No adivinamos.',
      26: 'Extraemos.',
      27: 'Esto no es un club.',
      28: 'Esto no es un grupo social.',
      29: 'Esto es un entorno operativo.',
      30: 'No estás aquí para consumir.',
      31: 'Estás aquí para transformarte.',
      32: 'Si te quedas pasivo, te quedas atrás.',
      33: 'No medimos el skill en palabras.',
      34: 'Medimos el skill en artefactos.',
      35: 'Código escrito.',
      36: 'Sistemas rotos.',
      37: 'Controles evadidos.',
      38: 'Herramientas creadas.',
      39: 'Hablar es irrelevante.',
      40: 'La capacidad lo es todo.',
      41: 'La comodidad es una muerte lenta.',
      42: 'La comodidad crea defensores que no saben defender.',
      43: 'La comodidad crea ingenieros que no saben asegurar.',
      44: 'La comodidad crea operadores que no saben operar.',
      45: 'Rechazamos la comodidad.',
      46: 'Buscamos resistencia.',
      47: 'Buscamos complejidad.',
      48: 'Buscamos sistemas diseñados para detenernos.',
      49: 'Porque esos son los que más enseñan.',
      50: 'El fracaso no es derrota.',
      51: 'El fracaso es señal.',
      52: 'Cada exploit fallido revela estructura.',
      53: 'Cada acción denegada revela la lógica de control.',
      54: 'Cada crash revela la verdad.',
      55: 'No le tememos al fracaso.',
      56: 'Lo convertimos en arma.',
      57: 'No dependemos de las herramientas.',
      58: 'Las herramientas son desechables.',
      59: 'Las herramientas son temporales.',
      60: 'El entendimiento es permanente.',
      61: 'Cuando las herramientas fallan, no nos detenemos.',
      62: 'Construimos otras.',
      63: 'El ego es un lastre.',
      64: 'Al sistema no le importa quién eres.',
      65: 'Al sistema no le importa qué crees.',
      66: 'El sistema solo responde a la capacidad.',
      67: 'Mantente preciso.',
      68: 'Mantente en silencio.',
      69: 'Mantente peligroso.',
      70: 'Observamos todo.',
      71: 'No confiamos en nada.',
      72: 'La confianza es una superficie de ataque.',
      73: 'Las suposiciones son vulnerabilidades.',
      74: 'La certeza es debilidad.',
      75: 'La verificación es supervivencia.',
      76: 'No nos anunciamos.',
      77: 'No actuamos para nadie.',
      78: 'Operamos.',
      79: 'En silencio.',
      80: 'Con intención.',
      81: 'Con precisión.',
      82: 'Presencia sin ruido.',
      83: 'Capacidad sin publicidad.',
      84: 'Estamos formando operadores.',
      85: 'No espectadores.',
      86: 'No consumidores.',
      87: 'Operadores.',
      88: 'Personas capaces de entender',
      89: 'sistemas complejos en su nivel más bajo.',
      90: 'Personas capaces de romper las suposiciones',
      91: 'de las que otros dependen.',
      92: 'Personas capaces de ver',
      93: 'lo que otros no pueden.',
      94: 'Que Quede Claro',
      95: 'No somos hacktivistas.',
      96: 'No operamos por motivación política.',
      97: 'No atacamos organizaciones fuera de la ley.',
      98: 'No participamos en actividades ilegales.',
      99: 'No destruimos.',
      100: 'Estudiamos.',
      101: 'Probamos.',
      102: 'Simulamos.',
      103: 'Mejoramos.',
      104: 'Todo lo que hacemos existe para desarrollar capacidad,',
      105: 'conocimiento y disciplina dentro de límites',
      106: 'éticos y legales.',
      107: 'No buscamos el caos.',
      108: 'Buscamos entendimiento.',
      109: 'Esto es un filtro.',
      110: 'No todos pertenecen aquí.',
      111: 'Algunos mirarán y se irán.',
      112: 'Algunos dudarán y se estancarán.',
      113: 'Algunos se negarán a enfrentar sus propios límites.',
      114: 'Esos desaparecerán.',
      115: 'Unos pocos se quedarán.',
      116: 'Los que se queden, evolucionarán.',
      117: 'Ahora estás en el borde.',
      118: 'Lo que pase ahora es decisión tuya.',
      119: 'O sigues siendo ordinario.',
      120: 'O te conviertes en otra cosa.',
      121: 'Somos DCG Panamá.',
      122: 'No pedimos permiso para entender los sistemas.',
      123: 'Los desarmamos.',
    },
  },

  // ══════════════════════════════════════════════
  // Copy that lives only in JS, so both languages are declared here.
  // ══════════════════════════════════════════════
  // ══════════════════════════════════════════════
  // Copy that only exists in JS. Spanish only — the English is the literal
  // each caller passes as its fallback.
  // ══════════════════════════════════════════════
  strings: {
    es: {
      manifesto: { pause: '⏸ Pausar', resume: '▶ Reanudar' },

      snap: {
        scanning: 'Escaneando archivos de eventos...',
        noFolders: 'No se encontraron carpetas de eventos.',
        noGalleries: 'No hay galerías. Agrega carpetas en /assets/events/ y corre tools/build-gallery.py.',
        loadError: 'No se pudo cargar el manifest de la galería. Revisa la consola del navegador.',
        unavailable: 'No se pudieron cargar las galerías.',
        empty: 'No hay imágenes en esta carpeta de evento.',
        snapshot: 'SNAPSHOT',
        snapshots: 'SNAPSHOTS',
        gallery: 'GALERÍA DE EVENTO CARGADA',
        galleries: 'GALERÍAS DE EVENTOS CARGADAS',
        viewAll: 'VER LAS {n} SNAPSHOTS',
        collapse: 'CERRAR GALERÍA',
        save: '↓ GUARDAR',
        openPhoto: 'Abrir {label}',
        downloadPhoto: 'Descargar {label}',
        photoOf: '{name} foto {i} de {n}',
        photoLabel: '{name} foto {i}',
        viewer: 'Visor de fotos',
        prev: '← ANTERIOR',
        next: 'SIGUIENTE →',
        close: '✕ CERRAR',
        prevLabel: 'Foto anterior',
        nextLabel: 'Foto siguiente',
        closeLabel: 'Cerrar el visor',
      },

      vid: {
        clear: '× LIMPIAR',
        signals: 'SEÑALES',
        noSignalTitle: '[ SIN SEÑAL ]',
        noSignalSub: 'Ningún video coincide con tu búsqueda. Prueba con otras etiquetas o palabras.',
        noPreview: '[ SIN VISTA PREVIA ]',
        noSig: '[ SIN SEÑAL ]',
        more: 'MÁS TRANSMISIONES',
      },

      // ── Terminal de about.html ──────────────────
      // El renderizador de `cat` clasifica cada línea por su prefijo
      // (">>", "━", "  >", "[...]"), así que la estructura se conserva tal cual.
      // Los nombres de comando y los oficios se quedan en inglés.
      term: {
        notFound: "Escribe 'help' para ver los comandos disponibles.",
        help: {
          title: 'Comandos disponibles:',
          ls: 'Listar el contenido del directorio',
          cd: 'Cambiar de directorio',
          cat: 'Mostrar el contenido de un archivo',
          pwd: 'Mostrar el directorio actual',
          whoami: 'Mostrar el usuario actual',
          tree: 'Mostrar el árbol completo de directorios',
          clear: 'Limpiar la terminal',
          help: 'Mostrar esta ayuda',
          uname: 'Mostrar información del sistema',
          id: 'Mostrar la identidad del usuario',
          date: 'Mostrar la fecha actual',
          echo: 'Imprimir texto',
          history: 'Mostrar el historial de comandos',
          banner: 'Mostrar el banner de DCG Panamá',
        },

        readme: `══════════════════════════════════════════════════════
           DEF CON GROUP PANAMA (DCG PANAMA)
        Primer Capítulo DEF CON Group de Panamá
══════════════════════════════════════════════════════

Bienvenido, operador.

Esta es la terminal oficial de información de DCG Panamá.
Navega el filesystem para conocer al grupo.

Empieza con: ls
Explora directorios con: cd <directorio>
Lee archivos con: cat <archivo>

Escribe 'help' para ver los comandos disponibles.
Escribe 'tree' para ver todo el contenido de un vistazo.`,

        mission: `>> DECLARACIÓN DE MISIÓN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Construir y fortalecer la comunidad de offensive security de Panamá creando un entorno colaborativo donde hackers, penetration testers y security researchers puedan compartir conocimiento, desarrollar habilidades técnicas y llevar más lejos la capacidad real en ciberseguridad, mediante práctica, investigación y experimentación ética.
\\
Buscamos cultivar una cultura de hacking responsable, excelencia técnica y aprendizaje continuo, organizando meetups, workshops, retos e iniciativas de investigación enfocadas en disciplinas de offensive security.`,

        vision: `>> VISIÓN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Consolidar a DEF CON Group Panamá como una de las principales comunidades de offensive security del país, reconocida por formar profesionales de alto nivel, impulsar la investigación ofensiva y aportar al ecosistema hacker global.
\\
Nuestra visión es crear una cultura hacker autosostenible donde el conocimiento circule sin trabas, la innovación prospere y los miembros se conviertan en practicantes de offensive security de talla mundial.`,

        values: `>> VALORES FUNDAMENTALES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[1] COMPARTIR CONOCIMIENTO
    Creemos que el conocimiento crece cuando se comparte abiertamente entre pares de confianza.
\\
[2] APRENDIZAJE PRÁCTICO
    El skill real sale de la práctica, la experimentación y la exploración técnica.
\\
[3] RESPONSABILIDAD ÉTICA
    Promovemos el hacking responsable y el uso ético de las habilidades ofensivas.
\\
[4] CURIOSIDAD E INNOVACIÓN
    Fomentamos la exploración, la creatividad y empujar los límites técnicos.
\\
[5] COMUNIDAD Y COLABORACIÓN
    Nos hacemos más fuertes aprendiendo y construyendo juntos.`,

        principles: `>> PRINCIPIOS OPERATIVOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

> Abierto a profesionales de offensive security y a quien se lo tome en serio
> Foco en profundidad técnica, no en contenido superficial
> Impulsar la experimentación práctica y la investigación
> Mantener un entorno respetuoso y colaborativo
> Preservar la cultura hacker auténtica, alineada con los valores de DEF CON`,

        goals: `>> OBJETIVOS CENTRALES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[OBJETIVO 1] CONSTRUIR UNA COMUNIDAD HACKER FUERTE EN PANAMÁ
  Crear un espacio confiable y colaborativo donde profesionales y entusiastas del offensive security puedan conectar, aprender y crecer juntos.
\\
[OBJETIVO 2] ELEVAR EL NIVEL TÉCNICO Y LA INVESTIGACIÓN OFENSIVA
  Impulsar conocimiento técnico profundo en áreas como:
  > Red Team operations
  > Network y Web exploitation
  > EDR evasion y detection bypass
  > Seguridad física y access bypass
  > Hardware y embedded systems hacking
  > Radio Frequency (RF) hacking
  > Investigación en automotive security
  > Threat emulation y adversary simulation
  > Ataques a Active Directory
  > APPSEC
  > Social engineering
  > Cloud hacking
\\
[OBJETIVO 3] PROMOVER EL APRENDIZAJE PRÁCTICO
  Fomentar la experimentación real a través de:
  > Eventos Capture The Flag (CTF)
  > Demostraciones de herramientas
  > Simulaciones de ataque en vivo
  > Labs de hardware hacking
  > Desarrollo de herramientas ofensivas
\\
[OBJETIVO 4] APORTAR AL ECOSISTEMA HACKER GLOBAL
  Posicionar a Panamá como contribuyente activo de la comunidad internacional de offensive security, formando talento capaz de participar en:
  > DEF CON y otras conferencias de ciberseguridad
  > Competencias CTF globales
  > Investigación en seguridad
  > Programas de bug bounty
  > Engagements de Red Team`,

        who: `>> QUIÉNES SOMOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DCG Panamá es el primer DEF CON Group oficial de Panamá.
<tr>
Somos una comunidad de:
  > Penetration Testers
  > Red Team Operators
  > Security Researchers
  > Hardware Hackers
  > Reverse Engineers
  > Bug Bounty Hunters
  > Offensive Tool Developers

Y de cualquiera con curiosidad real por cómo funcionan de verdad los sistemas.

No somos espectadores. Somos operadores.`,

        join: `>> ÚNETE A DCG PANAMÁ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

¿Quieres ser parte de la comunidad de offensive security de Panamá?

REQUISITOS:
  > Interés genuino en offensive security
  > Disposición para aprender y compartir conocimiento
  > Respeto por los límites éticos
  > Ganas de aportar, no solo de consumir
\\
CÓMO CONECTAR:
  > Asiste a nuestros meetups y eventos
  > Sigue los canales de la comunidad
  > Participa en retos CTF
  > Comparte tu investigación y tus herramientas

Aquí no hay espectadores.

// Mantente atento a los próximos eventos y meetups.`,

        focus: `>> ÁREAS DE ENFOQUE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[01] Red Team Operations
Nos convertimos en el adversario. Intrusión de espectro completo, persistencia, movimiento lateral y control total del dominio sin ser detectados.
\\
[02] Network & Web Exploitation
Rompemos las superficies expuestas. Explotamos servicios, abusamos de protocolos y atravesamos aplicaciones web para lograr el acceso inicial.
\\
[03] EDR Evasion & Detection Bypass
Silenciar a los perros guardianes. Bypass de EDR, evasión de telemetría y ejecución de payloads permaneciendo invisibles ante los controles defensivos.
\\
[04] Seguridad Física & Access Bypass
Cuando el firewall falla, la siguiente en caer es la puerta. Lock bypass, clonado de badges e intrusión física para llegar adonde nadie debía llegar.
\\
[05] Hardware & Embedded Systems Hacking
Dominar dispositivos por debajo del sistema operativo. Extracción de firmware, implantes de hardware y compromiso de sistemas embebidos.
\\
[06] Radio Frequency (RF) Hacking
Convertir el espectro en un arma. Interceptamos, decodificamos y explotamos comunicaciones inalámbricas en frecuencias no documentadas.
\\
[07] Investigación en Automotive Security
Romper máquinas en movimiento. Inyección en el CAN bus, compromiso de ECUs y control total sobre los sistemas del vehículo.
\\
[08] Threat Emulation & Adversary Simulation
Pensar como atacantes reales. Reproducimos tradecraft de actores estatales, TTPs de adversarios y cadenas de ataque del mundo real.
\\
[09] Ataques a Active Directory
Toma completa de la empresa. Escalada de privilegios, robo de credenciales y compromiso total del dominio.
\\
[10] APPSEC
Romper aplicaciones desde su núcleo. Inyección, abuso de lógica, bypass de autenticación y explotación de fallas de código hasta el compromiso total.
\\
[11] Social Engineering
Atacar la capa humana. Pretexting, infraestructura de phishing e impersonación física para saltar controles que ningún exploit alcanza.
\\
[12] Cloud Hacking
Romper infraestructura gestionada. Abuso de identidades, IAM mal configurado, metadata services expuestos y movimiento lateral entre tenants.`,

        activities: `>> ACTIVIDADES Y OPERACIONES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ACTIVIDADES REGULARES:
  > Eventos Capture The Flag (CTF)
  > Demostraciones de herramientas y workshops
  > Simulaciones de ataque en vivo
  > Labs de hardware hacking
  > Sesiones de desarrollo de herramientas ofensivas
\\
INICIATIVAS DE INVESTIGACIÓN:
  > Investigación de vulnerabilidades
  > Exploit development
  > Creación de herramientas de seguridad
  > Documentación de técnicas
\\
EVENTOS DE COMUNIDAD:
  > Meetups mensuales
  > Sesiones de preparación para conferencias
  > Charlas de intercambio de conocimiento
  > Proyectos de investigación colaborativos`,
      },
    },
  },
};
