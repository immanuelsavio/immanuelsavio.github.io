import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react';
import { formatDate, posts } from '../content';
import { MaskText, Reveal } from '../ui/primitives';
import PostLink from '../ui/PostLink';
import { usePageTitle } from '../lib/use-page-title';

function Meta({ post, light }) {
  return (
    <p className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-sm ${light ? 'text-white/75' : 'text-muted'}`}>
      <time dateTime={post.date} className="font-mono">{formatDate(post.date)}</time>
      <span aria-hidden>/</span>
      <span>{post.type === 'external' ? post.platform : 'On this site'}</span>
    </p>
  );
}

export default function Blog() {
  usePageTitle('Writing');
  const [featured, ...rest] = posts;

  return (
    <div className="shell pb-28 pt-36 md:pb-40 md:pt-44">
      <header className="mb-16 md:mb-24">
        <MaskText
          as="h1"
          text="Thoughts & Articles"
          className="display text-[clamp(3.2rem,10vw,9rem)] font-bold leading-[0.9] text-ink [font-variation-settings:'opsz'_96,'wdth'_75]"
        />
        <Reveal as="p" delay={0.3} className="mt-6 max-w-[48ch] text-lg text-muted md:text-xl">
          A collection of my writings on technology, AI, and development.
        </Reveal>
      </header>

      {/* Featured: newest post, full width with image */}
      <Reveal>
        <PostLink post={featured} className="group relative block overflow-hidden rounded-panel bg-ink">
          <div className="aspect-[4/5] sm:aspect-[16/9] md:aspect-[21/9]">
            <img src={featured.cover} alt="" width="1400" height="600" className="h-full w-full object-cover opacity-70 transition-[transform,opacity] duration-[1.2s] ease-out group-hover:scale-105 group-hover:opacity-60" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0a] via-[#0b0b0a]/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 grid gap-6 p-6 md:grid-cols-12 md:items-end md:p-12">
            <div className="md:col-span-8">
              <Meta post={featured} light />
              <h2 className="display mt-4 text-[clamp(2rem,5vw,4.4rem)] font-bold leading-[0.95] text-white">{featured.title}</h2>
              <p className="mt-4 max-w-[52ch] text-white/80">{featured.description}</p>
            </div>
            <div className="md:col-span-4 md:flex md:justify-end">
              <span className="inline-flex h-12 items-center gap-2 rounded-full bg-signal px-6 font-medium text-on-signal">
                {featured.type === 'external' ? <>Read on {featured.platform} <ArrowUpRight size={16} /></> : <>Read article <ArrowRight size={16} /></>}
              </span>
            </div>
          </div>
        </PostLink>
      </Reveal>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {rest.map((post, i) => (
          <Reveal key={post.id} delay={i * 0.08}>
            <PostLink post={post} className="group flex h-full flex-col overflow-hidden rounded-panel border border-line/10 bg-surface transition-colors duration-500 hover:border-line/30">
              <div className="aspect-[16/9] overflow-hidden">
                <img src={post.cover} alt="" width="800" height="450" loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col p-6 md:p-8">
                <Meta post={post} />
                <h2 className="display mt-3 text-2xl font-semibold leading-tight text-ink md:text-3xl">{post.title}</h2>
                <p className="mt-3 text-muted">{post.description}</p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-6" aria-label="Tags">
                  {post.tags.map((t) => <li key={t} className="rounded-full border border-line/15 px-3 py-1 text-xs text-muted">{t}</li>)}
                </ul>
              </div>
            </PostLink>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
