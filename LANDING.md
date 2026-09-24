# Landing - Illustrator 2

Referencia: primera página / mesa de trabajo de `itaso_landing_editable2.ai` (1440 × 2536.78). La segunda página, de cuidadores, no se implementó porque queda fuera del alcance. El original no se modificó.

## Archivos y alcance

- `js/landing.js`: composición HTML, iconos SVG, ondas, navegación interna, menú móvil, búsqueda local y diálogos informativos de la landing.
- `css/landing.css`: tokens y estilos exclusivos de la landing, organizados por componente y con adaptaciones a tablet y móvil.
- `js/app.js`: solo cambia el contenido de `landing()` y la navegación pública; el resto de la lógica se verificó idéntico al inicio del trabajo.
- `index.html`: carga los dos archivos nuevos.
- `css/identity.css`: se retiraron los estilos de la landing anterior; se conservaron los estilos compartidos de otras experiencias.

No se cambiaron las rutas, el Audience Gate, el editor o menú NNA, el menú de cuidadores, los sonidos, almacenamiento, recetas ni el recorrido de decisión. El botón flotante de cambio de perfil se oculta solo en la landing para respetar el diseño: su función sigue disponible desde «Elegir experiencia». En las demás páginas se conserva.

## Fidelidad y adaptaciones

Se conserva el orden Hero → Quiénes somos → Equipo → Misión/Visión → Fuentes → Footer. Se reprodujeron las proporciones desktop del título de 75 px y la foto de 526 × 521 px, las cuatro fotografías existentes, las tarjetas con iconos superpuestos, bordes de misión/visión y franjas onduladas del Illustrator. Arial para títulos e Inter para texto están disponibles localmente.

Se usa fondo principal #F4F4F4 según la indicación escrita. Se conservaron las franjas naranja y amarilla porque están presentes en la referencia prioritaria. Los iconos y curvas son SVG equivalentes editables, no una copia de todos los trazos originales. Se oscureció el verde del CTA con texto blanco y los enlaces de color; el botón naranja tiene texto oscuro para mejorar contraste. Tablet y móvil reorganizan el contenido.

Las imágenes existentes corresponden a las cuatro fotografías embebidas en el AI (316×321 px y aproximadamente 194×87 px); no quedaron huecos ni imágenes sustitutas. Conviene reemplazarlas por originales de mayor resolución para evitar pérdida de nitidez en desktop.

Fuentes bibliográficas, perfiles del equipo, política de privacidad y términos siguen pendientes de contenido definitivo. Sus botones informan esa condición en diálogos; no se inventaron documentos o personas.

## Verificación

- Visualización local de ambas páginas PDF del AI; implementación únicamente de la primera.
- Navegación de secciones sin alterar la ruta principal; búsqueda por sección.
- Botones de tarjetas, fuentes, privacidad, términos y cierre con Escape.
- Audience Gate: entrada NNA y cuidadores; ambos conservan sus destinos.
- Vistas 1440, 768 y 375 px, sin desbordamiento horizontal ni imágenes rotas.
- Archivos de datos, almacenamiento, rutas, decisión, componentes compartidos, galería y estilos base conservan sus hashes previos.

Vista: `http://127.0.0.1:5502/?landing=ai2#/inicio`.
