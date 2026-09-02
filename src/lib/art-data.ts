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
  category: 'acrylic' | 'textile' | 'original' | 'print';
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
    id: "art-1",
    slug: "crimson-monsoon-impasto",
    title: "Crimson Monsoon (রক্তিম বর্ষা)",
    titleBn: "রক্তিম বর্ষা - হেভি ইম্পাস্তো",
    medium: "Heavy Impasto Acrylic & Gold Leaf on Stretched Linen",
    mediumBn: "হেভি ইম্পাস্তো অ্যাক্রিলিক ও গোল্ড লিফ (লিনেন ক্যানভাস)",
    canvasSize: "36 x 48 inches (Gallery Depth)",
    canvasSizeBn: "৩৬ x ৪৮ ইঞ্চি (গ্যালারি ফ্রেম)",
    priceBDT: 32000,
    priceUSD: 290,
    isSold: false,
    isCommissionable: true,
    featured: true,
    category: "acrylic",
    year: 2025,
    primaryImage: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=1200&auto=format&fit=crop"
    ],
    colorPalette: ["#FF2A5F", "#E6B93F", "#0A0A0C", "#8B1E3F", "#E8D8B0"],
    description: "A breathtaking tribute to the monsoon twilight sky over Dhaka. Fiha Islam utilizes heavy palette-knife impasto techniques with 24k liquid gold veins intertwining electric crimson and deep charcoal tones. The raised texture captures dynamic light reflections at every angle.",
    descriptionBn: "ঢাকার বর্ষার গোধূলি আকাশ থেকে অনুপ্রাণিত এক অসাধারণ সৃষ্টি। শিল্পী ফিহা ইসলাম এতে হেভি প্যালেট-নাইফ ইম্পাস্তো টেকনিক ও ২৪ ক্যারেট লিকুইড গোল্ড লিফ ব্যবহার করেছেন। ত্রিমাত্রিক টেক্সচার প্রতিটি কোণ থেকে আলোর অপার্থিব প্রতিফলন তৈরি করে।",
    dimensions: {
      widthInches: 36,
      heightInches: 48,
      depthInches: 1.75
    },
    highlights: [
      "Dynamic 3D raised impasto acrylic knife strokes",
      "Genuine 24k gold leaf accents sealed with UV archival varnish",
      "Signed front and back by artist Fiha Islam with authenticity certificate"
    ],
    highlightsBn: [
      "ত্রিমাত্রিক উঁচু প্যালেট নাইফের বলিষ্ঠ ব্রাশস্ট্রোক",
      "খাঁটি ২৪ ক্যারেট গোল্ড লিফ ও ইউভি আর্কিভাল বার্নিশ প্রলেপ",
      "শিল্পী ফিহা ইসলামের স্বাক্ষরযুক্ত জেনুইন আর্ট সার্টিফিকেট"
    ]
  },
  {
    id: "art-2",
    slug: "ethereal-violet-horizon",
    title: "Ethereal Cyber Horizon",
    titleBn: "ইথারিয়াল সাইবার হরাইজন",
    medium: "Textured Acrylic & Cyber Violet Luminescent Pigment",
    mediumBn: "টেক্সচার্ড অ্যাক্রিলিক ও সাইবার ভায়োলেট পিগমেন্ট",
    canvasSize: "30 x 40 inches",
    canvasSizeBn: "৩০ x ৪০ ইঞ্চি",
    priceBDT: 26000,
    priceUSD: 235,
    isSold: false,
    isCommissionable: true,
    featured: true,
    category: "acrylic",
    year: 2025,
    primaryImage: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop"
    ],
    colorPalette: ["#7C3AED", "#FF2A5F", "#1E1035", "#D8B4FE", "#0F071B"],
    description: "An exploration into futuristic dreamscapes. Ultra-saturated violet tones and electric gradients pulse across the canvas with tactile structural medium underneath, creating a sense of digital-organic convergence.",
    descriptionBn: "ভবিষ্যতবাদী কল্পলোকের এক মায়াবী রূপায়ন। গাঢ় ভায়োলেট এবং ইলেকট্রিক আভা ক্যানভাস জুড়ে আধুনিক স্থাপত্যের সাথে নিখুঁতভাবে মানানসই এক আভিজাত্য এনে দেয়।",
    dimensions: {
      widthInches: 30,
      heightInches: 40,
      depthInches: 1.5
    },
    highlights: [
      "Bespoke luminescent pigment shifting under direct light",
      "Triple-primed Belgian linen canvas with custom teak frame",
      "Museum-grade preservation against moisture & UV"
    ],
    highlightsBn: [
      "আলোর সাথে রঙ পরিবর্তনকারী বিশেষ পিগমেন্ট",
      "বেলজিয়ান লিনেন ক্যানভাস ও সেগুন কাঠের প্রিমিয়াম ফ্রেম",
      "আর্দ্রতা ও রোদ নিরোধক মিউজিয়াম-গ্রেড লেয়ার"
    ]
  },
  {
    id: "art-3",
    slug: "golden-nocturne-silk-textile",
    title: "Golden Nocturne: Wearable Canvas Silk",
    titleBn: "গোল্ডেন নক্টার্ন - হ্যান্ড-পেইন্টেড সিল্ক",
    medium: "Hand-Painted Pure Mulberry Silk with Fabric Acrylic & Gold Leaf",
    mediumBn: "হ্যান্ড-পেইন্টেড খাঁটি তুঁত সিল্ক ও মেটালিক অ্যাক্রিলিক",
    canvasSize: "Framed 24 x 36 inches / Wearable 6 Yards",
    canvasSizeBn: "২৪ x ৩৬ ইঞ্চি ফ্রেমড / ৬ গজ পরিধানযোগ্য শাড়ি",
    priceBDT: 18500,
    priceUSD: 168,
    isSold: false,
    isCommissionable: true,
    featured: true,
    category: "textile",
    year: 2025,
    primaryImage: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop"
    ],
    colorPalette: ["#0A0A0C", "#E6B93F", "#C5A059", "#2B2B2B"],
    description: "A signature crossover between haute couture fashion and wall art. Hand-painted on pure Rajshahi Mulberry Silk using permanent thermo-fixed acrylic mediums that maintain delicate drape and luxurious gold lustre.",
    descriptionBn: "রাজশাহী সিল্কের উপর হাতে আঁকা অনন্য শিল্পকর্ম। এটি যেমন দেওয়ালে ফ্রেমিং করে রাখার উপযুক্ত, তেমনি এক্সক্লুসিভ গালা ইভেন্টে পরিধানযোগ্য। ওয়াশ-প্রুফ পার্মানেন্ট রঙে তৈরি।",
    dimensions: {
      widthInches: 24,
      heightInches: 36,
      depthInches: 1.0
    },
    highlights: [
      "Hand-painted on pure Rajshahi Mulberry Silk",
      "Wash-resistant permanent heat-cured textile pigments",
      "Includes wall hanging mount or luxury keepsake gift box"
    ],
    highlightsBn: [
      "খাঁটি রাজশাহী তুঁত সিল্কের উপর স্বহস্তে অঙ্কিত",
      "ওয়াশ-রেজিস্ট্যান্ট পার্মানেন্ট টেক্সটাইল অ্যাক্রিলিক",
      "দেওয়ালে ঝুলানোর মাউন্ট অথবা এক্সক্লুসিভ গিফট বক্স সহ"
    ]
  },
  {
    id: "art-4",
    slug: "cosmic-sonnet-original",
    title: "Cosmic Sonnet (মহাজাগতিক কবিতা)",
    titleBn: "মহাজাগতিক কবিতা - লার্জ স্কেল ক্যানভাস",
    medium: "Multi-layered Acrylic Impasto & Sand Texture",
    mediumBn: "মাল্টি-লেয়ার অ্যাক্রিলিক ইম্পাস্তো ও স্যান্ড টেক্সচার",
    canvasSize: "48 x 60 inches (Oversized)",
    canvasSizeBn: "৪৮ x ৬০ ইঞ্চি (লার্জ স্কেল)",
    priceBDT: 48000,
    priceUSD: 435,
    isSold: false,
    isCommissionable: true,
    featured: true,
    category: "original",
    year: 2025,
    primaryImage: "https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1200&auto=format&fit=crop"
    ],
    colorPalette: ["#0A0A0C", "#E6B93F", "#7C3AED", "#FF2A5F", "#2A1B4E"],
    description: "An oversized statement piece intended for grand living rooms, penthouses, and corporate galleries. Deep obsidian voids collide with swirling cosmic nebulae sculpted from granular sand paste and radiant acrylics.",
    descriptionBn: "গ্র্যান্ড লিভিং রুম, ডুপ্লেক্স ও কর্পোরেট লাউঞ্জের জন্য তৈরি সুবিশাল মাস্টারপিস। কালো কুয়াশা ও নীহারিকার মাঝে তারকারাজির আলোর চমক ফুটিয়ে তুলতে বালুমিশ্রিত বিশেষ টেক্সচার ব্যবহার করা হয়েছে।",
    dimensions: {
      widthInches: 48,
      heightInches: 60,
      depthInches: 2.0
    },
    highlights: [
      "Monumental scale (4x5 feet) designed for feature walls",
      "Sculpted volcanic sand texture mixed with fluid acrylics",
      "Delivered in custom reinforced wooden transport crate"
    ],
    highlightsBn: [
      "৪x৫ ফুটের সুবিশাল ক্যানভাস যা বসার ঘরের মূল আকর্ষণ হবে",
      "ভলকানিক স্যান্ড টেক্সচার ও মেটালিক অ্যাক্রিলিকের মিশ্রণ",
      "বিশেষ কাঠের সুরক্ষামূলক বক্সে সারা দেশে নিরাপদ ডেলিভারি"
    ]
  },
  {
    id: "art-5",
    slug: "solitude-in-gold-print",
    title: "Solitude in Gold (লিমিটেড এডিশন)",
    titleBn: "সলিটিউড ইন গোল্ড - আর্কিভাল প্রিন্ট",
    medium: "Giclée Fine Art Print with Hand-Applied Gold Leaf Embellishment",
    mediumBn: "জিক্লি ফাইন আর্ট প্রিন্ট ও স্বহস্তে খোদাই করা গোল্ড লিফ",
    canvasSize: "20 x 28 inches",
    canvasSizeBn: "২০ x ২৮ ইঞ্চি",
    priceBDT: 8500,
    priceUSD: 78,
    isSold: false,
    isCommissionable: true,
    featured: false,
    category: "print",
    year: 2025,
    primaryImage: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200&auto=format&fit=crop"
    ],
    colorPalette: ["#E6B93F", "#1A1A1D", "#C5A059", "#FFFFFF"],
    description: "Limited collector run of 50 numbered archival prints on 310gsm German etching paper, each personally hand-embellished by Fiha Islam with 24k gold leaf highlights.",
    descriptionBn: "জার্মান এচিং পেপারে ৩১০ জিএসএম আর্কিভাল কোয়ালিটির লিমিটেড এডিশন প্রিন্ট (মাত্র ৫০ কপি)। প্রতিটি কপিতে শিল্পী নিজে গোল্ড লিফ দিয়ে সূক্ষ্ম হাইলাইট যুক্ত করেছেন।",
    dimensions: {
      widthInches: 20,
      heightInches: 28,
      depthInches: 1.0
    },
    highlights: [
      "Numbered edition (1/50) with embossed seal",
      "Hand-applied gold leaf ensures every print is unique",
      "Framed in matte black anti-reflective glass"
    ],
    highlightsBn: [
      "১/৫০ নাম্বারিং ও এমবস সিলযুক্ত লিমিটেড এডিশন",
      "হাতে লাগানো গোল্ড লিফের কারণে প্রতিটি কপিই স্বতন্ত্র",
      "ম্যাট ব্ল্যাক অ্যান্টি-রিফ্লেক্টিভ গ্লাস ফ্রেমিং সহ"
    ]
  },
  {
    id: "art-6",
    slug: "crimson-reverie-acrylic",
    title: "Crimson Reverie (রক্তিম স্বপ্ন)",
    titleBn: "রক্তিম স্বপ্ন - টেক্সচার্ড মিনিমালিজম",
    medium: "Acrylic & Sculptural Paste on Round Canvas",
    mediumBn: "অ্যাক্রিলিক ও ভাস্কর্যধর্মী পেস্ট (বৃত্তাকার ক্যানভাস)",
    canvasSize: "30 inches Diameter (Circular Canvas)",
    canvasSizeBn: "৩০ ইঞ্চি ব্যাস (বৃত্তাকার ক্যানভাস)",
    priceBDT: 21000,
    priceUSD: 190,
    isSold: true,
    isCommissionable: true,
    featured: false,
    category: "acrylic",
    year: 2025,
    primaryImage: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?q=80&w=1200&auto=format&fit=crop"
    ],
    colorPalette: ["#FF2A5F", "#0A0A0C", "#FF6B8B", "#4A0E17"],
    description: "A rare circular format piece capturing organic concentric energy. Sculptural acrylic ridges rise up to 10mm from the canvas surface, radiating crimson power in modern spaces.",
    descriptionBn: "বৃত্তাকার ক্যানভাসে আঁকা এক আকর্ষণীয় শিল্পকর্ম। ক্যানভাসের উপরিভাগে ১০ মিলিমিটার পর্যন্ত উঁচু অ্যাক্রিলিক টেক্সচার ঘরের আলোকসজ্জার সাথে নান্দনিক ছায়ার সৃষ্টি করে।",
    dimensions: {
      widthInches: 30,
      heightInches: 30,
      depthInches: 1.5
    },
    highlights: [
      "Unique circular floating canvas design",
      "Sold to a private collector in Gulshan, Dhaka (Re-commissionable)",
      "Available for custom color palette re-creation"
    ],
    highlightsBn: [
      "অনন্য গোল ক্যানভাস যা দেওয়ালে আধুনিক ভাস্কর্যের মতো দেখায়",
      "গুলশানের একজন সংগ্রাহকের কাছে সংরক্ষিত (অনুরূপ রি-কমিশনযোগ্য)",
      "আপনার রুমের পছন্দের রঙে কাস্টমাইজ করে বানানোর সুযোগ"
    ]
  }
];

