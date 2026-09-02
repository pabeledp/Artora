'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ARTWORKS_DATA } from '@/lib/art-data';
import { useCurrency } from '@/lib/currency';
import { useCart } from '@/lib/cart';
import { motion, AnimatePresence } from 'framer-motion';

const VirtualGalleryWall = dynamic(
  () => import('@/components/3d/VirtualGalleryWall').then((mod) => mod.VirtualGalleryWall),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[650px] rounded-2xl bg-void-card border border-glass-border flex items-center justify-center text-xs text-gold/60 animate-pulse">
        🏛️ Loading 3D Virtual Gallery Wall...
      </div>
    ),
  }
);
import {
  Grid,
  Box,
  ShoppingBag,
  ArrowRight,
  Filter,
  Sparkles,
  Zap,
} from 'lucide-react';

export default function ShopPage() {
  const t = useTranslations('shop');
  const locale = useLocale();
  const { formatPrice } = useCurrency();
  const { addItem } = useCart();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'wall'>('grid');

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
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-void-card border border-glass-border text-gold backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-crimson" />
          <span>Curated Acrylic Collection & Wearables</span>
        </div>
        <h1 className="font-display font-black text-4xl sm:text-5xl text-white">
          {t('title')}
        </h1>
        <p className="text-sm sm:text-base text-white/60">{t('subtitle')}</p>
      </div>

      {/* Control Toolbar: Filter tabs & View Mode switcher */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 pb-6 border-b border-glass-border">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                activeCategory === cat.key
                  ? 'bg-gradient-to-r from-crimson to-violet text-white shadow-neon-crimson border-crimson/50 font-bold'
                  : 'bg-void-card border border-glass-border text-white/70 hover:text-white hover:border-white/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* View Mode Toggle (Flat Grid vs 3D Wall) */}
        <div className="flex items-center p-1 rounded-xl bg-void-card border border-glass-border backdrop-blur-md">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'grid'
                ? 'bg-white/15 text-white font-semibold shadow-inner'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>{t('viewMode.grid')}</span>
          </button>
          <button
            onClick={() => setViewMode('wall')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'wall'
                ? 'bg-gold/20 text-gold font-semibold shadow-inner'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Box className="w-3.5 h-3.5 text-gold" />
            <span>{t('viewMode.wall')}</span>
          </button>
        </div>
      </div>

      {/* Viewport: 3D Virtual Gallery Wall or 2D Card Grid */}
      {viewMode === 'wall' ? (
        <div className="my-8">
          <VirtualGalleryWall />
        </div>
      ) : (
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
                    alt={art.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-70" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-void/80 border border-glass-border text-white/90 backdrop-blur-md">
                      {art.canvasSize}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-violet/80 border border-violet/40 text-white backdrop-blur-md flex items-center gap-1">
                      <Zap className="w-3 h-3 text-gold" /> 3D View
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-lg text-white group-hover:text-gold transition-colors">
                      {locale === 'bn' ? art.titleBn : art.title}
                    </h3>
                    <p className="text-xs text-white/60 mt-1">
                      {locale === 'bn' ? art.mediumBn : art.medium}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-glass-border flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-white/40 uppercase block">Investment</span>
                      <span className="text-lg font-black text-crimson">
                        {formatPrice(art.priceBDT, art.priceUSD)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => addItem(art)}
                        className="p-2.5 rounded-full bg-void-card border border-glass-border text-white hover:text-gold hover:border-gold transition-colors"
                        title={t('addToCart')}
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                      <Link
                        href={`/art/${art.slug}`}
                        className="px-4 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-crimson to-violet text-white shadow-neon-crimson hover:opacity-90 transition-all flex items-center gap-1"
                      >
                        <span>View</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
