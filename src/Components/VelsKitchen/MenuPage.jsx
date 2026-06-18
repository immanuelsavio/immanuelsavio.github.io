import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import { menuData } from './menuData';
import { FadeIn, SectionLabel, MenuCard, TagPill } from './vkHelpers';

const QUICK_FILTERS = [
  { tag: 'Vegetarian', activeClass: 'bg-emerald-600 text-white', icon: '🌿' },
  { tag: 'Spicy', activeClass: 'bg-red-600 text-white', icon: '🌶' },
  { tag: 'Popular', activeClass: 'bg-amber-600 text-white', icon: '🔥' },
];

const allCategories = ['All', ...menuData.map((c) => c.category)];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);

  const toggleFilter = (tag) =>
    setActiveFilters((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );

  const clearAllFilters = () => {
    setActiveCategory('All');
    setSearchQuery('');
    setActiveFilters([]);
  };

  const query = searchQuery.toLowerCase().trim();

  const filteredCategories = menuData
    .filter((cat) => activeCategory === 'All' || cat.category === activeCategory)
    .map((cat) => ({
      ...cat,
      items: cat.items.filter((item) => {
        const matchesSearch =
          !query ||
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query);
        const matchesTags = activeFilters.every((f) => item.tags?.includes(f));
        return matchesSearch && matchesTags;
      }),
    }))
    .filter((cat) => cat.items.length > 0);

  const totalItems = filteredCategories.reduce((s, c) => s + c.items.length, 0);
  const hasFilters = activeCategory !== 'All' || query || activeFilters.length > 0;

  return (
    <section className="min-h-screen bg-[var(--vk-bg)] pb-20">
      {/* Header */}
      <div className="pt-24 pb-8 text-center px-4">
        <FadeIn>
          <SectionLabel>Full Menu</SectionLabel>
          <h1 className="vk-serif text-3xl sm:text-4xl text-[var(--vk-text)] mt-2">
            Everything we make
          </h1>
          <div className="vk-gold-rule mx-auto mt-4 mb-1" />
        </FadeIn>
      </div>

      {/* Filters */}
      <div className="sticky top-0 z-30 bg-[var(--vk-bg)]/95 backdrop-blur-md border-b border-[var(--vk-border)] pb-4 pt-3 px-4">
        {/* Search */}
        <div className="max-w-xl mx-auto relative mb-4">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--vk-text-secondary)] text-lg pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search the menu..."
            className="w-full pl-11 pr-4 py-3 rounded-full bg-[var(--vk-surface)] border border-[var(--vk-border)] text-[var(--vk-text)] text-sm placeholder:text-[var(--vk-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--vk-gold)]/50 focus:border-[var(--vk-gold)]/40 transition min-h-[44px]"
          />
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto vk-scrollbar-hide max-w-4xl mx-auto justify-start md:justify-center pb-1">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition min-h-[44px] ${
                activeCategory === cat
                  ? 'bg-[var(--vk-gold)] text-black'
                  : 'bg-[var(--vk-surface)] border border-[var(--vk-border)] text-[var(--vk-text-secondary)] hover:text-[var(--vk-text)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Quick filters */}
        <div className="flex gap-2 justify-center mt-3">
          {QUICK_FILTERS.map(({ tag, activeClass, icon }) => {
            const isActive = activeFilters.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleFilter(tag)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium transition min-h-[44px] ${
                  isActive
                    ? activeClass
                    : 'bg-[var(--vk-surface)] border border-[var(--vk-border)] text-[var(--vk-text-secondary)] hover:text-[var(--vk-text)]'
                }`}
              >
                <span>{icon}</span>
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-5xl mx-auto px-4 mt-8">
        <AnimatePresence mode="wait">
          {totalItems === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="text-center py-20"
            >
              <p className="text-[var(--vk-text-secondary)] text-lg mb-4">
                Nothing matches your filters.
              </p>
              <button
                onClick={clearAllFilters}
                className="vk-btn-gold px-6 py-2.5 rounded-full text-sm font-semibold min-h-[44px]"
              >
                Clear all filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={`${activeCategory}-${query}-${activeFilters.join(',')}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {filteredCategories.map((cat, ci) => (
                <div key={cat.category} className={ci > 0 ? 'mt-12' : ''}>
                  {/* Category heading */}
                  {(activeCategory === 'All' || filteredCategories.length > 1) && (
                    <div className="flex items-center gap-3 mb-5">
                      <h2 className="vk-serif text-xl text-[var(--vk-text)] whitespace-nowrap">
                        {cat.category}
                      </h2>
                      <span className="text-[var(--vk-text-secondary)] text-xs mt-0.5">
                        {cat.items.length} {cat.items.length === 1 ? 'item' : 'items'}
                      </span>
                      <div className="flex-1 h-px bg-[var(--vk-border)]" />
                    </div>
                  )}

                  {/* Items grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {cat.items.map((item, i) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.03 }}
                      >
                        <MenuCard item={item} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
