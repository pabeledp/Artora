'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useCurrency } from '@/lib/currency';
import { useCart } from '@/lib/cart';
import { ShoppingBag, Globe, Home, Image as GalleryIcon, Palette } from 'lucide-react';
import { motion } from 'framer-motion';

export const Navbar: React.FC = () => {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { currency, setCurrency } = useCurrency();
  const { totalCount, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const nextLocale = locale === 'bn' ? 'en' : 'bn';
    router.replace(pathname, { locale: nextLocale });
  };

  const toggleCurrency = () => {
    setCurrency(currency === 'BDT' ? 'USD' : 'BDT');
  };

  const navLinks = [
    { href: '/', label: t('home'), icon: Home },
    { href: '/shop', label: t('gallery'), icon: GalleryIcon },
    { href: '/commission', label: t('commissions'), icon: Palette },
  ];

  return (
    <>
      {/* ===================== TOP HEADER ===================== */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-2 sm:py-3 bg-void/90 backdrop-blur-xl border-b border-glass-border shadow-2xl'
            : 'py-3 sm:py-4 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Artist Identity */}
          <Link href="/" className="group flex items-center gap-3">
            {/* Logo + by FramEmpire */}
            <div className="flex flex-col items-start">
              <div className="relative h-8 sm:h-11 w-28 sm:w-36 flex items-center">
                <img
                  src="/images/artora-logo.png"
                  alt="Artora Logo"
                  className="h-full w-auto object-contain mix-blend-screen brightness-125 drop-shadow-[0_0_15px_rgba(255,176,193,0.4)] group-hover:brightness-150 transition-all duration-300"
                />
              </div>
              <span className="text-[9px] text-white/50 tracking-wider font-mono -mt-1 pl-0.5">
                by <span className="text-white/80 font-semibold group-hover:text-gold transition-colors">FramEmpire</span>
              </span>
            </div>

            {/* PC Only Separator & Artist Tag */}
            <div className="hidden md:flex items-center gap-3 pl-2 border-l border-white/25 h-7 self-center">
              <span className="font-display font-medium text-sm sm:text-base text-white/90 tracking-wide">
                Fiha Islam
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 bg-void-card/60 px-6 py-2 rounded-full border border-glass-border backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-all duration-200 relative ${
                    isActive ? 'text-gold font-semibold' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-crimson to-gold rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Top Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              title="Toggle Bengali / English"
              className="px-3 py-1.5 rounded-full text-xs font-semibold bg-void-card border border-glass-border text-white hover:text-[#FFB0C1] hover:border-[#E60049] transition-all backdrop-blur-md flex items-center gap-1.5 shadow-sm"
            >
              <Globe className="w-3.5 h-3.5 text-[#E60049]" />
              <span>{locale === 'bn' ? 'বাংলা' : 'EN'}</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 sm:p-2.5 rounded-full bg-void-card border border-glass-border text-white hover:text-gold hover:border-gold transition-all backdrop-blur-md shadow-sm"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#E60049] text-white font-bold text-[9px] sm:text-[10px] flex items-center justify-center border-2 border-void shadow-neon-crimson">
                  {totalCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ===================== ULTRA-SLIM MOBILE BOTTOM FLOATING NAVIGATION ===================== */}
      <div className="md:hidden fixed bottom-2 inset-x-4 z-40 max-w-xs mx-auto">
        <nav className="py-1 px-1.5 rounded-2xl bg-[#0D0004]/95 border border-[#E60049]/40 shadow-2xl backdrop-blur-2xl flex items-center justify-around">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-300 flex-1 ${
                  isActive
                    ? 'text-white'
                    : 'text-white/45 hover:text-white/80'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="mobileBottomActiveTab"
                    className="absolute inset-0 bg-gradient-to-r from-[#E60049] to-[#2B020A] rounded-xl border border-[#E60049]/50 shadow-neon-crimson"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex flex-col items-center gap-0.5">
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#FFB0C1]' : 'text-white/60'}`} />
                  <span className={`text-[9px] font-medium leading-tight ${isActive ? 'font-bold text-white' : ''}`}>
                    {link.label}
                  </span>
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};
