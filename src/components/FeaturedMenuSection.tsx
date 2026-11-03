import React, { useState, useMemo } from 'react';
import { MenuItem } from '../data/restaurantData';
import { Plus, Check, Sparkles, Flame, Wine, Eye } from 'lucide-react';

interface FeaturedMenuSectionProps {
  items: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
  onOpenQuickView: (item: MenuItem) => void;
  cartItemCounts: Record<string, number>;
}

export const FeaturedMenuSection: React.FC<FeaturedMenuSectionProps> = ({
  items,
  onAddToCart,
  onOpenQuickView,
  cartItemCounts,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [dietaryFilter, setDietaryFilter] = useState<string>('all');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'Full Menu' },
    { id: 'starters', label: 'Starters' },
    { id: 'mains', label: 'Main Course' },
    { id: 'specials', label: 'Chef Specials' },
    { id: 'drinks', label: 'Cocktails & Drinks' },
    { id: 'desserts', label: 'Desserts' },
  ];

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' ? true : item.category === activeCategory;
      const matchesDietary =
        dietaryFilter === 'all'
          ? true
          : dietaryFilter === 'chef'
          ? item.badge === 'Chef Special'
          : dietaryFilter === 'vegan'
          ? item.badge === 'Vegan'
          : dietaryFilter === 'gf'
          ? item.badge === 'Gluten-Free'
          : true;
      return matchesCategory && matchesDietary;
    });
  }, [items, activeCategory, dietaryFilter]);

  const handleAdd = (item: MenuItem) => {
    onAddToCart(item);
    setJustAddedId(item.id);
    setTimeout(() => {
      setJustAddedId(null);
    }, 1200);
  };

  return (
    <section id="menu" className="py-20 bg-[#0d131a] relative border-t border-slate-800/80">
      {/* Glow highlight */}
      <div
        className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="text-xs font-semibold tracking-widest uppercase text-amber-400">
              WooCommerce &amp; Plugin Ready
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              Curated Culinary Selections
            </h2>
            <p className="text-sm text-slate-400 max-w-xl">
              Every dish is orchestrated around fire, seasonality, and pristine provenance. Add directly to your tableside order or reserve for tonight.
            </p>
          </div>

          {/* Quick Dietary Filter Tags */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 hidden sm:inline">Dietary:</span>
            <div className="flex items-center gap-1 bg-[#131b24] p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setDietaryFilter('all')}
                className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                  dietaryFilter === 'all'
                    ? 'bg-amber-500/20 text-amber-300 font-medium'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setDietaryFilter('chef')}
                className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                  dietaryFilter === 'chef'
                    ? 'bg-amber-500/20 text-amber-300 font-medium'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Chef Special
              </button>
              <button
                onClick={() => setDietaryFilter('vegan')}
                className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                  dietaryFilter === 'vegan'
                    ? 'bg-amber-500/20 text-amber-300 font-medium'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Vegan
              </button>
              <button
                onClick={() => setDietaryFilter('gf')}
                className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                  dietaryFilter === 'gf'
                    ? 'bg-amber-500/20 text-amber-300 font-medium'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Gluten-Free
              </button>
            </div>
          </div>
        </div>

        {/* Category Tab Filter (Section 1.A Segmented Controls) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <div className="flex items-center gap-1.5 p-1 bg-[#131b24] rounded-xl border border-slate-800/90 shadow-sm">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-amber-500 text-slate-950 font-semibold shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => {
            const countInCart = cartItemCounts[item.id] || 0;
            const isJustAdded = justAddedId === item.id;

            return (
              <div
                key={item.id}
                className="group flex flex-col bg-[#131b24] hover:bg-[#151e28] border border-amber-500/15 hover:border-amber-500/40 rounded-2xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1"
              >
                {/* Image Container with 4:3 Ratio */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131b24] via-transparent to-transparent opacity-80" />

                  {/* Badge top-left (Clean metadata styling, subtle) */}
                  {item.badge && (
                    <div className="absolute top-3 left-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold tracking-wide rounded-md shadow-md ${
                          item.badge === 'Chef Special'
                            ? 'bg-amber-500 text-slate-950'
                            : item.badge === 'Vegan'
                            ? 'bg-emerald-900/90 border border-emerald-500/40 text-emerald-200'
                            : item.badge === 'Gluten-Free'
                            ? 'bg-sky-950/90 border border-sky-500/40 text-sky-200'
                            : 'bg-amber-950/90 border border-amber-500/40 text-amber-200'
                        }`}
                      >
                        {item.badge === 'Chef Special' && <Sparkles className="w-3 h-3" />}
                        {item.badge === 'Signature' && <Flame className="w-3 h-3" />}
                        {item.badge}
                      </span>
                    </div>
                  )}

                  {/* Quick View Button */}
                  <button
                    onClick={() => onOpenQuickView(item)}
                    className="absolute top-3 right-3 p-2 rounded-lg bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-slate-200 backdrop-blur-sm border border-slate-700/60 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer"
                    title="Quick preview details"
                    aria-label={`Preview ${item.name}`}
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  {/* Price Tag in bottom right of image */}
                  <div className="absolute bottom-3 right-3">
                    <span className="px-3 py-1 bg-slate-950/85 backdrop-blur-md border border-amber-500/30 text-amber-300 font-serif font-bold text-base rounded-lg shadow-md">
                      ${item.price}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-serif font-bold text-lg text-white group-hover:text-amber-300 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    {item.pairing && (
                      <div className="flex items-center gap-1.5 text-[11px] text-amber-400/90 pt-1">
                        <Wine className="w-3 h-3 shrink-0 text-amber-400" />
                        <span className="truncate">{item.pairing}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Bar */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
                    <span className="text-[11px] text-slate-500 font-mono">
                      {item.calories || 'Fresh daily'}
                    </span>

                    <button
                      onClick={() => handleAdd(item)}
                      className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                        isJustAdded
                          ? 'bg-emerald-500 text-slate-950 shadow-md'
                          : countInCart > 0
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500 hover:text-slate-950'
                          : 'bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 shadow-md hover:shadow-amber-500/20'
                      }`}
                      aria-label={`Add ${item.name} to order`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>
                            {countInCart > 0 ? `Add More (${countInCart})` : 'Add to Order'}
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* WooCommerce plugin note box for WP designers */}
        <div className="mt-12 p-4 rounded-xl bg-[#131b24]/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>
              Formatted for WordPress WooCommerce Custom Post Types &amp; Elementor Product Loop Builder.
            </span>
          </div>
          <div className="text-amber-400/80 font-mono text-[11px]">
            [elementor-template id=&quot;menu_grid_304&quot;]
          </div>
        </div>
      </div>
    </section>
  );
};
