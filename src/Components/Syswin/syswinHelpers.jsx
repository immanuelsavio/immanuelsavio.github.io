import React, { useState, useEffect, useRef, createContext, useContext } from 'react';

export const LOGO_URL = 'https://syswinpharma.com/img/core-img/logo.png';

export const ThemeCtx = createContext({ dark: false, toggle: () => {} });
export const useTheme = () => useContext(ThemeCtx);

export function useReveal() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.unobserve(el); } },
      { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

export function R({ children, className = '', delay = 0 }) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} className={`sw-reveal ${vis ? 'sw-in' : ''} ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
}

export function Img({ src, alt, className, loading }) {
  const [err, setErr] = useState(false);
  if (err) return <div className="sw-img-err">{alt}</div>;
  return <img src={src} alt={alt} className={className} loading={loading} onError={() => setErr(true)} />;
}

export function Lightbox({ product, onClose, children }) {
  useEffect(() => {
    const h = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', h);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', h); document.body.style.overflow = ''; };
  }, [onClose]);
  if (!product) return null;
  return (
    <div className="sw-lb" onClick={onClose}>
      <div className="sw-lb-box" onClick={(e) => e.stopPropagation()}>
        <button className="sw-lb-x" onClick={onClose} aria-label="Close">&times;</button>
        <Img src={product.image} alt={product.name} className="sw-lb-img" />
        <p className="sw-lb-name">{product.name}</p>
        <p className="sw-lb-cat">{product.category}</p>
        {children}
        <p className="sw-lb-note">For portfolio reference only. Please refer to approved prescribing information.</p>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="sw-foot">
      <div className="sw-foot-inner">
        <div className="sw-foot-top">
          <div>
            <p className="sw-foot-brand">Syswin Pharmaceuticals Pvt. Ltd.</p>
            <p className="sw-foot-loc">Bengaluru, India</p>
          </div>
        </div>
        <hr className="sw-foot-line" />
        <p className="sw-foot-legal">
          Product information shown for representative portfolio purposes only. Please refer to approved prescribing information and applicable regulatory guidance. Mockup concept, not an official regulated product site unless approved.
        </p>
      </div>
    </footer>
  );
}
