'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useCart } from '@/lib/cart';
import { useCurrency } from '@/lib/currency';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Link } from '@/i18n/routing';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  ArrowRight,
  ShoppingBag,
  MessageSquare,
  Sparkles,
  Phone,
  Palette,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function CheckoutPage() {
  const t = useTranslations('checkout');
  const locale = useLocale();
  const { items, totalBDT, totalUSD, clearCart } = useCart();
  const { formatPrice } = useCurrency();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [division, setDivision] = useState('dhaka');
  const [notes, setNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) {
      setErrorMsg(
        locale === 'bn'
          ? 'অনুগ্রহ করে আপনার নাম এবং ফোন/হোয়াটসঅ্যাপ নম্বর লিখুন।'
          : 'Please enter your full name and phone/WhatsApp number.'
      );
      return;
    }

    if (items.length === 0) {
      setErrorMsg(
        locale === 'bn'
          ? 'আপনার কার্ট খালি। অনুগ্রহ করে পেইন্টিং নির্বাচন করুন।'
          : 'Your cart is empty. Please select an artwork.'
      );
      return;
    }

    setIsProcessing(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: fullName,
          phone,
          email,
          shippingAddress: address || 'Dhaka',
          division,
          notes,
          items: items.map((i) => ({
            id: i.art.id,
            title: i.art.title,
            priceBDT: i.art.priceBDT,
            priceUSD: i.art.priceUSD,
            quantity: i.quantity,
          })),
          totalBDT,
          totalUSD,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit inquiry');

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E60049', '#E6B93F', '#FFB0C1', '#FFFFFF'],
      });

      setOrderConfirmed({
        orderNumber: data.orderNumber,
        whatsappUrl: data.whatsappUrl,
        items: [...items],
      });

      clearCart();
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-void-card border border-glass-border text-gold backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#E60049]" />
          <span>
            {locale === 'bn' ? 'সরাসরি স্টুডিও অর্ডার ও ইনকোয়ারি' : 'Direct Studio Art Inquiry'}
          </span>
        </div>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-white">
          {locale === 'bn' ? 'অর্ডার ও কাস্টম ইনকোয়ারি' : 'Collector Order & Inquiry'}
        </h1>
        <p className="text-xs sm:text-sm text-white/60">
          {locale === 'bn'
            ? 'ফর্মটি পূরণ করুন অথবা সরাসরি হোয়াটসঅ্যাপে শিল্পী ফিহা ইসলামের সাথে কথা বলে কাস্টম প্রাইসিং ও ডেলিভারি নিশ্চিত করুন।'
            : 'Submit this form or connect directly with artist Fiha Islam on WhatsApp for custom pricing, framing, and delivery.'}
        </p>
      </div>

      {orderConfirmed ? (
        /* Order Confirmed Screen */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-[#1A030A]/90 via-void-card to-void border border-gold/40 text-center space-y-6 shadow-2xl max-w-2xl mx-auto"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
              {locale === 'bn' ? 'ইনকোয়ারি সফলভাবে গৃহীত হয়েছে!' : 'Inquiry Received Successfully!'}
            </h2>
            <p className="text-xs sm:text-sm text-white/70">
              {locale === 'bn'
                ? 'আপনার রেফারেন্স কোড:'
                : 'Your Inquiry Reference Code:'}{' '}
              <span className="font-mono font-bold text-gold">
                #{orderConfirmed.orderNumber}
              </span>
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-void-light border border-glass-border text-left space-y-2 text-xs">
            <div className="flex justify-between text-white/70">
              <span>Collector:</span>
              <span className="font-semibold text-white">{fullName}</span>
            </div>
            <div className="flex justify-between text-white/70">
              <span>Contact:</span>
              <span className="font-semibold text-gold">{phone}</span>
            </div>
            <div className="flex justify-between text-white/70">
              <span>Total Indicative:</span>
              <span className="font-bold text-[#E60049]">
                {formatPrice(totalBDT, totalUSD)}
              </span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            {orderConfirmed.whatsappUrl && (
              <a
                href={orderConfirmed.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold bg-[#25D366] text-black hover:bg-[#1EBE5D] shadow-lg transition-all"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>
                  {locale === 'bn'
                    ? 'হোয়াটসঅ্যাপে কথা বলুন'
                    : 'Chat on WhatsApp with Artist'}
                </span>
              </a>
            )}

            <Link href="/shop" className="w-full sm:w-auto">
              <MagneticButton variant="gold" className="w-full sm:w-auto text-xs py-3.5 px-6">
                <span>{locale === 'bn' ? 'আরও আর্ট দেখুন' : 'Explore More Art'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </MagneticButton>
            </Link>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-7 rounded-3xl p-6 sm:p-8 bg-void-card border border-glass-border shadow-xl space-y-6">
            <h3 className="font-display font-bold text-lg sm:text-xl text-white flex items-center gap-2">
              <Phone className="w-5 h-5 text-[#E60049]" />
              <span>
                {locale === 'bn'
                  ? 'আপনার যোগাযোগের তথ্য'
                  : 'Collector Information'}
              </span>
            </h3>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-crimson/20 border border-crimson/40 text-xs text-rose-300">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1.5">
                    {locale === 'bn' ? 'আপনার নাম *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={locale === 'bn' ? 'উদা: তাহমিদ ইসলাম' : 'e.g. Alex Morgan'}
                    className="w-full px-4 py-3 rounded-xl bg-void-light border border-glass-border text-sm text-white placeholder-white/30 focus:border-[#E60049] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1.5">
                    {locale === 'bn' ? 'ফোন / হোয়াটসঅ্যাপ নম্বর *' : 'Phone / WhatsApp *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+880 17XX-XXXXXX"
                    className="w-full px-4 py-3 rounded-xl bg-void-light border border-glass-border text-sm text-white placeholder-white/30 focus:border-[#E60049] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1.5">
                    {locale === 'bn' ? 'ইমেইল (ঐচ্ছিক)' : 'Email (Optional)'}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="collector@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-void-light border border-glass-border text-sm text-white placeholder-white/30 focus:border-[#E60049] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1.5">
                    {locale === 'bn' ? 'বিভাগ / শহর' : 'Division / City'}
                  </label>
                  <select
                    value={division}
                    onChange={(e) => setDivision(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-void-light border border-glass-border text-sm text-white focus:border-[#E60049] outline-none"
                  >
                    <option value="dhaka">Dhaka (ঢাকা)</option>
                    <option value="chittagong">Chittagong (চট্টগ্রাম)</option>
                    <option value="sylhet">Sylhet (সিলেট)</option>
                    <option value="rajshahi">Rajshahi (রাজশাহী)</option>
                    <option value="khulna">Khulna (খুলনা)</option>
                    <option value="international">International (আন্তর্জাতিক)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1.5">
                  {locale === 'bn' ? 'ডেলিভারি ঠিকানা' : 'Delivery Address'}
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={
                    locale === 'bn'
                      ? 'বাড়ি, রোড, এরিয়া, ঢাকা...'
                      : 'House, Road, Area, City...'
                  }
                  className="w-full px-4 py-3 rounded-xl bg-void-light border border-glass-border text-sm text-white placeholder-white/30 focus:border-[#E60049] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1.5">
                  {locale === 'bn'
                    ? 'কাস্টম রিকোয়ারমেন্ট / ফ্রেমের ধরন (ঐচ্ছিক)'
                    : 'Custom Framing / Specific Notes (Optional)'}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={
                    locale === 'bn'
                      ? 'ফ্রেমের কালার বা কোনো বিশেষ নির্দেশনা থাকলে লিখুন...'
                      : 'Mention preferred frame style, floating canvas, or delivery date...'
                  }
                  className="w-full px-4 py-3 rounded-xl bg-void-light border border-glass-border text-sm text-white placeholder-white/30 focus:border-[#E60049] outline-none"
                />
              </div>

              <div className="pt-2">
                <MagneticButton
                  type="submit"
                  disabled={isProcessing || items.length === 0}
                  variant="gold"
                  className="w-full py-4 text-sm font-bold"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>
                    {isProcessing
                      ? locale === 'bn'
                        ? 'প্রসেসিং হচ্ছে...'
                        : 'Submitting...'
                      : locale === 'bn'
                      ? 'অর্ডার ইনকোয়ারি পাঠান ও হোয়াটসঅ্যাপে কথা বলুন'
                      : 'Send Inquiry & Discuss on WhatsApp'}
                  </span>
                </MagneticButton>
              </div>
            </form>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-5 rounded-3xl p-6 sm:p-8 bg-void-card border border-glass-border shadow-xl space-y-6">
            <h3 className="font-display font-bold text-lg sm:text-xl text-white flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-gold" />
              <span>{locale === 'bn' ? 'নির্বাচিত আর্টওয়ার্ক' : 'Selected Artworks'}</span>
            </h3>

            {items.length === 0 ? (
              <div className="py-8 text-center text-xs text-white/40">
                {locale === 'bn' ? 'কার্টে কোনো আর্ট যোগ করা হয়নি।' : 'No artworks in cart.'}
              </div>
            ) : (
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                {items.map(({ art, quantity }) => (
                  <div
                    key={art.id}
                    className="p-3 rounded-2xl bg-void-light border border-glass-border flex items-center gap-3"
                  >
                    <img
                      src={art.primaryImage}
                      alt={art.title}
                      className="w-14 h-14 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">
                        {locale === 'bn' ? art.titleBn : art.title}
                      </h4>
                      <p className="text-[10px] text-white/50">
                        {locale === 'bn' ? art.canvasSizeBn : art.canvasSize}
                      </p>
                      <span className="text-xs font-mono font-bold text-[#FFB0C1]">
                        {formatPrice(art.priceBDT * quantity, art.priceUSD * quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-4 border-t border-glass-border space-y-2 text-xs">
              <div className="flex justify-between text-white/70">
                <span>{locale === 'bn' ? 'আনুমানিক মূল্য' : 'Estimated Base Price'}</span>
                <span className="font-bold text-white">
                  {formatPrice(totalBDT, totalUSD)}
                </span>
              </div>
              <div className="flex justify-between text-emerald-400">
                <span>{locale === 'bn' ? 'কাস্টম কনসালটেশন' : 'Studio Consultation'}</span>
                <span>{locale === 'bn' ? 'ফ্রি' : 'Free'}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#1A030A] border border-[#E60049]/30 text-[11px] text-white/70 space-y-1.5">
              <div className="flex items-center gap-1.5 text-gold font-semibold">
                <Palette className="w-3.5 h-3.5" />
                <span>100% Original Fine Art Guarantee</span>
              </div>
              <p className="leading-relaxed">
                {locale === 'bn'
                  ? 'সবগুলো পেইন্টিং শিল্পী ফিহা ইসলামের নিজ হাতে আঁকা অরিজিনাল মাস্টারপিস।'
                  : 'Every piece is an authentic original creation directly from Fiha Islam studio.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
