import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Reveal } from './syswinHelpers';

export default function SyswinAbout() {
  return (
    <main className="sw-subpage">
      <div className="sw-subpage-header">
        <div className="sw-container">
          <Link to="/syswin" className="sw-back-link">
            <FiArrowLeft size={16} /> Back to Home
          </Link>
          <h1 className="sw-subpage-title">About Syswin</h1>
        </div>
      </div>

      <section className="sw-section">
        <div className="sw-container">
          <Reveal>
            <span className="sw-section-label">About</span>
            <h2 className="sw-section-title">Built for dependable everyday healthcare</h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="sw-section-desc">
              Syswin Pharmaceuticals was founded with a clear belief: everyday medicines
              should be reliable, available, and priced within reach of the people who
              need them. Based in Bengaluru, Syswin focuses on pharmaceutical distribution
              and marketing across practical, high-demand therapeutic categories. Instead
              of chasing complexity, the company stays focused on what matters most to
              doctors, pharmacists, and patients: consistent supply, trusted quality,
              ethical representation, and affordable access.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="sw-section sw-section-alt">
        <div className="sw-container">
          <div className="sw-about-grid">
            <Reveal>
              <div className="sw-about-card">
                <span className="sw-story-badge">Brand Story · Mockup Copy</span>
                <h3>A focused company, built from big-pharma experience</h3>
                <p>
                  Syswin began with three experienced pharmaceutical professionals who
                  had spent years inside larger pharma organizations. They understood the
                  strengths of big pharma (strong systems, quality discipline, and scale)
                  but they also saw where everyday healthcare often needed more focus.
                </p>
                <br />
                <p>
                  They wanted to build a company closer to the ground: closer to doctors,
                  closer to pharmacists, and closer to the daily medicines people actually
                  depend on. That idea became Syswin, a smaller, sharper, distribution-first
                  company built around practical medicines, responsible relationships, and
                  long-term trust.
                </p>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="sw-about-card">
                <h3>Focused where access matters most</h3>
                <p>
                  Syswin does not position itself as a drug discovery company. Its strength
                  is in identifying, representing, and distributing dependable medicines
                  across everyday clinical needs. By staying focused on distribution and
                  portfolio clarity, Syswin can give representatives a cleaner product
                  range, help doctors access relevant options faster, and support pharmacies
                  with medicines designed for regular public use.
                </p>
                <br />
                <p>
                  The goal is simple: high-quality medicines, available consistently,
                  at prices that make sense for real people.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="sw-section">
        <div className="sw-container">
          <Reveal>
            <span className="sw-section-label">Purpose</span>
            <h2 className="sw-section-title">Mission, vision & values</h2>
          </Reveal>
          <div className="sw-mvv-grid">
            <Reveal delay={100}>
              <div className="sw-mvv-card">
                <h3><span style={{ color: 'var(--sw-blue)' }}>&#9670;</span> Mission</h3>
                <p>
                  To improve access to high-quality everyday medicines through focused
                  distribution, ethical relationships, and affordable pricing.
                </p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="sw-mvv-card">
                <h3><span style={{ color: 'var(--sw-blue)' }}>&#11045;</span> Vision</h3>
                <p>
                  To become a trusted name for doctors, pharmacists, and patients seeking
                  dependable medicines for routine healthcare needs.
                </p>
              </div>
            </Reveal>
          </div>
          <div className="sw-values-grid">
            {['Quality first', 'Ethical representation', 'Affordability', 'Reliable supply', 'Focused portfolio', 'Long-term trust'].map((v, i) => (
              <Reveal key={v} delay={100 + i * 50}>
                <div className="sw-value-item">
                  <span className="sw-value-dot" /> {v}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sw-section sw-section-alt">
        <div className="sw-container">
          <Reveal>
            <span className="sw-section-label">Commitment</span>
            <h2 className="sw-section-title">Quality & affordability</h2>
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
    </main>
  );
}
