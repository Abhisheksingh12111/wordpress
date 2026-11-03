import React from 'react';
import { Calendar, Utensils, Star, Clock, Wine, ShieldCheck, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  restaurantName: string;
  onReserveClick: () => void;
  onViewMenuClick: () => void;
  onOpenItemModal?: (itemId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  restaurantName,
  onReserveClick,
  onViewMenuClick,
}) => {
  return (
    <section id="home" className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden">
      {/* Background ambient radial glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute -top-32 right-0 w-[450px] h-[450px] bg-amber-600/5 rounded-full blur-[120px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value Proposition & High Conversion CTAs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            {/* Subtle editorial kicker (Clean text with separator, strictly no pills) */}
            <div className="flex items-center gap-2 text-xs font-medium tracking-wider uppercase text-amber-400/90">
              <span>Binchotan Wood Hearth</span>
              <span aria-hidden="true" className="text-amber-500/60">·</span>
              <span>Prime Dry-Aged Cuts</span>
              <span aria-hidden="true" className="text-amber-500/60">·</span>
              <span>Michelin-Trained Brigade</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.1] [text-wrap:balance]">
              Exquisite Culinary Experience &amp; Instant Online Ordering
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              Step into <span className="text-white font-medium">{restaurantName}</span>, where primal open embers meet seasonal culinary precision. Savor 45-day dry-aged cuts and wild ocean catches, or order directly from your table via our contactless instant dining system.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onReserveClick}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-semibold text-sm tracking-wide shadow-xl hover:shadow-amber-500/25 transition-all duration-200 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-slate-950" />
                <span>Reserve Table</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={onViewMenuClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-slate-900/80 hover:bg-slate-800/90 text-slate-100 hover:text-amber-300 border border-slate-700/80 hover:border-amber-500/40 font-medium text-sm transition-all duration-200 cursor-pointer"
              >
                <Utensils className="w-4 h-4 text-amber-400" />
                <span>View Menu &amp; Order</span>
              </button>
            </div>

            {/* Social Proof Quick Proof Strip */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="font-semibold text-white">4.9 / 5</span>
                <span>(2,840+ Google &amp; Zomato Reviews)</span>
              </div>
              <div className="hidden sm:block h-3 w-px bg-slate-800" />
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>&lt;3 min Instant Kitchen Dispatch</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Dish Image & Ambient Glow (5 cols) */}
          <div className="lg:col-span-5 relative">
            {/* Glowing Backdrop Frame */}
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Outer Amber Aura */}
              <div
                className="absolute -inset-1.5 rounded-2xl bg-gradient-to-tr from-amber-500/40 via-amber-600/20 to-transparent blur-xl opacity-75"
                aria-hidden="true"
              />

              {/* Dish Visual Container */}
              <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 bg-[#131b24] shadow-2xl group">
                <div className="aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden">
                  <img
                    src="/src/assets/images/hero_signature_dish_1793610138745.jpg"
                    alt="Chef's Signature 45-Day Dry-Aged Wagyu Ribeye on charcoal slate"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

                {/* Floating Dish Highlights */}
                <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                      Chef&apos;s Signature Reserve
                    </span>
                    <span className="text-lg font-serif font-bold text-amber-300">
                      $68
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-serif font-semibold text-white">
                    45-Day Dry-Aged Wagyu Ribeye
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">
                    Charred rosemary · Truffle bone marrow butter · Fleur de sel
                  </p>
                </div>
              </div>

              {/* Floating Pill Trust Marker - Floating below image card */}
              <div className="absolute -bottom-5 -left-4 sm:left-4 bg-[#151e28]/95 border border-amber-500/30 rounded-xl px-4 py-2.5 shadow-xl backdrop-blur-md flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Table QR Enabled</div>
                  <div className="text-[11px] text-slate-400">Instant kitchen dispatch</div>
                </div>
              </div>

              <div className="absolute -top-4 -right-2 bg-[#151e28]/95 border border-amber-500/30 rounded-xl px-3.5 py-2 shadow-xl backdrop-blur-md hidden sm:flex items-center gap-2">
                <Wine className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-xs font-medium text-slate-200">Sommelier Cellar</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Item Feature Ribbon Strip (Full-width row below hero split) */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-slate-300">
          <div className="space-y-1">
            <div className="text-xs text-amber-400 font-medium tracking-wide uppercase">Open Fire</div>
            <div className="text-sm font-semibold text-white">1,000°C Charcoal Embers</div>
            <p className="text-xs text-slate-400">Kishu Binchotan white-oak grill</p>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-amber-400 font-medium tracking-wide uppercase">Dry-Aged Room</div>
            <div className="text-sm font-semibold text-white">Himalayan Salt Chamber</div>
            <p className="text-xs text-slate-400">Aged 35 to 60 days on premise</p>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-amber-400 font-medium tracking-wide uppercase">Contactless</div>
            <div className="text-sm font-semibold text-white">Smart QR Tableside Flow</div>
            <p className="text-xs text-slate-400">Direct WooCommerce &amp; POS hook</p>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-amber-400 font-medium tracking-wide uppercase">Accolades</div>
            <div className="text-sm font-semibold text-white">4.9 / 5 Verified Rating</div>
            <p className="text-xs text-slate-400">Google &amp; Zomato diner reviews</p>
          </div>
        </div>
      </div>
    </section>
  );
};
