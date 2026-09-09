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
    id: "pal-green",
    name: "Emerald Sanctuary & Olive Highlands",
    nameBn: "সবুজ পাহাড়ের দিগন্ত, অলিভ ও নিস্তব্ধ প্রকৃতি",
    colors: ["#5C784D", "#97B376", "#2B3C25", "#DEE5D2"],
    description: "Soothing natural greens and highland serenity"
  },
  {
    id: "pal-ocean",
    name: "Azure Ocean Waves & Cerulean Froth",
    nameBn: "গাঢ় সমুদ্রের নীল, আসমানি ও সাদা ঢেউয়ের ফেনা",
    colors: ["#0066B2", "#5BB7EA", "#FFFFFF", "#0B2545"],
    description: "Vibrant marine blue impasto and textured wave froth"
  },
  {
    id: "pal-crimson",
    name: "Crimson Eclipse & 24k Gold",
    nameBn: "ক্রিমসন রেড, ডিপ স্পেস ব্ল্যাক ও ২৪ ক্যারেট গোল্ড",
    colors: ["#E60049", "#2B020A", "#E6B93F", "#0D0004"],
    description: "Rich metallic magenta-red luxury impasto"
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
    id: "review-collector-1",
    author: "Barrister Rafiqul Islam",
    authorBn: "ব্যারিস্টার রফিকুল ইসলাম",
    location: "Gulshan-2, Dhaka",
    locationBn: "গুলশান-২, ঢাকা",
    review: "The heavy impasto texture on the calligraphy canvas is breathtaking. Fiha Islam's knife strokes and gold detailing create a museum-grade presence in our living room.",
    reviewBn: "ক্যালিগ্রাফি ক্যানভাসটির হেভি ইম্পাস্তো টেক্সচার এক কথায় অসাধারণ। ফিহা ইসলামের প্যালেট নাইফ স্ট্রোক ও গোল্ড ডিটেইলিং ড্রয়িং রুমের আভিজাত্য দ্বিগুণ বাড়িয়ে দিয়েছে।",
    rating: 5,
    isFacebookEmbed: false,
  },
  {
    id: "review-collector-2",
    author: "Dr. Nabila Chowdhury",
    authorBn: "ডা. নাবিলা চৌধুরী",
    location: "Dhanmondi, Dhaka",
    locationBn: "ধানমন্ডি, ঢাকা",
    review: "Received the artwork with impeccable archival framing. The spiritual tranquility of the Arabic verse and color harmony exceeded all expectations.",
    reviewBn: "নিখুঁত মিউজিয়াম ফ্রেমিং সহ ক্যানভাসটি হাতে পেয়েছি। পবিত্র আয়াতের আধ্যাত্মিক প্রশান্তি এবং রঙের গভীরতা প্রত্যাশার চেয়েও বেশি সুন্দর।",
    rating: 5,
    isFacebookEmbed: false,
  }
];

