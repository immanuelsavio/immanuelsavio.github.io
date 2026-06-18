import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiTruck, FiClock, FiPackage } from 'react-icons/fi';
import { ORDER_URLS, signatureItems, getImagePath } from './menuData';
import { useOrderModal } from './VelsKitchen';
import { FadeIn, SectionLabel, GoldDivider, FoodImage } from './vkHelpers';

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const steps = [
  { icon: FiPackage, title: 'Browse', text: 'Pick from our menu online' },
  { icon: FiClock, title: 'We Cook', text: 'Made fresh when you order' },
  { icon: FiTruck, title: 'Delivered', text: 'Hot food at your door' },
];

const platforms = [
  { name: 'DoorDash', url: ORDER_URLS.doorDash },
  { name: 'Uber Eats', url: ORDER_URLS.uberEats },
  { name: 'Grubhub', url: ORDER_URLS.grubhub },
];

export default function Landing() {
  const openOrder = useOrderModal();
  return (
    <div className="overflow-hidden">
      {/* ── Hero ──────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center min-h-[80vh] lg:min-h-screen px-5 pt-28 pb-10 text-center">
        <div className="vk-kolam absolute inset-0 opacity-40 pointer-events-none" />

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="relative z-10 max-w-2xl mx-auto flex flex-col items-center"
        >
          <motion.span variants={fadeUp}>
            <SectionLabel>Chicago Cloud Kitchen</SectionLabel>
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="vk-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-[var(--vk-text)] mt-4 leading-tight"
          >
            The food we grew up on.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-[var(--vk-text-secondary)] text-base sm:text-lg mt-5 max-w-md leading-relaxed"
          >
            Kongu-style South Indian home cooking. Delivered fresh in Chicago.
          </motion.p>

          <motion.div variants={fadeUp}>
            <div className="vk-gold-rule mx-auto mt-6 mb-1" />
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <button
              onClick={openOrder}
              className="vk-btn-gold py-3 px-6 text-sm inline-flex items-center gap-2"
            >
              Order Now <FiArrowRight className="text-base" />
            </button>
            <Link
              to="/velskitchen/menu"
              className="vk-btn-outline py-3 px-6 text-sm inline-flex items-center gap-2"
            >
              See the Menu <FiArrowRight className="text-base" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Food spread strip */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-5xl mt-12"
        >
          <div className="vk-hero-strip rounded-xl overflow-hidden">
            <img
              src="/velskitchen/images/banana_leaf_meal.webp"
              alt="Vel's Kitchen food spread"
              className="w-full h-auto object-cover"
            />
          </div>
        </motion.div>
      </section>

      {/* ── How It Works ──────────────────────────── */}
      <section className="relative px-5 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <FadeIn className="text-center mb-10">
            <SectionLabel>How It Works</SectionLabel>
            <h2 className="vk-serif text-2xl sm:text-3xl text-[var(--vk-text)] mt-2">
              Fresh food, three easy steps
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {steps.map((step, i) => (
              <FadeIn key={step.title} delay={i * 0.1}>
                <div className="vk-card p-6 text-center flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[var(--vk-gold)]/10 flex items-center justify-center">
                    <step.icon className="text-[var(--vk-gold)] text-xl" />
                  </div>
                  <h3 className="vk-serif text-lg text-[var(--vk-text)] font-semibold">
                    {step.title}
                  </h3>
                  <p className="text-[var(--vk-text-secondary)] text-sm leading-relaxed">
                    {step.text}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ── Signature Dishes ──────────────────────── */}
      <section className="relative px-5 py-16 lg:py-24">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-10">
            <SectionLabel>From the Kitchen</SectionLabel>
            <h2 className="vk-serif text-2xl sm:text-3xl text-[var(--vk-text)] mt-2">
              Signature Dishes
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {signatureItems.map((item, i) => (
              <FadeIn key={item.name} delay={i * 0.08}>
                <div className="vk-card p-5 flex flex-col items-center text-center gap-3 h-full">
                  <FoodImage name={item.name} size={80} />
                  <h3 className="vk-serif text-base text-[var(--vk-text)] font-semibold leading-snug">
                    {item.name}
                  </h3>
                  <span className="text-[var(--vk-gold)] font-bold text-sm">
                    {item.price}
                  </span>
                  <p className="text-[var(--vk-text-secondary)] text-xs leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="text-center mt-8">
            <Link
              to="/velskitchen/menu"
              className="vk-btn-outline py-3 px-6 text-sm inline-flex items-center gap-2"
            >
              Full Menu <FiArrowRight className="text-base" />
            </Link>
          </FadeIn>
        </div>
      </section>

      <GoldDivider />

      {/* ── Order CTA ─────────────────────────────── */}
      <section className="relative px-5 py-16 lg:py-24">
        <div className="vk-kolam absolute inset-0 opacity-30 pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <FadeIn>
            <SectionLabel>Delivery & Pickup</SectionLabel>
            <h2 className="vk-serif text-2xl sm:text-3xl text-[var(--vk-text)] mt-2">
              From our kitchen to your door.
            </h2>
            <div className="vk-gold-rule mx-auto mt-4 mb-6" />
          </FadeIn>

          <FadeIn delay={0.1}>
            <button
              onClick={openOrder}
              className="vk-btn-gold py-3 px-8 text-sm inline-flex items-center gap-2"
            >
              Order Now <FiArrowRight className="text-base" />
            </button>
          </FadeIn>

          <FadeIn delay={0.2} className="mt-10">
            <p className="text-[var(--vk-text-secondary)] text-xs uppercase tracking-widest mb-4">
              Also available on
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {platforms.map((p) => (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vk-btn-outline py-3 px-5 text-sm hover:border-[var(--vk-gold-dim)] transition-colors"
                >
                  {p.name}
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Bottom spacer */}
      <div className="h-8" />
    </div>
  );
}
