import { useMotionValue, useMotionValueEvent } from 'framer-motion';

/**
 * Wraps a scroll progress value so it only ever increases. Reveals driven by it
 * play once on the way down and stay put when the reader scrolls back up.
 */
export function useRatchet(progress) {
  const max = useMotionValue(0);
  useMotionValueEvent(progress, 'change', (v) => {
    if (v > max.get()) max.set(v);
  });
  return max;
}
