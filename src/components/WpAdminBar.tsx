import React, { useState } from 'react';
import {
  Code,
  Smartphone,
  Tablet,
  Monitor,
  Eye,
  Sliders,
  Sparkles,
  QrCode,
  ShoppingBag,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface WpAdminBarProps {
  restaurantName: string;
  onRestaurantNameChange: (name: string) => void;
  viewMode: 'desktop' | 'tablet' | 'mobile';
  onViewModeChange: (mode: 'desktop' | 'tablet' | 'mobile') => void;
  onOpenExport: () => void;
  onOpenQrDemo: () => void;
  onOpenCart: () => void;
  cartCount: number;
}

export const WpAdminBar: React.FC<WpAdminBarProps> = ({
  restaurantName,
  onRestaurantNameChange,
  viewMode,
  onViewModeChange,
  onOpenExport,
  onOpenQrDemo,
  onOpenCart,
  cartCount,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  if (isCollapsed) {
    return (
      <div className="fixed top-3 right-3 z-50 flex items-center gap-2">
        <button
          onClick={() => setIsCollapsed(false)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a232f]/90 border border-amber-500/30 text-amber-400 text-xs font-medium rounded-full shadow-lg backdrop-blur-md hover:bg-slate-800 transition-all cursor-pointer"
          title="Open WordPress / Elementor Designer Toolbar"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>WP Designer Bar</span>
          <ChevronDown className="w-3 h-3" />
        </button>
      </div>
    );
  }

  return (
    <div className="sticky top-0 z-50 w-full bg-[#0a0f14] border-b border-amber-500/20 text-slate-300 text-xs px-4 py-2 transition-all shadow-md select-none">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: WordPress Brand & Page Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-amber-400 font-semibold tracking-wide">
            <span className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-[11px] font-serif text-amber-300">
              W
            </span>
            <span>WordPress / Elementor</span>
            <span className="hidden sm:inline-block text-[10px] text-slate-400 font-normal px-1.5 py-0.5 bg-slate-800/80 rounded border border-slate-700">
              Ready-to-Deploy
            </span>
          </div>

          <div className="h-3.5 w-px bg-slate-800 hidden md:block" />

          {/* Restaurant Name Quick Customizer */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 hidden lg:inline">Site Title:</span>
            {isEditingTitle ? (
              <input
                type="text"
                value={restaurantName}
                onChange={(e) => onRestaurantNameChange(e.target.value)}
                onBlur={() => setIsEditingTitle(false)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setIsEditingTitle(false);
                }}
                autoFocus
                placeholder="Enter Restaurant Name..."
                className="bg-slate-900 border border-amber-500/60 text-amber-200 px-2 py-0.5 rounded text-xs focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
            ) : (
              <button
                onClick={() => setIsEditingTitle(true)}
                className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800/70 border border-slate-700 text-amber-300 hover:border-amber-500/40 transition-colors cursor-pointer group"
                title="Click to rename your restaurant"
              >
                <span className="font-medium max-w-[140px] sm:max-w-[190px] truncate">
                  {restaurantName}
                </span>
                <span className="text-[10px] text-slate-400 group-hover:text-amber-400 underline">
                  edit
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Center: Responsive Viewport Switcher */}
        <div className="hidden md:flex items-center gap-1 bg-slate-900/90 border border-slate-800 p-0.5 rounded-lg">
          <button
            onClick={() => onViewModeChange('desktop')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
              viewMode === 'desktop'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-medium'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Desktop View (100% Full Width)"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Desktop</span>
          </button>
          <button
            onClick={() => onViewModeChange('tablet')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
              viewMode === 'tablet'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-medium'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Tablet View (768px)"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Tablet</span>
          </button>
          <button
            onClick={() => onViewModeChange('mobile')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
              viewMode === 'mobile'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-medium'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Mobile View (390px)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Mobile</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenQrDemo}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 transition-colors cursor-pointer"
            title="Simulate Table QR Code Ordering"
          >
            <QrCode className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">QR Simulator</span>
          </button>

          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 transition-colors cursor-pointer"
            title="View Online Order Bag"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Order Bag</span>
            {cartCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenExport}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-medium transition-colors cursor-pointer"
            title="Export Elementor & Gutenberg Code"
          >
            <Code className="w-3.5 h-3.5" />
            <span>Export Code</span>
          </button>

          <button
            onClick={() => setIsCollapsed(true)}
            className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors ml-1 cursor-pointer"
            title="Minimize WP Toolbar"
            aria-label="Minimize WP Toolbar"
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
