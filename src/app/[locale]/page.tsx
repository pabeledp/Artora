'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { ARTWORKS_DATA, TESTIMONIALS_DATA } from '@/lib/art-data';
import { useCurrency } from '@/lib/currency';
import { useCart } from '@/lib/cart';
import { motion, AnimatePresence } from 'framer-motion';

import {
  Sparkles,
  ArrowRight,
  Palette,
  Eye,
  Star,
  ShieldCheck,
  ShoppingBag,
  Layers,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Award,
  CheckCircle2,
  Facebook,
  ExternalLink,
  Quote,
} from 'lucide-react';


export default function HomePage() {
  const tHero = useTranslations('hero');
  const tFeatured = useTranslations('featured');
  const tAbout = useTranslations('aboutArtist');
  const tTestimonials = useTranslations('testimonials');
  const locale = useLocale();
  const { formatPrice } = useCurrency();
  const { addItem } = useCart();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeArtIndex, setActiveArtIndex] = useState<number>(0);
  const [activeReviewIndex, setActiveReviewIndex] = useState<number>(0);

  // Auto-slide effect when testimonials > 3 or on mobile screens
  useEffect(() => {
    if (TESTIMONIALS_DATA.length <= 1) return;
    const interval = setInterval(() => {
      setActiveReviewIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const categories = [
    { id: 'all', labelBn: 'সকল মাস্টারপিস', labelEn: 'All Masterpieces' },
    { id: 'acrylic', labelBn: 'অ্যাক্রিলিক ইম্পাস্তো', labelEn: 'Acrylic Impasto' },
    { id: 'original', labelBn: 'আরবি ক্যালিগ্রাফি ও লার্জ ক্যানভাস', labelEn: 'Calligraphy & Canvas' },
    { id: 'textile', labelBn: 'হ্যান্ড-পেইন্টেড সিল্ক', labelEn: 'Wearable Silk' },
  ];

  const filteredArtworks =
    selectedCategory === 'all'
      ? ARTWORKS_DATA
      : ARTWORKS_DATA.filter((art) => art.category === selectedCategory);

  const activeArt = filteredArtworks[activeArtIndex] || filteredArtworks[0] || ARTWORKS_DATA[0];
  const featuredHeroArt = ARTWORKS_DATA[0]; // La Tahzan Calligraphy

  const isBn = locale === 'bn';
  const baseUrl = 'https://artora.framempire.com';
  const pageUrl = `${baseUrl}/${locale}`;

  // Structured Data (JSON-LD): ArtGallery & LocalBusiness Schema
  const gallerySchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ArtGallery',
        '@id': `${baseUrl}/#gallery`,
        name: 'Artora by FramEmpire',
        alternateName: 'Artora Fine Art Studio by Fiha Islam',
        url: baseUrl,
        logo: `${baseUrl}/images/artora-logo.png`,
        image: `${baseUrl}/images/hero-calligraphy.png`,
        description:
          'Studio specializing in handcrafted 3D Arabic calligraphy, heavy impasto acrylic paintings, and luxury wall art by fine artist Fiha Islam in Dhaka, Bangladesh.',
        telephone: '+8801723722019',
        priceRange: '৳৳৳',
        currenciesAccepted: 'BDT, USD',
        paymentAccepted: 'Cash on Delivery, Direct Discussion, Bank Transfer',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Kutubpur, Fatullah',
          addressLocality: 'Narayanganj',
          addressRegion: 'Dhaka',
          postalCode: '1420',
          addressCountry: 'BD',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '23.6333',
          longitude: '90.5000',
        },
        founder: {
          '@type': 'Person',
          name: 'Fiha Islam',
          jobTitle: 'Fine Artist & Master Calligrapher',
          sameAs: ['https://www.facebook.com/Artora.FramEmpire/'],
        },
        sameAs: [
          'https://www.facebook.com/Artora.FramEmpire/',
          'https://www.artora.framempire.com',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: 'Artora by FramEmpire',
        alternateName: [
          'Artora',
          'Artora by FramEmpire (Fiha Islam)',
          'Artora Fine Art Studio',
          'Artora Studio',
        ],
        publisher: {
          '@type': 'Organization',
          name: 'FramEmpire',
          url: 'https://framempire.com',
          logo: `${baseUrl}/icon.png`,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gallerySchema) }}
      />

      <div className="relative min-h-screen overflow-hidden">
        {/* ===================== HERO SECTION: 2-COLUMN LUXURY SPOTLIGHT ===================== */}
        <section className="relative min-h-[90vh] flex items-center justify-center pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8">
          {/* Polished crimson-black gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D0004] via-[#2B020A]/70 to-[#0D0004] pointer-events-none" />

          {/* Geometric Soft Neon Glows */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[350px] bg-gradient-to-tr from-[#E60049]/20 via-[#2B020A] to-[#FFB0C1]/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[400px] bg-gradient-to-bl from-[#E6B93F]/15 via-[#2B020A] to-transparent rounded-full blur-[130px] pointer-events-none" />
          <div className="absolute top-12 left-8 w-24 h-24 border-l border-t border-[#E60049]/25 pointer-events-none hidden md:block" />
          <div className="absolute top-12 right-8 w-24 h-24 border-r border-t border-[#E60049]/25 pointer-events-none hidden md:block" />

          <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* LEFT COLUMN: Brand, Typography & CTAs */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">
              {/* Futuristic Animated Badge */}
              <div className="relative inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-void-card/90 border border-[#E60049]/40 shadow-neon-crimson backdrop-blur-xl overflow-hidden group cursor-default">
                <div className="relative flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-[#E60049] opacity-75" />
                  <Sparkles className="w-3.5 h-3.5 text-[#FFB0C1]" />
                </div>

                <span className="text-[10px] sm:text-xs font-mono font-bold text-white uppercase tracking-widest">
                  {isBn
                    ? '১০০% হাতে আঁকা অরিজিনাল ফাইন আর্ট'
                    : '100% Handcrafted Studio Originals'}
                </span>

                <span className="w-1.5 h-1.5 rounded-full bg-[#E6B93F] animate-pulse" />
              </div>

              {/* Exactly ONE <h1> Heading */}
              <div className="space-y-4 w-full flex flex-col items-center lg:items-start">
                <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-[42px] xl:text-[46px] text-white tracking-tight leading-[1.3] max-w-xl">
                  {isBn ? (
                    <>
                      পবিত্র আরবি ক্যালিগ্রাফি ও{' '}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB0C1] via-[#E60049] to-gold">
                        টেক্সচার্ড ইম্পাস্তো ক্যানভাস আর্ট
                      </span>
                    </>
                  ) : (
                    <>
                      Sacred Arabic Calligraphy &{' '}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB0C1] via-[#E60049] to-gold">
                        Textured Impasto Canvas Art
                      </span>
                    </>
                  )}
                </h1>
              </div>

              {/* Sub-headline description with keyword integration */}
              <p className="text-sm sm:text-base text-white/70 max-w-xl font-light leading-relaxed">
                {isBn
                  ? 'বাংলাদেশে ইসলামিক ওয়াল আর্ট, স্বহস্তে নির্মিত কাস্টম ক্যালিগ্রাফি ক্যানভাস এবং ফাইন আর্টিস্ট ফিহা ইসলামের ভালোবাসায় আঁকা হেভি ইম্পাস্তো অ্যাক্রিলিক পেইন্টিং।'
                  : 'Islamic wall art in Bangladesh, bespoke handcrafted calligraphy canvases, and heavy impasto acrylic paintings created with passion by fine artist Fiha Islam.'}
              </p>

              {/* Primary Action Buttons (2 Buttons with thumb-friendly touch targets) */}
              <div className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 w-full sm:w-auto pt-2">
                <Link href="/shop" className="w-full sm:w-auto">
                  <MagneticButton variant="gold" className="w-full sm:w-auto py-3.5 sm:py-4 px-7 text-sm font-bold min-h-[48px]">
                    <span>{isBn ? 'কালেকশন দেখুন' : 'Explore Collection'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </MagneticButton>
                </Link>

                <a
                  href="https://wa.me/8801723722019?text=Hello%20Fiha%20Islam%2C%20I%20am%20interested%20in%20your%20custom%20canvas%20artwork."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 rounded-full text-sm font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-xl shadow-lg transition-all min-h-[48px]"
                >
                  <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  <span>{isBn ? 'হোয়াটসঅ্যাপে কথা বলুন' : 'Chat on WhatsApp'}</span>
                </a>
              </div>

              {/* Micro Trust Indicators */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-glass-border w-full max-w-lg text-[11px] sm:text-xs text-white/60">
                <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold shrink-0" />
                  <span>{isBn ? '১০০% অরিজিনাল' : '100% Original'}</span>
                </div>
                <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                  <Award className="w-3.5 h-3.5 text-[#E60049] shrink-0" />
                  <span>{isBn ? 'প্রামাণ্য সনদসহ' : 'Signed Artwork'}</span>
                </div>
                <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{isBn ? 'স্টেডফাস্ট ডেলিভারি' : 'Safe Delivery'}</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Official Studio Video Presentation (Vimeo High-Definition Stream) */}
            <div className="lg:col-span-6 flex justify-center w-full max-w-lg sm:max-w-xl mx-auto lg:max-w-none">
              <div className="relative w-full group">
                {/* Outer Ambient Glow */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-[#E60049]/40 via-[#2B020A] to-[#E6B93F]/30 rounded-3xl blur-xl opacity-80 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Video Card Container */}
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#1A030A] border border-[#E60049]/40 shadow-2xl p-3 sm:p-4 backdrop-blur-xl space-y-3">
                  {/* Header Bar Above Video */}
                  <div className="flex items-center justify-between px-1">
                    <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold bg-[#E60049] text-white shadow-neon-crimson flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                      {isBn ? '🎬 স্টুডিও উপস্থাপনা' : '🎬 Studio 3D Presentation'}
                    </span>
                    <Link
                      href="/shop"
                      className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/25 text-white hover:border-[#FFB0C1] transition-all flex items-center gap-1 shadow-sm"
                    >
                      <Eye className="w-3 h-3 text-[#FFB0C1]" /> {isBn ? 'সকল আর্ট' : 'Explore Gallery'}
                    </Link>
                  </div>

                  {/* High-Definition Vimeo Video Player Container */}
                  <div className="relative w-full aspect-[16/9] rounded-xl sm:rounded-2xl overflow-hidden bg-void-light border border-white/10 shadow-inner">
                    <iframe
                      src="https://player.vimeo.com/video/1225932303?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1&background=0"
                      className="absolute top-0 left-0 w-full h-full border-0"
                      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      title="Artora Studio 3D Presentation by Fiha Islam"
                    />
                  </div>

                  {/* Video Details Placed Cleanly BELOW */}
                  <div className="p-3.5 rounded-xl bg-void-card/90 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h2 className="font-display font-bold text-sm sm:text-base text-white">
                        {isBn ? 'আর্টোরা এক্সক্লুসিভ ক্যালিগ্রাফি ও ইম্পাস্তো ক্যানভাস' : 'Artora Exclusive Calligraphy & Impasto Studio'}
                      </h2>
                      <p className="text-[11px] text-[#FFB0C1] font-mono flex items-center gap-1.5 mt-0.5">
                        <span>{isBn ? 'শিল্পী ফিহা ইসলাম' : 'Fine Artist Fiha Islam'}</span>
                        <span className="text-white/30">•</span>
                        <span>Artora by FramEmpire</span>
                      </p>
                    </div>

                    <Link href="/commission">
                      <button className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#E60049] to-[#2B020A] hover:opacity-95 text-white border border-[#E60049]/40 transition-all flex items-center gap-1.5 shadow-neon-crimson cursor-pointer min-h-[40px] shrink-0">
                        <Sparkles className="w-3.5 h-3.5 text-gold" />
                        <span>{isBn ? 'কাস্টম অর্ডার' : 'Order Commission'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ===================== ULTRA-MODERN CINEMATIC EXHIBITION GALLERY ===================== */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#E60049] text-xs font-mono font-bold uppercase tracking-widest">
                <Layers className="w-4 h-4" />
                <span>{isBn ? 'কিউরেটেড প্রদর্শনী' : 'Exhibition Spotlight'}</span>
              </div>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
                {tFeatured('title')}
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-2 lg:pb-0 scrollbar-none snap-x p-1.5 rounded-2xl bg-void-card border border-glass-border backdrop-blur-xl">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setActiveArtIndex(0);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 snap-start transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#E60049] to-[#2B020A] text-white shadow-neon-crimson border border-[#E60049]/50'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {isBn ? cat.labelBn : cat.labelEn}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Exhibition Showcase Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Main Cinematic Stage Canvas (8 Cols) */}
            <div className="lg:col-span-8 rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#1A030A]/90 to-void-card border border-glass-border shadow-2xl relative overflow-hidden flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeArt.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  {/* 100% Unobstructed Artwork Display Container */}
                  <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-void-light border border-white/10 group shadow-inner">
                    <Image
                      src={activeArt.primaryImage}
                      alt={`${activeArt.title} Original Painting Canvas by Fiha Islam - Artora Studio`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 850px"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Top Floating Badges */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-black/75 backdrop-blur-md text-white border border-white/15">
                        {isBn ? activeArt.mediumBn.split(' ')[0] : activeArt.medium.split(' ')[0]}
                      </span>
                      {activeArt.discountPercent && (
                        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#E60049] text-white shadow-neon-crimson animate-pulse">
                          🔥 {activeArt.discountPercent}% OFF
                        </span>
                      )}
                      {activeArt.isSold ? (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#E60049] text-white">
                          {tFeatured('sold')}
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/80 text-white backdrop-blur-md">
                          {tFeatured('available')}
                        </span>
                      )}
                    </div>

                    <div className="absolute top-4 right-4">
                      <Link
                        href={`/art/${activeArt.slug}`}
                        className="px-3.5 py-1.5 rounded-full text-xs font-mono bg-[#E60049]/30 border border-[#E60049] text-[#FFB0C1] backdrop-blur-md flex items-center gap-1.5 hover:bg-[#E60049] hover:text-white transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#FFB0C1]" /> {isBn ? 'বিস্তারিত দেখুন' : 'View Details'}
                      </Link>
                    </div>
                  </div>

                  {/* Artwork Title, Specs & Color Palette Placed BELOW Image */}
                  <div className="flex items-center justify-between gap-4 pt-1">
                    <div>
                      <span className="text-[11px] font-mono text-[#FFB0C1] uppercase tracking-wider block">
                        {isBn ? activeArt.canvasSizeBn : activeArt.canvasSize}
                      </span>
                      <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
                        {isBn ? activeArt.titleBn : activeArt.title}
                      </h3>
                    </div>

                    {/* Color Palette Dots */}
                    <div className="hidden sm:flex items-center gap-1.5 p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                      {activeArt.colorPalette.map((color, i) => (
                        <span
                          key={i}
                          className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Description & Action Footer */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1 border-t border-white/10">
                    <p className="text-xs sm:text-sm text-white/70 max-w-xl font-light leading-relaxed line-clamp-2">
                      {isBn ? activeArt.descriptionBn : activeArt.description}
                    </p>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        {activeArt.discountPercent && activeArt.originalPriceBDT && (
                          <div className="flex items-center justify-end gap-1.5">
                            <span className="text-xs text-white/40 line-through font-mono">
                              ৳{activeArt.originalPriceBDT.toLocaleString()}
                            </span>
                            <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded bg-[#E60049]/20 text-[#FFB0C1] border border-[#E60049]/40">
                              {activeArt.discountPercent}% OFF
                            </span>
                          </div>
                        )}
                        <span className="text-2xl font-display font-black text-[#E60049] font-mono">
                          ৳{activeArt.priceBDT.toLocaleString()}
                        </span>
                      </div>

                      <button
                        onClick={() => addItem(activeArt)}
                        className="p-3.5 rounded-2xl bg-white/10 hover:bg-[#E60049] text-white border border-glass-border transition-all cursor-pointer min-h-[48px] min-w-[48px] flex items-center justify-center"
                        title="Add to Inquiry Cart"
                      >
                        <ShoppingBag className="w-5 h-5" />
                      </button>

                      <Link href={`/art/${activeArt.slug}`}>
                        <MagneticButton variant="gold" className="text-xs py-3.5 px-5 min-h-[48px]">
                          <span>{tFeatured('viewDetails')}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </MagneticButton>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Curator's Artwork Deck / Thumbnails (4 Cols) */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-white/50 flex items-center justify-between px-1">
                <span>{isBn ? 'সকল শিল্পকর্ম' : 'Collection Pieces'} ({filteredArtworks.length})</span>
                <Link href="/shop" className="text-[#FFB0C1] hover:underline flex items-center gap-1">
                  {isBn ? 'সব দেখুন' : 'View All'} <ChevronRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="space-y-3 overflow-y-auto max-h-[500px] pr-1">
                {filteredArtworks.map((art, idx) => {
                  const isSelected = activeArt.id === art.id;
                  return (
                    <div
                      key={art.id}
                      onClick={() => setActiveArtIndex(idx)}
                      className={`p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center gap-3.5 group ${
                        isSelected
                          ? 'bg-[#E60049]/15 border-[#E60049] shadow-neon-crimson'
                          : 'bg-void-card/80 border-glass-border hover:border-white/20'
                      }`}
                    >
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-void-light shrink-0">
                        <Image
                          src={art.primaryImage}
                          alt={`${art.title} Thumbnail`}
                          fill
                          sizes="80px"
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {art.discountPercent && (
                          <div className="absolute top-0.5 right-0.5 px-1 py-0.5 rounded bg-[#E60049] text-white text-[8px] font-bold font-mono">
                            -{art.discountPercent}%
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-display font-bold text-sm text-white truncate group-hover:text-[#FFB0C1] transition-colors">
                          {isBn ? art.titleBn : art.title}
                        </h4>
                        <p className="text-[11px] text-white/50 truncate">
                          {isBn ? art.canvasSizeBn : art.canvasSize}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-mono font-bold text-[#E60049]">
                            ৳{art.priceBDT.toLocaleString()}
                          </span>
                          {art.discountPercent && (
                            <span className="text-[10px] text-white/40 line-through font-mono">
                              ৳{art.originalPriceBDT?.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ===================== ABOUT THE ARTIST • FIHA ISLAM SECTION ===================== */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
          <div className="rounded-3xl p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-[#1A030A]/90 via-void-card to-void border border-glass-border shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              {/* Left: Artist Photo with Luxury Frame */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative group w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden p-2 bg-gradient-to-tr from-[#E60049]/40 via-[#2B020A] to-[#FFB0C1]/30 shadow-neon-crimson border border-[#E60049]/30">
                  <div className="w-full h-full rounded-xl overflow-hidden relative">
                    <Image
                      src="/images/fiha-islam.png"
                      alt="Fine Artist Fiha Islam - Founder & Master Calligrapher at Artora Studio Dhaka"
                      fill
                      sizes="(max-width: 768px) 90vw, 450px"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-between">
                      <div>
                        <h3 className="font-display font-bold text-sm text-white">Fiha Islam</h3>
                        <p className="text-[10px] text-[#FFB0C1] font-mono">
                          {isBn ? 'প্রতিষ্ঠাতা ও শিল্পী, Artora' : 'Founder & Lead Fine Artist, Artora'}
                        </p>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Artist Story & Biography */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-gold uppercase tracking-widest font-mono flex items-center gap-2">
                    <Star className="w-3.5 h-3.5 fill-gold" />
                    {tAbout('subtitle')}
                  </span>
                  <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
                    {tAbout('title')}
                  </h2>
                </div>

                <div className="space-y-4 text-sm sm:text-base text-white/75 font-light leading-relaxed">
                  <p>{tAbout('bio1')}</p>
                  <p className="text-white/60 text-xs sm:text-sm">{tAbout('bio2')}</p>
                </div>

                {/* Core Attributes */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-void-card border border-glass-border">
                    <span className="text-xl font-display font-black text-white block">100%</span>
                    <span className="text-[11px] text-white/50">{tAbout('experience')}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-void-card border border-glass-border">
                    <span className="text-xl font-display font-black text-[#FFB0C1] block">Bespoke</span>
                    <span className="text-[11px] text-white/50">{tAbout('customCommissions')}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-void-card border border-glass-border col-span-2 sm:col-span-1">
                    <span className="text-xl font-display font-black text-gold block">Nationwide</span>
                    <span className="text-[11px] text-white/50">{tAbout('artworksDelivered')}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link href="/commission">
                    <MagneticButton variant="gold" className="text-xs py-3.5 px-6 min-h-[44px]">
                      <Palette className="w-3.5 h-3.5" />
                      <span>{tAbout('viewBio')}</span>
                    </MagneticButton>
                  </Link>

                  <a
                    href="https://wa.me/8801723722019"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-xl transition-all flex items-center gap-2 min-h-[44px]"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>{isBn ? 'স্টুডিও চ্যাট' : 'Direct Studio Chat'}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== COLLECTOR TESTIMONIALS (RESPONSIVE SLIDER & LUXURY CARDS) ===================== */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-3">
            <span className="text-xs font-bold text-gold uppercase tracking-widest font-mono">
              {tTestimonials('subtitle')}
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white">
              {tTestimonials('title')}
            </h2>
          </div>

          {/* Review Cards: Horizontal Snap Slider on Mobile, 3-Col Grid on Desktop */}
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 snap-x snap-mandatory scrollbar-none">
            {TESTIMONIALS_DATA.map((item, idx) => (
              <div
                key={item.id}
                className={`w-[85vw] sm:w-[420px] md:w-auto shrink-0 snap-center p-5 sm:p-6 rounded-3xl bg-void-card/95 border transition-all duration-500 flex flex-col justify-between space-y-5 backdrop-blur-2xl relative overflow-hidden group shadow-xl ${
                  item.isFacebookEmbed
                    ? 'border-[#E60049]/40 hover:border-[#E60049] shadow-neon-crimson/20'
                    : 'border-glass-border hover:border-white/30'
                }`}
              >
                {/* Ambient Subtle Glow */}
                <div
                  className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl pointer-events-none ${
                    item.isFacebookEmbed ? 'bg-[#E60049]/15' : 'bg-gold/10'
                  }`}
                />

                <div className="space-y-4 relative z-10">
                  {/* Header: Author & Verified Badges */}
                  <div className="flex items-center justify-between gap-3 pb-3 border-b border-glass-border">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#E60049] to-gold p-0.5 shadow-sm shrink-0">
                        <div className="w-full h-full rounded-full bg-void-card flex items-center justify-center text-white font-bold font-display text-sm">
                          {item.author.charAt(0)}
                        </div>
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-display font-bold text-sm sm:text-base text-white truncate flex items-center gap-1.5">
                          <span className="truncate">{isBn ? item.authorBn : item.author}</span>
                          {item.isFacebookEmbed && (
                            <span className="p-0.5 rounded-full bg-[#1877F2]/20 text-[#1877F2] shrink-0">
                              <Facebook className="w-3 h-3" />
                            </span>
                          )}
                        </h3>
                        <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1 truncate">
                          <CheckCircle2 className="w-3 h-3 shrink-0" />
                          <span className="truncate">{isBn ? item.locationBn : item.location}</span>
                        </span>
                      </div>
                    </div>

                    {/* 5-Star Rating */}
                    <div className="flex items-center gap-0.5 bg-void/70 px-2.5 py-1 rounded-full border border-glass-border shrink-0">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-gold fill-gold" />
                      ))}
                    </div>
                  </div>

                  {/* Review Content */}
                  {item.isFacebookEmbed && item.facebookEmbedUrl ? (
                    <div className="w-full rounded-2xl overflow-hidden bg-white/[0.02] border border-glass-border p-2 flex justify-center">
                      <iframe
                        src={item.facebookEmbedUrl}
                        width="100%"
                        height="160"
                        style={{ border: 'none', overflow: 'hidden' }}
                        scrolling="no"
                        frameBorder="0"
                        allowFullScreen={true}
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        className="w-full max-w-[340px] rounded-xl"
                        title={`Artora Facebook Customer Review by ${item.author}`}
                      />
                    </div>
                  ) : (
                    <div className="space-y-2 py-2">
                      <Quote className="w-6 h-6 text-gold/40" />
                      <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                        {isBn ? item.reviewBn : item.review}
                      </p>
                    </div>
                  )}

                </div>

                {/* Footer Action */}
                <div className="pt-3 border-t border-glass-border flex items-center justify-between gap-2 relative z-10">
                  <div className="flex items-center gap-1.5 text-[11px] text-white/60">
                    <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                    <span>{tTestimonials('verified')}</span>
                  </div>

                  {item.facebookPostUrl ? (
                    <a
                      href={item.facebookPostUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-[#E60049]/15 hover:bg-[#E60049]/30 text-[#FFB0C1] border border-[#E60049]/30 backdrop-blur-md transition-all flex items-center gap-1"
                    >
                      <span>{isBn ? 'ফেসবুক পোস্ট' : 'View Post'}</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  ) : (
                    <span className="text-[10px] font-mono text-white/40 uppercase">
                      Artora Collector
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Swipe / Drag Hint Indicator */}
          <div className="flex md:hidden items-center justify-center gap-1.5 mt-3 text-[11px] text-white/40 font-mono">
            <span>← Swipe for more collector reviews →</span>
          </div>

          {/* Bottom Community Link */}
          <div className="mt-8 sm:mt-10 flex justify-center">
            <a
              href="https://www.facebook.com/Artora.FramEmpire/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full text-xs font-semibold bg-void-card hover:bg-white/10 text-white/90 hover:text-white border border-glass-border transition-all flex items-center gap-2 shadow-lg hover:border-[#FFB0C1]"
            >
              <Facebook className="w-4 h-4 text-[#1877F2]" />
              <span>{isBn ? 'আমাদের ফেসবুক পেজ ও সকল রিভিউ দেখুন' : 'Explore All Community Reviews on Facebook'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>
      </div>
    </>
  );
}


