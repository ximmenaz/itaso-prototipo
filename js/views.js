// Review gallery only. Main application keeps its original entry guards.
const views = [
 ['Inicio','/inicio'],['NNA · Primera visita','/nna'],['NNA · Personalización','/nna/personalizacion'],['NNA · Menú','/nna/menu'],['NNA · Recursos','/nna/recursos'],['NNA · Juegos','/nna/juegos'],['NNA · Misiones','/nna/misiones'],['NNA · Logros','/nna/logros'],['NNA · Compartir','/nna/compartir'],
 ['Cuidadores · Menú','/cuidadores'],['Cuidadores · Recursos y guías','/cuidadores/recursos'],['Cuidadores · Decide con lo que tienes','/cuidadores/decide-con-lo-que-tienes'],['Cuidadores · Recetas','/cuidadores/recetas'],['Receta · Tostada','/cuidadores/recetas/tostada'],['Receta · Avena','/cuidadores/recetas/avena'],['Receta · Rollitos','/cuidadores/recetas/rollitos'],['Cuidadores · Alimentación','/cuidadores/alimentacion'],['Cuidadores · Actividad física','/cuidadores/actividad']
];
const gallery = document.querySelector('#gallery');
gallery.innerHTML = views.map(([title,path]) => `<article class="view"><header class="view-head"><h2>${title}</h2><a href="index.html#${path}" target="_blank" rel="noopener">Abrir recorrido ↗</a></header><div class="preview-window"><iframe loading="lazy" title="${title}" src="index.html?preview=identity#${path}"></iframe></div><p class="view-note">Puedes desplazarte dentro de la vista para ver todo el contenido.</p></article>`).join('');
let size = 'desktop';
function fitViews() {
 const width = size === 'desktop' ? 1280 : 375, height = size === 'desktop' ? 1000 : 812;
 document.querySelectorAll('.preview-window').forEach(box => { const scale=Math.min(1,box.clientWidth/width); box.style.height=`${height*scale}px`; const frame=box.querySelector('iframe'); frame.style.width=`${width}px`; frame.style.height=`${height}px`; frame.style.transform=`scale(${scale})`; frame.style.marginInline=size === 'mobile' ? 'auto' : '0'; });
}
document.querySelectorAll('[data-size]').forEach(button => button.addEventListener('click',()=>{size=button.dataset.size;document.querySelectorAll('[data-size]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));document.querySelector('#view-status').textContent=`18 páginas · ${size==='mobile'?'Móvil':'Escritorio'}`;fitViews();}));
new ResizeObserver(fitViews).observe(gallery);
fitViews();
