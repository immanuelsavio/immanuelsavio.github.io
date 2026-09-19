import { Link } from 'react-router-dom';
import { ArrowRight, ArrowsLeftRight, Hammer } from '@phosphor-icons/react';
import { MaskText, Reveal } from '../ui/primitives';
import { usePageTitle } from '../lib/use-page-title';

const tools = [
  {
    id: 'json-to-toon',
    title: 'JSON to TOON',
    description: 'Convert standard JSON data into the compact TOON format for easier readability and editing.',
    path: '/playground/json-to-toon',
    sample: ['users[2]{id,name,city}:', '  1,Immanuel,Chicago', '  2,Ritwik,Toronto'],
  },
];

export default function Playground() {
  usePageTitle('Playground');
  return (
    <div className="shell pb-28 pt-36 md:pb-40 md:pt-44">
      <header className="mb-16 md:mb-24">
        <MaskText
          as="h1"
          text="Playground"
          className="display text-[clamp(3.2rem,12vw,11rem)] font-bold leading-[0.88] text-ink [font-variation-settings:'opsz'_96,'wdth'_75]"
        />
        <Reveal as="p" delay={0.3} className="mt-6 max-w-[48ch] text-lg text-muted md:text-xl">
          A collection of small tools, experiments, and utilities I&apos;ve built.
        </Reveal>
      </header>

      <div className="grid gap-6 md:grid-cols-12">
        {tools.map((t) => (
          <Reveal key={t.id} className="md:col-span-8">
            <Link to={t.path} className="group grid h-full overflow-hidden rounded-panel bg-ink text-paper md:grid-cols-2">
              <div className="flex flex-col p-8 md:p-10">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-signal text-on-signal">
                  <ArrowsLeftRight size={20} weight="bold" aria-hidden />
                </span>
                <h2 className="display mt-10 text-4xl font-bold leading-none md:text-5xl">{t.title}</h2>
                <p className="mt-4 text-paper/70">{t.description}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-10 font-medium">
                  Open tool <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
              <div className="flex items-center border-t border-paper/10 bg-paper/5 p-8 md:border-l md:border-t-0 md:p-10">
                <pre className="font-mono text-sm leading-relaxed text-paper/80 transition-transform duration-700 ease-out group-hover:-translate-y-1">
                  {t.sample.join('\n')}
                </pre>
              </div>
            </Link>
          </Reveal>
        ))}

        {/* Empty state for future tools */}
        <Reveal delay={0.1} className="md:col-span-4">
          <div className="flex h-full min-h-[280px] flex-col justify-between rounded-panel border border-dashed border-line/25 p-8">
            <Hammer size={28} className="text-muted" aria-hidden />
            <div>
              <h2 className="display text-2xl font-semibold text-ink">More coming soon</h2>
              <p className="mt-2 text-muted">I&apos;m always building new things. Check back later!</p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
