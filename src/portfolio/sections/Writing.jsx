import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react';
import { formatDate, posts } from '../content';
import { Button, Reveal } from '../ui/primitives';
import PostLink from '../ui/PostLink';

/** Home teaser for /blog: article index with a cover image that trails the pointer. */
export default function Writing() {
  const area = useRef(null);
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 22, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 180, damping: 22, mass: 0.5 });

  const onMove = (e) => {
    if (!area.current) return;
    const r = area.current.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  const current = posts.find((p) => p.id === hovered);

  return (
    <section id="writing" data-beat aria-labelledby="writing-title" className="shell py-28 md:py-40">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
        <h2 id="writing-title" className="display text-[clamp(2.6rem,6vw,5.6rem)] font-bold leading-[0.95] text-ink [font-variation-settings:'opsz'_96,'wdth'_80]">
          Latest writing
        </h2>
        <Button to="/blog" variant="ghost">
          All articles <ArrowRight size={14} />
        </Button>
      </div>

      <div ref={area} onPointerMove={onMove} onPointerLeave={() => setHovered(null)} className="relative">
        <ul className="border-t border-line/10">
          {posts.map((post, i) => (
            <Reveal as="li" key={post.id} delay={i * 0.06} className="border-b border-line/10">
              <PostLink
                post={post}
                onPointerEnter={() => setHovered(post.id)}
                onFocus={() => setHovered(post.id)}
                onBlur={() => setHovered(null)}
                className="group grid grid-cols-[88px_1fr] items-center gap-5 py-6 md:grid-cols-12 md:gap-6 md:py-10"
              >
                <img src={post.cover} alt="" width="88" height="88" loading="lazy" className="aspect-square w-full rounded-xl object-cover md:hidden" />
                <span className="hidden font-mono text-sm text-muted md:col-span-2 md:block">{formatDate(post.date)}</span>
                <span className="md:col-span-7">
                  <span className="display block text-[clamp(1.4rem,3vw,2.6rem)] font-semibold leading-[1.05] text-ink transition-transform duration-500 ease-out group-hover:translate-x-3">
                    {post.title}
                  </span>
                  <span className="mt-2 block font-mono text-xs text-muted md:hidden">{formatDate(post.date)}</span>
                </span>
                <span className="hidden items-center justify-end gap-3 text-sm text-muted md:col-span-3 md:flex">
                  {post.type === 'external' ? post.platform : 'On this site'}
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-line/15 text-ink transition-colors duration-300 group-hover:border-signal group-hover:bg-signal group-hover:text-on-signal">
                    {post.type === 'external' ? <ArrowUpRight size={16} /> : <ArrowRight size={16} />}
                  </span>
                </span>
              </PostLink>
            </Reveal>
          ))}
        </ul>

        {!reduce && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 z-10 hidden md:block"
            style={{ x: sx, y: sy }}
          >
            <AnimatePresence>
              {current && (
                <motion.img
                  key={current.id}
                  src={current.cover}
                  alt=""
                  className="absolute -left-[150px] -top-[110px] h-[220px] w-[300px] max-w-none rounded-panel object-cover shadow-[0_30px_60px_-20px_rgb(0_0_0/0.5)]"
                  initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
