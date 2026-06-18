import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export const LOGO_URL = 'https://syswinpharma.com/img/core-img/logo.png';

export function useReveal(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); } },
      { threshold: options.threshold ?? 0.15, rootMargin: options.rootMargin ?? '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

export function Reveal({ children, className = '', delay = 0, direction = 'up' }) {
  const [ref, visible] = useReveal();
  const dirs = { up: 'sw-reveal-up', left: 'sw-reveal-left', right: 'sw-reveal-right', none: 'sw-reveal-fade' };
  return (
    <div
      ref={ref}
      className={`${dirs[direction] || dirs.up} ${visible ? 'sw-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function ProductImage({ src, alt, className, loading }) {
  const [error, setError] = useState(false);
  if (error) return <div className="sw-img-fallback">{alt}</div>;
  return <img src={src} alt={alt} className={className} loading={loading} onError={() => setError(true)} />;
}

export function Lightbox({ product, onClose, extraContent }) {
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
  }, [onClose]);

  if (!product) return null;

  return (
    <div className="sw-lightbox-overlay" onClick={onClose} role="dialog" aria-label={`Product detail: ${product.name}`}>
      <div className="sw-lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="sw-lightbox-close" onClick={onClose} aria-label="Close">&times;</button>
        <ProductImage src={product.image} alt={product.name} className="sw-lightbox-img" />
        <p className="sw-lightbox-name">{product.name}</p>
        <p className="sw-lightbox-cat">{product.category}</p>
        {extraContent}
        <p className="sw-lightbox-label">Portfolio item, for representative reference only</p>
      </div>
    </div>
  );
}

export function SyswinFooter() {
  return (
    <footer id="contact" className="sw-footer">
      <div className="sw-footer-inner">
        <div className="sw-footer-grid">
          <div>
            <h3>Syswin Pharmaceuticals Pvt. Ltd.</h3>
            <address className="sw-footer-address">
              <p>
                No. 661, 80 Feet Road, 2nd Main,<br />
                7th Block, 2nd Phase,<br />
                Banashankari 3rd Stage,<br />
                Bangalore - 560 085
              </p>
            </address>
          </div>
          <div>
            <h3>Contact</h3>
            <p style={{ marginBottom: '0.5rem' }}><a href="tel:08026721522">080-26721522</a></p>
            <p style={{ marginBottom: '0.5rem' }}><a href="mailto:syswinpharma@gmail.com">syswinpharma@gmail.com</a></p>
            <p><a href="mailto:info@syswinpharma.com">info@syswinpharma.com</a></p>
          </div>
          <div>
            <h3>Quick Links</h3>
            <ul className="sw-footer-links">
              <li><Link to="/syswin/about">About Syswin</Link></li>
              <li><Link to="/syswin/portfolio">Product Portfolio</Link></li>
              <li><a href="https://www.1mg.com/marketer/syswin-pharmaceuticals-pvt-ltd-77066" target="_blank" rel="noopener noreferrer">Syswin on 1mg</a></li>
            </ul>
          </div>
        </div>
        <hr className="sw-footer-divider" />
        <div className="sw-footer-bottom">
          <p className="sw-disclaimer">
            Product information shown for representative portfolio purposes only.
            Please refer to approved prescribing information and applicable
            regulatory guidance.
          </p>
          <span className="sw-mockup-badge">&#9671; Mockup Concept</span>
        </div>
      </div>
    </footer>
  );
}
