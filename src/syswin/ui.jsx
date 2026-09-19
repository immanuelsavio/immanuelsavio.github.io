import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Pill } from '@phosphor-icons/react';

export const EASE = [0.22, 1, 0.36, 1];

export function Reveal({ children, delay = 0, y = 32, className, as = 'div', amount = 0.2 }) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </M>
  );
}

/** Headline whose lines rise out of a mask. Pass lines as an array. */
export function Headline({ lines, as = 'h2', className = '', delay = 0, animateOnMount = false }) {
  const reduce = useReducedMotion();
  const M = motion[as];
  const trigger = animateOnMount
    ? { initial: 'hidden', animate: 'show' }
    : { initial: 'hidden', whileInView: 'show', viewport: { once: true, amount: 0.5 } };
  return (
    <M className={`sx-display ${className}`} {...trigger} aria-label={lines.join(' ')}>
      {lines.map((line, i) => (
        <span key={line} aria-hidden className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
          <motion.span
            className="block will-change-transform"
            variants={{
              hidden: reduce ? { y: 0 } : { y: '105%' },
              show: { y: 0, transition: { duration: 1.1, ease: EASE, delay: delay + i * 0.09 } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </M>
  );
}

const base =
  'group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[background-color,color,border-color,transform] duration-300 ease-out active:scale-[0.97]';
const variants = {
  primary: 'bg-sx-brand text-sx-on-brand hover:bg-sx-ink hover:text-sx-paper',
  ink: 'bg-sx-ink text-sx-paper hover:bg-sx-brand hover:text-sx-on-brand',
  ghost: 'border border-sx-line/20 text-sx-ink hover:border-sx-ink hover:bg-sx-ink hover:text-sx-paper',
  light: 'bg-white text-[#0A1630] hover:bg-sx-brand hover:text-white',
  outlineLight: 'border border-white/30 text-white hover:bg-white hover:text-[#0A1630]',
};
const sizes = { sm: 'h-9 px-4 text-sm', md: 'h-11 px-5 text-sm', lg: 'h-14 px-7 text-[0.95rem]' };

export function Button({ to, href, variant = 'primary', size = 'md', className = '', children, ...rest }) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>;
  if (href) {
    const ext = /^https?:/.test(href);
    return <a href={href} className={cls} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>{children}</a>;
  }
  return <button type="button" className={cls} {...rest}>{children}</button>;
}

/** Product label image on a calm mat, with a graceful fallback if the remote image fails. */
export function Pack({ product, className = '', imgClassName = '', loading = 'lazy' }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`sx-mat relative grid place-items-center overflow-hidden ${className}`}>
      {failed ? (
        <div className="flex flex-col items-center gap-2 p-6 text-center text-[#546078]">
          <Pill size={28} aria-hidden />
          <span className="sx-display text-lg font-semibold text-[#0A1630]">{product.name}</span>
        </div>
      ) : (
        <img
          src={product.image}
          alt={`${product.name} pack label`}
          width="952"
          height="425"
          loading={loading}
          decoding="async"
          onError={() => setFailed(true)}
          className={`h-auto w-full object-contain drop-shadow-[0_14px_24px_rgb(10_22_48/0.14)] ${imgClassName}`}
        />
      )}
    </div>
  );
}
