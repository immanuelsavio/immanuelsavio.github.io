import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { productCategories, getProductName } from './productData';
import { useReveal, R, Img } from './syswinHelpers';

const TOTAL = productCategories.reduce((s, c) => s + c.images.length, 0);

function Hero() {
  const [ref, vis] = useReveal();
  const [activeCat, setActiveCat] = useState(productCategories[0]);
  const preview = activeCat.images.slice(0, 6);

  return (
    <section className="sw-hero" ref={ref}>
      <div className={`sw-hero-inner${vis ? ' sw-hero-entered' : ''}`}>
        <div className="sw-hero-text">
          <h1>Focused medicines. Reliable access. Built for everyday care.</h1>
          <p>Syswin Pharmaceuticals is a distribution-first pharma company focused on dependable, affordable medicines across everyday clinical needs.</p>
          <div className="sw-hero-actions">
            <Link to="/syswin/portfolio" className="sw-btn-primary">Explore Portfolio <FiArrowRight size={15} /></Link>
            <Link to="/syswin/about" className="sw-btn-ghost">About Syswin</Link>
          </div>
        </div>
        <div className="sw-hero-visual">
          <div className="sw-vis">
            <div className="sw-vis-label">Clinical Portfolio System</div>
            <div className="sw-vis-metrics">
              <div><span className="sw-vis-metric-num">6</span><span className="sw-vis-metric-label">Specialities</span></div>
              <div><span className="sw-vis-metric-num">100+</span><span className="sw-vis-metric-label">Portfolio Items</span></div>
              <div><span className="sw-vis-metric-num">50+</span><span className="sw-vis-metric-label">1mg References</span></div>
            </div>
            <div className="sw-vis-tags">
              {productCategories.map((c) => (
                <button
                  key={c.slug}
                  className={`sw-vis-tag${c.slug === activeCat.slug ? ' active' : ''}`}
                  onClick={() => setActiveCat(c)}
                >
                  {c.name.replace(' Range', '')}
                </button>
              ))}
            </div>
            <div className="sw-vis-grid">
              {preview.map((img, i) => (
                <div key={`${activeCat.slug}-${i}`} className="sw-vis-item">
                  <Img src={img} alt={getProductName(img)} />
                </div>
              ))}
            </div>
            <Link to={`/syswin/portfolio?cat=${activeCat.slug}`} className="sw-vis-more">
              View all {activeCat.name} ({activeCat.images.length}) <FiArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBand() {
  return (
    <div className="sw-trust-band">
      <div className="sw-trust-inner">
        {['Distribution-focused', 'Daily-use medicines', 'Multi-speciality portfolio', 'Doctor-rep ready'].map((t) => (
          <div key={t} className="sw-trust-item"><span className="sw-trust-dot" /><span className="sw-trust-label">{t}</span></div>
        ))}
      </div>
    </div>
  );
}

function Highlights() {
  const items = [
    ['Multi-speciality portfolio', 'Physician, Ortho, Gynae, Derma, Dental, and Ophtho ranges.'],
    ['Distribution-first model', 'Built around supply consistency, not R&D complexity.'],
    ['Doctor-rep ready catalog', 'Clean product information for professional conversations.'],
    ['Affordable everyday access', 'Pricing built around real-world patient use.'],
  ];
  return (
    <section className="sw-sect">
      <div className="sw-wrap">
        <R><span className="sw-eyebrow">What we bring</span></R>
        <R delay={60}><h2 className="sw-heading">Built for the people who prescribe, dispense, and depend on medicines daily.</h2></R>
        <div className="sw-highlights">
          {items.map(([title, desc], i) => (
            <R key={i} delay={80 + i * 60}>
              <div className="sw-highlight">
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            </R>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="sw-contact">
      <div className="sw-wrap" style={{ textAlign: 'center' }}>
        <R><h2 className="sw-heading">Ready for doctor-rep conversations</h2></R>
        <R delay={60}><p className="sw-subhead" style={{ maxWidth: 480, margin: '0 auto 2.5rem' }}>Clean portfolio information, speciality-wise product access, and direct company contact in one place.</p></R>
        <R delay={100}>
          <div className="sw-contact-btns">
            <Link to="/syswin/portfolio" className="sw-btn-primary">View Portfolio <FiArrowRight size={15} /></Link>
            <a href="mailto:syswinpharma@gmail.com" className="sw-btn-ghost">Email Syswin</a>
          </div>
        </R>
        <R delay={160}>
          <div className="sw-contact-row">
            <div className="sw-contact-box">
              <h4>Office</h4>
              <p>Syswin Pharmaceuticals Pvt. Ltd.</p>
              <p>No. 661, 80 Feet Road, 2nd Main,<br />7th Block, 2nd Phase, Banashankari 3rd Stage,<br />Bangalore - 560 085</p>
            </div>
            <div className="sw-contact-box">
              <h4>Reach us</h4>
              <p><a href="tel:08026721522">080-26721522</a></p>
              <p><a href="mailto:syswinpharma@gmail.com">syswinpharma@gmail.com</a></p>
              <p><a href="mailto:info@syswinpharma.com">info@syswinpharma.com</a></p>
            </div>
          </div>
        </R>
      </div>
    </section>
  );
}

export default function SyswinHome() {
  return (
    <>
      <Hero />
      <TrustBand />
      <Highlights />
      <CTA />
    </>
  );
}
