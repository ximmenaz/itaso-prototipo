# Identidad visual ITASO

Referencia principal: `assets/identity/itaso_landing_editable.svg`. Se conservó el original y sus cuatro imágenes vinculadas. El logotipo a color se extrajo de sus trazos, sin redibujarlo.

## Dónde editar

- `css/identity.css`: paleta, tipografía, tamaños, botones, tarjetas, formularios, estados y adaptación móvil. Se carga después de los estilos funcionales originales.
- `js/identity.js`: componentes reutilizables `head`, `menuCard`, `photoCard`, `icon`, `wave` y `footer`. Los iconos y ondas son SVG editables en código.
- `js/app.js`: contenido y recorridos que consumen esos componentes; mantiene los manejadores de interacción existentes.
- `assets/identity/`: referencia, logo, fotografías y fuente Inter local con licencia SIL OFL. Los títulos usan Arial, como el SVG; el cuerpo usa Inter.
- `views.html` y `js/views.js`: galería de 18 páginas reales, con selector de escritorio (1280 px) y móvil (375 px). Los marcos tienen desplazamiento propio. El perfil NNA de demostración solo se habilita dentro de esta galería, no en el acceso normal.

## Criterios visuales

Texto azul oscuro `#152033`; secundarios `#516078`; base `#fafcfd`. Paleta del SVG: verde `#2eaf47`, naranja `#f6a21e`, turquesa `#25b9d6`, amarillo `#ffcf38`, rojo `#dc2839` y verde claro `#84ba2f`. Para botones con texto blanco se usa verde oscuro `#227843`; el naranja lleva texto oscuro para mantener legibilidad.

Portada: fotografía, ondas, áreas naranja y tarjetas. Cuidadores: composición sobria, superficies blancas, iconos lineales y verde. NNA: misma familia visual, acento azul y personajes existentes. No se modificaron contenidos educativos ni cálculos del prototipo.

## Vista local

Desde la carpeta del proyecto: `python3 -m http.server 5502 --bind 127.0.0.1`.

- Sitio: `http://127.0.0.1:5502/index.html#/inicio`
- Galería: `http://127.0.0.1:5502/views.html`

Verificado: rutas de escritorio y móvil de 375 px, imágenes, ausencia de desbordamiento horizontal de página, creación de personaje, comparación de comidas y formulario de actividad. La tabla comparativa conserva desplazamiento horizontal interno. Las funciones educativas que eran demostraciones siguen siendo demostraciones.
