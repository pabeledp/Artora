'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useCart } from '@/lib/cart';
import { useCurrency } from '@/lib/currency';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Link, useRouter } from '@/i18n/routing';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShoppingBag,
  Smartphone,
  Globe,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CheckoutPage() {
  const t = useTranslations('checkout');
  const locale = useLocale();
  const { items, totalBDT, totalUSD, clearCart } = useCart();
  const { currency, formatPrice } = useCurrency();
  const router = useRouter();

  const [checkoutTab, setCheckoutTab] = useState<'local' | 'global'>('local');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [division, setDivision] = useState('dhaka');
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad' | 'card' | 'cod'>('bkash');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Shipping fee logic:
  // Local: Dhaka = ৳120, Outside Dhaka = ৳150 ($1.5 USD)
  // Global: $45 USD flat international courier crating
  const localShippingBDT = division === 'dhaka' ? 120 : 150;
  const globalShippingUSD = 45;

  const currentShippingBDT = checkoutTab === 'local' ? localShippingBDT : 5000;
  const currentShippingUSD = checkoutTab === 'local' ? (division === 'dhaka' ? 1.2 : 1.5) : globalShippingUSD;

  const finalBDT = totalBDT + currentShippingBDT;
  const finalUSD = Math.round(totalUSD + currentShippingUSD);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address) {
      setErrorMsg('Please enter your full name, phone number, and delivery address.');
      return;
    }

    if (items.length === 0) {
      setErrorMsg('Your cart is empty. Please add artwork before checking out.');
      return;
    }

    setIsProcessing(true);
    setErrorMsg('');

    try {
      // Step 1: Create Order in Prisma DB
      const orderRes = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: fullName,
          phone,
          email,
          paymentMethod: checkoutTab === 'global' ? 'Stripe' : paymentMethod,
          shippingAddress: address,
          division,
          items: items.map((i) => ({
            id: i.art.id,
            title: i.art.title,
            priceBDT: i.art.priceBDT,
            priceUSD: i.art.priceUSD,
            quantity: i.quantity,
          })),
          totalBDT: finalBDT,
          totalUSD: finalUSD,
          currency: checkoutTab === 'global' ? 'USD' : 'BDT',
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.error || 'Failed to create order');

      // Step 2: Trigger Payment Gateway Stub
      if (checkoutTab === 'local') {
        const payRes = await fetch('/api/payment/sslcommerz', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderNumber: orderData.orderNumber,
            totalBDT: finalBDT,
            customerName: fullName,
            phone,
            email,
            method: paymentMethod,
          }),
        });
        await payRes.json();
      } else {
        const payRes = await fetch('/api/payment/stripe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderNumber: orderData.orderNumber,
            totalUSD: finalUSD,
            customerName: fullName,
            email,
          }),
        });
        await payRes.json();
      }

      setOrderConfirmed(orderData);
      clearCart();

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FF2A5F', '#E6B93F', '#7C3AED'],
      });
    } catch (err: any) {
      setErrorMsg(err.message || 'Payment processing failed');
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderConfirmed) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 sm:p-12 rounded-3xl bg-void-card border border-gold/40 text-center space-y-6 shadow-neon-gold"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h2 className="font-display font-black text-3xl text-white">
            {t('orderSuccess')}
          </h2>
          <p className="text-sm text-white/70">
            {t('orderSuccessDesc')}{' '}
            <span className="font-mono font-bold text-gold">
              {orderConfirmed.orderNumber}
            </span>
          </p>

          <div className="p-4 rounded-2xl bg-void-light border border-glass-border text-xs space-y-2 text-left">
            <div className="flex justify-between text-white/70">
              <span>Customer:</span>
              <span className="font-semibold text-white">{fullName}</span>
            </div>
            <div className="flex justify-between text-white/70">
              <span>Delivery Courier:</span>
              <span className="font-semibold text-crimson">
                {checkoutTab === 'local' ? 'Pathao Logistics BD' : 'DHL Express International'}
              </span>
            </div>
            <div className="flex justify-between text-white/70">
              <span>Payment Gateway:</span>
              <span className="font-semibold text-gold">
                {checkoutTab === 'global' ? 'Stripe Secured' : `${paymentMethod.toUpperCase()} (SSLCommerz)`}
              </span>
            </div>
          </div>

          <Link href="/shop">
            <MagneticButton variant="gold" className="mt-4">
              <span>Continue Exploring Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <h1 className="font-display font-black text-3xl sm:text-4xl text-white">
          {t('title')}
        </h1>
        <p className="text-xs sm:text-sm text-white/60">{t('subtitle')}</p>
      </div>

      {items.length === 0 ? (
        <div className="p-12 rounded-3xl bg-void-card border border-glass-border text-center space-y-4 max-w-lg mx-auto">
          <ShoppingBag className="w-12 h-12 text-white/30 mx-auto" />
          <h3 className="text-lg font-bold text-white">Your cart is empty</h3>
          <p className="text-xs text-white/50">
            Browse our original acrylic artworks and add them to your cart.
          </p>
          <Link href="/shop">
            <MagneticButton variant="primary">
              <span>Explore Gallery</span>
            </MagneticButton>
          </Link>
        </div>
      ) : (
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Checkout Details & Gateways */}
          <div className="lg:col-span-7 space-y-6">
            {/* Gateway Region Tabs */}
            <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-void-card border border-glass-border backdrop-blur-md">
              <button
                type="button"
                onClick={() => setCheckoutTab('local')}
                className={`py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  checkoutTab === 'local'
                    ? 'bg-crimson text-white shadow-neon-crimson'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>{t('tabLocal')}</span>
              </button>

              <button
                type="button"
                onClick={() => setCheckoutTab('global')}
                className={`py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  checkoutTab === 'global'
                    ? 'bg-violet text-white shadow-neon-violet'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span>{t('tabGlobal')}</span>
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-crimson/20 border border-crimson text-xs text-crimson">
                {errorMsg}
              </div>
            )}

            {/* Customer Details Form */}
            <div className="p-6 sm:p-8 rounded-3xl bg-void-card border border-glass-border space-y-4">
              <h3 className="font-display font-bold text-lg text-white">
                {t('contactInfo')}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-white/70 block mb-1">{t('fullName')}</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Fiha Islam"
                    className="w-full px-4 py-3 rounded-xl bg-void-light border border-glass-border text-sm text-white focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-white/70 block mb-1">{t('phone')}</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full px-4 py-3 rounded-xl bg-void-light border border-glass-border text-sm text-white focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-white/70 block mb-1">{t('email')}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-void-light border border-glass-border text-sm text-white focus:border-gold focus:outline-none"
                />
              </div>

              {checkoutTab === 'local' && (
                <div>
                  <label className="text-xs text-white/70 block mb-1">{t('division')}</label>
                  <select
                    value={division}
                    onChange={(e) => setDivision(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-void-light border border-glass-border text-sm text-white focus:border-gold focus:outline-none"
                  >
                    <option value="dhaka">{t('divisions.dhaka')}</option>
                    <option value="chittagong">{t('divisions.chittagong')}</option>
                    <option value="sylhet">{t('divisions.sylhet')}</option>
                    <option value="rajshahi">{t('divisions.rajshahi')}</option>
                    <option value="khulna">{t('divisions.khulna')}</option>
                    <option value="barisal">{t('divisions.barisal')}</option>
                    <option value="rangpur">{t('divisions.rangpur')}</option>
                    <option value="mymensingh">{t('divisions.mymensingh')}</option>
                  </select>
                </div>
              )}

              <div>
                <label className="text-xs text-white/70 block mb-1">{t('shippingAddress')}</label>
                <textarea
                  rows={2}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House, Road, Area, City..."
                  className="w-full p-4 rounded-xl bg-void-light border border-glass-border text-sm text-white focus:border-gold focus:outline-none"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="p-6 sm:p-8 rounded-3xl bg-void-card border border-glass-border space-y-4">
              <h3 className="font-display font-bold text-lg text-white">
                {t('paymentMethod')}
              </h3>

              {checkoutTab === 'local' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { key: 'bkash', label: t('bkash'), icon: '🌸' },
                    { key: 'nagad', label: t('nagad'), icon: '🔥' },
                    { key: 'card', label: t('card'), icon: '💳' },
                    { key: 'cod', label: t('cod'), icon: '🚚' },
                  ].map((m) => (
                    <div
                      key={m.key}
                      onClick={() => setPaymentMethod(m.key as any)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                        paymentMethod === m.key
                          ? 'bg-crimson/20 border-crimson shadow-neon-crimson'
                          : 'bg-void-light border-glass-border hover:border-white/20'
                      }`}
                    >
                      <span className="text-xl">{m.icon}</span>
                      <span className="text-xs font-semibold text-white">{m.label}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-5 rounded-2xl bg-void-light border border-violet/40 space-y-3">
                  <div className="flex items-center gap-2 text-violet font-bold text-sm">
                    <CreditCard className="w-5 h-5" />
                    <span>Stripe Global Secure Payment</span>
                  </div>
                  <p className="text-xs text-white/60">
                    Visa, Mastercard, American Express, Apple Pay, Google Pay enabled with 256-bit encryption.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Order Summary & Place Order */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-void-card border border-glass-border shadow-xl space-y-4 sticky top-28">
              <h3 className="font-display font-bold text-lg text-white">
                {t('orderSummary')}
              </h3>

              {/* Items List */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {items.map(({ art, quantity }) => (
                  <div key={art.id} className="flex gap-3 py-2 border-b border-glass-border">
                    <img
                      src={art.primaryImage}
                      alt={art.title}
                      className="w-12 h-14 object-cover rounded-lg"
                    />
                    <div className="flex-1 text-xs">
                      <h5 className="font-bold text-white">{art.title}</h5>
                      <span className="text-white/50">{art.canvasSize}</span>
                      <div className="text-crimson font-bold mt-1">
                        {formatPrice(art.priceBDT, art.priceUSD)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cost Calculations */}
              <div className="space-y-2 text-xs pt-2">
                <div className="flex justify-between text-white/70">
                  <span>{t('subtotal')}</span>
                  <span className="font-semibold text-white">
                    {formatPrice(totalBDT, totalUSD)}
                  </span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>{t('shippingFee')}</span>
                  <span className="font-semibold text-emerald-400">
                    {checkoutTab === 'local' ? `৳${localShippingBDT}` : `$${globalShippingUSD}`}
                  </span>
                </div>
                <div className="h-px bg-glass-border my-2" />
                <div className="flex justify-between text-base font-bold text-white">
                  <span>{t('total')}</span>
                  <span className="text-gold text-xl">
                    {checkoutTab === 'local' ? `৳${finalBDT.toLocaleString()}` : `$${finalUSD}`}
                  </span>
                </div>
              </div>

              <MagneticButton
                type="submit"
                variant="gold"
                disabled={isProcessing}
                className="w-full py-4 text-base"
              >
                <Lock className="w-4 h-4" />
                <span>{isProcessing ? t('processing') : t('placeOrder')}</span>
              </MagneticButton>

              <div className="p-3 rounded-xl bg-void-light border border-glass-border text-[11px] text-white/50 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
                <span>Protected by SSLCommerz & Stripe 256-bit SSL</span>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
