# DCG Panama

Sitio de DEF CON Group Panamá. HTML, CSS y JavaScript estáticos: sin build, sin
dependencias, sin framework. Netlify publica la raíz del repo desde `main`.

## Correr en local

    python3 -m http.server 8901
    # http://localhost:8901

## Estructura

    index.html          portada
    pages/*.html        manifiesto, nosotros, eventos, patrocinadores,
                        equipo, vidhub, snapshots
    css/main.css        sistema de diseño: tokens y componentes base
    css/pages.css       componentes por página
    js/app.js           navegación y aparición al scroll
    js/i18n.js          motor de idioma
    js/lang.js          diccionario español
    js/terminal.js      terminal navegable de /pages/about.html
    js/attkdetct.js     detector de payloads del terminal
    js/gallery.js       galería de eventos
    js/videohub.js      hub de video
    tools/build-gallery.py  genera las miniaturas de la galería

Las ocho páginas se editan a mano. El nav y el pie están duplicados en cada
una: si cambias uno, cámbialos todos.

## Sistema de diseño

El rojo es acento, nunca superficie de lectura. El texto va en blanco cálido y
el acento tiene dos valores porque uno solo no sirve para ambos usos:

| token            | uso                          | contraste |
|------------------|------------------------------|-----------|
| `--text`         | texto principal              | 16.5:1    |
| `--text-dim`     | prosa secundaria             |  8.4:1    |
| `--text-mute`    | etiquetas y metadatos        |  5.4:1    |
| `--accent`       | acento sobre fondo oscuro    |  5.1:1    |
| `--accent-solid` | relleno con texto blanco     |  5.0:1    |

Todos pasan WCAG AA. Ningún componente inventa un color o un espaciado propio:
todo sale de los tokens y de la escala `--s1`…`--s8`.

## Idiomas

El inglés vive en el marcado; `lang.js` solo lleva español. `i18n.js` captura
el inglés del DOM al cargar, así los dos no pueden desincronizarse.

    <h1 data-i18n="home.tagline">There Are No Spectators Here</h1>
    <img data-i18n-attrs="alt:home.logoAlt" ...>

Para texto que solo existe en JS (documentos del terminal, UI generada), el
literal en el `tr(clave, literal)` **es** el inglés y `lang.js` aporta el
español.

El idioma inicial sigue al navegador, se recuerda en `localStorage` y se puede
forzar con `?lang=es`.

`data-i18n-attrs` solo escribe atributos de texto inertes (`alt`, `title`,
`placeholder`, `aria-label`, `content`, `data-text`). No alcanza handlers ni
URLs.

## Galería de eventos

Los originales de cámara **no van al repo** (`.gitignore`). Ponlos en
`assets/events/<EVENTO>/originals/` y corre:

    python3 tools/build-gallery.py

Genera una miniatura de 640px y una versión de 1920px por foto, escribe
`manifest.json` con las dimensiones y elimina el EXIF —los originales traían
coordenadas GPS.

## Añadir un video

Edita el array `VIDEOS` en `js/videohub.js`. Los `embed` y `thumbnail` solo se
aceptan desde orígenes en lista blanca; una URL fuera de esa lista no se
renderiza.
