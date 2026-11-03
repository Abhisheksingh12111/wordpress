import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Phone,
  MessageSquare,
  Mail,
  Flame,
  ArrowUp,
  Instagram,
  Facebook,
  Twitter,
  Send,
  Check,
} from 'lucide-react';

interface FooterSectionProps {
  restaurantName: string;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ restaurantName }) => {
  const [emailInput, setEmailInput] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) return;
    setNewsletterSubscribed(true);
    setEmailInput('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#080d12] border-t border-amber-500/20 text-slate-300 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-slate-800">
          {/* Brand & VIP Signup (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Flame className="w-4 h-4 fill-amber-500/20" />
              </span>
              <span className="text-xl font-serif font-bold text-white tracking-wide">
                {restaurantName}
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Modern fine dining celebrating ancient charcoal craft, premium dry-aged cuts, and seamless tableside contactless dining.
            </p>

            {/* Newsletter VIP Club */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-white uppercase tracking-wider block mb-2">
                Join the Private Cellar Club
              </span>
              {newsletterSubscribed ? (
                <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Welcome to the private tasting list. Check your inbox!</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="flex items-center gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email address..."
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-700 focus:border-amber-500 text-white text-xs px-3 py-2.5 rounded-lg focus:outline-none placeholder:text-slate-600"
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer shrink-0"
                    title="Subscribe"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#contact"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-amber-500/20 border border-slate-800 hover:border-amber-500/50 text-slate-400 hover:text-amber-400 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-amber-500/20 border border-slate-800 hover:border-amber-500/50 text-slate-400 hover:text-amber-400 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-amber-500/20 border border-slate-800 hover:border-amber-500/50 text-slate-400 hover:text-amber-400 flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Opening Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-white uppercase tracking-wider">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Opening Hours</span>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div>
                <div className="font-semibold text-white">Monday – Thursday</div>
                <div className="text-slate-400">Lunch: 12:00 PM – 3:30 PM</div>
                <div className="text-slate-400">Dinner: 5:30 PM – 11:00 PM</div>
              </div>
              <div>
                <div className="font-semibold text-white">Friday – Sunday</div>
                <div className="text-slate-400">Lunch: 12:00 PM – 4:00 PM</div>
                <div className="text-slate-400">Dinner: 5:00 PM – 12:00 AM</div>
              </div>
              <div className="pt-1 text-amber-400/90">
                Lounge &amp; Bar service daily until 1:00 AM.
              </div>
            </div>
          </div>

          {/* Contact & WhatsApp CTA (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-white uppercase tracking-wider">
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Contact Us</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="text-slate-400">Reservations &amp; Inquiry:</div>
                <a
                  href="tel:+15554382623"
                  className="font-medium text-white hover:text-amber-400 transition-colors"
                >
                  +1 (555) 438-2623
                </a>
              </div>

              <div>
                <div className="text-slate-400">Direct Email:</div>
                <a
                  href="mailto:reservations@aurarestaurant.com"
                  className="font-medium text-white hover:text-amber-400 transition-colors truncate block"
                >
                  reservations@aurarestaurant.com
                </a>
              </div>

              {/* Exact WhatsApp button requested */}
              <div className="pt-2">
                <a
                  href="https://wa.me/15554382623"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md transition-colors w-full justify-center"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Location & Google Map Embed (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-white uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Find Us</span>
            </div>

            <div className="text-xs text-slate-300">
              <div className="font-medium text-white">428 Amber Boulevard</div>
              <div className="text-slate-400">Culinary Arts Quarter, Downtown</div>
              <div className="text-[11px] text-amber-400/90 mt-1">Valet parking available at entrance</div>
            </div>

            {/* Google Map Mock Card with Interactive Directions link */}
            <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-900 relative group">
              {/* Map background illustration */}
              <div className="h-28 w-full bg-[#15202b] relative overflow-hidden flex items-center justify-center">
                {/* SVG Map Grid Pattern */}
                <svg className="absolute inset-0 w-full h-full opacity-30 text-slate-600" fill="none">
                  <path d="M0 20 H300 M0 60 H300 M0 100 H300" stroke="currentColor" strokeWidth="1" />
                  <path d="M40 0 V150 M120 0 V150 M200 0 V150 M260 0 V150" stroke="currentColor" strokeWidth="1" />
                  <path d="M10 90 Q 120 30, 280 80" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" />
                </svg>

                {/* Pin marker */}
                <div className="relative z-10 flex flex-col items-center animate-bounce">
                  <div className="px-2 py-0.5 rounded bg-slate-950 border border-amber-500 text-[10px] text-amber-400 font-bold mb-1 shadow">
                    {restaurantName}
                  </div>
                  <div className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg">
                    <MapPin className="w-3 h-3 fill-slate-950" />
                  </div>
                </div>
              </div>

              <div className="p-2.5 bg-slate-900/90 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">Downtown Arts District</span>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-400 hover:text-amber-300 font-medium text-[11px] underline"
                >
                  Open in Google Maps ↗
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar (Clean unboxed metadata) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} {restaurantName}. All Rights Reserved.</span>
            <span aria-hidden="true">·</span>
            <span>WordPress Elementor / Gutenberg Ready</span>
          </div>

          <div className="flex items-center gap-4">
            <a href="#home" className="hover:text-slate-200 transition-colors">Privacy Policy</a>
            <span aria-hidden="true">·</span>
            <a href="#home" className="hover:text-slate-200 transition-colors">Terms of Service</a>
            <span aria-hidden="true">·</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