export const TESTIMONIALS_DATA = [
  {
    id: "test-1",
    author: "Barrister Rafiqul Islam",
    authorBn: "ব্যারিস্টার রফিকুল ইসলাম",
    location: "Banani, Dhaka",
    locationBn: "বনানী, ঢাকা",
    review: "The 'Crimson Monsoon' impasto painting completely transformed our living room. Under evening warm spotlights, the gold leaf and raised knife strokes look utterly breathtaking. Fiha's craftsmanship is unmatched in Bangladesh!",
    reviewBn: "ফিহা ইসলামের 'রক্তিম বর্ষা' পেইন্টিংটি আমাদের ড্রয়িংরুমের রূপ পুরোপুরি বদলে দিয়েছে। সন্ধ্যার স্পটলাইটে গোল্ড লিফ এবং উঁচু রঙের টেক্সচার দেখে অতিথিরা মুগ্ধ হয়ে যান। ডেলিভারি ও প্যাকেজিং অত্যন্ত নিরাপদ ছিল।",
    rating: 5,
    verifiedCollector: true,
    artworkTitle: "Crimson Monsoon",
    artworkTitleBn: "রক্তিম বর্ষা"
  },
  {
    id: "test-2",
    author: "Nabila Tanzeem",
    authorBn: "নাবিলা তানজীম",
    location: "Dhanmondi, Dhaka",
    locationBn: "ধানমন্ডি, ঢাকা",
    review: "I commissioned a custom 4x3 feet painting to match my emerald & gold decor. The commission studio calculator was so clear, and Fiha sent video updates of each texture layer. bKash payment was seamless!",
    reviewBn: "আমার ডাইনিং এর ওয়াল কালারের সাথে ম্যাচ করে ৪x৩ ফুটের একটি কাস্টম পেইন্টিং অর্ডার করেছিলাম। প্রতিটি লেয়ারের ভিডিও আপডেট পেয়েছি এবং বিকাশ পেমেন্ট ছিল খুব সহজ। অরিজিনাল কাজের ফিনিশিং চমৎকার!",
    rating: 5,
    verifiedCollector: true,
    artworkTitle: "Custom Emerald Harmony",
    artworkTitleBn: "কাস্টম এমারেল্ড হারমনি"
  },
  {
    id: "test-3",
    author: "Dr. K. Mahbubur Rahman",
    authorBn: "ডাঃ কে. মাহবুবুর রহমান",
    location: "Chittagong",
    locationBn: "চট্টগ্রাম",
    review: "I ordered the Wearable Canvas Silk for my wife's anniversary. It arrived in a stunning wooden case via Pathao courier. She was speechless at the intricacy of the hand-painted gold motif.",
    reviewBn: "অ্যানিভার্সারি উপলক্ষে স্ত্রীর জন্য হ্যান্ড-পেইন্টেড সিল্ক অর্ডার করেছিলাম। চট্টগ্রামের ঠিকানায় পাঠাও কুরিয়ারের মাধ্যমে কাঠ ও ভেলভেটের প্রিমিয়াম বক্সে একদম নিখুঁতভাবে পৌঁছেছে। ধন্যবাদ আর্টরা!",
    rating: 5,
    verifiedCollector: true,
    artworkTitle: "Golden Nocturne Silk",
    artworkTitleBn: "গোল্ডেন নক্টার্ন সিল্ক"
  }
];

