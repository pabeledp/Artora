import React from 'react';
import { useTranslations, useLocale } from 'next-intl';

export default function Loading() {
  const t = useTranslations('loading');
  const locale = useLocale();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void/90 backdrop-blur-md overflow-hidden select-none">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 bg-[#E60049]/15 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 h-64 sm:h-80 bg-gold/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-sm sm:max-w-md relative z-10 text-center">
        {/* Luxury Glass Spinner Card */}
        <div className="p-6 sm:p-9 rounded-3xl bg-void-card/95 border border-glass-border shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl relative overflow-hidden space-y-5">
          <div className="relative flex items-center justify-center py-4">
            {/* Ambient Background Pulse for Logo */}
            <div className="absolute w-20 h-20 rounded-full bg-gradient-to-tr from-[#E60049]/30 to-gold/25 blur-xl animate-pulse pointer-events-none" />
            
            {/* Outer Spinning Gradient Ring */}
            <div className="w-24 h-24 rounded-full border-2 border-[#E60049]/20 border-t-[#E60049] border-r-gold animate-spin" />
            
            {/* Center Logo in the Circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center">
              <img
                src="/images/artora-logo.png"
                alt="Artora"
                className="w-12 h-auto object-contain mix-blend-screen brightness-125 drop-shadow-[0_0_12px_rgba(230,0,73,0.6)] animate-pulse"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#E60049]/15 border border-[#E60049]/30 text-[#FFB0C1]">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span>{t('badge')}</span>
            </div>

            <h3 className="font-display font-bold text-base sm:text-lg text-white tracking-tight">
              {t('title')}
            </h3>
            <p className="text-xs text-white/60 font-light leading-relaxed">
              {t('sub')}
            </p>
          </div>

          {/* Shimmering Progress Bar */}
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden border border-glass-border relative">
            <div className="h-full bg-gradient-to-r from-transparent via-[#E60049] to-gold w-1/2 rounded-full animate-shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
}
