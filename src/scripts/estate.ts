// "Scale" canvas: an illustrative network of user traffic in 9 clusters reaching a central platform.
// Draws one still frame immediately (so the widget is complete without motion) and animates only while visible.

export function startEstate() {
  const cv = document.getElementById('net') as HTMLCanvasElement | null;
  if (!cv) return;
  const ctx = cv.getContext('2d');
  if (!ctx) return;
  const motion = !matchMedia('(prefers-reduced-motion: reduce)').matches;

  let seed = 11;
  const R = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const hubs = [[.14, .28], [.36, .16], [.62, .15], [.86, .30], [.88, .64], [.66, .82], [.38, .82], [.12, .66], [.28, .48]];
  const core = [.56, .48];
  const counts = [30, 18, 22, 14, 12, 28, 20, 25, 16];
  type Node = { h: number; dx: number; dy: number; ph: number; lit: number };
  const nodes: Node[] = [];
  counts.forEach((c, h) => {
    for (let i = 0; i < c; i++) {
      const a = R() * 6.283, r = .025 + Math.pow(R(), .7) * .08;
      nodes.push({ h, dx: Math.cos(a) * r, dy: Math.sin(a) * r, ph: R() * 6.28, lit: 0 });
    }
  });

  let C = { fg: '', dim: '', brand: '', ok: '' };
  const rgb = (v: string) => {
    let h = v.trim().replace('#', '');
    if (h.length === 3) h = h.split('').map((c) => c + c).join('');
    const n = parseInt(h, 16);
    return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
  };
  const readColors = () => {
    const cs = getComputedStyle(document.documentElement);
    C = { fg: rgb(cs.getPropertyValue('--fg')), dim: rgb(cs.getPropertyValue('--faint')), brand: rgb(cs.getPropertyValue('--brand-2')), ok: rgb(cs.getPropertyValue('--ok')) };
  };
  readColors();

  let W = 0, H = 0, dpr = 1, raf = 0, last = 0, acc = 0, flash = 0, visible = false;
  let pk: Array<{ n: number; t: number; d: number }> = [];
  const fit = () => {
    const r = cv.getBoundingClientRect();
    dpr = Math.min(devicePixelRatio || 1, 2); W = r.width; H = r.height;
    cv.width = Math.max(1, Math.round(W * dpr)); cv.height = Math.max(1, Math.round(H * dpr));
  };
  const pos = (n: Node) => { const m = Math.min(W, H), hb = hubs[n.h]; return [hb[0] * W + n.dx * m * 1.2, hb[1] * H + n.dy * m]; };

  function draw(t: number) {
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx!.clearRect(0, 0, W, H);
    const cx = core[0] * W, cy = core[1] * H;
    ctx!.lineWidth = 1;
    ctx!.strokeStyle = `rgba(${C.dim},.25)`; ctx!.beginPath();
    nodes.forEach((n) => { const [x, y] = pos(n), hb = hubs[n.h]; ctx!.moveTo(x, y); ctx!.lineTo(hb[0] * W, hb[1] * H); });
    ctx!.stroke();
    ctx!.strokeStyle = `rgba(${C.brand},.35)`; ctx!.setLineDash([3, 4]); ctx!.beginPath();
    hubs.forEach((hb) => { ctx!.moveTo(hb[0] * W, hb[1] * H); ctx!.lineTo(cx, cy); });
    ctx!.stroke(); ctx!.setLineDash([]);
    nodes.forEach((n) => {
      const [x, y] = pos(n), b = (Math.sin(t * .0011 + n.ph) + 1) / 2;
      if (n.lit > 0) { ctx!.strokeStyle = `rgba(${C.ok},${n.lit * .85})`; ctx!.beginPath(); ctx!.arc(x, y, 2 + (1 - n.lit) * 9, 0, 6.283); ctx!.stroke(); }
      ctx!.fillStyle = n.lit > .4 ? `rgb(${C.ok})` : `rgba(${C.fg},${.25 + b * .4})`;
      ctx!.beginPath(); ctx!.arc(x, y, 1.5, 0, 6.283); ctx!.fill();
    });
    ctx!.fillStyle = `rgba(${C.fg},.85)`;
    hubs.forEach((hb) => ctx!.fillRect(hb[0] * W - 3, hb[1] * H - 3, 6, 6));
    pk.forEach((p) => {
      const n = nodes[p.n], [x0, y0] = pos(n), hb = hubs[n.h], hx = hb[0] * W, hy = hb[1] * H;
      let x, y;
      if (p.t < .45) { const u = p.t / .45; x = x0 + (hx - x0) * u; y = y0 + (hy - y0) * u; }
      else { const u = (p.t - .45) / .55, e = u * u * (3 - 2 * u); x = hx + (cx - hx) * e; y = hy + (cy - hy) * e; }
      ctx!.fillStyle = `rgba(${C.brand},.2)`; ctx!.beginPath(); ctx!.arc(x, y, 5, 0, 6.283); ctx!.fill();
      ctx!.fillStyle = `rgb(${C.brand})`; ctx!.beginPath(); ctx!.arc(x, y, 2, 0, 6.283); ctx!.fill();
    });
    const pr = 10 + Math.sin(t * .003) * 1.5 + flash * 6;
    ctx!.strokeStyle = `rgba(${C.brand},${.35 + flash * .5})`; ctx!.lineWidth = 1.5;
    ctx!.beginPath(); ctx!.arc(cx, cy, pr + 8, 0, 6.283); ctx!.stroke();
    ctx!.fillStyle = `rgb(${C.brand})`; ctx!.beginPath(); ctx!.arc(cx, cy, 6, 0, 6.283); ctx!.fill();
  }

  function loop(ts: number) {
    const dt = Math.min(50, ts - (last || ts)); last = ts; acc += dt;
    const every = W < 400 ? 150 : 100;
    while (acc > every) { acc -= every; const i = Math.floor(R() * nodes.length); nodes[i].lit = 1; pk.push({ n: i, t: 0, d: 1500 + R() * 900 }); }
    pk.forEach((p) => (p.t += dt / p.d));
    const before = pk.length; pk = pk.filter((p) => p.t < 1); if (pk.length < before) flash = 1;
    flash = Math.max(0, flash - dt / 400);
    nodes.forEach((n) => { if (n.lit > 0) n.lit = Math.max(0, n.lit - dt / 900); });
    draw(ts);
    raf = visible ? requestAnimationFrame(loop) : 0;
  }

  new ResizeObserver(() => { fit(); draw(performance.now()); }).observe(cv);
  new IntersectionObserver((es) => {
    visible = es[0].isIntersecting;
    if (visible && motion && !raf) { last = 0; raf = requestAnimationFrame(loop); }
  }).observe(cv);
  addEventListener('modechange', () => { readColors(); draw(performance.now()); });
}
