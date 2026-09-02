'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useCurrency } from '@/lib/currency';
import { useCart } from '@/lib/cart';
import { ShoppingBag, Globe, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { currency, setCurrency } = useCurrency();
  const { totalCount, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    { href: '/', label: t('home') },
    { href: '/shop', label: t('gallery') },
    { href: '/commission', label: t('commissions') },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-2.5 bg-void/90 backdrop-blur-xl border-b border-glass-border shadow-2xl'
            : 'py-4 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <div className="relative h-8 sm:h-10 w-24 sm:w-32 flex items-center">
              <img
                src="/images/artora-logo.png"
                alt="Artora Logo"
                className="h-7 sm:h-9 w-auto object-contain mix-blend-screen group-hover:brightness-125 group-hover:drop-shadow-[0_0_15px_rgba(255,176,193,0.5)] transition-all duration-300"
              />
            </div>
            <span className="text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded-full bg-[#E60049]/15 text-[#FFB0C1] font-mono border border-[#E60049]/30 hidden sm:inline-block">
              STUDIO
            </span>
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

          {/* Action Bar */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Currency Switcher */}
            <button
              onClick={toggleCurrency}
              title="Toggle BDT ৳ / USD $"
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-semibold bg-void-card border border-glass-border text-white/80 hover:text-gold hover:border-gold transition-all backdrop-blur-md flex items-center gap-1"
            >
              <span className={currency === 'BDT' ? 'text-gold' : 'text-white/40'}>৳ BDT</span>
              <span className="text-white/20">|</span>
              <span className={currency === 'USD' ? 'text-gold' : 'text-white/40'}>$ USD</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              title="Toggle Bengali / English"
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold bg-void-card border border-glass-border text-white/80 hover:text-crimson hover:border-crimson transition-all backdrop-blur-md flex items-center gap-1"
            >
              <Globe className="w-3 h-3 text-[#E60049]" />
              <span>{locale === 'bn' ? 'বাংলা' : 'EN'}</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 sm:p-2.5 rounded-full bg-void-card border border-glass-border text-white hover:text-gold hover:border-gold transition-all backdrop-blur-md"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#E60049] text-white font-bold text-[9px] sm:text-[10px] flex items-center justify-center border-2 border-void shadow-neon-crimson">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-void-card border border-glass-border text-white"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[62px] z-30 p-5 bg-void/98 backdrop-blur-2xl border-b border-glass-border shadow-2xl md:hidden space-y-4"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium py-3 px-4 rounded-xl transition-all ${
                    pathname === link.href
                      ? 'bg-[#E60049]/15 text-[#FFB0C1] border border-[#E60049]/30 font-bold'
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-glass-border flex items-center justify-between text-xs text-white/50">
              <span>Artora by FramEmpire</span>
              <a href="tel:+8801723722019" className="text-emerald-400 font-mono">
                +880 1723-722019
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
