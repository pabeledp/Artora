'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';
import { ARTWORKS_DATA } from '@/lib/art-data';
import { useCurrency } from '@/lib/currency';
import { useCart } from '@/lib/cart';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle2,
} from 'lucide-react';

export default function ShopPage() {
  const t = useTranslations('shop');
  const locale = useLocale();
  const router = useRouter();
  const { formatPrice } = useCurrency();
  const { addItem } = useCart();

  const [activeCategory, setActiveCategory] = useState<string>('all');

  const isBn = locale === 'bn';

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
    <div className="min-h-screen pt-24 sm:pt-28 pb-24 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-3 sm:space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-void-card border border-glass-border text-gold backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#E60049]" />
          <span>{isBn ? 'আর্ট গ্যালারি ও অরিজিনাল ক্যানভাস শপ' : 'Original Artwork Gallery & Fine Art Shop'}</span>
        </div>
        <h1 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight">
          {isBn
            ? 'আর্ট গ্যালারি ও অরিজিনাল ক্যানভাস শপ - ফিহা ইসলাম'
            : 'Original Artwork Gallery & Fine Art Canvas Shop by Fiha Islam'}
        </h1>
        <p className="text-xs sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed">
          {isBn
            ? 'হাতে আঁকা আরবি ক্যালিগ্রাফি, রেজিন ও টেক্সচার্ড ইম্প্যাস্টো আর্টওয়ার্ক কালেকশন। প্রতিটি পেইন্টিং ১০০% অরিজিনাল এবং আর্টিস্ট ফিহা ইসলামের স্বাক্ষরযুক্ত।'
            : 'Explore handcrafted Islamic calligraphy, resin ocean waves, and heavy impasto textures created by fine artist Fiha Islam.'}
        </p>
      </div>

      {/* Control Toolbar: Category filter tabs */}
      <div className="flex items-center justify-between gap-4 mb-8 sm:mb-10 pb-4 sm:pb-6 border-b border-glass-border">
        {/* Category Pills (horizontally scrollable) */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-full w-full pb-2 md:pb-0 scrollbar-none snap-x">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-medium transition-all shrink-0 snap-start ${
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

      {/* Products Grid: 2 per line on mobile (grid-cols-2), 2 columns of horizontal cards on desktop (md:grid-cols-2) */}
      <motion.div layout className="grid grid-cols-2 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
        <AnimatePresence>
          {filteredArtworks.map((art) => (
            <motion.div
              key={art.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="group rounded-2xl sm:rounded-3xl overflow-hidden bg-void-card border border-glass-border hover:border-[#E60049]/60 transition-all duration-300 flex flex-col md:flex-row justify-between shadow-xl hover:shadow-neon-crimson relative"
            >
              {/* Product Visual Container (Top on Mobile, Left on Desktop) */}
              <div className="relative w-full md:w-48 lg:w-60 aspect-square md:aspect-auto shrink-0 overflow-hidden bg-void-light border-b md:border-b-0 md:border-r border-glass-border">
                <Link href={`/art/${art.slug}`} className="block w-full h-full">
                  <img
                    src={art.primaryImage}
                    alt={`${art.title} - Handcrafted Canvas Artwork by Fiha Islam`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent opacity-60 md:opacity-40" />
                </Link>

                {/* Floating Badges (Top Left) */}
                <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex flex-wrap gap-1.5 z-10 pointer-events-none">
                  {art.isSold ? (
                    <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-mono font-bold bg-black/70 border border-white/20 backdrop-blur-md text-white flex items-center gap-1 shadow-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E60049] animate-pulse" />
                      <span>{isBn ? 'সোল্ড আউট' : 'SOLD OUT'}</span>
                    </span>
                  ) : art.discountPercent ? (
                    <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-mono font-bold bg-[#E60049] text-white shadow-neon-crimson animate-pulse">
                      🔥 {art.discountPercent}% OFF
                    </span>
                  ) : null}
                </div>
              </div>

              {/* Product Information Container (Bottom on Mobile, Right on Desktop) */}
              <div className="p-3 sm:p-4 md:p-5 lg:p-6 flex-1 flex flex-col justify-between space-y-2 sm:space-y-3">
                {/* Title & Specs */}
                <div className="space-y-1">
                  <Link href={`/art/${art.slug}`} className="block group/title">
                    <h3 className="font-display font-bold text-xs sm:text-sm md:text-base lg:text-lg text-white group-hover/title:text-[#FFB0C1] transition-colors leading-snug line-clamp-2 md:line-clamp-2">
                      {isBn ? art.titleBn : art.title}
                    </h3>
                  </Link>
                  <p className="text-[10px] sm:text-xs text-white/50 hidden md:block line-clamp-1">
                    {isBn ? art.canvasSizeBn : art.canvasSize}
                  </p>
                </div>

                {/* Price & Action Section */}
                <div className="pt-2 sm:pt-3 border-t border-glass-border flex flex-col justify-between gap-2.5">
                  {/* Price Row */}
                  <div>
                    {!art.isSold && art.discountPercent && art.originalPriceBDT && (
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] sm:text-xs text-white/40 line-through font-mono">
                          ৳{art.originalPriceBDT.toLocaleString()}
                        </span>
                        <span className="text-[8px] sm:text-[9px] font-mono font-bold px-1 py-0.2 rounded bg-[#E60049]/20 text-[#FFB0C1] border border-[#E60049]/40">
                          -{art.discountPercent}%
                        </span>
                      </div>
                    )}
                    <span className="text-sm sm:text-base md:text-xl font-black text-[#E60049] font-mono block">
                      ৳{art.priceBDT.toLocaleString()}
                    </span>
                  </div>

                  {/* Actions Row */}
                  <div className="w-full">
                    {art.isSold ? (
                      <Link
                        href={`/art/${art.slug}`}
                        className="w-full py-2 px-3 rounded-xl sm:rounded-full text-[11px] sm:text-xs font-semibold bg-gradient-to-r from-[#E60049] to-[#2B020A] text-white shadow-neon-crimson hover:opacity-90 transition-all flex items-center justify-center gap-1.5 text-center min-h-[36px]"
                      >
                        <span className="truncate">{isBn ? 'রিস্টক রিকোয়েস্ট' : 'Request Restock'}</span>
                        <ArrowRight className="w-3 h-3 shrink-0" />
                      </Link>
                    ) : (
                      <div className="flex items-center gap-1.5 sm:gap-2 w-full">
                        <button
                          onClick={() => addItem(art)}
                          className="p-2 sm:px-3 sm:py-2 rounded-xl sm:rounded-full bg-void-card border border-glass-border hover:border-[#E60049] text-white hover:text-[#FFB0C1] transition-all flex items-center justify-center gap-1.5 shrink-0 min-h-[36px]"
                          title={t('addToCart')}
                        >
                          <ShoppingBag className="w-3.5 h-3.5 text-[#FFB0C1]" />
                          <span className="text-xs font-semibold hidden lg:inline">
                            {isBn ? 'কার্টে যোগ করুন' : 'Add To Cart'}
                          </span>
                        </button>
                        <button
                          onClick={() => {
                            addItem(art);
                            router.push('/checkout');
                          }}
                          className="flex-1 py-2 px-2.5 sm:px-4 rounded-xl sm:rounded-full text-[11px] sm:text-xs font-bold bg-gradient-to-r from-[#E60049] to-[#2B020A] text-white shadow-neon-crimson hover:opacity-90 transition-all flex items-center justify-center gap-1 min-h-[36px]"
                        >
                          <Zap className="w-3 h-3 text-gold shrink-0" />
                          <span className="truncate">{isBn ? 'এখনই কিনুন' : 'Buy now'}</span>
                        </button>
                      </div>
                    )}
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

