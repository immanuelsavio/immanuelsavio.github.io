import { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Play } from '@phosphor-icons/react';
import { talk } from '../content';
import { MaskText } from '../ui/primitives';
import { useRatchet } from '../lib/use-ratchet';

/**
 * Talk video grows from an inset card to full bleed as it scrolls into view.
 * Uses a click-to-load facade so YouTube only loads when asked.
 */
export default function Talks() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const { scrollYProgress: raw } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const scrollYProgress = useRatchet(raw);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.72, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], reduce ? [20, 20] : [48, 20]);
  const imgScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.25, 1]);

  const title = `${talk.event} talk, ${talk.place}`;

  return (
    <section id="talks" data-beat aria-labelledby="talks-title" className="py-28 md:py-40">
      <div className="shell mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 id="talks-title" className="sr-only">Professional talks</h2>
          <MaskText
            as="p"
            text="Sharing knowledge and insights at conferences and events."
            className="display max-w-[18ch] text-[clamp(2.2rem,5vw,4.6rem)] font-bold leading-[0.98] text-ink [font-variation-settings:'opsz'_96,'wdth'_80]"
          />
        </div>
        <dl className="flex gap-10 text-sm">
          <div><dt className="text-muted">Event</dt><dd className="mt-1 font-medium text-ink">{talk.event}</dd></div>
          <div><dt className="text-muted">Where</dt><dd className="mt-1 font-medium text-ink">{talk.place}</dd></div>
          <div><dt className="text-muted">Year</dt><dd className="mt-1 font-medium text-ink">{talk.year}</dd></div>
        </dl>
      </div>

      <div ref={ref} className="px-4 sm:px-6 lg:px-10">
        <motion.div
          style={{ scale, borderRadius: radius }}
          className="relative mx-auto aspect-video w-full max-w-[1600px] overflow-hidden bg-ink will-change-transform"
        >
          {playing ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${talk.youtubeId}?autoplay=1&rel=0`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="group absolute inset-0 h-full w-full"
              aria-label={`Play video: ${title}`}
            >
              <motion.img
                src={`https://i.ytimg.com/vi/${talk.youtubeId}/maxresdefault.jpg`}
                alt=""
                width="1280"
                height="720"
                loading="lazy"
                style={{ scale: imgScale }}
                className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity duration-500 group-hover:opacity-100"
              />
              <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0b0b0a]/80 via-transparent to-transparent" />
              <span className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-signal text-on-signal transition-transform duration-500 ease-out group-hover:scale-110 md:h-28 md:w-28">
                <Play size={30} weight="fill" aria-hidden />
              </span>
              <span className="absolute bottom-5 left-5 text-left text-white md:bottom-10 md:left-10">
                <span className="display block text-2xl font-semibold md:text-5xl">{talk.event}</span>
                <span className="mt-1 block text-sm text-white/75 md:text-base">{talk.place}</span>
              </span>
            </button>
          )}
        </motion.div>
        <div className="mx-auto mt-6 flex max-w-[1600px] justify-end">
          <a href={talk.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-signal">
            Watch on YouTube <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
