/* Cuidadores enriquecido: fichas temáticas de Actividad física, Recursos y
   guías, y el generador "Encuentra una actividad posible". Reutiliza la base
   visual de la ficha de Alimentación (nutrition.css) y el modal accesible. */
(function () {
  const modal = document.querySelector('#caregiver-modal');
  const dialog = modal.querySelector('.resource-dialog');
  let lastFocus = null;

  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function focusableIn(node) {
    return [...node.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')]
      .filter(el => el.offsetParent !== null || el === document.activeElement);
  }

  function toast(title, detail = '') {
    const region = document.querySelector('#toast-region');
    if (!region) return;
    const node = document.createElement('div');
    node.className = 'toast'; node.setAttribute('role', 'status');
    node.innerHTML = `<strong>${esc(title)}</strong>${detail ? `<div>${esc(detail)}</div>` : ''}`;
    region.append(node);
    setTimeout(() => node.remove(), 3400);
  }

  function visualBlock(visual) {
    return /^\d+(\s*[+x×]\s*\d+)?$/.test(String(visual.visual).trim())
      ? `<div class="editorial-number">${esc(visual.visual)}</div>`
      : `<div class="editorial-word">${esc(visual.visual)}</div>`;
  }

  function importanteBlock(items) {
    return items.map((it, i) => {
      const paragraphs = (Array.isArray(it.d) ? it.d : [it.d]).map(p => `<p>${esc(p)}</p>`).join('');
      const list = it.list && it.list.length ? `<ul>${it.list.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : '';
      return `<article class="information-block"><span>${String(i + 1).padStart(2, '0')}</span><div><h4>${esc(it.t)}</h4>${paragraphs}${list}</div></article>`;
    }).join('');
  }

  function sourceList(sources) {
    return `<ul class="resource-source-list">${sources.map(s =>
      `<li class="resource-source-item"><span class="resource-source-institution">${esc(s.institution)}</span><a class="resource-source-link" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)}<span class="resource-source-icon" aria-hidden="true">↗</span></a></li>`).join('')}</ul>`;
  }

  function renderTopic(data) {
    const sabias = data.sabias || { visual: data.title };
    return `
      ${data.intro ? `<p class="resource-intro">${esc(data.intro)}</p>` : ''}
      <div class="resource-learning-grid">
        <aside class="resource-modal-highlight" aria-labelledby="caregiver-fact-label">
          <p class="resource-fact-label" id="caregiver-fact-label">¿Sabías que?</p>
          <div class="resource-key-visual">${visualBlock(sabias)}</div>
          ${sabias.chips && sabias.chips.length ? `<div class="resource-chips" aria-label="Temas relacionados">${sabias.chips.map(c => `<span>${esc(c)}</span>`).join('')}</div>` : ''}
          <p class="resource-fact-copy">
            <span class="resource-fact-text">${esc(sabias.text || '')}</span>
            ${sabias.close ? `<span class="resource-fact-close">${esc(sabias.close)}</span>` : ''}
          </p>
        </aside>
        <section class="resource-important" aria-labelledby="caregiver-important-label">
          <h3 id="caregiver-important-label">Lo importante</h3>
          <div class="resource-information">${importanteBlock(data.importante)}</div>
        </section>
      </div>
      <aside class="resource-remember"><span>PARA RECORDAR</span><p>${esc(data.remember)}</p></aside>
      ${data.note ? `<p class="resource-note">${esc(data.note)}</p>` : ''}
      ${data.cta ? `<div class="resource-cta"><a class="resource-cta-link" href="${esc(data.cta.href)}" data-caregiver-cta>${esc(data.cta.label)}<span class="resource-cta-arrow" aria-hidden="true">→</span></a></div>` : ''}
      <section class="resource-sources" aria-labelledby="caregiver-sources-label">
        <p class="resource-fact-label" id="caregiver-sources-label">Fuentes consultadas</p>
        ${sourceList(data.sources)}
      </section>`;
  }

  function renderGuide(g) {
    const groups = window.ITASO_SOURCES || [];
    const intro = [g.intro, g.intro2, g.intro3].filter(Boolean).map(p => `<p class="resource-intro">${esc(p)}</p>`).join('');
    const includes = g.includes && g.includes.length
      ? `<section class="cg-detail"><h3 class="cg-detail-title">Qué incluye</h3><ul class="cg-detail-list">${g.includes.map(x => `<li>${esc(x)}</li>`).join('')}</ul></section>`
      : '';
    const sections = `<section class="guide-sections"><h3 class="cg-detail-title">${esc(g.title)}</h3><div class="guide-section-list">${g.sections.map(s => `<article class="guide-section-block"><span>${esc(s.n)}</span><div><h4>${esc(s.title)}</h4><p>${esc(s.text)}</p></div></article>`).join('')}</div></section>`;
    const remember = g.closing ? `<aside class="resource-remember"><span>PARA RECORDAR</span><p>${esc(g.closing.text)}</p></aside>` : '';
    const sources = `<section class="resource-sources" aria-labelledby="caregiver-sources-label"><p class="resource-fact-label" id="caregiver-sources-label">Fuentes consultadas</p>${groups.map(gr => `<div class="guide-source-group"><p class="guide-source-theme">${esc(gr.theme)}</p>${sourceList(gr.sources)}</div>`).join('')}</section>`;
    return `${intro}${includes}${sections}${remember}${sources}`;
  }

  window.Caregiver = {
    openTopic(id) {
      const data = window.ITASO_DATA && window.ITASO_DATA.activityTopics && window.ITASO_DATA.activityTopics[id];
      if (!data) return;
      dialog.setAttribute('data-modal-accent', data.accent || 'orange');
      document.querySelector('#caregiver-modal-kicker').textContent = data.kicker || '';
      document.querySelector('#caregiver-modal-title').textContent = data.title || '';
      document.querySelector('#caregiver-modal-description').textContent = data.subtitle || '';
      document.querySelector('#caregiver-modal-body').innerHTML = renderTopic(data);
      lastFocus = document.activeElement;
      modal.hidden = false;
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('resource-modal-open');
      dialog.focus({ preventScroll: true });
    },
    openGuide() {
      const data = window.ITASO_GUIDE;
      if (!data) return;
      dialog.setAttribute('data-modal-accent', data.accent || 'orange');
      document.querySelector('#caregiver-modal-kicker').textContent = `${data.type} · ${data.time}`;
      document.querySelector('#caregiver-modal-title').textContent = data.title || '';
      document.querySelector('#caregiver-modal-description').textContent = data.subtitle || '';
      document.querySelector('#caregiver-modal-body').innerHTML = renderGuide(data);
      lastFocus = document.activeElement;
      modal.hidden = false;
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('resource-modal-open');
      dialog.focus({ preventScroll: true });
    },
    close() {
      if (modal.hidden) return;
      modal.hidden = true;
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('resource-modal-open');
      if (lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
    }
  };

  // ---------- Delegación de eventos (modales) ----------
  document.addEventListener('click', event => {
    const topic = event.target.closest('[data-caregiver-topic]');
    if (topic) { window.Caregiver.openTopic(topic.dataset.caregiverTopic); return; }
    if (event.target.closest('[data-open-guide]')) { window.Caregiver.openGuide(); return; }
    if (modal.hidden) return;
    if (event.target.closest('[data-caregiver-cta]')) { window.Caregiver.close(); return; }
    if (event.target.closest('[data-close-caregiver]') || event.target === modal) window.Caregiver.close();
  });

  document.addEventListener('keydown', event => {
    if (modal.hidden) return;
    if (event.key === 'Escape') { window.Caregiver.close(); return; }
    if (event.key === 'Tab') {
      const focusables = focusableIn(modal);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });

  // ---------- Generador "Encuentra una actividad posible" ----------
  const ACTIVITIES = [
    { name: 'Circuito suave en casa', places: ['casa'], mins: 10, goals: ['positivo', 'sedentario', 'juntos'], who: ['solo', 'nina', 'familia'], materials: 'Una pelota, un cojín o una cobija', steps: ['Camina en el lugar marcando el ritmo.', 'Alterna 30 segundos suaves y 15 rápidos.', 'Agrega un objeto que tengas para pasarlo de un lado a otro.', 'Termina con respiración lenta.'], adapt: 'Puedes hacerlo sentado si alguien prefiere empezar así.' },
    { name: 'Pausa de estiramiento', places: ['espacio', 'casa'], mins: 5, goals: ['pausa', 'sedentario'], who: ['solo', 'nina', 'familia'], materials: 'Sin materiales', steps: ['Sube y baja los hombros cinco veces.', 'Gira el cuello suavemente de un lado a otro.', 'Estira los brazos hacia arriba y hacia los lados.', 'Haz círculos con muñecas y tobillos.'], adapt: 'Ajusta el rango del movimiento según cómo se sienta el cuerpo.' },
    { name: 'Baile de tres canciones', places: ['casa'], mins: 10, goals: ['positivo', 'juntos', 'intensa'], who: ['solo', 'nina', 'familia'], materials: 'Música disponible o solo el ritmo', steps: ['Elige tres canciones o tres ritmos.', 'Baila libremente sin necesidad de coreografía.', 'Alterna ritmo rápido y lento.', 'Invita a alguien a bailar contigo.'], adapt: 'Si prefieres sin música, inventen movimientos por turnos.' },
    { name: 'Caminata con cambios de ritmo', places: ['parque'], mins: 20, goals: ['positivo', 'intensa', 'sedentario'], who: ['solo', 'nina', 'familia'], materials: 'Calzado cómodo', steps: ['Camina 5 minutos a ritmo suave.', 'Acelera el paso 2 minutos.', 'Regresa a ritmo suave.', 'Repite mientras se sienta bien.'], adapt: 'Puedes caminar hasta la tienda, la escuela o el mercado.' },
    { name: 'Juego de seguir al líder', places: ['parque', 'casa'], mins: 15, goals: ['juntos', 'intensa'], who: ['nina', 'familia'], materials: 'Espacio libre', steps: ['Una persona dirige el movimiento.', 'Las demás la imitan.', 'Cambia de líder cada 2 minutos.', 'Incluye saltos, giros y pasos laterales.'], adapt: 'Versión tranquila: pasos lentos con gestos.' },
    { name: 'Secuencia de movilidad en el lugar', places: ['espacio'], mins: 10, goals: ['pausa', 'positivo'], who: ['solo', 'nina', 'familia'], materials: 'Sin materiales', steps: ['Marcha en el lugar 1 minuto.', 'Rota los hombros hacia atrás.', 'Toca con la mano la rodilla contraria alternando.', 'Finaliza con una respiración profunda.'], adapt: 'Si hay poco espacio, hazlo junto a una silla para apoyarte.' },
    { name: 'Ronda de pasar la pelota', places: ['casa', 'parque'], mins: 10, goals: ['juntos', 'positivo'], who: ['nina', 'familia'], materials: 'Una pelota o un calcetín enrollado', steps: ['Formen un círculo.', 'Pasen la pelota de una persona a otra.', 'Digan un movimiento al recibirla.', 'Cambien de dirección de vez en cuando.'], adapt: 'Usen una pelota de papel si no tienen otra a la mano.' },
    { name: 'Carrera de relevos con cosas de casa', places: ['casa', 'parque'], mins: 15, goals: ['juntos', 'intensa'], who: ['nina', 'familia'], materials: 'Pelota, cubeta o cojín', steps: ['Definan una meta dentro del espacio.', 'Lleven un objeto hasta la meta.', 'Regresen y pasen el turno.', 'Celebren con palmadas.'], adapt: 'Para menos intensidad, caminen en lugar de correr.' },
    { name: 'Escaleras o desniveles', places: ['casa'], mins: 5, goals: ['intensa', 'positivo'], who: ['solo', 'nina'], materials: 'Escaleras o un escalón bajo, con supervisión', steps: ['Sube y baja cinco veces.', 'Descansa 1 minuto.', 'Repite hasta completar el tiempo elegido.', 'Termina caminando despacio.'], adapt: 'Sin escaleras, usa un escalón bajo y estable.' },
    { name: 'Esconder y buscar con pasos de animal', places: ['casa', 'parque'], mins: 15, goals: ['juntos', 'positivo'], who: ['nina', 'familia'], materials: 'Objetos pequeños para esconder', steps: ['Escondan tres objetos.', 'Muévanse como animales al buscarlos.', 'Cambien de animal en cada turno.', 'Agreguen más objetos si quieren seguir.'], adapt: 'Versión tranquila: caminar en lugar de correr.' },
    { name: 'Botones activos en la rutina', places: ['espacio', 'casa'], mins: 5, goals: ['pausa', 'sedentario'], who: ['solo', 'familia'], materials: 'Sin materiales', steps: ['Elige dos momentos del día.', 'Camina unos minutos al terminar cada momento.', 'Estírate antes de volver a sentarte.', 'Repite los días que puedas.'], adapt: 'Elige solo un momento si el día está muy lleno.' },
    { name: 'Bicicleta, patineta o patines', places: ['parque'], mins: 20, goals: ['intensa', 'positivo'], who: ['solo', 'nina', 'familia'], materials: 'Bicicleta, patineta o patines y casco', steps: ['Calienta pedaleando o rodando 3 minutos.', 'Rueda libremente 10 minutos.', 'Haz un pequeño reto: llegar a un punto y regresar.', 'Termina a ritmo suave.'], adapt: 'Si no hay bicicleta, puedes caminar rápido o trotar.' }
  ];

  const WHO_LABEL = { solo: 'Solo/a', nina: 'Con una niña o niño', familia: 'En familia' };
  const PLACE_LABEL = { casa: 'Casa', parque: 'Parque', espacio: 'Poco espacio' };
  const GOAL_LABEL = { positivo: 'Movernos un poco', pausa: 'Hacer una pausa', sedentario: 'Salir de la rutina sentada', juntos: 'Hacer algo juntos', intensa: 'Una actividad más intensa' };

  const activityState = { pool: [], index: 0 };

  function activityId(name, who, goal) {
    return `${name}-${who}-${goal}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }

  function pickPool(place, minutes, who, goal) {
    let pool = ACTIVITIES
      .filter(a => a.mins <= minutes && (a.places.includes(place) || a.goals.includes(goal)))
      .map(a => ({
        a,
        score: (a.places.includes(place) ? 3 : 0) + (a.goals.includes(goal) ? 4 : 0) + (a.mins === minutes ? 1 : 0)
      }))
      .sort((x, y) => y.score - x.score)
      .map(x => x.a);
    const withWho = pool.filter(a => a.who.includes(who));
    if (withWho.length) pool = withWho;
    if (!pool.length) pool = ACTIVITIES.filter(a => a.who.includes(who));
    if (!pool.length) pool = ACTIVITIES.filter(a => a.mins <= 5);
    if (!pool.length) pool = ACTIVITIES;
    const seen = new Set();
    const unique = [];
    for (const a of pool) {
      if (!seen.has(a.name)) { seen.add(a.name); unique.push(a); }
    }
    return unique;
  }

  function activityHTML(pick, minutes, place, who, goal) {
    return `<div class="result activity-result-card">
      <p class="eyebrow">Actividad sugerida</p>
      <h3>${esc(pick.name)}</h3>
      <dl class="activity-facts">
        <div><dt>Tiempo</dt><dd>${minutes} minutos</dd></div>
        <div><dt>Lugar</dt><dd>${esc(PLACE_LABEL[place] || place)}</dd></div>
        <div><dt>Con quién</dt><dd>${esc(WHO_LABEL[who] || who)}</dd></div>
        <div><dt>Qué buscas</dt><dd>${esc(GOAL_LABEL[goal] || goal)}</dd></div>
      </dl>
      <h4 class="activity-h">Qué hacer</h4>
      <ol class="activity-steps">${pick.steps.map(s => `<li>${esc(s)}</li>`).join('')}</ol>
      <p class="activity-adapt"><strong>Materiales:</strong> ${esc(pick.materials)}</p>
      <p class="activity-adapt"><strong>Puedes adaptarla:</strong> ${esc(pick.adapt)}</p>
      <div class="button-row">
        <button class="button primary" type="button" data-activity-again>Mostrar otra actividad</button>
        <button class="button" type="button" data-save-activity="${esc(activityId(pick.name, who, goal))}">Guardar idea</button>
      </div>
    </div>`;
  }

  function formValues() {
    const form = document.querySelector('#activity-form');
    return {
      place: form.querySelector('#activity-place').value,
      minutes: Number(form.querySelector('#activity-time').value),
      who: (form.querySelector('[data-activity-who][aria-pressed="true"]') || {}).dataset?.activityWho,
      goal: (form.querySelector('[data-activity-goal][aria-pressed="true"]') || {}).dataset?.activityGoal
    };
  }

  function drawActivity() {
    const { place, minutes, who, goal } = formValues();
    if (!place || !minutes || !who || !goal) {
      toast('Faltan elecciones', 'Elige lugar, tiempo, con quién y qué buscas hoy para encontrar una opción.');
      return;
    }
    activityState.pool = pickPool(place, minutes, who, goal);
    activityState.index = 0;
    const out = document.querySelector('#activity-result');
    out.innerHTML = activityHTML(activityState.pool[0], minutes, place, who, goal);
    out.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function nextActivity() {
    if (!activityState.pool.length) return;
    activityState.index = (activityState.index + 1) % activityState.pool.length;
    const { place, minutes, who, goal } = formValues();
    document.querySelector('#activity-result').innerHTML =
      activityHTML(activityState.pool[activityState.index], minutes, place, who, goal);
  }

  document.addEventListener('submit', event => {
    if (event.target.id !== 'activity-form') return;
    event.preventDefault();
    drawActivity();
  });

  document.addEventListener('click', event => {
    const again = event.target.closest('[data-activity-again]');
    if (again) { event.preventDefault(); nextActivity(); return; }
    const save = event.target.closest('[data-save-activity]');
    if (save) {
      event.preventDefault();
      const id = save.dataset.saveActivity;
      const next = window.Store.toggleInList('savedActivities', id);
      const saved = next.includes(id);
      toast(saved ? 'Idea guardada' : 'Idea quitada', saved ? 'La encontrarás en tu lista de actividades guardadas.' : 'La actividad se quitó de tus guardadas.');
    }
  });
})();