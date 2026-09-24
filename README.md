LINK DE PROYECTO: https://ximmenaz.github.io/itaso-prototipo/

# ITASO-MX — prototipo funcional

Prototipo de una sola página construido únicamente con HTML, CSS y JavaScript vanilla. No requiere backend, base de datos, paquetes ni proceso de compilación.

## Iniciar el visualizador

Desde esta carpeta ejecuta:

```bash
python3 -m http.server 5500
```

Después abre <http://127.0.0.1:5500/>. Para detener el servidor vuelve a la terminal y presiona `Control + C`.

Como alternativa, abre la carpeta en Visual Studio Code, instala la extensión **Live Server** y usa **Open with Live Server** sobre `index.html`. Live Server actualiza la vista al guardar; con el servidor de Python basta recargar el navegador.

## Dónde editar

- Estructura base: `index.html`
- Estilos y responsive: `css/styles.css`
- Flujo e interacciones: `js/app.js`
- Rutas hash: `js/router.js`
- Persistencia local: `js/storage.js`
- Datos de muestra: `js/data.js`

## Rutas principales

- `#/inicio`
- `#/nna`, `#/nna/personalizacion`, `#/nna/menu`
- `#/nna/recursos`, `#/nna/juegos`, `#/nna/misiones`, `#/nna/logros`, `#/nna/compartir`
- `#/cuidadores`, `#/cuidadores/decide-con-lo-que-tienes`, `#/cuidadores/recursos`, `#/cuidadores/recetas`
- Las rutas anteriores `#/cuidadores/comparar` y `#/cuidadores/decidir` redirigen al nuevo recorrido.
- «Decide con lo que tienes» compara comidas, bebidas caseras o dos etiquetas transcritas. Conserva las respuestas al retroceder; no calcula precios ni porciones sin datos y no guarda estas respuestas permanentemente.
- `#/cuidadores/alimentacion`, `#/cuidadores/actividad`

## Datos guardados

El navegador conserva en `localStorage`: `currentProfile`, `nnaAchievements`, `savedRecipes`, `savedActivities` y `soundEnabled`.

`nnaProfile`, `nnaProfileCreated` y el estado del avatar existen únicamente en memoria durante la visita actual. Al recargar o abrir nuevamente la plataforma, la personalización NNA comienza desde cero.
