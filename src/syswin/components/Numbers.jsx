import { useEffect, useRef } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import { company, stats } from '../data/catalog';
import { Reveal } from '../ui';

function Count({ to }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!inView || !ref.current) return undefined;
    if (reduce) { ref.current.textContent = String(to); return undefined; }
    const c = animate(0, to, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => { if (ref.current) ref.current.textContent = String(Math.round(v)); },
    });
    return () => c.stop();
  }, [inView, to, reduce]);
  return <span ref={ref}>0</span>;
}

const items = [
  { value: stats.products, label: 'Products in the portfolio' },
  { value: stats.specialities, label: 'Clinical specialities served' },
  { value: stats.oneMgListings, label: 'Listings live on 1mg' },
];

export default function Numbers() {
  return (
    <section aria-label="Syswin at a glance" className="sx-shell">
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-sx border border-sx-line/10 bg-sx-line/10 md:grid-cols-4">
        {items.map((it, i) => (
          <Reveal key={it.label} delay={i * 0.06} className="flex flex-col-reverse justify-between gap-6 bg-sx-surface p-6 md:p-9">
            <dt className="text-sm text-sx-muted">{it.label}</dt>
            <dd className="sx-display text-[clamp(3rem,6vw,5.2rem)] font-semibold leading-none tabular-nums text-sx-ink">
              <Count to={it.value} />
            </dd>
          </Reveal>
        ))}
        <Reveal delay={0.18} className="flex flex-col-reverse justify-between gap-6 bg-sx-brand p-6 text-sx-on-brand md:p-9">
          <dt className="text-sm opacity-80">Quality management certification</dt>
          <dd className="sx-display text-[clamp(1.9rem,3vw,2.8rem)] font-semibold leading-none">{company.iso}</dd>
        </Reveal>
      </dl>
    </section>
  );
}
