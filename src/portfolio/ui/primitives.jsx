import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { EnvelopeSimple, GithubLogo, LinkedinLogo } from '@phosphor-icons/react';
import { SiGooglescholar } from 'react-icons/si';

export const EASE = [0.16, 1, 0.3, 1];

/** Fade + rise when scrolled into view. */
export function Reveal({ children, delay = 0, y = 28, className, as = 'div', amount = 0.25 }) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </M>
  );
}

/** Words slide up out of a clipping mask, used for section headlines. */
export function MaskText({ text, className, delay = 0, as = 'h2', stagger = 0.06 }) {
  const reduce = useReducedMotion();
  const M = motion[as];
  const words = text.split(' ');
  return (
    <M
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={`${w}-${i}`} aria-hidden className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <motion.span
            className="inline-block will-change-transform"
            variants={{
              hidden: reduce ? { y: 0 } : { y: '110%' },
              show: { y: 0, transition: { duration: 1, ease: EASE, delay: delay + i * stagger } },
            }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </M>
  );
}

/** Pulls toward the pointer. Motion values only, no React re-renders. */
export function Magnetic({ children, strength = 0.35, className }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (e) => {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} onPointerMove={onMove} onPointerLeave={reset} style={{ x: sx, y: sy }} className={className ?? 'inline-block'}>
      {children}
    </motion.div>
  );
}

const btnBase =
  'group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[transform,background-color,color,border-color] duration-300 ease-out active:scale-[0.97] disabled:opacity-60 disabled:pointer-events-none';
const btnVariants = {
  primary: 'bg-signal text-on-signal hover:bg-ink hover:text-paper',
  ghost: 'border border-line/20 text-ink hover:border-ink hover:bg-ink hover:text-paper',
  quiet: 'text-ink hover:text-signal',
};
const btnSizes = { md: 'h-11 px-5 text-sm', lg: 'h-14 px-7 text-base', sm: 'h-9 px-4 text-sm' };

/** Button that renders as <Link>, <a> or <button> depending on props. */
export function Button({ to, href, variant = 'primary', size = 'md', className = '', children, ...rest }) {
  const cls = `${btnBase} ${btnVariants[variant]} ${btnSizes[size]} ${className}`;
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>;
  if (href) {
    const external = /^https?:/.test(href);
    return (
      <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
        {children}
      </a>
    );
  }
  return <button type="button" className={cls} {...rest}>{children}</button>;
}

const socialIcons = {
  linkedin: LinkedinLogo,
  github: GithubLogo,
  email: EnvelopeSimple,
};

export function SocialIcon({ kind, size = 20 }) {
  if (kind === 'scholar') return <SiGooglescholar size={size * 0.85} aria-hidden />;
  const Icon = socialIcons[kind];
  return <Icon size={size} weight="regular" aria-hidden />;
}

export function SocialLinks({ items, className = '', size = 20 }) {
  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {items.map((s) => (
        <li key={s.kind}>
          <a
            href={s.href}
            aria-label={s.label}
            title={s.label}
            {...(s.kind !== 'email' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="grid h-11 w-11 place-items-center rounded-full border border-line/15 text-ink/80 transition-colors duration-300 hover:border-signal hover:bg-signal hover:text-on-signal"
          >
            <SocialIcon kind={s.kind} size={size} />
          </a>
        </li>
      ))}
    </ul>
  );
}
