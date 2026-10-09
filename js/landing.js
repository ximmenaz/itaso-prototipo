/* Landing only: composition based on artboard 1 of itaso_landing_editable2.ai. */
(function () {
  const paths = {
    arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',
    search:'<circle cx="10" cy="10" r="7"/><path d="m15 15 6 6"/>',
    apple:'<path d="M5 10c-2-5 3-7 7-4 5-3 9-1 8 5-1 7-5 10-8 8-5 3-9-3-7-9Zm7-4c0-4 2-5 5-5"/>',
    brain:'<path d="M12 5c-3-5-9-1-8 4-4 3-2 8 1 8 0 5 7 6 7 2V5Zm0 0c3-5 9-1 8 4 4 3 2 8-1 8 0 5-7 6-7 2M6 9l3 2m-3 5 3-2m9-5-3 2m3 5-3-2"/>',
    book:'<path d="M12 5C8 2 4 3 2 4v16c4-1 7 0 10 2 3-2 6-3 10-2V4c-4-1-7-2-10 1Zm0 0v17"/>',
    leaf:'<path d="M12 22V9m0 5C3 14 3 3 3 3s10-1 9 11Zm0 4c0-8 10-10 10-10s0 10-10 10Z"/>',
    target:'<circle cx="11" cy="13" r="10"/><circle cx="11" cy="13" r="6"/><circle cx="11" cy="13" r="1"/><path d="m11 13 11-11m-4 0h4V0"/>',
    file:'<path d="M5 1h9l6 6v16H5V1Zm9 0v6h6M8 12h9m-9 5h9"/>'
  };
  const icon = name => `<svg class="lp-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`;
  const wave = (kind) => kind === 'yellow' ? `<svg class="lp-wave lp-wave--yellow" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0h1440v43c-80-68-130-24-210-6-142 40-235 20-340-20-145-55-196 20-300 29C425 84 334 7 215 3 115-9 54 8 0 33Z"/></svg>` : `<svg class="lp-wave lp-wave--${kind}" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true"><path d="M0 28C220-16 378 70 606 38c250-37 432 37 630-9 95-23 159-16 204 1v70H0Z"/></svg>`;
  const teamCard = (name,description,image,kind,cta,modal) => `<article class="lp-card lp-card--open" role="button" tabindex="0" aria-label="${name} · ${cta}" data-landing-modal="${modal}"><img class="lp-card-photo" src="assets/identity/itaso_landing_editable-${image}.png" alt="" loading="lazy"><div class="lp-card-content lp-tone-${kind}"><span class="lp-card-icon">${icon(kind)}</span><h3>${name}</h3><p>${description}</p><span class="lp-button lp-button--text" aria-hidden="true">${cta}${icon('arrow')}</span></div></article>`;
  const sourceCard = s => `<article class="lp-source-card"><h4>${s.title}</h4><p class="lp-source-inst">${s.institution}</p><p class="lp-source-use">${s.use}</p><a class="lp-source-link" href="${s.url}" target="_blank" rel="noopener noreferrer">Consultar fuente <span aria-hidden="true">↗</span></a></article>`;
  const sourceCategories = () => (window.ITASO_SOURCES || []).map(cat => `<section class="lp-source-category"><div class="lp-source-category-head"><p class="lp-eyebrow">Categoría ${cat.number}</p><h3>${cat.theme}</h3><p>${cat.description}</p></div><div class="lp-source-grid">${cat.sources.map(sourceCard).join('')}</div></section>`).join('');
  function navigation() { return `<button type="button" class="lp-menu-toggle" data-lp-menu aria-controls="lp-nav-links" aria-expanded="false">Menú <span aria-hidden="true">☰</span></button><div id="lp-nav-links" class="lp-nav-links"><a href="#quienes" data-lp-scroll="quienes">Quiénes somos</a><a href="#equipo" data-lp-scroll="equipo">Equipo</a><a href="#mision" data-lp-scroll="mision">Misión y visión</a><a href="#fuentes" data-lp-scroll="fuentes">Fuentes</a><button class="lp-search-toggle" type="button" data-lp-search aria-label="Buscar en esta página">${icon('search')}</button><a class="lp-button lp-button--primary" href="#quienes" data-lp-scroll="quienes">Conócenos</a></div>`; }
  function markup() { return `
    <section class="lp-hero lp-container" aria-labelledby="lp-title"><div class="lp-hero-copy"><p class="lp-eyebrow">Instituto de Trastornos y Alimentación Saludable</p><h1 id="lp-title">Claridad para<br>decidir desde<br>tu realidad.</h1><p class="lp-lead">Información basada en evidencia y herramientas prácticas para acompañar decisiones cotidianas sobre alimentación, movimiento y bienestar.</p><div class="lp-actions"><a class="lp-button lp-button--primary" href="#/cuidadores">Explorar herramientas para cuidadores ${icon('arrow')}</a><a class="lp-button lp-button--secondary" href="#quienes" data-lp-scroll="quienes">Conócenos</a></div></div><div class="lp-hero-media"><img src="assets/identity/itaso_landing_editable-1.png" alt="Una madre abraza a su hija" fetchpriority="high" width="526" height="521"></div></section>
    <div class="lp-blue-band" aria-hidden="true"><svg class="lp-wave lp-wave--ribbon" viewBox="0 0 1440 116" preserveAspectRatio="none"><path d="M0 15C220-29 378 58 606 26c250-37 432 37 630-9 95-23 159-16 204 1v88c-50-24-112-24-204-1-198 46-380-28-630 9C378 146 220 59 0 103Z"/></svg></div>
    <section id="quienes" class="lp-about"><div><p class="lp-eyebrow">Quiénes somos</p><h2>Ciencia que se puede<br>usar en la vida real</h2></div><p>ITASO-MX transforma evidencia científica en criterios claros para que niñas, niños, adolescentes y sus cuidadores puedan comparar alternativas y tomar decisiones posibles, sin juicios ni respuestas únicas.</p></section>
    <section id="equipo" class="lp-team">${wave('orange')}<div class="lp-team-surface"><p class="lp-eyebrow">Equipo</p><h2>Una mirada integral</h2><div class="lp-team-grid">${teamCard('Nutrición','Información basada en evidencia para comprender y comparar situaciones cotidianas relacionadas con la alimentación.',2,'apple','Consultar fuentes','nutrition')}${teamCard('Psicología','Una mirada respetuosa sobre bienestar, acompañamiento y experiencias libres de estigma.',3,'brain','Conoce al equipo','team')}${teamCard('Educación','Herramientas y experiencias para comprender, explorar y aplicar información basada en evidencia.',4,'book','Conoce cómo aprendemos','education')}</div></div>${wave('orange-bottom')}</section>
    <section id="mision" class="lp-purpose lp-container"><article class="lp-purpose-card"><span class="lp-purpose-icon">${icon('leaf')}</span><div><p class="lp-eyebrow">Misión</p><h2>Acompañar</h2><p>Convertir información compleja en decisiones comprensibles y aplicables.</p></div></article><article class="lp-purpose-card lp-purpose-card--vision"><span class="lp-purpose-icon">${icon('target')}</span><div><p class="lp-eyebrow">Visión</p><h2>Bienestar posible</h2><p>Entornos donde el cuidado se construya con autonomía, criterio y empatía.</p></div></article></section>
    <section id="fuentes" class="lp-sources">${wave('yellow')}<div class="lp-container lp-sources-content"><div class="lp-sources-head"><p class="lp-eyebrow">Fuentes</p><h2>Transparencia científica</h2><p>Organizamos las fuentes oficiales y científicas por tema<br class="lp-desktop-break"> para mostrar con claridad de dónde viene cada criterio.</p></div><div class="lp-sources-categories">${sourceCategories()}</div></div></section>
    <footer class="lp-footer lp-container"><div><a href="#/inicio" aria-label="ITASO-MX, inicio"><img src="assets/identity/logo-color.svg" alt="ITASO-MX" width="260" height="95"></a><p>© ITASO-MX — prototipo</p></div><nav aria-label="Información legal"><button type="button" data-lp-info="privacy">Privacidad</button><button type="button" data-lp-info="terms">Términos</button><a href="mailto:contacto@itaso.mx">Contacto</a></nav></footer>
    <dialog id="lp-dialog" class="lp-dialog" aria-labelledby="lp-dialog-title"><button class="lp-dialog-close" type="button" data-lp-close aria-label="Cerrar">×</button><h2 id="lp-dialog-title"></h2><div id="lp-dialog-content"></div></dialog>`; }
  const info = {
    privacy:['Privacidad','La política de privacidad está pendiente de publicación. Esta vista es un prototipo.',''],
    terms:['Términos','Los términos de uso están pendientes de publicación. Esta vista es un prototipo.','']
  };
  const LANDING_INFO = {
    nutrition: {
      accent: 'orange',
      kicker: 'Nutrición',
      title: 'Información respaldada por evidencia',
      description: 'Fuentes oficiales y científicas que respaldan los criterios y materiales de ITASO.',
      intro: 'Los contenidos de ITASO se construyen a partir de fuentes oficiales y científicas que ayudan a transformar información especializada en criterios claros para la vida cotidiana.',
      render: 'nutrition',
      sections: []
    },
    team: {
      accent: 'blue',
      kicker: 'Psicología',
      title: 'Una mirada interdisciplinaria',
      description: 'Un proyecto desarrollado desde distintas disciplinas para comprender la salud y el bienestar de niñas, niños y adolescentes.',
      intro: 'ITASO-MX es un proyecto de la Vicerrectoría de Investigación de la Universidad La Salle México desarrollado desde una perspectiva interdisciplinaria, participativa y basada en evidencia.',
      intro2: 'Distintas áreas colaboran para comprender la salud y el bienestar de niñas, niños y adolescentes desde una mirada integral.',
      render: 'team',
      cards: [
        { tag:'Área', title:'Nutrición', text:'Traduce evidencia sobre alimentación, hidratación y otros factores relacionados con la salud en información que pueda utilizarse en decisiones cotidianas.' },
        { tag:'Área', title:'Psicología', text:'Aporta una mirada respetuosa sobre comportamiento, bienestar, acompañamiento y relación con los alimentos, promoviendo experiencias libres de estigma.' },
        { tag:'Área', title:'Educación', text:'Transforma información especializada en herramientas y experiencias que facilitan comprender, explorar y aplicar lo aprendido en contextos familiares y escolares.' }
      ],
      closing: { title:'Trabajo en conjunto', text:'El valor de ITASO no está en una sola disciplina, sino en la integración de distintas perspectivas para construir recursos claros, accesibles y útiles para las familias.' }
    },
    education: {
      accent: 'green',
      kicker: 'Educación',
      title: 'De la evidencia a la vida cotidiana',
      description: 'Principios que guían la construcción de los materiales de ITASO.',
      intro: 'ITASO busca transformar evidencia científica en materiales claros, comprensibles y útiles para las personas cuidadoras y sus familias.',
      render: 'education',
      principles: [
        { title:'Información clara', text:'Los contenidos traducen conceptos especializados a un lenguaje accesible sin perder el respaldo de las fuentes que los sustentan.' },
        { title:'Aprender haciendo', text:'Las herramientas buscan que las personas puedan seleccionar, comparar, explorar, registrar o responder para comprender mejor una situación y reconocer criterios para decidir.', chips:['Seleccionar','Comparar','Explorar','Responder'] },
        { title:'Aprendizaje sin estigma', text:'ITASO promueve una comunicación participativa, respetuosa y libre de estigma, centrada en fortalecer capacidades y no en culpabilizar a las familias.' }
      ],
      closing: { title:'Para qué', text:'No se trata solamente de presentar información, sino de ayudar a que pueda ser utilizada en decisiones reales.', cta:'Explorar herramientas para cuidadores', href:'#/cuidadores' }
    }
  };
  if (window.ITASO_SOURCES_TOPICS) {
    LANDING_INFO.nutrition.sections = window.ITASO_SOURCES_TOPICS;
  }
  window.ITASO_LANDING_INFO = LANDING_INFO;
  function openInfo(title,html) { const dialog=document.querySelector('#lp-dialog'); if(!dialog) return; document.querySelector('#lp-dialog-title').textContent=title; document.querySelector('#lp-dialog-content').innerHTML=html; dialog.showModal(); }
  document.addEventListener('click',event=>{
    if (!document.querySelector('.landing-page')) return;
    const scroll=event.target.closest('[data-lp-scroll]');
    if(scroll) {event.preventDefault(); document.querySelector('#lp-dialog')?.close(); const target=document.getElementById(scroll.dataset.lpScroll); target?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'}); document.querySelector('[data-lp-menu]')?.setAttribute('aria-expanded','false');}
    const menu=event.target.closest('[data-lp-menu]'); if(menu) menu.setAttribute('aria-expanded',String(menu.getAttribute('aria-expanded')!=='true'));
    const item=event.target.closest('[data-lp-info]'); if(item) {const [title,description,link]=info[item.dataset.lpInfo];openInfo(title,`<p>${description}</p>${link}`);}
    if(event.target.closest('[data-lp-close]')) document.querySelector('#lp-dialog').close();
    if(event.target.closest('[data-lp-search]')) openInfo('Buscar en esta página','<label for="lp-query">Tema o sección</label><input id="lp-query" type="search" placeholder="Por ejemplo: equipo o fuentes"><div id="lp-search-results" role="status"></div>');
  });
  document.addEventListener('input',event=>{ if(event.target.id!=='lp-query') return; const query=event.target.value.trim().toLocaleLowerCase('es'); const sections=[['quienes','Quiénes somos · Ciencia y alimentación'],['equipo','Equipo · Nutrición, psicología y educación'],['mision','Misión y visión'],['fuentes','Fuentes científicas']]; const matches=sections.filter(([,name])=>name.toLocaleLowerCase('es').includes(query)); document.querySelector('#lp-search-results').innerHTML=matches.length?matches.map(([id,name])=>`<a href="#${id}" data-lp-scroll="${id}">${name}</a>`).join(''):'<p>No hay coincidencias. Prueba con otra palabra.</p>'; });
  window.ITASO_LANDING={markup,navigation};
})();
