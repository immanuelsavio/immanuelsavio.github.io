import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight, ArrowUpRight, Copy, Hash, MagnifyingGlass, Moon, Notebook, Wrench,
} from '@phosphor-icons/react';
import { posts, resume, sections, socials } from '../content';
import { useSmoothScroll } from '../lib/smooth-scroll';
import { useTheme } from '../lib/theme';
import { EASE, SocialIcon } from '../ui/primitives';

export default function CommandPalette({ open, onClose }) {
  const navigate = useNavigate();
  const { goToSection, setLocked } = useSmoothScroll();
  const { toggle, theme } = useTheme();
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(0);
  const [toast, setToast] = useState(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const actions = useMemo(() => [
    ...sections.map((s) => ({ id: `s-${s.id}`, group: 'Sections', label: s.label, icon: <Hash size={16} />, run: () => goToSection(s.id) })),
    { id: 'p-blog', group: 'Pages', label: 'Writing', icon: <Notebook size={16} />, run: () => navigate('/blog') },
    { id: 'p-play', group: 'Pages', label: 'Playground', icon: <Wrench size={16} />, run: () => navigate('/playground') },
    { id: 'p-toon', group: 'Pages', label: 'JSON to TOON converter', icon: <Wrench size={16} />, run: () => navigate('/playground/json-to-toon') },
    ...posts.map((p) => ({
      id: `b-${p.id}`,
      group: 'Articles',
      label: p.title,
      icon: p.type === 'external' ? <ArrowUpRight size={16} /> : <Notebook size={16} />,
      run: () => (p.type === 'external' ? window.open(p.link, '_blank', 'noopener') : navigate(p.link)),
    })),
    {
      id: 'a-copy',
      group: 'Actions',
      label: 'Copy email address',
      icon: <Copy size={16} />,
      keep: true,
      run: async () => {
        try {
          await navigator.clipboard.writeText(resume.contact.email);
          setToast('Email copied');
        } catch {
          setToast(resume.contact.email);
        }
      },
    },
    { id: 'a-theme', group: 'Actions', label: `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`, icon: <Moon size={16} />, keep: true, run: toggle },
    ...socials.filter((s) => s.kind !== 'email').map((s) => ({
      id: `l-${s.kind}`, group: 'Links', label: s.label, icon: <SocialIcon kind={s.kind} size={16} />, run: () => window.open(s.href, '_blank', 'noopener'),
    })),
  ], [goToSection, navigate, theme, toggle]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((a) => `${a.label} ${a.group}`.toLowerCase().includes(q));
  }, [actions, query]);

  useEffect(() => { setIndex(0); }, [query]);

  useEffect(() => {
    if (!open) return undefined;
    setQuery('');
    setToast(null);
    setLocked(true);
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    return () => { clearTimeout(t); setLocked(false); };
  }, [open, setLocked]);

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${index}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [index]);

  const run = (a) => {
    if (!a) return;
    a.run();
    if (!a.keep) onClose();
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setIndex((i) => Math.min(i + 1, filtered.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setIndex((i) => Math.max(i - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); run(filtered[index]); }
    else if (e.key === 'Escape') { e.preventDefault(); onClose(); }
  };

  let lastGroup = null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-palette flex items-start justify-center bg-ink/40 px-4 pt-[14vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            className="w-full max-w-xl overflow-hidden rounded-panel border border-line/15 bg-raised shadow-[0_30px_80px_-20px_rgb(0_0_0/0.45)]"
            initial={{ y: 16, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 8, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <div className="flex items-center gap-3 border-b border-line/10 px-5">
              <MagnifyingGlass size={18} className="text-muted" aria-hidden />
              <label htmlFor="cmdk" className="sr-only">Search commands</label>
              <input
                id="cmdk"
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Jump to a section, article or action…"
                autoComplete="off"
                spellCheck={false}
                role="combobox"
                aria-expanded="true"
                aria-controls="cmdk-list"
                aria-activedescendant={filtered[index] ? `cmdk-${filtered[index].id}` : undefined}
                className="h-14 w-full bg-transparent text-base text-ink outline-none placeholder:text-muted"
              />
              <kbd className="rounded-md border border-line/15 px-1.5 py-0.5 font-mono text-[0.7rem] text-muted">esc</kbd>
            </div>
            <ul id="cmdk-list" ref={listRef} role="listbox" className="max-h-[50vh] overflow-y-auto p-2" data-lenis-prevent>
              {filtered.length === 0 && (
                <li className="px-4 py-10 text-center text-sm text-muted">
                  Nothing matches &ldquo;{query}&rdquo;. Try &ldquo;blog&rdquo;, &ldquo;talks&rdquo; or &ldquo;email&rdquo;.
                </li>
              )}
              {filtered.map((a, i) => {
                const header = a.group !== lastGroup ? a.group : null;
                lastGroup = a.group;
                const selected = i === index;
                return (
                  <li key={a.id} role="presentation">
                    {header && <p className="label px-3 pb-1 pt-3 !text-[0.65rem]">{header}</p>}
                    <button
                      type="button"
                      id={`cmdk-${a.id}`}
                      role="option"
                      aria-selected={selected}
                      data-index={i}
                      onMouseMove={() => setIndex(i)}
                      onClick={() => run(a)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${selected ? 'bg-ink text-paper' : 'text-ink'}`}
                    >
                      <span className={selected ? 'text-signal' : 'text-muted'}>{a.icon}</span>
                      <span className="flex-1 truncate">{a.label}</span>
                      {selected && <ArrowRight size={14} aria-hidden />}
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center justify-between border-t border-line/10 px-5 py-3 text-xs text-muted" aria-live="polite">
              <span>{toast ?? 'Arrow keys to move, enter to select'}</span>
              <span className="font-mono">⌘K</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
