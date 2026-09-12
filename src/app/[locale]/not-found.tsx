import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { MagneticButton } from '@/components/ui/MagneticButton';
import {
  Sparkles,
  ArrowRight,
  Home,
  ShoppingBag,
  Palette,
  AlertCircle,
} from 'lucide-react';

export default function NotFound() {
  const t = useTranslations('notFound');
  const locale = useLocale();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden py-20">
      {/* Dynamic Background Glows (Signature Crimson & Gold) */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#E60049]/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[450px] h-[450px] bg-gold/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-2xl w-full relative z-10 text-center space-y-8">
        {/* Luxury Glass Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-void-card/95 border border-glass-border shadow-2xl backdrop-blur-2xl relative overflow-hidden space-y-6">
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#E60049]/10 rounded-full blur-2xl pointer-events-none" />

          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold bg-[#E60049]/15 border border-[#E60049]/40 text-[#FFB0C1] shadow-neon-crimson">
            <AlertCircle className="w-3.5 h-3.5 text-gold" />
            <span>{t('badge')}</span>
          </div>

          {/* Big 404 Visual Glow Typography */}
          <div className="relative py-2">
            <span className="font-display font-black text-7xl sm:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-[#E60049] via-[#FFB0C1] to-gold select-none tracking-tight block">
              404
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
              {t('title')}
            </h1>
            <p className="text-xs sm:text-sm text-white/70 max-w-lg mx-auto leading-relaxed font-light">
              {t('desc')}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-glass-border">
            <Link href="/">
              <MagneticButton variant="primary" className="text-xs sm:text-sm py-3 px-6 min-h-[44px]">
                <Home className="w-4 h-4" />
                <span>{t('backHome')}</span>
              </MagneticButton>
            </Link>

            <Link href="/shop">
              <MagneticButton variant="gold" className="text-xs sm:text-sm py-3 px-6 min-h-[44px]">
                <ShoppingBag className="w-4 h-4" />
                <span>{t('exploreShop')}</span>
              </MagneticButton>
            </Link>

            <Link href="/commission">
              <div className="px-5 py-3 rounded-full text-xs font-semibold bg-white/5 hover:bg-white/10 text-white/90 hover:text-white border border-glass-border transition-all flex items-center gap-2 min-h-[44px]">
                <Palette className="w-3.5 h-3.5 text-[#FFB0C1]" />
                <span>{t('customCommission')}</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
