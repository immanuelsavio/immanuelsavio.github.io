import {
  motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity,
} from 'framer-motion';
import { Asterisk } from '@phosphor-icons/react';
import { resume } from '../content';

const wrap = (min, max, v) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/**
 * Specializations band. Drifts one way at a steady pace and speeds up a little
 * while the page is scrolling (in either direction). Never reverses.
 */
export default function Marquee() {
  const reduce = useReducedMotion();
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, (v) => Math.min(Math.abs(v) / 1000, 3));
  const x = useTransform(base, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    base.set(base.get() - 1.6 * (1 + boost.get()) * (delta / 1000));
  });

  const items = resume.profile_summary.specializations;
  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((s) => (
        <span key={s} className="flex items-center">
          <span className="display whitespace-nowrap px-6 text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-none">{s}</span>
          <Asterisk size={28} weight="bold" className="shrink-0 text-signal" aria-hidden />
        </span>
      ))}
    </div>
  );

  return (
    <section aria-label="Specializations" className="relative overflow-hidden border-y border-line/10 py-8 md:py-10">
      <p className="sr-only">{items.join(', ')}</p>
      <motion.div aria-hidden className="flex w-max" style={{ x }}>
        {row}
        {row}
      </motion.div>
    </section>
  );
}