export const COMMISSION_CANVAS_SIZES = [
  { size: "18 x 24 inches", sizeBn: "১৮ x ২৪ ইঞ্চি (স্মল)", basePriceBDT: 12000, basePriceUSD: 110 },
  { size: "24 x 36 inches", sizeBn: "২৪ x ৩৬ ইঞ্চি (মিডিয়াম)", basePriceBDT: 19500, basePriceUSD: 175 },
  { size: "30 x 40 inches", sizeBn: "৩০ x ৪০ ইঞ্চি (লার্জ)", basePriceBDT: 26000, basePriceUSD: 235 },
  { size: "36 x 48 inches", sizeBn: "৩৬ x ৪৮ ইঞ্চি (স্টেটমেন্ট)", basePriceBDT: 34000, basePriceUSD: 310 },
  { size: "48 x 60 inches", sizeBn: "৪৮ x ৬০ ইঞ্চি (গ্র্যান্ড ওভারসাইজ)", basePriceBDT: 49000, basePriceUSD: 445 }
];

export const COLOR_PALETTE_PRESETS = [
  {
    id: "crimson-gold",
    name: "Crimson & Liquid Gold",
    nameBn: "রক্তিম ও লিকুইড গোল্ড",
    colors: ["#FF2A5F", "#E6B93F", "#0A0A0C", "#8B1E3F"]
  },
  {
    id: "cyber-violet",
    name: "Cyber Violet & Obsidian",
    nameBn: "সাইবার ভায়োলেট ও অবসিডিয়ান",
    colors: ["#7C3AED", "#FF2A5F", "#0A0A0C", "#D8B4FE"]
  },
  {
    id: "emerald-monarch",
    name: "Royal Emerald & Antique Gold",
    nameBn: "রয়েল এমারেল্ড ও এন্টিক গোল্ড",
    colors: ["#0F4C3A", "#E6B93F", "#0B251E", "#D4AF37"]
  },
  {
    id: "midnight-azure",
    name: "Midnight Azure & Silver Mist",
    nameBn: "মিডনাইট অ্যাজুর ও সিলভার মিস্ট",
    colors: ["#0C2340", "#0077B6", "#E0E1DD", "#0A0A0C"]
  }
];
