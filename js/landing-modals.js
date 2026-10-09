/* Modales informativos del Home (INFORMACIÓN RESPALDADA POR EVIDENCIA,
   UNA MIRADA INTERDISCIPLINARIA y DE LA EVIDENCIA A LA VIDA COTIDIANA).
   Reutiliza la misma base visual que la ficha de Alimentación (nutrition.css). */
(function () {
  const modal = document.querySelector('#landing-modal');
  const dialog = modal.querySelector('.resource-dialog');
  let lastFocus = null;

  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function focusableIn(node) {
    return [...node.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')]
      .filter(el => el.offsetParent !== null || el === document.activeElement);
  }

  function sourceItem(s) {
    return `<li class="resource-source-item"><span class="resource-source-institution">${esc(s.institution)}</span><a class="resource-source-link" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)}<span class="resource-source-icon" aria-hidden="true">↗</span></a></li>`;
  }

  const renderers = {
    nutrition(data) {
      return data.sections.map(section => `
        <section class="lm-section">
          <p class="lm-section-title">${esc(section.title)}</p>
          <p class="lm-section-text">${esc(section.text)}</p>
          <ul class="resource-source-list">${section.sources.map(sourceItem).join('')}</ul>
        </section>`).join('');
    },
    team(data) {
      return `
        <p class="lm-intro2">${esc(data.intro2)}</p>
        <div class="lm-discipline-grid">
          ${data.cards.map(card => `
            <article class="lm-discipline-card">
              <span class="lm-chip">${esc(card.tag)}</span>
              <h4>${esc(card.title)}</h4>
              <p>${esc(card.text)}</p>
            </article>`).join('')}
        </div>
        <aside class="lm-closing">
          <p class="lm-section-title">${esc(data.closing.title)}</p>
          <p class="lm-closing-text">${esc(data.closing.text)}</p>
        </aside>`;
    },
    education(data) {
      return `
        <div class="lm-principles">
          ${data.principles.map((principle, i) => `
            <article class="lm-principle">
              <span class="lm-principle-number">${String(i + 1).padStart(2, '0')}</span>
              <div>
                <h4>${esc(principle.title)}</h4>
                <p>${esc(principle.text)}</p>
                ${principle.chips ? `<div class="resource-chips lm-chips" aria-label="Acciones de aprendizaje">${principle.chips.map(c => `<span>${esc(c)}</span>`).join('')}</div>` : ''}
              </div>
            </article>`).join('')}
        </div>
        <aside class="lm-closing">
          <p class="lm-section-title">${esc(data.closing.title)}</p>
          <p class="lm-closing-text">${esc(data.closing.text)}</p>
          <a class="resource-cta-link" href="${esc(data.closing.href)}" data-landing-cta>${esc(data.closing.cta)}<span class="resource-cta-arrow" aria-hidden="true">→</span></a>
        </aside>`;
    }
  };

  window.openLandingModal = function (kind) {
    const data = window.ITASO_LANDING_INFO && window.ITASO_LANDING_INFO[kind];
    if (!data) return;
    dialog.setAttribute('data-modal-accent', data.accent || 'orange');
    document.querySelector('#landing-modal-kicker').textContent = data.kicker || '';
    document.querySelector('#landing-modal-title').textContent = data.title || '';
    document.querySelector('#landing-modal-description').textContent = data.description || '';

    const intro = document.querySelector('#landing-modal-intro');
    if (data.intro) { intro.textContent = data.intro; intro.hidden = false; } else intro.hidden = true;

    document.querySelector('#landing-modal-body').innerHTML = (renderers[data.render] || (() => ''))(data);

    lastFocus = document.activeElement;
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('resource-modal-open');
    dialog.focus({ preventScroll: true });
  };

  function closeLandingModal() {
    if (modal.hidden) return;
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('resource-modal-open');
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
  }
  window.closeLandingModal = closeLandingModal;

  document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-landing-modal]');
    if (trigger) { window.openLandingModal(trigger.dataset.landingModal); return; }
    if (modal.hidden) return;
    if (event.target.closest('[data-landing-cta]')) { closeLandingModal(); return; }
    if (event.target.closest('[data-close-landing]') || event.target === modal) closeLandingModal();
  });

  document.addEventListener('keydown', event => {
    const card = event.target.closest ? event.target.closest('[data-landing-modal]') : null;
    if (card && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      window.openLandingModal(card.dataset.landingModal);
      return;
    }
    if (modal.hidden) return;
    if (event.key === 'Escape') { closeLandingModal(); return; }
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