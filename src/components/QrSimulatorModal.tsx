import React, { useState } from 'react';
import {
  X,
  Smartphone,
  Flame,
  CheckCircle2,
  Clock,
  Sparkles,
  Wine,
  Plus,
  Send,
  Coffee,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface QrSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurantName: string;
}

export const QrSimulatorModal: React.FC<QrSimulatorModalProps> = ({
  isOpen,
  onClose,
  restaurantName,
}) => {
  const [activeTab, setActiveTab] = useState<'menu' | 'live-status'>('menu');
  const [selectedDrink, setSelectedDrink] = useState<string | null>(null);
  const [quickOrderSent, setQuickOrderSent] = useState(false);
  const [prepTimeRemaining, setPrepTimeRemaining] = useState(14);

  if (!isOpen) return null;

  const quickDrinks = [
    { id: 'cocktail-amber', name: 'Smoked Amber Old Fashioned', price: 22, time: '3 min' },
    { id: 'sparkling-water', name: 'San Pellegrino Sparkling 750ml', price: 9, time: '1 min' },
    { id: 'pinot-noir', name: 'Sonoma Coast Pinot Noir Glass', price: 18, time: '2 min' },
  ];

  const handleQuickOrder = (drinkName: string) => {
    setSelectedDrink(drinkName);
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#fbbf24', '#ffffff'],
    });
    setQuickOrderSent(true);
    setActiveTab('live-status');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Realistic Smartphone Frame */}
      <div className="relative w-full max-w-sm rounded-[40px] bg-[#000000] p-3.5 border-4 border-slate-700 shadow-2xl z-10 overflow-hidden text-slate-100">
        {/* Dynamic Island / Speaker Notch */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-900 rounded-full z-20 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-950 mr-2" />
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
        </div>

        {/* Screen inside phone */}
        <div className="relative rounded-[32px] bg-[#0d131a] overflow-hidden border border-slate-800 flex flex-col h-[620px]">
          {/* Top Status Bar inside phone */}
          <div className="pt-7 px-5 pb-2 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>7:42 PM</span>
            <div className="flex items-center gap-1.5 text-amber-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Table 12 Connected</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              aria-label="Close Mobile Simulator"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Restaurant Header inside phone */}
          <div className="px-5 py-3 border-b border-slate-800 bg-[#131b24]/90 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Flame className="w-4 h-4 fill-amber-500/30" />
              </div>
              <div>
                <div className="font-serif font-bold text-xs text-white truncate max-w-[150px]">
                  {restaurantName}
                </div>
                <div className="text-[10px] text-amber-400 font-mono">
                  Table 12 · Server: Mateo
                </div>
              </div>
            </div>

            {/* Quick action: Call Server */}
            <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-1 rounded">
              Guest Mode
            </span>
          </div>

          {/* Internal Tabs */}
          <div className="grid grid-cols-2 p-1.5 bg-slate-900 text-xs border-b border-slate-800">
            <button
              onClick={() => setActiveTab('menu')}
              className={`py-1.5 text-center rounded-lg transition-colors cursor-pointer ${
                activeTab === 'menu'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Express Drinks &amp; Bites
            </button>
            <button
              onClick={() => setActiveTab('live-status')}
              className={`py-1.5 text-center rounded-lg transition-colors cursor-pointer ${
                activeTab === 'live-status'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Live Kitchen Status
            </button>
          </div>

          {/* Phone Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {activeTab === 'menu' ? (
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs">
                  <div className="font-semibold text-white">Instant Tableside Ordering</div>
                  <div className="text-[11px] text-amber-300/90 mt-0.5">
                    Tap any item to test sending directly to the kitchen display!
                  </div>
                </div>

                <div className="space-y-2.5">
                  {quickDrinks.map((drink) => (
                    <div
                      key={drink.id}
                      className="p-3 rounded-xl bg-[#131b24] border border-slate-800 hover:border-amber-500/40 flex items-center justify-between text-xs transition-colors"
                    >
                      <div>
                        <div className="font-semibold text-white">{drink.name}</div>
                        <div className="text-amber-400 font-medium mt-0.5">${drink.price}</div>
                        <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>Est: {drink.time}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleQuickOrder(drink.name)}
                        className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 cursor-pointer shadow"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Order</span>
                      </button>
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                  <div className="font-semibold text-slate-200">Table Notes:</div>
                  <div>Water preference: Sparkling with fresh lime requested.</div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Status Tracker */}
                <div className="p-4 rounded-xl bg-[#131b24] border border-amber-500/30 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
                    <Clock className="w-5 h-5 animate-pulse" />
                  </div>
                  <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                    Live Prep Tracker
                  </div>
                  <h4 className="font-serif font-bold text-base text-white">
                    Order #842 · Station Hearth
                  </h4>
                  <div className="text-xs text-slate-300">
                    {selectedDrink ? (
                      <span className="text-amber-300">{selectedDrink} is being crafted</span>
                    ) : (
                      'Main Course Wagyu Ribeye is searing on white oak'
                    )}
                  </div>
                </div>

                {/* Step timeline */}
                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <div className="font-semibold">Order Received by POS</div>
                      <div className="text-[10px] text-emerald-400/80">7:40 PM · Dispatched instantly</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-2 rounded-lg bg-amber-950/40 border border-amber-500/30 text-amber-300">
                    <Flame className="w-4 h-4 text-amber-400 shrink-0 animate-bounce" />
                    <div>
                      <div className="font-semibold">At Hearth Grill / Bar</div>
                      <div className="text-[10px] text-amber-400/80">In Progress · Wood smoke finish</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-500">
                    <Coffee className="w-4 h-4 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-400">Plating &amp; Tableside Delivery</div>
                      <div className="text-[10px]">Server Mateo en route to Table 12</div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('menu')}
                  className="w-full py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer"
                >
                  Order Additional Drinks / Sides
                </button>
              </div>
            )}
          </div>

          {/* Bottom Bar inside phone */}
          <div className="p-3 bg-slate-900 border-t border-slate-800 text-center text-[10px] text-slate-500">
            Powered by WordPress WooCommerce REST API
          </div>
        </div>
      </div>
    </div>
  );
};
