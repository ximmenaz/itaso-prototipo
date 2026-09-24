# Referencia visual 4

Esta revisión sustituye los criterios de color y composición anteriores para las rutas `/inicio` y `/cuidadores`.

Se localizaron en Descargas los archivos `itaso_landing_editable4-01.jpg` y `itaso_landing_editable4_Mesa de trabajo 1-02.jpg`. No se encontraron sus equivalentes PNG. Se inspeccionaron directamente esos JPG; no se interpretó el archivo AI.

## Cambios

- Landing: base clara casi blanca del hero y blanco en secciones; paleta muestreada de la referencia; texto blanco en CTAs de color; ancho de texto y cinta azul corregidos; onda de Fuentes reajustada.
- Menú de cuidadores: header sin contenedor blanco, logo ampliado, hero de dos columnas con recuadro de fotografía, círculo naranja y onda azul, tres tarjetas con esquinas de color, CTA de perfil dentro del flujo, temas con bordes de color y footer tipográfico.
- El recuadro «FOTO CUIDADOR/A + NNA» se conserva intencionalmente porque así aparece en la referencia; no se añadió una foto diferente.
- Las demás rutas, la personalización NNA, almacenamiento y manejadores del Audience Gate se conservan.

Archivos: `css/landing.css`, `js/landing.js`, `css/caregiver-menu.css` (nuevo), `js/app.js` e `index.html`. Las hojas visuales se cargan con `?v=ref4` para evitar reutilizar la versión anterior de esos estilos.

## Comprobaciones

Comparación visual de las dos rutas a 1440 px frente a ambas imágenes; comprobación de carga efectiva de las hojas de estilo; revisión a 768 y 375 px sin desbordamiento de página ni imágenes rotas; navegación desde las cinco tarjetas y apertura del Audience Gate desde el nuevo CTA.

Vistas:
- `http://127.0.0.1:5502/?landing=ai2#/inicio`
- `http://127.0.0.1:5502/?landing=ai2#/cuidadores`

Las referencias desktop se reorganizan en tablet y móvil. Los iconos y ondas permanecen como SVG editables; los textos y controles siguen siendo HTML funcional, no una captura de la referencia como fondo.
