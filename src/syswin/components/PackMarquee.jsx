import { Link } from 'react-router-dom';
import { ArrowRight } from '@phosphor-icons/react';
import { products, specialityName, stats } from '../data/catalog';
import { Button, Headline, Pack } from '../ui';

// Products that sit in the most specialities make the best ambassadors.
const featured = [...products]
  .sort((a, b) => b.specialities.length - a.specialities.length || a.name.localeCompare(b.name))
  .slice(0, 14);

function Row() {
  return (
    <ul className="flex shrink-0 gap-5 pr-5">
      {featured.map((p) => (
        <li key={p.id} className="w-[300px] shrink-0 md:w-[380px]">
          <Link
            to={`/syswin/portfolio?product=${p.id}`}
            className="group block overflow-hidden rounded-sx bg-sx-surface ring-1 ring-sx-line/10 transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgb(10_22_48/0.35)]"
          >
            <Pack product={p} className="aspect-[16/10] p-6" />
            <div className="flex items-center justify-between gap-4 px-5 py-4">
              <span className="font-medium text-sx-ink">{p.name}</span>
              <span className="truncate text-sm text-sx-muted">{p.specialities.map(specialityName).join(', ')}</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function PackMarquee() {
  return (
    <section aria-labelledby="sx-packs-title" className="overflow-hidden py-28 md:py-40">
      <div className="sx-shell mb-12 flex flex-wrap items-end justify-between gap-8 md:mb-16">
        <div className="max-w-2xl">
          <Headline
            lines={['A practical portfolio', 'for everyday practice.']}
            className="text-[clamp(2.2rem,4.8vw,4.4rem)] font-semibold leading-[1] text-sx-ink"
          />
          <h2 id="sx-packs-title" className="sr-only">Featured products</h2>
        </div>
        <Button to="/syswin/portfolio" variant="ink" size="lg">
          Browse all {stats.products} products <ArrowRight size={16} weight="bold" />
        </Button>
      </div>
      {/* Hover pauses the strip; each card links to its product sheet */}
      <div className="flex w-max sx-marquee" aria-label="Featured products">
        <Row />
        <div aria-hidden className="contents"><Row /></div>
      </div>
    </section>
  );
}
