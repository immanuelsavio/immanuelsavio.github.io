import React from 'react';
import { motion } from 'framer-motion';

/**
 * SectionHeading — "Precision Dark" editorial heading
 *
 * Props:
 *   number   — zero-padded string e.g. "01"
 *   title    — the main h2 text
 *   subtitle — optional short descriptor
 *   align    — "left" (default) | "center"
 */
const SectionHeading = ({ number, title, subtitle, align = 'left' }) => {
  const isCenter = align === 'center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-16 ${isCenter ? 'text-center' : 'text-left'}`}
    >
      {number && (
        <p className="font-mono text-xs tracking-[0.25em] text-accent uppercase mb-3 opacity-80">
          {number}
        </p>
      )}

      <div className={`flex items-start gap-4 ${isCenter ? 'justify-center' : ''}`}>
        {!isCenter && (
          <div className="hidden md:block w-0.5 self-stretch bg-accent/50 flex-shrink-0 mt-1 rounded-full" />
        )}
        <div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-text leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-text-muted text-base mt-3 max-w-xl">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SectionHeading;
