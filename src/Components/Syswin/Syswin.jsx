import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiArrowRight } from 'react-icons/fi';
import SyswinLanding from './SyswinLanding';
import SyswinAbout from './SyswinAbout';
import SyswinPortfolio from './SyswinPortfolio';
import { LOGO_URL, SyswinFooter } from './syswinHelpers';
import './syswin.css';

const NAV_ITEMS = [
  { label: 'Home', to: '/syswin' },
  { label: 'About', to: '/syswin/about' },
  { label: 'Portfolio', to: '/syswin/portfolio' },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setOpen(false); }, [location.pathname]);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const isActive = (to) => location.pathname === to;

  return (
    <>
      <nav className={`sw-nav${scrolled ? ' scrolled' : ''}`}>
        <div className="sw-nav-inner">
          <Link to="/syswin" className="sw-nav-logo-link">
            <img src={LOGO_URL} alt="Syswin Pharmaceuticals" className="sw-nav-logo" />
          </Link>
          <button className="sw-hamburger" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </nav>

      <div className={`sw-overlay-menu ${open ? 'open' : ''}`}>
        <div className="sw-overlay-links">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={`sw-overlay-link ${isActive(item.to) ? 'active' : ''}`}
            >
              {item.label}
              <FiArrowRight size={18} />
            </Link>
          ))}
        </div>
        <div className="sw-overlay-contact">
          <p>080-26721522</p>
          <p>syswinpharma@gmail.com</p>
        </div>
      </div>
    </>
  );
}

export default function Syswin() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        document.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Syswin Pharmaceuticals | Focused Pharma Distribution';

    document.documentElement.classList.remove('dark');
    document.body.style.backgroundColor = '#f8fafd';
    document.body.style.color = '#1e293b';
    document.documentElement.style.overflow = 'auto';
    document.documentElement.style.overflowX = 'hidden';

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta); }
    meta.content = 'A modern representative portfolio mockup for Syswin Pharmaceuticals, focused on high-quality affordable everyday medicines.';

    return () => {
      document.title = prevTitle;
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.overflowX = '';
    };
  }, []);

  return (
    <div className="sw-page">
      <Navbar />
      <Routes>
        <Route path="/syswin" element={<SyswinLanding />} />
        <Route path="/syswin/about" element={<SyswinAbout />} />
        <Route path="/syswin/portfolio" element={<SyswinPortfolio />} />
      </Routes>
      <SyswinFooter />
    </div>
  );
}
