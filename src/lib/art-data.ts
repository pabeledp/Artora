export interface ArtWork {
  id: string;
  slug: string;
  title: string;
  titleBn: string;
  medium: string;
  mediumBn: string;
  canvasSize: string;
  canvasSizeBn: string;
  priceBDT: number;
  priceUSD: number;
  isSold: boolean;
  isCommissionable: boolean;
  featured: boolean;
  category: 'original' | 'acrylic' | 'textile' | 'print';
  year: number;
  primaryImage: string;
  images: string[];
  textureMap?: string;
  colorPalette: string[];
  description: string;
  descriptionBn: string;
  dimensions: {
    widthInches: number;
    heightInches: number;
    depthInches: number;
  };
  highlights: string[];
  highlightsBn: string[];
}

export const ARTWORKS_DATA: ArtWork[] = [
  {
    id: "art-calligraphy-1",
    slug: "la-tahzan-arabic-calligraphy",
    title: "La Tahzan (لا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا)",
    titleBn: "লা তাহযান - পবিত্র আরবি ক্যালিগ্রাফি ও টেক্সচার্ড ক্যানভাস",
    medium: "Arabic Calligraphy & Textured Earth Palette Acrylic on Canvas",
    mediumBn: "আরবি ক্যালিগ্রাফি ও টেক্সচার্ড আর্থ প্যালেট অ্যাক্রিলিক (ক্যানভাস)",
    canvasSize: "30 x 48 inches (Horizontal Gallery Canvas)",
    canvasSizeBn: "৩০ x ৪৮ ইঞ্চি (হরাইজন্টাল গ্যালারি ফ্রেম)",
    priceBDT: 35000,
    priceUSD: 310,
    isSold: false,
    isCommissionable: true,
    featured: true,
    category: "original",
    year: 2025,
    primaryImage: "/images/hero-calligraphy.png",
    images: [
      "/images/hero-calligraphy.png",
      "/images/hero-calligraphy.png"
    ],
    colorPalette: ["#B88B58", "#5A3825", "#F4ECE1", "#221A15", "#A3CAD6"],
    description: "An evocative, spiritually uplifting original masterpiece featuring the timeless Quranic verse 'Do not grieve, indeed Allah is with us' (لا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا). Hand-crafted with organic raw earth ochre textures, intricate floral leaf accents, and bold fluid Arabic calligraphy by Fiha Islam.",
    descriptionBn: "কোরআনের চিরন্তন সান্ত্বনা ও আশার বাণী 'হতাশ হয়ো না, নিশ্চয়ই আল্লাহ আমাদের সাথে আছেন' (لا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا) সম্বলিত আত্মিক প্রশান্তির এক অনন্য মাস্টারপিস। শিল্পী ফিহা ইসলামের নিপুণ হাতে রাস্টি-আর্থ টেক্সচার ও সূক্ষ্ম ফ্লোরাল পাতার নকশায় তৈরি ১০০% অরিজিনাল ক্যানভাস।",
    dimensions: {
      widthInches: 48,
      heightInches: 30,
      depthInches: 1.5
    },
    highlights: [
      "Sacred Quranic Arabic Calligraphy (Thuluth script style)",
      "Multi-layered earthy ochre & textured brush strokes",
      "Hand-painted delicate botanical foliage corners",
      "Signed by Artist Fiha Islam with Authenticity Certificate"
    ],
    highlightsBn: [
      "পবিত্র কোরআনিক আরবি ক্যালিগ্রাফি (থুলুথ ও দিওয়ানি ফ্লেভার)",
      "মাল্টি-লেয়ার্ড রাস্ট-আর্থ ও টেক্সচার্ড ক্যানভাস ব্যাকগ্রাউন্ড",
      "হাতে আঁকা সূক্ষ্ম বোটানিক্যাল ফ্লোরাল লিফ অ্যাকসেন্ট",
      "শিল্পী ফিহা ইসলামের স্বাক্ষরযুক্ত প্রামাণ্য সার্টিফিকেট"
    ]
  },
  {
    id: "art-calligraphy-2",
    slug: "la-tahzan-grand-edition",
    title: "La Tahzan • Grand Statement Canvas",
    titleBn: "লা তাহযান • গ্র্যান্ড স্টেটমেন্ট ক্যানভাস (লার্জ সাইজ)",
    medium: "Bespoke Arabic Calligraphy on Heavy Gallery Stretched Linen",
    mediumBn: "বিস্পোক আরবি ক্যালিগ্রাফি ও প্রিমিয়াম হেভি লিনেন ক্যানভাস",
    canvasSize: "36 x 60 inches (Oversized Statement Canvas)",
    canvasSizeBn: "৩৬ x ৬০ ইঞ্চি (গ্র্যান্ড স্টেটমেন্ট ফ্রেম)",
    priceBDT: 48000,
    priceUSD: 420,
    isSold: false,
    isCommissionable: true,
    featured: true,
    category: "original",
    year: 2025,
    primaryImage: "/images/hero-calligraphy.png",
    images: [
      "/images/hero-calligraphy.png"
    ],
    colorPalette: ["#B88B58", "#5A3825", "#F4ECE1", "#221A15"],
    description: "A grand oversized statement edition of the sacred La Tahzan calligraphy, custom sized for prominent living rooms, boardrooms, and prayer sanctuaries. Museum grade UV archival protective seal.",
    descriptionBn: "লিভিং রুম ও লাক্সারি ইন্টেরিয়রের কেন্দ্রবিন্দু হিসেবে বড় সাইজে তৈরি লা তাহযান আরবি ক্যালিগ্রাফি স্টেটমেন্ট ক্যানভাস। ইউভি আর্কিভাল প্রটেক্টিভ সিলযুক্ত।",
    dimensions: {
      widthInches: 60,
      heightInches: 36,
      depthInches: 1.75
    },
    highlights: [
      "Grand statement scale for high-ceiling living rooms",
      "Archival heavy linen canvas with anti-warp solid wood bars",
      "100% hand-painted by Fiha Islam with direct artist provenance"
    ],
    highlightsBn: [
      "হাই-সিলিং লিভিং স্পেসের জন্য আকর্ষণীয় গ্র্যান্ড স্কেল",
      "অ্যান্টি-ওয়ার্প সলিড উডেন বারযুক্ত আর্কিভাল লিনেন ক্যানভাস",
      "শিল্পী ফিহা ইসলামের নিজ হাতে আঁকা অরিজিনাল মাস্টারপিস"
    ]
  },
  {
    id: "art-calligraphy-3",
    slug: "la-tahzan-bespoke-floating-frame",
    title: "La Tahzan • Floating Wood Studio Edition",
    titleBn: "লা তাহযান • ফ্লোটিং উড স্টুডিও এডিশন",
    medium: "Arabic Calligraphy with Natural Wood Floating Casing",
    mediumBn: "আরবি ক্যালিগ্রাফি ও ন্যাচারাল উডেন ফ্লোটিং ফ্রেম",
    canvasSize: "24 x 36 inches (Collector Studio Size)",
    canvasSizeBn: "২৪ x ৩৬ ইঞ্চি (কালেক্টর স্টুডিও সাইজ)",
    priceBDT: 28000,
    priceUSD: 250,
    isSold: false,
    isCommissionable: true,
    featured: false,
    category: "acrylic",
    year: 2025,
    primaryImage: "/images/hero-calligraphy.png",
    images: [
      "/images/hero-calligraphy.png"
    ],
    colorPalette: ["#B88B58", "#5A3825", "#F4ECE1"],
    description: "A versatile collector size featuring the full sacred verse with hand-detailed raw texture borders and optional floating wooden framing.",
    descriptionBn: "স্টুডিও ও বেডরুমের জন্য পারফেক্ট সাইজের লা তাহযান ক্যালিগ্রাফি। ফ্লোটিং ফ্রেম বা ডিরেক্ট ক্যানভাস উভয় ফরম্যাটে সংগ্রহযোগ্য।",
    dimensions: {
      widthInches: 36,
      heightInches: 24,
      depthInches: 1.5
    },
    highlights: [
      "Compact versatile dimensions for apartment sanctuaries",
      "Tactile raw earth palette and botanical corners",
      "Direct artist consultation for frame customization"
    ],
    highlightsBn: [
      "অ্যাপার্টমেন্ট বা পার্সোনাল স্পেসের জন্য নিখুঁত মাপ",
      "টেক্সচার্ড রাস্ট-আর্থ প্যালেট ও ফ্লোরাল পাতার নকশা",
      "ফ্রেম কালার কাস্টমাইজেশনের জন্য শিল্পীর সাথে সরাসরি পরামর্শ"
    ]
  }
];

