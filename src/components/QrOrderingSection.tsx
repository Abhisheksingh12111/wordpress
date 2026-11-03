import React, { useState } from 'react';
import {
  QrCode,
  Smartphone,
  CheckCircle2,
  BellRing,
  ArrowRight,
  Flame,
  Calendar,
  Users,
  Clock,
  Sparkles,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface QrOrderingSectionProps {
  restaurantName: string;
  onOpenQrSimulator: () => void;
  onReservationComplete: (details: {
    name: string;
    date: string;
    time: string;
    guests: number;
    seating: string;
    notes: string;
  }) => void;
}

export const QrOrderingSection: React.FC<QrOrderingSectionProps> = ({
  restaurantName,
  onOpenQrSimulator,
  onReservationComplete,
}) => {
  // Booking Form State
  const [date, setDate] = useState('2026-11-06');
  const [time, setTime] = useState('19:30');
  const [guests, setGuests] = useState(2);
  const [seating, setSeating] = useState('Chef’s Hearth Counter');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  const timeSlots = ['17:30', '18:15', '19:00', '19:30', '20:15', '21:00', '21:45'];
  const seatingOptions = [
    { id: 'hearth', label: 'Chef’s Hearth Counter', desc: 'Direct view of live open fire' },
    { id: 'dining', label: 'Main Dining Room', desc: 'Spacious high-ceiling ambient' },
    { id: 'terrace', label: 'Candlelit Terrace', desc: 'Covered heated outdoor garden' },
    { id: 'booth', label: 'Private Leather Booth', desc: 'Intimate dinner party' },
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestPhone) {
      alert('Please provide your name and contact phone number.');
      return;
    }

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#f59e0b', '#fbbf24', '#ffffff', '#d97706'],
    });

    setBookingSubmitted(true);
    onReservationComplete({
      name: guestName,
      date,
      time,
      guests,
      seating,
      notes,
    });
  };

  return (
    <section id="qr-ordering" className="py-20 bg-[#0d131a] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contactless QR Ordering Dedicated Feature Box */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#131b24] to-[#0e1620] border border-amber-500/25 p-8 sm:p-10 lg:p-12 shadow-2xl mb-20 overflow-hidden">
          {/* Subtle gold glow behind card */}
          <div
            className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 7 cols: The 3-Step Flow */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-400">
                <QrCode className="w-4 h-4 text-amber-400" />
                <span>Next-Gen Dining Technology</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                Contactless QR Ordering &amp; Instant Table Service
              </h2>

              {/* Exact user requested highlight flow */}
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200">
                <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-1">
                  How It Works
                </div>
                <div className="text-base sm:text-lg font-serif font-semibold text-white flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="text-amber-300">Scan QR at table</span>
                  <span className="text-amber-500 font-sans">➔</span>
                  <span className="text-amber-300">Order Online</span>
                  <span className="text-amber-500 font-sans">➔</span>
                  <span className="text-amber-300">Instant Kitchen Notification</span>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                No apps to install. Simply point your smartphone camera at the custom wooden QR token on your dining table to open {restaurantName}&apos;s real-time interactive menu. Orders, drink refills, and bill requests route directly to the brigade’s Kitchen Display System in under 180 milliseconds.
              </p>

              {/* 3 Step Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs mb-2">
                    01
                  </div>
                  <div className="text-sm font-semibold text-white">Instant Table Scan</div>
                  <div className="text-xs text-slate-400 mt-1">
                    Native camera recognizes Table # with your server assigned.
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs mb-2">
                    02
                  </div>
                  <div className="text-sm font-semibold text-white">Visual Customization</div>
                  <div className="text-xs text-slate-400 mt-1">
                    Temperature preference, wine pairings, &amp; allergy tags.
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs mb-2">
                    03
                  </div>
                  <div className="text-sm font-semibold text-white">Direct Kitchen Ticket</div>
                  <div className="text-xs text-slate-400 mt-1">
                    Binchotan grill prints ticket instantly; live status tracking.
                  </div>
                </div>
              </div>

              {/* Trigger Interactive Simulator */}
              <div className="pt-2">
                <button
                  onClick={onOpenQrSimulator}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm shadow-lg hover:shadow-amber-500/25 transition-all cursor-pointer"
                >
                  <Smartphone className="w-4 h-4 text-slate-950" />
                  <span>Launch Live Table QR Simulator</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right 5 cols: Visual QR Mockup Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm rounded-2xl bg-[#090d12] border border-amber-500/30 p-6 text-center shadow-2xl">
                {/* Glowing border ring */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold uppercase tracking-wider shadow">
                  Table 12 · Amber Room
                </div>

                {/* QR Code graphic */}
                <div className="mt-4 p-4 rounded-xl bg-white mx-auto w-48 h-48 flex flex-col items-center justify-center shadow-inner relative group cursor-pointer" onClick={onOpenQrSimulator}>
                  {/* Stylized QR Code SVG */}
                  <svg className="w-40 h-40 text-slate-950" viewBox="0 0 100 100" fill="currentColor">
                    {/* Corners */}
                    <rect x="5" y="5" width="26" height="26" fill="black" rx="4" />
                    <rect x="9" y="9" width="18" height="18" fill="white" rx="2" />
                    <rect x="13" y="13" width="10" height="10" fill="black" rx="1" />

                    <rect x="69" y="5" width="26" height="26" fill="black" rx="4" />
                    <rect x="73" y="9" width="18" height="18" fill="white" rx="2" />
                    <rect x="77" y="13" width="10" height="10" fill="black" rx="1" />

                    <rect x="5" y="69" width="26" height="26" fill="black" rx="4" />
                    <rect x="9" y="73" width="18" height="18" fill="white" rx="2" />
                    <rect x="13" y="77" width="10" height="10" fill="black" rx="1" />

                    {/* QR Data Pixels */}
                    <rect x="36" y="8" width="6" height="6" />
                    <rect x="46" y="8" width="6" height="6" />
                    <rect x="56" y="8" width="6" height="6" />
                    <rect x="36" y="18" width="6" height="6" />
                    <rect x="48" y="24" width="8" height="6" />

                    <rect x="8" y="38" width="6" height="6" />
                    <rect x="18" y="44" width="6" height="6" />
                    <rect x="28" y="38" width="8" height="6" />

                    <rect x="38" y="38" width="8" height="8" fill="#d97706" />
                    <rect x="52" y="38" width="10" height="6" />
                    <rect x="68" y="38" width="6" height="8" />
                    <rect x="82" y="44" width="8" height="6" />

                    <rect x="38" y="52" width="6" height="8" />
                    <rect x="48" y="60" width="8" height="8" fill="#d97706" />
                    <rect x="62" y="52" width="6" height="6" />
                    <rect x="74" y="60" width="12" height="6" />

                    <rect x="38" y="72" width="8" height="6" />
                    <rect x="54" y="72" width="6" height="8" />
                    <rect x="68" y="72" width="10" height="6" />
                    <rect x="82" y="80" width="8" height="8" />
                  </svg>
                  <div className="absolute inset-0 bg-amber-500/10 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="bg-slate-900 text-amber-300 text-[11px] font-semibold px-2 py-1 rounded shadow">
                      Click to Test
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-sm font-semibold text-white">Scan to Order &amp; Pay</div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Or click QR code to test instant simulator
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-center gap-4 text-xs text-amber-300/80">
                  <span className="flex items-center gap-1">
                    <BellRing className="w-3.5 h-3.5 text-amber-400" />
                    Direct KDS Sync
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Apple / Google Pay
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Table Reservation Widget */}
        <div id="reservation" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-semibold tracking-widest uppercase text-amber-400">
              Table Reservation
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              Reserve Your Culinary Journey
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Whether joining us for an intimate counter tasting with our pitmasters or an evening gathering on the terrace, we recommend booking in advance. Tables are held for 15 minutes past reservation time.
            </p>

            <div className="space-y-3 pt-2 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Instant email &amp; SMS confirmation with booking QR pass.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Complimentary sommelier greeting with welcome amuse-bouche.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Special dietary requests catered by our executive chef.</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#131b24] border border-amber-500/20 text-xs text-amber-300">
              <span className="font-semibold text-white">Need Private Dining (10+ guests)?</span>
              <p className="text-slate-400 mt-1">
                Call our events concierge directly at <span className="text-amber-400">+1 (555) 438-2623</span> or message on WhatsApp.
              </p>
            </div>
          </div>

          {/* Interactive Reservation Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#131b24] border border-amber-500/25 p-6 sm:p-8 shadow-2xl">
              {bookingSubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white">
                    Reservation Confirmed!
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Thank you, <span className="text-amber-300 font-semibold">{guestName}</span>. Your table for <span className="text-white font-medium">{guests} guests</span> at the <span className="text-amber-300 font-medium">{seating}</span> is secured for <span className="text-white font-medium">{date}</span> at <span className="text-amber-300 font-medium">{time}</span>.
                  </p>

                  <div className="p-4 rounded-xl bg-slate-900 border border-amber-500/30 max-w-sm mx-auto text-left text-xs space-y-1.5 font-mono text-slate-300">
                    <div className="flex justify-between text-slate-400">
                      <span>CONFIRMATION PASS:</span>
                      <span className="text-amber-400 font-bold">#AUR-{Math.floor(100000 + Math.random() * 900000)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>RESTAURANT:</span>
                      <span className="text-white font-serif">{restaurantName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>PHONE NOTIFIED:</span>
                      <span>{guestPhone}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setBookingSubmitted(false)}
                    className="px-6 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors cursor-pointer"
                  >
                    Modify / Make Another Booking
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Date */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        <Calendar className="w-3.5 h-3.5 inline mr-1 text-amber-400" />
                        Date
                      </label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 text-white text-xs rounded-lg px-3 py-2.5 focus:outline-none"
                        required
                      />
                    </div>

                    {/* Time Slot */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        <Clock className="w-3.5 h-3.5 inline mr-1 text-amber-400" />
                        Time
                      </label>
                      <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 text-white text-xs rounded-lg px-3 py-2.5 focus:outline-none"
                      >
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Guests */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        <Users className="w-3.5 h-3.5 inline mr-1 text-amber-400" />
                        Guests
                      </label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 text-white text-xs rounded-lg px-3 py-2.5 focus:outline-none"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Seating Preference */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Seating Ambience
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {seatingOptions.map((opt) => (
                        <button
                          type="button"
                          key={opt.id}
                          onClick={() => setSeating(opt.label)}
                          className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                            seating === opt.label
                              ? 'bg-amber-500/15 border-amber-500 text-white shadow-sm'
                              : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <div className="text-xs font-semibold text-white flex items-center justify-between">
                            <span>{opt.label}</span>
                            {seating === opt.label && (
                              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5">{opt.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Eleanor Sinclair"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 text-white text-xs rounded-lg px-3 py-2.5 focus:outline-none placeholder:text-slate-600"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Mobile Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 text-white text-xs rounded-lg px-3 py-2.5 focus:outline-none placeholder:text-slate-600"
                        required
                      />
                    </div>
                  </div>

                  {/* Special Notes */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Special Occasion or Dietary Requirements (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Anniversary dinner, shellfish allergy for 1 guest"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 text-white text-xs rounded-lg px-3 py-2.5 focus:outline-none placeholder:text-slate-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-bold text-sm tracking-wide shadow-lg hover:shadow-amber-500/25 transition-all duration-200 cursor-pointer"
                  >
                    Confirm Table Reservation
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
