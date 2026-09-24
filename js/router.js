(function () {
  const routes = new Map();
  const Router = {
    register(path, render) { routes.set(path, render); },
    go(path) { location.hash = `#${path.startsWith('/') ? path : `/${path}`}`; },
    current() { return location.hash.replace(/^#/, '') || '/inicio'; },
    resolve() {
      const path = this.current();
      const exact = routes.get(path);
      if (exact) return exact({ path });
      const recipeMatch = path.match(/^\/cuidadores\/recetas\/([^/]+)$/);
      if (recipeMatch && routes.has('/cuidadores/recetas/:id')) return routes.get('/cuidadores/recetas/:id')({ path, id: recipeMatch[1] });
      Router.go('/inicio');
    }
  };
  window.Router = Router;
  window.addEventListener('hashchange', () => Router.resolve());
})();
