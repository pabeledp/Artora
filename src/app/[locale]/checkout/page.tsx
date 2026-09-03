'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useCart } from '@/lib/cart';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Link } from '@/i18n/routing';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ShoppingBag,
  MessageSquare,
  Sparkles,
  Phone,
  FileCheck,
  Loader2,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function CheckoutPage() {
  const t = useTranslations('checkout');
  const locale = useLocale();
  const { items, totalBDT, clearCart } = useCart();

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
    if (!fullName.trim() || !phone.trim()) {
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

    const itemTitles = items.map((i) => `${i.art.title} (${i.quantity || 1}x)`).join(', ');
    const appsScriptPayload = {
      canvasSize: itemTitles || 'Gallery Collection',
      colorTheme: 'Collector Order Inquiry',
      wallPhotoUrl: items[0]?.art?.primaryImage || 'No Photo Attached',
      visionDescription: `[Collector Inquiry] Address: ${address || 'Dhaka'} (${division}) | Notes: ${notes || 'Standard Delivery'}`,
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim() || 'N/A',
      estimatedPrice: `৳${totalBDT.toLocaleString()}`,
      submittedAt: new Date().toISOString(),
    };

    try {
      // 1. Direct fetch to Google Apps Script Web App (Client-side)
      const appsScriptUrl =
        process.env.NEXT_PUBLIC_APPS_SCRIPT_URL ||
        'https://script.google.com/macros/s/AKfycbyhE7UBrWkfQPQZZBqTXnObIqITWi7uh6MWwGN8Ac44GPLh9ic1mjtswiPS6Yv7lcWU8A/exec';

      if (appsScriptUrl) {
        fetch(appsScriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(appsScriptPayload),
        }).catch((gasErr) => {
          console.warn('Apps script direct post from checkout note:', gasErr);
        });
      }

      // 2. Submit to local server endpoint (Server-side + SQLite + DB sync)
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: fullName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          shippingAddress: address || 'Dhaka',
          division,
          notes,
          items: items.map((i) => ({
            id: i.art.id,
            title: i.art.title,
            priceBDT: i.art.priceBDT,
            quantity: i.quantity,
          })),
          totalBDT,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit inquiry');

      confetti({
        particleCount: 100,
        spread: 80,
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
      console.error('Checkout submission error:', err);
      setErrorMsg(err.message || 'Something went wrong');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-void-card border border-[#E60049]/40 text-[#FFB0C1] shadow-neon-crimson backdrop-blur-md">
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
          className="p-8 sm:p-12 rounded-3xl bg-void-card/95 border border-[#E60049]/40 text-center space-y-6 shadow-2xl max-w-2xl mx-auto backdrop-blur-2xl"
        >
          <div className="w-16 h-16 rounded-full bg-[#E60049]/20 border border-[#E60049]/40 text-[#FFB0C1] flex items-center justify-center mx-auto shadow-neon-crimson">
            <CheckCircle2 className="w-9 h-9 text-emerald-400" />
          </div>

          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
              <FileCheck className="w-3.5 h-3.5" />
              <span>{locale === 'bn' ? 'গুগল শিটস ও স্টুডিও সিস্টেমে সংরক্ষিত' : 'Synced with Google Sheets & Studio'}</span>
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
              {locale === 'bn' ? 'ইনকোয়ারি সফলভাবে গৃহীত হয়েছে!' : 'Inquiry Received Successfully!'}
            </h2>
            <p className="text-xs sm:text-sm text-white/70">
              {locale === 'bn'
                ? 'আপনার রেফারেন্স কোড:'
                : 'Your Inquiry Reference Code:'}{' '}
              <span className="font-mono font-bold text-[#FFB0C1]">
                #{orderConfirmed.orderNumber}
              </span>
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-void-light/80 border border-white/10 text-left space-y-2 text-xs backdrop-blur-md">
            <div className="flex justify-between text-white/70">
              <span>{locale === 'bn' ? 'সংগ্রাহকের নাম:' : 'Collector:'}</span>
              <span className="font-semibold text-white">{fullName}</span>
            </div>
            <div className="flex justify-between text-white/70">
              <span>{locale === 'bn' ? 'মোবাইল / হোয়াটসঅ্যাপ:' : 'Contact:'}</span>
              <span className="font-semibold text-white font-mono">{phone}</span>
            </div>
            <div className="flex justify-between text-white/70 pt-2 border-t border-white/10">
              <span>{locale === 'bn' ? 'মোট মূল্য (আলোচনা সাপেক্ষে):' : 'Estimated Total:'}</span>
              <span className="font-bold text-emerald-400 font-mono">
                ৳{totalBDT.toLocaleString()}
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
                    ? 'হোয়াটসঅ্যাপে সরাসরি কথা বলুন'
                    : 'Chat on WhatsApp with Artist'}
                </span>
              </a>
            )}

            <Link href="/shop" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-6 py-3.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-xl transition-all flex items-center justify-center gap-2">
                <span>{locale === 'bn' ? 'আরও আর্ট দেখুন' : 'Explore More Art'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-7 rounded-3xl p-6 sm:p-8 bg-void-card/90 border border-glass-border shadow-xl space-y-6 backdrop-blur-xl">
            <h3 className="font-display font-bold text-lg sm:text-xl text-white flex items-center gap-2">
              <Phone className="w-5 h-5 text-[#E60049]" />
              <span>{locale === 'bn' ? 'সংগ্রাহকের তথ্য' : 'Collector Information'}</span>
            </h3>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs">
                ⚠️ {errorMsg}
              </div>
            )}

            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1.5">
                    {locale === 'bn' ? 'পূর্ণ নাম *' : 'Full Name *'}
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
                    <option value="barisal">Barisal (বরিশাল)</option>
                    <option value="rangpur">Rangpur (রংপুর)</option>
                    <option value="mymensingh">Mymensingh (ময়মনসিংহ)</option>
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
                <button
                  type="submit"
                  disabled={isProcessing || items.length === 0}
                  className="w-full py-4 rounded-full text-xs sm:text-sm font-bold bg-gradient-to-r from-[#E60049] to-[#2B020A] text-white shadow-neon-crimson border border-[#E60049]/50 hover:border-[#FFB0C1] disabled:opacity-50 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#FFB0C1]" />
                      <span>{locale === 'bn' ? 'সংরক্ষণ ও প্রসেসিং হচ্ছে...' : 'Submitting to Sheets...'}</span>
                    </>
                  ) : (
                    <>
                      <MessageSquare className="w-4 h-4" />
                      <span>
                        {locale === 'bn'
                          ? 'অর্ডার ইনকোয়ারি পাঠান ও হোয়াটসঅ্যাপে কথা বলুন'
                          : 'Send Inquiry & Discuss on WhatsApp'}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-5 rounded-3xl p-6 sm:p-8 bg-void-card/90 border border-glass-border shadow-xl space-y-6 backdrop-blur-xl">
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
                        {locale === 'bn' ? art.canvasSizeBn : art.canvasSize} ({quantity}x)
                      </p>
                      <p className="text-xs font-mono font-bold text-emerald-400 mt-1">
                        ৳{(art.priceBDT * quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-4 border-t border-glass-border space-y-2 text-xs">
              <div className="flex justify-between text-white/70">
                <span>{locale === 'bn' ? 'আনুমানিক মূল্য:' : 'Estimated Base Price'}</span>
                <span className="font-mono font-bold text-white">
                  ৳{totalBDT.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>{locale === 'bn' ? 'স্টুডিও কনসাল্টেশন:' : 'Studio Consultation'}</span>
                <span className="text-emerald-400 font-semibold">{locale === 'bn' ? 'ফ্রি' : 'Free'}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-void-light/80 border border-white/10 space-y-1 text-xs text-white/60">
              <div className="flex items-center gap-1.5 text-gold font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{locale === 'bn' ? '১০০% অরিজিনাল ফাইন আর্ট গ্যারান্টি' : '100% Original Fine Art Guarantee'}</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                {locale === 'bn'
                  ? 'প্রতিটি শিল্পকর্ম শিল্পী ফিহা ইসলামের স্বহস্তে অঙ্কিত এবং খাঁটি প্রামাণ্য সার্টিফিকেটসহ প্রেরিত হয়।'
                  : 'Every piece is an authentic original creation directly from Fiha Islam studio.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
