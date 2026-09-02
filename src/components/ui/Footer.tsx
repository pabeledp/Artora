'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { MapPin, Phone, Mail, Instagram, Facebook, ShieldCheck, Truck, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  return (
    <footer className="relative bg-void-light/80 border-t border-glass-border pt-16 pb-12 overflow-hidden">
      {/* Glow ambient spots */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-crimson/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-glass-border">
          {/* Brand Info */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-36 flex items-center">
                <img
                  src="/images/artora-logo.png"
                  alt="Artora Logo"
                  className="h-10 w-auto object-contain mix-blend-screen brightness-110"
                />
              </div>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">{t('about')}</p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-void-card border border-glass-border flex items-center justify-center text-white/70 hover:text-crimson hover:border-crimson transition-all"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-void-card border border-glass-border flex items-center justify-center text-white/70 hover:text-gold hover:border-gold transition-all"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/8801723722019"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold">
              {t('quickLinks')}
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  {tNav('home')}
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  {tNav('gallery')}
                </Link>
              </li>
              <li>
                <Link href="/commission" className="hover:text-white transition-colors">
                  {tNav('commissions')}
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-white transition-colors">
                  {tNav('cart')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Studio Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold">
              {t('contact')}
            </h4>
            <div className="space-y-2.5 text-xs text-white/70">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-crimson shrink-0 mt-0.5" />
                <span>{t('address')}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href="tel:+8801723722019"
                  className="hover:text-emerald-300 font-mono transition-colors"
                >
                  {t('phone')}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FFB0C1] shrink-0" />
                <a
                  href="mailto:team.framempire@gmail.com"
                  className="hover:text-white font-mono transition-colors"
                >
                  {t('email')}
                </a>
              </p>
            </div>
          </div>

          {/* Logistics Badges */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold">
              Payment & Delivery
            </h4>
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-void-card border border-glass-border text-[11px] text-white/70 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Direct Gateway Integration</span>
                </div>
                <p className="text-[10px] text-white/50">
                  bKash • Nagad • SSLCommerz • Stripe Global
                </p>
              </div>

              <div className="p-3 rounded-xl bg-void-card border border-glass-border text-[11px] text-white/70 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-amber-400">
                  <Truck className="w-3.5 h-3.5" />
                  <span>Courier & Packaging</span>
                </div>
                <p className="text-[10px] text-white/50">
                  Pathao Logistics (BD) • Worldwide Express Shipping
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & Developer Credit */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>{t('copyright')}</p>
          
          <div className="flex items-center gap-2">
            <span>{t('developedBy')}</span>
            <a
              href="https://www.framempire.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FFB0C1] hover:text-white font-bold transition-all inline-flex items-center gap-1 border-b border-[#E60049] pb-0.5"
            >
              <span>FramEmpire</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
