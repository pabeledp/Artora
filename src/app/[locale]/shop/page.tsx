'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ARTWORKS_DATA } from '@/lib/art-data';
import { useCurrency } from '@/lib/currency';
import { useCart } from '@/lib/cart';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Grid,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Eye,
} from 'lucide-react';

export default function ShopPage() {
  const t = useTranslations('shop');
  const locale = useLocale();
  const { formatPrice } = useCurrency();
  const { addItem } = useCart();

  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { key: 'all', label: t('filters.all') },
    { key: 'acrylic', label: t('filters.acrylic') },
    { key: 'textile', label: t('filters.textile') },
    { key: 'original', label: t('filters.original') },
    { key: 'print', label: t('filters.print') },
  ];

  const filteredArtworks =
    activeCategory === 'all'
      ? ARTWORKS_DATA
      : ARTWORKS_DATA.filter((art) => art.category === activeCategory);

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Header with Single H1 and High-Intent SEO Keywords */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-void-card border border-glass-border text-gold backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-crimson" />
          <span>{locale === 'bn' ? 'আর্ট গ্যালারি ও অরিজিনাল ক্যানভাস শপ' : 'Original Artwork Gallery & Fine Art Shop'}</span>
        </div>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
          {locale === 'bn'
            ? 'আর্ট গ্যালারি ও অরিজিনাল ক্যানভাস শপ - ফিহা ইসলাম'
            : 'Original Artwork Gallery & Fine Art Canvas Shop by Fiha Islam'}
        </h1>
        <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed">
          {locale === 'bn'
            ? 'হাতে আঁকা আরবি ক্যালিগ্রাফি ও টেক্সচার্ড ইম্প্যাস্টো অ্যাক্রিলিক আর্টওয়ার্ক কালেকশন। প্রতিটি পেইন্টিং ১০০% অরিজিনাল এবং আর্টিস্ট ফিহা ইসলামের স্বাক্ষরযুক্ত।'
            : 'Explore handcrafted Islamic calligraphy, heavy impasto textures, and bespoke original canvases created in Narayanganj, Dhaka by fine artist Fiha Islam.'}
        </p>
      </div>

      {/* Control Toolbar: Category filter tabs */}
      <div className="flex items-center justify-between gap-4 mb-10 pb-6 border-b border-glass-border">
        {/* Category Pills (horizontally scrollable on mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-full w-full pb-2 md:pb-0 scrollbar-none snap-x">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all shrink-0 snap-start ${
                activeCategory === cat.key
                  ? 'bg-gradient-to-r from-[#E60049] to-[#2B020A] text-white shadow-neon-crimson border border-[#E60049]/50 font-bold'
                  : 'bg-void-card border border-glass-border text-white/70 hover:text-white hover:border-white/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2D Card Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredArtworks.map((art) => (
            <motion.div
              key={art.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="group rounded-3xl overflow-hidden bg-void-card border border-glass-border hover:border-gold/50 transition-all duration-300 flex flex-col justify-between shadow-xl hover:shadow-neon-gold"
            >
              <div className="relative h-72 overflow-hidden bg-void-light">
                <img
                  src={art.primaryImage}
                  alt={`${art.title} - Handcrafted Arabic Calligraphy and Impasto Canvas Painting by Fiha Islam (${art.canvasSize})`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-70" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-void/80 border border-glass-border text-white/90 backdrop-blur-md">
                    {locale === 'bn' ? art.canvasSizeBn : art.canvasSize}
                  </span>
                  {art.discountPercent && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#E60049] text-white shadow-neon-crimson animate-pulse">
                      🔥 {art.discountPercent}% OFF
                    </span>
                  )}
                </div>

                <div className="absolute top-4 right-4">
                  <Link
                    href={`/art/${art.slug}`}
                    className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-white/10 border border-white/20 text-white hover:text-gold backdrop-blur-md flex items-center gap-1 transition-colors"
                  >
                    <Eye className="w-3 h-3 text-gold" /> {locale === 'bn' ? 'বিস্তারিত' : 'View'}
                  </Link>
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-bold text-lg text-white group-hover:text-[#FFB0C1] transition-colors">
                    {locale === 'bn' ? art.titleBn : art.title}
                  </h3>
                  <p className="text-xs text-white/60 mt-1 line-clamp-2">
                    {locale === 'bn' ? art.mediumBn : art.medium}
                  </p>
                </div>

                <div className="pt-4 border-t border-glass-border flex items-center justify-between">
                  <div>
                    {art.discountPercent && art.originalPriceBDT && (
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] text-white/40 line-through font-mono">
                          ৳{art.originalPriceBDT.toLocaleString()}
                        </span>
                        <span className="text-[9px] font-mono font-bold px-1 py-0.2 rounded bg-[#E60049]/20 text-[#FFB0C1]">
                          -{art.discountPercent}%
                        </span>
                      </div>
                    )}
                    <span className="text-lg font-black text-[#E60049] font-mono">
                      ৳{art.priceBDT.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => addItem(art)}
                      className="p-2.5 rounded-full bg-void-card border border-glass-border text-white hover:text-[#FFB0C1] hover:border-[#E60049] transition-colors"
                      title={t('addToCart')}
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                    <Link
                      href={`/art/${art.slug}`}
                      className="px-4 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-crimson to-violet text-white shadow-neon-crimson hover:opacity-90 transition-all flex items-center gap-1"
                    >
                      <span>{locale === 'bn' ? 'বিস্তারিত' : 'View'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
