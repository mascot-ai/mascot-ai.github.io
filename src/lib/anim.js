import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduce) {
  gsap.registerPlugin(ScrollTrigger);

  const st = (trigger) => ({
    trigger,
    start: 'top 88%',
    toggleActions: 'play none none none',
    once: true,
  });

  // Single elements: fade + rise on enter.
  gsap.utils.toArray('[data-anim]:not([data-anim-group] [data-anim])').forEach((el) => {
    gsap.fromTo(el, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', scrollTrigger: st(el) });
  });

  // Groups: stagger children (ui-ux-pro-max "Stagger List" spec).
  gsap.utils.toArray('[data-anim-group]').forEach((group) => {
    gsap.fromTo(
      group.querySelectorAll('[data-anim]'),
      { opacity: 0, y: 16, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: 'back.out(1.4)',
        stagger: { each: 0.06, from: 'start' },
        scrollTrigger: st(group),
      }
    );
  });

  // Count-up: <span data-count="4800" data-suffix="+">.
  gsap.utils.toArray('[data-count]').forEach((el) => {
    const end = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const obj = { v: 0 };
    gsap.to(obj, {
      v: end,
      duration: 1.4,
      ease: 'power1.out',
      scrollTrigger: st(el),
      onUpdate: () => {
        el.textContent = Math.round(obj.v).toLocaleString() + suffix;
      },
    });
  });

  // Trigger positions are measured before web fonts load; recompute once the
  // layout has settled so nothing stays stuck hidden after a fast scroll.
  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener('load', refresh);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
  setTimeout(refresh, 1500);

  // Last-resort safety net: anything still invisible but already on screen a
  // moment after load gets shown outright.
  window.addEventListener('load', () => {
    setTimeout(() => {
      gsap.utils.toArray('[data-anim]').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (getComputedStyle(el).opacity === '0' && r.top < window.innerHeight && r.bottom > 0) {
          gsap.set(el, { opacity: 1, y: 0, scale: 1 });
        }
      });
    }, 800);
  });
}

// Nav solidifies after the hero.
const nav = document.querySelector('[data-nav]');
if (nav) {
  const onScroll = () => nav.toggleAttribute('data-scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// Mobile nav toggle.
const navToggle = document.querySelector('[data-nav-toggle]');
const navPanel = document.querySelector('[data-nav-panel]');
if (navToggle && navPanel) {
  navToggle.addEventListener('click', () => {
    const open = navPanel.toggleAttribute('data-open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
}

// Theme toggle. Mirrors the pre-render script in BaseLayout.
document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('mascot-theme', isDark ? 'dark' : 'light');
  });
});
