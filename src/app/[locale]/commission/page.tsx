'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
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
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CommissionPage() {
  const t = useTranslations('commission');
  const locale = useLocale();

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
    <div className="min-h-screen pt-16 sm:pt-24 pb-36 md:pb-20 px-3 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Compact Studio Header (Ultra-sleek on Mobile) */}
      <div className="text-center max-w-xl mx-auto mb-4 sm:mb-6 space-y-1">
        <h1 className="font-display font-black text-lg sm:text-2xl md:text-3xl text-white tracking-tight">
          {locale === 'bn'
            ? 'কাস্টম আর্ট কমিশন ও বিস্পোক পেইন্টিং'
            : 'Bespoke Custom Artwork Commission'}
        </h1>
        <p className="text-[11px] sm:text-xs text-white/60 leading-tight">
          {locale === 'bn'
            ? 'পছন্দের সাইজ ও কালার প্যালেটে সরাসরি তৈরি করিয়ে নিন প্রামাণ্য ক্যানভাস'
            : 'Handcrafted 3D calligraphy and heavy impasto tailored to your space'}
        </p>
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ===================== LEFT: STEPPER & CONTROLS ===================== */}
          <div className="lg:col-span-7 space-y-4">
            {/* Ultra-Slim Step Progress Bar */}
            <div className="grid grid-cols-4 gap-1.5 p-1 rounded-2xl bg-void-card border border-glass-border backdrop-blur-md">
              {[
                { step: 1, label: locale === 'bn' ? '১. সাইজ' : '1. Size' },
                { step: 2, label: locale === 'bn' ? '২. কালার' : '2. Color' },
                { step: 3, label: locale === 'bn' ? '৩. ভিশন' : '3. Vision' },
                { step: 4, label: locale === 'bn' ? '৪. তথ্য' : '4. Contact' },
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
                {/* STEP 1: Choose Canvas Size (Ultra-compact mini chips) */}
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

                    {/* Mini Size Chips Grid (Ultra compact, fits cleanly without taking over whole screen) */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[280px] sm:max-h-[320px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-[#E60049]/40">
                      {filteredSizes.map((size) => {
                        const isSelected = selectedSize.id === size.id;
                        return (
                          <div
                            key={size.id}
                            onClick={() => setSelectedSize(size)}
                            className={`p-2 sm:p-2.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between relative group ${
                              isSelected
                                ? 'bg-gradient-to-b from-[#E60049]/25 to-[#1A0008] border-[#E60049] shadow-neon-crimson ring-1 ring-[#E60049]/70'
                                : 'bg-void-light/50 border-glass-border hover:border-white/30 hover:bg-white/[0.04]'
                            }`}
                          >
                            {/* Top row: Size & Selection Indicator */}
                            <div className="flex items-center justify-between gap-1">
                              <span className="font-display font-bold text-xs text-white group-hover:text-[#FFB0C1] transition-colors truncate">
                                {locale === 'bn' ? size.sizeBn : size.size}
                              </span>
                              {isSelected ? (
                                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse shrink-0" />
                              ) : (
                                <span className="text-[8px] font-mono text-white/40">{size.category[0]}</span>
                              )}
                            </div>

                            {/* Bottom row: Estimated Price */}
                            <div className="pt-1 mt-1 border-t border-white/5 flex items-center justify-between text-[10px]">
                              <span className="text-white/40 text-[9px] font-mono">
                                {locale === 'bn' ? 'আনুমানিক' : 'Est.'}
                              </span>
                              <span className="font-mono font-bold text-emerald-400 text-[11px]">
                                ৳{size.basePriceBDT.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Negotiation / Budget Note */}
                    <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-1.5 text-[10px] text-white/60">
                      <Sparkles className="w-3 h-3 text-gold shrink-0" />
                      <span>{locale === 'bn' ? 'বাজেট ও সাইজ আলোচনা সাপেক্ষে পরিবর্তনযোগ্য' : 'Budget and custom sizes are negotiable'}</span>
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

                {/* STEP 2: Select Palette (Ultra Compact 2-Col Grid) */}
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

                    {/* Compact Palette Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[280px] sm:max-h-[320px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-[#E60049]/40">
                      {COLOR_PALETTE_PRESETS.map((pal) => {
                        const isSelected = selectedPalette.id === pal.id;
                        return (
                          <div
                            key={pal.id}
                            onClick={() => setSelectedPalette(pal)}
                            className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
                              isSelected
                                ? 'bg-gradient-to-b from-[#E60049]/25 to-[#1A0008] border-[#E60049] shadow-neon-crimson ring-1 ring-[#E60049]/70'
                                : 'bg-void-light/50 border-glass-border hover:border-white/30 hover:bg-white/[0.04]'
                            }`}
                          >
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5">
                                <h4 className="font-semibold text-xs text-white truncate">
                                  {locale === 'bn' ? pal.nameBn : pal.name}
                                </h4>
                                {isSelected && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 animate-pulse" />
                                )}
                              </div>
                              <p className="text-[9px] text-white/40 truncate mt-0.5">
                                {pal.description}
                              </p>
                            </div>

                            {/* Color Swatches */}
                            <div className="flex items-center gap-1 shrink-0">
                              {pal.colors.slice(0, 4).map((c, i) => (
                                <span
                                  key={i}
                                  className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm shrink-0"
                                  style={{ backgroundColor: c }}
                                  title={c}
                                />
                              ))}
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
                        <span>{locale === 'bn' ? 'পরবর্তী ধাপ: তথ্য' : 'Next: Contact'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: Client Info & Submit */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-3.5 sm:p-5 rounded-3xl bg-void-card/90 border border-glass-border space-y-3.5 backdrop-blur-xl"
                  >
                    <div className="flex items-center gap-1.5 text-gold">
                      <User className="w-3.5 h-3.5" />
                      <h3 className="font-semibold text-xs uppercase tracking-wider">
                        {t('step4')}
                      </h3>
                    </div>

                    <div className="space-y-3">
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

                    <div className="pt-2 flex justify-between items-center">
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
                        className="px-6 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-[#E60049] to-[#2B020A] text-white shadow-neon-crimson border border-[#E60049]/50 hover:border-[#FFB0C1] disabled:opacity-50 flex items-center gap-2 transition-all cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-[#FFB0C1]" />
                            <span>{locale === 'bn' ? 'সাবমিট হচ্ছে...' : 'Submitting...'}</span>
                          </>
                        ) : (
                          <>
                            <span>{t('submit')}</span>
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

          {/* ===================== RIGHT: LIVE ESTIMATE & STUDIO SUMMARY ===================== */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 sm:p-5 rounded-3xl bg-void-card/90 border border-glass-border space-y-4 backdrop-blur-xl sticky top-24 shadow-xl">
              <h3 className="font-display font-bold text-sm text-white flex items-center gap-1.5 border-b border-glass-border pb-2.5">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>{locale === 'bn' ? 'কমিশন সামারি' : 'Commission Summary'}</span>
              </h3>

              <div className="space-y-2.5 text-xs text-white/70">
                <div className="flex justify-between items-center">
                  <span>{locale === 'bn' ? 'সাইজ:' : 'Size:'}</span>
                  <span className="font-semibold text-white font-mono">{selectedSize.size}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span>{locale === 'bn' ? 'কালার থিম:' : 'Color:'}</span>
                  <span className="font-semibold text-[#FFB0C1]">{selectedPalette.name}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span>{locale === 'bn' ? 'সার্টিফিকেট:' : 'Seal:'}</span>
                  <span className="text-emerald-400 font-semibold">100% Signed Original</span>
                </div>

                <div className="flex justify-between items-center">
                  <span>{locale === 'bn' ? 'ডেলিভারি:' : 'Delivery:'}</span>
                  <span className="text-white">Steadfast Courier</span>
                </div>
              </div>

              <div className="pt-3 border-t border-glass-border space-y-0.5">
                <span className="text-[9px] text-white/40 uppercase tracking-widest block font-mono">
                  {t('estimatedBudget')}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
                    ৳{estimatedBDT.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-white/40">
                    ({locale === 'bn' ? 'আলোচনা সাপেক্ষে' : 'Negotiable'})
                  </span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-void-light/80 border border-white/10 text-[10px] text-white/60 space-y-1">
                <div className="flex items-center gap-1 text-gold font-semibold">
                  <ShieldCheck className="w-3 h-3" />
                  <span>{locale === 'bn' ? 'স্টুডিও নিশ্চয়তা' : 'Studio Authenticity'}</span>
                </div>
                <p className="leading-normal">
                  {locale === 'bn'
                    ? 'সাবমিট করার পর শিল্পী ফিহা ইসলাম সরাসরি হোয়াটসঅ্যাপে কথা বলে সাইজ ও ফ্রেম চূড়ান্ত করবেন।'
                    : 'Fiha Islam will personally consult with you on WhatsApp regarding your custom dimensions.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
