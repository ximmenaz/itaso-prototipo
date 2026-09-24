(function () {
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const priorities = ['Poco tiempo', 'Cuidar el gasto', 'Aprovechar lo que hay en casa', 'Gustos distintos en la familia'];
  const foods = ['Frijoles', 'Lentejas', 'Arroz', 'Tortillas', 'Huevo', 'Verduras de temporada'];
  const closing = 'Ahora tienes más claridad para elegir lo que mejor se adapte a este momento. Y la próxima vez, ya sabrás qué vale la pena revisar.';
  let state;
  const radio = (name, values, selected) => values.map((value, i) => `<label class="check decision-choice"><input type="radio" name="${name}" value="${escape(value)}" ${value === selected ? 'checked' : ''} ${i === 0 ? 'required' : ''}>${escape(value)}</label>`).join('');
  const button = (label, action) => `<button type="button" class="button" data-decision="${action}">${label}</button>`;
  function showStep(step) {
    state.step = step;
    const area = document.querySelector('#decision-work');
    let body = '';
    if (step === 1) body = `<h2>¿Qué necesitas hacer hoy?</h2><div class="check-list">${radio('purpose', ['Organizar una comida','Elegir una bebida o un producto'], state.purpose)}</div>`;
    if (step === 2) body = `<h2>¿Qué influye más en tu decisión?</h2><p>Elige lo que más pesa hoy. Podrás cambiarlo después.</p><div class="check-list">${radio('priority', priorities, state.priority)}</div>`;
    if (step === 3) body = `<h2>¿Qué tienes o puedes conseguir cerca?</h2><p>Marca lo que está a tu alcance. Son ejemplos, no ingredientes obligatorios; también puedes continuar sin seleccionar ninguno.</p><div class="decision-foods">${foods.map(food => `<label class="check decision-choice"><input type="checkbox" name="foods" value="${food}" ${state.foods.includes(food) ? 'checked' : ''}>${food}</label>`).join('')}</div><label class="form-label" for="decision-other">Otros alimentos o bebidas (separados por comas)</label><input type="text" id="decision-other" name="other" maxlength="180" value="${escape(state.other)}" placeholder="Por ejemplo: avena, agua, calabacitas">${state.purpose.includes('producto') ? `<fieldset class="form-group"><legend>¿Qué tipo de opciones quieres revisar?</legend>${radio('kind',['Bebidas preparadas en casa','Productos envasados'], state.kind)}</fieldset>` : ''}`;
    if (step === 4) body = productInputs();
    area.innerHTML = `<p class="eyebrow">Paso ${step} · ${escape(state.purpose || 'Tu situación')}</p><form id="decision-form">${body}<div class="button-row">${button('Atrás', 'back')}<button class="button primary" type="submit">${step >= 3 ? (step === 3 && state.purpose.includes('producto') ? 'Continuar' : 'Ver qué cambia') : 'Continuar'}</button></div></form>`;
    focusArea();
  }
  function focusArea() { const area = document.querySelector('#decision-work'); area.focus(); area.scrollIntoView({block:'start',behavior:'auto'}); }
  function productInputs() {
    const fields = [['name','Nombre del producto'],['portion','Porción indicada en la etiqueta'],['ingredients','Ingredientes'],['sugar','Azúcar (cantidad y unidad)'],['seals','Sellos que aparecen']];
    return `<h2>Revisa las dos etiquetas</h2><p>Transcribe lo que puedas leer. Si falta un dato, déjalo vacío: no lo interpretaremos como cero. Estos datos describen el envase, no una porción recomendada para NNA.</p><div class="grid two">${[0,1].map(i => `<fieldset class="card"><legend>Opción ${i+1}</legend>${fields.map(([key,label]) => `<div class="form-group"><label for="product-${i}-${key}">${label}${key === 'name' ? ' (obligatorio)' : ''}</label><input type="text" id="product-${i}-${key}" name="p${i}-${key}" maxlength="160" ${key === 'name' ? 'required pattern=".*\\S.*"' : ''} value="${escape(state.products[i][key] || '')}"></div>`).join('')}</fieldset>`).join('')}</div>`;
  }
  function available() { return [...state.foods, ...state.other.split(',').map(s=>s.trim()).filter(Boolean)]; }
  function results() {
    const items = available();
    const ingredients = items.length ? items.join(', ') : 'Aún no indicaste alimentos disponibles';
    const hints = {
      'Poco tiempo':'Revisa qué ya está cocido o listo para usar: el tiempo cambia según ese punto de partida.',
      'Cuidar el gasto':'Distingue lo que ya tienes de lo que tendrías que comprar. Para calcular costo por porción faltan precios locales, cantidades usadas y rendimiento.',
      'Aprovechar lo que hay en casa':'Empieza por lo disponible. Antes de sumar una compra, piensa qué puede combinarse o sustituirse.',
      'Gustos distintos en la familia':'Puedes servir componentes por separado para que cada persona combine lo que prefiera.'
    };
    let titles, rows;
    if (state.purpose.includes('comida')) {
      const base = items[0] || 'un alimento disponible';
      titles = [`Combinar ${base.toLowerCase()} en una preparación`, 'Servir los componentes por separado'];
      rows = [
        ['Tiempo', 'Si ya está cocido, combina y recalienta; si está crudo, considera el tiempo de cocción.', 'Puedes preparar cada componente por turnos; separar no siempre significa tardar menos.'],
        ['Costo por porción', 'Sin cálculo: faltan precios, cantidades y rendimiento. Usar lo disponible puede evitar una compra.', 'Sin cálculo: depende de los componentes elegidos y las compras adicionales.'],
        ['Lo que tienes a mano', ingredients, ingredients],
        ['Cómo combinar', items.length > 1 ? `Explora una preparación con ${items.slice(0,3).join(', ').toLowerCase()}. Elige cuáles tienen sentido juntos; no es necesario usar todo.` : `Usa ${base.toLowerCase()} como punto de partida y decide si necesitas algún complemento.`, items.length ? `Sirve ${items.join(', ').toLowerCase()} por separado; cada persona puede armar su combinación.` : 'Primero revisa qué está disponible y qué necesita preparación.'],
        ['Qué cambia para tu familia', 'La mezcla queda definida al cocinar; conversa antes sobre ingredientes y gustos.', 'Cada quien puede elegir combinaciones; puede requerir más recipientes y preparación separada.']
      ];
    } else if (state.kind === 'Productos envasados') {
      titles = state.products.map(p=>p.name);
      rows = [['Porción de la etiqueta','portion'],['Ingredientes','ingredients'],['Azúcar declarada','sugar'],['Sellos declarados','seals']].map(([label,key])=>[label,...state.products.map(p=>p[key] || 'Falta revisar este dato en el envase')]);
      rows.push(['Costo por porción','No disponible: faltan precio, contenido y rendimiento.','No disponible: faltan precio, contenido y rendimiento.']);
      rows.push(['Disponibilidad', 'Confirma si lo tienes o lo consigues cerca.', 'Confirma si lo tienes o lo consigues cerca.']);
    } else {
      titles = ['Agua simple, si está disponible', 'Preparar una bebida con lo que tienes'];
      rows = [['Tiempo','Servir, si ya cuentas con agua apta para beber.','Depende de lavar, preparar, mezclar o enfriar lo que elijas.'],['Costo por porción','Falta conocer el costo del agua y la cantidad usada.','Faltan precios y cantidades de los ingredientes.'],['Disponibilidad',items.some(x=>/agua/i.test(x)) ? 'Indicaste agua entre tus opciones.' : 'No indicaste agua; confirma su disponibilidad.',ingredients],['Qué revisar','Disponibilidad y preferencias de quienes van a beberla.','Decide qué ingredientes sí sirven para una bebida y si añadirás azúcar. No hay datos para calcular su cantidad.']];
    }
    state.step = 5;
    document.querySelector('#decision-work').innerHTML = `<h2>Qué cambia entre tus opciones</h2><p><strong>Hoy quieres:</strong> ${escape(state.purpose)} · ${escape(state.priority)}</p><div class="result"><p>${escape(hints[state.priority])}</p></div>${state.kind === 'Productos envasados' && state.purpose.includes('producto') ? '<p>Datos transcritos por ti. Antes de comparar azúcar, revisa que ambas etiquetas usen la misma cantidad y unidad. Si difieren, los números no son directamente comparables. Los sellos aportan información, pero no deciden por ti.</p>' : ''}<div class="table-wrap decision-table" tabindex="0" role="region" aria-label="Comparación de opciones, desplaza horizontalmente si es necesario"><table><caption>Dos alternativas para tu situación</caption><thead><tr><th scope="col">Criterio</th>${titles.map(t=>`<th scope="col">${escape(t)}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr><th scope="row">${escape(row[0])}</th><td>${escape(row[1])}</td><td>${escape(row[2])}</td></tr>`).join('')}</tbody></table></div><fieldset class="form-group"><legend>¿Cuál te resulta más útil hoy?</legend>${radio('decision-choice',titles,'')}</fieldset><p id="decision-feedback" role="status"></p><p class="lead">${closing}</p><div class="button-row">${button('Ajustar mis respuestas','edit')}${button('Empezar otra decisión','restart')}<a class="button" href="#/cuidadores/recursos">Recursos y guías</a></div>`;
    focusArea();
  }
  window.decisionExperience = function (render, head) {
    state = {step:0,purpose:'',priority:'',foods:[],other:'',kind:'Bebidas preparadas en casa',products:[{},{}]};
    render(`${head('Cuidadores','Decide con lo que tienes','No necesitas una comida perfecta. Empecemos por lo que quieres resolver hoy.')}<section class="section compact"><div class="container decision-surface" id="decision-work" tabindex="-1">${button('Ver mis opciones','start')}</div></section>`);
  };
  document.addEventListener('click', event => {
    const action = event.target.closest('[data-decision]')?.dataset.decision;
    if (!action) return;
    if (action === 'start' || action === 'restart') { if (action === 'restart') state = {step:0,purpose:'',priority:'',foods:[],other:'',kind:'Bebidas preparadas en casa',products:[{},{}]}; showStep(1); }
    if (action === 'back') { saveForm(); if (state.step === 1) { state.step = 0; document.querySelector('#decision-work').innerHTML = button('Ver mis opciones','start'); focusArea(); } else showStep(state.step-1); }
    if (action === 'edit') showStep(1);
  });
  function saveForm() {
    const form = document.querySelector('#decision-form'); if (!form) return;
    const data = new FormData(form);
    if (state.step === 1) state.purpose = data.get('purpose') || '';
    if (state.step === 2) state.priority = data.get('priority') || '';
    if (state.step === 3) { state.foods=data.getAll('foods'); state.other=data.get('other') || ''; state.kind=data.get('kind') || 'Bebidas preparadas en casa'; }
    if (state.step === 4) state.products = [0,1].map(i=>Object.fromEntries(['name','portion','ingredients','sugar','seals'].map(k=>[k,String(data.get(`p${i}-${k}`)||'').trim()])));
  }
  document.addEventListener('submit', event => {
    if (event.target.id !== 'decision-form') return;
    event.preventDefault(); saveForm();
    if (state.step < 3) showStep(state.step+1);
    else if (state.step === 3 && state.purpose.includes('producto') && state.kind === 'Productos envasados') showStep(4);
    else results();
  });
  document.addEventListener('change', event => {
    if (event.target.name === 'decision-choice') document.querySelector('#decision-feedback').textContent = `Elegiste: ${event.target.value}. Puedes ajustar las respuestas si cambia tu situación.`;
  });
})();
