/* ITASO visual components. Edit these templates once to update every route. */
(function () {
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const paths = {
    leaf: '<path d="M12 21V10M12 14C3 14 3 5 3 5s10-1 9 9Zm0 4c0-8 9-10 9-10s1 10-9 10Z"/>',
    book: '<path d="M12 6C8 3 4 3 2 4v15c4-1 7 0 10 2 3-2 6-3 10-2V4c-4-1-7 0-10 2Zm0 0v15"/>',
    heart: '<path d="M20 5c-3-3-6-1-8 1-2-2-5-4-8-1-5 5 2 11 8 15 6-4 13-10 8-15Z"/>',
    plate: '<circle cx="12" cy="12" r="7"/><path d="M2 3v7m-2-7v5c0 2 4 2 4 0V3M2 10v12M22 3v19m0-19c-4 3-4 9 0 9"/>',
    choice: '<path d="M4 5h16M4 12h16M4 19h16"/><circle cx="8" cy="5" r="2"/><circle cx="16" cy="12" r="2"/><circle cx="9" cy="19" r="2"/>',
    star: '<path d="m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1Z"/>',
    play: '<rect x="2" y="5" width="20" height="14" rx="5"/><path d="M6 12h6m-3-3v6m7-5h.01m3 4h.01"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><path d="m12 12 9-9m-5 0h5v5"/>',
    share: '<path d="M12 16V2m-5 5 5-5 5 5M4 11v10h16V11"/>',
    move: '<circle cx="15" cy="3" r="2"/><path d="m7 10 5-4 4 6 5 2M12 6l-2 9-5 6m5-6 6 2 1 5"/>',
    drop: '<path d="M12 2S4 11 4 15a8 8 0 0 0 16 0c0-4-8-13-8-13Z"/>',
    document: '<path d="M5 2h9l5 5v15H5V2Zm9 0v6h5M8 12h8m-8 5h8"/>',
    arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>'
  };
  function icon(name='leaf') { return `<svg class="itaso-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.leaf}</svg>`; }
  function iconFor(route) {
    if (/recursos|etiquetado|porciones/.test(route)) return 'book';
    if (/recetas|grupos|plato/.test(route)) return 'plate';
    if (/decide/.test(route)) return 'choice';
    if (/juegos/.test(route)) return 'play';
    if (/misiones/.test(route)) return 'target';
    if (/logros/.test(route)) return 'star';
    if (/compartir/.test(route)) return 'share';
    if (/actividad/.test(route)) return 'move';
    if (/hidratacion/.test(route)) return 'drop';
    return 'leaf';
  }
  function wave(tone='blue') { return `<svg class="brand-wave wave-${tone}" viewBox="0 0 1440 85" preserveAspectRatio="none" aria-hidden="true"><path d="M0 27C220-17 378 70 606 38c250-37 432 37 630-9 95-23 159-16 204 1v55H0Z"/></svg>`; }
  function head(eyebrow,title,text='') { return `<section class="page-head"><div class="container"><p class="breadcrumb"><a href="#/inicio">Inicio</a> <span aria-hidden="true">/</span> ${esc(eyebrow)}</p><p class="eyebrow">${esc(eyebrow)}</p><h1>${title}</h1>${text ? `<p class="lead">${text}</p>` : ''}</div>${wave('soft')}</section>`; }
  function menuCard(title,description,route) { return `<button class="card action-card" type="button" data-route="${esc(route)}"><span class="icon-disc">${icon(iconFor(route))}</span><h3>${title}</h3><p class="muted">${description}</p><span class="arrow" aria-hidden="true">${icon('arrow')}</span></button>`; }
  function photoCard(title,text,image,kind) { return `<article class="card team-card"><img src="assets/identity/itaso_landing_editable-${image}.png" alt="" loading="lazy"><div class="team-content"><span class="icon-disc tone-${kind}">${icon(kind)}</span><h3>${title}</h3><p>${text}</p></div></article>`; }
  function footer() { return `<footer class="container site-footer"><a class="brand" href="#/inicio"><img class="brand-logo" src="assets/identity/logo-color.svg" alt="ITASO-MX, inicio"></a><span>© ITASO-MX · Prototipo</span><a href="#/inicio">Volver al inicio</a></footer>`; }
  // Footer del Home, compartido con el menú de cuidadores para que ambos sean idénticos.
  function landingFooter() { return `<footer class="lp-footer lp-container"><div><a href="#/inicio" aria-label="ITASO-MX, inicio"><img src="assets/identity/logo-color.svg" alt="ITASO-MX" width="260" height="95"></a><p>© ITASO-MX — prototipo</p></div><nav aria-label="Información legal"><button type="button" data-lp-info="privacy">Privacidad</button><button type="button" data-lp-info="terms">Términos</button><a href="mailto:contacto@itaso.mx">Contacto</a></nav></footer><dialog id="lp-dialog" class="lp-dialog" aria-labelledby="lp-dialog-title"><button class="lp-dialog-close" type="button" data-lp-close aria-label="Cerrar">×</button><h2 id="lp-dialog-title"></h2><div id="lp-dialog-content"></div></dialog>`; }
  window.ITASO_UI = {icon, wave, head, menuCard, photoCard, footer, landingFooter};
})();
