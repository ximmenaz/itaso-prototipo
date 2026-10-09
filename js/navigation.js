/* Shared responsive navigation; no routes or application state are replaced. */
(() => {
  const toggle = document.querySelector('.menu-toggle');
  const header = document.querySelector('.site-header');
  const close = () => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú');
  };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });
  document.addEventListener('click', event => {
    if (!header.contains(event.target) || event.target.closest('#global-nav a, #global-nav button')) close();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      close();
      toggle.focus();
    }
  });
  window.addEventListener('hashchange', close);
})();
