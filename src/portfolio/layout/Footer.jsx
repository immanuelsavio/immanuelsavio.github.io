import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUp } from '@phosphor-icons/react';
import { resume, sections, socials } from '../content';
import { useSmoothScroll } from '../lib/smooth-scroll';
import { SocialLinks } from '../ui/primitives';
import { useRatchet } from '../lib/use-ratchet';

export default function Footer() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { goToSection, scrollTo } = useSmoothScroll();
  const { scrollYProgress: raw } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const scrollYProgress = useRatchet(raw);
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['45%', '0%']);

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-line/10 bg-paper">
      <div className="shell grid gap-12 pb-10 pt-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="max-w-sm text-lg leading-relaxed text-muted">
            Production AI, recommendation systems and the occasional side project. Built from Chicago.
          </p>
          <SocialLinks items={socials} className="mt-8" />
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 md:col-span-5 md:col-start-8">
          <ul className="space-y-3">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`/#${s.id}`} onClick={(e) => { e.preventDefault(); goToSection(s.id); }} className="text-ink/80 transition-colors hover:text-signal">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className="space-y-3">
            <li><Link to="/blog" className="text-ink/80 transition-colors hover:text-signal">Writing</Link></li>
            <li><Link to="/playground" className="text-ink/80 transition-colors hover:text-signal">Playground</Link></li>
            <li><Link to="/playground/json-to-toon" className="text-ink/80 transition-colors hover:text-signal">JSON to TOON</Link></li>
          </ul>
        </nav>
      </div>

      <div className="shell flex flex-wrap items-center justify-between gap-4 border-t border-line/10 py-6 text-sm text-muted">
        <p>&copy; {new Date().getFullYear()} {resume.name}. Designed and built by hand.</p>
        <button type="button" onClick={() => scrollTo('top')} className="inline-flex items-center gap-2 transition-colors hover:text-ink">
          Back to top <ArrowUp size={14} />
        </button>
      </div>

      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <motion.p
          style={{ y }}
          className="display whitespace-nowrap text-center text-[19.5vw] font-extrabold leading-[0.78] text-ink [font-variation-settings:'opsz'_96,'wdth'_75]"
        >
          Savio<span className="text-signal">.</span>
        </motion.p>
      </div>
    </footer>
  );
}
