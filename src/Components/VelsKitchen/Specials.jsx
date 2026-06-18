import { useOrderModal } from './orderContext';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { specialsConfig, getImagePath, getHiResPath, findMenuItem } from './menuData';
import { FadeIn, SectionLabel, GoldDivider, FoodImage, TagPill } from './vkHelpers';

function resolve(names) {
  return names.map((n) => findMenuItem(n)).filter(Boolean);
}

const weekendItems = resolve(specialsConfig.weekend);
const featuredItems = resolve(specialsConfig.featured);
const newItems = resolve(specialsConfig.newItems);

export default function Specials() {
  const openOrder = useOrderModal();
  return (
    <div className="overflow-hidden">
      {/* ── Header ────────────────────────────────── */}
      <section className="pt-24 pb-10 px-5 text-center">
        <FadeIn>
          <SectionLabel>This Week</SectionLabel>
          <h1 className="vk-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[var(--vk-text)] mt-3">
            Specials
          </h1>
        </FadeIn>
      </section>

      {/* ── Weekend Only ──────────────────────────── */}
      <section className="px-5 py-12 lg:py-20">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="mb-8">
            <h2 className="vk-serif text-xl sm:text-2xl text-[var(--vk-text)]">Weekend Only</h2>
            <div className="vk-gold-rule mt-3 mb-4" />
            <p className="text-[var(--vk-text-secondary)] text-sm leading-relaxed max-w-lg">
              Available Friday through Sunday. Kongu biryani cooked with seeraga samba rice,
              kingfish fresh from the market.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {weekendItems.map((item, i) => {
              const img = getHiResPath(item.name);
              return (
                <FadeIn key={item.name} delay={i * 0.08}>
                  <div className="vk-card overflow-hidden h-full flex flex-col">
                    {img ? (
                      <div className="h-44 sm:h-52 w-full overflow-hidden">
                        <img
                          src={img}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="h-44 sm:h-52 w-full bg-[var(--vk-surface-raised)] vk-kolam flex items-center justify-center">
                        <span className="text-3xl opacity-40 vk-serif">{item.name.charAt(0)}</span>
                      </div>
                    )}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="vk-serif text-base font-semibold text-[var(--vk-text)] leading-snug">
                          {item.name}
                        </h3>
                        <span className="text-[var(--vk-gold)] font-bold text-sm whitespace-nowrap">
                          {item.price}
                        </span>
                      </div>
                      <p className="text-[var(--vk-text-secondary)] text-xs leading-relaxed mt-2 line-clamp-2">
                        {item.description}
                      </p>
                      {item.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {item.tags.map((t) => (
                            <TagPill key={t} tag={t} />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ── Staff Picks / Featured ────────────────── */}
      <section className="px-5 py-12 lg:py-20">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="mb-8">
            <h2 className="vk-serif text-xl sm:text-2xl text-[var(--vk-text)]">
              What we'd order
            </h2>
            <div className="vk-gold-rule mt-3" />
          </FadeIn>

          {/* Horizontal scroll on mobile, 3-col grid on desktop */}
          <div className="flex gap-4 overflow-x-auto pb-4 vk-scrollbar-hide lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
            {featuredItems.map((item, i) => (
              <FadeIn key={item.name} delay={i * 0.06} className="flex-shrink-0 w-52 lg:w-auto">
                <div className="vk-card-flat p-4 flex items-center gap-3 h-full">
                  <FoodImage name={item.name} size={56} />
                  <div className="min-w-0">
                    <h4 className="font-semibold text-[var(--vk-text)] text-sm leading-snug truncate">
                      {item.name}
                    </h4>
                    <span className="text-[var(--vk-gold)] font-bold text-xs mt-0.5 block">
                      {item.price}
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ── New on the Menu ───────────────────────── */}
      <section className="px-5 py-12 lg:py-20">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="mb-8">
            <h2 className="vk-serif text-xl sm:text-2xl text-[var(--vk-text)]">Just added</h2>
            <div className="vk-gold-rule mt-3" />
          </FadeIn>

          <div className="flex flex-col gap-3">
            {newItems.map((item, i) => (
              <FadeIn key={item.name} delay={i * 0.08}>
                <div className="vk-card-flat flex items-center gap-4 p-4">
                  <FoodImage name={item.name} size={48} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-[var(--vk-text)] text-sm leading-snug truncate">
                        {item.name}
                      </h4>
                      <span className="vk-tag bg-amber-900/40 text-[var(--vk-gold)] flex-shrink-0">
                        NEW
                      </span>
                    </div>
                    <p className="text-[var(--vk-text-secondary)] text-xs leading-relaxed mt-1 line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                  <span className="text-[var(--vk-gold)] font-bold text-sm whitespace-nowrap flex-shrink-0">
                    {item.price}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ── Bottom CTA ────────────────────────────── */}
      <section className="px-5 py-16 lg:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/velskitchen/menu"
                className="vk-btn-outline py-3 px-6 text-sm inline-flex items-center gap-2 min-h-[44px]"
              >
                See the full menu <FiArrowRight className="text-base" />
              </Link>
              <button
                onClick={openOrder}
                className="vk-btn-gold py-3 px-6 text-sm inline-flex items-center gap-2 min-h-[44px]"
              >
                Order now <FiArrowRight className="text-base" />
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="h-8" />
    </div>
  );
}
