import { useOrderModal } from './orderContext';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiUsers } from 'react-icons/fi';
import { tastingMenus } from './menuData';
import { FadeIn, SectionLabel, GoldDivider } from './vkHelpers';

const steps = [
  { num: '1', label: 'Pick a box' },
  { num: '2', label: 'We cook everything fresh' },
  { num: '3', label: 'Delivered together, ready to eat' },
];

export default function Tasting() {
  const openOrder = useOrderModal();
  return (
    <div className="overflow-hidden">
      {/* ── Header ──────────────────────────────── */}
      <section className="pt-24 pb-10 px-5 text-center max-w-3xl mx-auto">
        <FadeIn>
          <SectionLabel>Curated Boxes</SectionLabel>
        </FadeIn>

        <FadeIn delay={0.08}>
          <h1 className="vk-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[var(--vk-text)] mt-4 leading-tight">
            Tasting Menus
          </h1>
        </FadeIn>

        <FadeIn delay={0.16}>
          <p className="text-[var(--vk-text-secondary)] text-base sm:text-lg mt-4 max-w-lg mx-auto leading-relaxed">
            Curated selections, delivered as one order. Pick a box, we handle the rest.
          </p>
        </FadeIn>
      </section>

      {/* ── Tasting Cards ───────────────────────── */}
      <section className="px-5 pb-16 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {tastingMenus.map((menu, i) => (
            <FadeIn key={menu.id} delay={i * 0.1}>
              <div className="vk-card p-0 overflow-hidden flex flex-col h-full">
                {/* Hero image */}
                <div className="h-40 sm:h-48 w-full overflow-hidden">
                  <img
                    src={`/velskitchen/images/${menu.heroImage}`}
                    alt={menu.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  <h2 className="vk-serif text-xl sm:text-2xl font-semibold text-[var(--vk-text)]">
                    {menu.name}
                  </h2>

                  <p className="text-[var(--vk-gold)] italic text-sm mt-1.5 leading-relaxed">
                    {menu.tagline}
                  </p>

                  {/* Price + Serves */}
                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-[var(--vk-gold)] text-2xl font-bold vk-serif">
                      {menu.price}
                    </span>
                    <span className="flex items-center gap-1.5 text-[var(--vk-text-secondary)] text-sm">
                      <FiUsers className="text-sm" />
                      Serves {menu.serves}
                    </span>
                  </div>

                  <p className="text-[var(--vk-text-secondary)] text-sm leading-relaxed mt-3">
                    {menu.description}
                  </p>

                  {/* Items */}
                  <div className="mt-4">
                    <span className="text-[var(--vk-text)] text-xs font-semibold uppercase tracking-wider">
                      What's included:
                    </span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {menu.items.map((item) => (
                        <span
                          key={item}
                          className="text-xs px-2.5 py-1 rounded-full bg-[var(--vk-surface-raised)] text-[var(--vk-text-secondary)] border border-[var(--vk-border)]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Order button */}
                  <div className="mt-auto pt-5">
                    <button
                      onClick={openOrder}
                      className="vk-btn-gold w-full py-3 text-sm inline-flex items-center justify-center gap-2"
                    >
                      Order This Box <FiArrowRight className="text-base" />
                    </button>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <GoldDivider />

      {/* ── How It Works ────────────────────────── */}
      <section className="px-5 py-12 max-w-3xl mx-auto text-center">
        <FadeIn>
          <SectionLabel>How It Works</SectionLabel>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mt-8">
            {steps.map((step, i) => (
              <div key={step.num} className="flex items-center gap-3 sm:flex-col sm:gap-2">
                <span className="vk-serif text-2xl font-bold text-[var(--vk-gold)]">
                  {step.num}
                </span>
                <span className="text-[var(--vk-text)] text-sm sm:text-base">
                  {step.label}
                </span>
                {i < steps.length - 1 && (
                  <span className="hidden sm:inline text-[var(--vk-gold-dim)] text-lg ml-4 sm:ml-0 sm:mt-0">
                    &rarr;
                  </span>
                )}
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      <GoldDivider />

      {/* ── Bottom Note ─────────────────────────── */}
      <section className="px-5 py-12 pb-20 max-w-2xl mx-auto text-center">
        <FadeIn>
          <p className="text-[var(--vk-text-secondary)] text-base leading-relaxed">
            Want something custom? Mix and match from our full menu.
          </p>
          <Link
            to="/velskitchen/menu"
            className="vk-btn-outline py-3 px-6 text-sm inline-flex items-center gap-2 mt-5"
          >
            Browse Full Menu <FiArrowRight className="text-base" />
          </Link>
        </FadeIn>
      </section>
    </div>
  );
}
