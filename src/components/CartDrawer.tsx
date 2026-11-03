import React, { useState } from 'react';
import { MenuItem } from '../data/restaurantData';
import {
  X,
  Plus,
  Minus,
  Trash2,
  Send,
  Sparkles,
  ShoppingBag,
  CheckCircle,
  Clock,
  Printer,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export interface CartItem {
  item: MenuItem;
  quantity: number;
  notes?: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  restaurantName: string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  restaurantName,
}) => {
  const [tableNumber, setTableNumber] = useState('Table 14');
  const [tipPercent, setTipPercent] = useState<number>(18);
  const [orderSent, setOrderSent] = useState(false);
  const [kotId, setKotId] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce(
    (sum, entry) => sum + entry.item.price * entry.quantity,
    0
  );
  const tax = Number((subtotal * 0.0825).toFixed(2));
  const tip = Number(((subtotal * tipPercent) / 100).toFixed(2));
  const total = (subtotal + tax + tip).toFixed(2);

  const handleSendOrder = () => {
    if (cart.length === 0) return;
    const generatedId = `KOT-${Math.floor(1000 + Math.random() * 9000)}`;
    setKotId(generatedId);

    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#fbbf24', '#ffffff', '#10b981'],
    });

    setOrderSent(true);
  };

  const handleReset = () => {
    setOrderSent(false);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer content */}
      <div className="relative w-full max-w-md bg-[#131b24] border-l border-amber-500/25 h-full flex flex-col shadow-2xl z-10 text-slate-100">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif font-bold text-lg text-white">Your Dining Order</h3>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold">
              {cart.reduce((totalQty, c) => totalQty + c.quantity, 0)} items
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close Order Bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderSent ? (
          /* Live Kitchen Order Ticket (KOT) simulation */
          <div className="p-6 flex-1 overflow-y-auto space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div className="text-center">
                <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                  Kitchen Notification Sent
                </div>
                <h4 className="text-xl font-serif font-bold text-white mt-1">
                  Order Successfully Dispatched!
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  The executive brigade at {restaurantName} has begun prepping your selections.
                </p>
              </div>

              {/* Realistic KOT Ticket */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-3 shadow-inner">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-amber-400 font-bold">{kotId}</span>
                  <span className="text-slate-400">{tableNumber}</span>
                </div>

                <div className="space-y-1.5">
                  {cart.map((entry) => (
                    <div key={entry.item.id} className="flex justify-between">
                      <span className="text-white">
                        {entry.quantity}x {entry.item.name}
                      </span>
                      <span className="text-amber-300">
                        ${(entry.item.price * entry.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-800 pt-2 flex justify-between font-bold text-white">
                  <span>TOTAL CHARGE:</span>
                  <span className="text-amber-400">${total}</span>
                </div>

                <div className="pt-2 text-[11px] text-emerald-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 animate-spin" />
                  <span>Est. Hearth Fire Time: 12-16 mins</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleReset}
                className="w-full py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Start New Order / Done
              </button>
            </div>
          </div>
        ) : cart.length === 0 ? (
          /* Empty state */
          <div className="p-8 flex-1 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-lg text-white">Your bag is empty</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                Explore our signature wood-fired cuts and chef specials to start your tableside dining order.
              </p>
            </div>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-colors cursor-pointer"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          /* Active Cart */
          <>
            {/* Table Selection */}
            <div className="px-6 py-3 bg-[#0d131a] border-b border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Order Destination:</span>
              <select
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="bg-slate-900 border border-amber-500/40 text-amber-300 px-2 py-1 rounded text-xs focus:outline-none"
              >
                <option value="Table 12">Table 12 (Main Hearth)</option>
                <option value="Table 14">Table 14 (Counter View)</option>
                <option value="Table 07">Table 07 (Terrace)</option>
                <option value="Table 21">Table 21 (Private Booth)</option>
                <option value="Takeaway Pickup">Takeaway / Express Pickup</option>
              </select>
            </div>

            {/* Items List */}
            <div className="p-6 flex-1 overflow-y-auto space-y-4">
              {cart.map((entry) => (
                <div
                  key={entry.item.id}
                  className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3"
                >
                  <img
                    src={entry.item.image}
                    alt={entry.item.name}
                    className="w-14 h-14 rounded-lg object-cover bg-slate-800 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-semibold text-sm text-white truncate">
                      {entry.item.name}
                    </h5>
                    <div className="text-xs text-amber-400 font-medium">
                      ${entry.item.price} each
                    </div>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-1.5 bg-[#131b24] p-1 rounded-lg border border-slate-800 shrink-0">
                    <button
                      onClick={() => onUpdateQuantity(entry.item.id, entry.quantity - 1)}
                      className="p-1 text-slate-400 hover:text-white rounded"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-5 text-center text-xs font-bold text-white">
                      {entry.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(entry.item.id, entry.quantity + 1)}
                      className="p-1 text-slate-400 hover:text-white rounded"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => onRemoveItem(entry.item.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                    title="Remove item"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Footer Summary & Checkout */}
            <div className="p-6 border-t border-slate-800 bg-[#0d131a] space-y-4">
              {/* Tip Selection */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Server Hospitality Gratuity:</span>
                  <span className="text-amber-400 font-semibold">{tipPercent}% (${tip})</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {[10, 15, 18, 20].map((pct) => (
                    <button
                      key={pct}
                      onClick={() => setTipPercent(pct)}
                      className={`py-1 text-xs rounded transition-colors cursor-pointer ${
                        tipPercent === pct
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Subtotal, tax, total */}
              <div className="space-y-1 text-xs text-slate-400 pt-2 border-t border-slate-800">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sales Tax (8.25%)</span>
                  <span className="text-white">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-serif font-bold text-base text-white pt-2 border-t border-slate-800">
                  <span>Estimated Total</span>
                  <span className="text-amber-400">${total}</span>
                </div>
              </div>

              {/* Submit to Kitchen */}
              <button
                onClick={handleSendOrder}
                className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-bold text-sm tracking-wide shadow-xl hover:shadow-amber-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4 text-slate-950" />
                <span>Send Order to Kitchen ({tableNumber})</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
