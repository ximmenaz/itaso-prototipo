/* "Decide con lo que tienes": entrada con 10 situaciones cotidianas.
   Cada tarjeta abre una ficha breve estilo "Porciones" (nutrition.css) y
   ofrece un atajo; al final se conserva el acceso al asistente paso a paso. */
(function () {
  const modal = document.querySelector('#scenario-modal');
  const dialog = modal.querySelector('.resource-dialog');
  let lastFocus = null;

  const esc = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function focusableIn(node) {
    return [...node.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')]
      .filter(el => el.offsetParent !== null || el === document.activeElement);
  }

  function visualBlock(visual) {
    return /^\d+(\s*[+x×]\s*\d+)?$/.test(String(visual).trim())
      ? `<div class="editorial-number">${esc(visual)}</div>`
      : `<div class="editorial-word">${esc(visual)}</div>`;
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

  function scenarioCard(s) {
    return `<button class="card action-card nutrition-card nutrition-${esc(s.accent)}" type="button" data-scenario="${esc(s.id)}">
      <span class="icon-disc">${window.ITASO_UI.icon(s.icon || 'choice')}</span>
      <h3>${esc(s.title)}</h3>
      <p class="muted">${esc(s.subtitle)}</p>
      <span class="nutrition-link">Ver cómo decidir <span class="arrow" aria-hidden="true">${window.ITASO_UI.icon('arrow')}</span></span>
    </button>`;
  }

  function renderBody(s) {
    const sabias = s.sabias || { visual: s.title };
    return `
      <div class="resource-learning-grid">
        <aside class="resource-modal-highlight" aria-labelledby="scenario-fact-label">
          <p class="resource-fact-label" id="scenario-fact-label">¿Sabías que?</p>
          <div class="resource-key-visual">${visualBlock(sabias)}</div>
          <p class="resource-fact-copy">
            <span class="resource-fact-text">${esc(sabias.text || '')}</span>
            ${sabias.close ? `<span class="resource-fact-close">${esc(sabias.close)}</span>` : ''}
          </p>
        </aside>
        <section class="resource-important" aria-labelledby="scenario-important-label">
          <h3 id="scenario-important-label">Lo importante</h3>
          <div class="resource-information">${s.importante.map((it, i) => {
            const paragraphs = (Array.isArray(it.d) ? it.d : [it.d]).map(p => `<p>${esc(p)}</p>`).join('');
            return `<article class="information-block"><span>${String(i + 1).padStart(2, '0')}</span><div><h4>${esc(it.t)}</h4>${paragraphs}</div></article>`;
          }).join('')}</div>
        </section>
      </div>
      <aside class="resource-remember"><span>PARA RECORDAR</span><p>${esc(s.remember)}</p></aside>
      ${s.cta ? `<div class="resource-cta"><a class="resource-cta-link" href="${esc(s.cta.href)}" data-scenario-cta>${esc(s.cta.label)}<span class="resource-cta-arrow" aria-hidden="true">→</span></a></div>` : ''}
      <p class="scenario-back"><a href="#/cuidadores/decide-con-lo-que-tienes" data-scenario-cta>Volver a las situaciones</a></p>
      <section class="resource-sources" aria-labelledby="scenario-sources-label">
        <p class="resource-fact-label" id="scenario-sources-label">Fuente consultada</p>
        ${sourceList(s.source ? [s.source] : [])}
      </section>`;
  }

  window.Scenarios = {
    render() {
      const target = document.querySelector('#scenario-grid');
      if (!target) return;
      const list = window.ITASO_SCENARIOS || [];
      target.innerHTML = list.map(scenarioCard).join('');
    },
    open(id) {
      const s = (window.ITASO_SCENARIOS || []).find(x => x.id === id);
      if (!s) return;
      dialog.setAttribute('data-modal-accent', s.accent || 'orange');
      document.querySelector('#scenario-modal-kicker').textContent = s.kicker || '';
      document.querySelector('#scenario-modal-title').textContent = s.title || '';
      document.querySelector('#scenario-modal-description').textContent = s.subtitle || '';
      document.querySelector('#scenario-modal-body').innerHTML = renderBody(s);
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

  document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-scenario]');
    if (trigger) { window.Scenarios.open(trigger.dataset.scenario); return; }
    if (modal.hidden) return;
    if (event.target.closest('[data-scenario-cta]')) { window.Scenarios.close(); return; }
    if (event.target.closest('[data-close-scenario]') || event.target === modal) window.Scenarios.close();
  });

  document.addEventListener('keydown', event => {
    if (modal.hidden) return;
    if (event.key === 'Escape') { window.Scenarios.close(); return; }
    if (event.key === 'Tab') {
      const focusables = focusableIn(modal);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
})();
