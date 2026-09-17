'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { COMMISSION_CANVAS_SIZES, COLOR_PALETTE_PRESETS } from '@/lib/art-data';
import { MagneticButton } from '@/components/ui/MagneticButton';
import confetti from 'canvas-confetti';
import {
  Palette,
  Layers,
  Sparkles,
  Upload,
  CheckCircle2,
  Phone,
  Mail,
  User,
  ArrowRight,
  ShieldCheck,
  MessageCircle,
  Loader2,
  FileCheck,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CommissionPage() {
  const t = useTranslations('commission');
  const locale = useLocale();
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState(COMMISSION_CANVAS_SIZES[2]); // 30x48 default
  const [selectedPalette, setSelectedPalette] = useState(COLOR_PALETTE_PRESETS[0]);
  const [wallPhoto, setWallPhoto] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedRef, setSubmittedRef] = useState('');
  const [whatsappLink, setWhatsappLink] = useState('');

  // Estimated Investment Calculation (Standard Studio Price)
  const estimatedBDT = selectedSize.basePriceBDT;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setWallPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !phone.trim() || !email.trim()) {
      setErrorMsg(
        locale === 'bn'
          ? 'অনুগ্রহ করে আপনার নাম, মোবাইল নম্বর ও ইমেইল পূরণ করুন।'
          : 'Please enter your name, phone number, and email address.'
      );
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    const payload = {
      canvasSize: selectedSize.size,
      colorTheme: selectedPalette.name,
      wallPhotoUrl: wallPhoto || '',
      visionDescription: description || '',
      fullName: clientName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      estimatedPrice: `৳${estimatedBDT.toLocaleString()}`,
    };

    try {
      // 1. Direct fetch to Google Apps Script Web App API
      const appsScriptUrl =
        process.env.NEXT_PUBLIC_APPS_SCRIPT_URL ||
        'https://script.google.com/macros/s/AKfycbyhE7UBrWkfQPQZZBqTXnObIqITWi7uh6MWwGN8Ac44GPLh9ic1mjtswiPS6Yv7lcWU8A/exec';

      if (appsScriptUrl) {
        fetch(appsScriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload),
        }).catch((err) => {
          console.warn('Apps script direct post note:', err);
        });
      }

      // 2. Submit to local server endpoint
      const res = await fetch('/api/commission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && (data.success || data.result === 'success')) {
        setSubmittedRef(data.commissionId || `COM-${Date.now().toString(36).toUpperCase()}`);
        setWhatsappLink(data.whatsappUrl || `https://wa.me/8801723722019`);
        setIsSuccess(true);
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#E60049', '#FFB0C1', '#E6B93F'],
        });
      } else {
        setErrorMsg(data.error || 'Failed to submit request');
      }
    } catch (err: any) {
      console.error('Submission error:', err);
      setErrorMsg(err.message || 'Something went wrong while submitting.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const [sizeCategoryFilter, setSizeCategoryFilter] = useState<'All' | 'Small' | 'Medium' | 'Large'>('All');

  // Filtered sizes based on category
  const filteredSizes = COMMISSION_CANVAS_SIZES.filter((item) =>
    sizeCategoryFilter === 'All' ? true : item.category === sizeCategoryFilter
  );

  return (
    <div className="min-h-screen pt-14 sm:pt-20 pb-28 sm:pb-16 px-3 sm:px-4 flex items-center justify-center relative">
      {/* Background Soft Ambient Light */}
      <div className="fixed inset-0 bg-[#0A0A0C]/90 backdrop-blur-md -z-10" />
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-gradient-to-tr from-[#E60049]/20 via-[#2B020A] to-[#FFB0C1]/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* POPUP MODAL CARD CONTAINER */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-xl rounded-3xl bg-[#0D0004]/95 border border-[#E60049]/40 shadow-2xl p-4 sm:p-6 backdrop-blur-2xl relative overflow-hidden"
      >
        {/* Modal Top Navigation Bar */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#E60049]/20 border border-[#E60049]/40 flex items-center justify-center text-[#FFB0C1]">
              <Palette className="w-3.5 h-3.5 text-[#E60049]" />
            </div>
            <div>
              <h2 className="font-display font-bold text-sm sm:text-base text-white">
                {locale === 'bn' ? 'কাস্টম আর্ট কমিশন' : 'Custom Canvas Commission'}
              </h2>
              <p className="text-[10px] text-white/50">
                {locale === 'bn' ? 'বিস্পোক ফাইন আর্ট স্টুডিও' : 'Bespoke Fine Art Studio'}
              </p>
            </div>
          </div>

          <button
            onClick={() => router.push('/shop')}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white/70 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Close / Back to Shop"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

      {isSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 sm:p-10 rounded-3xl bg-void-card/95 border border-[#E60049]/40 text-center space-y-5 shadow-2xl backdrop-blur-2xl max-w-xl mx-auto"
        >
          <div className="w-14 h-14 rounded-full bg-[#E60049]/20 border border-[#E60049]/40 text-[#FFB0C1] flex items-center justify-center mx-auto shadow-neon-crimson">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
          </div>

          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
              <FileCheck className="w-3 h-3" />
              <span>{locale === 'bn' ? 'গুগল শিটসে সংরক্ষিত' : 'Synced with Studio'}</span>
            </span>
            <h2 className="font-display font-black text-xl sm:text-2xl text-white">
              {t('successTitle')}
            </h2>
            <p className="text-xs text-white/70 max-w-md mx-auto leading-relaxed">
              {t('successMsg')}
            </p>
          </div>

          {/* Submission Summary Card */}
          <div className="p-4 rounded-2xl bg-void-light/80 border border-white/10 max-w-md mx-auto text-xs space-y-2 text-left backdrop-blur-md">
            <div className="flex justify-between text-white/70 pb-1.5 border-b border-white/10">
              <span>{locale === 'bn' ? 'রেফারেন্স আইডি:' : 'Reference ID:'}</span>
              <span className="font-mono font-bold text-[#FFB0C1]">{submittedRef}</span>
            </div>
            <div className="flex justify-between text-white/70">
              <span>{locale === 'bn' ? 'সংগ্রাহক:' : 'Client:'}</span>
              <span className="font-semibold text-white">{clientName}</span>
            </div>
            <div className="flex justify-between text-white/70">
              <span>{locale === 'bn' ? 'মোবাইল:' : 'Phone:'}</span>
              <span className="font-mono text-white">{phone}</span>
            </div>
            <div className="flex justify-between text-white/70">
              <span>{locale === 'bn' ? 'ক্যানভাস সাইজ:' : 'Canvas Size:'}</span>
              <span className="font-semibold text-gold">{selectedSize.size}</span>
            </div>
            <div className="flex justify-between text-white/70">
              <span>{locale === 'bn' ? 'কালার প্যালেট:' : 'Palette:'}</span>
              <span className="font-semibold text-[#FFB0C1]">{selectedPalette.name}</span>
            </div>
            <div className="flex justify-between text-white/70 pt-1.5 border-t border-white/10">
              <span>{locale === 'bn' ? 'আনুমানিক বাজেট:' : 'Estimated Price:'}</span>
              <span className="font-bold text-emerald-400 font-mono">
                ৳{estimatedBDT.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            {whatsappLink && (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-bold bg-[#25D366] hover:bg-[#1EBE5D] text-black shadow-lg shadow-emerald-950/40 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{locale === 'bn' ? 'হোয়াটসঅ্যাপে কথা বলুন' : 'Chat on WhatsApp'}</span>
              </a>
            )}

            <button
              onClick={() => {
                setIsSuccess(false);
                setCurrentStep(1);
                setDescription('');
                setWallPhoto(null);
              }}
              className="px-5 py-3 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-xl transition-all cursor-pointer"
            >
              {locale === 'bn' ? 'নতুন কমিশন' : 'New Commission'}
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="max-w-2xl mx-auto space-y-4">
          {/* Ultra-Slim Step Progress Bar */}
          <div className="grid grid-cols-4 gap-1.5 p-1 rounded-2xl bg-void-card border border-glass-border backdrop-blur-md">
            {[
              { step: 1, label: locale === 'bn' ? '১. সাইজ' : '1. Size' },
              { step: 2, label: locale === 'bn' ? '২. কালার' : '2. Color' },
              { step: 3, label: locale === 'bn' ? '৩. ভিশন' : '3. Vision' },
              { step: 4, label: locale === 'bn' ? '৪. সাবমিট' : '4. Submit' },
            ].map((item) => (
              <button
                key={item.step}
                onClick={() => setCurrentStep(item.step)}
                className={`py-1.5 px-1 rounded-xl text-center text-[10px] sm:text-xs font-semibold transition-all cursor-pointer ${
                  currentStep === item.step
                    ? 'bg-gradient-to-r from-[#E60049] to-[#2B020A] text-white shadow-neon-crimson border border-[#E60049]/50'
                    : currentStep > item.step
                    ? 'bg-white/10 text-[#FFB0C1]'
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <span>⚠️ {errorMsg}</span>
            </div>
          )}

          {/* Step Content Panes */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {/* STEP 1: Choose Canvas Size (Clean Luxury Square Cards) */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-3.5 sm:p-5 rounded-3xl bg-void-card/90 border border-glass-border space-y-3.5 backdrop-blur-xl"
                >
                  {/* Header + Category Tabs */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-gold">
                      <Layers className="w-3.5 h-3.5" />
                      <h3 className="font-semibold text-xs uppercase tracking-wider">
                        {t('step1')}
                      </h3>
                    </div>

                    {/* Category Filter Chips */}
                    <div className="flex items-center gap-1 p-0.5 rounded-xl bg-void-light border border-white/10 text-[10px]">
                      {(['All', 'Small', 'Medium', 'Large'] as const).map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setSizeCategoryFilter(cat)}
                          className={`px-2 py-0.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
                            sizeCategoryFilter === cat
                              ? 'bg-[#E60049] text-white shadow-sm font-semibold'
                              : 'text-white/60 hover:text-white'
                          }`}
                        >
                          {cat === 'All'
                            ? locale === 'bn' ? 'সব' : 'All'
                            : cat === 'Small'
                            ? locale === 'bn' ? 'স্মল' : 'Small'
                            : cat === 'Medium'
                            ? locale === 'bn' ? 'মিডিয়াম' : 'Med'
                            : locale === 'bn' ? 'লার্জ' : 'Large'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Square Cards Grid (3 cols on mobile, 4 cols on desktop) */}
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-[300px] sm:max-h-[340px] overflow-y-auto p-1 scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-[#E60049]/40">
                    {filteredSizes.map((size) => {
                      const isSelected = selectedSize.id === size.id;
                      return (
                        <div
                          key={size.id}
                          onClick={() => setSelectedSize(size)}
                          className={`aspect-square rounded-2xl border transition-all cursor-pointer flex flex-col items-center justify-between p-2 text-center relative group ${
                            isSelected
                              ? 'bg-gradient-to-b from-[#E60049]/30 to-[#1A0008] border-[#E60049] shadow-neon-crimson ring-1 ring-[#E60049]/80 scale-[1.02]'
                              : 'bg-void-light/50 border-glass-border hover:border-white/30 hover:bg-white/[0.04]'
                          }`}
                        >
                          {/* Top: Category or Active Indicator */}
                          <div className="w-full flex items-center justify-between text-[8px] font-mono text-white/40">
                            <span>{size.category}</span>
                            {isSelected && (
                              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                            )}
                          </div>

                          {/* Center: Clean Bold Size */}
                          <div className="my-auto py-0.5">
                            <h4 className="font-display font-black text-xs sm:text-sm text-white group-hover:text-[#FFB0C1] transition-colors leading-tight">
                              {locale === 'bn' ? size.sizeBn : size.size}
                            </h4>
                          </div>

                          {/* Bottom: Price Tag */}
                          <div className="w-full pt-1 border-t border-white/10 flex items-center justify-center">
                            <span className="font-mono font-bold text-emerald-400 text-[10px] sm:text-[11px]">
                              ৳{size.basePriceBDT.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Negotiation / Budget Note */}
                  <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-[10px] text-white/60">
                    <div className="flex items-center gap-1.5 text-gold">
                      <Sparkles className="w-3 h-3 shrink-0" />
                      <span>{locale === 'bn' ? 'বাজেট ও ফ্রেম সাইজ আলোচনা সাপেক্ষে পরিবর্তনযোগ্য' : 'Budget and sizes adaptable upon discussion'}</span>
                    </div>
                  </div>

                  {/* Next Button */}
                  <div className="pt-1 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-[#E60049] to-[#2B020A] text-white shadow-neon-crimson border border-[#E60049]/50 hover:border-[#FFB0C1] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>{locale === 'bn' ? 'পরবর্তী ধাপ: কালার নির্বাচন' : 'Next: Choose Palette'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Select Palette (Clean Luxury Square Cards) */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-3.5 sm:p-5 rounded-3xl bg-void-card/90 border border-glass-border space-y-3.5 backdrop-blur-xl"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-gold">
                      <Palette className="w-3.5 h-3.5" />
                      <h3 className="font-semibold text-xs uppercase tracking-wider">
                        {t('step2')}
                      </h3>
                    </div>
                    <span className="text-[10px] text-white/50 font-mono">
                      {locale === 'bn' ? '৮টি কালার থিম' : '8 Curated Palettes'}
                    </span>
                  </div>

                  {/* Square Palette Cards Grid (2 cols on mobile, 4 cols on desktop) */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-[300px] sm:max-h-[340px] overflow-y-auto p-1 scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-[#E60049]/40">
                    {COLOR_PALETTE_PRESETS.map((pal) => {
                      const isSelected = selectedPalette.id === pal.id;
                      return (
                        <div
                          key={pal.id}
                          onClick={() => setSelectedPalette(pal)}
                          className={`aspect-square rounded-2xl border transition-all cursor-pointer flex flex-col items-center justify-between p-2.5 text-center relative group ${
                            isSelected
                              ? 'bg-gradient-to-b from-[#E60049]/30 to-[#1A0008] border-[#E60049] shadow-neon-crimson ring-1 ring-[#E60049]/80 scale-[1.02]'
                              : 'bg-void-light/50 border-glass-border hover:border-white/30 hover:bg-white/[0.04]'
                          }`}
                        >
                          {/* Top: Selection indicator */}
                          <div className="w-full flex items-center justify-end">
                            {isSelected ? (
                              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                            ) : (
                              <span className="w-1.5 h-1.5" />
                            )}
                          </div>

                          {/* Center: 2x2 Clean Color Grid */}
                          <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-black/40 border border-white/10 my-auto shadow-inner">
                            {pal.colors.slice(0, 4).map((c, i) => (
                              <span
                                key={i}
                                className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border border-white/20 shadow-sm"
                                style={{ backgroundColor: c }}
                                title={c}
                              />
                            ))}
                          </div>

                          {/* Bottom: Palette Title */}
                          <div className="w-full pt-1">
                            <h4 className="font-semibold text-[11px] sm:text-xs text-white group-hover:text-[#FFB0C1] transition-colors truncate">
                              {locale === 'bn' ? pal.nameBn : pal.name}
                            </h4>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-1 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="px-4 py-2 rounded-full text-xs text-white/60 hover:text-white cursor-pointer"
                    >
                      {locale === 'bn' ? 'পূর্ববর্তী' : 'Back'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="px-5 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-[#E60049] to-[#2B020A] text-white shadow-neon-crimson border border-[#E60049]/50 hover:border-[#FFB0C1] transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>{locale === 'bn' ? 'পরবর্তী ধাপ: ভিশন' : 'Next: Vision'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Wall Photo & Vision Description */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-3.5 sm:p-5 rounded-3xl bg-void-card/90 border border-glass-border space-y-3.5 backdrop-blur-xl"
                >
                  <div className="flex items-center gap-1.5 text-gold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <h3 className="font-semibold text-xs uppercase tracking-wider">
                      {t('step3')}
                    </h3>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] text-white/70 block">
                      {t('descriptionLabel')}
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      placeholder={t('descriptionPlaceholder')}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-void-light border border-glass-border text-white text-xs focus:border-[#E60049] outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] text-white/70 block">{t('uploadLabel')}</label>
                    <div className="border-2 border-dashed border-glass-border hover:border-[#E60049] rounded-xl p-4 text-center cursor-pointer relative bg-void-light/50 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      {wallPhoto ? (
                        <div className="space-y-1.5">
                          <img
                            src={wallPhoto}
                            alt="Wall Preview"
                            className="h-20 mx-auto rounded-lg object-cover"
                          />
                          <p className="text-[10px] text-emerald-400">
                            ✓ {locale === 'bn' ? 'ছবি যুক্ত হয়েছে' : 'Photo Attached'}
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-1 text-white/50">
                          <Upload className="w-5 h-5 mx-auto text-gold" />
                          <p className="text-[11px]">
                            {locale === 'bn'
                              ? 'ওয়াল বা ইন্টেরিয়রের ছবি আপলোড করুন (ঐচ্ছিক)'
                              : 'Upload interior photo (optional)'}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-1 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-4 py-2 rounded-full text-xs text-white/60 hover:text-white cursor-pointer"
                    >
                      {locale === 'bn' ? 'পূর্ববর্তী' : 'Back'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(4)}
                      className="px-5 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-[#E60049] to-[#2B020A] text-white shadow-neon-crimson border border-[#E60049]/50 hover:border-[#FFB0C1] transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>{locale === 'bn' ? 'পরবর্তী ধাপ: তথ্য ও সারসংক্ষেপ' : 'Next: Review & Submit'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Client Info & Final Commission Summary Review */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-3.5 sm:p-6 rounded-3xl bg-void-card/90 border border-glass-border space-y-4 backdrop-blur-xl"
                >
                  <div className="flex items-center gap-1.5 text-gold">
                    <User className="w-3.5 h-3.5" />
                    <h3 className="font-semibold text-xs uppercase tracking-wider">
                      {t('step4')}
                    </h3>
                  </div>

                  {/* Summary Review Card Inside Step 4 */}
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-void-light/80 border border-white/10 text-xs space-y-2.5 backdrop-blur-md">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="font-bold text-white flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-gold" />
                        {locale === 'bn' ? 'কমিশন সারসংক্ষেপ' : 'Commission Summary'}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                        100% Signed Original
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] text-white/70">
                      <div>
                        <span className="text-white/40 block text-[9px] uppercase font-mono">{locale === 'bn' ? 'সাইজ' : 'Size'}</span>
                        <span className="font-bold text-gold font-mono">{selectedSize.size}</span>
                      </div>
                      <div>
                        <span className="text-white/40 block text-[9px] uppercase font-mono">{locale === 'bn' ? 'কালার থিম' : 'Palette'}</span>
                        <span className="font-semibold text-[#FFB0C1]">{selectedPalette.name}</span>
                      </div>
                    </div>

                    <div className="flex items-baseline justify-between pt-1 border-t border-white/10">
                      <span className="text-white/60 text-[11px]">{locale === 'bn' ? 'আনুমানিক বাজেট (আলোচনা সাপেক্ষে):' : 'Estimated Price (Negotiable):'}</span>
                      <span className="text-lg sm:text-xl font-mono font-black text-emerald-400">
                        ৳{estimatedBDT.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Contact Form Fields */}
                  <div className="space-y-2.5">
                    <div>
                      <label className="text-[11px] text-white/70 block mb-1">
                        {t('clientName')} *
                      </label>
                      <div className="relative">
                        <User className="w-3.5 h-3.5 text-white/40 absolute left-3 top-3" />
                        <input
                          type="text"
                          required
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder="e.g. Tanvir Ahmed"
                          className="w-full pl-9 pr-3 py-2 rounded-xl bg-void-light border border-glass-border text-white text-xs focus:border-[#E60049] outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] text-white/70 block mb-1">
                        {t('phone')} *
                      </label>
                      <div className="relative">
                        <Phone className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-3" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="017XXXXXXXX"
                          className="w-full pl-9 pr-3 py-2 rounded-xl bg-void-light border border-glass-border text-white text-xs focus:border-[#E60049] outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] text-white/70 block mb-1">
                        {t('email')} *
                      </label>
                      <div className="relative">
                        <Mail className="w-3.5 h-3.5 text-[#FFB0C1] absolute left-3 top-3" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="tanvir@example.com"
                          className="w-full pl-9 pr-3 py-2 rounded-xl bg-void-light border border-glass-border text-white text-xs focus:border-[#E60049] outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-between items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="px-4 py-2 rounded-full text-xs text-white/60 hover:text-white cursor-pointer"
                    >
                      {locale === 'bn' ? 'পূর্ববর্তী' : 'Back'}
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-7 py-3 rounded-full text-xs font-bold bg-gradient-to-r from-[#E60049] to-[#2B020A] text-white shadow-neon-crimson border border-[#E60049]/50 hover:border-[#FFB0C1] disabled:opacity-50 flex items-center gap-2 transition-all cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-[#FFB0C1]" />
                          <span>{locale === 'bn' ? 'সংরক্ষণ হচ্ছে...' : 'Submitting...'}</span>
                        </>
                      ) : (
                        <>
                          <span>{locale === 'bn' ? 'কমিশন রিকোয়েস্ট সাবমিট করুন' : 'Submit Commission'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      )}
      </motion.div>
    </div>
  );
}
