import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { R } from './syswinHelpers';

function About() {
  const principles = [
    ['Focused portfolio', 'Practical medicines for everyday clinical needs'],
    ['Ethical representation', 'Honest, transparent doctor-rep relationships'],
    ['Consistent availability', 'Distribution-first supply reliability'],
    ['Affordable access', 'Quality medicines at responsible prices'],
  ];
  return (
    <section className="sw-sect">
      <div className="sw-wrap">
        <R><span className="sw-eyebrow">About Syswin</span></R>
        <R delay={60}><h2 className="sw-heading">Built for dependable everyday healthcare</h2></R>
        <div className="sw-about-layout">
          <R delay={100}>
            <div className="sw-about-body">
              <p>Syswin Pharmaceuticals was founded on a simple belief: everyday medicines should be reliable, available, and priced within reach of the people who need them.</p>
              <p>Based in Bengaluru, Syswin focuses on pharmaceutical distribution and marketing across practical, high-demand therapeutic categories. The company stays close to what matters most to doctors, pharmacists, and patients: consistent supply, trusted quality, ethical representation, and affordable access.</p>
            </div>
          </R>
          <R delay={180}>
            <div className="sw-about-aside">
              <h3>Distribution-first by design</h3>
              {principles.map(([t, d], i) => (
                <div key={i} className="sw-aside-item">
                  <span className="sw-aside-num">0{i + 1}</span>
                  <div><div className="sw-aside-title">{t}</div><div className="sw-aside-desc">{d}</div></div>
                </div>
              ))}
            </div>
          </R>
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="sw-sect sw-sect-alt">
      <div className="sw-wrap">
        <R>
          <div className="sw-story">
            <span className="sw-story-badge">Brand story · mockup copy</span>
            <h3>A focused company, built from big-pharma experience</h3>
            <div className="sw-story-body">
              <p>Syswin began with three experienced pharmaceutical professionals who had spent years inside larger pharma organizations. They understood the value of strong systems, quality discipline, and scale, but they also saw that everyday healthcare often needed more focus.</p>
              <p>They wanted to build a company closer to the ground: closer to doctors, closer to pharmacists, and closer to the daily medicines people actually depend on.</p>
              <p>That idea became Syswin, a smaller, sharper, distribution-first company built around practical medicines, responsible relationships, and long-term trust.</p>
            </div>
          </div>
        </R>
      </div>
    </section>
  );
}

function Distribution() {
  const items = [
    ['Focused portfolio', 'A practical range across everyday clinical needs.'],
    ['Clear rep materials', 'Simple portfolio information for focused doctor conversations.'],
    ['Consistent supply', 'A distribution-led model built around availability.'],
    ['Affordable access', 'Quality medicines positioned for regular public use.'],
  ];
  return (
    <section className="sw-sect">
      <div className="sw-wrap">
        <R><span className="sw-eyebrow">How we work</span></R>
        <R delay={60}><h2 className="sw-heading">Distribution-first, by design</h2></R>
        <R delay={100}><p className="sw-subhead">Syswin focuses on making practical medicines easier to represent, easier to access, and easier to keep available.</p></R>
        <div className="sw-bento">
          {items.map(([title, desc], i) => (
            <R key={title} delay={80 + i * 70}>
              <div className={`sw-bento-item${i === 0 ? ' sw-bento-hero' : ''}`}>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            </R>
          ))}
        </div>
      </div>
    </section>
  );
}

function Quality() {
  const items = [
    ['Quality-first portfolio discipline', 'Every product sourced from established manufacturers, meeting applicable regulatory standards.'],
    ['Ethical doctor-rep communication', 'Clean, transparent product information designed for professional clinical conversations.'],
    ['Affordable everyday access', 'Focused operations keep pricing honest, passing savings to the people who need them.'],
  ];
  return (
    <section className="sw-sect sw-sect-alt">
      <div className="sw-wrap">
        <R><span className="sw-eyebrow">Commitment</span></R>
        <R delay={60}><h2 className="sw-heading">Quality, access, and trust</h2></R>
        <div className="sw-qual-row">
          {items.map(([title, desc], i) => (
            <R key={i} delay={80 + i * 80}>
              <div className="sw-qual">
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            </R>
          ))}
        </div>
        <R delay={320}><p className="sw-iso">Brand materials reference ISO 9001:2015.</p></R>
      </div>
    </section>
  );
}

export default function SyswinAbout() {
  return (
    <main style={{ paddingTop: '72px' }}>
      <div className="sw-wrap" style={{ padding: '2rem 2rem 0' }}>
        <Link to="/syswin" className="sw-back-link"><FiArrowLeft size={14} /> Home</Link>
      </div>
      <About />
      <Story />
      <Distribution />
      <Quality />
    </main>
  );
}
