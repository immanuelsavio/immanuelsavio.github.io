import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring,
} from 'framer-motion';
import { ArrowUpRight, Command, List, Moon, Sun, X } from '@phosphor-icons/react';
import { resume, sections, socials } from '../content';
import { useSmoothScroll } from '../lib/smooth-scroll';
import { useTheme } from '../lib/theme';
import { EASE, SocialLinks } from '../ui/primitives';

const sectionLinks = sections.filter((s) => s.id !== 'contact');
const pageLinks = [
  { to: '/blog', label: 'Writing' },
  { to: '/playground', label: 'Playground' },
];

function useActiveSection(enabled) {
  const [active, setActive] = useState(null);
  useEffect(() => {
    if (!enabled) { setActive(null); return undefined; }
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [enabled]);
  return active;
}

export function ThemeToggle({ className = '' }) {
  const { theme, toggle } = useTheme();
  const dark = theme === 'dark';
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`relative grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-line/15 text-ink transition-colors hover:border-ink ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 18, rotate: -45, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: -18, rotate: 45, opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export default function Nav({ onOpenPalette }) {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { goToSection, scrollTo, setLocked } = useSmoothScroll();
  const active = useActiveSection(isHome);
  const reduce = useReducedMotion();
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [open, setOpen] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 30, restDelta: 0.001 });

  // Only flips state when direction changes, not every frame.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    const nextHidden = !open && y > 240 && y > prev;
    if (nextHidden !== hidden) setHidden(nextHidden);
    const top = y < 24;
    if (top !== atTop) setAtTop(top);
  });

  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    if (!open) return undefined;
    setLocked(true);
    return () => setLocked(false);
  }, [open, setLocked]);
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const go = (id) => {
    setOpen(false);
    goToSection(id);
  };

  const onLogo = (e) => {
    if (isHome) {
      e.preventDefault();
      window.history.replaceState(null, '', '/');
      scrollTo('top');
    }
  };

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-nav h-[2px] origin-left bg-signal"
        style={{ scaleX: progress }}
      />
      <motion.header
        className="fixed inset-x-0 top-0 z-nav"
        animate={{ y: hidden && !reduce ? '-110%' : '0%' }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div className="shell pt-3">
          <nav
            aria-label="Primary"
            className={`flex h-16 items-center justify-between gap-4 rounded-full px-2 pl-5 transition-[background-color,border-color,backdrop-filter] duration-500 ${
              atTop ? 'border border-transparent' : 'border border-line/10 bg-paper/70 backdrop-blur-xl'
            }`}
          >
            <Link to="/" onClick={onLogo} className="group flex items-center gap-3" aria-label={`${resume.name}, home`}>
              <span className="display text-xl font-bold leading-none">
                ISD<span className="text-signal">.</span>
              </span>
              <span className="hidden text-sm text-muted transition-colors group-hover:text-ink sm:inline">
                Immanuel Savio
              </span>
            </Link>

            <ul className="hidden items-center gap-1 rounded-full border border-line/10 bg-surface/60 p-1 xl:flex">
              {sectionLinks.map((s) => {
                const isActive = isHome && active === s.id;
                return (
                  <li key={s.id}>
                    <a
                      href={`/#${s.id}`}
                      onClick={(e) => { e.preventDefault(); go(s.id); }}
                      aria-current={isActive ? 'true' : undefined}
                      className={`relative block rounded-full px-4 py-2 text-sm transition-colors ${isActive ? 'text-paper' : 'text-muted hover:text-ink'}`}
                    >
                      {isActive && (
                        <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                      )}
                      <span className="relative">{s.label}</span>
                    </a>
                  </li>
                );
              })}
              <li aria-hidden className="mx-1 h-4 w-px bg-line/15" />
              {pageLinks.map((p) => (
                <li key={p.to}>
                  <NavLink
                    to={p.to}
                    className={({ isActive }) =>
                      `relative block rounded-full px-4 py-2 text-sm transition-colors ${isActive ? 'bg-ink text-paper' : 'text-muted hover:text-ink'}`}
                  >
                    {p.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenPalette}
                className="hidden h-10 items-center gap-2 rounded-full border border-line/15 px-3 text-sm text-muted transition-colors hover:border-ink hover:text-ink md:inline-flex"
                aria-label="Open command menu"
              >
                <Command size={15} />
                <span className="font-mono text-xs">K</span>
              </button>
              <ThemeToggle />
              <a
                href="/#contact"
                onClick={(e) => { e.preventDefault(); go('contact'); }}
                className="hidden h-10 items-center gap-1.5 rounded-full bg-signal px-5 text-sm font-medium text-on-signal transition-colors hover:bg-ink hover:text-paper sm:inline-flex"
              >
                Contact
                <ArrowUpRight size={14} weight="bold" />
              </a>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="grid h-10 w-10 place-items-center rounded-full bg-ink text-paper xl:hidden"
                aria-label="Open menu"
                aria-expanded={open}
              >
                <List size={18} />
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-menu flex flex-col bg-ink text-paper"
            initial={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 44px) 44px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            transition={{ duration: reduce ? 0 : 0.7, ease: EASE }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            data-lenis-prevent
          >
            <div className="shell flex h-[76px] items-center justify-between pt-3">
              <span className="display text-xl font-bold">ISD<span className="text-signal">.</span></span>
              <button type="button" onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-center rounded-full bg-paper text-ink" aria-label="Close menu">
                <X size={18} />
              </button>
            </div>
            <div className="shell flex flex-1 flex-col justify-center overflow-y-auto py-8">
              <ul className="space-y-1">
                {[...sections.map((s) => ({ ...s, kind: 'section' })), ...pageLinks.map((p) => ({ ...p, kind: 'page' }))].map((item, i) => (
                  <motion.li
                    key={item.id ?? item.to}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15 + i * 0.04, duration: 0.6, ease: EASE }}
                  >
                    {item.kind === 'section' ? (
                      <a href={`/#${item.id}`} onClick={(e) => { e.preventDefault(); go(item.id); }} className="display block text-[clamp(2.4rem,9vw,4.5rem)] font-semibold leading-[1.05] text-paper/90 transition-colors hover:text-signal">
                        {item.label}
                      </a>
                    ) : (
                      <Link to={item.to} className="display block text-[clamp(2.4rem,9vw,4.5rem)] font-semibold leading-[1.05] text-paper/50 transition-colors hover:text-signal">
                        {item.label}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="shell flex items-center justify-between gap-4 pb-8 [&_a]:border-paper/20 [&_a]:text-paper">
              <SocialLinks items={socials} />
              <button type="button" onClick={() => { setOpen(false); onOpenPalette(); }} className="hidden items-center gap-2 text-sm text-paper/60 hover:text-paper sm:inline-flex">
                <Command size={15} /> Command menu
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
