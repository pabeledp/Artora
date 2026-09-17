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
  originalPriceBDT?: number;
  discountPercent?: number;
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
    originalPriceBDT: 20000,
    discountPercent: 30,
    priceBDT: 14000,
    priceUSD: 125,
    isSold: false,
    isCommissionable: true,
    featured: true,
    category: "original",
    year: 2025,
    primaryImage: "/images/hero-calligraphy.png",
    images: [
      "/images/hero-calligraphy.png",
      "/images/la-tahzan-calligraphy.jpg"
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
    id: "art-3",
    slug: "inna-maal-usri-yusra-calligraphy",
    title: "Inna Ma'al Usri Yusra (إِنَّ مَعَ الْعُسْرِ يُسْرًا)",
    titleBn: "ইন্না মা'আল উসরি ইউসরা - আরবি ক্যালিগ্রাফি ও গ্রিন ল্যান্ডস্কেপ",
    medium: "Sacred Arabic Calligraphy on Textured Green Mountain Canvas",
    mediumBn: "পবিত্র আরবি ক্যালিগ্রাফি ও টেক্সচার্ড গ্রিন মাউন্টেন ক্যানভাস",
    canvasSize: "24 x 36 inches (Vertical Gallery Canvas)",
    canvasSizeBn: "২৪ x ৩৬ ইঞ্চি (ভার্টিক্যাল গ্যালারি ফ্রেম)",
    originalPriceBDT: 10000,
    discountPercent: 45,
    priceBDT: 5500,
    priceUSD: 50,
    isSold: false,
    isCommissionable: true,
    featured: true,
    category: "original",
    year: 2025,
    primaryImage: "/images/inna-maal-usri-yusra.jpg",
    images: [
      "/images/inna-maal-usri-yusra.jpg"
    ],
    colorPalette: ["#5C784D", "#97B376", "#2B3C25", "#DEE5D2", "#181F15"],
    description: "An evocative, tranquil original canvas featuring the sacred Quranic verse 'Indeed, with hardship comes ease' (إِنَّ مَعَ الْعُسْرِ يُسْرًا). Rendered in fluid Thuluth calligraphy against serene layered green mountain horizons, signed Artora by artist Fiha Islam.",
    descriptionBn: "পবিত্র কোরআনের আশার বাণী 'নিশ্চয়ই কষ্টের সাথেই স্বস্তি আছে' (إِنَّ مَعَ الْعُسْرِ يُسْرًا) সম্বলিত এক অপূর্ব মাস্টারপিস। শিল্পী ফিহা ইসলামের স্বহস্তে আঁকা শান্তিময় সবুজ পাহাড়ের দিগন্ত ও নিখুঁত আরবি ক্যালিগ্রাফি।",
    dimensions: {
      widthInches: 24,
      heightInches: 36,
      depthInches: 1.5
    },
    highlights: [
      "Sacred Quranic verse (Surah Ash-Sharh - 94:6)",
      "Layered mountain landscape in soothing moss and olive greens",
      "Signed original artwork: Artora 02.09.2025 by Fiha Islam",
      "Special 45% Collector Discount applied"
    ],
    highlightsBn: [
      "পবিত্র কোরআনিক আয়াত (সূরা আল-ইনশিরাহ - ৯৪:৬)",
      "হাতে আঁকা সবুজ পাহাড় ও প্রাকৃতিক দিগন্তের মিতালী",
      "শিল্পী ফিহা ইসলামের অফিশিয়াল সিগনেচার: Artora",
      "সীমিত সময়ের জন্য ৪৫% বিশেষ ডিসকাউন্ট"
    ]
  },
  {
    id: "art-004",
    slug: "landscape-boat-ocean-impasto",
    title: "Landscape Boat • Ocean Impasto Waves",
    titleBn: "ল্যান্ডস্কেপ বোট • নীল জলরাশি ও নৌকা (হেভি ইম্পাস্তো)",
    medium: "Heavy Impasto Acrylic & Palette Knife on Stretched Canvas",
    mediumBn: "হেভি ইম্পাস্তো অ্যাক্রিলিক ও প্যালেট-নাইফ স্ট্রোক (ক্যানভাস)",
    canvasSize: "30 x 48 inches (Horizontal Statement Canvas)",
    canvasSizeBn: "৩০ x ৪৮ ইঞ্চি (হরাইজন্টাল স্টেটমেন্ট ক্যানভাস)",
    originalPriceBDT: 18000,
    discountPercent: 55,
    priceBDT: 8100,
    priceUSD: 75,
    isSold: false,
    isCommissionable: true,
    featured: true,
    category: "acrylic",
    year: 2025,
    primaryImage: "/images/landscape-boat-ocean.jpg",
    images: [
      "/images/landscape-boat-ocean.jpg"
    ],
    colorPalette: ["#0066B2", "#5BB7EA", "#FFFFFF", "#5C4033", "#0B2545"],
    description: "A powerful, immersive seascape capturing a wooden boat gently gliding over dynamic azure textured waves. Fiha Islam's masterclass palette knife impasto delivers vivid dimensional paint textures and calm seafaring serenity.",
    descriptionBn: "নীল সমুদ্রের উত্তাল ও শান্ত ঢেউয়ের মাঝে একটি কাঠের নৌকার অপরূপ দৃশ্য। শিল্পী ফিহা ইসলামের বলিষ্ঠ প্যালেট-নাইফ ইম্পাস্তো টেকনিকে ত্রিমাত্রিক টেক্সচারে ফুটিয়ে তোলা হয়েছে জীবন্ত জলরাশি ও প্রকৃতির গভীর প্রশান্তি।",
    dimensions: {
      widthInches: 48,
      heightInches: 30,
      depthInches: 1.5
    },
    highlights: [
      "3D Raised palette knife impasto ocean wave textures",
      "Dynamic azure, cerulean, and pure white froth palette",
      "Signed original fine art with Authenticity Certificate",
      "Exclusive 55% Collector Discount applied"
    ],
    highlightsBn: [
      "প্যালেট নাইফের ত্রিমাত্রিক উঁচু ঢেউ ও জলরাশির টেক্সচার",
      "গাঢ় নীল, আসমানি ও সাদা ফোমের বৈচিত্র্যময় কালার প্যালেট",
      "শিল্পী ফিহা ইসলামের স্বাক্ষরযুক্ত অরিজিনাল ফাইন আর্ট",
      "এক্সক্লুসিভ ৫৫% স্পেশাল কালেক্টর ডিসকাউন্ট"
    ]
  }
];

