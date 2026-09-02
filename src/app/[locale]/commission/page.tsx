'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { COMMISSION_CANVAS_SIZES, COLOR_PALETTE_PRESETS } from '@/lib/art-data';
import { useCurrency } from '@/lib/currency';
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
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CommissionPage() {
  const t = useTranslations('commission');
  const locale = useLocale();
  const { formatPrice } = useCurrency();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState(COMMISSION_CANVAS_SIZES[2]); // 30x40 default
  const [selectedPalette, setSelectedPalette] = useState(COLOR_PALETTE_PRESETS[0]);
  const [wallPhoto, setWallPhoto] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Dynamic budget calculation: base price + 10% for custom palette blending
  const estimatedBDT = Math.round(selectedSize.basePriceBDT * 1.05);
  const estimatedUSD = Math.round(selectedSize.basePriceUSD * 1.05);

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
    if (!clientName || !phone || !email) {
      setErrorMsg('Please fill in your contact information');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/commission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          phone,
          email,
          desiredDimensions: selectedSize.size,
          palette: selectedPalette.name,
          budgetBDT: estimatedBDT,
          description,
          wallPhotoUrl: wallPhoto,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsSuccess(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF2A5F', '#E6B93F', '#7C3AED'],
        });
      } else {
        setErrorMsg(data.error || 'Failed to submit request');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-void-card border border-glass-border text-gold backdrop-blur-md">
          <Palette className="w-3.5 h-3.5 text-crimson" />
          <span>Bespoke Art Studio</span>
        </div>
        <h1 className="font-display font-black text-4xl sm:text-5xl text-white">
          {t('title')}
        </h1>
        <p className="text-sm sm:text-base text-white/60">{t('subtitle')}</p>
      </div>

      {isSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-10 sm:p-14 rounded-3xl bg-void-card border border-gold/40 text-center space-y-6 shadow-neon-gold"
        >
          <div className="w-16 h-16 rounded-full bg-gold/20 text-gold flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="font-display font-black text-3xl text-white">
            {t('successTitle')}
          </h2>
          <p className="text-sm text-white/70 max-w-lg mx-auto leading-relaxed">
            {t('successMsg')}
          </p>
          <div className="p-4 rounded-2xl bg-void-light border border-glass-border max-w-md mx-auto text-xs space-y-2 text-left">
            <div className="flex justify-between text-white/70">
              <span>Client:</span>
              <span className="font-semibold text-white">{clientName}</span>
            </div>
            <div className="flex justify-between text-white/70">
              <span>Canvas Size:</span>
              <span className="font-semibold text-gold">{selectedSize.size}</span>
            </div>
            <div className="flex justify-between text-white/70">
              <span>Palette Theme:</span>
              <span className="font-semibold text-crimson">{selectedPalette.name}</span>
            </div>
            <div className="flex justify-between text-white/70">
              <span>Estimated Budget:</span>
              <span className="font-semibold text-emerald-400">
                {formatPrice(estimatedBDT, estimatedUSD)}
              </span>
            </div>
          </div>
          <MagneticButton
            variant="gold"
            onClick={() => {
              setIsSuccess(false);
              setCurrentStep(1);
            }}
          >
            <span>Create Another Commission</span>
          </MagneticButton>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Form Stepper */}
          <div className="lg:col-span-8 space-y-8">
            {/* Step Progress Indicators */}
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((step) => (
                <button
                  key={step}
                  onClick={() => setCurrentStep(step)}
                  className={`py-2 text-xs font-semibold rounded-xl border transition-all text-center ${
                    currentStep === step
                      ? 'bg-crimson/20 border-crimson text-crimson shadow-neon-crimson'
                      : currentStep > step
                      ? 'bg-gold/20 border-gold text-gold'
                      : 'bg-void-card border-glass-border text-white/40'
                  }`}
                >
                  Step {step}
                </button>
              ))}
            </div>

            {/* Step 1: Canvas Size */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4 p-6 sm:p-8 rounded-3xl bg-void-card border border-glass-border"
              >
                <h3 className="font-display font-bold text-xl text-white">
                  {t('step1')}
                </h3>
                <p className="text-xs text-white/50">{t('sizeLabel')}</p>

                <div className="space-y-3">
                  {COMMISSION_CANVAS_SIZES.map((size) => (
                    <div
                      key={size.size}
                      onClick={() => setSelectedSize(size)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                        selectedSize.size === size.size
                          ? 'bg-crimson/15 border-crimson shadow-neon-crimson'
                          : 'bg-void-light border-glass-border hover:border-white/20'
                      }`}
                    >
                      <div>
                        <h4 className="text-sm font-bold text-white">
                          {locale === 'bn' ? size.sizeBn : size.size}
                        </h4>
                        <p className="text-xs text-white/40">Gallery Depth Linen Stretched</p>
                      </div>
                      <span className="text-sm font-bold text-gold">
                        {formatPrice(size.basePriceBDT, size.basePriceUSD)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex justify-end">
                  <MagneticButton variant="primary" onClick={() => setCurrentStep(2)}>
                    <span>Next: Select Colors</span>
                    <ArrowRight className="w-4 h-4" />
                  </MagneticButton>
                </div>
              </motion.div>
            )}

            {/* Step 2: Color Palette */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4 p-6 sm:p-8 rounded-3xl bg-void-card border border-glass-border"
              >
                <h3 className="font-display font-bold text-xl text-white">
                  {t('step2')}
                </h3>
                <p className="text-xs text-white/50">{t('paletteLabel')}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {COLOR_PALETTE_PRESETS.map((pal) => (
                    <div
                      key={pal.id}
                      onClick={() => setSelectedPalette(pal)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-3 ${
                        selectedPalette.id === pal.id
                          ? 'bg-gold/15 border-gold shadow-neon-gold'
                          : 'bg-void-light border-glass-border hover:border-white/20'
                      }`}
                    >
                      <h4 className="text-sm font-bold text-white">
                        {locale === 'bn' ? pal.nameBn : pal.name}
                      </h4>
                      <div className="flex gap-2">
                        {pal.colors.map((c, i) => (
                          <div
                            key={i}
                            className="w-7 h-7 rounded-full border border-white/20 shadow-inner"
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-4 py-2 text-xs text-white/60 hover:text-white"
                  >
                    Back
                  </button>
                  <MagneticButton variant="primary" onClick={() => setCurrentStep(3)}>
                    <span>Next: Wall Photo & Vision</span>
                    <ArrowRight className="w-4 h-4" />
                  </MagneticButton>
                </div>
              </motion.div>
            )}

            {/* Step 3: Wall Photo & Description */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4 p-6 sm:p-8 rounded-3xl bg-void-card border border-glass-border"
              >
                <h3 className="font-display font-bold text-xl text-white">
                  {t('step3')}
                </h3>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white/80 block">
                    {t('uploadLabel')}
                  </label>
                  <div className="border-2 border-dashed border-glass-border rounded-2xl p-6 text-center hover:border-gold transition-colors relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <Upload className="w-8 h-8 text-gold mx-auto mb-2" />
                    <p className="text-xs text-white/70">
                      {wallPhoto ? 'Wall Photo Uploaded! Click to replace' : 'Upload your room or wall photo'}
                    </p>
                  </div>
                  {wallPhoto && (
                    <div className="relative w-32 h-24 rounded-xl overflow-hidden mt-2 border border-glass-border">
                      <img src={wallPhoto} alt="Wall Upload" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div className="space-y-2 pt-2">
                  <label className="text-xs font-semibold text-white/80 block">
                    {t('descriptionLabel')}
                  </label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={t('descriptionPlaceholder')}
                    className="w-full p-4 rounded-2xl bg-void-light border border-glass-border text-sm text-white focus:border-crimson focus:outline-none transition-colors"
                  />
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-4 py-2 text-xs text-white/60 hover:text-white"
                  >
                    Back
                  </button>
                  <MagneticButton variant="primary" onClick={() => setCurrentStep(4)}>
                    <span>Next: Review & Submit</span>
                    <ArrowRight className="w-4 h-4" />
                  </MagneticButton>
                </div>
              </motion.div>
            )}

            {/* Step 4: Contact & Submit */}
            {currentStep === 4 && (
              <motion.form
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onSubmit={handleSubmit}
                className="space-y-4 p-6 sm:p-8 rounded-3xl bg-void-card border border-glass-border"
              >
                <h3 className="font-display font-bold text-xl text-white">
                  {t('step4')}
                </h3>

                {errorMsg && (
                  <div className="p-3 rounded-xl bg-crimson/20 border border-crimson text-xs text-crimson">
                    {errorMsg}
                  </div>
                )}

                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-white/70 block mb-1">{t('clientName')}</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-white/40 absolute left-4 top-3.5" />
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="e.g. Shakib Al Hasan"
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-void-light border border-glass-border text-sm text-white focus:border-gold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-white/70 block mb-1">{t('phone')}</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-white/40 absolute left-4 top-3.5" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="017XXXXXXXX / WhatsApp"
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-void-light border border-glass-border text-sm text-white focus:border-gold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-white/70 block mb-1">{t('email')}</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-white/40 absolute left-4 top-3.5" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="yourname@gmail.com"
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-void-light border border-glass-border text-sm text-white focus:border-gold focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="px-4 py-2 text-xs text-white/60 hover:text-white"
                  >
                    Back
                  </button>
                  <MagneticButton
                    type="submit"
                    variant="gold"
                    disabled={isSubmitting}
                    className="py-4 px-8 text-base"
                  >
                    <span>{isSubmitting ? 'Submitting...' : t('submit')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </MagneticButton>
                </div>
              </motion.form>
            )}
          </div>

          {/* Right Summary & Instant Budget Estimator */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl bg-void-card border border-glass-border shadow-xl space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-gold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-crimson" />
                <span>{t('estimatedBudget')}</span>
              </h4>

              <div className="p-4 rounded-2xl bg-void-light border border-glass-border space-y-2">
                <span className="text-xs text-white/50 block">Calculated Investment</span>
                <span className="font-display font-black text-3xl text-emerald-400">
                  {formatPrice(estimatedBDT, estimatedUSD)}
                </span>
                <p className="text-[11px] text-white/40">
                  Includes heavy impasto acrylics, 24k gold leaf highlights, varnishing, and Dhaka delivery packaging.
                </p>
              </div>

              <div className="space-y-2 text-xs text-white/70">
                <div className="flex justify-between py-1 border-b border-glass-border">
                  <span>Selected Size:</span>
                  <span className="font-semibold text-white">{selectedSize.size}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-glass-border">
                  <span>Color Theme:</span>
                  <span className="font-semibold text-white">{selectedPalette.name}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-void-card border border-glass-border text-[11px] text-white/60 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>
                  Artist Fiha Islam provides concept sketch approval and video updates prior to canvas stretching.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
