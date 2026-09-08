(function () {
  const app = document.querySelector('#app');
  const nav = document.querySelector('#global-nav');
  const modal = document.querySelector('#audience-modal');
  let lastFocus = null;
  let audioContext = null;
  const avatarDefaults = { body: 'round', color: 'green', eyes: 'round', expression: 'happy', accessory: 'none' };
  const avatarOptions = {
    body: [['round','Redonda'],['oval','Ovalada'],['square','Cuadrada suave'],['blob','Irregular']],
    color: [['green','Verde'],['blue','Azul'],['yellow','Amarillo'],['red','Rojo'],['orange','Naranja']],
    eyes: [['round','Grandes'],['small','Pequeños'],['sparkle','Brillantes'],['wink','Guiño']],
    expression: [['happy','Alegre'],['calm','Tranquila'],['curious','Curiosa'],['surprised','Sorprendida']],
    accessory: [['none','Ninguno'],['chef','Gorro de chef'],['glasses','Lentes'],['sunglasses','Lentes de sol'],['headphones','Audífonos'],['cap','Gorra'],['crown','Corona'],['bow','Moño'],['sportband','Banda deportiva']]
  };
  let avatarState = { ...avatarDefaults };

  const esc = value => String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const page = (content, shell = '') => `<div class="page ${shell}">${content}</div>`;
  const head = (eyebrow, title, text = '') => `<section class="page-head"><div class="container"><p class="breadcrumb"><a href="#/inicio">Inicio</a> / ${esc(eyebrow)}</p><p class="eyebrow">${esc(eyebrow)}</p><h1>${title}</h1>${text ? `<p class="lead">${text}</p>` : ''}</div></section>`;
  const menuCard = (title, description, route) => `<button class="card action-card" type="button" data-route="${route}"><h3>${title}</h3><p class="muted">${description}</p><span class="arrow" aria-hidden="true">→</span></button>`;

  function render(content, shell = '') {
    app.innerHTML = page(content, shell);
    app.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    updateNav();
  }

  function updateNav() {
    const path = Router.current();
    if (path.startsWith('/nna')) {
      const on = Store.get('soundEnabled') !== false;
      nav.innerHTML = `<a href="#/nna/menu">Menú NNA</a><a href="#/nna/logros">Logros</a><button class="sound-toggle" type="button" data-toggle-sound aria-pressed="${on}">${on ? '🔊 Sonido activado' : '🔇 Sonido desactivado'}</button><button type="button" data-change-profile>Cambiar perfil</button>`;
    } else if (path.startsWith('/cuidadores')) {
      nav.innerHTML = `<a href="#/cuidadores">Menú cuidadores</a><a href="#/cuidadores/comparar">Comparar</a><a href="#/cuidadores/decidir">Decidir</a><button type="button" data-change-profile>Cambiar perfil</button>`;
    } else {
      nav.innerHTML = `<a href="#quienes">Quiénes somos</a><a href="#equipo">Equipo</a><a href="#mision">Misión y visión</a><a href="#fuentes">Fuentes</a>`;
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
    render(`
      <div class="container hero">
        <div><p class="eyebrow">Instituto de Trastornos y Alimentación Saludable</p><h1>Claridad para decidir desde tu realidad.</h1><p class="lead">Información comprensible y herramientas prácticas para acompañar decisiones cotidianas sobre alimentación, bienestar y movimiento.</p><div class="button-row"><a class="button primary" href="#quienes">Conócenos</a><button class="button" type="button" data-open-audience>Elegir experiencia</button></div></div>
        <div class="placeholder" aria-label="Espacio reservado para ilustración">[ILUSTRACIÓN]</div>
      </div>
      <section id="quienes" class="section"><div class="container grid two"><div><p class="eyebrow">Quiénes somos</p><h2>Información que se puede usar en la vida real</h2></div><p class="lead">ITASO-MX transforma evidencia científica en criterios claros para que niñas, niños, adolescentes y sus cuidadores puedan comparar alternativas y tomar decisiones posibles, sin juicios ni respuestas únicas.</p></div></section>
      <section id="equipo" class="section"><div class="container"><p class="eyebrow">Equipo</p><h2>Una mirada integral</h2><div class="grid"><article class="card"><span class="placeholder mini">[IMAGEN]</span><h3>Nutrición</h3><p>Contenido basado en evidencia y lenguaje cotidiano.</p></article><article class="card"><span class="placeholder mini">[IMAGEN]</span><h3>Psicología</h3><p>Orientación respetuosa, libre de estigma.</p></article><article class="card"><span class="placeholder mini">[IMAGEN]</span><h3>Educación</h3><p>Herramientas útiles para aprender haciendo.</p></article></div></div></section>
      <section id="mision" class="section"><div class="container grid two"><article class="card"><p class="eyebrow">Misión</p><h2>Acompañar</h2><p>Convertir información compleja en decisiones comprensibles y aplicables.</p></article><article class="card"><p class="eyebrow">Visión</p><h2>Bienestar posible</h2><p>Entornos donde el cuidado se construya con autonomía, criterio y empatía.</p></article></div></section>
      <section id="fuentes" class="section"><div class="container"><p class="eyebrow">Fuentes</p><h2>Transparencia científica</h2><p class="lead">Este prototipo reserva un espacio para referencias, notas metodológicas y actualización de contenidos.</p><div class="placeholder mini">[FUENTES CIENTÍFICAS]</div></div></section>
      <footer class="container site-footer"><span>© ITASO-MX — prototipo</span><span><a href="#/inicio">Privacidad</a> · <a href="#/inicio">Términos</a> · <a href="mailto:contacto@itaso.mx">Contacto</a></span></footer>`);
  }

  function nnaEntry() {
    if (Store.get('nnaProfileCreated')) { Router.go('/nna/menu'); return; }
    render(`${head('NNA', '¿Es tu primera vez?', 'Tu respuesta nos ayuda a saber por dónde empezar.')}<section class="section compact"><div class="narrow grid two">${menuCard('Sí, quiero crear mi personaje', 'Personaliza tu experiencia antes de comenzar.', '/nna/personalizacion')}${menuCard('No, quiero entrar', 'Ve directamente al menú de actividades.', '/nna/menu')}</div></section>`, 'nna-shell');
  }

  function personalization() {
    const saved = Store.get('nnaProfile');
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
            ${[['body','Forma'],['color','Color'],['eyes','Ojos'],['expression','Expresión'],['accessory','Accesorios']].map(([key,label],i) => `<button class="avatar-tab" type="button" role="tab" aria-selected="${i === 0}" data-avatar-category="${key}">${label}</button>`).join('')}
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
    const symbols = { body: {round:'●',oval:'⬭',square:'▢',blob:'◆'}, eyes: {round:'● ●',small:'· ·',sparkle:'✦ ✦',wink:'● ⌒'}, expression: {happy:'⌣',calm:'—',curious:'⌁',surprised:'○'}, accessory: {none:'—',chef:'♨',glasses:'◉',sunglasses:'▰',headphones:'◖◗',cap:'⌒',crown:'♛',bow:'⋈',sportband:'═'} };
    return symbols[category]?.[value] || '●';
  }

  function avatarMarkup(state) {
    const bodyShapes = { round: '<circle cx="150" cy="154" r="88"/>', oval: '<ellipse cx="150" cy="154" rx="76" ry="101"/>', square: '<rect x="65" y="67" width="170" height="174" rx="38"/>', blob: '<path d="M150 60c49 0 91 34 91 83 0 30-12 42-19 67-9 31-36 47-72 47-46 0-88-20-88-69 0-24-9-35 2-65 13-38 49-63 86-63Z"/>' };
    const eyes = { round: '<circle cx="118" cy="139" r="14"/><circle cx="182" cy="139" r="14"/><circle class="eye-glint" cx="113" cy="134" r="4"/><circle class="eye-glint" cx="177" cy="134" r="4"/>', small: '<circle cx="120" cy="142" r="6"/><circle cx="180" cy="142" r="6"/>', sparkle: '<path d="m118 124 5 11 11 5-11 5-5 11-5-11-11-5 11-5Zm64 0 5 11 11 5-11 5-5 11-5-11-11-5 11-5Z"/>', wink: '<circle cx="119" cy="140" r="11"/><path d="M169 143q12-15 24 0" fill="none" stroke-width="8" stroke-linecap="round"/>' };
    const mouths = { happy: '<path d="M126 174q24 25 48 0"/>', calm: '<path d="M130 181h40"/>', curious: '<path d="M128 180q15-14 29 0t21 0"/>', surprised: '<circle cx="150" cy="180" r="12"/>' };
    const accessories = {
      none: '',
      chef: '<path d="M97 91q-20-26 6-40 12-25 37-10 24-22 43 1 28-7 31 20 19 17-4 34Z"/><rect x="99" y="86" width="112" height="25" rx="8"/>',
      glasses: '<g class="outline-only"><circle cx="118" cy="140" r="24"/><circle cx="182" cy="140" r="24"/><path d="M142 140h16"/></g>',
      sunglasses: '<g><rect x="91" y="121" width="52" height="34" rx="12"/><rect x="157" y="121" width="52" height="34" rx="12"/><path d="M143 135h14"/></g>',
      headphones: '<g class="outline-only"><path d="M81 144q0-75 69-75t69 75"/><rect x="69" y="132" width="27" height="58" rx="12"/><rect x="204" y="132" width="27" height="58" rx="12"/></g>',
      cap: '<path d="M83 105q17-57 82-45 39 7 52 45Z"/><path d="M168 102q54-2 65 16-43 8-72-2Z"/>',
      crown: '<path d="m96 101 6-54 34 29 18-42 22 41 31-31 2 57Z"/>',
      bow: '<path d="M217 109q34-23 35 12-2 34-35 12l-12-12Zm-12 12-12-12q-34-23-35 12 2 34 35 12Z"/>',
      sportband: '<path class="outline-only" d="M82 111q68-38 136 0"/><path d="M83 102q67-31 134 0l-5 19q-62-26-124 0Z"/>'
    };
    return `<svg class="avatar-svg color-${state.color}" viewBox="0 0 300 330" aria-hidden="true"><g class="avatar-limbs"><path d="M82 187Q38 196 37 235M218 187q44 9 45 48M111 235l-12 67M189 235l12 67"/><circle cx="36" cy="240" r="8"/><circle cx="264" cy="240" r="8"/><path d="M83 307h31M186 307h31"/></g><g class="avatar-body body-${state.body}">${bodyShapes[state.body]}</g><g class="avatar-eyes eyes-${state.eyes}">${eyes[state.eyes]}</g><g class="avatar-mouth expression-${state.expression}">${mouths[state.expression]}</g><g class="avatar-accessory accessory-${state.accessory}">${accessories[state.accessory]}</g></svg>`;
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
    const profile = Store.get('nnaProfile');
    render(`${head('Menú NNA', `¿Qué quieres hacer${profile?.name ? `, ${esc(profile.name)}` : ''}?`, 'Elige una actividad. Tú decides por dónde comenzar.')}
      <section class="section compact"><div class="container grid">${menuCard('Recursos', 'Explicaciones breves y visuales.', '/nna/recursos')}${menuCard('Juegos', 'Practica con situaciones cotidianas.', '/nna/juegos')}${menuCard('Misiones educativas', 'Completa un reto paso a paso.', '/nna/misiones')}${menuCard('Mis logros', 'Mira lo que ya aprendiste.', '/nna/logros')}${menuCard('Compartir', 'Crea una tarjeta con tu avance.', '/nna/compartir')}</div></section>`, 'nna-shell');
  }

  function nnaSimple(kind) {
    const configs = {
      recursos: ['Recursos', '¿Qué quieres aprender?', ['Etiquetado nutrimental','Hidratación y bebidas azucaradas','Porción visual']],
      juegos: ['Juegos', '¿Qué juego quieres jugar?', ['Arma tu lunch','Elige tu bebida','Crea tu plato']],
      compartir: ['Compartir', '¿Qué quieres compartir?', ['Mi elección de bebida','Mi plato armado','Mi misión completada']]
    };
    const [eyebrow, title, items] = configs[kind];
    render(`${head(eyebrow, title)}<section class="section compact"><div class="container grid">${items.map((x,i) => menuCard(x, kind === 'compartir' ? 'Genera una vista previa para mostrar.' : 'Actividad de demostración funcional.', `action:${kind}:${i}`)).join('')}</div><div id="inline-result" class="container"></div></section>`, 'nna-shell');
  }

  function missions() {
    render(`${head('Misiones educativas', 'Entender los sellos', 'Una misión breve en tres pasos.')}
      <section class="section compact"><div class="narrow"><div class="progress"><span id="mission-progress" style="width:0"></span></div><div id="mission-step" class="card" style="margin-top:20px"><h3>Paso 1 de 3</h3><p>Observa si el producto tiene uno o más sellos frontales.</p><button class="button primary" type="button" data-mission-next="1">Ya lo observé</button></div></div></section>`, 'nna-shell');
  }

  function achievements() {
    const list = Store.get('nnaAchievements') || [];
    render(`${head('Mis logros', 'Lo que has conseguido', 'Cada logro representa una actividad completada.')}
      <section class="section compact"><div class="narrow">${list.length ? `<div class="grid two">${list.map(x => `<article class="card"><p class="eyebrow">Logro desbloqueado</p><h3>★ ${esc(x)}</h3></article>`).join('')}</div>` : '<div class="empty"><h3>Todavía no hay logros</h3><p>Completa una misión para desbloquear el primero.</p><a class="button primary" href="#/nna/misiones">Ir a misiones</a></div>'}</div></section>`, 'nna-shell');
  }

  function caregiverMenu() {
    render(`${head('Cuidadores', '¿Qué necesitas hoy?', 'Herramientas prácticas que consideran tiempo, presupuesto, disponibilidad y preferencias.')}
      <section class="section compact"><div class="container"><p class="eyebrow">Herramientas</p><div class="grid four">${menuCard('Recursos', 'Guías y materiales.', '/cuidadores/recursos')}${menuCard('Comparar', 'Observa qué cambia.', '/cuidadores/comparar')}${menuCard('Decidir', 'Aclara tu situación.', '/cuidadores/decidir')}${menuCard('Recetas', 'Ideas posibles.', '/cuidadores/recetas')}</div><p class="eyebrow" style="margin-top:38px">Temas</p><div class="grid two">${menuCard('Alimentación', 'Explora cinco subtemas.', '/cuidadores/alimentacion')}${menuCard('Actividad física y sedentarismo', 'Encuentra una actividad según tu contexto.', '/cuidadores/actividad')}</div></div></section>`);
  }

  function compare() {
    const category = 'alimentos';
    const options = ITASO_DATA.products[category].map(x => `<option value="${x.id}">${x.name}</option>`).join('');
    render(`${head('Comparar', '¿Qué quieres comparar?', 'La comparación organiza datos; la decisión sigue siendo tuya.')}
      <section class="section compact"><form id="compare-form" class="narrow"><div class="form-group"><label for="compare-category">Categoría</label><select id="compare-category" name="category"><option value="alimentos">Alimentos</option><option value="bebidas">Bebidas</option><option value="etiquetas">Etiquetas</option></select></div><div class="split"><div><label for="product-a">Selector A</label><select id="product-a" name="a">${options}</select></div><div class="versus">VS</div><div><label for="product-b">Selector B</label><select id="product-b" name="b">${options.replace('value="yogur"','value="yogur" disabled')}</select></div></div><button class="button primary" style="margin-top:24px" type="submit">Comparar</button></form><div id="compare-result" class="narrow"></div></section>`);
  }

  function decide() {
    render(`${head('Decidir', '¿Qué necesitas resolver hoy?', 'Cuéntanos la situación para ordenar criterios útiles.')}
      <section class="section compact"><form id="decide-form" class="narrow"><div class="form-group"><label for="situation">Situación</label><select id="situation" required><option value="">Elige una opción</option><option>Preparar un lunch</option><option>Organizar una comida</option><option>Hacer una compra rápida</option><option>Elegir una bebida</option></select></div><fieldset class="form-group"><legend class="form-label">¿Qué está influyendo hoy?</legend><div class="check-list">${['Poco tiempo','Presupuesto limitado','Dudas','Gustos del NNA'].map(x => `<label class="check"><input type="checkbox" name="influence" value="${x}"> ${x}</label>`).join('')}</div></fieldset><button class="button primary" type="submit">Ver orientación</button></form><div id="decision-result" class="narrow"></div></section>`);
  }

  function recipes() {
    render(`${head('Recetas', 'Ideas que se adaptan a tu día', 'Filtra por necesidad y edad. Los costos son aproximados.')}
      <section class="section compact"><div class="container"><form id="recipe-filters" class="card"><div class="grid two"><div><label for="recipe-tag">Tipo</label><select id="recipe-tag"><option value="">Todas</option>${['rápida','económica','lunch','sin refrigeración'].map(x => `<option>${x}</option>`).join('')}</select></div><div><label for="recipe-age">Edad</label><select id="recipe-age"><option value="">Todas</option><option>8–12</option><option>13–17</option></select></div></div></form><div id="recipe-list" class="grid" style="margin-top:18px"></div></div></section>`);
    drawRecipes();
  }

  function drawRecipes() {
    const tag = document.querySelector('#recipe-tag')?.value || '';
    const age = document.querySelector('#recipe-age')?.value || '';
    const items = ITASO_DATA.recipes.filter(r => (!tag || r.tags.includes(tag)) && (!age || r.ages.includes(age)));
    const target = document.querySelector('#recipe-list'); if (!target) return;
    target.innerHTML = items.length ? items.map(r => `<article class="card"><p class="eyebrow">${r.time} min · ${r.cost}</p><h3>${r.name}</h3><p>${r.difficulty}</p>${r.tags.map(t => `<span class="tag">${t}</span>`).join('')}<div class="button-row"><a class="button" href="#/cuidadores/recetas/${r.id}">Ver receta</a></div></article>`).join('') : '<div class="empty">No hay recetas con esos dos filtros.</div>';
  }

  function recipeDetail(id) {
    const r = ITASO_DATA.recipes.find(x => x.id === id); if (!r) return Router.go('/cuidadores/recetas');
    const saved = (Store.get('savedRecipes') || []).includes(id);
    render(`${head('Detalle de receta', r.name, `${r.time} minutos · ${r.difficulty} · ${r.portions} porción(es)`)}<section class="section compact"><div class="narrow grid two"><article class="card"><h2>Ingredientes</h2><ul>${r.ingredients.map(x => `<li>${x}</li>`).join('')}</ul></article><article class="card"><h2>Pasos</h2><ol>${r.steps.map(x => `<li>${x}</li>`).join('')}</ol></article></div><div class="narrow button-row"><button class="button primary" type="button" data-save-recipe="${id}">${saved ? 'Quitar de guardadas' : 'Guardar receta'}</button><a class="button" href="#/cuidadores/recetas">Ver otras recetas</a></div></section>`);
  }

  function nutrition() {
    render(`${head('Alimentación', '¿Qué quieres entender?', 'Elige un tema para ver una explicación breve y un ejemplo cotidiano.')}<section class="section compact"><div class="container grid">${Object.entries({porciones:'Porciones',grupos:'Grupos de alimentos',etiquetado:'Etiquetado nutrimental',hidratacion:'Hidratación y bebidas azucaradas',hambre:'Hambre y saciedad'}).map(([id,x]) => menuCard(x,'Abrir explicación.',`topic:${id}`)).join('')}</div><div id="inline-result" class="narrow"></div></section>`);
  }

  function activity() {
    render(`${head('Actividad física', 'Encuentra una actividad posible', 'Elige dónde estás y el tiempo disponible.')}
      <section class="section compact"><form id="activity-form" class="narrow"><div class="form-group"><label for="activity-place">¿Dónde?</label><select id="activity-place" required><option value="">Elige</option><option>Casa</option><option>Parque</option><option>Poco espacio</option></select></div><div class="form-group"><label for="activity-time">¿Cuánto tiempo?</label><select id="activity-time" required><option value="">Elige</option><option value="5">5 min</option><option value="10">10 min</option><option value="20">20 min</option></select></div><button class="button primary" type="submit">Ver actividad</button></form><div id="activity-result" class="narrow"></div></section>`);
  }

  function resourcePage() {
    render(`${head('Recursos', 'Materiales para consultar y compartir', 'En esta etapa se muestran placeholders de los contenidos científicos.')}
      <section class="section compact"><div class="container grid">${['Guía de porciones','Cómo leer etiquetas','Ideas para conversar en familia'].map(x => `<article class="card"><span class="placeholder mini">[DESCARGABLE]</span><h3>${x}</h3><button class="button" type="button" data-demo-download="${x}">Descargar guía</button></article>`).join('')}</div></section>`);
  }

  Router.register('/inicio', landing);
  Router.register('/nna', nnaEntry); Router.register('/nna/personalizacion', personalization); Router.register('/nna/menu', nnaMenu);
  Router.register('/nna/recursos', () => nnaSimple('recursos')); Router.register('/nna/juegos', () => nnaSimple('juegos')); Router.register('/nna/misiones', missions); Router.register('/nna/logros', achievements); Router.register('/nna/compartir', () => nnaSimple('compartir'));
  Router.register('/cuidadores', caregiverMenu); Router.register('/cuidadores/recursos', resourcePage); Router.register('/cuidadores/comparar', compare); Router.register('/cuidadores/decidir', decide); Router.register('/cuidadores/recetas', recipes); Router.register('/cuidadores/recetas/:id', ({id}) => recipeDetail(id)); Router.register('/cuidadores/alimentacion', nutrition); Router.register('/cuidadores/actividad', activity);

  document.addEventListener('click', event => {
    const route = event.target.closest('[data-route]')?.dataset.route;
    if (route) {
      tone('click');
      if (route.startsWith('action:')) {
        const [, kind, index] = route.split(':');
        const texts = kind === 'compartir' ? ['Vista previa de tarjeta generada. Puedes mostrarla o guardarla.','Tarjeta creada con tu avance.','¡Tu misión está lista para compartir!'] : ['Observa, elige y compara. No hay una única respuesta correcta.','Actividad iniciada. Elige la opción que se parezca más a tu día.','Aprendizaje breve: fíjate en la porción antes de comparar.'];
        document.querySelector('#inline-result').innerHTML = `<div class="result"><h3>${texts[index]}</h3><p>Este módulo demuestra el recorrido; el contenido final se añadirá en otra etapa.</p><a class="button" href="#/nna/menu">Volver al menú NNA</a></div>`;
      } else if (route.startsWith('topic:')) {
        const id = route.split(':')[1]; const items = ITASO_DATA.nutritionTopics[id];
        document.querySelector('#inline-result').innerHTML = `<div class="result"><h3>Explicación</h3><ul>${items.map(x => `<li>${x}</li>`).join('')}</ul><p><strong>Ejemplo cotidiano:</strong> observa dos opciones que ya tienes disponibles y compáralas usando el mismo criterio.</p><div class="button-row"><a class="button" href="#/cuidadores/comparar">Ir a comparar</a><a class="button" href="#/cuidadores/decidir">Ir a decidir</a></div></div>`;
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
    const download = event.target.closest('[data-demo-download]')?.dataset.demoDownload;
    if (download) toast('Descarga simulada', `${download} estará disponible cuando se agregue el contenido final.`, 'click');
  });

  document.addEventListener('change', event => {
    if (event.target.id === 'compare-category') {
      const options = ITASO_DATA.products[event.target.value].map(x => `<option value="${x.id}">${x.name}</option>`).join('');
      document.querySelector('#product-a').innerHTML = options; document.querySelector('#product-b').innerHTML = options;
    }
    if (event.target.matches('#recipe-tag, #recipe-age')) drawRecipes();
  });

  document.addEventListener('input', event => {
    if (event.target.id === 'character-name') refreshCreateButton();
  });

  document.addEventListener('submit', event => {
    event.preventDefault();
    if (event.target.id === 'profile-form') {
      const ageGroup = event.target.querySelector('[data-profile-age][aria-pressed="true"]')?.dataset.profileAge;
      const profile = { name: event.target.name.value.trim(), ageGroup, avatar: { ...avatarState } };
      if (!profile.name || !profile.ageGroup || !profile.avatar.body) return toast('Falta una elección', 'Escribe un nombre y elige un rango de edad.', 'click');
      Store.set('nnaProfile', profile); Store.set('nnaProfileCreated', true); toast('¡Personaje creado!', 'Te llevamos al menú NNA.', 'success'); setTimeout(() => Router.go('/nna/menu'), 700);
    }
    if (event.target.id === 'compare-form') showComparison(event.target);
    if (event.target.id === 'decide-form') showDecision(event.target);
    if (event.target.id === 'activity-form') showActivity(event.target);
  });

  function showComparison(form) {
    const items = ITASO_DATA.products[form.category.value]; const a = items.find(x => x.id === form.a.value); const b = items.find(x => x.id === form.b.value);
    if (a.id === b.id) return toast('Elige dos opciones distintas', 'Así podrás observar qué cambia.', 'click');
    const rows = [['Porción','portion'],['Azúcares','sugar'],['Sellos','seals'],['Ingredientes','ingredients']];
    document.querySelector('#compare-result').innerHTML = `<div class="table-wrap"><table><caption class="eyebrow">Comparación visual</caption><thead><tr><th>Criterio</th><th>${a.name}</th><th>${b.name}</th></tr></thead><tbody>${rows.map(([label,key]) => `<tr><th>${label}</th><td>${a[key]}</td><td>${b[key]}</td></tr>`).join('')}</tbody></table></div><div class="result"><p>Ahora tienes más información para elegir la opción que mejor se adapte a este momento.</p><a class="button primary" href="#/cuidadores/decidir">Ir a decidir</a></div>`; tone('click');
  }

  function showDecision(form) {
    const influences = [...form.querySelectorAll('[name="influence"]:checked')].map(x => x.value);
    if (!form.querySelector('#situation').value) return toast('Elige una situación', 'Así podremos contextualizar la orientación.', 'click');
    document.querySelector('#decision-result').innerHTML = `<div class="result"><p class="eyebrow">Criterios que puedes considerar</p><h3>${esc(form.querySelector('#situation').value)}</h3><ul><li><strong>Tiempo:</strong> elige una preparación que quepa en el tiempo disponible.</li><li><strong>Presupuesto:</strong> compara costo por porción, no solo el precio del paquete.</li><li><strong>Disponibilidad:</strong> empieza por lo que ya tienes o encuentras cerca.</li><li><strong>Preferencias:</strong> ofrecer dos alternativas puede facilitar la participación del NNA.</li></ul><p>Esta podría ser una opción útil para tu situación${influences.length ? `, considerando: ${influences.join(', ').toLowerCase()}` : ''}.</p></div>`; tone('success');
  }

  function showActivity(form) {
    const place = form.querySelector('#activity-place').value; const minutes = form.querySelector('#activity-time').value;
    if (!place || !minutes) return toast('Completa las dos elecciones', 'Necesitamos lugar y tiempo.', 'click');
    const activity = place === 'Parque' ? 'Caminata con cambios de ritmo' : place === 'Poco espacio' ? 'Secuencia de movilidad en el lugar' : 'Circuito con objetos de casa';
    const id = `${place}-${minutes}-${activity}`;
    document.querySelector('#activity-result').innerHTML = `<div class="result"><p class="eyebrow">Actividad sugerida</p><h3>${activity}</h3><p>Durante ${minutes} minutos, alterna movimiento suave y pausas. Ajusta el ritmo a cómo se siente tu cuerpo.</p><button class="button primary" type="button" data-save-activity="${esc(id)}">Guardar actividad</button></div>`;
    document.querySelector('[data-save-activity]').addEventListener('click', () => { const list = Store.toggleInList('savedActivities', id); toast(list.includes(id) ? 'Actividad guardada' : 'Actividad eliminada', 'Puedes consultarla después.'); }); tone('click');
  }

  function advanceMission(step) {
    const target = document.querySelector('#mission-step'); const bar = document.querySelector('#mission-progress');
    if (step === 1) { bar.style.width = '34%'; target.innerHTML = '<h3>Paso 2 de 3</h3><p>Revisa el tamaño de la porción usada para mostrar los datos.</p><button class="button primary" type="button" data-mission-next="2">Ya lo revisé</button>'; }
    if (step === 2) { bar.style.width = '67%'; target.innerHTML = '<h3>Paso 3 de 3</h3><p>Compara dos productos usando la misma cantidad.</p><button class="button primary" type="button" data-mission-next="3">Completar misión</button>'; }
    if (step === 3) { bar.style.width = '100%'; const achievements = Store.get('nnaAchievements') || []; if (!achievements.includes('Explorador de etiquetas')) Store.set('nnaAchievements', [...achievements, 'Explorador de etiquetas']); target.innerHTML = '<p class="eyebrow">¡Misión completada!</p><h3>✓ Ya tienes un criterio para comparar</h3><p>Primero iguala la porción; después observa azúcares, sellos e ingredientes.</p><a class="button primary" href="#/nna/logros">Ver mi logro</a>'; toast('Nuevo logro desbloqueado', 'Explorador de etiquetas', 'achievement'); }
    tone(step === 3 ? 'success' : 'click');
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
