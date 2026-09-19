import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform,
} from 'framer-motion';
import { ArrowDown } from '@phosphor-icons/react';
import portrait from '../../assets/portrait.webp';
import { resume, roles, socials } from '../content';
import { useSmoothScroll } from '../lib/smooth-scroll';
import { Button, EASE, Magnetic, SocialLinks } from '../ui/primitives';

function RoleTicker() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return undefined;
    const t = setInterval(() => setI((n) => (n + 1) % roles.length), 2600);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <span className="relative inline-flex h-[1.3em] overflow-hidden align-bottom" aria-live="off">
      <span className="sr-only">{roles.join(', ')}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={roles[i]}
          aria-hidden
          className="inline-block whitespace-nowrap text-ink"
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function SplitName({ word, delay, className }) {
  const reduce = useReducedMotion();
  return (
    <span className={`block overflow-hidden pb-[0.06em] ${className ?? ''}`}>
      {word.split('').map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          className="inline-block will-change-transform"
          initial={reduce ? false : { y: '105%', rotate: 6 }}
          animate={{ y: '0%', rotate: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: delay + i * 0.045 }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { goToSection } = useSmoothScroll();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  const still = (v) => (reduce ? [v, v] : null);
  const nameX1 = useTransform(p, [0, 1], still('0%') ?? ['0%', '-18%']);
  const nameX2 = useTransform(p, [0, 1], still('0%') ?? ['0%', '14%']);
  const photoY = useTransform(p, [0, 1], still('0%') ?? ['0%', '22%']);
  const photoScale = useTransform(p, [0, 1], still(1) ?? [1, 1.12]);
  const fade = useTransform(p, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      id="home"
      data-beat
      data-beat-fill="false"
      aria-label="Introduction"
      className="relative flex min-h-[100dvh] items-end overflow-hidden pb-10 pt-28 md:pb-14"
    >
      <div className="shell grid w-full grid-cols-1 items-end gap-10 md:grid-cols-12">
        {/* Portrait: clip-path curtain on load, parallax on scroll */}
        <motion.div
          className="relative order-1 md:order-2 md:col-span-5 md:col-start-8 md:row-span-2 md:self-stretch"
          initial={reduce ? false : { clipPath: 'inset(100% 0% 0% 0% round 1.25rem)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0% round 1.25rem)' }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
        >
          <div className="relative ml-auto aspect-[4/5] w-[64%] max-w-[360px] overflow-hidden rounded-panel bg-[#0b0b0a] md:mr-0 md:h-full md:max-h-[74dvh] md:w-full md:max-w-none md:aspect-auto">
            <motion.img
              src={portrait}
              alt={`Portrait of ${resume.name}`}
              width="900"
              height="1273"
              fetchpriority="high"
              decoding="async"
              style={{ y: photoY, scale: photoScale }}
              className="h-full w-full object-cover object-[50%_20%]"
            />
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,transparent_45%,rgb(11_11_10/0.75))]" />
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          className="display relative order-2 -mt-24 font-bold leading-[0.86] text-white mix-blend-difference md:order-1 md:col-span-12 md:row-start-1 md:-mb-4 md:mt-0 lg:-mb-8"
          style={{ opacity: fade }}
          aria-label={resume.name}
        >
          <motion.span style={{ x: nameX1 }} className="block text-[clamp(3.6rem,13.5vw,13rem)] [font-variation-settings:'opsz'_96,'wdth'_75]">
            <SplitName word="Immanuel" delay={0.35} />
          </motion.span>
          <motion.span style={{ x: nameX2 }} className="block text-[clamp(3.6rem,13.5vw,13rem)] [font-variation-settings:'opsz'_96,'wdth'_75]">
            <span className="flex items-baseline">
              <SplitName word="Savio" delay={0.55} />
              <motion.span
                className="inline-block text-[rgb(var(--hero-dot))]"
                initial={reduce ? false : { scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 1.1 }}
              >
                .
              </motion.span>
            </span>
          </motion.span>
        </motion.h1>

        {/* Copy + actions */}
        <motion.div
          className="order-3 md:col-span-6 md:row-start-2"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.9 }}
        >
          <p className="display text-2xl font-medium leading-tight text-muted md:text-3xl">
            <RoleTicker />
          </p>
          <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-muted md:text-lg">
            Building production-scale AI systems at W.W. Grainger. Specializing in recommendation systems, LLMs, and agentic AI for real-world impact.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Magnetic>
              <Button size="lg" onClick={() => goToSection('experience')}>
                View my work
                <ArrowDown size={16} weight="bold" className="transition-transform duration-300 group-hover:translate-y-0.5" />
              </Button>
            </Magnetic>
            <SocialLinks items={socials} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