export const COMMISSION_CANVAS_SIZES = [
  {
    id: "size-1",
    size: "18 x 24 inches",
    sizeBn: "১৮ x ২৪ ইঞ্চি (স্টুডিও সাইজ)",
    aspect: "3:4",
    idealFor: "Study, Bedroom, Reading Corner",
    idealForBn: "স্টাডি রুম, বেডরুম ও রিডিং কর্নার",
    basePriceBDT: 15000,
    basePriceUSD: 140
  },
  {
    id: "size-2",
    size: "24 x 36 inches",
    sizeBn: "২৪ x ৩৬ ইঞ্চি (ক্লাসিক গ্যালারি)",
    aspect: "2:3",
    idealFor: "Dining, Entryway, Foyer",
    idealForBn: "ডাইনিং স্পেস ও এন্ট্রিওয়ে",
    basePriceBDT: 25000,
    basePriceUSD: 230
  },
  {
    id: "size-3",
    size: "30 x 48 inches",
    sizeBn: "৩০ x ৪৮ ইঞ্চি (হরাইজন্টাল ক্যালিগ্রাফি)",
    aspect: "5:8",
    idealFor: "Main Living Room Wall, Above Sofa",
    idealForBn: "মেইন ড্রয়িং রুম ও সোফার পেছনের দেয়াল",
    basePriceBDT: 35000,
    basePriceUSD: 310
  },
  {
    id: "size-4",
    size: "36 x 60 inches",
    sizeBn: "৩৬ x ৬০ ইঞ্চি (গ্র্যান্ড স্টেটমেন্ট)",
    aspect: "3:5",
    idealFor: "Double-height Hall, Luxury Villa, Office Boardroom",
    idealForBn: "লাক্সারি লিভিং হল, ভিলা ও অফিস বোর্ডরুম",
    basePriceBDT: 55000,
    basePriceUSD: 490
  }
];