export const COMMISSION_CANVAS_SIZES = [
  // Small Sizes (Starting from 3,000 BDT)
  {
    id: "size-4x8",
    size: "4 x 8 inches",
    sizeBn: "৪ x ৮ ইঞ্চি",
    category: "Small",
    categoryBn: "স্মল (ডেস্ক / ন্যারো স্পেস)",
    aspect: "1:2",
    idealFor: "Desk, Console, Gift, Shelf Decor",
    idealForBn: "ডেস্ক, কনসোল ও তাকের জন্য উপযুক্ত",
    basePriceBDT: 3000,
    basePriceUSD: 28
  },
  {
    id: "size-5x7",
    size: "5 x 7 inches",
    sizeBn: "৫ x ৭ ইঞ্চি",
    category: "Small",
    categoryBn: "স্মল (ডেস্ক / স্মল ওয়াল)",
    aspect: "5:7",
    idealFor: "Desk, Bedside Table, Minimal Accent",
    idealForBn: "বেডসাইড টেবিল ও মিনিমাল ওয়াল অ্যাকসেন্ট",
    basePriceBDT: 3200,
    basePriceUSD: 30
  },

  // Medium Sizes
  {
    id: "size-8x10",
    size: "8 x 10 inches",
    sizeBn: "৮ x ১০ ইঞ্চি",
    category: "Medium",
    categoryBn: "মিডিয়াম (স্টাডি / ওয়াল কর্নার)",
    aspect: "4:5",
    idealFor: "Study Table, Gallery Wall Accent",
    idealForBn: "স্টাডি রুম ও গ্যালারি ওয়াল কর্নার",
    basePriceBDT: 3800,
    basePriceUSD: 35
  },
  {
    id: "size-9x12",
    size: "9 x 12 inches",
    sizeBn: "৯ x ১২ ইঞ্চি",
    category: "Medium",
    categoryBn: "মিডিয়াম (স্টুডিও সাইজ)",
    aspect: "3:4",
    idealFor: "Reading Nook, Bedroom Accent",
    idealForBn: "রিডিং কর্নার ও বেডরুম ওয়াল",
    basePriceBDT: 4200,
    basePriceUSD: 39
  },
  {
    id: "size-11x14",
    size: "11 x 14 inches",
    sizeBn: "১১ x ১৪ ইঞ্চি",
    category: "Medium",
    categoryBn: "মিডিয়াম (ক্লাসিক ওয়াল)",
    aspect: "11:14",
    idealFor: "Dining Nook, Home Office Wall",
    idealForBn: "ডাইনিং ওয়াল ও হোম অফিস",
    basePriceBDT: 4800,
    basePriceUSD: 45
  },
  {
    id: "size-12x12",
    size: "12 x 12 inches",
    sizeBn: "১২ x ১২ ইঞ্চি (স্কয়ার)",
    category: "Medium",
    categoryBn: "মিডিয়াম (পারফেক্ট স্কয়ার)",
    aspect: "1:1",
    idealFor: "Square Wall Space, Coffee Corner",
    idealForBn: "স্কয়ার ওয়াল ও কফি কর্নার",
    basePriceBDT: 4600,
    basePriceUSD: 42
  },
  {
    id: "size-12x16",
    size: "12 x 16 inches",
    sizeBn: "১২ x ১৬ ইঞ্চি",
    category: "Medium",
    categoryBn: "মিডিয়াম (ভার্সাটাইল)",
    aspect: "3:4",
    idealFor: "Living Room Accent, Foyer",
    idealForBn: "লিভিং রুম ও এন্ট্রিওয়ে ফোয়ার",
    basePriceBDT: 5200,
    basePriceUSD: 48
  },

  // Large Sizes
  {
    id: "size-16x20",
    size: "16 x 20 inches",
    sizeBn: "১৬ x ২০ ইঞ্চি",
    category: "Large",
    categoryBn: "লার্জ (স্টেটমেন্ট ক্যানভাস)",
    aspect: "4:5",
    idealFor: "Main Room Focal Point, Bedroom Wall",
    idealForBn: "মেইন রুম ও বেডরুমের প্রধান দেয়াল",
    basePriceBDT: 6500,
    basePriceUSD: 60
  },
  {
    id: "size-18x24",
    size: "18 x 24 inches",
    sizeBn: "১৮ x ২৪ ইঞ্চি",
    category: "Large",
    categoryBn: "লার্জ (ক্লাসিক গ্যালারি)",
    aspect: "3:4",
    idealFor: "Living Room, Executive Office",
    idealForBn: "লিভিং রুম ও এক্সিকিউটিভ অফিস",
    basePriceBDT: 7500,
    basePriceUSD: 70
  },
  {
    id: "size-24x24",
    size: "24 x 24 inches",
    sizeBn: "২৪ x ২৪ ইঞ্চি (গ্র্যান্ড স্কয়ার)",
    category: "Large",
    categoryBn: "লার্জ (গ্র্যান্ড স্কয়ার)",
    aspect: "1:1",
    idealFor: "Symmetric Living Room Wall, Villa Foyer",
    idealForBn: "লিভিং রুম ও ভিলা এন্ট্রিওয়ে",
    basePriceBDT: 8500,
    basePriceUSD: 78
  },
  {
    id: "size-24x32",
    size: "24 x 32 inches",
    sizeBn: "২৪ x ৩২ ইঞ্চি",
    category: "Large",
    categoryBn: "লার্জ (গ্যালারি স্টেটমেন্ট)",
    aspect: "3:4",
    idealFor: "Above Sofa, Drawing Room Feature Wall",
    idealForBn: "সোফার ওপরের দেয়াল ও ড্রয়িং রুম",
    basePriceBDT: 10500,
    basePriceUSD: 95
  },
  {
    id: "size-30x40",
    size: "30 x 40 inches",
    sizeBn: "৩০ x ৪০ ইঞ্চি",
    category: "Large",
    categoryBn: "লার্জ (মাস্টারপিস স্টেটমেন্ট)",
    aspect: "3:4",
    idealFor: "Double-Height Hall, Luxury Drawing Room, Boardroom",
    idealForBn: "লাক্সারি ড্রয়িং হল, ডুপ্লেক্স স্পেস ও লাউঞ্জ",
    basePriceBDT: 13500,
    basePriceUSD: 125
  }
];

