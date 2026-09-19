import { useEffect, useRef } from 'react';
import {
  animate, motion, useInView, useReducedMotion, useScroll, useTransform,
} from 'framer-motion';
import ski from '../../assets/ski.webp';
import campus from '../../assets/campus.webp';
import { about, patents, totalCitations } from '../content';
import { Reveal } from '../ui/primitives';
import { useRatchet } from '../lib/use-ratchet';

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {children}{' '}
    </motion.span>
  );
}

const format = (n) => Math.round(n).toLocaleString('en-US');

function Counter({ to, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!inView || !ref.current) return undefined;
    if (reduce) { ref.current.textContent = format(to) + suffix; return undefined; }
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => { if (ref.current) ref.current.textContent = format(v) + suffix; },
    });
    return () => controls.stop();
  }, [inView, to, suffix, reduce]);
  return <span ref={ref}>{format(0)}{suffix}</span>;
}

const stats = [
  { value: 8, suffix: '+', label: 'years in machine learning' },
  { value: 3000, suffix: '+', label: 'employees served by agentic AI at Grainger' },
  { value: totalCitations, suffix: '', label: 'citations across publications' },
  { value: patents.length, suffix: '', label: 'patents, one granted' },
];

export default function About() {
  const target = useRef(null);
  const reduce = useReducedMotion();
  // Pinned while the lead paragraph lights up word by word. The pin is short
  // (60vh of extra scroll) and the progress only moves forward, so a second pass
  // (or scrolling back up) never makes you re-read it.
  const { scrollYProgress: raw } = useScroll({ target, offset: ['start start', 'end end'] });
  const scrollYProgress = useRatchet(raw);
  const words = about.lead.split(' ');
  const imgA = useTransform(raw, [0, 1], reduce ? ['0%', '0%'] : ['8%', '-12%']);
  const imgB = useTransform(raw, [0, 1], reduce ? ['0%', '0%'] : ['30%', '-6%']);
  const rotB = useTransform(raw, [0, 1], reduce ? [0, 0] : [6, -3]);

  return (
    <section id="about" aria-labelledby="about-title" className="relative">
      <div ref={target} data-beat-span="end" data-beat-duration="2.4" className="relative h-[160vh]">
        <div className="sticky top-0 flex min-h-[100dvh] items-center py-24">
          <div className="shell grid w-full items-center gap-10 md:grid-cols-12">
            <div className="relative hidden h-[64vh] md:col-span-4 md:block" aria-hidden>
              <motion.img
                src={ski}
                alt=""
                width="1100"
                height="1467"
                style={{ y: imgA }}
                loading="lazy"
                className="absolute left-0 top-0 h-[62%] w-[78%] rounded-panel object-cover object-[60%_40%]"
              />
              <motion.img
                src={campus}
                alt=""
                width="1100"
                height="1467"
                style={{ y: imgB, rotate: rotB }}
                loading="lazy"
                className="absolute bottom-0 right-0 h-[52%] w-[62%] rounded-panel border-4 border-paper object-cover object-[50%_30%] shadow-[0_24px_60px_-24px_rgb(0_0_0/0.5)]"
              />
            </div>
            <div className="md:col-span-8 md:col-start-5">
              <h2 id="about-title" className="label mb-8">About</h2>
              <p className="display text-[clamp(1.9rem,4.2vw,3.7rem)] font-medium leading-[1.08] text-ink [font-variation-settings:'opsz'_48,'wdth'_90]">
                {words.map((w, i) => (
                  <Word key={`${w}-${i}`} progress={scrollYProgress} range={[i / words.length * 0.75, (i + 1) / words.length * 0.75]}>
                    {w}
                  </Word>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div data-beat className="shell grid gap-12 pb-28 pt-8 md:grid-cols-12 md:pb-40">
        <div className="grid grid-cols-2 gap-3 md:hidden">
          <img src={ski} alt="Immanuel skiing on a mountain summit" width="1100" height="1467" loading="lazy" className="aspect-[3/4] w-full rounded-panel object-cover" />
          <img src={campus} alt="Immanuel on the Indiana University campus" width="1100" height="1467" loading="lazy" className="aspect-[3/4] w-full rounded-panel object-cover" />
        </div>
        <div className="space-y-6 text-lg leading-relaxed text-muted md:col-span-6 md:col-start-5 md:text-xl">
          {about.body.map((p) => (
            <Reveal key={p} as="p">{p}</Reveal>
          ))}
        </div>
        <Reveal className="md:col-span-3 md:col-start-10">
          <h3 className="display mb-4 text-xl font-semibold text-ink">Quick facts</h3>
          <ul className="space-y-3 text-muted">
            {about.facts.map((f) => (
              <li key={f} className="border-l-2 border-signal pl-4 leading-snug">{f}</li>
            ))}
          </ul>
        </Reveal>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-12 border-t border-line/10 pt-12 md:col-span-12 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="flex flex-col-reverse">
              <dt className="mt-3 max-w-[22ch] text-sm leading-snug text-muted">{s.label}</dt>
              <dd className="display tabular-nums text-[clamp(3rem,7vw,6rem)] font-bold leading-none text-ink [font-variation-settings:'opsz'_96,'wdth'_75]">
                <Counter to={s.value} suffix={s.suffix} />
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
