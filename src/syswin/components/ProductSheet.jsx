import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, ArrowUpRight, ArrowsOut, FileText, X,
} from '@phosphor-icons/react';
import { specialityName } from '../data/catalog';
import { useSx } from '../context';
import { EASE, Pack } from '../ui';

function DetailViewer({ src, name, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') { e.stopImmediatePropagation(); onClose(); } };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [onClose]);
  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${name} detail sheet`}
      className="fixed inset-0 z-[90] flex flex-col bg-[#081126]/95 backdrop-blur"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex items-center justify-between px-5 py-4 text-white">
        <p className="font-medium">{name} detail sheet</p>
        <button type="button" onClick={onClose} aria-label="Close detail sheet" className="grid h-11 w-11 place-items-center rounded-full bg-white text-[#0A1630]">
          <X size={18} />
        </button>
      </div>
      <div className="flex-1 overflow-auto px-4 pb-8" data-lenis-prevent>
        <img src={src} alt={`${name} visual aid with indications and composition`} className="mx-auto h-auto w-full max-w-3xl rounded-2xl bg-white" />
      </div>
    </motion.div>
  );
}

/** Slide-over product sheet. Arrow keys move between products, Escape closes. */
export default function ProductSheet({ product, onClose, onPrev, onNext, position }) {
  const { lenis } = useSx();
  const closeRef = useRef(null);
  const [viewer, setViewer] = useState(false);
  // Latest handlers, read by the key listener so it never goes stale between products.
  const handlers = useRef({ onClose, onPrev, onNext });
  handlers.current = { onClose, onPrev, onNext };

  useEffect(() => { setViewer(false); }, [product?.id]);

  const open = !!product;
  useEffect(() => {
    if (!open) return undefined;
    lenis?.stop();
    const prevFocus = document.activeElement;
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') handlers.current.onClose();
      else if (e.key === 'ArrowLeft') handlers.current.onPrev();
      else if (e.key === 'ArrowRight') handlers.current.onNext();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      lenis?.start();
      window.removeEventListener('keydown', onKey);
      if (prevFocus instanceof HTMLElement) prevFocus.focus();
    };
  }, [open, lenis]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div className="fixed inset-0 z-[70]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button type="button" aria-label="Close product sheet" onClick={onClose} className="absolute inset-0 h-full w-full cursor-default bg-[#081126]/45 backdrop-blur-[2px]" />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="sx-sheet-title"
            className="absolute inset-y-0 right-0 flex w-full max-w-[640px] flex-col overflow-hidden bg-sx-paper shadow-[-30px_0_80px_-20px_rgb(8_17_38/0.4)] sm:rounded-l-[28px]"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <header className="flex items-center justify-between gap-3 border-b border-sx-line/10 px-5 py-4 sm:px-8">
              <span className="sx-mono text-sm tabular-nums text-sx-muted">{position}</span>
              <div className="flex items-center gap-2">
                <button type="button" onClick={onPrev} aria-label="Previous product" className="grid h-10 w-10 place-items-center rounded-full border border-sx-line/15 text-sx-ink hover:border-sx-ink"><ArrowLeft size={16} /></button>
                <button type="button" onClick={onNext} aria-label="Next product" className="grid h-10 w-10 place-items-center rounded-full border border-sx-line/15 text-sx-ink hover:border-sx-ink"><ArrowRight size={16} /></button>
                <button ref={closeRef} type="button" onClick={onClose} aria-label="Close product sheet" className="grid h-10 w-10 place-items-center rounded-full bg-sx-ink text-sx-paper"><X size={16} /></button>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto px-5 pb-10 pt-8 sm:px-8" data-lenis-prevent>
              <AnimatePresence mode="wait">
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <ul className="flex flex-wrap gap-2" aria-label="Specialities">
                    {product.specialities.map((s) => (
                      <li key={s} className="rounded-full bg-sx-brand/10 px-3 py-1 text-sm font-medium text-sx-brand">{specialityName(s)}</li>
                    ))}
                  </ul>
                  <h2 id="sx-sheet-title" className="sx-display mt-5 text-5xl font-semibold leading-none text-sx-ink">{product.name}</h2>

                  <Pack product={product} loading="eager" className="mt-8 rounded-sx p-8 ring-1 ring-sx-line/10" />

                  {product.visualAid && (
                    <section className="mt-8" aria-label="Detail sheet">
                      <button
                        type="button"
                        onClick={() => setViewer(true)}
                        className="group relative block w-full overflow-hidden rounded-sx bg-white text-left ring-1 ring-sx-line/10"
                      >
                        <img src={product.visualAid} alt="" loading="lazy" className="h-72 w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" />
                        <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-[#081126]/85 to-transparent px-5 pb-4 pt-16 text-white">
                          <span className="flex items-center gap-2 font-medium"><FileText size={18} aria-hidden /> Open detail sheet</span>
                          <ArrowsOut size={18} aria-hidden />
                        </span>
                      </button>
                    </section>
                  )}

                  {product.oneMg.length > 0 && (
                    <section className="mt-8" aria-labelledby="sx-1mg">
                      <h3 id="sx-1mg" className="text-sm font-medium text-sx-muted">Available on 1mg</h3>
                      <ul className="mt-3 divide-y divide-sx-line/10 rounded-sx bg-sx-surface ring-1 ring-sx-line/10">
                        {product.oneMg.map((l) => (
                          <li key={l.url}>
                            <a href={l.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 px-5 py-4 text-sx-ink hover:text-sx-brand">
                              <span>{l.label}</span>
                              <ArrowUpRight size={16} className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}

                  <p className="mt-10 border-t border-sx-line/10 pt-6 text-sm leading-relaxed text-sx-muted">
                    For healthcare professionals. Shown for portfolio reference only; refer to the approved prescribing information before use.
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.aside>

          <AnimatePresence>
            {viewer && product.visualAid && (
              <DetailViewer src={product.visualAid} name={product.name} onClose={() => setViewer(false)} />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
