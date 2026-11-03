import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Flame } from 'lucide-react';

interface HeaderProps {
  restaurantName: string;
  onBookTableClick: () => void;
  onCartClick: () => void;
  cartCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  restaurantName,
  onBookTableClick,
  onCartClick,
  cartCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Menu', href: '#menu' },
    { label: 'QR Ordering', href: '#qr-ordering' },
    { label: 'Story', href: '#story' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0d131a]/95 backdrop-blur-md border-b border-amber-500/15 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element wordmark in display face) */}
        <a
          href="#home"
          className="flex items-center gap-2.5 text-xl sm:text-2xl font-serif font-bold tracking-tight text-white hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 group"
        >
          <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-700/10 border border-amber-500/40 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform shadow-inner">
            <Flame className="w-5 h-5 text-amber-400 fill-amber-500/20" />
          </span>
          <span className="tracking-wide">{restaurantName}</span>
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 relative py-1 text-slate-300/90 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-amber-400 hover:after:w-full after:transition-all after:duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action & Quick Cart */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onCartClick}
            className="relative p-2.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-amber-400 transition-colors cursor-pointer"
            aria-label="View Order Bag"
            title="View Order Bag"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center shadow-md animate-scale">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={onBookTableClick}
            className="px-5 py-2.5 text-sm font-semibold text-slate-950 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 rounded-lg shadow-lg hover:shadow-amber-500/25 transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer"
          >
            Book a Table
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0d131a] border-b border-amber-500/20 px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:text-amber-400 hover:bg-slate-900 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookTableClick();
              }}
              className="w-full py-3 text-center text-sm font-semibold text-slate-950 bg-amber-500 rounded-lg hover:bg-amber-400 transition-colors cursor-pointer"
            >
              Book a Table
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
