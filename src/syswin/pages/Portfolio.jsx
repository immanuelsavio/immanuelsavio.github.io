import { forwardRef, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, MagnifyingGlass, X } from '@phosphor-icons/react';
import { countIn, products, specialities, specialityName, stats } from '../data/catalog';
import ProductSheet from '../components/ProductSheet';
import { EASE, Headline, Pack, Reveal } from '../ui';

const STEP = 18;

const matches = (p, q) => {
  if (!q) return true;
  const hay = `${p.name} ${p.raw} ${p.specialities.map(specialityName).join(' ')} ${p.oneMg.map((l) => l.label).join(' ')}`.toLowerCase();
  return q.toLowerCase().split(/\s+/).every((w) => hay.includes(w));
};

// forwardRef: AnimatePresence popLayout measures each card through a ref.
const Card = forwardRef(function Card({ p, onOpen, index }, ref) {
  const reduce = useReducedMotion();
  return (
    <motion.li
      ref={ref}
      layout={!reduce}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, ease: EASE, delay: Math.min(index % STEP, 8) * 0.03 }}
    >
      <button
        type="button"
        onClick={() => onOpen(p.id)}
        className="group flex h-full w-full flex-col overflow-hidden rounded-sx bg-sx-surface text-left ring-1 ring-sx-line/10 transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_30px_60px_-32px_rgb(10_22_48/0.4)]"
        aria-label={`${p.name}, open product sheet`}
      >
        <Pack product={p} className="aspect-[16/10] p-6 transition-transform duration-700 group-hover:scale-[1.02]" />
        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-start justify-between gap-3">
            <span className="sx-display text-xl font-semibold text-sx-ink">{p.name}</span>
            {p.oneMg.length > 0 && (
              <span className="shrink-0 rounded-full border border-sx-line/15 px-2 py-0.5 text-xs text-sx-muted">1mg</span>
            )}
          </div>
          <p className="mt-auto text-sm text-sx-muted">{p.specialities.map(specialityName).join(', ')}</p>
        </div>
      </button>
    </motion.li>
  );
});