export const COLOR_PALETTE_PRESETS = [
  {
    id: "pal-calligraphy",
    name: "Sacred Earth Ochre & Raw Linen",
    nameBn: "রাস্ট-আর্থ ওচার ও কাঁচা লিনেন",
    colors: ["#B88B58", "#5A3825", "#F4ECE1", "#221A15"],
    description: "Classic Quranic calligraphy aesthetic with earthy raw ochre and antique tones"
  },
  {
    id: "pal-green",
    name: "Emerald Sanctuary & Olive Serenity",
    nameBn: "এমারেল্ড গ্রিন, অলিভ ও নিস্তব্ধ প্রকৃতি",
    colors: ["#5C784D", "#97B376", "#2B3C25", "#DEE5D2"],
    description: "Soothing natural botanical greens, layered mountains, and highland peace"
  },
  {
    id: "pal-ocean",
    name: "Azure Ocean Waves & Froth",
    nameBn: "গাঢ় সমুদ্রের নীল, আসমানি ও সাদা ঢেউ",
    colors: ["#0066B2", "#5BB7EA", "#FFFFFF", "#0B2545"],
    description: "Vibrant marine blue impasto, coastal horizons, and textured wave froth"
  },
  {
    id: "pal-crimson",
    name: "Crimson Eclipse & 24k Gold Accents",
    nameBn: "রয়েল ক্রিমসন রেড ও ২৪ ক্যারেট গোল্ড",
    colors: ["#E60049", "#2B020A", "#E6B93F", "#FFB0C1"],
    description: "Rich metallic magenta-red luxury impasto with radiant gold leaf highlights"
  },
  {
    id: "pal-monochrome",
    name: "Obsidian Noir & Titanium White",
    nameBn: "অবসিডিয়ান ব্ল্যাক, চারকোল ও পিওর হোয়াইট",
    colors: ["#121212", "#3A3A3C", "#8E8E93", "#FFFFFF"],
    description: "Ultra-modern minimalist monochromatic contrast for contemporary interiors"
  },
  {
    id: "pal-royal-navy",
    name: "Royal Midnight Navy & Brushed Brass",
    nameBn: "রয়েল মিডনাইট নেভি ব্লু ও ব্রাশড গোল্ড",
    colors: ["#0A192F", "#172A45", "#D4AF37", "#F8F9FA"],
    description: "Deep regal navy blue with brushed gold metallic textures and Islamic geometry"
  },
  {
    id: "pal-terracotta",
    name: "Terracotta Sunset & Warm Amber",
    nameBn: "টেরাকোটা ক্লে, সানসেট ও ওয়ার্ম অ্যাম্বার",
    colors: ["#C85A32", "#E29578", "#F5CB5C", "#331811"],
    description: "Warm bohemian earthen terracotta, burnt sienna, and golden sunset glow"
  },
  {
    id: "pal-pastel-rose",
    name: "Blush Rose & Celestial Pearl",
    nameBn: "ব্লাশ রোজ, পেস্টেল পিংক ও পার্ল গ্রে",
    colors: ["#F4ACB7", "#D8E2DC", "#FFE5D9", "#4A5759"],
    description: "Gentle romantic pastels, soft textured floral vibes, and soothing elegance"
  }
];

