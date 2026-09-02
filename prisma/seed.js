const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const ARTWORKS_DATA = [
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
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1200&auto=format&fit=crop"
    ]),
    description: "A breathtaking tribute to the monsoon twilight sky over Dhaka. Fiha Islam utilizes heavy palette-knife impasto techniques with 24k liquid gold veins intertwining electric crimson and deep charcoal tones.",
    descriptionBn: "ঢাকার বর্ষার গোধূলি আকাশ থেকে অনুপ্রাণিত এক অসাধারণ সৃষ্টি। শিল্পী ফিহা ইসলাম এতে হেভি প্যালেট-নাইফ ইম্পাস্তো টেকনিক ও ২৪ ক্যারেট লিকুইড গোল্ড লিফ ব্যবহার করেছেন।",
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
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200&auto=format&fit=crop"
    ]),
    description: "An exploration into futuristic dreamscapes. Ultra-saturated violet tones and electric gradients pulse across the canvas.",
    descriptionBn: "ভবিষ্যতবাদী কল্পলোকের এক মায়াবী রূপায়ন। গাঢ় ভায়োলেট এবং ইলেকট্রিক আভা ক্যানভাস জুড়ে আধুনিক স্থাপত্যের সাথে নিখুঁতভাবে মানানসই।",
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
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1200&auto=format&fit=crop"
    ]),
    description: "A signature crossover between haute couture fashion and wall art. Hand-painted on pure Rajshahi Mulberry Silk.",
    descriptionBn: "রাজশাহী সিল্কের উপর হাতে আঁকা অনন্য শিল্পকর্ম। এটি দেওয়ালে ফ্রেমিং ও পরিধানযোগ্য।",
  }
];

async function seed() {
  console.log('Seeding database with Artora artworks...');
  for (const art of ARTWORKS_DATA) {
    await prisma.artPiece.upsert({
      where: { slug: art.slug },
      update: {},
      create: art,
    });
  }
  console.log('Database seeded successfully! 🎉');
}

seed()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
