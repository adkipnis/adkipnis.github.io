// Hover cards for outbound links. Progressive enhancement: with JS off, on
// touch/coarse pointers, or before the data loads, links behave normally. The
// metadata is prebuilt at build time (scripts/link-previews.mjs), so nothing is
// fetched from third parties at runtime — just one small same-origin JSON file.
(() => {
  // Only where hovering is the real interaction; touch users just tap through.
  if (!window.matchMedia || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const SHOW_DELAY = 280;
  const GAP = 10;
  const MARGIN = 12;

  let data = null, card = null, els = {}, current = null, timer = 0;

  const build = () => {
    card = document.createElement('div');
    card.className = 'link-card';
    card.setAttribute('role', 'tooltip');
    card.hidden = true;
    card.innerHTML =
      '<div class="link-card-head">' +
        '<img class="link-card-icon" alt="" width="16" height="16">' +
        '<span class="link-card-chip"></span>' +
        '<span class="link-card-site"></span>' +
      '</div>' +
      '<div class="link-card-title"></div>' +
      '<div class="link-card-desc"></div>';
    document.body.appendChild(card);
    els = {
      icon: card.querySelector('.link-card-icon'),
      chip: card.querySelector('.link-card-chip'),
      site: card.querySelector('.link-card-site'),
      title: card.querySelector('.link-card-title'),
      desc: card.querySelector('.link-card-desc'),
    };
    els.icon.addEventListener('error', () => { els.icon.hidden = true; els.chip.hidden = false; });
  };

  // Match an anchor to a preview by its resolved href, raw attribute, or a
  // trailing-slash variant — the same link can be written any of these ways.
  const lookup = a => {
    const href = a.getAttribute('href');
    const cands = [a.href, href, a.href.replace(/\/$/, ''), (href || '').replace(/\/$/, '')];
    for (const c of cands) if (c && data[c]) return data[c];
    return null;
  };

  const fill = d => {
    els.site.textContent = d.site || d.domain;
    els.title.textContent = d.title || '';
    els.desc.textContent = d.desc || d.description || '';
    els.desc.hidden = !els.desc.textContent;
    els.title.hidden = !els.title.textContent || els.title.textContent === els.site.textContent;
    els.chip.textContent = (d.site || d.domain || '?').trim().charAt(0).toUpperCase();
    if (d.icon) {
      els.icon.hidden = false; els.chip.hidden = true; els.icon.src = d.icon;
    } else {
      els.icon.hidden = true; els.chip.hidden = false;
    }
  };

  const place = a => {
    const r = a.getBoundingClientRect();
    card.style.maxWidth = Math.min(340, innerWidth - 2 * MARGIN) + 'px';
    card.hidden = false; // measure with real dimensions
    const w = card.offsetWidth, h = card.offsetHeight;
    let left = Math.min(Math.max(r.left, MARGIN), innerWidth - w - MARGIN);
    let top = r.bottom + GAP;
    if (top + h > innerHeight - MARGIN && r.top - GAP - h > MARGIN) top = r.top - GAP - h; // flip up
    card.style.left = Math.round(left) + 'px';
    card.style.top = Math.round(top) + 'px';
    card.classList.add('is-visible');
  };

  const hide = () => {
    clearTimeout(timer); timer = 0; current = null;
    if (card) { card.classList.remove('is-visible'); card.hidden = true; }
  };

  const enter = (a, d) => {
    clearTimeout(timer);
    current = a;
    timer = setTimeout(() => { if (current === a) { if (!card) build(); fill(d); place(a); } }, SHOW_DELAY);
  };

  const attach = () => {
    for (const a of document.querySelectorAll('a[href]')) {
      const d = lookup(a);
      if (!d) continue;
      a.addEventListener('mouseenter', () => enter(a, d));
      a.addEventListener('mouseleave', hide);
    }
    addEventListener('scroll', hide, { passive: true });
    addEventListener('resize', hide);
    addEventListener('blur', hide);
  };

  const start = async () => {
    try {
      const r = await fetch('/assets/link-previews.json');
      if (!r.ok) return;
      data = await r.json();
    } catch { return; }
    if (!data || !Object.keys(data).length) return;
    attach(); // the card element is built lazily on the first hover

  };

  if (document.readyState !== 'loading') start();
  else document.addEventListener('DOMContentLoaded', start);
})();