export default function Portfolio() {
  const [params, setParams] = useSearchParams();
  const cat = params.get('cat') ?? 'all';
  const q = params.get('q') ?? '';
  const productId = params.get('product');
  const [shown, setShown] = useState(STEP);

  const update = (next) => {
    const p = new URLSearchParams(params);
    Object.entries(next).forEach(([k, v]) => (v ? p.set(k, v) : p.delete(k)));
    setParams(p, { replace: true });
  };

  const filtered = useMemo(
    () => products.filter((p) => (cat === 'all' || p.specialities.includes(cat)) && matches(p, q.trim())),
    [cat, q],
  );

  useEffect(() => { setShown(STEP); }, [cat, q]);

  // The sheet navigates within the current results, or the whole catalogue if opened by link.
  const list = filtered.some((p) => p.id === productId) ? filtered : products;
  const idx = list.findIndex((p) => p.id === productId);
  const current = idx >= 0 ? list[idx] : null;
  const go = (d) => update({ product: list[(idx + d + list.length) % list.length].id });

  const tabs = [{ slug: 'all', name: 'All', count: products.length }, ...specialities.map((s) => ({ ...s, count: countIn(s.slug) }))];

  return (
    <>
      <section className="sx-shell pb-10 pt-36 md:pt-44">
        <Headline
          as="h1"
          animateOnMount
          lines={['Product portfolio']}
          className="text-[clamp(3rem,9vw,8.4rem)] font-semibold leading-[0.9] text-sx-ink"
        />
        <Reveal as="p" delay={0.25} className="mt-6 max-w-2xl text-lg text-sx-muted md:text-xl">
          {stats.products} products across {stats.specialities} specialities. Open any product for its label, detail sheet and 1mg listing.
        </Reveal>
      </section>

      {/* Filter bar sticks under the nav while browsing */}
      <div className="sticky top-[84px] z-30 border-y border-sx-line/10 bg-sx-paper/85 backdrop-blur-xl">
        <div className="sx-shell flex flex-col gap-3 py-3 lg:flex-row lg:items-center lg:justify-between">
          <div role="tablist" aria-label="Filter by speciality" className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1 lg:pb-0" data-lenis-prevent>
            {tabs.map((t) => {
              const on = cat === t.slug;
              return (
                <button
                  key={t.slug}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => update({ cat: t.slug === 'all' ? null : t.slug })}
                  className={`relative flex h-10 shrink-0 items-center gap-2 rounded-full px-4 text-sm transition-colors ${on ? 'text-sx-on-brand' : 'text-sx-muted hover:text-sx-ink'}`}
                >
                  {on && <motion.span layoutId="sx-tab" className="absolute inset-0 rounded-full bg-sx-brand" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                  <span className="relative">{t.name}</span>
                  <span className={`relative sx-mono text-xs tabular-nums ${on ? 'opacity-80' : 'opacity-60'}`}>{t.count}</span>
                </button>
              );
            })}
          </div>
          <div className="relative w-full lg:w-80">
            <label htmlFor="sx-search" className="sr-only">Search products</label>
            <MagnifyingGlass size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sx-muted" aria-hidden />
            <input
              id="sx-search"
              type="search"
              value={q}
              onChange={(e) => update({ q: e.target.value || null })}
              placeholder="Search by name, speciality or strength…"
              autoComplete="off"
              spellCheck={false}
              className="h-11 w-full rounded-full border border-sx-line/15 bg-sx-surface pl-11 pr-10 text-sm text-sx-ink placeholder:text-sx-muted/80 focus:border-sx-brand focus:outline-none"
            />
            {q && (
              <button type="button" onClick={() => update({ q: null })} aria-label="Clear search" className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-sx-muted hover:bg-sx-ink/5 hover:text-sx-ink">
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      <section aria-label="Products" className="sx-shell pb-28 pt-10 md:pb-40">
        <p className="mb-6 text-sm text-sx-muted" aria-live="polite">
          {filtered.length === products.length ? `All ${products.length} products` : `${filtered.length} of ${products.length} products`}
          {cat !== 'all' && ` in ${specialityName(cat)}`}
          {q && ` matching “${q}”`}
        </p>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-start gap-5 rounded-sx border border-dashed border-sx-line/20 p-10 md:p-16">
            <MagnifyingGlass size={32} className="text-sx-muted" aria-hidden />
            <p className="sx-display text-3xl font-semibold text-sx-ink">No products match &ldquo;{q}&rdquo;.</p>
            <p className="max-w-md text-sx-muted">Try a brand name like Telwis or Winmega, a strength like 40, or clear the filters to see everything.</p>
            <button type="button" onClick={() => update({ q: null, cat: null })} className="rounded-full bg-sx-ink px-5 py-3 text-sm font-medium text-sx-paper hover:bg-sx-brand hover:text-sx-on-brand">
              Clear search and filters
            </button>
          </div>
        ) : (
          <>
            <motion.ul layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filtered.slice(0, shown).map((p, i) => (
                  <Card key={p.id} p={p} index={i} onOpen={(id) => update({ product: id })} />
                ))}
              </AnimatePresence>
            </motion.ul>
            {shown < filtered.length && (
              <div className="mt-12 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShown((n) => n + STEP)}
                  className="inline-flex h-14 items-center gap-2 rounded-full border border-sx-line/20 px-7 font-medium text-sx-ink transition-colors hover:border-sx-ink hover:bg-sx-ink hover:text-sx-paper"
                >
                  Show more <span className="sx-mono text-sm opacity-70">{filtered.length - shown} left</span>
                </button>
              </div>
            )}
          </>
        )}

        <p className="mt-16 flex items-center gap-2 text-sm text-sx-muted">
          <ArrowUpRight size={14} aria-hidden /> 1mg badges link to the public 1mg listing for that product.
        </p>
      </section>

      <ProductSheet
        product={current}
        position={current ? `${idx + 1} / ${list.length}` : ''}
        onClose={() => update({ product: null })}
        onPrev={() => go(-1)}
        onNext={() => go(1)}
      />
    </>
  );
}
