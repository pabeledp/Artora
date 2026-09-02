'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { ARTWORKS_DATA, TESTIMONIALS_DATA } from '@/lib/art-data';
import { useCurrency } from '@/lib/currency';
import { useCart } from '@/lib/cart';
import { motion, AnimatePresence } from 'framer-motion';

const AcrylicCanvasViewer = dynamic(
  () => import('@/components/3d/AcrylicCanvasViewer').then((mod) => mod.AcrylicCanvasViewer),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[360px] sm:h-[460px] rounded-2xl bg-void-card border border-glass-border flex items-center justify-center text-xs text-gold/60 animate-pulse">
        🎨 Loading 3D Canvas Impasto Studio...
      </div>
    ),
  }
);

import {
  Sparkles,
  ArrowRight,
  Palette,
  Eye,
  Star,
  ShieldCheck,
  Zap,
  ShoppingBag,
  Layers,
  ChevronRight,
  MessageSquare,
  Award,
  CheckCircle2,
} from 'lucide-react';

export default function HomePage() {
  const tHero = useTranslations('hero');
  const tFeatured = useTranslations('featured');
  const tAbout = useTranslations('aboutArtist');
  const tTexture = useTranslations('texture3D');
  const tTestimonials = useTranslations('testimonials');
  const locale = useLocale();
  const { formatPrice } = useCurrency();
  const { addItem } = useCart();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeArtIndex, setActiveArtIndex] = useState<number>(0);

  const categories = [
    { id: 'all', labelBn: 'সকল মাস্টারপিস', labelEn: 'All Masterpieces' },
    { id: 'acrylic', labelBn: 'অ্যাক্রিলিক ইম্পাস্তো', labelEn: 'Acrylic Impasto' },
    { id: 'original', labelBn: 'আরবি ক্যালিগ্রাফি ও লার্জ ক্যানভাস', labelEn: 'Calligraphy & Canvas' },
    { id: 'textile', labelBn: 'হ্যান্ড-পেইন্টেড সিল্ক', labelEn: 'Wearable Silk' },
  ];

  const filteredArtworks = selectedCategory === 'all'
    ? ARTWORKS_DATA
    : ARTWORKS_DATA.filter((art) => art.category === selectedCategory);

  const activeArt = filteredArtworks[activeArtIndex] || filteredArtworks[0] || ARTWORKS_DATA[0];
  const featuredHeroArt = ARTWORKS_DATA[0]; // La Tahzan Calligraphy

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* ===================== HERO SECTION: 2-COLUMN LUXURY SPOTLIGHT ===================== */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Polished crimson-black gradient background (Hero only) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0004] via-[#2B020A]/70 to-[#0D0004] pointer-events-none" />
        
        {/* Geometric Soft Neon Glows & Metallic Magenta-Red Accents */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[350px] bg-gradient-to-tr from-[#E60049]/20 via-[#2B020A] to-[#FFB0C1]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[400px] bg-gradient-to-bl from-[#E6B93F]/15 via-[#2B020A] to-transparent rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute top-12 left-8 w-24 h-24 border-l border-t border-[#E60049]/25 pointer-events-none hidden md:block" />
        <div className="absolute top-12 right-8 w-24 h-24 border-r border-t border-[#E60049]/25 pointer-events-none hidden md:block" />

        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* LEFT COLUMN: Brand, Typography & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-void-card border border-crimson/30 shadow-neon-crimson backdrop-blur-xl">
              <Sparkles className="w-3.5 h-3.5 text-[#E60049]" />
              <span className="text-[11px] sm:text-xs font-semibold text-white/90 uppercase tracking-widest">
                {locale === 'bn' ? '১০০% হাতে আঁকা অরিজিনাল ফাইন আর্ট' : '100% Handcrafted Studio Originals'}
              </span>
            </div>

            {/* Brand Logo & Headline */}
            <div className="space-y-3">
              <div className="relative h-14 sm:h-16 md:h-20 w-52 sm:w-64 md:w-80 flex items-center">
                <img
                  src="/images/artora-logo.png"
                  alt="Artora"
                  className="h-full w-auto object-contain mix-blend-screen brightness-125 drop-shadow-[0_0_35px_rgba(255,176,193,0.45)]"
                />
              </div>

              <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white leading-tight tracking-tight">
                {locale === 'bn' ? (
                  <>
                    ক্যানভাসে জীবন্ত শিল্পের <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB0C1] via-white to-gold">আত্মিক প্রশান্তি</span>
                  </>
                ) : (
                  <>
                    Where Tactile Texture Meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB0C1] via-white to-gold">Sacred Soul</span>
                  </>
                )}
              </h1>

              <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed max-w-xl">
                {locale === 'bn'
                  ? 'শিল্পী ফিহা ইসলামের তুলিতে পবিত্র আরবি ক্যালিগ্রাফি, হেভি ইম্পাস্তো অ্যাক্রিলিক ও কাস্টম ক্যানভাস মাস্টারপিস।'
                  : 'Sacred Arabic calligraphy, textured acrylic impasto, and bespoke collector canvases handcrafted by fine artist Fiha Islam.'}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link href="/shop">
                <MagneticButton variant="primary" className="text-xs sm:text-sm py-3.5 px-6 sm:px-7">
                  <span>{locale === 'bn' ? 'কালেকশন দেখুন' : 'Explore Gallery'}</span>
                  <ArrowRight className="w-4 h-4" />
                </MagneticButton>
              </Link>

              <Link href="/commission">
                <MagneticButton variant="gold" className="text-xs sm:text-sm py-3.5 px-6 sm:px-7">
                  <Palette className="w-4 h-4" />
                  <span>{locale === 'bn' ? 'কাস্টম অর্ডার' : 'Bespoke Order'}</span>
                </MagneticButton>
              </Link>

              <a
                href="https://wa.me/8801723722019"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-[#25D366] text-white hover:text-black border border-glass-border transition-all"
                title="WhatsApp Direct Consultation"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
            </div>

            {/* Trust Highlights */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-4 border-t border-white/10 text-[11px] text-white/60">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>5+ Years Studio</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#E60049] shrink-0" />
                <span>Original Signed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Safe Delivery</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Featured Calligraphy Masterpiece Stage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-6 flex justify-center"
          >
            <div className="relative w-full max-w-lg group">
              {/* Outer Luxury Ambient Glow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#E60049]/40 via-[#2B020A] to-[#E6B93F]/30 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Canvas Card Container */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#1A030A] border border-[#E60049]/40 shadow-2xl p-3 sm:p-4 backdrop-blur-xl">
                {/* Image Display */}
                <div className="relative aspect-[16/10] sm:aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden bg-void-light border border-white/10 group-hover:scale-[1.01] transition-transform duration-500">
                  <img
                    src={featuredHeroArt.primaryImage}
                    alt={featuredHeroArt.title}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

                  {/* Floating Top Tag */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold bg-[#E60049] text-white shadow-neon-crimson">
                      {locale === 'bn' ? '🌟 বিশেষ প্রদর্শনী' : '🌟 Featured Masterpiece'}
                    </span>
                  </div>

                  {/* Floating 3D Link */}
                  <div className="absolute top-3 right-3">
                    <Link
                      href={`/art/${featuredHeroArt.slug}`}
                      className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono bg-black/70 backdrop-blur-md border border-gold/40 text-gold hover:bg-gold hover:text-black transition-all flex items-center gap-1"
                    >
                      <Zap className="w-3 h-3" /> 3D View
                    </Link>
                  </div>

                  {/* Artwork Plaque on Image Bottom */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/75 backdrop-blur-md border border-white/15 flex items-center justify-between">
                    <div>
                      <h3 className="font-display font-bold text-sm sm:text-base text-white truncate">
                        {locale === 'bn' ? featuredHeroArt.titleBn : featuredHeroArt.title}
                      </h3>
                      <p className="text-[10px] sm:text-[11px] text-[#FFB0C1] font-mono">
                        {locale === 'bn' ? featuredHeroArt.canvasSizeBn : featuredHeroArt.canvasSize} • Fiha Islam
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Link href={`/art/${featuredHeroArt.slug}`}>
                        <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gold text-black hover:bg-amber-400 transition-colors flex items-center gap-1">
                          <span>{locale === 'bn' ? 'দেখুন' : 'View'}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===================== ULTRA-MODERN CINEMATIC EXHIBITION GALLERY ===================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#E60049] text-xs font-mono font-bold uppercase tracking-widest">
              <Layers className="w-4 h-4" />
              <span>Exhibition Spotlight • কিউরেটেড গ্যালারি</span>
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
                  {locale === 'bn' ? cat.labelBn : cat.labelEn}
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
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {/* Artwork Display Container */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-void-light border border-white/10 group shadow-inner">
                  <img
                    src={activeArt.primaryImage}
                    alt={activeArt.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70" />

                  {/* Top Floating Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-black/70 backdrop-blur-md text-white border border-white/15">
                      {locale === 'bn' ? activeArt.mediumBn.split(' ')[0] : activeArt.medium.split(' ')[0]}
                    </span>
                    {activeArt.isSold ? (
                      <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#E60049] text-white">
                        {tFeatured('sold')}
                      </span>
                    ) : (
                      <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/80 text-white backdrop-blur-md">
                        {tFeatured('available')}
                      </span>
                    )}
                  </div>

                  <div className="absolute top-4 right-4">
                    <Link
                      href={`/art/${activeArt.slug}`}
                      className="px-3.5 py-1.5 rounded-full text-xs font-mono bg-[#E60049]/30 border border-[#E60049] text-[#FFB0C1] backdrop-blur-md flex items-center gap-1.5 hover:bg-[#E60049] hover:text-white transition-colors"
                    >
                      <Zap className="w-3.5 h-3.5 text-[#FFB0C1]" /> 3D Impasto Mode
                    </Link>
                  </div>

                  {/* Bottom Quick Info inside Canvas */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <span className="text-[11px] font-mono text-[#FFB0C1] uppercase tracking-wider block">
                        {locale === 'bn' ? activeArt.canvasSizeBn : activeArt.canvasSize}
                      </span>
                      <h3 className="font-display font-black text-2xl sm:text-3xl text-white drop-shadow-md">
                        {locale === 'bn' ? activeArt.titleBn : activeArt.title}
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
                </div>

                {/* Description & Action Footer */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <p className="text-xs sm:text-sm text-white/70 max-w-xl font-light leading-relaxed line-clamp-2">
                    {locale === 'bn' ? activeArt.descriptionBn : activeArt.description}
                  </p>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <span className="text-[10px] text-white/40 uppercase tracking-widest block font-mono">
                        Price / মূল্য
                      </span>
                      <span className="text-2xl font-display font-black text-[#E60049]">
                        {formatPrice(activeArt.priceBDT, activeArt.priceUSD)}
                      </span>
                    </div>

                    <button
                      onClick={() => addItem(activeArt)}
                      className="p-3.5 rounded-2xl bg-white/10 hover:bg-[#E60049] text-white border border-glass-border transition-all"
                      title="Add to Inquiry Cart"
                    >
                      <ShoppingBag className="w-5 h-5" />
                    </button>

                    <Link href={`/art/${activeArt.slug}`}>
                      <MagneticButton variant="gold" className="text-xs py-3 px-5">
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
              <span>Collection Pieces ({filteredArtworks.length})</span>
              <Link href="/shop" className="text-[#FFB0C1] hover:underline flex items-center gap-1">
                View All <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Responsive Deck: Horizontal swipe on mobile, vertical stack on desktop */}
            <div className="flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto max-h-[550px] pb-2 lg:pb-0 pr-1 snap-x scrollbar-thin">
              {filteredArtworks.map((art, idx) => {
                const isSelected = activeArt.id === art.id;
                return (
                  <motion.div
                    key={art.id}
                    onClick={() => setActiveArtIndex(idx)}
                    whileHover={{ x: 4 }}
                    className={`p-3 rounded-2xl cursor-pointer transition-all duration-300 flex items-center gap-3.5 border min-w-[240px] sm:min-w-[280px] lg:min-w-0 snap-start shrink-0 lg:shrink ${
                      isSelected
                        ? 'bg-[#2B020A]/90 border-[#E60049] shadow-neon-crimson'
                        : 'bg-void-card border-glass-border hover:border-white/20 hover:bg-white/5'
                    }`}
                  >
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-void-light border border-white/10">
                      <img
                        src={art.primaryImage}
                        alt={art.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-[#E60049]/20 flex items-center justify-center">
                          <Eye className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className={`text-xs sm:text-sm font-bold truncate transition-colors ${
                        isSelected ? 'text-[#FFB0C1]' : 'text-white'
                      }`}>
                        {locale === 'bn' ? art.titleBn : art.title}
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-white/50 truncate mt-0.5">
                        {locale === 'bn' ? art.canvasSizeBn : art.canvasSize}
                      </p>
                      <span className="text-xs font-mono font-bold text-gold block mt-1">
                        {formatPrice(art.priceBDT, art.priceUSD)}
                      </span>
                    </div>

                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-[#E60049] shadow-neon-crimson shrink-0 hidden lg:block" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== ABOUT THE ARTIST • FIHA ISLAM SECTION ===================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="rounded-3xl p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-[#1A030A]/90 via-void-card to-void border border-glass-border shadow-2xl relative overflow-hidden">
          {/* Ambient Lighting Accents */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#E60049]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FFB0C1]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Left: Artist Photo with Luxury Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="relative group w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden p-2 bg-gradient-to-tr from-[#E60049]/40 via-[#2B020A] to-[#FFB0C1]/30 shadow-neon-crimson border border-[#E60049]/30">
                <div className="w-full h-full rounded-xl overflow-hidden relative">
                  <img
                    src="/images/fiha-islam.png"
                    alt="Fiha Islam - Artist & Founder"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                  
                  {/* Floating Plaque on Photo */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-center">
                    <h4 className="font-display font-bold text-sm text-white">
                      Fiha Islam (ফিহা ইসলাম)
                    </h4>
                    <p className="text-[11px] text-[#FFB0C1] font-mono">
                      Lead Artist & Founder, Artora
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Artist Bio & Vision Narrative */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#E60049]/15 border border-[#E60049]/40 text-[#FFB0C1] backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-[#E60049]" />
                  <span>{tAbout('badge')}</span>
                </div>
                <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
                  {tAbout('title')}
                </h2>
                <p className="text-xs font-mono text-[#E60049] tracking-wider uppercase">
                  {tAbout('role')}
                </p>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-white/75 leading-relaxed font-light">
                <p>{tAbout('bio1')}</p>
                <p>{tAbout('bio2')}</p>
              </div>

              {/* Quick Metrics Badges */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-black/40 border border-glass-border text-center">
                  <span className="font-display font-black text-lg sm:text-xl text-[#FFB0C1] block">
                    5+
                  </span>
                  <span className="text-[10px] text-white/50 uppercase tracking-wider block mt-0.5">
                    {tAbout('experience')}
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-black/40 border border-glass-border text-center">
                  <span className="font-display font-black text-lg sm:text-xl text-[#E60049] block">
                    300+
                  </span>
                  <span className="text-[10px] text-white/50 uppercase tracking-wider block mt-0.5">
                    {tAbout('artworksDelivered')}
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-black/40 border border-glass-border text-center">
                  <span className="font-display font-black text-lg sm:text-xl text-gold block">
                    100%
                  </span>
                  <span className="text-[10px] text-white/50 uppercase tracking-wider block mt-0.5">
                    {tAbout('customCommissions')}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link href="/commission">
                  <MagneticButton variant="gold" className="text-sm py-3.5 px-7">
                    <Palette className="w-4 h-4" />
                    <span>{tAbout('viewBio')}</span>
                  </MagneticButton>
                </Link>
                <span className="text-xs text-white/40 italic font-mono">
                  {tAbout('signature')}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===================== 3D ACRYLIC TEXTURE VIEWER SHOWCASE ===================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="rounded-3xl p-8 lg:p-12 bg-gradient-to-br from-void-card via-void-light to-void-card border border-glass-border shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#E60049]/20 border border-[#E60049]/40 text-[#FFB0C1]">
                <Zap className="w-3.5 h-3.5 text-gold" />
                <span>{tTexture('badge')}</span>
              </div>

              <h2 className="font-display font-black text-3xl sm:text-4xl text-white leading-tight">
                {tTexture('title')}
              </h2>

              <p className="text-sm text-white/70 leading-relaxed">
                {tTexture('description')}
              </p>

              <div className="space-y-3 text-xs text-white/80">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-void-card border border-glass-border">
                  <span className="w-2 h-2 rounded-full bg-[#E60049]" />
                  <span>Heavy impasto palette knife ridges simulated in real-time</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-void-card border border-glass-border">
                  <span className="w-2 h-2 rounded-full bg-gold" />
                  <span>24k liquid gold specular reflections under orbital spotlights</span>
                </div>
              </div>

              <div className="pt-2">
                <Link href={`/art/${featuredHeroArt.slug}`}>
                  <MagneticButton variant="gold" className="text-sm">
                    <span>Inspect Full Masterpiece</span>
                    <ArrowRight className="w-4 h-4" />
                  </MagneticButton>
                </Link>
              </div>
            </div>

            {/* Right: Embedded Live 3D Canvas */}
            <div className="lg:col-span-7">
              <AcrylicCanvasViewer
                imageUrl={featuredHeroArt.primaryImage}
                title={featuredHeroArt.title}
                artist="Fiha Islam"
                dimensions={{ width: 4.2, height: 2.8, depth: 0.22 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===================== COLLECTOR TESTIMONIALS ===================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-gold uppercase tracking-widest font-mono">
            {tTestimonials('subtitle')}
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white">
            {tTestimonials('title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="p-8 rounded-3xl bg-void-card border border-glass-border hover:border-gold/40 transition-all flex flex-col justify-between shadow-lg"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-gold">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-white/80 leading-relaxed italic font-light">
                  "{locale === 'bn' ? item.reviewBn : item.review}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-glass-border flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {locale === 'bn' ? item.authorBn : item.author}
                  </h4>
                  <p className="text-xs text-white/40">
                    {locale === 'bn' ? item.locationBn : item.location}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{tTestimonials('verified')}</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
