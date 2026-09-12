import React from 'react';
import { useTranslations, useLocale } from 'next-intl';

export default function Loading() {
  const t = useTranslations('loading');
  const locale = useLocale();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 relative overflow-hidden py-24">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-[#E60049]/15 rounded-full blur-[140px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-gold/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-md w-full relative z-10 text-center space-y-6">
        {/* Luxury Glass Spinner Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-void-card/90 border border-glass-border shadow-2xl backdrop-blur-2xl relative overflow-hidden space-y-5">
          <div className="relative flex justify-center py-2">
            {/* Outer Spinning Gradient Ring */}
            <div className="w-16 h-16 rounded-full border-2 border-[#E60049]/20 border-t-[#E60049] border-r-gold animate-spin" />
            {/* Inner Glowing Core */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-tr from-[#E60049] to-gold blur-[6px] opacity-75 animate-ping" />
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
