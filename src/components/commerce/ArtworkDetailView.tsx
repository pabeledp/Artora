'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { ArtWork } from '@/lib/art-data';
import { useCurrency } from '@/lib/currency';
import { useCart } from '@/lib/cart';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Link, useRouter } from '@/i18n/routing';

import {
  Sparkles,
  ShieldCheck,
  Truck,
  Eye,
  ShoppingBag,
  ArrowRight,
  Palette,
  CheckCircle2,
  MessageSquare,
  Maximize2,
} from 'lucide-react';

interface ArtworkDetailViewProps {
  art: ArtWork;
}

export const ArtworkDetailView: React.FC<ArtworkDetailViewProps> = ({ art }) => {
  const locale = useLocale();
  const t = useTranslations('product');
  const tShop = useTranslations('shop');
  const { formatPrice } = useCurrency();
  const { addItem } = useCart();
  const router = useRouter();

  const [activeImage, setActiveImage] = useState(art.primaryImage);

  const isBn = locale === 'bn';

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-white/50 mb-8 overflow-x-auto whitespace-nowrap scrollbar-none py-1">
        <Link href="/" className="hover:text-white transition-colors">
          {isBn ? 'হোম' : 'Home'}
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-white transition-colors">
          {isBn ? 'গ্যালারি শপ' : 'Gallery Shop'}
        </Link>
        <span>/</span>
        <span className="text-[#FFB0C1] font-medium truncate max-w-[200px] sm:max-w-none">
          {isBn ? art.titleBn : art.title}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* ===================== LEFT: VISUAL MEDIA (MULTI-ANGLE HD GALLERY) ===================== */}
        <div className="lg:col-span-7 space-y-4 w-full">
          {/* Top action bar: Studio Photo Gallery Badge */}
          <div className="flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-void-card border border-glass-border text-xs font-mono text-white/80 backdrop-blur-md">
              <Eye className="w-3.5 h-3.5 text-gold" />
              <span>{isBn ? 'হাই-রেজোলিউশন স্টুডিও ফটো গ্যালারি' : 'High-Resolution Studio Gallery'}</span>
            </div>
          </div>


          {/* Main Visual Display */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden bg-void-card border border-glass-border shadow-2xl group">
              <Image
                src={activeImage}
                alt={`${art.title} Original Acrylic Impasto Canvas Artwork by Fiha Islam`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-void-card/90 border border-glass-border backdrop-blur-md text-[10px] font-mono text-white/80 flex items-center gap-1">
                <Maximize2 className="w-3 h-3 text-gold" />
                <span>{isBn ? art.canvasSizeBn : art.canvasSize}</span>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
              {art.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                    activeImage === img
                      ? 'border-[#E60049] shadow-neon-crimson scale-105'
                      : 'border-glass-border opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${art.title} Thumbnail ${idx + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ===================== RIGHT: ARTWORK DETAILS & COMMERCE ACTIONS ===================== */}
        <div className="lg:col-span-5 space-y-6 w-full">
          {/* Category & Status */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#E60049]/20 border border-[#E60049]/40 text-[#FFB0C1]">
              {art.category.toUpperCase()}
            </span>
            {art.discountPercent && (
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#E60049] text-white shadow-neon-crimson animate-pulse">
                🔥 {art.discountPercent}% SPECIAL DISCOUNT
              </span>
            )}
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-void-card border border-glass-border text-gold">
              Original by Fiha Islam
            </span>
          </div>

          {/* Title - Exactly ONE h1 on the page */}
          <div>
            <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
              {isBn ? art.titleBn : art.title}
            </h1>
            <p className="text-sm text-white/50 mt-1">
              Year {art.year} • Studio Original Artwork by Fiha Islam
            </p>
          </div>

          {/* Dual Price Box with Discount Support */}
          <div className="p-5 rounded-2xl bg-void-card border border-glass-border backdrop-blur-md space-y-2">
            <span className="text-xs text-white/40 uppercase tracking-widest block font-mono">
              {isBn ? 'মূল্য ও ডিসকাউন্ট' : 'Collector Investment'}
            </span>
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="font-display font-black text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFB0C1] via-white to-gold font-mono">
                ৳{art.priceBDT.toLocaleString()}
              </span>
              {art.discountPercent && art.originalPriceBDT && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-white/40 line-through font-mono">
                    ৳{art.originalPriceBDT.toLocaleString()}
                  </span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#E60049]/20 text-[#FFB0C1] border border-[#E60049]/40">
                    SAVE {art.discountPercent}%
                  </span>
                </div>
              )}
            </div>
            <p className="text-xs text-emerald-400 flex items-center gap-1.5 pt-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isBn ? 'সরাসরি সংগ্রহ ও স্টেডফাস্ট কুরিয়ারে ডেলিভারিযোগ্য' : 'Available for Immediate Acquisition & Steadfast Delivery'}</span>
            </p>
          </div>

          {/* Key Specs */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-void-card border border-glass-border">
              <span className="text-white/40 block mb-1">{t('medium')}</span>
              <span className="font-semibold text-white/90">
                {isBn ? art.mediumBn : art.medium}
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-void-card border border-glass-border">
              <span className="text-white/40 block mb-1">{t('canvasSize')}</span>
              <span className="font-semibold text-white/90">
                {isBn ? art.canvasSizeBn : art.canvasSize}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gold">
              Artwork Narrative & Concept
            </h2>
            <p className="text-sm text-white/70 leading-relaxed">
              {isBn ? art.descriptionBn : art.description}
            </p>
          </div>

          {/* Artwork Highlights */}
          <div className="space-y-2 text-xs text-white/70">
            {(isBn ? art.highlightsBn : art.highlights).map((hl, i) => (
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
                className="w-full py-4 text-sm font-semibold min-h-[48px]"
                onClick={() => addItem(art)}
              >
                <ShoppingBag className="w-4 h-4 text-[#FFB0C1]" />
                <span>{t('addToCart')}</span>
              </MagneticButton>

              <MagneticButton
                variant="gold"
                className="w-full py-4 text-sm font-bold min-h-[48px]"
                onClick={() => {
                  addItem(art);
                  router.push('/checkout');
                }}
              >
                <span>{t('buyNow')}</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </div>

            {/* Direct WhatsApp Original Studio Photo/Video Request Button */}
            {(() => {
              const whatsappOriginalMsg = encodeURIComponent(
                `🎨 *Original Artwork HD Photo/Video Request*\n\n` +
                `*Artwork:* ${art.title}\n` +
                `*Ref ID:* ${art.id}\n` +
                `*Canvas Size:* ${art.canvasSize}\n` +
                `*Price:* ৳${art.priceBDT.toLocaleString()}${art.discountPercent ? ` (Special ${art.discountPercent}% Discount)` : ''}\n\n` +
                `Hello Fiha Islam, I am interested in this original canvas and would like to see real original uncompressed photos & video clips from your studio!`
              );
              const whatsappOriginalUrl = `https://wa.me/8801723722019?text=${whatsappOriginalMsg}`;

              return (
                <a
                  href={whatsappOriginalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-4 rounded-full text-xs sm:text-sm font-bold bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] border border-[#25D366]/40 backdrop-blur-xl shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer min-h-[48px]"
                >
                  <MessageSquare className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                  <span>
                    {isBn
                      ? 'আসল ছবি ও ভিডিও দেখতে হোয়াটসঅ্যাপে রিকোয়েস্ট পাঠান'
                      : 'Request Studio HD Photo & Video on WhatsApp'}
                  </span>
                </a>
              );
            })()}

            <Link href="/commission" className="block">
              <button className="w-full py-3.5 rounded-full text-xs font-medium text-white/70 hover:text-white bg-void-card border border-glass-border hover:border-[#E60049] transition-all flex items-center justify-center gap-2 min-h-[44px]">
                <Palette className="w-3.5 h-3.5 text-[#FFB0C1]" />
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
              <Truck className="w-4 h-4 text-[#E60049] shrink-0" />
              <span>{t('shippingBD')}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

