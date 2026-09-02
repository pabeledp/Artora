'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { notFound, useParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { ARTWORKS_DATA } from '@/lib/art-data';
import { useCurrency } from '@/lib/currency';
import { useCart } from '@/lib/cart';
import { ARWallModal } from '@/components/ui/ARWallModal';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Link, useRouter } from '@/i18n/routing';

const AcrylicCanvasViewer = dynamic(
  () => import('@/components/3d/AcrylicCanvasViewer').then((mod) => mod.AcrylicCanvasViewer),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[480px] sm:h-[550px] rounded-2xl bg-void-card border border-glass-border flex items-center justify-center text-xs text-gold/60 animate-pulse">
        🎨 Loading 3D Impasto Canvas...
      </div>
    ),
  }
);
import {
  Sparkles,
  ShieldCheck,
  Truck,
  Box,
  Eye,
  Camera,
  ShoppingBag,
  ArrowRight,
  Palette,
  CheckCircle2,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const locale = useLocale();
  const t = useTranslations('product');
  const tShop = useTranslations('shop');
  const { formatPrice } = useCurrency();
  const { addItem } = useCart();
  const router = useRouter();

  const art = ARTWORKS_DATA.find((item) => item.slug === slug);
  if (!art) {
    notFound();
  }

  const [activeImage, setActiveImage] = useState(art.primaryImage);
  const [activeTab, setActiveTab] = useState<'photos' | '3d'>('3d');
  const [isARModalOpen, setIsARModalOpen] = useState(false);

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-white/50 mb-8">
        <Link href="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-white transition-colors">
          Gallery
        </Link>
        <span>/</span>
        <span className="text-gold font-medium">{art.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* ===================== LEFT: VISUAL MEDIA (3D VIEWER / MULTI-ANGLE GALLERY) ===================== */}
        <div className="lg:col-span-7 space-y-4">
          {/* Toggle between 3D Canvas Slab and HD Photo Gallery */}
          <div className="flex items-center justify-between">
            <div className="flex items-center p-1 rounded-xl bg-void-card border border-glass-border backdrop-blur-md">
              <button
                onClick={() => setActiveTab('3d')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === '3d'
                    ? 'bg-violet text-white font-semibold shadow-neon-violet'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Box className="w-3.5 h-3.5" />
                <span>3D Impasto Viewer</span>
              </button>
              <button
                onClick={() => setActiveTab('photos')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'photos'
                    ? 'bg-white/20 text-white font-semibold shadow-inner'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>HD Multi-Angle Photos</span>
              </button>
            </div>

            {/* AR Wall Button */}
            <button
              onClick={() => setIsARModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-crimson to-rose-600 text-white shadow-neon-crimson border border-crimson/40 hover:opacity-95 transition-all"
            >
              <Camera className="w-4 h-4" />
              <span>{t('arButton')}</span>
            </button>
          </div>

          {/* Main Visual Display */}
          {activeTab === '3d' ? (
            <AcrylicCanvasViewer
              imageUrl={art.primaryImage}
              title={art.title}
              artist="Fiha Islam"
              dimensions={{
                width: art.dimensions.widthInches / 11,
                height: art.dimensions.heightInches / 11,
                depth: art.dimensions.depthInches,
              }}
            />
          ) : (
            <div className="space-y-4">
              <div className="relative h-[480px] sm:h-[550px] rounded-2xl overflow-hidden bg-void-card border border-glass-border shadow-2xl">
                <img
                  src={activeImage}
                  alt={art.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {art.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      activeImage === img
                        ? 'border-crimson shadow-neon-crimson scale-105'
                        : 'border-glass-border opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ===================== RIGHT: ARTWORK DETAILS & COMMERCE ACTIONS ===================== */}
        <div className="lg:col-span-5 space-y-6">
          {/* Category & Status */}
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-crimson/20 border border-crimson/40 text-crimson">
              {art.category.toUpperCase()}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-void-card border border-glass-border text-gold">
              Original by Fiha Islam
            </span>
          </div>

          {/* Title */}
          <div>
            <h1 className="font-display font-black text-3xl sm:text-4xl text-white">
              {locale === 'bn' ? art.titleBn : art.title}
            </h1>
            <p className="text-sm text-white/50 mt-1">Year {art.year} • Studio Artwork</p>
          </div>

          {/* Dual Price Box */}
          <div className="p-5 rounded-2xl bg-void-card border border-glass-border backdrop-blur-md space-y-2">
            <span className="text-xs text-white/40 uppercase tracking-widest block font-mono">
              Investment / মূল্য
            </span>
            <div className="flex items-baseline gap-4">
              <span className="font-display font-black text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-crimson via-gold to-white">
                {formatPrice(art.priceBDT, art.priceUSD)}
              </span>
              <span className="text-xs text-white/50">
                (৳{art.priceBDT.toLocaleString()} BDT / ${art.priceUSD} USD)
              </span>
            </div>
            <p className="text-xs text-emerald-400 flex items-center gap-1.5 pt-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Available for Immediate Acquisition & Delivery</span>
            </p>
          </div>

          {/* Key Specs */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-void-card border border-glass-border">
              <span className="text-white/40 block mb-1">{t('medium')}</span>
              <span className="font-semibold text-white/90">
                {locale === 'bn' ? art.mediumBn : art.medium}
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-void-card border border-glass-border">
              <span className="text-white/40 block mb-1">{t('canvasSize')}</span>
              <span className="font-semibold text-white/90">
                {locale === 'bn' ? art.canvasSizeBn : art.canvasSize}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold">
              Artwork Narrative
            </h4>
            <p className="text-sm text-white/70 leading-relaxed">
              {locale === 'bn' ? art.descriptionBn : art.description}
            </p>
          </div>

          {/* Artwork Highlights */}
          <div className="space-y-2 text-xs text-white/70">
            {(locale === 'bn' ? art.highlightsBn : art.highlights).map((hl, i) => (
              <div key={i} className="flex items-start gap-2">
                <Sparkles className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                <span>{hl}</span>
              </div>
            ))}
          </div>

          {/* Purchase Actions */}
          <div className="pt-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <MagneticButton
                variant="outline"
                className="w-full py-4 text-sm"
                onClick={() => addItem(art)}
              >
                <ShoppingBag className="w-4 h-4 text-gold" />
                <span>{t('addToCart')}</span>
              </MagneticButton>

              <MagneticButton
                variant="gold"
                className="w-full py-4 text-sm"
                onClick={() => {
                  addItem(art);
                  router.push('/checkout');
                }}
              >
                <span>{t('buyNow')}</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </div>

            <Link href="/commission" className="block">
              <button className="w-full py-3 rounded-full text-xs font-medium text-white/70 hover:text-white bg-void-card border border-glass-border hover:border-violet transition-all flex items-center justify-center gap-2">
                <Palette className="w-3.5 h-3.5 text-violet" />
                <span>{t('requestCommission')}</span>
              </button>
            </Link>
          </div>

          {/* Logistics & Authenticity Guarantee */}
          <div className="p-4 rounded-2xl bg-void-card/60 border border-glass-border space-y-2.5 text-xs text-white/60">
            <p className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
              <span>{t('authenticity')}</span>
            </p>
            <p className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-crimson shrink-0" />
              <span>{t('shippingBD')}</span>
            </p>
            <p className="flex items-center gap-2">
              <Box className="w-4 h-4 text-violet shrink-0" />
              <span>{t('shippingGlobal')}</span>
            </p>
          </div>
        </div>
      </div>

      {/* AR Wall Preview Modal */}
      <ARWallModal
        art={art}
        isOpen={isARModalOpen}
        onClose={() => setIsARModalOpen(false)}
      />
    </div>
  );
}
