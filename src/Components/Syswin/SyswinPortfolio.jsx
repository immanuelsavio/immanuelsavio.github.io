import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FiSearch, FiX, FiExternalLink, FiArrowLeft, FiChevronLeft, FiChevronRight, FiMaximize2 } from 'react-icons/fi';
import { productCategories, getProductName, getOneMgLinks, getVisualAidUrl } from './productData';
import { R, Img, Lightbox } from './syswinHelpers';

const ALL = productCategories.flatMap((c) =>
  c.images.map((img) => ({
    name: getProductName(img),
    image: img,
    category: c.name,
    slug: c.slug,
    searchText: [
      getProductName(img),
      c.name,
      c.slug,
      getProductName(img).replace(/[-_]/g, ' '),
      getProductName(img).replace(/…/g, ''),
    ].join(' ').toLowerCase(),
  }))
);

const PER_PAGE = 24;

export default function SyswinPortfolio() {
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get('cat') || 'all';
  const [slug, setSlug] = useState(initialCat);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(null);

  const pool = useMemo(() => slug === 'all' ? ALL : ALL.filter((p) => p.slug === slug), [slug]);
  const filtered = useMemo(() => {
    if (!q.trim()) return pool;
    const s = q.toLowerCase();
    return pool.filter((p) => p.searchText.includes(s));
  }, [pool, q]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const pageItems = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  useEffect(() => setPage(1), [slug, q]);

  const oneMgLink = modal ? getOneMgLinks(modal.name)[0] || null : null;
  const visualAid = modal ? getVisualAidUrl(modal.image, modal.slug) : null;

  return (
    <main className="sw-portfolio-page">
      <div className="sw-wrap" style={{ padding: '2rem 2rem 0', paddingTop: 'calc(72px + 2rem)' }}>
        <Link to="/syswin" className="sw-back-link"><FiArrowLeft size={14} /> Home</Link>
      </div>

      <section className="sw-sect" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div className="sw-wrap">
          <R><span className="sw-eyebrow">Product portfolio</span></R>
          <R delay={60}><h2 className="sw-heading">A practical portfolio across everyday specialities</h2></R>
          <R delay={100}><p className="sw-subhead">Browse Syswin's representative product range by speciality. 1mg references included where available.</p></R>
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
            <span className="sw-bar-count">Showing {filtered.length} of {ALL.length} entries</span>
          </div>
          <div className="sw-pills">
            <button className={`sw-pill${slug === 'all' ? ' on' : ''}`} onClick={() => setSlug('all')}>All ({ALL.length})</button>
            {productCategories.map((c) => (
              <button key={c.slug} className={`sw-pill${slug === c.slug ? ' on' : ''}`} onClick={() => setSlug(c.slug)}>{c.name} ({c.images.length})</button>
            ))}
          </div>
        </div>
      </div>

      <div className="sw-wrap" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
        {filtered.length === 0 ? (
          <div className="sw-empty">No products match your search.</div>
        ) : (
          <>
            <div className="sw-grid sw-grid-lg">
              {pageItems.map((p, i) => {
                const has1mg = getOneMgLinks(p.name).length > 0;
                return (
                  <article key={`${p.slug}-${p.name}-${i}`} className="sw-card" onClick={() => setModal(p)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setModal(p)}>
                    <div className="sw-card-img sw-card-img-lg">
                      <Img src={p.image} alt={`${p.name}, ${p.category}`} loading="lazy" />
                    </div>
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

            {totalPages > 1 && (
              <div className="sw-pagination">
                <button disabled={page <= 1} onClick={() => setPage(page - 1)} className="sw-page-btn" aria-label="Previous">
                  <FiChevronLeft size={16} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button key={n} className={`sw-page-btn${n === page ? ' on' : ''}`} onClick={() => setPage(n)}>{n}</button>
                ))}
                <button disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="sw-page-btn" aria-label="Next">
                  <FiChevronRight size={16} />
                </button>
              </div>
            )}

            <p className="sw-grid-status">Page {page} of {totalPages}</p>
          </>
        )}
      </div>

      {modal && (
        <div className="sw-lb" onClick={() => setModal(null)}>
          <div className="sw-lb-full" onClick={(e) => e.stopPropagation()}>
            <button className="sw-lb-x" onClick={() => setModal(null)} aria-label="Close">&times;</button>
            <div className="sw-lb-hero-img">
              <Img src={modal.image} alt={modal.name} className="sw-lb-big" />
            </div>
            <div className="sw-lb-bar">
              <div className="sw-lb-info">
                <p className="sw-lb-name">{modal.name}</p>
                <p className="sw-lb-cat">{modal.category}</p>
              </div>
              <div className="sw-lb-actions">
                {visualAid && (
                  <a href={visualAid} target="_blank" rel="noopener noreferrer" className="sw-lb-action-btn">
                    <FiMaximize2 size={14} /> View detail sheet
                  </a>
                )}
                {oneMgLink && (
                  <a href={oneMgLink.url} target="_blank" rel="noopener noreferrer" className="sw-lb-action-link">
                    View on 1mg <FiExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
            <p className="sw-lb-note">For portfolio reference only. Please refer to approved prescribing information.</p>
          </div>
        </div>
      )}
    </main>
  );
}
