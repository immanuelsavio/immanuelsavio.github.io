import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ArrowUpRight, List, Moon, Sun, X } from '@phosphor-icons/react';
import logo from '../assets/syswin-logo.png';
import { useSx } from '../context';
import { EASE } from '../ui';
import { company } from '../data/catalog';

const links = [
  { to: '/syswin', label: 'Home', end: true },
  { to: '/syswin/about', label: 'About' },
  { to: '/syswin/portfolio', label: 'Portfolio' },
];

export function Logo({ className = '' }) {
  return (
    <span className={`inline-flex items-center rounded-2xl bg-white px-3 py-1.5 shadow-[0_1px_0_rgb(10_22_48/0.06)] ${className}`}>
      <img src={logo} alt={company.name} width="213" height="79" className="h-8 w-auto sm:h-9" />
    </span>
  );
}

export function useGoToContact() {
  const navigate = useNavigate();
  const location = useLocation();
  const { lenis } = useSx();
  return () => {
    if (location.pathname !== '/syswin') { navigate('/syswin#contact'); return; }
    const el = document.getElementById('contact');
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -80, duration: 1.4 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };
}

export default function Nav() {
  const { dark, toggleTheme, lenis } = useSx();
  const location = useLocation();
  const goContact = useGoToContact();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => {
    const next = y > 24;
    if (next !== solid) setSolid(next);
  });

  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    if (!open) return undefined;
    lenis?.stop();
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => { lenis?.start(); window.removeEventListener('keydown', onKey); };
  }, [open, lenis]);

  // Arriving at /syswin#contact from another page.
  useEffect(() => {
    if (location.pathname === '/syswin' && location.hash === '#contact') {
      const t = setTimeout(() => {
        const el = document.getElementById('contact');
        if (el) (lenis ? lenis.scrollTo(el, { offset: -80 }) : el.scrollIntoView());
      }, 120);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [location, lenis]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="sx-shell pt-3">
          <nav
            aria-label="Syswin"
            className={`flex h-[68px] items-center justify-between gap-4 rounded-[22px] pl-2 pr-2 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
              solid ? 'bg-sx-surface/80 shadow-[0_10px_40px_-18px_rgb(10_22_48/0.35)] backdrop-blur-xl' : ''
            }`}
          >
            <Link to="/syswin" aria-label="Syswin Pharmaceuticals home"><Logo /></Link>

            <ul className="hidden items-center gap-1 md:flex">
              {links.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    end={l.end}
                    className={({ isActive }) =>
                      `relative block rounded-full px-4 py-2 text-[0.95rem] transition-colors ${isActive ? 'text-sx-ink' : 'text-sx-muted hover:text-sx-ink'}`}
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && <motion.span layoutId="sx-nav" className="absolute inset-0 rounded-full bg-sx-ink/[0.06]" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                        <span className="relative">{l.label}</span>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
                className="grid h-11 w-11 place-items-center rounded-full border border-sx-line/15 text-sx-ink transition-colors hover:border-sx-ink"
              >
                {dark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                type="button"
                onClick={goContact}
                className="hidden h-11 items-center gap-1.5 rounded-full bg-sx-brand px-5 text-sm font-medium text-sx-on-brand transition-colors hover:bg-sx-ink hover:text-sx-paper sm:inline-flex"
              >
                Contact us <ArrowUpRight size={14} weight="bold" />
              </button>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                aria-expanded={open}
                className="grid h-11 w-11 place-items-center rounded-full bg-sx-ink text-sx-paper md:hidden"
              >
                <List size={18} />
              </button>
            </div>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            data-lenis-prevent
            className="fixed inset-0 z-[60] flex flex-col bg-sx-deep text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div className="sx-shell flex h-[84px] items-center justify-between pt-3">
              <Logo />
              <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="grid h-11 w-11 place-items-center rounded-full bg-white text-[#0A1630]">
                <X size={18} />
              </button>
            </div>
            <ul className="sx-shell flex flex-1 flex-col justify-center gap-2">
              {links.map((l, i) => (
                <motion.li key={l.to} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.08 + i * 0.05, duration: 0.6, ease: EASE }}>
                  <Link to={l.to} className="sx-display block text-5xl font-semibold text-white/90 transition-colors hover:text-[#8FA4FF]">{l.label}</Link>
                </motion.li>
              ))}
              <motion.li initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25, duration: 0.6, ease: EASE }}>
                <button type="button" onClick={() => { setOpen(false); goContact(); }} className="sx-display text-5xl font-semibold text-white/90 transition-colors hover:text-[#8FA4FF]">Contact</button>
              </motion.li>
            </ul>
            <div className="sx-shell pb-10 text-sm text-white/60">
              <a href={company.phoneHref} className="block">{company.phone}</a>
              <a href={`mailto:${company.emails[1]}`} className="block">{company.emails[1]}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
