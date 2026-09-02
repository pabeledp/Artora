'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { useCurrency } from '@/lib/currency';
import { useRouter } from '@/i18n/routing';
import { MagneticButton } from '../ui/MagneticButton';
import { useTranslations } from 'next-intl';

export const CartDrawer: React.FC = () => {
  const { items, removeItem, isCartOpen, setIsCartOpen, totalBDT, totalUSD, clearCart } = useCart();
  const { currency, formatPrice } = useCurrency();
  const router = useRouter();
  const t = useTranslations('checkout');

  if (!isCartOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="absolute inset-0 bg-void/80 backdrop-blur-md"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="w-screen max-w-md bg-void-light border-l border-glass-border shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-glass-border flex items-center justify-between bg-void/60 backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-crimson" />
                <h2 className="text-lg font-bold text-white tracking-wide">
                  Your Art Collection ({items.length})
                </h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-white/50 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-void-card border border-glass-border flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-white/30" />
                  </div>
                  <p className="text-base font-medium">Your art cart is empty</p>
                  <p className="text-xs text-white/40 max-w-xs">
                    Explore our gallery and add original acrylic pieces or custom commissions to your collection.
                  </p>
                </div>
              ) : (
                items.map(({ art }) => (
                  <motion.div
                    key={art.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex gap-4 p-3.5 rounded-2xl bg-void-card border border-glass-border relative group"
                  >
                    <img
                      src={art.primaryImage}
                      alt={art.title}
                      className="w-20 h-24 object-cover rounded-xl border border-glass-border"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-semibold text-white group-hover:text-gold transition-colors line-clamp-1">
                          {art.title}
                        </h4>
                        <p className="text-xs text-white/50">{art.canvasSize}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm font-bold text-crimson">
                          {formatPrice(art.priceBDT, art.priceUSD)}
                        </span>
                        <button
                          onClick={() => removeItem(art.id)}
                          className="text-white/40 hover:text-crimson p-1.5 transition-colors rounded-lg hover:bg-crimson/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {items.length > 0 && (
              <div className="p-6 border-t border-glass-border bg-void/80 backdrop-blur-md space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-white/70">
                    <span>{t('subtotal')}</span>
                    <span className="font-semibold text-white">
                      {formatPrice(totalBDT, totalUSD)}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-white/50">
                    <span>Local Courier / Int. Shipping</span>
                    <span className="text-emerald-400">Calculated at Checkout</span>
                  </div>
                  <div className="h-px bg-glass-border my-2" />
                  <div className="flex justify-between text-base font-bold text-white">
                    <span>{t('total')}</span>
                    <span className="text-gold text-lg">
                      {formatPrice(totalBDT, totalUSD)}
                    </span>
                  </div>
                </div>

                <MagneticButton
                  variant="gold"
                  className="w-full py-4 text-base"
                  onClick={() => {
                    setIsCartOpen(false);
                    router.push('/checkout');
                  }}
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </MagneticButton>

                <p className="text-center text-[11px] text-white/40">
                  🔒 Secure bKash / Nagad / SSLCommerz & Stripe Encrypted
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
