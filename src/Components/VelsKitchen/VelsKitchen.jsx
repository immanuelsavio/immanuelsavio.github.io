import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiArrowRight } from 'react-icons/fi';
import { ORDER_URLS, NAV_LINKS } from './menuData';
import Landing from './Landing';
import MenuPage from './MenuPage';
import Specials from './Specials';
import Tasting from './Tasting';
import About from './About';
import './velskitchen.css';

function VKNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  const isActive = (to) => {
    if (to === '/velskitchen') return location.pathname === '/velskitchen';
    return location.pathname.startsWith(to);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'vk-nav-solid py-3' : 'py-4'}`}>
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
        <Link to="/velskitchen" className="flex items-center gap-2.5">
          <img
            src="/velskitchen/images/vels_logo.png"
            alt="Vel's Kitchen"
            className="w-8 h-8 rounded-full border border-[var(--vk-border)]"
          />
          <span className="vk-serif font-bold text-lg text-[var(--vk-text)] tracking-tight">
            Vel&apos;s Kitchen
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-medium transition-colors ${
                isActive(l.to) ? 'text-[var(--vk-gold)]' : 'text-[var(--vk-text-secondary)] hover:text-[var(--vk-text)]'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a href={ORDER_URLS.direct} target="_blank" rel="noopener noreferrer" className="vk-btn-gold text-sm px-5 py-2.5 inline-flex items-center gap-1.5">
            Order Now <FiArrowRight size={14} />
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-[var(--vk-text)] p-2 -mr-2" aria-label="Menu">
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden border-t border-[var(--vk-border)] bg-[var(--vk-bg)]/95 backdrop-blur-xl"
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`py-2.5 text-sm font-medium ${
                    isActive(l.to) ? 'text-[var(--vk-gold)]' : 'text-[var(--vk-text-secondary)]'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <a
                href={ORDER_URLS.direct}
                target="_blank"
                rel="noopener noreferrer"
                className="vk-btn-gold text-center text-sm py-3 mt-2"
              >
                Order Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function VKFooter() {
  return (
    <footer className="border-t border-[var(--vk-border)] bg-[var(--vk-bg)] pt-12 pb-28 md:pb-12">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <img src="/velskitchen/images/vels_logo.png" alt="" className="w-7 h-7 rounded-full" />
              <span className="vk-serif font-bold text-[var(--vk-text)]">Vel&apos;s Kitchen</span>
            </div>
            <p className="text-[var(--vk-text-secondary)] text-sm leading-relaxed">
              Kongu-style South Indian home cooking in Chicago&apos;s West Town.
            </p>
          </div>
          <div>
            <h4 className="text-[var(--vk-gold-dim)] text-xs font-semibold uppercase tracking-widest mb-3">Pages</h4>
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((l) => (
                <Link key={l.to} to={l.to} className="text-[var(--vk-text-secondary)] text-sm hover:text-[var(--vk-text)] transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-[var(--vk-gold-dim)] text-xs font-semibold uppercase tracking-widest mb-3">Order</h4>
            <div className="flex flex-col gap-2">
              <a href={ORDER_URLS.doorDash} target="_blank" rel="noopener noreferrer" className="text-[var(--vk-text-secondary)] text-sm hover:text-[var(--vk-text)] transition-colors">DoorDash</a>
              <a href={ORDER_URLS.uberEats} target="_blank" rel="noopener noreferrer" className="text-[var(--vk-text-secondary)] text-sm hover:text-[var(--vk-text)] transition-colors">Uber Eats</a>
              <a href={ORDER_URLS.grubhub} target="_blank" rel="noopener noreferrer" className="text-[var(--vk-text-secondary)] text-sm hover:text-[var(--vk-text)] transition-colors">Grubhub</a>
            </div>
          </div>
          <div>
            <h4 className="text-[var(--vk-gold-dim)] text-xs font-semibold uppercase tracking-widest mb-3">Location</h4>
            <p className="text-[var(--vk-text-secondary)] text-sm">850 W Superior St</p>
            <p className="text-[var(--vk-text-secondary)] text-sm">Chicago, IL 60642</p>
            <p className="text-[var(--vk-text-secondary)] text-sm mt-2">Cloud Kitchen — Delivery & Pickup</p>
          </div>
        </div>
        <div className="vk-divider-gold" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5">
          <p className="text-[var(--vk-text-secondary)]/50 text-xs text-center sm:text-left">
            POC preview — menu and prices subject to confirmation.
          </p>
          <span className="text-[var(--vk-gold-dim)] text-xs border border-[var(--vk-border)] px-3 py-1 rounded-full">
            POC Preview
          </span>
        </div>
      </div>
    </footer>
  );
}

function MobileCTA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 250);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[var(--vk-bg)]/95 backdrop-blur-xl border-t border-[var(--vk-border)] px-4 py-3 flex items-center gap-3"
        >
          <Link to="/velskitchen/menu" className="text-[var(--vk-text-secondary)] text-sm font-medium flex-shrink-0">
            Menu
          </Link>
          <a
            href={ORDER_URLS.direct}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 vk-btn-gold text-center text-sm py-3"
          >
            Order Now
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function VelsKitchen() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Vel's Kitchen Chicago | South Indian Food, Tiffin, Biryani & Filter Coffee";
    document.documentElement.classList.remove('dark');
    document.body.style.backgroundColor = '#0B0A09';
    document.body.style.color = '#F0EBE3';

    const favicon = document.querySelector("link[rel~='icon']") || document.createElement('link');
    favicon.rel = 'icon';
    const prevFavicon = favicon.href;
    favicon.href = '/velskitchen/favicon.png';
    document.head.appendChild(favicon);

    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);

    return () => {
      document.title = prevTitle;
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
      favicon.href = prevFavicon;
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <div className="vk-page">
      <VKNav />
      <main className="min-h-screen">
        <Routes>
          <Route path="/velskitchen" element={<Landing />} />
          <Route path="/velskitchen/menu" element={<MenuPage />} />
          <Route path="/velskitchen/specials" element={<Specials />} />
          <Route path="/velskitchen/tasting" element={<Tasting />} />
          <Route path="/velskitchen/about" element={<About />} />
        </Routes>
      </main>
      <VKFooter />
      <MobileCTA />
    </div>
  );
}
