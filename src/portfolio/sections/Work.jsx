import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Certificate, Flask,
} from '@phosphor-icons/react';
import { patents, projects } from '../content';
import { useSmoothScroll } from '../lib/smooth-scroll';
import { useBeats } from '../lib/section-pager';

function ProjectPanel({ p }) {
  const Tag = p.link ? 'a' : 'div';
  return (
    <Tag
      {...(p.link ? { href: p.link, target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-panel border border-line/10 bg-surface p-7 transition-colors duration-500 hover:border-line/30 md:p-10"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="inline-flex items-center gap-2 text-sm text-muted"><Flask size={16} aria-hidden /> Project</span>
        <span className="font-mono text-sm text-muted">{p.dates}</span>
      </div>
      <h3 className="display mt-10 text-[clamp(2.2rem,4vw,3.8rem)] font-bold leading-[0.95] text-ink [font-variation-settings:'opsz'_96,'wdth'_80]">
        {p.title}
      </h3>
      {p.subtitle && <p className="mt-4 max-w-[36ch] text-lg text-muted">{p.subtitle}</p>}
      <ul className="mt-auto space-y-3 pt-10">
        {p.highlights.map((h) => (
          <li key={h} className="flex gap-3 text-ink/85">
            <span aria-hidden className="mt-[0.6em] h-px w-4 shrink-0 bg-signal" />
            <span>{h}</span>
          </li>
        ))}
      </ul>
      {p.link && (
        <span className="mt-8 inline-flex items-center gap-2 font-medium text-ink">
          View on GitHub
          <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      )}
    </Tag>
  );
}

function PatentPanel({ p }) {
  const granted = p.status === 'Granted';
  return (
    <a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex h-full w-full flex-col overflow-hidden rounded-panel p-7 transition-transform duration-500 md:p-10 ${
        granted ? 'bg-signal text-on-signal' : 'border border-line/10 bg-ink text-paper'
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="inline-flex items-center gap-2 text-sm opacity-80"><Certificate size={16} aria-hidden /> Patent</span>
        <span className="rounded-full border border-current px-3 py-1 text-xs font-medium uppercase tracking-wider">{p.status}</span>
      </div>
      <p className="mt-10 break-all font-mono text-[clamp(1.8rem,3.6vw,3.2rem)] font-medium leading-none tracking-tight">
        {p.patent_number}
      </p>
      <h3 className="display mt-auto pt-12 text-[clamp(1.6rem,2.6vw,2.4rem)] font-semibold leading-[1.05]">{p.title}</h3>
      <div className="mt-6 flex items-end justify-between gap-4 text-sm opacity-80">
        <span>{p.organization}<br />{p.date}</span>
        <ArrowUpRight size={22} className="shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden />
      </div>
    </a>
  );
}

/**
 * Pinned horizontal pan on desktop (vertical scroll drives x).
 * Convenience fixes over a plain scroll-jack:
 * - patents come first, right after the intro
 * - each wheel gesture moves exactly one panel (via the section pager)
 * - prev/next buttons and a jump-past link, so nobody is forced to scrub through
 * Falls back to a plain vertical stack on small screens and reduced motion.
 */
export default function Work() {
  const wrap = useRef(null);
  const track = useRef(null);
  const reduce = useReducedMotion();
  const { scrollTo, step } = useSmoothScroll();
  const [distance, setDistance] = useState(0);
  const [pan, setPan] = useState(false);

  useLayoutEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const measure = () => {
      const enabled = mq.matches && !reduce;
      setPan(enabled);
      if (enabled && track.current) setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    mq.addEventListener('change', measure);
    window.addEventListener('resize', measure);
    return () => { ro.disconnect(); mq.removeEventListener('change', measure); window.removeEventListener('resize', measure); };
  }, [reduce]);

  // Page-scroll positions where each panel sits flush with the left gutter.
  // Fed to the section pager so each wheel gesture lands exactly on one panel.
  const getStops = useCallback(() => {
    if (!pan || !distance || !wrap.current || !track.current) return [];
    const top = wrap.current.getBoundingClientRect().top + window.scrollY;
    const padLeft = parseFloat(getComputedStyle(track.current).paddingLeft) || 0;
    const panels = [...track.current.querySelectorAll('[data-panel]')];
    const xs = [0, ...panels.map((el) => Math.min(Math.max(el.offsetLeft - padLeft, 0), distance)), distance];
    return [...new Set(xs)].map((xv) => top + xv);
  }, [pan, distance]);
  useBeats('work-panels', getStops);

  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 160, damping: 30, restDelta: 0.001 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const bar = useTransform(smooth, [0, 1], [0, 1]);

  const panels = [
    ...patents.map((p, i) => ({ key: p.patent_number, id: i === 0 ? 'patents' : null, node: <PatentPanel p={p} /> })),
    ...projects.map((p, i) => ({ key: p.title, id: i === 0 ? 'projects' : null, node: <ProjectPanel p={p} /> })),
  ];

  return (
    <section id="work" data-beat data-beat-fill="false" aria-labelledby="work-title" ref={wrap} className="relative" style={pan ? { height: `calc(100vh + ${distance}px)` } : undefined}>
      <div className={pan ? 'sticky top-0 flex h-[100dvh] flex-col justify-center overflow-hidden' : 'py-24'}>
        <motion.div
          ref={track}
          style={pan ? { x } : undefined}
          className={pan ? 'flex w-max items-stretch gap-6 pl-[max(2.5rem,calc((100vw-1400px)/2+2.5rem))] pr-10' : 'shell grid gap-6'}
        >
          <div className={`flex flex-col justify-end ${pan ? 'h-[70vh] w-[32vw] max-w-[500px] pr-8' : 'pb-6'}`}>
            <h2 id="work-title" className="display text-[clamp(2.8rem,6vw,5.8rem)] font-bold leading-[0.92] text-ink [font-variation-settings:'opsz'_96,'wdth'_80]">
              Built, filed and granted.
            </h2>
            <p className="mt-6 max-w-[38ch] text-lg text-muted">
              Patents from the work that shipped, and side projects that push on how machines reason.
            </p>
          </div>
          {panels.map((p) => (
            <div key={p.key} id={p.id ?? undefined} data-panel className={pan ? 'flex h-[70vh] w-[min(500px,36vw)] shrink-0' : 'flex min-h-[380px]'}>
              {p.node}
            </div>
          ))}
        </motion.div>
        {pan && (
          <div className="shell mt-8 flex items-center gap-6">
            <div className="h-px flex-1 bg-line/10" aria-hidden>
              <motion.div className="h-px origin-left bg-ink" style={{ scaleX: bar }} />
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => step(-1)} aria-label="Previous panel" className="grid h-10 w-10 place-items-center rounded-full border border-line/15 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper">
                <ArrowLeft size={16} />
              </button>
              <button type="button" onClick={() => step(1)} aria-label="Next panel" className="grid h-10 w-10 place-items-center rounded-full border border-line/15 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper">
                <ArrowRight size={16} />
              </button>
              <button type="button" onClick={() => scrollTo('#skills')} className="ml-2 inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-sm text-muted transition-colors hover:text-ink">
                Skip <ArrowDown size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
