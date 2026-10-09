# Integración visual ITASO — 8 de octubre de 2026

## Fuentes y alcance

- Contenido y comportamiento: https://ximmenaz.github.io/itaso-prototipo/
- Sistema visual: https://alditow.github.io/ITASO-NNA/#inicio
- CSS de referencia inspeccionado: styles.css?v=20261008n y ui-system.css?v=20261008d.
- Antes de editar se verificó que js/app.js local coincidía con el publicado (SHA-1 e1a54016ee3545120d55be05c05e44f1d4915fc0).
- Trabajo guardado localmente. No se ha hecho push ni publicación.

## Mapeo del sistema

| Referencia NNA | Aplicación en el prototipo |
| --- | --- |
| Header de 78 px, 72 px en móvil; marca compacta; menú desplegable | Un único header en todas las rutas; enlaces y nombres originales |
| Inter, títulos de peso 760–780 y tracking negativo | Jerarquías compartidas; títulos adaptados a textos adultos más largos |
| Contenedor máximo 1400 px y margen clamp(24px,7vw,110px) | container, lp-container y cg-container; margen móvil 20 px |
| Tarjetas editoriales de 24 px y cuerpo blanco con icono circular | Tarjetas de equipo; tarjetas de herramientas sin añadir ilustraciones infantiles |
| Botones de 52 px, radios 12 px, transiciones 180 ms | button, lp-button y cg-gate |
| Paneles de principios y secciones redondeadas | Misión/visión y bloques de equipo/fuentes |
| Footer secundario blanco, separador fino, marca pequeña | Footers existentes, sin sustituir sus textos o destinos |
| pleca.svg | Copia local assets/identity/pleca-nna.svg para la onda de landing |

Paleta extraída: tinta #101828; texto secundario #475467; fondo #f4f4f4;
naranja #f56a28; verde #00A53D; azul #00B3F0; amarillo #FFC600;
rojo #dc2839; lima #8cc63e. Los tints también provienen del CSS de referencia.
Los botones adultos usan el verde oscuro #007D2E presente en la referencia,
para mantener legible el texto blanco. No se copiaron personajes ni textos NNA.

## Archivos

Modificados:

- css/identity.css: tokens, tipografía, layout, navegación, controles, tarjetas, footer y responsive.
- css/styles.css: conserva estados y layouts funcionales; elimina tokens antiguos y reglas duplicadas.
- css/landing.css: composición del hero, tarjetas editoriales, paneles, fuentes y footer.
- css/caregiver-menu.css: versión adulta del mismo sistema; cards neutrales y acentos de interacción.
- index.html: control accesible del menú móvil y carga del módulo correspondiente.

Añadidos:

- js/navigation.js: apertura/cierre del menú, Escape, cierre al navegar y aria-expanded.
- assets/identity/pleca-nna.svg: recurso decorativo del sitio de referencia, servido localmente.
- INTEGRACION-VISUAL.md: este informe.

Sin cambios, verificados contra HEAD:
js/app.js, js/data.js, js/decision.js, js/router.js, js/storage.js,
js/landing.js y js/identity.js. Se conservan textos, fotos propias,
formularios, filtros, hashes, lógica del avatar, persistencia y CTAs.
No se añadieron frameworks ni dependencias.

## Verificación realizada

- Revisión de las rutas de inicio, entrada/personalización/menú NNA, recursos,
  juegos, misiones, logros, compartir, menú cuidadores, recursos y guías,
  decisión, recetas, tres detalles de receta, alimentación y actividad.
- Auditoría de dimensiones a 390, 820 y 1440 px: sin overflow horizontal ni
  imágenes cargadas con error en las páginas revisadas.
- Menú móvil: abrir, elegir enlace, buscar, cambiar perfil y cierre.
- Landing: búsqueda por equipo; diálogos de equipo, fuentes, privacidad y términos.
- Decisión: comida con frijoles y tortillas; feedback de elección; reinicio;
  productos envasados con datos faltantes; bebidas caseras sin ingredientes.
- Rutas antiguas /cuidadores/comparar y /cuidadores/decidir siguen redirigiendo
  a /cuidadores/decide-con-lo-que-tienes.
- Recetas: cuatro filtros de tipo, filtro de edad, detalles; guardar/quitar
  receta, restaurando el estado previo.
- Recursos: tres descargas simuladas muestran su aviso original.
- Alimentación: las cinco tarjetas despliegan su explicación.
- Actividad: contexto/tiempo generan resultado; guardar/quitar verificado.
- NNA: expresión, accesorio y color; nombre Luna y edad; creación habilitada
  tras completar campos; nueve acciones demo entre recursos, juegos y compartir;
  misión de tres pasos y logro; sonido alternado y restaurado.
- El personaje se mantiene durante navegación y se reinicia tras recargar.
  El logro de la misión de prueba puede permanecer, como indica el comportamiento original.
- Sin errores de consola observados en la sesión de prueba.
- node --check y git diff --check sin errores.
- Dependencias estáticas de index.html y URLs de CSS comprobadas en disco.

## Adaptaciones y limitaciones

- Se comparte el sistema visual, no se hace una copia píxel a píxel: el contenido,
  longitud de títulos y número de secciones del sitio base son distintos.
- Se conservan las fotos y SVG propios. La personalización original no se
  sustituye por los personajes del segundo proyecto.
- Las tarjetas de cuidadores omiten las ilustraciones infantiles del referente
  y mantienen su texto, iconos, rutas y foco de interacción.
- Los espacios pendientes ya existentes (foto de cuidadores, guías simuladas,
  contenido científico definitivo, políticas y perfiles de equipo) siguen pendientes.
- La tabla conserva scroll horizontal interno accesible en móvil.
- La revisión se realizó en el navegador integrado; no es una certificación
  de accesibilidad ni una prueba exhaustiva en todos los navegadores.
- Los documentos históricos del proyecto siguen disponibles; este informe
  describe la integración visual vigente.

## Ver y editar

Carpeta en Finder: Escritorio → itaso-prototype.

Servidor local:

```sh
cd /Users/ximenazuzuarregui/Desktop/itaso-prototype
python3 -m http.server 5502 --bind 127.0.0.1
```

Inicio: http://127.0.0.1:5502/#/inicio

Cuidadores: http://127.0.0.1:5502/#/cuidadores

Galería existente de las 18 pantallas: http://127.0.0.1:5502/views.html

Editar paleta, tipografía y controles en css/identity.css; composición específica
en css/landing.css y css/caregiver-menu.css. Las rutas de assets son relativas,
compatibles con el subdirectorio de GitHub Pages.
