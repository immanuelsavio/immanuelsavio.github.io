import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { productCategories, getProductName } from './productData';
import './syswin.css';

const LOGO_URL = 'https://syswinpharma.com/img/core-img/logo.png';

const HERO_PREVIEW_IMAGES = [
  productCategories[0].images[2],
  productCategories[0].images[10],
  productCategories[0].images[20],
  productCategories[0].images[30],
];

function useReveal(options = {}) {
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

function Reveal({ children, className = '', delay = 0, direction = 'up' }) {
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

function ProductImage({ src, alt, className, loading }) {
  const [error, setError] = useState(false);
  if (error) return <div className="sw-img-fallback">{alt}</div>;
  return <img src={src} alt={alt} className={className} loading={loading} onError={() => setError(true)} />;
}

function Lightbox({ product, onClose }) {
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
        <p className="sw-lightbox-label">Portfolio item, for representative reference only</p>
      </div>
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = useCallback((e) => {
    setMenuOpen(false);
    const href = e.currentTarget.getAttribute('href');
    if (href?.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const links = [
    { href: '#about', label: 'About' },
    { href: '#story', label: 'Story' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#quality', label: 'Quality' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className={`sw-nav${scrolled ? ' scrolled' : ''}`}>
        <div className="sw-nav-inner">
          <img src={LOGO_URL} alt="Syswin Pharmaceuticals" className="sw-nav-logo" />
          <ul className="sw-nav-links">
            {links.map((l) => (
              <li key={l.href}><a href={l.href} onClick={scrollTo}>{l.label}</a></li>
            ))}
            <li><a href="#portfolio" onClick={scrollTo} className="sw-nav-cta">View Portfolio</a></li>
          </ul>
          <button className={`sw-hamburger${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>
      <div className={`sw-mobile-menu${menuOpen ? ' open' : ''}`}>
        {links.map((l) => <a key={l.href} href={l.href} onClick={scrollTo}>{l.label}</a>)}
        <a href="#portfolio" onClick={scrollTo}>View Portfolio</a>
      </div>
    </>
  );
}

function Hero() {
  const [ref, visible] = useReveal({ threshold: 0.05 });

  return (
    <section className="sw-hero" ref={ref}>
      <div className={`sw-hero-inner ${visible ? 'sw-hero-entered' : ''}`}>
        <div className="sw-hero-text">
          <h1>Everyday medicines people actually need. That's what we do.</h1>
          <p>
            Syswin Pharmaceuticals distributes affordable, high-quality medicines
            across multiple specialities. The kind doctors prescribe daily and
            patients pick up regularly.
          </p>
          <div className="sw-hero-actions">
            <a href="#portfolio" className="sw-btn-primary" onClick={(e) => { e.preventDefault(); document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' }); }}>
              Explore Portfolio
            </a>
            <a href="#contact" className="sw-btn-secondary" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
              Contact Syswin
            </a>
          </div>
        </div>
        <div className="sw-hero-preview">
          <div className="sw-hero-card">
            <div className="sw-hero-card-label">Portfolio Preview</div>
            <div className="sw-hero-grid">
              {HERO_PREVIEW_IMAGES.map((img, i) => (
                <div key={i} className="sw-hero-grid-item">
                  <ProductImage src={img} alt={`Syswin product preview ${i + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = ['Distribution-focused', 'Daily-use medicines', 'Multi-speciality portfolio', 'Doctor-rep ready catalog'];
  return (
    <div className="sw-trust">
      <div className="sw-trust-inner">
        {items.map((label) => (
          <div key={label} className="sw-trust-item">{label}</div>
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="sw-section sw-section-alt">
      <div className="sw-container">
        <Reveal>
          <span className="sw-section-label">About</span>
          <h2 className="sw-section-title">What Syswin does, plainly</h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="sw-section-desc">
            Syswin Pharmaceuticals is based in Bengaluru. We don't do drug discovery
            or run large-scale R&D labs. What we do is distribute. We pick medicines
            that doctors actually write every day, and we make sure they're available,
            affordable, and consistent. That's the whole focus.
          </p>
        </Reveal>
        <div className="sw-about-grid">
          <Reveal delay={150}>
            <div className="sw-about-card" id="story">
              <span className="sw-story-badge">Brand Story · Mockup Copy</span>
              <h3>How Syswin started</h3>
              <p>
                Three people who'd spent years at bigger pharma companies decided to
                start something smaller and more honest. They'd watched how layers of
                complexity (bloated portfolios, unclear pricing, stretched-thin field
                teams) often left doctors and pharmacists underserved.
              </p>
              <br />
              <p>
                So they built Syswin around a simple bet: a tighter product range,
                direct relationships with doctors, and medicines priced for real
                people, not inflated margins. That bet still runs the company.
              </p>
            </div>
          </Reveal>
          <Reveal delay={250}>
            <div className="sw-about-card">
              <h3>Why distribution-first?</h3>
              <p>
                Most pharma companies try to do everything: manufacture, research,
                market, distribute. Syswin only does the last two. That means we can
                stay close to doctors, keep our portfolio clean enough that every rep
                knows every product, and actually follow up when something goes wrong.
                Less surface area, more depth.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function MissionVisionValues() {
  const values = ['Quality first', 'Ethical representation', 'Affordability', 'Reliable supply', 'Focused portfolio', 'Long-term trust'];

  return (
    <section className="sw-section">
      <div className="sw-container">
        <Reveal>
          <span className="sw-section-label">Purpose</span>
          <h2 className="sw-section-title">What drives us</h2>
        </Reveal>
        <div className="sw-mvv-grid">
          <Reveal delay={100}>
            <div className="sw-mvv-card">
              <h3><span style={{ color: 'var(--sw-blue)' }}>&#9670;</span> Mission</h3>
              <p>
                Make good medicines easier to get. Distribute them fairly, price
                them honestly, and build relationships with doctors that last beyond
                a single prescription cycle.
              </p>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="sw-mvv-card">
              <h3><span style={{ color: 'var(--sw-blue)' }}>&#11045;</span> Vision</h3>
              <p>
                Be the pharma company that doctors, pharmacists, and patients
                think of when they want something dependable for routine care.
                Not flashy, just reliable.
              </p>
            </div>
          </Reveal>
        </div>
        <div className="sw-values-grid">
          {values.map((v, i) => (
            <Reveal key={v} delay={100 + i * 60}>
              <div className="sw-value-item">
                <span className="sw-value-dot" /> {v}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  const [activeSlug, setActiveSlug] = useState('physician');
  const [search, setSearch] = useState('');
  const [lightboxProduct, setLightboxProduct] = useState(null);
  const [sectionRef, sectionVisible] = useReveal({ threshold: 0.05 });

  const activeCategory = productCategories.find((c) => c.slug === activeSlug);

  const products = useMemo(() => {
    if (!activeCategory) return [];
    return activeCategory.images.map((img) => ({
      name: getProductName(img),
      image: img,
      category: activeCategory.name,
    }));
  }, [activeCategory]);

  const filtered = useMemo(() => {
    if (!search.trim()) return products;
    const q = search.toLowerCase();
    return products.filter((p) => p.name.toLowerCase().includes(q));
  }, [products, search]);

  return (
    <section id="portfolio" className="sw-section sw-section-alt" ref={sectionRef}>
      <div className={`sw-container ${sectionVisible ? 'sw-reveal-up sw-visible' : 'sw-reveal-up'}`}>
        <span className="sw-section-label">Portfolio</span>
        <h2 className="sw-section-title">Products by speciality</h2>
        <p className="sw-section-desc" style={{ marginBottom: '2rem' }}>
          Everything below is for rep reference. Tap any product to see a larger view.
        </p>

        <div className="sw-portfolio-header">
          <div className="sw-portfolio-tabs" role="tablist">
            {productCategories.map((cat) => (
              <button
                key={cat.slug}
                className={`sw-tab${activeSlug === cat.slug ? ' active' : ''}`}
                onClick={() => { setActiveSlug(cat.slug); setSearch(''); }}
                role="tab"
                aria-selected={activeSlug === cat.slug}
              >
                {cat.name} ({cat.images.length})
              </button>
            ))}
          </div>
          <div className="sw-search-wrap">
            <svg className="sw-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              className="sw-search-input"
              placeholder="Search portfolio…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search products"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="sw-no-results">No matching products found.</div>
        ) : (
          <>
            <div className="sw-product-grid">
              {filtered.map((product, i) => (
                <article
                  key={`${product.name}-${i}`}
                  className="sw-product-card sw-card-enter"
                  style={{ animationDelay: `${Math.min(i * 30, 600)}ms` }}
                  onClick={() => setLightboxProduct(product)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setLightboxProduct(product)}
                  aria-label={`View ${product.name}`}
                >
                  <div className="sw-product-img-wrap">
                    <ProductImage src={product.image} alt={`${product.name}, ${product.category}`} loading="lazy" />
                  </div>
                  <div className="sw-product-info">
                    <p className="sw-product-name" title={product.name}>{product.name}</p>
                    <div className="sw-product-meta">
                      <span className="sw-product-badge">{activeCategory.slug}</span>
                      <span className="sw-product-label">Portfolio item</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <p className="sw-product-count">
              Showing {filtered.length} of {products.length} items in {activeCategory.name}
            </p>
          </>
        )}
      </div>
      <Lightbox product={lightboxProduct} onClose={() => setLightboxProduct(null)} />
    </section>
  );
}

function DistributionModel() {
  const cards = [
    { num: '01', title: 'Tight portfolio', desc: 'We carry what doctors actually prescribe. No filler SKUs to pad a catalog.' },
    { num: '02', title: 'Clear rep materials', desc: 'Reps get clean product info they can walk through in a 5-minute conversation.' },
    { num: '03', title: 'Consistent supply', desc: 'Distribution-first means fewer stockouts and fewer last-minute substitutions.' },
    { num: '04', title: 'Honest pricing', desc: 'We keep costs down by staying focused, not by cutting corners on quality.' },
  ];

  return (
    <section className="sw-section">
      <div className="sw-container">
        <Reveal>
          <span className="sw-section-label">How we work</span>
          <h2 className="sw-section-title">Distribution-first, by design</h2>
          <p className="sw-section-desc">
            We don't try to be everything. We distribute well, and we keep it
            simple enough that every step actually works.
          </p>
        </Reveal>
        <div className="sw-dist-grid">
          {cards.map((card, i) => (
            <Reveal key={card.num} delay={i * 100}>
              <div className="sw-dist-card">
                <div className="sw-dist-num">{card.num}</div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Quality() {
  return (
    <section id="quality" className="sw-section sw-section-alt">
      <div className="sw-container">
        <Reveal>
          <span className="sw-section-label">Commitment</span>
          <h2 className="sw-section-title">Quality without the markup</h2>
        </Reveal>
        <div className="sw-quality-content">
          <Reveal delay={100}>
            <div className="sw-quality-text">
              <p>
                Every product we distribute comes from established manufacturers
                and meets the regulatory standards you'd expect. We're not
                reinventing chemistry. We're making sure proven medicines get
                to the places that need them, at prices that make sense.
              </p>
              <p>
                Because we keep our portfolio small and our distribution
                focused, we don't need to inflate prices to cover sprawling
                operations. The savings go where they should: to the patient.
              </p>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <ul className="sw-quality-list">
              <li><span className="sw-quality-check">&#10003;</span> Sourced from established manufacturers</li>
              <li><span className="sw-quality-check">&#10003;</span> Regulatory-compliant portfolio</li>
              <li><span className="sw-quality-check">&#10003;</span> Pricing built around real-world use</li>
              <li><span className="sw-quality-check">&#10003;</span> Consistent availability, fewer stockouts</li>
              <li><span className="sw-quality-check">&#10003;</span> Clear product information for reps</li>
              <li><span className="sw-quality-check">&#10003;</span> Multi-speciality coverage</li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <div className="sw-cta-section">
      <Reveal>
        <h2>Want to see the full portfolio?</h2>
        <p>
          Get in touch for product details, distribution inquiries, or
          to set up a rep visit.
        </p>
        <div className="sw-cta-actions">
          <a href="#portfolio" className="sw-btn-primary" onClick={(e) => { e.preventDefault(); document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' }); }}>
            View Full Portfolio
          </a>
          <a href="#contact" className="sw-btn-secondary" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
            Get in Touch
          </a>
        </div>
      </Reveal>
    </div>
  );
}

function Footer() {
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
              <li><a href="#about">About Syswin</a></li>
              <li><a href="#portfolio">Product Portfolio</a></li>
              <li><a href="#quality">Quality Promise</a></li>
              <li><a href="#contact">Contact</a></li>
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

export default function Syswin() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Syswin Pharmaceuticals | Focused Pharma Distribution';

    document.documentElement.classList.remove('dark');
    document.body.style.backgroundColor = '#f8fafd';
    document.body.style.color = '#1e293b';
    document.body.style.overflow = 'auto';
    document.body.style.overflowX = 'hidden';
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
      document.body.style.overflowX = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.overflowX = '';
    };
  }, []);

  return (
    <div className="sw-page">
      <Navbar />
      <Hero />
      <TrustStrip />
      <About />
      <MissionVisionValues />
      <Portfolio />
      <DistributionModel />
      <Quality />
      <CtaSection />
      <Footer />
    </div>
  );
}
