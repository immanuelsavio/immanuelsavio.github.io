import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { Factory, FirstAidKit, SealCheck, Truck } from '@phosphor-icons/react';
import vials from '../assets/vials.webp';
import warehouse from '../assets/warehouse.webp';
import pharmacy from '../assets/pharmacy.webp';
import consult from '../assets/consult.webp';
import { company } from '../data/catalog';
import { EASE, Headline } from '../ui';

const steps = [
  {
    title: 'Sourced responsibly',
    body: 'Every product comes from established, licensed manufacturers that meet applicable regulatory standards.',
    image: vials,
    alt: 'Glass vials and ampoules in soft studio light',
    icon: Factory,
  },
  {
    title: 'Quality checked and stocked',
    body: `Processes certified to ${company.iso} keep supply organised and stock levels steady.`,
    image: warehouse,
    alt: 'Long aisles of stocked warehouse shelving',
    icon: SealCheck,
  },
  {
    title: 'Moved through trusted distribution',
    body: 'A distribution-first model built around availability, so pharmacies are not left waiting.',
    image: pharmacy,
    alt: 'A bright, well-stocked modern pharmacy',
    icon: Truck,
  },
  {
    title: 'Prescribed with confidence',
    body: 'Clear, ethical product information helps doctors have focused conversations with their patients.',
    image: consult,
    alt: 'Two clinicians reviewing results together',
    icon: FirstAidKit,
  },
];

/**
 * Scrollytelling: the photo column sticks while the steps scroll past in normal flow.
 * The step nearest the middle of the screen becomes active and swaps the photo.
 */
export default function Journey() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const listRef = useRef(null);
  const stepRefs = useRef([]);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start center', 'end center'] });
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(Number(e.target.dataset.index)); }),
      { rootMargin: '-45% 0px -45% 0px' },
    );
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section aria-labelledby="sx-journey-title" className="bg-sx-surface py-28 md:py-40">
      <div className="sx-shell">
        <div className="mb-16 max-w-3xl md:mb-24">
          <p className="mb-6 text-sm font-medium text-sx-brand">How Syswin works</p>
          <Headline
            lines={['From licensed manufacturer', 'to the patient in front of you.']}
            className="text-[clamp(2.2rem,4.8vw,4.4rem)] font-semibold leading-[1] text-sx-ink"
          />
          <h2 id="sx-journey-title" className="sr-only">From manufacturer to patient</h2>
        </div>

        <div className="grid gap-12 md:grid-cols-12">
          <div className="hidden md:col-span-6 md:block">
            <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-sx bg-sx-paper">
              <AnimatePresence initial={false}>
                <motion.img
                  key={active}
                  src={steps[active].image}
                  alt={steps[active].alt}
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.1, ease: EASE }}
                />
              </AnimatePresence>
              <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#081126]/70 to-transparent" />
              <p className="absolute bottom-6 left-6 right-6 sx-display text-2xl font-semibold text-white md:text-3xl">{steps[active].title}</p>
            </div>
          </div>

          <ol ref={listRef} className="relative md:col-span-5 md:col-start-8">
            <span aria-hidden className="absolute bottom-0 left-[23px] top-0 w-px bg-sx-line/10" />
            <motion.span aria-hidden style={{ scaleY: line }} className="absolute bottom-0 left-[23px] top-0 w-px origin-top bg-sx-brand" />
            {steps.map((s, i) => {
              const Icon = s.icon;
              const on = i === active;
              return (
                <li
                  key={s.title}
                  ref={(el) => { stepRefs.current[i] = el; }}
                  data-index={i}
                  className="relative flex gap-6 pb-24 last:pb-0 md:min-h-[46vh]"
                >
                  <span className={`relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border transition-colors duration-500 ${on ? 'border-sx-brand bg-sx-brand text-sx-on-brand' : 'border-sx-line/15 bg-sx-surface text-sx-muted'}`}>
                    <Icon size={20} aria-hidden />
                  </span>
                  <div className="pt-2">
                    <h3 className={`sx-display text-2xl font-semibold transition-colors duration-500 md:text-3xl ${on ? 'text-sx-ink' : 'text-sx-ink/40'}`}>{s.title}</h3>
                    <p className={`mt-3 max-w-md text-lg leading-relaxed transition-colors duration-500 ${on ? 'text-sx-muted' : 'text-sx-muted/60'}`}>{s.body}</p>
                    <img src={s.image} alt={s.alt} loading="lazy" className="mt-6 aspect-[4/3] w-full rounded-2xl object-cover md:hidden" />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
