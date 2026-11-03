import React from 'react';
import { MenuItem } from '../data/restaurantData';
import { X, Sparkles, Flame, Wine, Plus, Check } from 'lucide-react';

interface QuickViewModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItem) => void;
  countInCart: number;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  item,
  isOpen,
  onClose,
  onAddToCart,
  countInCart,
}) => {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#131b24] border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl z-10 text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Dish Image */}
          <div className="relative aspect-square md:aspect-auto w-full bg-slate-900">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#131b24] via-transparent to-transparent md:hidden" />
          </div>

          {/* Details */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              {item.badge && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded bg-amber-500 text-slate-950">
                  {item.badge === 'Chef Special' && <Sparkles className="w-3.5 h-3.5" />}
                  {item.badge === 'Signature' && <Flame className="w-3.5 h-3.5" />}
                  {item.badge}
                </span>
              )}

              <h3 className="font-serif font-bold text-2xl text-white">
                {item.name}
              </h3>

              <div className="text-2xl font-serif font-bold text-amber-300">
                ${item.price}
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {item.description}
              </p>

              {item.pairing && (
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-amber-300 space-y-0.5">
                  <div className="flex items-center gap-1.5 font-semibold text-white">
                    <Wine className="w-3.5 h-3.5 text-amber-400" />
                    <span>Sommelier Pairing Recommendation</span>
                  </div>
                  <div className="text-slate-400 pl-5">{item.pairing}</div>
                </div>
              )}

              <div className="pt-2 flex items-center gap-4 text-xs text-slate-400 font-mono">
                <span>Calories: {item.calories || 'Chef fresh'}</span>
                <span>·</span>
                <span>WooCommerce SKU: AUR-{item.id.slice(0, 5).toUpperCase()}</span>
              </div>
            </div>

            {/* Action */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
              <button
                onClick={() => {
                  onAddToCart(item);
                }}
                className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-amber-500/20"
              >
                <Plus className="w-4 h-4" />
                <span>
                  {countInCart > 0 ? `Add Another (Currently: ${countInCart})` : 'Add to Dining Order'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
