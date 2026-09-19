import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft, ArrowsLeftRight, BookOpen, Check, ClipboardText, Copy, Sparkle, Trash, WarningCircle,
} from '@phosphor-icons/react';
import { jsonToToon } from '../lib/toon';
import { Button, EASE } from '../ui/primitives';
import { usePageTitle } from '../lib/use-page-title';

const SAMPLE = `{
  "instructions": [
    {"step": 1, "action": "Find some JSON", "status": "done"},
    {"step": 2, "action": "Paste it here", "status": "waiting"},
    {"step": 3, "action": "Click convert", "status": "pending"},
    {"step": 4, "action": "Watch the magic", "status": "pending"}
  ]
}`;

const OUTPUT_HINT = `instructions[4]{step,action,status}:
  1,Find some JSON,done
  2,Paste it here,waiting
  3,Click convert,pending
  4,Watch the magic,pending`;

function IconButton({ label, onClick, children, danger }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className={`grid h-9 w-9 place-items-center rounded-full border border-line/15 bg-paper/80 text-muted backdrop-blur transition-colors ${danger ? 'hover:border-signal hover:text-signal' : 'hover:border-ink hover:text-ink'}`}
    >
      {children}
    </button>
  );
}

export default function JsonToToon() {
  usePageTitle('JSON to TOON');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState(null);

  const convert = (text = input) => {
    setError(null);
    setOutput('');
    setStats(null);
    if (!text.trim()) return;
    try {
      const result = jsonToToon(text);
      setOutput(result);
      const compact = JSON.stringify(JSON.parse(text));
      setStats({ json: compact.length, toon: result.length });
    } catch (err) {
      setError(err.message);
    }
  };

  const paste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
    } catch {
      setError('Clipboard access was blocked. Paste with Ctrl/Cmd + V instead.');
    }
  };

  const copy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard blocked */ }
  };

  const onKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      convert();
    }
  };

  const saved = stats && stats.json > 0 ? Math.round((1 - stats.toon / stats.json) * 100) : null;

  return (
    <div className="shell pb-24 pt-32 md:pt-40">
      <Link to="/playground" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink">
        <ArrowLeft size={14} /> Playground
      </Link>

      <header className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="display text-[clamp(2.6rem,7vw,5.6rem)] font-bold leading-[0.92] text-ink [font-variation-settings:'opsz'_96,'wdth'_80]">
            JSON to TOON Converter
          </h1>
          <p className="mt-4 text-lg text-muted">Convert standard JSON to the compact TOON format.</p>
        </div>
        <Button to="/blog/what-is-toon" variant="ghost">
          <BookOpen size={16} /> Read: What is TOON?
        </Button>
      </header>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-2">
          <div className="flex h-9 items-center justify-between">
            <label htmlFor="toon-input" className="text-sm font-medium text-ink">Input JSON</label>
            <button type="button" onClick={() => setInput(SAMPLE)} className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink">
              <Sparkle size={14} /> Load example
            </button>
          </div>
          <div className="relative">
            <textarea
              id="toon-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={SAMPLE}
              spellCheck={false}
              data-lenis-prevent
              className="h-[48vh] min-h-[360px] w-full resize-none rounded-panel border border-line/15 bg-raised p-5 font-mono text-sm leading-relaxed text-ink placeholder:text-muted/70 focus:border-ink focus:outline-none"
            />
            <div className="absolute right-3 top-3 flex gap-2">
              <IconButton label="Paste from clipboard" onClick={paste}><ClipboardText size={16} /></IconButton>
              <IconButton label="Clear" onClick={() => { setInput(''); setOutput(''); setError(null); setStats(null); }} danger><Trash size={16} /></IconButton>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex h-9 items-center justify-between">
            <label htmlFor="toon-output" className="text-sm font-medium text-ink">Output TOON</label>
            {output && (
              <button type="button" onClick={copy} className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink" aria-live="polite">
                {copied ? <Check size={14} weight="bold" /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>
          <div className="relative">
            <textarea
              id="toon-output"
              readOnly
              value={output}
              placeholder={OUTPUT_HINT}
              spellCheck={false}
              data-lenis-prevent
              aria-describedby={error ? 'toon-error' : undefined}
              className={`h-[48vh] min-h-[360px] w-full resize-none rounded-panel border bg-surface p-5 font-mono text-sm leading-relaxed text-ink placeholder:text-muted/70 focus:outline-none ${error ? 'border-signal' : 'border-line/10'}`}
            />
            <AnimatePresence>
              {error && (
                <motion.p
                  id="toon-error"
                  role="alert"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="absolute inset-x-4 bottom-4 flex items-center gap-2 rounded-2xl border border-signal bg-paper/95 px-4 py-3 text-sm font-medium text-signal"
                >
                  <WarningCircle size={16} aria-hidden /> {error}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-sm text-muted" aria-live="polite">
          {stats ? (
            <>
              <span className="font-mono text-ink">{stats.json.toLocaleString()}</span> chars of minified JSON to{' '}
              <span className="font-mono text-ink">{stats.toon.toLocaleString()}</span> chars of TOON
              {saved !== null && saved > 0 && <span className="text-signal">, {saved}% smaller</span>}
            </>
          ) : (
            <>Tip: press <kbd className="rounded border border-line/15 px-1.5 font-mono text-xs">Ctrl/⌘</kbd> + <kbd className="rounded border border-line/15 px-1.5 font-mono text-xs">Enter</kbd> to convert.</>
          )}
        </p>
        <Button size="lg" onClick={() => convert()}>
          <ArrowsLeftRight size={18} weight="bold" /> Convert to TOON
        </Button>
      </div>
    </div>
  );
}
