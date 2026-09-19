import { createContext, useCallback, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useLocation, useNavigate } from 'react-router-dom';
import { frame, cancelFrame, useReducedMotion } from 'framer-motion';
import { nextBeat } from './section-pager';

const ScrollContext = createContext({
  scrollTo: () => {}, goToSection: () => {}, setLocked: () => {}, getLenis: () => null, step: () => {},
});

const NAV_OFFSET = -72;
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const isEditable = (el) => el instanceof HTMLElement
  && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));

export function SmoothScroll({ children }) {
  const lenisRef = useRef(null);
  const reduce = useReducedMotion();
  const location = useLocation();
  const navigate = useNavigate();
  // Section-by-section paging state. Mutable ref: read inside Lenis callbacks.
  const pager = useRef({ enabled: false, animating: false, lastWheel: 0, lastAbs: 0, timer: 0 });

  // Move to the next/previous beat (see section-pager.js). Used by wheel, keys and buttons.
  const step = useCallback((dir) => {
    const p = pager.current;
    const lenis = lenisRef.current;
    if (p.animating) return;
    const current = lenis ? lenis.scroll : window.scrollY;
    const beat = nextBeat(current, dir);
    if (!beat) return;
    const target = beat.y;
    if (!lenis) {
      window.scrollTo({ top: target, behavior: reduce ? 'auto' : 'smooth' });
      return;
    }
    const vh = window.innerHeight;
    // Going down into a beat with its own duration (the About reveal) plays slowly;
    // going back up always uses the normal quick glide.
    const duration = dir > 0 && beat.duration
      ? beat.duration
      : Math.min(Math.max(0.75 + (Math.abs(target - current) / vh) * 0.3, 0.9), 1.5);
    p.animating = true;
    clearTimeout(p.timer);
    const done = () => { p.animating = false; clearTimeout(p.timer); };
    p.timer = setTimeout(done, duration * 1000 + 250); // safety if interrupted
    lenis.scrollTo(target, { duration, easing: easeInOutCubic, lock: true, force: true, onComplete: done });
  }, [reduce]);

  // Paging only on the home page, desktop with a mouse/trackpad. Touch keeps free scroll.
  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine) and (min-width: 1024px)');
    const update = () => { pager.current.enabled = location.pathname === '/' && mq.matches && !reduce; };
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [location.pathname, reduce]);

  useEffect(() => {
    if (reduce) return undefined;
    const lenis = new Lenis({
      lerp: 0.14,
      wheelMultiplier: 1,
      smoothWheel: true,
      // Intercept wheel gestures when paging is on: one gesture = one beat.
      virtualScroll: ({ deltaY, event }) => {
        const p = pager.current;
        if (!p.enabled || event.type !== 'wheel' || event.ctrlKey) return true;
        if (event.target instanceof Element && event.target.closest('[data-lenis-prevent]')) return true;
        event.preventDefault();
        const now = performance.now();
        const abs = Math.abs(deltaY);
        // A new gesture starts after a pause, or when the wheel speeds up again.
        // Trackpad inertia (a long tail of shrinking deltas) is swallowed.
        const fresh = now - p.lastWheel > 180 || abs > p.lastAbs * 1.6 + 4;
        p.lastWheel = now;
        p.lastAbs = abs;
        if (fresh && abs > 1) step(Math.sign(deltaY));
        return false;
      },
    });
    lenisRef.current = lenis;
    // Drive Lenis from Motion's frame loop so scroll-linked values stay in sync.
    const update = ({ timestamp }) => lenis.raf(timestamp);
    frame.update(update, true);
    return () => {
      cancelFrame(update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduce, step]);

  // Keyboard paging: Space / PageDown / ArrowDown and their reverses.
  useEffect(() => {
    const onKey = (e) => {
      if (!pager.current.enabled || e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
      if (isEditable(document.activeElement) || lenisRef.current?.isStopped) return;
      let dir = 0;
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) dir = 1;
      else if (e.key === 'ArrowUp' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) dir = -1;
      if (!dir) return;
      // Space on a focused button/link should activate it, not scroll.
      if (e.key === ' ' && document.activeElement?.closest?.('button, a, [role="button"]')) return;
      e.preventDefault();
      step(dir);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [step]);

  const scrollTo = useCallback((target, opts = {}) => {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (target === 0 || target === 'top') {
      if (lenisRef.current) lenisRef.current.scrollTo(0, { duration: 1.4, force: true });
      else window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
      return;
    }
    if (!el) return;
    if (lenisRef.current) {
      // force: overlays pause Lenis, but a jump chosen from them must still run
      lenisRef.current.scrollTo(el, { offset: NAV_OFFSET, duration: 1.4, force: true, ...opts });
    } else {
      const top = el.getBoundingClientRect().top + window.scrollY + NAV_OFFSET;
      window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
    }
  }, [reduce]);

  // Section links work from any route: go home first, then scroll.
  const goToSection = useCallback((id) => {
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
      return;
    }
    window.history.replaceState(null, '', `#${id}`);
    scrollTo(`#${id}`);
  }, [location.pathname, navigate, scrollTo]);

  // Handle hash on route change (e.g. arriving at /#experience from /blog)
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const t = setTimeout(() => scrollTo(`#${CSS.escape(id)}`, { immediate: false }), 80);
      return () => clearTimeout(t);
    }
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
    return undefined;
  }, [location.pathname, location.hash, scrollTo]);

  // Pause smooth scrolling while an overlay (menu, command palette) is open.
  const setLocked = useCallback((locked) => {
    if (locked) lenisRef.current?.stop();
    else lenisRef.current?.start();
  }, []);

  const getLenis = useCallback(() => lenisRef.current, []);

  return (
    <ScrollContext.Provider value={{ scrollTo, goToSection, setLocked, getLenis, step }}>
      {children}
    </ScrollContext.Provider>
  );
}

export const useSmoothScroll = () => useContext(ScrollContext);
