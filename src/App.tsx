import React, { useState } from 'react';
import { INITIAL_RESTAURANT, MENU_ITEMS, MenuItem } from './data/restaurantData';
import { WpAdminBar } from './components/WpAdminBar';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FeaturedMenuSection } from './components/FeaturedMenuSection';
import { QrOrderingSection } from './components/QrOrderingSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { StorySection } from './components/StorySection';
import { FooterSection } from './components/FooterSection';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { QrSimulatorModal } from './components/QrSimulatorModal';
import { QuickViewModal } from './components/QuickViewModal';
import { ElementorExportModal } from './components/ElementorExportModal';
import { Check, Bell, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const [restaurantName, setRestaurantName] = useState(INITIAL_RESTAURANT.name);
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [quickViewItem, setQuickViewItem] = useState<MenuItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleAddToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((entry) => entry.item.id === item.id);
      if (existing) {
        return prev.map((entry) =>
          entry.item.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
    showToast(`Added "${item.name}" to dining bag`);
  };

  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((entry) => (entry.item.id === itemId ? { ...entry, quantity: newQty } : entry))
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCart((prev) => prev.filter((entry) => entry.item.id !== itemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, entry) => total + entry.quantity, 0);

  const cartItemCounts = cart.reduce((acc, entry) => {
    acc[entry.item.id] = entry.quantity;
    return acc;
  }, {} as Record<string, number>);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0d131a] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* WordPress & Elementor Designer Inspector Bar */}
      <WpAdminBar
        restaurantName={restaurantName}
        onRestaurantNameChange={setRestaurantName}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onOpenExport={() => setIsExportModalOpen(true)}
        onOpenQrDemo={() => setIsQrModalOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartCount}
      />

      {/* Main Viewport Container (Handles Desktop, Tablet, Mobile Simulation Frames) */}
      <div
        className={`flex-1 transition-all duration-300 mx-auto w-full ${
          viewMode === 'mobile'
            ? 'max-w-[400px] my-6 border-x-4 border-slate-700 rounded-3xl overflow-hidden shadow-2xl bg-[#0d131a]'
            : viewMode === 'tablet'
            ? 'max-w-[768px] my-6 border-x-4 border-slate-700 rounded-2xl overflow-hidden shadow-2xl bg-[#0d131a]'
            : 'w-full'
        }`}
      >
        {/* Sticky Header */}
        <Header
          restaurantName={restaurantName}
          onBookTableClick={() => scrollToSection('reservation')}
          onCartClick={() => setIsCartOpen(true)}
          cartCount={cartCount}
        />

        <main>
          {/* Hero Section */}
          <HeroSection
            restaurantName={restaurantName}
            onReserveClick={() => scrollToSection('reservation')}
            onViewMenuClick={() => scrollToSection('menu')}
          />

          {/* Featured Menu Grid (WooCommerce & Plugin Ready) */}
          <FeaturedMenuSection
            items={MENU_ITEMS}
            onAddToCart={handleAddToCart}
            onOpenQuickView={(item) => setQuickViewItem(item)}
            cartItemCounts={cartItemCounts}
          />

          {/* Contactless QR Ordering & Table Booking Section */}
          <QrOrderingSection
            restaurantName={restaurantName}
            onOpenQrSimulator={() => setIsQrModalOpen(true)}
            onReservationComplete={(details) => {
              showToast(`Reservation confirmed for ${details.name} on ${details.date}!`);
            }}
          />

          {/* Social Proof & Testimonials Section */}
          <TestimonialsSection />

          {/* Story & Craftsmanship Section */}
          <StorySection restaurantName={restaurantName} />
        </main>

        {/* Footer Section */}
        <FooterSection restaurantName={restaurantName} />
      </div>

      {/* Slide-out Order Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        restaurantName={restaurantName}
      />

      {/* Interactive Table QR Simulator Modal */}
      <QrSimulatorModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        restaurantName={restaurantName}
      />

      {/* Quick View Dish Modal */}
      <QuickViewModal
        item={quickViewItem}
        isOpen={!!quickViewItem}
        onClose={() => setQuickViewItem(null)}
        onAddToCart={handleAddToCart}
        countInCart={quickViewItem ? cartItemCounts[quickViewItem.id] || 0 : 0}
      />

      {/* Elementor & Gutenberg Code Exporter Modal */}
      <ElementorExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        restaurantName={restaurantName}
      />

      {/* Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900/95 border border-amber-500/40 text-white text-xs font-medium shadow-2xl backdrop-blur-md animate-fade-in">
          <div className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
