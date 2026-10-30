// GSAP-driven motion. Loaded after the page is complete and only when reduced motion is off.
// Every animated element is fully visible and correct before this runs.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];

function countUp(el: HTMLElement, delay = 0) {
  const end = Number(el.dataset.count), pre = el.dataset.pre ?? '', suf = el.dataset.suf ?? '';
  const o = { v: 0 };
  gsap.to(o, {
    v: end, duration: 1.4, delay, ease: 'power2.out',
    onUpdate: () => { el.textContent = `${pre}${Math.round(o.v)}${suf}`; },
    onComplete: () => { el.textContent = `${pre}${end}${suf}`; },
  });
}

function smoothScroll() {
  const fine = matchMedia('(pointer: fine) and (min-width: 1024px)').matches;
  if (!fine) return;
  const lenis = new Lenis({ duration: 1.05, anchors: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

function hero() {
  const stage = $('#stage');
  if (!stage) return;
  gsap.from($$('.float', stage), { y: 24, opacity: 0, scale: .9, duration: .7, stagger: .12, ease: 'back.out(1.6)' });
  $$('.float', stage).forEach((f, i) => gsap.to(f, { y: '+=7', duration: 2.4 + i * .4, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: .9 + i * .2 }));
  $$('[data-count]', stage).forEach((el, i) => countUp(el, .2 + i * .1));
  if (matchMedia('(hover: hover)').matches) {
    const floats = $$('.float', stage), photo = $('.photo', stage);
    stage.addEventListener('pointermove', (e) => {
      const r = stage.getBoundingClientRect(), dx = (e.clientX - r.left) / r.width - .5;
      floats.forEach((f) => gsap.to(f, { x: dx * Number(f.dataset.depth ?? 10), rotate: dx * 2, duration: .6, overwrite: 'auto' }));
      if (photo) gsap.to(photo, { x: dx * -8, duration: .8, overwrite: 'auto' });
    });
    stage.addEventListener('pointerleave', () => { gsap.to(floats, { x: 0, rotate: 0, duration: .8 }); if (photo) gsap.to(photo, { x: 0, duration: .8 }); });
  }
}

function dashboard() {
  const kpis = $('#kpis');
  if (kpis) ScrollTrigger.create({ trigger: kpis, start: 'top 88%', once: true, onEnter: () => $$('[data-count]', kpis).forEach((el, i) => countUp(el, i * .06)) });

  const impact = $('#impact');
  if (impact) ScrollTrigger.create({
    trigger: impact, start: 'top 85%', once: true,
    onEnter: () => gsap.fromTo($$('.i-track i', impact), { scaleX: 0 }, { scaleX: 1, duration: .8, stagger: .07, ease: 'power2.out' }),
  });

  addEventListener('filtered', (e) => {
    const items = (e as CustomEvent<{ items: HTMLElement[] }>).detail.items;
    gsap.from(items, { opacity: 0, x: -10, duration: .35, stagger: .05 });
  });
}

function toolkit() {
  addEventListener('tabchange', (e) => {
    const id = (e as CustomEvent<{ panel: string }>).detail.panel;
    gsap.from($$(`#${id} li`), { opacity: 0, x: -8, duration: .3, stagger: .04, ease: 'power2.out' });
  });
}

function progressLines() {
  $$('[data-progress]').forEach((el) => {
    const stages = $$('.stage-s', el);
    gsap.fromTo(el, { '--p': 0 }, {
      '--p': 1, ease: 'none',
      scrollTrigger: {
        trigger: el, start: 'top 75%', end: 'bottom 55%', scrub: .4,
        onUpdate: (self) => stages.forEach((s, i) => s.classList.toggle('on', self.progress >= i / stages.length)),
      },
    });
  });
}

function reveals() {
  gsap.utils.toArray<HTMLElement>('.report, .rel').forEach((el) => {
    gsap.from(el, { y: 26, duration: .7, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
  });
}

export function initMotion() {
  smoothScroll();
  hero();
  dashboard();
  toolkit();
  progressLines();
  reveals();
  ScrollTrigger.refresh();
}
