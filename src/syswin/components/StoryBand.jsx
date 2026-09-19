import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';
import shelf from '../assets/shelf.webp';
import { Button, Reveal } from '../ui';

/** Full-bleed photo that opens from an inset card to edge-to-edge as it scrolls in. */
export default function StoryBand() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] });
  const inset = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['6%', '0%']);
  const radius = useTransform(scrollYProgress, [0, 1], reduce ? ['0px', '0px'] : ['28px', '0px']);
  const clip = useTransform([inset, radius], ([i, r]) => `inset(0% ${i} round ${r})`);
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-10%', '0%']);

  return (
    <section ref={ref} aria-labelledby="sx-story-title" className="relative">
      <motion.div style={{ clipPath: clip }} className="relative min-h-[88vh] overflow-hidden bg-sx-deep">
        <motion.img
          src={shelf}
          alt="Medicine bottles on a pharmacy shelf, softly out of focus"
          loading="lazy"
          style={{ y: imgY, scale: 1.15 }}
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-[#081126] via-[#081126]/75 to-[#081126]/10" />
        <div className="sx-shell relative flex min-h-[88vh] flex-col justify-center py-24 text-white">
          <Reveal>
            <p className="mb-8 text-sm font-medium text-[#8FA4FF]">Why Syswin exists</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="sx-story-title" className="sx-display max-w-4xl text-[clamp(2rem,4.6vw,4.2rem)] font-semibold leading-[1.05]">
              &ldquo;Everyday medicines should be reliable, available, and priced within reach of the people who need them.&rdquo;
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-8 max-w-xl text-lg text-white/75">
              The founding belief of three pharmaceutical professionals who left big pharma to build something closer to doctors, pharmacists and patients.
            </p>
            <Button to="/syswin/about" variant="light" size="lg" className="mt-10">
              Read our story <ArrowRight size={16} weight="bold" />
            </Button>
          </Reveal>
        </div>
      </motion.div>
    </section>
  );
}
