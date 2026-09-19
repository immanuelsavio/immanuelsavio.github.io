import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { MapPin } from '@phosphor-icons/react';
import { education, experience } from '../content';
import { EASE, MaskText, Reveal } from '../ui/primitives';

// Highlight the hard numbers inside a sentence ("5.9M+", "<100ms", "40%").
function Emphasize({ text }) {
  const parts = text.split(/(<?\d[\d.,]*[KMB%+]*\+?(?:ms)?)/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <span key={i} className="font-medium text-signal">{part}</span> : part,
  );
}

function RoleCard({ role, index, total, progress }) {
  const reduce = useReducedMotion();
  const current = role.dates.includes('Present');
  // Earlier cards shrink and dim as later ones slide over them.
  const scale = useTransform(progress, [index / total, 1], reduce ? [1, 1] : [1, 1 - (total - index - 1) * 0.045]);
  const dim = useTransform(progress, [index / total, 1], reduce ? [0, 0] : [0, (total - index - 1) * 0.12]);

  return (
    // Sticky stack with no spacer between cards: the stack costs zero extra
    // scroll compared with a plain list, so fast scrolling passes straight through.
    <>
    {/* Zero-height marker at the card's natural position: the pager lands the card exactly at its sticky spot */}
    <div aria-hidden data-beat data-beat-fill="false" data-beat-offset={104 + index * 26} className={index ? 'mt-6' : ''} />
    <div className="md:sticky" style={{ top: `calc(104px + ${index * 26}px)` }}>
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, ease: EASE }}
      style={{ scale }}
      className="relative origin-top overflow-hidden rounded-panel border border-line/10 bg-surface p-6 sm:p-8 md:min-h-[58vh] md:p-12"
    >
      <motion.div aria-hidden style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-paper" />
      <div className="relative grid gap-10 md:grid-cols-12">
        <header className="flex flex-col md:col-span-5">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl bg-white p-2">
              <img src={role.logo} alt="" width="48" height="48" className="h-full w-full object-contain" loading="lazy" />
            </span>
            <div>
              <p className="font-medium text-ink">{role.company}</p>
              <p className="font-mono text-xs text-muted">
                {role.dates}
                {current && <span className="ml-2 rounded-full bg-signal px-2 py-0.5 text-[0.65rem] uppercase tracking-wider text-on-signal">Now</span>}
              </p>
            </div>
          </div>
          <h3 className="display mt-8 text-[clamp(1.8rem,3.4vw,3rem)] font-semibold leading-[1.02] text-ink [font-variation-settings:'opsz'_48,'wdth'_85]">
            {role.title}
          </h3>
          {role.team && <p className="mt-3 text-muted">{role.team}</p>}
          <p className="mt-auto flex items-center gap-1.5 pt-8 text-sm text-muted">
            <MapPin size={14} aria-hidden /> {role.location}
          </p>
        </header>

        <div className="flex flex-col md:col-span-7">
          <ul className="space-y-6">
            {role.highlights.map((h) => (
              <li key={h} className="text-lg leading-relaxed text-ink/85 md:text-xl">
                <Emphasize text={h} />
              </li>
            ))}
          </ul>
          <ul className="mt-auto flex flex-wrap gap-2 pt-10" aria-label="Focus areas">
            {role.tags.map((t) => (
              <li key={t} className="rounded-full border border-line/15 px-3 py-1 text-sm text-muted">{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
    </div>
    </>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  return (
    <>
      <section id="experience" data-beat data-beat-fill="false" aria-labelledby="experience-title" className="shell pb-24 pt-28 md:pt-36">
        <div className="mb-14 md:mb-20">
          <MaskText
            text="Where I've shipped models into production."
            className="display max-w-[16ch] text-[clamp(2.6rem,6.5vw,6rem)] font-bold leading-[0.95] text-ink [font-variation-settings:'opsz'_96,'wdth'_80]"
          />
          <h2 id="experience-title" className="sr-only">Experience</h2>
        </div>

        <div ref={ref}>
          {experience.map((role, i) => (
            <RoleCard key={`${role.company}-${role.title}-${role.dates}`} role={role} index={i} total={experience.length} progress={scrollYProgress} />
          ))}
        </div>
      </section>

      <section id="education" data-beat aria-labelledby="education-title" className="shell pb-28 md:pb-40">
        <h2 id="education-title" className="display mb-10 text-3xl font-semibold text-ink md:text-4xl">Education</h2>
        <div className="grid gap-px overflow-hidden rounded-panel border border-line/10 bg-line/10 md:grid-cols-2">
          {education.map((e, i) => (
            <Reveal key={e.institution} delay={i * 0.1} className="group flex flex-col bg-paper p-6 transition-colors duration-500 hover:bg-surface sm:p-10">
              <div className="flex items-start justify-between gap-6">
                <span className="grid h-16 w-16 place-items-center overflow-hidden rounded-full bg-white p-2.5">
                  <img src={e.logo} alt="" width="64" height="64" className="h-full w-full object-contain" loading="lazy" />
                </span>
                <span className="font-mono text-sm text-muted">{e.dates}</span>
              </div>
              <h3 className="display mt-10 text-2xl font-semibold leading-tight text-ink md:text-3xl">{e.degree}</h3>
              <p className="mt-2 text-muted">{e.institution}</p>
              <ul className="mt-6 space-y-1 text-ink/85">
                {e.notes.map((n) => <li key={n}>{n}</li>)}
              </ul>
              <ul className="mt-8 flex flex-wrap gap-2" aria-label="Topics">
                {e.tags.map((t) => (
                  <li key={t} className="rounded-full border border-line/15 px-3 py-1 text-sm text-muted">{t}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
