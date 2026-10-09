(function () {
  const app = document.querySelector('#app');
  const nav = document.querySelector('#global-nav');
  const modal = document.querySelector('#audience-modal');
  let lastFocus = null;
  let audioContext = null;
  const avatarDefaults = { body: 'tomato', color: 'red', expression: 'happy', accessory: 'none' };
  const avatarOptions = {
    body: [['tomato','Redonda'],['squat','Achatada'],['capsule','Cápsula'],['organic','Orgánica']],
    color: [['green','Verde'],['blue','Azul'],['yellow','Amarillo'],['red','Rojo'],['orange','Naranja']],
    expression: [['happy','Feliz'],['relaxed','Relajada'],['surprised','Sorprendida'],['excited','Emocionada'],['serious','Seria'],['angry','Enojada'],['sleepy','Dormida'],['wink','Guiñando'],['worried','Preocupada'],['look-left','Mira a la izquierda'],['laugh','Risa'],['bored','Aburrida']],
    accessory: [['none','Ninguno'],['sunglasses','Lentes de sol'],['headphones','Audífonos'],['hat','Gorro']]
  };
  let avatarState = { ...avatarDefaults };
  let visitNnaProfile = null;
  let visitNnaProfileCreated = false;
  // Isolated, clearly labelled gallery previews; never saved or used in normal visits.
  let inVisualGallery = false;
  try { inVisualGallery = window.parent !== window && window.parent.location.pathname.endsWith('/views.html') && new URLSearchParams(location.search).has('preview'); } catch (_) {}
  if (inVisualGallery && !['/nna','/nna/personalizacion'].includes(location.hash.slice(1))) {
    visitNnaProfile = {name:'Luna · ejemplo',ageGroup:'8–12',avatar:{...avatarDefaults}};
    visitNnaProfileCreated = true;
  }

  // El perfil NNA vive solamente durante esta carga de la aplicación.
  // También limpia versiones antiguas que pudieron quedar en localStorage.
  localStorage.removeItem('nnaProfile');
  localStorage.removeItem('nnaProfileCreated');

  const esc = value => String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const page = (content, shell = '') => `<div class="page ${shell}">${content}</div>`;
  const { head, menuCard, icon, wave, photoCard, footer } = ITASO_UI;
  // El footer del Home se reutiliza en todo el recorrido adulto (Inicio y Cuidadores).
  const adultFooter = path => path === '/inicio' || path.startsWith('/cuidadores') ? ITASO_UI.landingFooter() : footer();

  function render(content, shell = '') {
    app.innerHTML = page(content + adultFooter(Router.current()), shell);
    if (!inVisualGallery) app.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    updateNav();
    updateNnaAccess();
    nav.querySelectorAll('a').forEach(link => { if (link.getAttribute('href') === `#${Router.current()}`) link.setAttribute('aria-current', 'page'); });
  }

  // Acceso global a la experiencia NNA: visible en el Home y en toda el área de
  // cuidadores, oculto en cualquier ruta de niñas, niños y adolescentes.
  function updateNnaAccess() {
    const link = document.querySelector('.nna-access');
    if (!link) return;
    const path = Router.current();
    link.hidden = !(path === '/inicio' || path.startsWith('/cuidadores'));
  }

  function updateNav() {
    const path = Router.current();
    if (path.startsWith('/nna')) {
      const on = Store.get('soundEnabled') !== false;
      nav.innerHTML = `<a href="#/nna/menu">Menú NNA</a><a href="#/nna/logros">Logros</a><button class="sound-toggle" type="button" data-toggle-sound aria-pressed="${on}">${on ? '🔊 Sonido activado' : '🔇 Sonido desactivado'}</button><button type="button" data-change-profile>Cambiar perfil</button>`;
    } else if (path.startsWith('/cuidadores')) {
      nav.innerHTML = `<a href="#/cuidadores">Menú cuidadores</a><a href="#/cuidadores/decide-con-lo-que-tienes">Decide con lo que tienes</a><a href="#/cuidadores/recursos">Recursos y guías</a><button type="button" data-change-profile>Cambiar perfil</button>`;
    } else {
      nav.innerHTML = ITASO_LANDING.navigation();
    }
  }

  function tone(kind = 'select') {
    if (Store.get('soundEnabled') === false) return;
    try {
      audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const settings = { select: [480, .035, .025], click: [360, .055, .03], success: [660, .16, .045], achievement: [780, .22, .045] }[kind];
      osc.frequency.value = settings[0]; osc.type = 'sine';
      gain.gain.setValueAtTime(settings[2], audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(.001, audioContext.currentTime + settings[1]);
      osc.connect(gain).connect(audioContext.destination); osc.start(); osc.stop(audioContext.currentTime + settings[1]);
    } catch (_) { /* visual feedback remains available */ }
  }

  function toast(title, detail = '', kind = 'success') {
    const node = document.createElement('div');
    node.className = 'toast'; node.setAttribute('role', 'status');
    node.innerHTML = `<strong>${esc(title)}</strong>${detail ? `<div>${esc(detail)}</div>` : ''}`;
    document.querySelector('#toast-region').append(node); tone(kind);
    setTimeout(() => node.remove(), 3200);
  }

  function openModal() {
    lastFocus = document.activeElement; modal.classList.remove('closing'); modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false');
    modal.querySelector('.modal-close').focus();
  }
  function closeModal() {
    modal.classList.add('closing'); modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true');
    setTimeout(() => modal.classList.remove('closing'), 190); lastFocus?.focus();
  }

  function landing() {
    render(ITASO_LANDING.markup(), 'landing-page');
  }

  function nnaEntry() {
    if (visitNnaProfileCreated) { Router.go('/nna/menu'); return; }
    render(`${head('NNA', '¿Es tu primera vez?', 'En cada visita crearás un personaje nuevo para comenzar.')}<section class="section compact"><div class="narrow grid two">${menuCard('Sí, crear mi personaje', 'Personaliza tu experiencia antes de comenzar.', '/nna/personalizacion')}${menuCard('Ahora no', 'Vuelve al inicio y explora la información general.', '/inicio')}</div></section>`, 'nna-shell');
  }

  function personalization() {
    const saved = visitNnaProfile;
    const previousAvatar = saved?.avatar || {};
    avatarState = Object.fromEntries(Object.keys(avatarDefaults).map(key => [key, previousAvatar[key] || avatarDefaults[key]]));
    const savedAge = saved?.ageGroup || '';
    render(`${head('Personalización', 'Crea tu personaje', 'Elige opciones que te representen. Puedes cambiarlas después.')}
      <section class="section compact"><form id="profile-form" class="container avatar-editor">
        <section class="avatar-stage" aria-labelledby="preview-title">
          <div class="avatar-stage-head"><div><p class="eyebrow">Vista previa</p><h2 id="preview-title">Tu personaje</h2></div><span class="live-badge">● En tiempo real</span></div>
          <div id="avatar-preview" class="avatar-preview" role="img" aria-label="Vista previa del personaje personalizado">${avatarMarkup(avatarState)}</div>
          <p class="avatar-hint">Cada elección cambia una capa sin modificar las demás.</p>
        </section>
        <section class="avatar-controls" aria-labelledby="editor-title">
          <p class="eyebrow">Personalización</p><h2 id="editor-title">Hazlo a tu manera</h2>
          <div class="avatar-tabs" role="tablist" aria-label="Categorías de personalización">
            ${[['body','Forma'],['expression','Expresión'],['accessory','Accesorios'],['color','Color']].map(([key,label],i) => `<button class="avatar-tab" type="button" role="tab" aria-selected="${i === 0}" data-avatar-category="${key}">${label}</button>`).join('')}
          </div>
          <div class="avatar-option-panels">
            ${Object.entries(avatarOptions).map(([key,items],i) => `<div class="avatar-options ${key === 'color' ? 'color-options' : ''}" data-avatar-panel="${key}" ${i ? 'hidden' : ''}>${items.map(([value,label]) => `<button class="avatar-option" type="button" data-avatar-option="${key}" data-value="${value}" aria-pressed="${avatarState[key] === value}">${key === 'color' ? `<span class="color-swatch swatch-${value}" aria-hidden="true"></span>` : `<span class="option-symbol" aria-hidden="true">${avatarSymbol(key,value)}</span>`}<span>${label}</span></button>`).join('')}</div>`).join('')}
          </div>
          <div class="avatar-details">
            <div class="form-group"><label for="character-name">Nombre del personaje</label><input id="character-name" name="name" type="text" maxlength="24" required value="${esc(saved?.name || '')}" placeholder="Escribe un nombre" autocomplete="off"></div>
            <fieldset class="form-group"><legend class="form-label">Edad</legend><div class="age-options"><button class="option" type="button" data-profile-age="8–12" aria-pressed="${savedAge === '8–12'}">8–12 años</button><button class="option" type="button" data-profile-age="13–17" aria-pressed="${savedAge === '13–17'}">13–17 años</button></div></fieldset>
            <p id="profile-requirements" class="requirements">Escribe un nombre y elige un rango de edad para continuar.</p>
            <button id="create-character" class="button primary create-character" type="submit" disabled>CREAR PERSONAJE <span aria-hidden="true">→</span></button>
          </div>
        </section>
      </form></section>`, 'nna-shell');
    refreshCreateButton();
  }

  function avatarSymbol(category, value) {
    const symbols = { body: {tomato:'●',squat:'▬',capsule:'▯',organic:'◆'}, expression: {happy:'⌣',relaxed:'◡',surprised:'○',excited:'✦',serious:'—',angry:'⌢',sleepy:'ᴗ',wink:'◉⌒',worried:'︵', 'look-left':'←',laugh:'D',bored:'¬'}, accessory: {none:'—',sunglasses:'▰',headphones:'◖◗',hat:'⌒'} };
    return symbols[category]?.[value] || '●';
  }

  function avatarMarkup(state) {
    const bodyShapes = {
      tomato: '<ellipse cx="150" cy="164" rx="92" ry="79"/>',
      squat: '<rect x="51" y="106" width="198" height="121" rx="60"/>',
      capsule: '<rect x="84" y="64" width="132" height="201" rx="65"/>',
      organic: '<path d="M150 76c52-6  96 30 91 87-3 35-14 70-48 83-39 15-93 7-119-28-24-32-20-85 7-113 18-18 42-26 69-29Z"/>'
    };
    const openEyes = '<ellipse class="eye-white" cx="121" cy="145" rx="20" ry="25"/><ellipse class="eye-white" cx="179" cy="145" rx="20" ry="25"/><circle cx="127" cy="145" r="9"/><circle cx="185" cy="145" r="9"/>';
    const faces = {
      happy: `${openEyes}<path class="face-line" d="M127 181q23 22 46 0"/>`,
      relaxed: '<path class="face-line" d="M103 145q18-24 36 0M161 145q18-24 36 0M130 183q20 15 40 0"/>',
      surprised: `${openEyes}<circle class="face-line" cx="150" cy="188" r="13"/>`,
      excited: '<path d="m120 124 6 13 14 6-14 6-6 14-6-14-14-6 14-6Zm60 0 6 13 14 6-14 6-6 14-6-14-14-6 14-6Z"/><path class="face-line" d="M126 181q24 30 48 0"/>',
      serious: `${openEyes}<path class="face-line" d="M130 187h40"/>`,
      angry: '<path class="face-line" d="m102 130 35 13m61-13-35 13M128 194q22-22 44 0"/><circle cx="121" cy="149" r="8"/><circle cx="179" cy="149" r="8"/>',
      sleepy: '<path class="face-line" d="M102 148q18 17 36 0m24 0q18 17 36 0M138 188q12 8 24 0"/>',
      wink: '<ellipse class="eye-white" cx="120" cy="145" rx="20" ry="25"/><circle cx="126" cy="145" r="9"/><path class="face-line" d="M162 148q18-22 36 0M132 186q18 17 36 0"/>',
      worried: `${openEyes}<path class="face-line" d="M128 198q22-23 44 0"/>`,
      'look-left': '<ellipse class="eye-white" cx="121" cy="145" rx="20" ry="25"/><ellipse class="eye-white" cx="179" cy="145" rx="20" ry="25"/><circle cx="113" cy="145" r="9"/><circle cx="171" cy="145" r="9"/><path class="face-line" d="M134 187q16 13 32 0"/>',
      laugh: '<path class="face-line" d="M102 145q18-21 36 0m24 0q18-21 36 0"/><path d="M122 176q28 39 56 0Z"/>',
      bored: '<path class="face-line" d="M101 139h38m22 0h38M132 191q18-9 36 0"/><circle cx="121" cy="148" r="7"/><circle cx="179" cy="148" r="7"/>'
    };
    const accessories = {
      none: '',
      sunglasses: '<g><rect x="91" y="121" width="52" height="34" rx="12"/><rect x="157" y="121" width="52" height="34" rx="12"/><path d="M143 135h14"/></g>',
      headphones: '<g class="outline-only"><path d="M81 144q0-75 69-75t69 75"/><rect x="69" y="132" width="27" height="58" rx="12"/><rect x="204" y="132" width="27" height="58" rx="12"/></g>',
      hat: '<path d="M82 104q17-58 83-46 39 7 52 46Z"/><path d="M168 101q54-2 65 17-43 8-72-2Z"/>'
    };
    const leaves = '<g class="avatar-leaves"><path d="M151 91q-7-38 10-59 13 28 4 55 28-29 53-18-17 29-52 32 4 1 7 4-29 12-51-2-31 5-48-16 25-18 59 3-11-31 5-48 23 16 13 49Z"/></g>';
    return `<svg class="avatar-svg color-${state.color}" viewBox="0 0 300 330" aria-hidden="true"><g class="avatar-limbs"><path d="M82 187Q38 196 37 235M218 187q44 9 45 48M111 235l-12 67M189 235l12 67"/><circle cx="36" cy="240" r="8"/><circle cx="264" cy="240" r="8"/><path d="M83 307h31M186 307h31"/></g><g class="avatar-body body-${state.body}">${bodyShapes[state.body]}</g>${leaves}<g class="avatar-face expression-${state.expression}">${faces[state.expression]}</g><g class="avatar-accessory accessory-${state.accessory}">${accessories[state.accessory]}</g></svg>`;
  }

  function updateAvatarPreview() {
    const preview = document.querySelector('#avatar-preview');
    if (preview) { preview.innerHTML = avatarMarkup(avatarState); preview.classList.remove('avatar-updated'); void preview.offsetWidth; preview.classList.add('avatar-updated'); }
  }

  function refreshCreateButton() {
    const form = document.querySelector('#profile-form'); if (!form) return;
    const hasName = Boolean(form.name.value.trim());
    const hasAge = Boolean(form.querySelector('[data-profile-age][aria-pressed="true"]'));
    const button = form.querySelector('#create-character'); button.disabled = !(hasName && hasAge && avatarState.body);
    form.querySelector('#profile-requirements').textContent = button.disabled ? 'Escribe un nombre y elige un rango de edad para continuar.' : 'Todo listo. Puedes crear tu personaje.';
  }

  function nnaMenu() {
    if (!requireVisitNnaProfile()) return;
    const profile = visitNnaProfile;
    render(`${head('Menú NNA', `¿Qué quieres hacer${profile?.name ? `, ${esc(profile.name)}` : ''}?`, 'Elige una actividad. Tú decides por dónde comenzar.')}
      <section class="section compact"><div class="container grid">${menuCard('Recursos', 'Explicaciones breves y visuales.', '/nna/recursos')}${menuCard('Juegos', 'Practica con situaciones cotidianas.', '/nna/juegos')}${menuCard('Misiones educativas', 'Completa un reto paso a paso.', '/nna/misiones')}${menuCard('Mis logros', 'Mira lo que ya aprendiste.', '/nna/logros')}${menuCard('Compartir', 'Crea una tarjeta con tu avance.', '/nna/compartir')}</div></section>`, 'nna-shell');
  }

  function nnaSimple(kind) {
    if (!requireVisitNnaProfile()) return;
    const configs = {
      recursos: ['Recursos', '¿Qué quieres aprender?', ['Etiquetado nutrimental','Hidratación y bebidas azucaradas','Porción visual']],
      juegos: ['Juegos', '¿Qué juego quieres jugar?', ['Arma tu lunch','Elige tu bebida','Crea tu plato']],
      compartir: ['Compartir', '¿Qué quieres compartir?', ['Mi elección de bebida','Mi plato armado','Mi misión completada']]
    };
    const [eyebrow, title, items] = configs[kind];
    render(`${head(eyebrow, title)}<section class="section compact"><div class="container grid">${items.map((x,i) => menuCard(x, kind === 'compartir' ? 'Genera una vista previa para mostrar.' : 'Actividad de demostración funcional.', `action:${kind}:${i}`)).join('')}</div><div id="inline-result" class="container"></div></section>`, 'nna-shell');
  }

  function missions() {
    if (!requireVisitNnaProfile()) return;
    render(`${head('Misiones educativas', 'Entender los sellos', 'Una misión breve en tres pasos.')}
      <section class="section compact"><div class="narrow"><div class="progress"><span id="mission-progress" style="width:0"></span></div><div id="mission-step" class="card" style="margin-top:20px"><h3>Paso 1 de 3</h3><p>Observa si el producto tiene uno o más sellos frontales.</p><button class="button primary" type="button" data-mission-next="1">Ya lo observé</button></div></div></section>`, 'nna-shell');
  }

  function achievements() {
    if (!requireVisitNnaProfile()) return;
    const list = Store.get('nnaAchievements') || [];
    render(`${head('Mis logros', 'Lo que has conseguido', 'Cada logro representa una actividad completada.')}
      <section class="section compact"><div class="narrow">${list.length ? `<div class="grid two">${list.map(x => `<article class="card"><p class="eyebrow">Logro desbloqueado</p><h3>★ ${esc(x)}</h3></article>`).join('')}</div>` : '<div class="empty"><h3>Todavía no hay logros</h3><p>Completa una misión para desbloquear el primero.</p><a class="button primary" href="#/nna/misiones">Ir a misiones</a></div>'}</div></section>`, 'nna-shell');
  }

  function caregiverMenu() {
    const tool = (title, description, route, type, glyph) => `<button class="cg-card cg-${type}" type="button" data-route="${route}"><span class="cg-icon">${icon(glyph)}</span><h2>${title}</h2><p>${description}</p><span class="cg-explore">Explorar ${icon('arrow')}</span><svg class="cg-corner" viewBox="0 0 200 130" preserveAspectRatio="none" aria-hidden="true"><path d="M0 130C35 65 120 40 200 0v130Z"/></svg></button>`;
    render(`<section class="cg-hero cg-container"><div class="cg-copy"><p class="breadcrumb"><a href="#/inicio">Inicio</a> / Cuidadores</p><p class="cg-label">Cuidadores</p><h1>¿Qué necesitas hoy?</h1><p class="cg-lead">Herramientas prácticas que consideran tiempo,<br> presupuesto, disponibilidad y preferencias.</p></div><div class="cg-media"><img class="cg-photo" src="assets/identity/itaso_landing_editable-1.png" alt="Una madre abraza a su hija" width="526" height="521"></div></section><svg class="lp-wave lp-wave--blue" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true"><path d="M0 28C220-16 378 70 606 38c250-37 432 37 630-9 95-23 159-16 204 1v70H0Z"/></svg><section class="cg-tools cg-container"><p class="cg-label">Herramientas</p><div class="cg-grid">${tool('Recursos y guías','Guías y materiales.','/cuidadores/recursos','orange','book')}${tool('Decide con lo que tienes','No necesitas una comida perfecta. Empecemos por lo que quieres resolver hoy.','/cuidadores/decide-con-lo-que-tienes','green','choice')}${tool('Recetas','Ideas posibles.','/cuidadores/recetas','blue','plate')}</div></section><section class="cg-topics cg-container"><p class="cg-label">Temas</p><div class="cg-grid cg-grid-two">${tool('Alimentación','Explora cinco subtemas.','/cuidadores/alimentacion','red','leaf')}${tool('Actividad física y sedentarismo','Encuentra una actividad según tu contexto.','/cuidadores/actividad','green','move')}</div></section>`, 'caregiver-menu');
  }

  function decideWithWhatYouHave() { decisionExperience(render, head); }

  const recipeTypes = [['', 'Todos'], ['desayuno', 'Desayuno'], ['comida', 'Comida'], ['cena', 'Cena'], ['lunch', 'Lunch'], ['colacion', 'Colación'], ['bebida', 'Bebidas']];
  const recipeTags = [['rápida', 'Rápida'], ['económica', 'Económica'], ['con verduras', 'Con verduras'], ['con leguminosas', 'Con leguminosas'], ['para llevar', 'Para llevar'], ['con fruta', 'Con fruta'], ['hidratación', 'Hidratación']];

  function recipes() {
    render(`${head('Recetas', 'Ideas que se adaptan a tu día', 'Veinte ideas posibles. Filtra por tipo o ingrediente; los costos son aproximados.')}
      <section class="section compact"><div class="container">
        <form id="recipe-filters" class="card recipe-filters" onsubmit="return false">
          <div class="grid two">
            <div class="form-group"><label for="recipe-type">Tipo</label><select id="recipe-type">${recipeTypes.map(([v, l]) => `<option value="${v}">${l}</option>`).join('')}</select></div>
            <div class="form-group"><label for="recipe-search">Buscar ingrediente</label><input id="recipe-search" type="search" placeholder="Por ejemplo: frijol, avena, tortilla" autocomplete="off"></div>
          </div>
          <div id="recipe-tags" class="recipe-tag-filters" aria-label="Filtrar por característica">${recipeTags.map(([v, l]) => `<button class="filter-chip" type="button" data-recipe-tag="${v}" aria-pressed="false">${l}</button>`).join('')}</div>
        </form>
        <p id="recipe-count" class="recipe-count" role="status"></p>
        <div id="recipe-list" class="grid"></div>
      </div></section>`);
    drawRecipes();
  }

  function drawRecipes() {
    const type = document.querySelector('#recipe-type')?.value || '';
    const query = (document.querySelector('#recipe-search')?.value || '').trim().toLocaleLowerCase('es');
    const activeTag = document.querySelector('#recipe-tags [data-recipe-tag][aria-pressed="true"]');
    const tag = activeTag ? activeTag.dataset.recipeTag : '';
    const items = ITASO_DATA.recipes.filter(r => {
      if (type && !r.tipo.includes(type)) return false;
      if (tag && !r.tags.map(t => t.toLocaleLowerCase('es')).includes(tag)) return false;
      if (query) {
        const hay = [r.name, r.description, ...r.ingredients].join(' ').toLocaleLowerCase('es');
        if (!hay.includes(query)) return false;
      }
      return true;
    });
    const target = document.querySelector('#recipe-list');
    const count = document.querySelector('#recipe-count');
    if (!target) return;
    if (count) count.textContent = `${items.length} ${items.length === 1 ? 'receta' : 'recetas'}`;
    target.innerHTML = items.length ? items.map(r => `<article class="card recipe-card">
      <p class="eyebrow">${r.time} min · ${r.cost} · ${r.difficulty}</p>
      <h3>${esc(r.name)}</h3>
      <p class="muted">${esc(r.description)}</p>
      <div class="recipe-card-tags">${r.tags.map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>
      <div class="button-row"><a class="button" href="#/cuidadores/recetas/${r.id}">Ver receta</a></div>
    </article>`).join('') : '<div class="empty"><h3>No hay recetas con esos filtros</h3><p>Prueba con otro tipo, otro ingrediente o quita las características seleccionadas.</p></div>';
  }

  function recipeDetail(id) {
    const r = ITASO_DATA.recipes.find(x => x.id === id); if (!r) return Router.go('/cuidadores/recetas');
    const saved = (Store.get('savedRecipes') || []).includes(id);
    const typeLabels = { desayuno: 'Desayuno', comida: 'Comida', cena: 'Cena', lunch: 'Lunch', colacion: 'Colación', bebida: 'Bebida' };
    const snack = window.ITASO_source && window.ITASO_source('unicefSchoolSnacks');
    const advice = window.ITASO_source && window.ITASO_source('imssNutritionAdvice');
    render(`${head('Receta', r.name, r.description)}
      <section class="section compact"><div class="container">
        <div class="recipe-meta">
          ${r.tipo.map(t => `<span class="recipe-chip">${typeLabels[t] || esc(t)}</span>`).join('')}
          <span class="recipe-chip">${r.time} min</span>
          <span class="recipe-chip">${r.cost}</span>
          <span class="recipe-chip">${r.difficulty}</span>
        </div>
        <div class="narrow grid two recipe-columns">
          <article class="card"><h2>Ingredientes</h2><ul class="recipe-list-items">${r.ingredients.map(x => `<li>${esc(x)}</li>`).join('')}</ul><p class="recipe-serves">Para ${r.portions} porción(es) aproximadas</p></article>
          <article class="card"><h2>Pasos</h2><ol class="recipe-list-items">${r.steps.map(x => `<li>${esc(x)}</li>`).join('')}</ol></article>
        </div>
        <section class="recipe-substitutions">
          <h2>Si no tienes…</h2>
          <p class="muted">${esc(r.siNoTienes)}</p>
          <div class="grid two">${r.substitutions.map(s => `<article class="card substitution-card"><p class="eyebrow">En lugar de ${esc(s.what)}</p><p>${esc(s.replace)}</p></article>`).join('')}</div>
        </section>
        <aside class="recipe-serve"><span>PUEDE SERVIRTE SI</span><p>${esc(r.sirveSi)}</p></aside>
        <p class="recipe-source">Ideas de preparación basadas en el <a href="${esc(snack.url)}" target="_blank" rel="noopener noreferrer">${esc(snack.title)} de UNICEF</a> y en los <a href="${esc(advice.url)}" target="_blank" rel="noopener noreferrer">${esc(advice.title)} del IMSS</a>.</p>
        <div class="narrow button-row"><button class="button primary" type="button" data-save-recipe="${id}">${saved ? 'Quitar de guardadas' : 'Guardar receta'}</button><a class="button" href="#/cuidadores/recetas">Ver otras recetas</a></div>
      </div></section>`);
  }

  function nutrition() {
    render(`${head('Alimentación', '¿Qué quieres entender?', 'Elige un tema para abrir una ficha informativa con fuentes verificables.')}<section class="section compact"><div class="container grid nutrition-grid">${Object.entries(ITASO_DATA.nutritionResources).map(([id, topic]) => nutritionCard(id, topic)).join('')}</div></section>`);
  }

  function nutritionCard(id, topic) {
    const glyph = ({ porciones: 'book', grupos: 'plate', etiquetado: 'book', hidratacion: 'drop', hambre: 'heart' }[id] || 'leaf');
    return `<button class="card action-card nutrition-card nutrition-${esc(topic.accent)}" type="button" data-nutrition="${esc(id)}"><span class="icon-disc">${icon(glyph)}</span><h3>${esc(topic.title)}</h3><p class="muted">${esc(topic.subtitle)}</p><span class="nutrition-link">Explorar tema<span class="arrow" aria-hidden="true">${icon('arrow')}</span></span></button>`;
  }

  function activity() {
    const topics = Object.entries(ITASO_DATA.activityTopics);
    const glyph = { movimiento: 'move', cuanto: 'target', intensidad: 'play', sedentarismo: 'star', familia: 'heart' };
    const topicCard = ([id, t]) => `<button class="card action-card nutrition-card nutrition-${esc(t.accent)}" type="button" data-caregiver-topic="${esc(id)}"><span class="icon-disc">${icon(glyph[id] || 'move')}</span><h3>${esc(t.title)}</h3><p class="muted">${esc(t.subtitle)}</p><span class="nutrition-link">Explorar tema<span class="arrow" aria-hidden="true">${icon('arrow')}</span></span></button>`;
    const whoOptions = [['solo', 'Solo/a'], ['nina', 'Con una niña o niño'], ['familia', 'En familia']];
    const goalOptions = [['positivo', 'Movernos un poco'], ['pausa', 'Hacer una pausa'], ['sedentario', 'Salir de la rutina sentada'], ['juntos', 'Hacer algo juntos'], ['intensa', 'Una actividad más intensa']];
    const optionGrid = (label, key, options) => `<div class="form-group"><p class="form-label">${label}</p><div class="option-grid" data-single>${options.map(([value, text]) => `<button class="option" type="button" data-activity-${key}="${value}" aria-pressed="false">${text}</button>`).join('')}</div></div>`;
    render(`${head('Actividad física y sedentarismo', 'Muévete en la medida posible', 'Cinco temas para comprender el movimiento cotidiano y un generador que se adapta a tu día.')}
      <section class="section compact"><div class="container grid nutrition-grid">${topics.map(topicCard).join('')}</div></section>
      <section class="section compact activity-tool"><div class="container narrow tool-panel">
        <div class="activity-tool-head"><p class="eyebrow">Generador</p><h2>Encuentra una actividad posible</h2><p class="muted">Combina lugar, tiempo, con quién y qué necesitas hoy.</p></div>
        <form id="activity-form" class="card">
          <div class="grid two" style="gap:18px">
            <div class="form-group"><label for="activity-place">¿Dónde?</label><select id="activity-place" required><option value="">Elige</option><option value="casa">Casa</option><option value="parque">Parque</option><option value="espacio">Poco espacio</option></select></div>
            <div class="form-group"><label for="activity-time">¿Cuánto tiempo?</label><select id="activity-time" required><option value="">Elige</option><option value="5">5 min</option><option value="10">10 min</option><option value="20">20 min</option></select></div>
          </div>
          ${optionGrid('¿Con quién?', 'who', whoOptions)}
          ${optionGrid('¿Qué buscas hoy?', 'goal', goalOptions)}
          <div class="button-row"><button class="button primary" type="submit">Ver actividad</button></div>
          <p class="activity-note">La sugerencia considera tu contexto. Adapta el ritmo a cómo se sienta el cuerpo y no la conviertas en una obligación.</p>
        </form>
        <div id="activity-result" class="activity-result" aria-live="polite"></div>
      </div></section>`);
  }

  function resourcePage() {
    const g = window.ITASO_GUIDE;
    if (!g) { render(head('Recursos y guías', 'Claridad para entender')); return; }
    const pageInfo = g.page || {};
    const card = g.card || {};
    render(`${head('Recursos y guías', pageInfo.title || 'Claridad para llevar contigo', pageInfo.lead || '')}
      <section class="section compact"><div class="container">
        <article class="card guide-card">
          <div class="guide-card-head">
            <span class="icon-disc tone-${g.accent}">${icon('book')}</span>
            <span class="resource-badge">Guía</span>
          </div>
          <h2>${esc(card.name || g.title)}</h2>
          <p class="lead">${esc(card.text || '')}</p>
          <p class="muted">${esc(card.micro || '')}</p>
          <div class="button-row"><button class="button primary" type="button" data-open-guide>${esc(card.cta || 'Conocer la guía')} ${icon('arrow')}</button></div>
        </article>
      </div></section>`);
  }

  Router.register('/inicio', landing);
  Router.register('/nna', nnaEntry); Router.register('/nna/personalizacion', personalization); Router.register('/nna/menu', nnaMenu);
  Router.register('/nna/recursos', () => nnaSimple('recursos')); Router.register('/nna/juegos', () => nnaSimple('juegos')); Router.register('/nna/misiones', missions); Router.register('/nna/logros', achievements); Router.register('/nna/compartir', () => nnaSimple('compartir'));
  Router.register('/cuidadores', caregiverMenu); Router.register('/cuidadores/recursos', resourcePage); Router.register('/cuidadores/decide-con-lo-que-tienes', decideWithWhatYouHave); Router.register('/cuidadores/comparar', () => Router.go('/cuidadores/decide-con-lo-que-tienes')); Router.register('/cuidadores/decidir', () => Router.go('/cuidadores/decide-con-lo-que-tienes')); Router.register('/cuidadores/recetas', recipes); Router.register('/cuidadores/recetas/:id', ({id}) => recipeDetail(id)); Router.register('/cuidadores/alimentacion', nutrition); Router.register('/cuidadores/actividad', activity); Router.register('/cuidadores/actividad-fisica', activity);

  document.addEventListener('click', event => {
    const route = event.target.closest('[data-route]')?.dataset.route;
    if (route) {
      tone('click');
      if (route.startsWith('action:')) {
        const [, kind, index] = route.split(':');
        const texts = kind === 'compartir' ? ['Vista previa de tarjeta generada. Puedes mostrarla o guardarla.','Tarjeta creada con tu avance.','¡Tu misión está lista para compartir!'] : ['Observa, elige y compara. No hay una única respuesta correcta.','Actividad iniciada. Elige la opción que se parezca más a tu día.','Aprendizaje breve: fíjate en la porción antes de comparar.'];
        document.querySelector('#inline-result').innerHTML = `<div class="result"><h3>${texts[index]}</h3><p>Este módulo demuestra el recorrido; el contenido final se añadirá en otra etapa.</p><a class="button" href="#/nna/menu">Volver al menú NNA</a></div>`;
      } else Router.go(route);
    }
    const single = event.target.closest('[data-single] .option');
    if (single) {
      single.parentElement.querySelectorAll('.option').forEach(x => x.setAttribute('aria-pressed','false'));
      single.setAttribute('aria-pressed','true'); tone('select');
    }
    const avatarCategory = event.target.closest('[data-avatar-category]');
    if (avatarCategory) {
      const category = avatarCategory.dataset.avatarCategory;
      document.querySelectorAll('[data-avatar-category]').forEach(tab => tab.setAttribute('aria-selected', String(tab === avatarCategory)));
      document.querySelectorAll('[data-avatar-panel]').forEach(panel => { panel.hidden = panel.dataset.avatarPanel !== category; });
      tone('select');
    }
    const avatarOption = event.target.closest('[data-avatar-option]');
    if (avatarOption) {
      const category = avatarOption.dataset.avatarOption;
      avatarState[category] = avatarOption.dataset.value;
      document.querySelectorAll(`[data-avatar-option="${category}"]`).forEach(option => option.setAttribute('aria-pressed', String(option === avatarOption)));
      updateAvatarPreview(); refreshCreateButton(); tone('select');
    }
    const ageOption = event.target.closest('[data-profile-age]');
    if (ageOption) {
      document.querySelectorAll('[data-profile-age]').forEach(option => option.setAttribute('aria-pressed', String(option === ageOption)));
      refreshCreateButton(); tone('select');
    }
    if (event.target.closest('[data-open-audience]') || event.target.closest('#audience-trigger') || event.target.closest('[data-change-profile]')) openModal();
    if (event.target.closest('[data-close-modal]')) closeModal();
    const profile = event.target.closest('[data-profile]')?.dataset.profile;
    if (profile) { Store.set('currentProfile', profile); tone('click'); closeModal(); Router.go(profile === 'nna' ? '/nna' : '/cuidadores'); }
    if (event.target.closest('[data-toggle-sound]')) { const next = Store.get('soundEnabled') === false; Store.set('soundEnabled', next); updateNav(); toast(next ? 'Sonido activado' : 'Sonido desactivado', 'La preferencia quedó guardada.', next ? 'select' : 'none'); }
    const mission = event.target.closest('[data-mission-next]');
    if (mission) advanceMission(Number(mission.dataset.missionNext));
    const recipe = event.target.closest('[data-save-recipe]')?.dataset.saveRecipe;
    if (recipe) { const list = Store.toggleInList('savedRecipes', recipe); toast(list.includes(recipe) ? 'Receta guardada' : 'Receta eliminada', 'Tu selección quedó actualizada.'); recipeDetail(recipe); }
    const recipeTag = event.target.closest('[data-recipe-tag]');
    if (recipeTag) {
      recipeTag.setAttribute('aria-pressed', String(recipeTag.getAttribute('aria-pressed') !== 'true'));
      drawRecipes();
    }
  });

  document.addEventListener('change', event => {
    if (event.target.matches('#recipe-type')) drawRecipes();
  });

  document.addEventListener('input', event => {
    if (event.target.id === 'character-name') refreshCreateButton();
    if (event.target.id === 'recipe-search') drawRecipes();
  });

  document.addEventListener('submit', event => {
    event.preventDefault();
    if (event.target.id === 'profile-form') {
      const ageGroup = event.target.querySelector('[data-profile-age][aria-pressed="true"]')?.dataset.profileAge;
      const profile = { name: event.target.name.value.trim(), ageGroup, avatar: { ...avatarState } };
      if (!profile.name || !profile.ageGroup || !profile.avatar.body) return toast('Falta una elección', 'Escribe un nombre y elige un rango de edad.', 'click');
      visitNnaProfile = profile; visitNnaProfileCreated = true; toast('¡Personaje creado!', 'Te llevamos al menú NNA.', 'success'); setTimeout(() => Router.go('/nna/menu'), 700);
    }
  });

  function advanceMission(step) {
    const target = document.querySelector('#mission-step'); const bar = document.querySelector('#mission-progress');
    if (step === 1) { bar.style.width = '34%'; target.innerHTML = '<h3>Paso 2 de 3</h3><p>Revisa el tamaño de la porción usada para mostrar los datos.</p><button class="button primary" type="button" data-mission-next="2">Ya lo revisé</button>'; }
    if (step === 2) { bar.style.width = '67%'; target.innerHTML = '<h3>Paso 3 de 3</h3><p>Compara dos productos usando la misma cantidad.</p><button class="button primary" type="button" data-mission-next="3">Completar misión</button>'; }
    if (step === 3) { bar.style.width = '100%'; const achievements = Store.get('nnaAchievements') || []; if (!achievements.includes('Explorador de etiquetas')) Store.set('nnaAchievements', [...achievements, 'Explorador de etiquetas']); target.innerHTML = '<p class="eyebrow">¡Misión completada!</p><h3>✓ Ya tienes un criterio para comparar</h3><p>Primero iguala la porción; después observa azúcares, sellos e ingredientes.</p><a class="button primary" href="#/nna/logros">Ver mi logro</a>'; toast('Nuevo logro desbloqueado', 'Explorador de etiquetas', 'achievement'); }
    tone(step === 3 ? 'success' : 'click');
  }

  function requireVisitNnaProfile() {
    if (visitNnaProfileCreated && visitNnaProfile) return true;
    Router.go('/nna');
    return false;
  }

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
    if (event.key === 'Tab' && modal.getAttribute('aria-hidden') === 'false') {
      const focusable = [...modal.querySelectorAll('button:not([disabled]), a[href]')]; const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });

  Router.resolve();
})();
