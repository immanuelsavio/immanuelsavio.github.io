import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { getImagePath } from './menuData';

export function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionLabel({ children }) {
  return (
    <span className="text-[var(--vk-gold)] vk-serif italic text-sm tracking-wide">
      {children}
    </span>
  );
}

export function GoldRule() {
  return <div className="vk-gold-rule mx-auto mt-3 mb-1" />;
}

export function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-6">
      <div className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--vk-gold)]/20" />
      <span className="text-[var(--vk-gold)]/30 text-xs">✦</span>
      <div className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--vk-gold)]/20" />
    </div>
  );
}

const tagStyles = {
  Vegetarian: 'bg-emerald-900/40 text-emerald-400',
  Spicy: 'bg-red-900/40 text-red-400',
  Popular: 'bg-amber-900/40 text-amber-400',
  'Best Seller': 'bg-amber-900/40 text-amber-400',
  Weekend: 'bg-purple-900/40 text-purple-400',
  Special: 'bg-rose-900/40 text-rose-400',
  Sampler: 'bg-blue-900/40 text-blue-400',
  Chicken: 'bg-orange-900/30 text-orange-400',
  Egg: 'bg-yellow-900/30 text-yellow-400',
  Seafood: 'bg-cyan-900/40 text-cyan-400',
  Cold: 'bg-sky-900/30 text-sky-400',
  Hot: 'bg-red-900/30 text-red-400',
};

export function TagPill({ tag }) {
  const style = tagStyles[tag] || 'bg-stone-800 text-stone-400';
  return <span className={`vk-tag ${style}`}>{tag}</span>;
}

export function FoodImage({ name, size = 80 }) {
  const src = getImagePath(name);
  if (!src) {
    return (
      <div
        className="vk-img-round flex items-center justify-center bg-[var(--vk-surface-raised)]"
        style={{ width: size, height: size, minWidth: size }}
      >
        <span className="text-[var(--vk-text-secondary)] text-lg font-bold vk-serif">
          {name.charAt(0)}
        </span>
      </div>
    );
  }
  return (
    <div className="vk-img-round" style={{ width: size, height: size, minWidth: size }}>
      <img
        src={src}
        alt={name}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
}

export function FoodImageRect({ name, className = 'h-40' }) {
  const src = getImagePath(name);
  if (!src) {
    return (
      <div className={`${className} w-full bg-[var(--vk-surface-raised)] vk-kolam flex items-center justify-center`}>
        <span className="text-3xl opacity-40 vk-serif">{name.charAt(0)}</span>
      </div>
    );
  }
  return (
    <div className={`${className} w-full overflow-hidden`}>
      <img src={src} alt={name} className="w-full h-full object-cover" loading="lazy" />
    </div>
  );
}

export function MenuCard({ item }) {
  const src = getImagePath(item.name);
  return (
    <div className="vk-card-flat flex gap-3 p-3">
      {src ? (
        <div className="vk-img-round flex-shrink-0" style={{ width: 64, height: 64, minWidth: 64 }}>
          <img src={src} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
        </div>
      ) : (
        <div
          className="vk-img-round flex-shrink-0 flex items-center justify-center bg-[var(--vk-surface-raised)]"
          style={{ width: 64, height: 64, minWidth: 64 }}
        >
          <span className="text-[var(--vk-gold-dim)] text-sm font-bold vk-serif">{item.name.charAt(0)}</span>
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-semibold text-[var(--vk-text)] text-sm leading-snug truncate">
            {item.name}
          </h4>
          <span className="text-[var(--vk-gold)] font-bold text-sm whitespace-nowrap">
            {item.price}
          </span>
        </div>
        <p className="text-[var(--vk-text-secondary)] text-xs leading-relaxed mt-1 line-clamp-2">
          {item.description}
        </p>
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1.5">
            {item.tags.map((t) => <TagPill key={t} tag={t} />)}
          </div>
        )}
      </div>
    </div>
  );
}
