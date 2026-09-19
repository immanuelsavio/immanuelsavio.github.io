import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react';
import { countIn, products, specialities } from '../data/catalog';
import { EASE, Headline, Pack } from '../ui';

// Fan layout for the preview stack: back cards tilt out, front card sits square.
const FAN = [
  { rotate: -9, x: '-14%', y: '10%', scale: 0.86, z: 1 },
  { rotate: 7, x: '14%', y: '6%', scale: 0.9, z: 2 },
  { rotate: -3, x: '-4%', y: '-4%', scale: 0.95, z: 3 },
  { rotate: 0, x: '0%', y: '-14%', scale: 1, z: 4 },
];

function Stack({ slug }) {
  const reduce = useReducedMotion();
  const picks = useMemo(() => products.filter((p) => p.specialities.includes(slug)).slice(0, 4), [slug]);
  return (
    <div className="relative mx-auto aspect-[5/4] w-full max-w-[560px]">
      <AnimatePresence mode="popLayout">
        {picks.map((p, i) => {
          const f = FAN[i + (4 - picks.length)];
          return (
            <motion.div
              key={`${slug}-${p.id}`}
              className="absolute inset-x-[8%] top-[24%]"
              style={{ zIndex: f.z }}
              initial={reduce ? false : { opacity: 0, y: 60, rotate: f.rotate * 2, scale: 0.8 }}
              animate={{ opacity: 1, x: f.x, y: f.y, rotate: f.rotate, scale: f.scale }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -40, scale: 0.9, transition: { duration: 0.3 } }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.06 }}
            >
              <Pack product={p} className="rounded-2xl p-4 shadow-[0_30px_60px_-30px_rgb(10_22_48/0.45)] ring-1 ring-sx-line/10 md:p-6" />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export default function Specialities() {
  const [active, setActive] = useState(specialities[0].slug);
  const current = specialities.find((s) => s.slug === active);

  return (
    <section aria-labelledby="sx-spec-title" className="sx-shell py-28 md:py-40">
      <div className="mb-14 max-w-3xl md:mb-20">
        <Headline
          lines={['Six specialities.', 'One dependable partner.']}
          className="text-[clamp(2.4rem,5.4vw,4.8rem)] font-semibold leading-[0.98] text-sx-ink"
        />
        <h2 id="sx-spec-title" className="sr-only">Specialities</h2>
      </div>

      <div className="grid gap-12 md:grid-cols-12 md:gap-10">
        <ul className="md:col-span-6" role="tablist" aria-label="Specialities">
          {specialities.map((s) => {
            const on = s.slug === active;
            return (
              <li key={s.slug} className="border-t border-sx-line/10 last:border-b">
                <button
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls="sx-spec-panel"
                  onClick={() => setActive(s.slug)}
                  onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(s.slug)}
                  onFocus={() => setActive(s.slug)}
                  className="group flex w-full items-center gap-6 py-5 text-left md:py-6"
                >
                  <span className={`sx-display flex-1 text-[clamp(1.8rem,3.4vw,3rem)] font-semibold leading-none transition-colors duration-300 ${on ? 'text-sx-ink' : 'text-sx-ink/30 group-hover:text-sx-ink/60'}`}>
                    {s.name}
                  </span>
                  <span className={`sx-mono text-sm tabular-nums transition-colors ${on ? 'text-sx-brand' : 'text-sx-muted'}`}>
                    {countIn(s.slug)} products
                  </span>
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-all duration-300 ${on ? 'bg-sx-brand text-sx-on-brand' : 'bg-transparent text-sx-muted'}`}>
                    <ArrowRight size={16} aria-hidden />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div id="sx-spec-panel" role="tabpanel" aria-live="polite" className="md:col-span-6">
          <div className="md:sticky md:top-28">
            <div className="relative overflow-hidden rounded-sx bg-sx-surface p-6 ring-1 ring-sx-line/10 md:p-10">
              <div aria-hidden className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_45%,rgb(var(--sx-brand)/0.10),transparent)]" />
              <Stack slug={active} />
              <div className="relative mt-4 flex flex-wrap items-end justify-between gap-6">
                <div className="max-w-sm">
                  <p className="sx-display text-2xl font-semibold text-sx-ink">{current.name}</p>
                  <p className="mt-2 text-sx-muted">{current.blurb}</p>
                </div>
                <Link
                  to={`/syswin/portfolio?cat=${current.slug}`}
                  className="group inline-flex items-center gap-2 rounded-full bg-sx-ink px-5 py-3 text-sm font-medium text-sx-paper transition-colors hover:bg-sx-brand hover:text-sx-on-brand"
                >
                  View {countIn(current.slug)} products
                  <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
