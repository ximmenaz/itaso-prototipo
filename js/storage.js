(function () {
  const defaults = {
    currentProfile: null,
    nnaAchievements: [],
    savedRecipes: [],
    savedActivities: [],
    soundEnabled: true
  };

  window.Store = {
    get(key) {
      const raw = localStorage.getItem(key);
      if (raw === null) return defaults[key];
      try { return JSON.parse(raw); } catch (_) { return raw; }
    },
    set(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
      return value;
    },
    toggleInList(key, value) {
      const list = this.get(key) || [];
      const next = list.includes(value) ? list.filter(item => item !== value) : [...list, value];
      this.set(key, next);
      return next;
    },
    reset() {
      Object.keys(defaults).forEach(key => localStorage.removeItem(key));
    }
  };
})();
