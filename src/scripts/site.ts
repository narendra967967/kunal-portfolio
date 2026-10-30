// Small interactions shared by every page. Content never depends on this script.
const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];
const root = document.documentElement;

/* ---------- light / dark (light is the default) ---------- */
const modeBtn = $('#mode');
function setMode(mode: 'light' | 'dark') {
  root.dataset.mode = mode;
  modeBtn?.setAttribute('aria-label', mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  $('meta[name="theme-color"]')?.setAttribute('content', mode === 'dark' ? '#161412' : '#F3F2E6');
  try { localStorage.setItem('kp-mode', mode); } catch { /* storage blocked */ }
  window.dispatchEvent(new CustomEvent('modechange'));
}
if (root.dataset.mode === 'dark') setMode('dark');
modeBtn?.addEventListener('click', () => setMode(root.dataset.mode === 'dark' ? 'light' : 'dark'));

/* ---------- current year (set at build, refreshed here so it rolls over without a rebuild) ---------- */
const year = String(new Date().getFullYear());
$$('[data-year]').forEach((el) => { if (el.textContent !== year) el.textContent = year; });

/* ---------- mobile menu ---------- */
const menuBtn = $('#menu'), sheet = $('#sheet');
menuBtn?.addEventListener('click', () => {
  const open = menuBtn.getAttribute('aria-expanded') !== 'true';
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  if (sheet) sheet.hidden = !open;
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menuBtn?.getAttribute('aria-expanded') === 'true') { menuBtn.click(); menuBtn.focus(); }
});

/* ---------- copy buttons ---------- */
$$<HTMLButtonElement>('[data-copy]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const label = $('span', btn);
    const say = (t: string) => { if (label) { label.textContent = t; setTimeout(() => (label.textContent = 'Copy'), 1600); } };
    try { await navigator.clipboard.writeText(btn.dataset.copy ?? ''); say('Copied'); } catch { say('Select & copy'); }
  });
});

/* ---------- filter chips (dashboard table, work index) ---------- */
$$('[data-filter-group]').forEach((group) => {
  const name = group.dataset.filterGroup!;
  const target = $(`[data-filter-target="${name}"]`);
  if (!target) return;
  const items = $$('[data-t]', target);
  const count = $(`#${name}-count`);
  $$<HTMLButtonElement>('[data-f]', group).forEach((chip) => chip.addEventListener('click', () => {
    $$('[data-f]', group).forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
    const f = chip.dataset.f!;
    let shown = 0;
    items.forEach((it) => {
      const on = f === 'all' || (it.dataset.t ?? '').split(' ').includes(f);
      it.classList.toggle('off', !on);
      if (on) shown++;
    });
    if (count) { const unit = count.dataset.unit ?? 'PROGRAM'; count.textContent = `${shown} ${unit}${shown === 1 ? '' : 'S'}`; }
    window.dispatchEvent(new CustomEvent('filtered', { detail: { items: items.filter((i) => !i.classList.contains('off')) } }));
  }));
});

/* ---------- tabs (core competencies) ---------- */
$$('[role="tablist"]').forEach((list) => {
  const tabs = $$<HTMLButtonElement>('[role="tab"]', list);
  const select = (tab: HTMLButtonElement, focus = false) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute('aria-controls') ?? '');
      if (panel) panel.hidden = !on;
    });
    if (focus) tab.focus();
    window.dispatchEvent(new CustomEvent('tabchange', { detail: { panel: tab.getAttribute('aria-controls') } }));
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(t));
    t.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      select(tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length], true);
    });
  });
});

/* ---------- motion ----------
   GSAP (~49 KB gz) loads only on the home page, after the page has finished loading, and only when the visitor
   allows motion. Inner pages stay under the 40 KB budget and show their progress lines fully drawn. */
const wantsMotion = !matchMedia('(prefers-reduced-motion: reduce)').matches && !!$('#stage');
if (wantsMotion) {
  const load = () => import('./motion').then((m) => m.initMotion());
  if (document.readyState === 'complete') load(); else addEventListener('load', load, { once: true });
} else {
  $$('[data-progress]').forEach((el) => el.style.setProperty('--p', '1'));
  $$('.stage-s').forEach((s) => s.classList.add('on'));
}
