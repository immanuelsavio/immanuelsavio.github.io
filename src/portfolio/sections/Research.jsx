import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from '@phosphor-icons/react';
import { SCHOLAR_URL, publications, totalCitations } from '../content';
import { Button, EASE, Reveal } from '../ui/primitives';

function Row({ pub, i }) {
  const reduce = useReducedMotion();
  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, ease: EASE, delay: i * 0.06 }}
    >
      <a
        href={pub.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative grid gap-3 overflow-hidden py-7 md:grid-cols-12 md:items-baseline md:gap-6 md:py-9"
      >
        {/* Ink wipe on hover */}
        <span aria-hidden className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-out group-hover:scale-y-100 group-focus-visible:scale-y-100" />
        <span className="relative font-mono text-sm text-muted transition-colors duration-500 group-hover:text-paper/60 md:col-span-1 md:pl-4">
          {pub.year}
        </span>
        <span className="relative md:col-span-8">
          <span className="display block text-[clamp(1.35rem,2.4vw,2.1rem)] font-semibold leading-[1.12] text-ink transition-colors duration-500 group-hover:text-paper">
            {pub.title}
          </span>
          <span className="mt-2 block text-sm text-muted transition-colors duration-500 group-hover:text-paper/70">
            {pub.authors.join(', ')}. {pub.venue}
            {pub.pages ? `, pp. ${pub.pages}` : ''}
          </span>
        </span>
        <span className="relative flex items-center justify-between gap-4 md:col-span-3 md:justify-end md:pr-4">
          <span className="text-sm text-muted transition-colors duration-500 group-hover:text-paper/70">
            {pub.citations ? (
              <>
                <span className="display text-3xl font-bold text-ink transition-colors duration-500 group-hover:text-signal">{pub.citations}</span>{' '}
                citations
              </>
            ) : 'Proceedings'}
          </span>
          <ArrowUpRight size={20} aria-hidden className="text-ink transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-paper" />
        </span>
      </a>
    </motion.li>
  );
}

export default function Research() {
  return (
    <section id="publications" data-beat aria-labelledby="research-title" className="shell py-28 md:py-40">
      <div className="mb-14 grid gap-10 md:mb-20 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <p className="label mb-6">Research</p>
          <h2 id="research-title" className="display text-[clamp(2.6rem,6vw,5.6rem)] font-bold leading-[0.95] text-ink [font-variation-settings:'opsz'_96,'wdth'_80]">
            Publications
          </h2>
        </div>
        <Reveal className="flex flex-col items-start gap-5 md:col-span-4 md:items-end md:text-right">
          <p className="text-muted">
            <span className="display block text-6xl font-bold leading-none text-signal">{totalCitations}</span>
            citations on Google Scholar
          </p>
          <Button href={SCHOLAR_URL} variant="ghost">
            Google Scholar <ArrowUpRight size={14} />
          </Button>
        </Reveal>
      </div>
      <ol className="divide-y divide-line/10 border-y border-line/10">
        {publications.map((p, i) => <Row key={p.title} pub={p} i={i} />)}
      </ol>
    </section>
  );
}
