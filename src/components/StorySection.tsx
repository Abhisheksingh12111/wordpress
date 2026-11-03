import React from 'react';
import { CRAFT_PILLARS } from '../data/restaurantData';
import { Flame, Award, HeartHandshake, Compass } from 'lucide-react';

interface StorySectionProps {
  restaurantName: string;
}

export const StorySection: React.FC<StorySectionProps> = ({ restaurantName }) => {
  return (
    <section id="story" className="py-20 bg-[#0d131a] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Editorial Kicker */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="text-xs font-semibold tracking-widest uppercase text-amber-400">
            Our Culinary Philosophy
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight [text-wrap:balance]">
            Ancient Charcoal Embers, Modern Gastronomy
          </h2>
          <p className="text-base text-slate-300 leading-relaxed font-normal">
            At {restaurantName}, fire is not merely heat—it is our primary ingredient. We strip away culinary distractions to celebrate pristine raw ingredients kissed by the clean, searing radiance of white-oak Binchotan coals.
          </p>
        </div>

        {/* 4 Pillars Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CRAFT_PILLARS.map((pillar) => (
            <div
              key={pillar.number}
              className="p-6 rounded-2xl bg-[#131b24] border border-amber-500/15 hover:border-amber-500/35 transition-all duration-300 shadow-lg flex flex-col justify-between group"
            >
              <div>
                <div className="text-amber-400 font-mono font-bold text-lg mb-3">
                  {pillar.number}.
                </div>
                <h3 className="text-lg font-serif font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>Provenance Standard</span>
                <span className="text-amber-500/80">Tier 1</span>
              </div>
            </div>
          ))}
        </div>

        {/* Chef Quote Card */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-[#151e28] via-[#111922] to-[#151e28] border border-amber-500/20 p-8 sm:p-10 flex flex-col md:flex-row items-center gap-8 shadow-xl">
          <div className="w-20 h-20 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 text-amber-400">
            <Award className="w-10 h-10" />
          </div>
          <div className="space-y-2 text-center md:text-left">
            <p className="text-base sm:text-lg font-serif italic text-slate-200">
              &ldquo;We don’t cook to mask flavors. We bring fire and sea into harmony so that when a dish reaches your table, you taste only the purest essence of the element.&rdquo;
            </p>
            <div className="text-xs text-slate-400">
              <span className="font-semibold text-white">Chef Laurent Vance</span> · Executive Chef &amp; Master Pitmaster
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
