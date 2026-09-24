// Apply the theme before styles paint. A manually saved preference wins;
// otherwise follow the OS setting (prefers-color-scheme). If the OS gives no
// signal (no-preference / unsupported), default to dark.
(() => {
  let saved = null;
  try { saved = localStorage.getItem('theme'); } catch {}
  const mm = q => window.matchMedia && window.matchMedia(q);
  const osTheme = () => (mm('(prefers-color-scheme: light)') || {}).matches ? 'light' : 'dark';
  let theme = saved === 'dark' || saved === 'light' ? saved : osTheme();
  document.documentElement.dataset.theme = theme;

  const syncLabelFns = [];
  const apply = t => {
    theme = t;
    document.documentElement.dataset.theme = t;
    syncLabelFns.forEach(fn => fn());
  };

  // Follow live OS changes while the user hasn't made a manual choice.
  const darkQuery = mm('(prefers-color-scheme: dark)');
  if (darkQuery) {
    const onChange = () => { if (!saved) apply(osTheme()); };
    if (darkQuery.addEventListener) darkQuery.addEventListener('change', onChange);
    else if (darkQuery.addListener) darkQuery.addListener(onChange);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.theme-toggle');
    const syncLabel = () => {
      const label = `Switch to ${document.documentElement.dataset.theme === 'dark' ? 'day' : 'night'} mode`;
      toggle.setAttribute('aria-label', label);
      toggle.title = label;
    };
    syncLabelFns.push(syncLabel);
    syncLabel();
    toggle.hidden = false;
    toggle.addEventListener('click', () => {
      saved = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('theme', saved); } catch {}
      apply(saved);
    });
  });
})();
