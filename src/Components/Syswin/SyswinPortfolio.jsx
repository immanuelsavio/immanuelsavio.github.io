import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiX, FiExternalLink, FiArrowLeft } from 'react-icons/fi';
import { productCategories, getProductName, getOneMgLinks } from './productData';
import { R, Img, Lightbox } from './syswinHelpers';

const ALL = productCategories.flatMap((c) =>
  c.images.map((img) => ({ name: getProductName(img), image: img, category: c.name, slug: c.slug }))
);

export default function SyswinPortfolio() {
  const [slug, setSlug] = useState('all');
  const [q, setQ] = useState('');
  const [modal, setModal] = useState(null);

  const pool = useMemo(() => slug === 'all' ? ALL : ALL.filter((p) => p.slug === slug), [slug]);
  const filtered = useMemo(() => {
    if (!q.trim()) return pool;
    const s = q.toLowerCase();
    return pool.filter((p) => p.name.toLowerCase().includes(s));
  }, [pool, q]);
  const links = modal ? getOneMgLinks(modal.name) : [];

  return (
    <main className="sw-portfolio-page">
      <div className="sw-wrap" style={{ padding: '2rem 2rem 0', paddingTop: 'calc(72px + 2rem)' }}>
        <Link to="/syswin" className="sw-back-link"><FiArrowLeft size={14} /> Home</Link>
      </div>

      <section className="sw-sect" style={{ paddingTop: '2rem' }}>
        <div className="sw-wrap">
          <R><span className="sw-eyebrow">Product portfolio</span></R>
          <R delay={60}><h2 className="sw-heading">A practical portfolio across everyday specialities</h2></R>
          <R delay={100}><p className="sw-subhead">Browse Syswin's representative product range by speciality. 1mg references are included where available.</p></R>
        </div>
      </section>

      <div className="sw-portfolio-bar">
        <div className="sw-wrap">
          <div className="sw-bar-top">
            <div className="sw-search">
              <FiSearch className="sw-search-ico" />
              <input type="text" placeholder="Search products..." value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search" />
              {q && <button className="sw-search-x" onClick={() => setQ('')} aria-label="Clear"><FiX size={12} /></button>}
            </div>
            <span className="sw-bar-count">{filtered.length} items</span>
          </div>
          <div className="sw-pills">
            <button className={`sw-pill${slug === 'all' ? ' on' : ''}`} onClick={() => setSlug('all')}>All</button>
            {productCategories.map((c) => (
              <button key={c.slug} className={`sw-pill${slug === c.slug ? ' on' : ''}`} onClick={() => setSlug(c.slug)}>{c.name}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="sw-wrap" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        {filtered.length === 0 ? (
          <div className="sw-empty">No products match your search.</div>
        ) : (
          <>
            <div className="sw-grid">
              {filtered.map((p, i) => {
                const has1mg = getOneMgLinks(p.name).length > 0;
                return (
                  <article key={`${p.slug}-${i}`} className="sw-card" style={{ animationDelay: `${Math.min(i * 22, 480)}ms` }} onClick={() => setModal(p)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setModal(p)}>
                    <div className="sw-card-img"><Img src={p.image} alt={`${p.name}, ${p.category}`} loading="lazy" /></div>
                    <div className="sw-card-body">
                      <p className="sw-card-name" title={p.name}>{p.name}</p>
                      <div className="sw-card-foot">
                        <span className="sw-card-cat">{p.slug}</span>
                        {has1mg && <span className="sw-card-1mg"><FiExternalLink size={9} /> 1mg</span>}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
            <p className="sw-grid-status">Showing {filtered.length} of {pool.length} items</p>
          </>
        )}
      </div>

      <Lightbox product={modal} onClose={() => setModal(null)}>
        {links.length > 0 && (
          <div className="sw-lb-1mg">
            {links.map((l) => (
              <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer">View on 1mg <FiExternalLink size={12} /></a>
            ))}
          </div>
        )}
      </Lightbox>
    </main>
  );
}
