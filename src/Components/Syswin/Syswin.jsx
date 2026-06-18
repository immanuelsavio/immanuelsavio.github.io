import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import { LOGO_URL, ThemeCtx, Footer } from './syswinHelpers';
import SyswinHome from './SyswinHome';
import SyswinAbout from './SyswinAbout';
import SyswinPortfolio from './SyswinPortfolio';
import './syswin.css';

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => setMenuOpen(false), [location.pathname]);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const pages = [
    ['Home', '/syswin'],
    ['About', '/syswin/about'],
    ['Portfolio', '/syswin/portfolio'],
  ];

  return (
    <>
      <nav className={`sw-nav${scrolled ? ' scrolled' : ''}`}>
        <div className="sw-nav-inner">
          <Link to="/syswin" className="sw-nav-logo-link">
            <img src={LOGO_URL} alt="Syswin" className="sw-nav-logo" />
          </Link>
          <div className="sw-nav-right">
            <ThemePill />
            <button className="sw-hamburger" onClick={() => setMenuOpen(true)} aria-label="Menu">
              <FiMenu size={22} />
            </button>
          </div>
        </div>
      </nav>

      <div className={`sw-overlay${menuOpen ? ' open' : ''}`}>
        <button className="sw-overlay-close" onClick={() => setMenuOpen(false)} aria-label="Close">
          <FiX size={26} />
        </button>
        <nav>
          {pages.map(([label, to]) => (
            <Link key={to} to={to} className="sw-overlay-link" onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}

function ThemePill() {
  const { dark, toggle } = React.useContext(ThemeCtx);
  return (
    <div className="sw-theme-pill" role="radiogroup" aria-label="Theme">
      <button className={`sw-theme-opt${!dark ? ' active' : ''}`} onClick={() => dark && toggle()} aria-label="Light">
        <FiSun size={12} />
      </button>
      <button className={`sw-theme-opt${dark ? ' active' : ''}`} onClick={() => !dark && toggle()} aria-label="Dark">
        <FiMoon size={12} />
      </button>
    </div>
  );
}

export default function Syswin() {
  const location = useLocation();
  const [dark, setDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);

  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);

  useEffect(() => {
    const prev = document.title;
    document.title = 'Syswin Pharmaceuticals | Focused Pharma Distribution';
    document.documentElement.classList.remove('dark');
    document.documentElement.style.overflow = 'auto';
    document.documentElement.style.overflowX = 'hidden';

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta); }
    meta.content = 'Syswin Pharmaceuticals: focused distribution of affordable, high-quality everyday medicines.';

    return () => {
      document.title = prev;
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.overflowX = '';
    };
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = dark ? '#0b1120' : '#fafcff';
    document.body.style.color = dark ? '#e2e8f0' : '#1e293b';
  }, [dark]);

  return (
    <ThemeCtx.Provider value={{ dark, toggle: () => setDark((d) => !d) }}>
      <div className={`sw-page${dark ? ' sw-dark' : ''}`}>
        <Nav />
        <Routes>
          <Route path="/syswin" element={<SyswinHome />} />
          <Route path="/syswin/about" element={<SyswinAbout />} />
          <Route path="/syswin/portfolio" element={<SyswinPortfolio />} />
        </Routes>
        <Footer />
      </div>
    </ThemeCtx.Provider>
  );
}
