import { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from 'framer-motion';
import { skills } from '../content';
import { MaskText, Reveal } from '../ui/primitives';

/** Cell with a soft spotlight that follows the pointer. */
function Cell({ children, className = '', tone = 'plain', delay = 0 }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const glow = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, rgb(var(--signal) / ${tone === 'signal' ? 0 : 0.12}), transparent 70%)`;

  const onMove = (e) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  const tones = {
    plain: 'bg-surface text-ink border border-line/10',
    signal: 'bg-signal text-on-signal',
    ink: 'bg-ink text-paper',
    dots: 'bg-surface text-ink border border-line/10 bg-[radial-gradient(rgb(var(--ink)/0.14)_1px,transparent_1px)] [background-size:18px_18px]',
  };

  return (
    <Reveal delay={delay} className={`relative ${className}`}>
      <div ref={ref} onPointerMove={onMove} className={`relative h-full overflow-hidden rounded-panel p-7 md:p-9 ${tones[tone]}`}>
        <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: glow }} />
        <div className="relative flex h-full flex-col">{children}</div>
      </div>
    </Reveal>
  );
}

function Items({ items, size = 'md' }) {
  const cls = size === 'lg'
    ? 'display text-[clamp(1.5rem,2.6vw,2.4rem)] font-semibold leading-[1.1]'
    : 'text-base md:text-lg';
  return (
    <ul className={`mt-auto flex flex-wrap gap-x-2 gap-y-2 pt-10 ${size === 'lg' ? 'gap-x-4' : ''}`}>
      {items.map((s, i) => (
        <li key={s} className={cls}>
          {s}
          {size === 'lg' && i < items.length - 1 && <span aria-hidden className="opacity-40">,</span>}
        </li>
      ))}
    </ul>
  );
}

function Pills({ items }) {
  return (
    <ul className="mt-auto flex flex-wrap gap-2 pt-10">
      {items.map((s) => (
        <li key={s} className="rounded-full border px-3.5 py-1.5 text-sm [border-color:color-mix(in_srgb,currentColor_28%,transparent)]">
          {s}
        </li>
      ))}
    </ul>
  );
}

export default function Skills() {
  const [spec, langs, platforms, core] = skills;

  return (
    <section id="skills" data-beat aria-labelledby="skills-title" className="shell py-28 md:py-40">
      <h2 id="skills-title" className="sr-only">Technical skills</h2>
      <MaskText
        as="p"
        text="A toolkit for building scalable AI and software systems."
        className="display mb-14 max-w-[20ch] text-[clamp(2.2rem,5vw,4.6rem)] font-bold leading-[0.98] text-ink [font-variation-settings:'opsz'_96,'wdth'_80] md:mb-20"
      />

      <div className="grid auto-rows-[minmax(220px,auto)] gap-4 md:grid-cols-12">
        <Cell tone="signal" className="md:col-span-7 md:row-span-2">
          <h3 className="text-sm font-medium uppercase tracking-[0.14em] opacity-80">{spec.title}</h3>
          <Items items={spec.items} size="lg" />
        </Cell>
        <Cell tone="ink" className="md:col-span-5" delay={0.08}>
          <h3 className="text-sm font-medium uppercase tracking-[0.14em] opacity-70">{langs.title}</h3>
          <Pills items={langs.items} />
        </Cell>
        <Cell tone="dots" className="md:col-span-5" delay={0.16}>
          <h3 className="text-sm font-medium uppercase tracking-[0.14em] text-muted">{platforms.title}</h3>
          <Pills items={platforms.items} />
        </Cell>
        <Cell tone="plain" className="md:col-span-12" delay={0.1}>
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <h3 className="text-sm font-medium uppercase tracking-[0.14em] text-muted md:col-span-3">{core.title}</h3>
            <ul className="flex flex-wrap gap-x-8 gap-y-3 md:col-span-9">
              {core.items.map((c) => (
                <li key={c} className="display text-xl font-medium md:text-2xl">{c}</li>
              ))}
            </ul>
          </div>
        </Cell>
      </div>
    </section>
  );
}
