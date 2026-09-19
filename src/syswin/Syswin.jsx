import { lazy, Suspense, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import Lenis from 'lenis';
import '@fontsource-variable/instrument-sans/wdth.css';
import './syswin.css';
import Nav from './layout/Nav';
import Footer from './layout/Footer';
import Home from './pages/Home';
import { SxContext } from './context';

const About = lazy(() => import('./pages/About'));
const Portfolio = lazy(() => import('./pages/Portfolio'));


const THEME_KEY = 'sx-theme';

function initialDark() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved === 'dark';
  } catch { /* storage blocked */ }
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export default function Syswin() {
  const location = useLocation();
  const [dark, setDark] = useState(initialDark);
  const [lenis, setLenis] = useState(null);

  // Page chrome: title, description, and keep the portfolio's html.dark out of the way.
  useEffect(() => {
    const prevTitle = document.title;
    const hadDark = document.documentElement.classList.contains('dark');
    document.documentElement.classList.remove('dark');
    let meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.content;
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta); }
    meta.content = 'Syswin Pharmaceuticals: a Bengaluru distribution-first pharma company bringing quality, affordable everyday medicines to doctors, pharmacies and patients.';
    return () => {
      document.title = prevTitle;
      if (prevDesc !== undefined) meta.content = prevDesc;
      document.documentElement.classList.toggle('dark', hadDark);
      document.body.style.backgroundColor = '';
    };
  }, []);

  useEffect(() => {
    const titles = { '/syswin/about': 'About', '/syswin/portfolio': 'Product portfolio' };
    const t = titles[location.pathname];
    document.title = t ? `${t} | Syswin Pharmaceuticals` : 'Syswin Pharmaceuticals | Everyday medicines, made dependable';
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.backgroundColor = dark ? 'rgb(6 11 24)' : 'rgb(244 246 248)';
  }, [dark]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const l = new Lenis({ lerp: 0.12, smoothWheel: true, autoRaf: true });
    setLenis(l);
    return () => { l.destroy(); setLenis(null); };
  }, []);

  useEffect(() => {
    if (location.hash) return;
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
  }, [location.pathname, location.hash, lenis]);

  const toggleTheme = () => setDark((d) => {
    try { localStorage.setItem(THEME_KEY, d ? 'light' : 'dark'); } catch { /* ignore */ }
    return !d;
  });

  return (
    <SxContext.Provider value={{ dark, toggleTheme, lenis }}>
      <MotionConfig reducedMotion="user">
        <div className={`sx relative flex min-h-[100dvh] flex-col ${dark ? 'sx-dark' : ''}`}>
          <a href="#sx-main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-sx-ink focus:px-4 focus:py-2 focus:text-sx-paper">
            Skip to content
          </a>
          <Nav />
          <main id="sx-main" className="flex-1">
            <Suspense fallback={<div className="min-h-[100dvh]" aria-busy="true" />}>
              <Routes>
                <Route path="/syswin" element={<Home />} />
                <Route path="/syswin/about" element={<About />} />
                <Route path="/syswin/portfolio" element={<Portfolio />} />
                <Route path="/syswin/*" element={<Home />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </MotionConfig>
    </SxContext.Provider>
  );
}
