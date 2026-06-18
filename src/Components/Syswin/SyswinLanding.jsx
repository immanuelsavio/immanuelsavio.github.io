import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { productCategories } from './productData';
import { useReveal, Reveal, ProductImage } from './syswinHelpers';

const HERO_IMAGES = [
  productCategories[0].images[2],
  productCategories[0].images[10],
  productCategories[0].images[20],
  productCategories[0].images[30],
];

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
            <Link to="/syswin/portfolio" className="sw-btn-primary">
              Explore Portfolio <FiArrowRight size={16} />
            </Link>
            <Link to="/syswin/about" className="sw-btn-secondary">
              About Syswin
            </Link>
          </div>
        </div>
        <div className="sw-hero-preview">
          <div className="sw-hero-card">
            <div className="sw-hero-card-label">Portfolio Preview</div>
            <div className="sw-hero-grid">
              {HERO_IMAGES.map((img, i) => (
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
        {items.map((label) => <div key={label} className="sw-trust-item">{label}</div>)}
      </div>
    </div>
  );
}

function QuickCards() {
  const cards = [
    {
      label: 'About',
      title: 'Built for dependable everyday healthcare',
      desc: 'Founded with a clear belief: everyday medicines should be reliable, available, and priced within reach.',
      to: '/syswin/about',
    },
    {
      label: 'Portfolio',
      title: `${productCategories.length} specialities, 90+ products`,
      desc: 'Browse our full product catalog with search, filters, and 1mg links where available.',
      to: '/syswin/portfolio',
    },
  ];

  return (
    <section className="sw-section">
      <div className="sw-container">
        <div className="sw-quick-grid">
          {cards.map((card, i) => (
            <Reveal key={card.label} delay={i * 120}>
              <Link to={card.to} className="sw-quick-card">
                <span className="sw-section-label">{card.label}</span>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                <span className="sw-quick-card-arrow">
                  <FiArrowRight size={18} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function DistributionStrip() {
  const items = [
    { num: '01', title: 'Tight portfolio', desc: 'We carry what doctors actually prescribe.' },
    { num: '02', title: 'Clear rep materials', desc: 'Clean product info for 5-minute conversations.' },
    { num: '03', title: 'Consistent supply', desc: 'Fewer stockouts, fewer substitutions.' },
    { num: '04', title: 'Honest pricing', desc: 'Focused operations, not inflated margins.' },
  ];

  return (
    <section className="sw-section sw-section-alt">
      <div className="sw-container">
        <Reveal>
          <span className="sw-section-label">How we work</span>
          <h2 className="sw-section-title">Distribution-first, by design</h2>
        </Reveal>
        <div className="sw-dist-grid">
          {items.map((card, i) => (
            <Reveal key={card.num} delay={i * 80}>
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

function CtaSection() {
  return (
    <div className="sw-cta-section">
      <Reveal>
        <h2>Want to see the full portfolio?</h2>
        <p>Browse products, search by name, or filter by speciality.</p>
        <div className="sw-cta-actions">
          <Link to="/syswin/portfolio" className="sw-btn-primary">
            View Full Portfolio <FiArrowRight size={16} />
          </Link>
        </div>
      </Reveal>
    </div>
  );
}

export default function SyswinLanding() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <QuickCards />
      <DistributionStrip />
      <CtaSection />
    </>
  );
}
