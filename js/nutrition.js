/* Ficha informativa reutilizable para Alimentación (cuidadores).
   Un solo modal alimentado por ITASO_DATA.nutritionResources. */
(function () {
  const modal = document.querySelector('#nutrition-modal');
  const dialog = modal.querySelector('.resource-dialog');
  let lastFocus = null;

  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function focusableIn(node) {
    return [...node.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')]
      .filter(el => el.offsetParent !== null || el === document.activeElement);
  }

  function renderVisual(sabias) {
    const value = String(sabias.visual).trim();
    const isNumber = /^\d+(\s*[+x×]\s*\d+)?$/.test(value);
    return isNumber
      ? `<div class="editorial-number">${esc(value)}</div>`
      : `<div class="editorial-word">${esc(value)}</div>`;
  }

  function renderImportante(items) {
    return items.map((it, i) => {
      const paragraphs = (Array.isArray(it.d) ? it.d : [it.d]).map(p => `<p>${esc(p)}</p>`).join('');
      const list = it.list ? `<ul>${it.list.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : '';
      const after = it.after ? `<p>${esc(it.after)}</p>` : '';
      const note = it.note ? `<p class="information-note">${esc(it.note)}</p>` : '';
      return `<article class="information-block"><span>${String(i + 1).padStart(2, '0')}</span><div><h4>${esc(it.t)}</h4>${paragraphs}${list}${after}${note}</div></article>`;
    }).join('');
  }

  function renderNutritionResource(data) {
    dialog.setAttribute('data-modal-accent', data.accent || 'orange');
    const setText = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = value == null ? '' : value; };
    setText('nutrition-modal-kicker', data.kicker || 'Alimentación');
    setText('nutrition-modal-title', data.title);
    setText('nutrition-modal-description', data.subtitle || '');

    const intro = document.getElementById('nutrition-intro');
    if (data.intro) { intro.textContent = data.intro; intro.hidden = false; } else intro.hidden = true;

    document.getElementById('nutrition-key-visual').innerHTML = renderVisual(data.sabias);
    document.getElementById('nutrition-chips').innerHTML = data.sabias.chips.map(c => `<span>${esc(c)}</span>`).join('');
    document.getElementById('nutrition-fact').innerHTML =
      `<span class="resource-fact-text">${esc(data.sabias.text)}</span>` +
      (data.sabias.close ? `<span class="resource-fact-close">${esc(data.sabias.close)}</span>` : '');

    document.getElementById('nutrition-information').innerHTML = renderImportante(data.importante);

    document.getElementById('nutrition-remember').innerHTML = `<span>PARA RECORDAR</span><p>${esc(data.remember)}</p>`;

    const note = document.getElementById('nutrition-note');
    if (data.note) { note.textContent = data.note; note.hidden = false; } else note.hidden = true;

    document.getElementById('nutrition-cta').innerHTML =
      `<a class="resource-cta-link" href="${esc(data.cta.href)}" data-nutrition-cta>${esc(data.cta.label)}<span class="resource-cta-arrow" aria-hidden="true">→</span></a>`;

    document.getElementById('nutrition-sources').innerHTML = data.sources.map(s =>
      `<li class="resource-source-item"><span class="resource-source-institution">${esc(s.institution)}</span><a class="resource-source-link" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)}<span class="resource-source-icon" aria-hidden="true">↗</span></a></li>`
    ).join('');
  }

  window.openNutritionResource = function (id) {
    const data = window.ITASO_DATA && window.ITASO_DATA.nutritionResources && window.ITASO_DATA.nutritionResources[id];
    if (!data) return;
    renderNutritionResource(data);
    lastFocus = document.activeElement;
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('resource-modal-open');
    dialog.focus({ preventScroll: true });
  };

  function closeNutritionResource() {
    if (modal.hidden) return;
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('resource-modal-open');
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
  }
  window.closeNutritionResource = closeNutritionResource;

  document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-nutrition]');
    if (trigger) { openNutritionResource(trigger.dataset.nutrition); return; }
    if (modal.hidden) return;
    if (event.target.closest('[data-nutrition-cta]')) { closeNutritionResource(); return; }
    if (event.target.closest('[data-close-nutrition]') || event.target === modal) closeNutritionResource();
  });

  document.addEventListener('keydown', event => {
    if (modal.hidden) return;
    if (event.key === 'Escape') { closeNutritionResource(); return; }
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