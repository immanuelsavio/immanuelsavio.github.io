import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { CurrencyInr, HandHeart, Package, Stack } from '@phosphor-icons/react';
import pillsCobalt from '../assets/pills-cobalt.webp';
import doctor from '../assets/doctor.webp';
import organizer from '../assets/organizer.webp';
import { Headline, Reveal } from '../ui';

function Parallax({ src, alt, className = '' }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-8%', '8%']);
  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.img src={src} alt={alt} loading="lazy" style={{ y, scale: 1.18 }} className="h-full w-full object-cover" />
    </div>
  );
}

export default function Principles() {
  return (
    <section aria-labelledby="sx-principles-title" className="sx-shell pb-28 md:pb-40">
      <div className="mb-14 max-w-3xl md:mb-20">
        <Headline
          lines={['Built on four', 'simple promises.']}
          className="text-[clamp(2.2rem,4.8vw,4.4rem)] font-semibold leading-[1] text-sx-ink"
        />
        <h2 id="sx-principles-title" className="sr-only">Our principles</h2>
      </div>

      <div className="grid auto-rows-[minmax(300px,auto)] gap-4 md:grid-cols-12">
        <Reveal className="relative overflow-hidden rounded-sx md:col-span-7 md:row-span-2">
          <Parallax src={pillsCobalt} alt="Tablets and capsules spilling from a bottle on a cobalt background" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#081126]/80 via-[#081126]/20 to-transparent" />
          <div className="relative flex h-full min-h-[520px] flex-col justify-end p-8 text-white md:p-12">
            <Stack size={28} aria-hidden />
            <h3 className="sx-display mt-6 text-4xl font-semibold md:text-5xl">Focused portfolio</h3>
            <p className="mt-3 max-w-md text-lg text-white/80">Practical medicines for everyday clinical needs, not an endless catalogue.</p>
          </div>
        </Reveal>

        <Reveal delay={0.06} className="relative overflow-hidden rounded-sx bg-sx-surface ring-1 ring-sx-line/10 md:col-span-5">
          <div className="grid h-full grid-cols-5">
            <div className="col-span-3 flex flex-col justify-between p-8">
              <HandHeart size={28} className="text-sx-brand" aria-hidden />
              <div>
                <h3 className="sx-display text-2xl font-semibold text-sx-ink md:text-3xl">Ethical representation</h3>
                <p className="mt-2 text-sx-muted">Honest, transparent relationships with every doctor we meet.</p>
              </div>
            </div>
            <div className="relative col-span-2">
              <Parallax src={doctor} alt="A doctor in a white coat with a stethoscope" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="flex flex-col justify-between rounded-sx bg-sx-brand p-8 text-sx-on-brand md:col-span-5">
          <Package size={28} aria-hidden />
          <div>
            <h3 className="sx-display text-2xl font-semibold md:text-3xl">Consistent availability</h3>
            <p className="mt-2 opacity-85">Distribution-first supply, so the medicine is on the shelf when it is needed.</p>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="relative overflow-hidden rounded-sx bg-sx-surface ring-1 ring-sx-line/10 md:col-span-12">
          <div className="grid md:grid-cols-12">
            <div className="flex flex-col justify-center gap-4 p-8 md:col-span-6 md:p-12">
              <CurrencyInr size={28} className="text-sx-brand" aria-hidden />
              <h3 className="sx-display text-3xl font-semibold text-sx-ink md:text-4xl">Affordable access</h3>
              <p className="max-w-lg text-lg text-sx-muted">Focused operations keep pricing honest, so quality medicines stay within reach of the patients who take them every day.</p>
            </div>
            <div className="relative min-h-[260px] md:col-span-6">
              <Parallax src={organizer} alt="A hand sorting tablets into a weekly pill organiser" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
