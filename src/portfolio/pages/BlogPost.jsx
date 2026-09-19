import { useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Copy } from '@phosphor-icons/react';
import { formatDate, posts } from '../content';
import { Button, EASE } from '../ui/primitives';
import { usePageTitle } from '../lib/use-page-title';

function CodeBlock({ children }) {
  const ref = useRef(null);
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(ref.current?.innerText ?? '');
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch { /* clipboard blocked */ }
  };
  return (
    <div className="group relative my-8">
      <pre ref={ref} className="overflow-x-auto rounded-panel border border-line/10 bg-surface p-5 font-mono text-sm leading-relaxed text-ink md:p-6" data-lenis-prevent>
        {children}
      </pre>
      <button
        type="button"
        onClick={copy}
        className="absolute right-3 top-3 inline-flex h-8 items-center gap-1.5 rounded-full border border-line/15 bg-paper/80 px-3 text-xs text-muted backdrop-blur transition-colors hover:text-ink"
      >
        {copied ? <Check size={12} weight="bold" /> : <Copy size={12} />} {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}

const md = {
  h1: (p) => <h2 className="display mb-6 mt-14 text-4xl font-bold leading-tight text-ink" {...p} />,
  h2: (p) => <h2 className="display mb-5 mt-14 text-3xl font-semibold leading-tight text-ink md:text-4xl" {...p} />,
  h3: (p) => <h3 className="display mb-4 mt-10 text-2xl font-semibold text-ink" {...p} />,
  p: (p) => <p className="mb-6 text-lg leading-[1.75] text-ink/80" {...p} />,
  ul: (p) => <ul className="mb-6 space-y-3 text-lg text-ink/80" {...p} />,
  ol: (p) => <ol className="mb-6 list-decimal space-y-3 pl-6 text-lg text-ink/80" {...p} />,
  li: ({ children }) => (
    <li className="flex gap-3 leading-[1.7]">
      <span aria-hidden className="mt-[0.85em] h-px w-4 shrink-0 bg-signal" />
      <span>{children}</span>
    </li>
  ),
  strong: (p) => <strong className="font-semibold text-ink" {...p} />,
  blockquote: (p) => <blockquote className="my-8 border-l-2 border-signal pl-6 text-xl text-ink" {...p} />,
  pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
  code: ({ className, children }) =>
    className || String(children).includes('\n')
      ? <code className={className}>{children}</code>
      : <code className="rounded-md bg-surface px-1.5 py-0.5 font-mono text-[0.9em] text-signal">{children}</code>,
  a: ({ href, children }) => {
    if (href === '/playground/json-to-toon') {
      return (
        <span className="not-prose my-4 block">
          <Button to={href} size="lg">{children} <ArrowRight size={16} weight="bold" /></Button>
        </span>
      );
    }
    if (href?.startsWith('/')) return <Link to={href} className="font-medium text-signal underline underline-offset-4">{children}</Link>;
    return <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-signal underline underline-offset-4">{children}</a>;
  },
};

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.link === `/blog/${slug}`);
  const reduce = useReducedMotion();
  const hero = useRef(null);
  const { scrollYProgress } = useScroll({ target: hero, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '18%']);
  usePageTitle(post?.title ?? 'Post not found');

  if (!post || post.type !== 'internal') {
    return (
      <div className="shell flex min-h-[80dvh] flex-col items-start justify-center pt-24">
        <p className="display text-[clamp(3rem,10vw,8rem)] font-bold leading-none text-ink">Not here.</p>
        <p className="mt-4 text-lg text-muted">That article doesn&apos;t exist or lives on another site.</p>
        <Button to="/blog" variant="ghost" className="mt-8"><ArrowLeft size={14} /> Back to articles</Button>
      </div>
    );
  }

  return (
    <article className="pb-28 pt-32 md:pb-40 md:pt-40">
      <header className="shell">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink">
          <ArrowLeft size={14} /> Back to articles
        </Link>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE }}
          className="mx-auto mt-10 max-w-4xl"
        >
          <p className="flex flex-wrap items-center gap-3 text-sm text-muted">
            <time dateTime={post.date} className="font-mono">{formatDate(post.date)}</time>
            {post.tags.map((t) => <span key={t} className="rounded-full border border-line/15 px-3 py-1 text-xs">{t}</span>)}
          </p>
          <h1 className="display mt-6 text-[clamp(2.8rem,7vw,6.2rem)] font-bold leading-[0.92] text-ink [font-variation-settings:'opsz'_96,'wdth'_80]">
            {post.title}
          </h1>
          <p className="mt-6 max-w-[56ch] text-xl leading-relaxed text-muted">{post.description}</p>
        </motion.div>
      </header>

      {post.cover && (
        <div ref={hero} className="shell mt-14 md:mt-20">
          <div className="aspect-[16/9] overflow-hidden rounded-panel bg-surface md:aspect-[21/9]">
            <motion.img src={post.cover} alt="" width="1400" height="600" style={{ y: imgY, scale: 1.15 }} className="h-full w-full object-cover" />
          </div>
        </div>
      )}

      <div className="shell mt-16 md:mt-24">
        <div className="mx-auto max-w-[68ch]">
          {/* The title is already the page h1, so drop the markdown's own leading h1 */}
          <ReactMarkdown components={md}>{post.content.replace(/^# .*\n+/, '')}</ReactMarkdown>
        </div>
      </div>
    </article>
  );
}