export const TESTIMONIALS_DATA = [
  {
    id: "fb-review-moni-akther",
    author: "Moni Akther",
    authorBn: "মণি আক্তার",
    location: "Facebook Community Review",
    locationBn: "ফেসবুক ভেরিফাইড রিভিউ",
    facebookPostUrl: "https://www.facebook.com/moni.akther.20971/posts/pfbid0q2aj2LdpkSFgkA8EcVf8rB6qF5npv7XqBG9f5iC1Qkc3XqCGbBv95JZ2vvnu7nbXl",
    facebookEmbedUrl: "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fmoni.akther.20971%2Fposts%2Fpfbid0q2aj2LdpkSFgkA8EcVf8rB6qF5npv7XqBG9f5iC1Qkc3XqCGbBv95JZ2vvnu7nbXl&show_text=true&width=500",
    review: "Alhamdulillah! The artwork and framing are truly amazing and beautifully finished. It brought such elegance and spiritual serenity to our space.",
    reviewBn: "ধন্যবাদ Artora পেইজ কে। পেইন্টিং গুলো অনেক সুন্দর। রিজনেবল প্রাইজে পেয়েছি আলহামদুলিল্লাহ! ❤️😍",
    rating: 5,
    isFacebookEmbed: true,
  },
  {
    id: "fb-review-rabeya-bossry",
    author: "Rabeya Bossry",
    authorBn: "রাবেয়া বসরী",
    location: "Facebook Community Review",
    locationBn: "ফেসবুক ভেরিফাইড রিভিউ",
    facebookPostUrl: "https://www.facebook.com/rabeya.bossry.161405/posts/pfbid0X6nzDD5oRaYJyuUEtRSZCLfxnt3dyDkNnEfeKsBL9fUpNB3dxDSM2uAwFWGU4KZQl",
    facebookEmbedUrl: "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Frabeya.bossry.161405%2Fposts%2Fpfbid0X6nzDD5oRaYJyuUEtRSZCLfxnt3dyDkNnEfeKsBL9fUpNB3dxDSM2uAwFWGU4KZQl&show_text=true&width=500",
    review: "Mashallah! The calligraphy and texture are exceptional. Thank you Artora for the genuine handcrafted masterpiece.",
    reviewBn: "অসাধারণ কাজ! ক্যালিগ্রাফি ও ফিনিশিং সত্যিই প্রশংসনীয়। আলহামদুলিল্লাহ অনেক সুন্দর হয়েছে।",
    rating: 5,
    isFacebookEmbed: true,
  },
  {
    id: "fb-review-nusrat-jahan",
    author: "Nusrat Jahan",
    authorBn: "নুসরাত জাহান",
    location: "Facebook Community Review",
    locationBn: "ফেসবুক ভেরিফাইড রিভিউ",
    facebookPostUrl: "https://www.facebook.com/permalink.php?story_fbid=pfbid02Hmoc7yT2fkZM8oJJKsbADZkY1kg3GmE2Y9V3Q5pf3tt7zX2Wc6mt9HgkqnmXtzEVl&id=100088126017837",
    facebookEmbedUrl: "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid02Hmoc7yT2fkZM8oJJKsbADZkY1kg3GmE2Y9V3Q5pf3tt7zX2Wc6mt9HgkqnmXtzEVl%26id%3D100088126017837&show_text=true&width=500",
    review: "Alhamdulillah! Amazing handcrafted calligraphy and museum-grade framing. Highly recommended!",
    reviewBn: "আলহামদুলিল্লাহ! অসাধারণ ক্যালিগ্রাফি ও প্রিমিয়াম ফিনিশিং। অনেক ধন্যবাদ আর্টোরা কে।",
    rating: 5,
    isFacebookEmbed: true,
  }
];


