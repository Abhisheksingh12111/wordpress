export interface MenuItem {
  id: string;
  name: string;
  category: 'starters' | 'mains' | 'specials' | 'drinks' | 'desserts';
  price: number;
  description: string;
  image: string;
  badge?: 'Chef Special' | 'Vegan' | 'Gluten-Free' | 'Signature';
  calories?: string;
  pairing?: string;
  isPopular?: boolean;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  rating: number;
  date: string;
  avatarText: string;
  comment: string;
  dishOrdered: string;
  platform: 'Google' | 'Zomato';
}

export const INITIAL_RESTAURANT = {
  name: 'AURA Hearth & Ember',
  tagline: 'Exquisite Culinary Experience & Instant Online Ordering',
  subheadline:
    'Where primal white-oak charcoal embers meet Michelin-calibre gastronomy. Savor dry-aged cuts, wild ocean-foraged catch, and seamless contactless table ordering.',
  phone: '+1 (555) 438-2623',
  whatsapp: '+1 (555) 438-2623',
  email: 'reservations@aurarestaurant.com',
  address: '428 Amber Boulevard, Culinary Arts Quarter, Downtown',
  googleRating: 4.9,
  totalReviews: 2840,
  zomatoRating: 4.85,
  openingHours: {
    weekdays: 'Mon – Thu: 12:00 PM – 3:30 PM | 5:30 PM – 11:00 PM',
    weekends: 'Fri – Sun: 12:00 PM – 4:00 PM | 5:00 PM – 12:00 AM',
    barHours: 'Bar & Lounge open daily until 1:00 AM',
  },
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'wagyu-ribeye',
    name: '45-Day Dry-Aged Wagyu Ribeye',
    category: 'specials',
    price: 68,
    description:
      'Charcoal-seared Japanese A5 cross Wagyu, roasted bone marrow herb butter, charred wild rosemary, confit garlic cloves, and fleur de sel.',
    image: '/src/assets/images/hero_signature_dish_1793610138745.jpg',
    badge: 'Chef Special',
    calories: '780 kcal',
    pairing: 'Napa Valley Cabernet Sauvignon 2018',
    isPopular: true,
  },
  {
    id: 'hokkaido-scallops',
    name: 'Pan-Seared Hokkaido Scallops',
    category: 'starters',
    price: 28,
    description:
      'Caramelized sea scallops resting on silk cauliflower mousseline, crispy prosciutto crisps, salmon roe, and cold-pressed saffron emulsion.',
    image: '/src/assets/images/dish_seared_scallops_1793610138192.jpg',
    badge: 'Gluten-Free',
    calories: '340 kcal',
    pairing: 'Chablis Premier Cru 2021',
    isPopular: true,
  },
  {
    id: 'braised-short-rib',
    name: '14-Hour Braised Beef Short Rib',
    category: 'mains',
    price: 46,
    description:
      'Slow-cooked in Barolo wine glaze, served over velvety Yukon gold potato purée, heirloom rainbow carrots, and fresh garden thyme.',
    image: '/src/assets/images/dish_braised_short_rib_1793610138390.jpg',
    badge: 'Signature',
    calories: '820 kcal',
    pairing: 'Brunello di Montalcino 2017',
    isPopular: true,
  },
  {
    id: 'chilean-seabass',
    name: 'Miso-Glazed Chilean Sea Bass',
    category: 'specials',
    price: 54,
    description:
      'Pan-roasted wild sea bass fillet coated in caramelized sweet miso glaze, charred baby bok choy, shiitake mushrooms, and dashi ginger broth.',
    image: '/src/assets/images/dish_chilean_seabass_1793610139449.jpg',
    badge: 'Chef Special',
    calories: '510 kcal',
    pairing: 'Sancerre Sauvignon Blanc 2022',
    isPopular: true,
  },
  {
    id: 'smoked-amber-old-fashioned',
    name: 'Smoked Amber Old Fashioned',
    category: 'drinks',
    price: 22,
    description:
      'Small-batch aged bourbon smoked with charred hickory wood, black walnut bitters, flamed organic Valencia orange peel, and crystal ice sphere.',
    image: '/src/assets/images/cocktail_smoked_amber_1793610140703.jpg',
    badge: 'Signature',
    calories: '190 kcal',
    pairing: 'Dry-aged steaks & artisan chocolate',
    isPopular: true,
  },
  {
    id: 'truffle-carpaccio',
    name: 'Black Truffle Prime Beef Carpaccio',
    category: 'starters',
    price: 26,
    description:
      'Thinly shaved tenderloin, Umbrian winter truffles, 24-month Parmigiano-Reggiano crisps, caperberries, and cold-pressed EVOO.',
    image: '/src/assets/images/hero_signature_dish_1793610138745.jpg',
    badge: 'Gluten-Free',
    calories: '290 kcal',
    pairing: 'Franciacorta Brut Rosé',
  },
  {
    id: 'ember-roasted-cauliflower',
    name: 'Charred Spiced Romanesco & Cauliflower',
    category: 'mains',
    price: 32,
    description:
      'Ember-roasted whole Romanesco with whipped smoked tahini, pomegranate seeds, toasted pine nuts, green herb salsa verde, and Aleppo pepper.',
    image: '/src/assets/images/dish_seared_scallops_1793610138192.jpg',
    badge: 'Vegan',
    calories: '380 kcal',
    pairing: 'Etna Bianco 2021',
  },
  {
    id: 'valrhona-fondant',
    name: 'Smoked Valrhona Chocolate Fondant',
    category: 'desserts',
    price: 20,
    description:
      'Molten 70% dark chocolate center, Madagascar bourbon vanilla gelato, smoked sea salt crystals, and edible 24K gold leaf flakes.',
    image: '/src/assets/images/dish_braised_short_rib_1793610138390.jpg',
    badge: 'Chef Special',
    calories: '490 kcal',
    pairing: 'Tawny Port 20-Year',
    isPopular: true,
  },
];

