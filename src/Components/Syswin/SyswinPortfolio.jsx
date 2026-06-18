import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiX, FiGrid, FiList, FiArrowLeft, FiExternalLink } from 'react-icons/fi';
import { productCategories, getProductName, getOneMgLinks } from './productData';
import { ProductImage, Lightbox } from './syswinHelpers';

const ALL_PRODUCTS = productCategories.flatMap((cat) =>
  cat.images.map((img) => ({
    name: getProductName(img),
    image: img,
    category: cat.name,
    slug: cat.slug,
  }))
);

const TOTAL_UNIQUE = new Set(ALL_PRODUCTS.map((p) => p.name)).size;

function PortfolioLightbox({ product, onClose }) {
  if (!product) return null;
  const oneMgLinks = getOneMgLinks(product.name);

  return (
    <Lightbox product={product} onClose={onClose} extraContent={
      oneMgLinks.length > 0 && (
        <div className="sw-lightbox-1mg">
          {oneMgLinks.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="sw-1mg-btn"
            >
              View on 1mg <FiExternalLink size={13} />
            </a>
          ))}
        </div>
      )
    } />
  );
}

export default function SyswinPortfolio() {
  const [search, setSearch] = useState('');
  const [activeSlug, setActiveSlug] = useState('all');
  const [lightboxProduct, setLightboxProduct] = useState(null);
  const [view, setView] = useState('grid');

  const pool = useMemo(() => {
    if (activeSlug === 'all') return ALL_PRODUCTS;
    return ALL_PRODUCTS.filter((p) => p.slug === activeSlug);
  }, [activeSlug]);

  const filtered = useMemo(() => {
    if (!search.trim()) return pool;
    const q = search.toLowerCase();
    return pool.filter((p) => p.name.toLowerCase().includes(q));
  }, [pool, search]);

  const activeCatName = activeSlug === 'all'
    ? 'All Specialities'
    : productCategories.find((c) => c.slug === activeSlug)?.name;

  return (
    <main className="sw-portfolio-page">
      <div className="sw-subpage-header">
        <div className="sw-container">
          <Link to="/syswin" className="sw-back-link">
            <FiArrowLeft size={16} /> Back to Home
          </Link>
          <h1 className="sw-subpage-title">Product Portfolio</h1>
          <p className="sw-portfolio-subtitle">
            {TOTAL_UNIQUE} products across {productCategories.length} specialities. For representative reference only.
          </p>
        </div>
      </div>

      <div className="sw-portfolio-toolbar">
        <div className="sw-container">
          <div className="sw-toolbar-row">
            <div className="sw-search-bar">
              <FiSearch className="sw-search-bar-icon" />
              <input
                type="text"
                placeholder="Search by product name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="sw-search-bar-input"
                aria-label="Search products"
              />
              {search && (
                <button className="sw-search-clear" onClick={() => setSearch('')} aria-label="Clear search">
                  <FiX size={14} />
                </button>
              )}
            </div>
            <div className="sw-toolbar-right">
              <div className="sw-view-toggle">
                <button className={`sw-view-btn ${view === 'grid' ? 'active' : ''}`} onClick={() => setView('grid')} aria-label="Grid view">
                  <FiGrid size={16} />
                </button>
                <button className={`sw-view-btn ${view === 'list' ? 'active' : ''}`} onClick={() => setView('list')} aria-label="List view">
                  <FiList size={16} />
                </button>
              </div>
              <span className="sw-result-count">{filtered.length} results</span>
            </div>
          </div>

          <div className="sw-filter-row">
            <button className={`sw-filter-pill ${activeSlug === 'all' ? 'active' : ''}`} onClick={() => setActiveSlug('all')}>
              All ({ALL_PRODUCTS.length})
            </button>
            {productCategories.map((cat) => (
              <button key={cat.slug} className={`sw-filter-pill ${activeSlug === cat.slug ? 'active' : ''}`} onClick={() => setActiveSlug(cat.slug)}>
                {cat.name} ({cat.images.length})
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="sw-container sw-portfolio-body">
        {search && (
          <p className="sw-search-status">
            {filtered.length === 0
              ? `No products matching "${search}"`
              : `Showing ${filtered.length} result${filtered.length !== 1 ? 's' : ''} for "${search}" in ${activeCatName}`}
          </p>
        )}

        {filtered.length === 0 ? (
          <div className="sw-empty-state">
            <FiSearch size={40} />
            <p>No products found</p>
            <button className="sw-btn-secondary sw-btn-sm" onClick={() => { setSearch(''); setActiveSlug('all'); }}>
              Clear filters
            </button>
          </div>
        ) : view === 'grid' ? (
          <div className="sw-product-grid">
            {filtered.map((product, i) => {
              const has1mg = getOneMgLinks(product.name).length > 0;
              return (
                <article
                  key={`${product.slug}-${product.name}-${i}`}
                  className="sw-product-card sw-card-enter"
                  style={{ animationDelay: `${Math.min(i * 25, 500)}ms` }}
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
                      <span className="sw-product-badge">{product.slug}</span>
                      {has1mg && <span className="sw-1mg-badge">1mg</span>}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="sw-product-list">
            {filtered.map((product, i) => {
              const has1mg = getOneMgLinks(product.name).length > 0;
              return (
                <article
                  key={`${product.slug}-${product.name}-${i}`}
                  className="sw-list-item sw-card-enter"
                  style={{ animationDelay: `${Math.min(i * 20, 400)}ms` }}
                  onClick={() => setLightboxProduct(product)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setLightboxProduct(product)}
                  aria-label={`View ${product.name}`}
                >
                  <div className="sw-list-item-img">
                    <ProductImage src={product.image} alt={`${product.name}, ${product.category}`} loading="lazy" />
                  </div>
                  <div className="sw-list-item-info">
                    <p className="sw-list-item-name">{product.name}</p>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <span className="sw-product-badge">{product.category}</span>
                      {has1mg && <span className="sw-1mg-badge">1mg</span>}
                    </div>
                  </div>
                  <span className="sw-product-label">Portfolio item</span>
                </article>
              );
            })}
          </div>
        )}
      </div>

      <PortfolioLightbox product={lightboxProduct} onClose={() => setLightboxProduct(null)} />
    </main>
  );
}