export const COLOR_PALETTE_PRESETS = [
  {
    id: "pal-calligraphy",
    name: "Sacred Earth Ochre & Raw Linen",
    nameBn: "রাস্ট-আর্থ ওচার, কাঁচা লিনেন ও ব্ল্যাক ক্যালিগ্রাফি",
    colors: ["#B88B58", "#5A3825", "#F4ECE1", "#221A15"],
    description: "Classic Quranic calligraphy aesthetic with earthy raw tones"
  },
  {
    id: "pal-crimson",
    name: "Crimson Eclipse & 24k Gold",
    nameBn: "ক্রিমসন রেড, ডিপ স্পেস ব্ল্যাক ও ২৪ ক্যারেট গোল্ড",
    colors: ["#E60049", "#2B020A", "#E6B93F", "#0D0004"],
    description: "Rich metallic magenta-red luxury impasto"
  },
  {
    id: "pal-emerald",
    name: "Emerald Sanctuary & Pearl Ivory",
    nameBn: "ডিপ এমারেল্ড গ্রিন, গোল্ড লিফ ও মুক্তা আইভরি",
    colors: ["#0B3B2E", "#155744", "#E6B93F", "#FAF8F5"],
    description: "Soothing deep emerald tones with shimmering gold"
  }
];

export const TESTIMONIALS_DATA = [
  {
    id: "test-1",
    author: "Barrister Rafiqul Islam",
    authorBn: "ব্যারিস্টার রফিকুল ইসলাম",
    location: "Gulshan-2, Dhaka",
    locationBn: "গুলশান-২, ঢাকা",
    review: "The Arabic calligraphy canvas exceeded every expectation. The texture is tangible, and the spiritual tranquility it brings to our living room is priceless. Fiha Islam is a true master.",
    reviewBn: "শিল্পী ফিহা ইসলামের হাতে আঁকা আরবি ক্যালিগ্রাফি ক্যানভাসটি আমাদের ড্রয়িং রুমের সৌন্দর্য বহুগুণ বাড়িয়ে দিয়েছে। টেক্সচার ও হাতের কাজ অসাধারণ।",
    rating: 5
  },
  {
    id: "test-2",
    author: "Dr. Nabila Chowdhury",
    authorBn: "ডা. নাবিলা চৌধুরী",
    location: "Dhanmondi, Dhaka",
    locationBn: "ধানমন্ডি, ঢাকা",
    review: "Commissioned a bespoke 30x48 piece for our new home. The direct WhatsApp consultation, frame selection, and safe delivery were flawless.",
    reviewBn: "নতুন বাড়ির জন্য কাস্টম সাইজের পেইন্টিং নিয়েছিলাম। শিল্পীর সাথে সরাসরি কথা বলে সাইজ ও ফ্রেম ঠিক করা খুব সহজ ছিল। সময়মতো নিখুঁতভাবে ডেলিভারি পেয়েছি।",
    rating: 5
  },
  {
    id: "test-3",
    author: "Tanvir Ahmed (Architect)",
    authorBn: "তানভীর আহমেদ (স্থপতি)",
    location: "Uttara Sector 4, Dhaka",
    locationBn: "উত্তরা, ঢাকা",
    review: "As an architect, I care deeply about authentic craftsmanship. Fiha's original artwork brings life, soul, and contemporary depth to any modern architectural space.",
    reviewBn: "স্থপতি হিসেবে দেয়ালের জন্য খাঁটি হস্তনির্মিত আর্ট খুব জরুরি মনে করি। Artora-এর ক্যানভাস প্রতিটি স্পেসে প্রাণ এনে দেয়।",
    rating: 5
  }
];
