import React from 'react';
import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { MagneticButton } from '@/components/ui/MagneticButton';
import {
  ShieldCheck,
  Lock,
  FileText,
  Truck,
  RotateCcw,
  Copyright,
  Info,
  ArrowLeft,
  Palette,
  CheckCircle2,
  Mail,
  Phone,
  Package,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface PrivacyPolicyPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PrivacyPolicyPageProps): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const isBn = locale === 'bn';

  const title = isBn
    ? 'প্রাইভেসি পলিসি ও টার্মস অব সার্ভিস | Artora by FramEmpire'
    : 'Privacy Policy & Terms of Service | Artora by FramEmpire';

  const description = isBn
    ? 'Artora by FramEmpire-এর সংগ্রাহক তথ্যের নিরাপত্তা, স্টেডফাস্ট কুরিয়ার ডেলিভারি, কাস্টম আর্ট পলিসি ও বৌদ্ধিক সম্পত্তি অধিকার সংক্রান্ত অফিশিয়াল নীতিমালা।'
    : 'Official Privacy Statement, Courier Delivery Governance, Custom Art Commission Policy, and IP Rights for Artora by FramEmpire (Fiha Islam).';

  const url = `https://artora.framempire.com/${locale}/privacy-policy`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: 'https://artora.framempire.com/en/privacy-policy',
        bn: 'https://artora.framempire.com/bn/privacy-policy',
      },
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function PrivacyPolicyPage({ params }: PrivacyPolicyPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('privacyPolicy');
  const isBn = locale === 'bn';

  return (
    <div className="relative min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Dynamic Background Glows (FramEmpire Signature Cyan & Crimson) */}
      <div className="absolute top-20 left-1/3 w-[600px] h-[600px] bg-[#00F0FF]/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#E60049]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-12">
        {/* ===================== TOP HEADER & NAVIGATION ===================== */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-glass-border">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-void-card/90 border border-glass-border hover:border-white/40 text-xs font-medium text-white/80 hover:text-white transition-all backdrop-blur-md shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isBn ? 'স্টুডিও হোমে ফিরুন' : 'Back to Studio'}</span>
          </Link>

          <Link href="/commission">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/40 text-xs font-semibold text-[#00F0FF] hover:bg-[#00F0FF]/20 transition-all backdrop-blur-md shadow-neon-cyan">
              <Palette className="w-3.5 h-3.5" />
              <span>{isBn ? 'কাস্টম কমিশন অর্ডার' : 'Commission Studio'}</span>
            </div>
          </Link>
        </div>

        {/* ===================== MAIN HEADER CARD ===================== */}
        <header className="p-8 sm:p-10 rounded-3xl bg-void-card/95 border border-[#00F0FF]/30 backdrop-blur-2xl space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#00F0FF]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Pill Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-[#00F0FF]/10 border border-[#00F0FF]/40 text-[#00F0FF]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t('badge')}</span>
            </div>

            <div className="px-3.5 py-1 rounded-full text-[11px] font-mono text-white/60 bg-white/5 border border-glass-border">
              <span>{t('effective')} • {t('updated')}</span>
            </div>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            {t('title')}
          </h1>

          <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
            {t('lead')}
          </p>

          {/* Disclaimer Callout Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-void-card/80 border border-[#00F0FF]/25 flex items-start gap-3.5 text-xs text-white/80 leading-relaxed shadow-lg">
            <Info className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
            <p>{t('disclaimer')}</p>
          </div>
        </header>

        {/* ===================== SECTION 01: INFORMATION WE COLLECT ===================== */}
        <section className="p-6 sm:p-8 rounded-3xl bg-void-card/90 border border-glass-border hover:border-[#00F0FF]/40 transition-colors backdrop-blur-2xl space-y-6 shadow-xl">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-black text-[#00F0FF] bg-[#00F0FF]/10 px-2.5 py-1 rounded-lg border border-[#00F0FF]/30">
              {t('sec1.num')}
            </span>
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono font-bold text-[#00F0FF] uppercase tracking-wider block">
                {t('sec1.badge')}
              </span>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-white">
                {t('sec1.title')}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Subcard A */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-glass-border space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-[#00F0FF]">
                <CheckCircle2 className="w-4 h-4" />
                <h3>{t('sec1.aTitle')}</h3>
              </div>
              <ul className="space-y-3 text-xs text-white/70 leading-relaxed list-disc list-inside">
                <li>{t('sec1.a1')}</li>
                <li>{t('sec1.a2')}</li>
                <li>{t('sec1.a3')}</li>
              </ul>
            </div>

            {/* Subcard B */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-glass-border space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-[#00F0FF]">
                <Layers className="w-4 h-4" />
                <h3>{t('sec1.bTitle')}</h3>
              </div>
              <ul className="space-y-3 text-xs text-white/70 leading-relaxed list-disc list-inside">
                <li>{t('sec1.b1')}</li>
                <li>{t('sec1.b2')}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ===================== SECTION 02: HOW WE USE YOUR INFORMATION ===================== */}
        <section className="p-6 sm:p-8 rounded-3xl bg-void-card/90 border border-glass-border hover:border-[#00F0FF]/40 transition-colors backdrop-blur-2xl space-y-6 shadow-xl">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-black text-[#00F0FF] bg-[#00F0FF]/10 px-2.5 py-1 rounded-lg border border-[#00F0FF]/30">
              {t('sec2.num')}
            </span>
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono font-bold text-[#00F0FF] uppercase tracking-wider block">
                {t('sec2.badge')}
              </span>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-white">
                {t('sec2.title')}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-glass-border space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Truck className="w-4 h-4 text-[#00F0FF]" />
                <h4>{t('sec2.item1Title')}</h4>
              </div>
              <p className="text-xs text-white/60 leading-relaxed">{t('sec2.item1Desc')}</p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-glass-border space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Sparkles className="w-4 h-4 text-gold" />
                <h4>{t('sec2.item2Title')}</h4>
              </div>
              <p className="text-xs text-white/60 leading-relaxed">{t('sec2.item2Desc')}</p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-glass-border space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <FileText className="w-4 h-4 text-emerald-400" />
                <h4>{t('sec2.item3Title')}</h4>
              </div>
              <p className="text-xs text-white/60 leading-relaxed">{t('sec2.item3Desc')}</p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-glass-border space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <ShieldCheck className="w-4 h-4 text-[#FFB0C1]" />
                <h4>{t('sec2.item4Title')}</h4>
              </div>
              <p className="text-xs text-white/60 leading-relaxed">{t('sec2.item4Desc')}</p>
            </div>
          </div>
        </section>

        {/* ===================== SECTION 03: DELIVERY & LOGISTICS ===================== */}
        <section className="p-6 sm:p-8 rounded-3xl bg-void-card/90 border border-glass-border hover:border-[#00F0FF]/40 transition-colors backdrop-blur-2xl space-y-6 shadow-xl">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-black text-[#00F0FF] bg-[#00F0FF]/10 px-2.5 py-1 rounded-lg border border-[#00F0FF]/30">
              {t('sec3.num')}
            </span>
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono font-bold text-[#00F0FF] uppercase tracking-wider block">
                {t('sec3.badge')}
              </span>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-white">
                {t('sec3.title')}
              </h2>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-glass-border space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-amber-400">
                <Truck className="w-4 h-4" />
                <h3>{t('sec3.item1Title')}</h3>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">{t('sec3.item1Desc')}</p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-glass-border space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-[#00F0FF]">
                <Package className="w-4 h-4" />
                <h3>{t('sec3.item2Title')}</h3>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">{t('sec3.item2Desc')}</p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-glass-border space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-gold">
                <Sparkles className="w-4 h-4" />
                <h3>{t('sec3.item3Title')}</h3>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">{t('sec3.item3Desc')}</p>
            </div>
          </div>
        </section>

        {/* ===================== SECTION 04: COMMISSIONS & RETURNS ===================== */}
        <section className="p-6 sm:p-8 rounded-3xl bg-void-card/90 border border-glass-border hover:border-[#E60049]/50 transition-colors backdrop-blur-2xl space-y-6 shadow-xl">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-black text-[#FFB0C1] bg-[#E60049]/20 px-2.5 py-1 rounded-lg border border-[#E60049]/40">
              {t('sec4.num')}
            </span>
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono font-bold text-[#FFB0C1] uppercase tracking-wider block">
                {t('sec4.badge')}
              </span>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-white">
                {t('sec4.title')}
              </h2>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div className="p-5 rounded-2xl bg-[#E60049]/5 border border-[#E60049]/30 space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-[#FFB0C1]">
                <RotateCcw className="w-4 h-4" />
                <h3>{t('sec4.item1Title')}</h3>
              </div>
              <p className="text-xs text-white/75 leading-relaxed">{t('sec4.item1Desc')}</p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/30 space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <h3>{t('sec4.item2Title')}</h3>
              </div>
              <p className="text-xs text-white/75 leading-relaxed">{t('sec4.item2Desc')}</p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-glass-border space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <CheckCircle2 className="w-4 h-4 text-gold" />
                <h3>{t('sec4.item3Title')}</h3>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">{t('sec4.item3Desc')}</p>
            </div>
          </div>
        </section>

        {/* ===================== SECTION 05: INTELLECTUAL PROPERTY ===================== */}
        <section className="p-6 sm:p-8 rounded-3xl bg-void-card/90 border border-glass-border hover:border-gold/40 transition-colors backdrop-blur-2xl space-y-6 shadow-xl">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-black text-gold bg-gold/10 px-2.5 py-1 rounded-lg border border-gold/30">
              {t('sec5.num')}
            </span>
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono font-bold text-gold uppercase tracking-wider block">
                {t('sec5.badge')}
              </span>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-white">
                {t('sec5.title')}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-glass-border space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-gold">
                <Copyright className="w-4 h-4" />
                <h3>{t('sec5.item1Title')}</h3>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">{t('sec5.item1Desc')}</p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-glass-border space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-gold">
                <ShieldCheck className="w-4 h-4" />
                <h3>{t('sec5.item2Title')}</h3>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">{t('sec5.item2Desc')}</p>
            </div>
          </div>
        </section>

        {/* ===================== SECTION 06: DATA PRIVACY & CONTACT ===================== */}
        <section className="p-6 sm:p-8 rounded-3xl bg-void-card/90 border border-glass-border hover:border-[#00F0FF]/40 transition-colors backdrop-blur-2xl space-y-6 shadow-xl">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-black text-[#00F0FF] bg-[#00F0FF]/10 px-2.5 py-1 rounded-lg border border-[#00F0FF]/30">
              {t('sec6.num')}
            </span>
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono font-bold text-[#00F0FF] uppercase tracking-wider block">
                {t('sec6.badge')}
              </span>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-white">
                {t('sec6.title')}
              </h2>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-glass-border space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Lock className="w-4 h-4 text-[#00F0FF]" />
                <h3>{t('sec6.item1Title')}</h3>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">{t('sec6.item1Desc')}</p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-r from-void-card to-[#2B020A]/40 border border-[#E60049]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">{t('sec6.item2Title')}</h4>
                <p className="text-xs text-white/60">{t('sec6.item2Desc')}</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="mailto:team.framempire@gmail.com"
                  className="px-4 py-2 rounded-xl bg-white/5 border border-glass-border hover:border-[#FFB0C1] text-xs font-mono text-white/90 hover:text-white transition-all flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5 text-[#FFB0C1]" />
                  <span>team.framempire@gmail.com</span>
                </a>
                <a
                  href="tel:+8801723722019"
                  className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 text-xs font-mono text-emerald-400 transition-all flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>+880 1723-722019</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
