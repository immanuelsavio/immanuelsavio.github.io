import { Component, Suspense, lazy, useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';
import pillsCobalt from '../assets/pills-cobalt.webp';
import { useSx } from '../context';
import { stats } from '../data/catalog';
import { Button, EASE, Headline } from '../ui';

const CapsuleScene = lazy(() => import('../three/CapsuleScene'));

// If WebGL is unavailable the hero falls back to photography instead of breaking.
class SceneBoundary extends Component {
  constructor(props) { super(props); this.state = { failed: false }; }
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

function Fallback() {
  return (
    <div className="absolute inset-y-0 right-0 hidden w-1/2 md:block">
      <img src={pillsCobalt} alt="" className="h-full w-full object-cover opacity-90 [mask-image:linear-gradient(to_left,black_55%,transparent)]" />
    </div>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const progress = useRef(0);
  const reduce = useReducedMotion();
  const { dark } = useSx();
  const [active, setActive] = useState(true);
  const [webgl] = useState(hasWebGL);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  useMotionValueEvent(scrollYProgress, 'change', (v) => { progress.current = v; });
  const copyY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '-30%']);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Pause the WebGL loop when the hero is off screen.
  useEffect(() => {
    if (!ref.current) return undefined;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} aria-label="Introduction" className="relative isolate min-h-[100dvh] overflow-hidden">
      {/* Soft clinical light: a cobalt glow behind the capsule, a cool wash at the top */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(55%_60%_at_72%_48%,rgb(var(--sx-brand)/0.16),transparent_70%),radial-gradient(80%_50%_at_20%_0%,rgb(var(--sx-surface)),transparent)]" />
      <div aria-hidden className="absolute inset-0 -z-10 opacity-[0.35] [background-image:linear-gradient(rgb(var(--sx-line)/0.06)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--sx-line)/0.06)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(60%_60%_at_70%_50%,black,transparent)]" />

      <div aria-hidden className="absolute inset-0 -z-10">
        {webgl ? (
          <SceneBoundary fallback={<Fallback />}>
            <Suspense fallback={null}>
              <motion.div className="h-full w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.6, delay: 0.3 }}>
                <CapsuleScene progress={progress} dark={dark} reduce={!!reduce} active={active} />
              </motion.div>
            </Suspense>
          </SceneBoundary>
        ) : <Fallback />}
      </div>

      <motion.div style={{ y: copyY, opacity: copyOpacity }} className="sx-shell flex min-h-[100dvh] flex-col justify-end pb-16 pt-32 md:justify-center md:pb-24">
        <div className="max-w-[54rem]">
          <motion.p
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-sx-line/15 bg-sx-surface/70 px-3.5 py-1.5 text-sm text-sx-muted backdrop-blur"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          >
            Syswin Pharmaceuticals, Bengaluru
          </motion.p>
          <Headline
            as="h1"
            animateOnMount
            delay={0.2}
            lines={['Everyday medicines,', 'made dependable.']}
            className="text-[clamp(2.7rem,6vw,5.4rem)] font-semibold leading-[0.95] text-sx-ink"
          />
          <motion.p
            className="mt-7 max-w-[34rem] text-lg leading-relaxed text-sx-muted md:text-xl"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.6 }}
          >
            Quality-assured, affordable medicines across {stats.specialities} specialities, delivered through a distribution network built for consistency.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-wrap gap-3"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.75 }}
          >
            <Button to="/syswin/portfolio" size="lg">
              Explore portfolio <ArrowRight size={16} weight="bold" className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </Button>
            <Button to="/syswin/about" size="lg" variant="ghost">Our story</Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
