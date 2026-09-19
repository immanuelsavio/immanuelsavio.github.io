import { useEffect } from 'react';

/*
  Section pager: on desktop, one wheel gesture (or PageDown/Space/arrow) moves
  to the next "beat" instead of free-scrolling.

  Beats come from three places:
  - [data-beat] elements: a beat at their top. Tall ones also get extra beats
    about every 80% of a screen so no content is skipped.
    data-beat-offset="N" shifts the beat up by N px (for sticky cards).
    data-beat-fill="false" turns off the extra in-between beats.
  - [data-beat-span] elements (pinned sections): beats at the start and end of
    the pin, i.e. top and top + (height - viewport). data-beat-span="end" keeps
    only the end, so one gesture glides through the whole pinned animation.
    data-beat-duration="S" sets how long (seconds) the glide into that beat takes.
  - providers registered with useBeats (e.g. the horizontal pan's panels).
*/

const providers = new Map();

export function useBeats(key, getBeats) {
  useEffect(() => {
    providers.set(key, getBeats);
    return () => { providers.delete(key); };
  }, [key, getBeats]);
}

const docTop = (el) => el.getBoundingClientRect().top + window.scrollY;

export function computeBeats() {
  const vh = window.innerHeight;
  const max = document.documentElement.scrollHeight - vh;
  const beats = [0, max];
  const durations = new Map();

  document.querySelectorAll('[data-beat]').forEach((el) => {
    const top = docTop(el) - (Number(el.dataset.beatOffset) || 0);
    beats.push(top);
    if (el.dataset.beatFill === 'false') return;
    const end = top + el.offsetHeight - vh;
    for (let y = top + vh * 0.8; y < end; y += vh * 0.8) beats.push(y);
    if (end > top + vh * 0.2) beats.push(end);
  });

  document.querySelectorAll('[data-beat-span]').forEach((el) => {
    const top = docTop(el);
    const end = Math.round(top + el.offsetHeight - vh);
    if (el.dataset.beatSpan !== 'end') beats.push(top);
    beats.push(end);
    if (el.dataset.beatDuration) durations.set(end, Number(el.dataset.beatDuration));
  });

  providers.forEach((get) => { beats.push(...(get() || [])); });

  const sorted = beats
    .map((b) => Math.round(Math.min(Math.max(b, 0), max)))
    .sort((a, b) => a - b);
  // Merge beats closer than 48px so one gesture never lands on a near-duplicate.
  return sorted
    .filter((b, i) => i === 0 || b - sorted[i - 1] > 48)
    .map((y) => ({ y, duration: durations.get(y) }));
}

/** Next beat in a direction: { y, duration? } or undefined at either end. */
export function nextBeat(current, dir) {
  const beats = computeBeats();
  return dir > 0
    ? beats.find((b) => b.y > current + 8)
    : [...beats].reverse().find((b) => b.y < current - 8);
}
