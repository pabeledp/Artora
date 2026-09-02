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

  // Estimated Investment Calculation
  const estimatedBDT = Math.round(selectedSize.basePriceBDT * 1.05);

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
        'https://script.google.com/macros/s/AKfycbxCfTeV3bXvPvGDs1EFtmDx72zqLIhhGxKVgDSyDojHWTlQMT_0qli5lv-sT5Kj02esDg/exec';

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

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-semibold bg-void-card/90 border border-[#E60049]/40 text-[#FFB0C1] shadow-neon-crimson backdrop-blur-xl">
          <Palette className="w-3.5 h-3.5 text-[#E60049] animate-spin-slow" />
          <span>{locale === 'bn' ? 'বিস্পোক কাস্টম আর্ট স্টুডিও' : 'Bespoke Custom Art Studio'}</span>
        </div>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-white">
          {t('title')}
        </h1>
        <p className="text-sm sm:text-base text-white/65 leading-relaxed">{t('subtitle')}</p>
      </div>

      {isSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 sm:p-12 rounded-3xl bg-void-card/95 border border-[#E60049]/40 text-center space-y-6 shadow-2xl backdrop-blur-2xl"
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
              {t('successTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-white/70 max-w-lg mx-auto leading-relaxed">
              {t('successMsg')}
            </p>
          </div>

          {/* Submission Summary Card */}
          <div className="p-5 rounded-2xl bg-void-light/80 border border-white/10 max-w-lg mx-auto text-xs space-y-2.5 text-left backdrop-blur-md">
            <div className="flex justify-between text-white/70 pb-2 border-b border-white/10">
              <span>{locale === 'bn' ? 'রেফারেন্স আইডি:' : 'Reference ID:'}</span>
              <span className="font-mono font-bold text-[#FFB0C1]">{submittedRef}</span>
            </div>
            <div className="flex justify-between text-white/70">
              <span>{locale === 'bn' ? 'সংগ্রাহকের নাম:' : 'Client:'}</span>
              <span className="font-semibold text-white">{clientName}</span>
            </div>
            <div className="flex justify-between text-white/70">
              <span>{locale === 'bn' ? 'মোবাইল / হোয়াটসঅ্যাপ:' : 'WhatsApp / Phone:'}</span>
              <span className="font-mono text-white">{phone}</span>
            </div>
            <div className="flex justify-between text-white/70">
              <span>{locale === 'bn' ? 'ক্যানভাস সাইজ:' : 'Canvas Size:'}</span>
              <span className="font-semibold text-gold">{selectedSize.size}</span>
            </div>
            <div className="flex justify-between text-white/70">
              <span>{locale === 'bn' ? 'কালার প্যালেট থিম:' : 'Palette Theme:'}</span>
              <span className="font-semibold text-[#FFB0C1]">{selectedPalette.name}</span>
            </div>
            <div className="flex justify-between text-white/70 pt-2 border-t border-white/10">
              <span>{locale === 'bn' ? 'পরামর্শ ও আনুমানিক বাজেট:' : 'Estimated Price:'}</span>
              <span className="font-bold text-emerald-400 font-mono">
                ৳{estimatedBDT.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {whatsappLink && (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold bg-[#25D366] hover:bg-[#1EBE5D] text-black shadow-lg shadow-emerald-950/40 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{locale === 'bn' ? 'হোয়াটসঅ্যাপে সরাসরি কথা বলুন' : 'Chat with Fiha Islam on WhatsApp'}</span>
              </a>
            )}

            <button
              onClick={() => {
                setIsSuccess(false);
                setCurrentStep(1);
                setDescription('');
                setWallPhoto(null);
              }}
              className="px-6 py-3.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-xl transition-all"
            >
              {locale === 'bn' ? 'নতুন কমিশন তৈরি করুন' : 'Create Another Commission'}
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* ===================== LEFT: STEPPER & CONTROLS ===================== */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step Progress Bar */}
            <div className="grid grid-cols-4 gap-2 p-1.5 rounded-2xl bg-void-card border border-glass-border backdrop-blur-md">
              {[1, 2, 3, 4].map((step) => (
                <button
                  key={step}
                  onClick={() => setCurrentStep(step)}
                  className={`py-2 px-1 rounded-xl text-center text-xs font-semibold transition-all ${
                    currentStep === step
                      ? 'bg-gradient-to-r from-[#E60049] to-[#2B020A] text-white shadow-neon-crimson border border-[#E60049]/50'
                      : currentStep > step
                      ? 'bg-white/10 text-[#FFB0C1]'
                      : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  <span>Step {step}</span>
                </button>
              ))}
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                <span>⚠️ {errorMsg}</span>
              </div>
            )}

            {/* Step Content Panes */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence mode="wait">
                {/* STEP 1: Choose Canvas Size */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-6 rounded-3xl bg-void-card/90 border border-glass-border space-y-5 backdrop-blur-xl"
                  >
                    <div className="flex items-center gap-2 text-gold">
                      <Layers className="w-4 h-4" />
                      <h3 className="font-semibold text-sm uppercase tracking-wider">
                        {t('step1')}
                      </h3>
                    </div>
                    <label className="text-xs text-white/70 block">{t('sizeLabel')}</label>

                    <div className="space-y-3">
                      {COMMISSION_CANVAS_SIZES.map((size) => (
                        <div
                          key={size.id}
                          onClick={() => setSelectedSize(size)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                            selectedSize.id === size.id
                              ? 'bg-white/[0.08] border-[#E60049] shadow-neon-crimson'
                              : 'bg-void-light/60 border-glass-border hover:border-white/25'
                          }`}
                        >
                          <div>
                            <h4 className="font-display font-bold text-sm text-white">
                              {locale === 'bn' ? size.sizeBn : size.size}
                            </h4>
                            <p className="text-xs text-white/50 mt-0.5">
                              {locale === 'bn' ? size.idealForBn : size.idealFor}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-mono font-bold text-[#FFB0C1]">
                              ৳{size.basePriceBDT.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="px-6 py-3 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-xl transition-all flex items-center gap-2"
                      >
                        <span>{locale === 'bn' ? 'পরবর্তী ধাপ' : 'Next Step'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Select Palette */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-6 rounded-3xl bg-void-card/90 border border-glass-border space-y-5 backdrop-blur-xl"
                  >
                    <div className="flex items-center gap-2 text-gold">
                      <Palette className="w-4 h-4" />
                      <h3 className="font-semibold text-sm uppercase tracking-wider">
                        {t('step2')}
                      </h3>
                    </div>
                    <label className="text-xs text-white/70 block">{t('paletteLabel')}</label>

                    <div className="space-y-3">
                      {COLOR_PALETTE_PRESETS.map((pal) => (
                        <div
                          key={pal.id}
                          onClick={() => setSelectedPalette(pal)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                            selectedPalette.id === pal.id
                              ? 'bg-white/[0.08] border-[#E60049] shadow-neon-crimson'
                              : 'bg-void-light/60 border-glass-border hover:border-white/25'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-sm text-white">
                              {locale === 'bn' ? pal.nameBn : pal.name}
                            </h4>
                            <div className="flex gap-1.5">
                              {pal.colors.map((c, i) => (
                                <span
                                  key={i}
                                  className="w-4 h-4 rounded-full border border-black/40 shadow-sm"
                                  style={{ backgroundColor: c }}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-xs text-white/50">{pal.description}</p>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 flex justify-between">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="px-5 py-2.5 rounded-full text-xs text-white/60 hover:text-white"
                      >
                        {locale === 'bn' ? 'পূর্ববর্তী' : 'Back'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        className="px-6 py-3 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-xl transition-all flex items-center gap-2"
                      >
                        <span>{locale === 'bn' ? 'পরবর্তী ধাপ' : 'Next Step'}</span>
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
                    className="p-6 rounded-3xl bg-void-card/90 border border-glass-border space-y-5 backdrop-blur-xl"
                  >
                    <div className="flex items-center gap-2 text-gold">
                      <Sparkles className="w-4 h-4" />
                      <h3 className="font-semibold text-sm uppercase tracking-wider">
                        {t('step3')}
                      </h3>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-white/70 block">
                        {t('descriptionLabel')}
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        placeholder={t('descriptionPlaceholder')}
                        className="w-full px-4 py-3 rounded-2xl bg-void-light border border-glass-border text-white text-xs focus:border-[#E60049] outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-white/70 block">{t('uploadLabel')}</label>
                      <div className="border-2 border-dashed border-glass-border hover:border-[#E60049] rounded-2xl p-6 text-center cursor-pointer relative bg-void-light/50 transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        />
                        {wallPhoto ? (
                          <div className="space-y-2">
                            <img
                              src={wallPhoto}
                              alt="Wall Preview"
                              className="h-28 mx-auto rounded-lg object-cover"
                            />
                            <p className="text-[11px] text-emerald-400">
                              ✓ {locale === 'bn' ? 'ছবি যুক্ত করা হয়েছে' : 'Photo Attached'}
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-2 text-white/50">
                            <Upload className="w-6 h-6 mx-auto text-gold" />
                            <p className="text-xs">
                              {locale === 'bn'
                                ? 'ছবি ড্র্যাগ করুন অথবা ক্লিক করে আপলোড করুন'
                                : 'Click or drag photo of your wall / interior'}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-2 flex justify-between">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="px-5 py-2.5 rounded-full text-xs text-white/60 hover:text-white"
                      >
                        {locale === 'bn' ? 'পূর্ববর্তী' : 'Back'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(4)}
                        className="px-6 py-3 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-xl transition-all flex items-center gap-2"
                      >
                        <span>{locale === 'bn' ? 'পরবর্তী ধাপ' : 'Next Step'}</span>
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
                    className="p-6 rounded-3xl bg-void-card/90 border border-glass-border space-y-5 backdrop-blur-xl"
                  >
                    <div className="flex items-center gap-2 text-gold">
                      <User className="w-4 h-4" />
                      <h3 className="font-semibold text-sm uppercase tracking-wider">
                        {t('step4')}
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-xs text-white/70 block mb-1">
                          {t('clientName')} *
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
                          <input
                            type="text"
                            required
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            placeholder="e.g. Tanvir Ahmed"
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-void-light border border-glass-border text-white text-xs focus:border-[#E60049] outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-white/70 block mb-1">
                          {t('phone')} *
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-emerald-400 absolute left-3.5 top-3.5" />
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="017XXXXXXXX"
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-void-light border border-glass-border text-white text-xs focus:border-[#E60049] outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-white/70 block mb-1">
                          {t('email')} *
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-[#FFB0C1] absolute left-3.5 top-3.5" />
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tanvir@example.com"
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-void-light border border-glass-border text-white text-xs focus:border-[#E60049] outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 flex justify-between items-center">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        className="px-5 py-2.5 rounded-full text-xs text-white/60 hover:text-white"
                      >
                        {locale === 'bn' ? 'পূর্ববর্তী' : 'Back'}
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-7 py-3.5 rounded-full text-xs font-bold bg-gradient-to-r from-[#E60049] to-[#2B020A] text-white shadow-neon-crimson border border-[#E60049]/50 hover:border-[#FFB0C1] disabled:opacity-50 flex items-center gap-2 transition-all cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-[#FFB0C1]" />
                            <span>{locale === 'bn' ? 'সংরক্ষণ ও প্রসেসিং হচ্ছে...' : 'Submitting to Sheets...'}</span>
                          </>
                        ) : (
                          <>
                            <span>{t('submit')}</span>
                            <ArrowRight className="w-4 h-4" />
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
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-void-card/90 border border-glass-border space-y-6 backdrop-blur-xl sticky top-28 shadow-xl">
              <h3 className="font-display font-bold text-base text-white flex items-center gap-2 border-b border-glass-border pb-3">
                <Sparkles className="w-4 h-4 text-gold" />
                <span>{locale === 'bn' ? 'কমিশন সারসংক্ষেপ ও প্রাইসিং' : 'Commission Summary'}</span>
              </h3>

              <div className="space-y-3.5 text-xs text-white/70">
                <div className="flex justify-between items-center">
                  <span>{locale === 'bn' ? 'নির্বাচিত সাইজ:' : 'Canvas Size:'}</span>
                  <span className="font-semibold text-white font-mono">{selectedSize.size}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span>{locale === 'bn' ? 'কালার থিম:' : 'Color Theme:'}</span>
                  <span className="font-semibold text-[#FFB0C1]">{selectedPalette.name}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span>{locale === 'bn' ? 'সার্টিফিকেট ও সাইন:' : 'Certificate & Seal:'}</span>
                  <span className="text-emerald-400 font-semibold">100% Signed Original</span>
                </div>

                <div className="flex justify-between items-center">
                  <span>{locale === 'bn' ? 'ডেলিভারি পার্টনার:' : 'Delivery:'}</span>
                  <span className="text-white">Steadfast Courier</span>
                </div>
              </div>

              <div className="pt-4 border-t border-glass-border space-y-1">
                <span className="text-[10px] text-white/40 uppercase tracking-widest block">
                  {t('estimatedBudget')}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-emerald-400 font-mono">
                    ৳{estimatedBDT.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-white/40">
                    ({locale === 'bn' ? 'আলোচনা সাপেক্ষে' : 'Negotiable'})
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-void-light/80 border border-white/10 text-[11px] text-white/60 space-y-1.5">
                <div className="flex items-center gap-1.5 text-gold font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{locale === 'bn' ? 'স্টুডিও নিশ্চয়তা' : 'Studio Authenticity'}</span>
                </div>
                <p className="leading-relaxed">
                  {locale === 'bn'
                    ? 'সাবমিট করার পর তথ্য সরাসরি গুগল শিটস ও আর্টিস্টের সিস্টেমে যুক্ত হয়ে যাবে এবং শিল্পী ফিহা ইসলাম সরাসরি হোয়াটসঅ্যাপে কথা বলে নিখুঁত ক্যানভাস তৈরি করবেন।'
                    : 'Your commission request directly syncs with our Google Sheets database and studio system for personal consultation with Fiha Islam.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
