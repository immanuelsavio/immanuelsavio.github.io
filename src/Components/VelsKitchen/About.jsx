import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { useOrderModal } from './VelsKitchen';
import { FadeIn, SectionLabel, GoldDivider } from './vkHelpers';

const konguFacts = [
  { label: 'Region', value: 'Western Tamil Nadu — Coimbatore, Erode, Salem, Tirupur, Karur' },
  { label: 'Signature Rice', value: 'Seeraga Samba — thin, fragrant, absorbs every drop of masala' },
  { label: 'Spice Style', value: 'Dry-roasted, coarse-ground. Minimal water. Maximum flavor.' },
  { label: 'Key Ingredients', value: 'Coconut, sesame, curry leaves, black pepper, fennel, star anise' },
  { label: 'Cooking Method', value: 'Slow, patient. Clay pots. Brass vessels. Low flame.' },
];

function VillagePattern() {
  return (
    <div className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `
          radial-gradient(circle at 20% 30%, rgba(197,165,90,0.3) 1px, transparent 1px),
          radial-gradient(circle at 80% 70%, rgba(197,165,90,0.3) 1px, transparent 1px),
          radial-gradient(circle at 50% 50%, rgba(197,165,90,0.2) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px, 40px 40px, 20px 20px',
      }} />
      <div className="max-w-3xl mx-auto px-5 text-center relative z-10">
        <div className="flex items-center justify-center gap-4 mb-8 text-[var(--vk-gold-dim)] text-2xl opacity-60">
          <span>🌾</span>
          <span className="text-sm">•</span>
          <span>🐂</span>
          <span className="text-sm">•</span>
          <span>🏺</span>
          <span className="text-sm">•</span>
          <span>🌿</span>
          <span className="text-sm">•</span>
          <span>🔥</span>
        </div>
        <p className="vk-serif text-xl md:text-2xl text-[var(--vk-text)] leading-relaxed italic">
          &ldquo;In Kongunadu, cooking is not a shortcut. It is a conversation
          between fire, spice, and patience. The food tells you when it is ready.
          You do not tell the food.&rdquo;
        </p>
        <div className="mt-6 flex items-center justify-center gap-6 text-[var(--vk-text-secondary)] text-xs uppercase tracking-widest">
          <span>Mortar & Pestle</span>
          <span className="text-[var(--vk-gold-dim)]">✦</span>
          <span>Clay Pot</span>
          <span className="text-[var(--vk-gold-dim)]">✦</span>
          <span>Banana Leaf</span>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const openOrder = useOrderModal();
  return (
    <div>
      {/* Header */}
      <section className="pt-28 pb-12 md:pt-36 md:pb-16 text-center px-5">
        <FadeIn>
          <SectionLabel>Our Story</SectionLabel>
          <h1 className="vk-serif font-bold text-3xl md:text-5xl text-[var(--vk-text)] mt-3 mb-5">
            Not another Indian restaurant.
          </h1>
          <p className="text-[var(--vk-text-secondary)] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            We started Vel&apos;s Kitchen because Chicago had enough butter chicken.
            What it didn&apos;t have was the food we actually grew up eating.
          </p>
        </FadeIn>
      </section>

      {/* Origin Story */}
      <section className="py-12 md:py-16 px-5">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="vk-card p-6 md:p-10">
              <h2 className="vk-serif font-bold text-xl md:text-2xl text-[var(--vk-text)] mb-5">
                How it started
              </h2>
              <div className="space-y-4 text-[var(--vk-text-secondary)] text-sm md:text-base leading-relaxed">
                <p>
                  Walk into most Indian restaurants in Chicago and the menu reads
                  the same. Tikka masala. Palak paneer. Garlic naan. It is
                  good food — but it is one narrow slice of a continent-sized
                  cuisine. The template was set decades ago, and nobody bothered
                  to update it.
                </p>
                <p>
                  We are from Kongunadu — the western part of Tamil Nadu. Our
                  food is different. The biryani uses seeraga samba rice, not
                  basmati. The spices are dry-roasted and coarse-ground, not
                  blended into paste. The curries are drier, bolder, and built
                  on coconut, pepper, and fennel — not cream and cashew.
                </p>
                <p>
                  Vel&apos;s Kitchen exists because we wanted to eat our own food.
                  Not a watered-down version. Not a &ldquo;fusion&rdquo; experiment.
                  The actual dishes our mothers and grandmothers made — but
                  available for delivery in Chicago.
                </p>
                <p>
                  We run a cloud kitchen. No dining room, no waiters, no
                  tablecloths. Every dollar goes into ingredients and cooking.
                  That is the point. The food is the whole thing.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <GoldDivider />

      {/* Village-themed decorative section */}
      <VillagePattern />

      <GoldDivider />

      {/* Kongu Cuisine Section */}
      <section className="py-12 md:py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-10">
              <SectionLabel>The Cuisine</SectionLabel>
              <h2 className="vk-serif font-bold text-2xl md:text-4xl text-[var(--vk-text)] mt-3">
                What is Kongu food?
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="max-w-3xl mx-auto mb-10 text-[var(--vk-text-secondary)] text-sm md:text-base leading-relaxed space-y-4">
              <p>
                Kongunadu is a region in western Tamil Nadu — think Coimbatore,
                Erode, Salem, Tirupur, Karur. While Chennai-style South Indian food
                gets most of the spotlight, Kongu cuisine is its own world.
                Earthier. Bolder. Less refinement, more punch.
              </p>
              <p>
                Where coastal Tamil food leans on tamarind and coconut milk,
                Kongu cooking favours dry-roasted spices, minimal water, and
                patience. A Kongu mutton biryani is not layered and steamed like
                Hyderabadi dum — it is slow-cooked in a single pot until the
                seeraga samba rice absorbs every molecule of flavor from the
                meat and spices.
              </p>
              <p>
                The people of Kongunadu are historically agrarian — farmers,
                weavers, traders. The food reflects that. It is working people&apos;s
                food: filling, deeply flavored, built for long days. No garnish
                for the sake of garnish. No cream to mask anything.
                Just good ingredients handled with care.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="grid grid-cols-1 gap-3">
              {konguFacts.map((fact, i) => (
                <div key={i} className="vk-card-flat p-4 md:p-5 flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                  <span className="text-[var(--vk-gold)] text-xs font-semibold uppercase tracking-widest whitespace-nowrap min-w-[130px]">
                    {fact.label}
                  </span>
                  <span className="text-[var(--vk-text)] text-sm">
                    {fact.value}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <GoldDivider />

      {/* Village Heritage - artisan theme */}
      <section className="py-12 md:py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-10">
              <SectionLabel>Heritage</SectionLabel>
              <h2 className="vk-serif font-bold text-2xl md:text-4xl text-[var(--vk-text)] mt-3">
                From the village to your door
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: '🌾',
                title: 'The Land',
                text: 'Kongunadu is paddy fields, coconut groves, and turmeric farms. The food comes from what grows here — not imported, not trendy, just what the soil gives.',
              },
              {
                icon: '🏺',
                title: 'The Kitchen',
                text: 'Clay pots. Brass vessels. Mortar and pestle. Stone-ground. Slow fire. Every technique exists because someone figured out, over generations, that it makes the food taste better.',
              },
              {
                icon: '🐂',
                title: 'The People',
                text: 'Farmers, weavers, blacksmiths, potters. Kongunadu is a working region. The food is built for people who work with their hands — filling, honest, no fuss.',
              },
            ].map((card, i) => (
              <FadeIn key={card.title} delay={i * 0.1}>
                <div className="vk-card p-6 h-full">
                  <span className="text-3xl block mb-4">{card.icon}</span>
                  <h3 className="vk-serif font-bold text-lg text-[var(--vk-text)] mb-3">
                    {card.title}
                  </h3>
                  <p className="text-[var(--vk-text-secondary)] text-sm leading-relaxed">
                    {card.text}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Modern Twist */}
      <section className="py-12 md:py-16 px-5">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <SectionLabel>Modern Twist</SectionLabel>
            <h2 className="vk-serif font-bold text-2xl md:text-3xl text-[var(--vk-text)] mt-3 mb-5">
              Traditional recipes. Cloud kitchen model.
            </h2>
            <p className="text-[var(--vk-text-secondary)] text-sm md:text-base leading-relaxed mb-6 max-w-2xl mx-auto">
              We took the recipes seriously and threw out everything else.
              No dining room overhead. No plating theatrics. Just the best
              ingredients we can find, cooked the way our grandmothers did,
              packed properly, and delivered to your door.
            </p>
            <p className="text-[var(--vk-text-secondary)] text-sm md:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
              The modern part is the delivery. The food itself is as old-school
              as it gets.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={openOrder}
                className="vk-btn-gold px-8 py-3.5 text-sm inline-flex items-center justify-center gap-2"
              >
                Order Now <FiArrowRight size={14} />
              </button>
              <Link
                to="/velskitchen/menu"
                className="vk-btn-outline px-8 py-3.5 text-sm text-center"
              >
                See the Menu
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