export const TESTIMONIALS: Review[] = [
  {
    id: 'rev-1',
    author: 'Julian Vance-Moreau',
    role: 'Food & Wine Columnist',
    rating: 5,
    date: '2 days ago',
    avatarText: 'JV',
    comment:
      'The 45-day dry aged Wagyu has arguably the best sear in the city. The tableside QR ordering worked flawlessly—we ordered our cocktails and appetizers instantly while seated and they arrived in minutes.',
    dishOrdered: '45-Day Dry-Aged Wagyu Ribeye & Smoked Amber Old Fashioned',
    platform: 'Google',
  },
  {
    id: 'rev-2',
    author: 'Elena Rostova',
    role: 'Verified Zomato Gold Diner',
    rating: 5,
    date: '1 week ago',
    avatarText: 'ER',
    comment:
      'Celebrated our anniversary at the Chef’s Hearth Counter. The Chilean sea bass was ethereal, delicate and rich in equal measure. The modern ambiance and amber lighting create pure magic.',
    dishOrdered: 'Miso-Glazed Chilean Sea Bass & Hokkaido Scallops',
    platform: 'Zomato',
  },
  {
    id: 'rev-3',
    author: 'Marcus Sterling',
    role: 'Private Dining Enthusiast',
    rating: 5,
    date: '3 weeks ago',
    avatarText: 'MS',
    comment:
      'Flawless reservation experience and prompt service. The wine pairings recommended on the digital menu were spot on. A masterclass in luxury dining without pretension.',
    dishOrdered: '14-Hour Braised Beef Short Rib',
    platform: 'Google',
  },
  {
    id: 'rev-4',
    author: 'Dr. Soraya Kim',
    role: 'Local Resident',
    rating: 5,
    date: 'Last month',
    avatarText: 'SK',
    comment:
      'The contactless QR ordering system is the best implementation I have seen in any fine dining venue. Seamless, beautiful UI, and instant kitchen updates. Will return often.',
    dishOrdered: 'Pan-Seared Hokkaido Scallops & Valrhona Fondant',
    platform: 'Google',
  },
];

export const CRAFT_PILLARS = [
  {
    number: '01',
    title: 'Binchotan White-Oak Charcoal',
    description:
      'We fuel our open hearth with artisanal Kishu Binchotan charcoal, burning at searing 1,000°C temperatures with clean radiant heat to seal in rich natural juices.',
  },
  {
    number: '02',
    title: 'Dry-Aging Himalayan Salt Chamber',
    description:
      'Our in-house aging chamber lined with authentic Himalayan pink salt blocks nurtures prime beef cuts for 35 to 60 days, unlocking deep umami complexities.',
  },
  {
    number: '03',
    title: 'Wild Line-Caught Sourcing',
    description:
      'Direct partnerships with ethical day-boat fishermen guarantee our Hokkaido scallops and Chilean sea bass arrive within hours of harvest.',
  },
  {
    number: '04',
    title: 'Contactless Smart Tableside Tech',
    description:
      'Built-in QR ordering integrates directly with kitchen display screens, ensuring every guest enjoys immediate attention and transparent order status.',
  },
];
