import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { MagneticButton } from '@/components/ui/MagneticButton';
import {
  Sparkles,
  Palette,
  Award,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  ArrowRight,
  Layers,
  Feather,
  Compass,
  FileCheck2,
} from 'lucide-react';

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const isBn = locale === 'bn';

  const title = isBn
    ? 'শিল্পী পরিচিতি ও স্টুডিও ভিশন | Artora by FramEmpire - ফিহা ইসলাম'
    : 'About Artist & Studio Vision | Artora by FramEmpire - Fiha Islam';

  const description = isBn
    ? 'শিল্পী ফিহা ইসলামের সৃষ্টিশীল শিল্পযাত্রা, অ্যাক্রিলিক ইম্পাস্তো, পবিত্র আরবি ক্যালিগ্রাফি এবং সার্টিফিকেট অব অথেন্টিসিটি সহ অরিজিনাল ক্যানভাস সৃষ্টির গল্প।'
    : 'Discover the studio journey of fine artist Fiha Islam. Handcrafted 3D Arabic calligraphy, tactile impasto acrylics, and bespoke collector canvases from Artora by FramEmpire.';

  const url = `https://artora.framempire.com/${locale}/about`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: 'https://artora.framempire.com/en/about',
        bn: 'https://artora.framempire.com/bn/about',
      },
    },
    openGraph: {
      title,
      description,
      url,
      type: 'profile',
      images: [
        {
          url: 'https://artora.framempire.com/images/fiha-islam.png',
          width: 1200,
          height: 630,
          alt: 'Fiha Islam - Fine Artist & Founder of Artora by FramEmpire',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://artora.framempire.com/images/fiha-islam.png'],
    },
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('aboutPage');
  const isBn = locale === 'bn';

  const milestones = [
    {
      year: isBn ? '২০২০' : '2020',
      title: isBn ? 'স্টুডিওর সূচনা ও ইম্পাস্তো নিয়ে নিরীক্ষা' : 'Studio Genesis & Impasto Experiments',
      desc: isBn
        ? 'নারায়ণগঞ্জে নিজস্ব প্রাইভেট স্টুডিওতে হেভি বডি অ্যাক্রিলিক পেস্ট, প্যালেট নাইফ স্কাল্পটিং এবং মিনারেল পিগমেন্ট নিয়ে শিল্পচর্চার সূচনা।'
        : 'Began private studio exploration in Narayanganj, experimenting with heavy-body acrylic pastes, palette knife sculpting, and mineral pigments.',
      icon: Palette,
    },
    {
      year: isBn ? '২০২২' : '2022',
      title: isBn ? 'পবিত্র আরবি ক্যালিগ্রাফি ও গোল্ড লিফ স্টাইল' : 'Sacred Calligraphy & 24k Gold Gilding',
      desc: isBn
        ? 'ঐতিহ্যবাহী আরবি সুলুস ও দিওয়ানি লিপির সাথে রাস্টি স্টোন টেক্সচার ও লিকুইড গোল্ড লিফের সমন্বয়ে নিজস্ব সিগনেচার স্টাইলের আত্মপ্রকাশ।'
        : 'Pioneered a signature style uniting classic Arabic Thuluth/Diwani script with weathered stone textures and radiant liquid gold leaf.',
      icon: Feather,
    },
    {
      year: isBn ? '২০২৪' : '2024',
      title: isBn ? 'Artora ব্র‍্যান্ড প্রতিষ্ঠা ও দেশব্যাপী বিস্তার' : 'Artora Brand Inception & Nationwide Reach',
      desc: isBn
        ? 'FramEmpire-এর অধীনে Artora ব্র‍্যান্ডের যাত্রা এবং বাংলাদেশের ৬৪টি জেলায় ৩০০-এর অধিক কাস্টম কমিশন ক্যানভাস সফলভাবে সরবরাহ।'
        : 'Established Artora under FramEmpire, delivering over 300+ custom commissioned canvases to art lovers across all 64 districts in Bangladesh.',
      icon: Layers,
    },
    {
      year: isBn ? '২০২৫+' : '2025+',
      title: isBn ? 'আন্তর্জাতিক পরিমণ্ডল ও স্বকীয় কাস্টম আর্ট' : 'Global Collector Presence & Bespoke Art',
      desc: isBn
        ? 'আর্কিভাল মিউজিয়াম গ্রেড সুরক্ষা ও সার্টিফিকেট অব অথেন্টিসিটি সহ আন্তর্জাতিক পর্যায়ে (উত্তর আমেরিকা, যুক্তরাজ্য ও মধ্যপ্রাচ্য) ক্যানভাস আর্ট বিস্তার।'
        : 'Expanding international shipments to North America, UK, and the Middle East with museum-sealed archival packaging and Certificates of Authenticity.',
      icon: Sparkles,
    },
  ];

  const pillars = [
    {
      num: '01',
      title: isBn ? 'হেভি ইম্পাস্তো অ্যাক্রিলিক' : 'Heavy Impasto Acrylics',
      tag: isBn ? 'ত্রিমাত্রিক স্কাল্পটেড টেক্সচার' : 'Sculptural Texture',
      desc: isBn
        ? 'প্যালেট নাইফের বলিষ্ঠ ছোঁয়ায় তৈরি গভীর ত্রিমাত্রিক টেক্সচার যা প্রাকৃতিক আলোতে দেয়ালে নান্দনিক ছায়া ও গতিশীলতা তৈরি করে।'
        : 'Built with rich dimensional knife strokes that catch natural daylight and cast dynamic ambient shadows across your wall throughout the day.',
      icon: Layers,
      borderColor: 'border-[#E60049]/30 hover:border-[#E60049]',
    },
    {
      num: '02',
      title: isBn ? 'পবিত্র আরবি ক্যালিগ্রাফি' : 'Sacred Arabic Calligraphy',
      tag: isBn ? 'আত্মিক ও পবিত্র রূপ' : 'Spiritual Grace',
      desc: isBn
        ? 'কোরআনের চিরন্তন আয়াত ও আশার বাণীসমূহ ২৪ ক্যারেট লিকুইড গোল্ড লিফে সজ্জিত, যা ঘরে তৈরি করে এক আধ্যাত্মিক প্রশান্তি।'
        : 'Timeless Quranic verses and prayers rendered in majestic flow, gilded with 24k liquid gold leaf accents for an aura of eternal peace.',
      icon: Sparkles,
      borderColor: 'border-gold/30 hover:border-gold',
    },
    {
      num: '03',
      title: isBn ? 'কাস্টম সাইজ ও কালার হারমনি' : 'Bespoke Scale & Color',
      tag: isBn ? 'ব্যক্তিগত পছন্দ অনুযায়ী' : 'Tailored Living',
      desc: isBn
        ? 'প্রতিটি কাস্টম অর্ডার আপনার ঘরের ইন্টেরিয়র কালার থিম, লাইটিং ও দেওয়ালের সঠিক মাপ অনুযায়ী নিপুণভাবে পরিকল্পনা ও তৈরি করা হয়।'
        : 'Every custom commission is harmonized to your interior color palette, lighting temperature, and exact architectural wall dimensions.',
      icon: Compass,
      borderColor: 'border-[#00F0FF]/30 hover:border-[#00F0FF]',
    },
  ];

  return (
    <div className="relative min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-16 left-1/4 w-[550px] h-[550px] bg-[#E60049]/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-[#00F0FF]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-20 sm:space-y-28">
        {/* ===================== HERO / ARTIST SPLIT SECTION ===================== */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left: Text, Badges, Lead story */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#E60049]/10 border border-[#E60049]/30 text-[#FFB0C1] shadow-neon-crimson backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>{t('badge')}</span>
            </div>

            <div className="space-y-2">
              <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
                {t('title')}
              </h1>
              <p className="text-sm sm:text-base font-semibold text-gold tracking-wide uppercase font-mono">
                {t('role')} • Artora by FramEmpire
              </p>
            </div>

            <h2 className="text-xl sm:text-2xl font-display font-medium text-white/90 leading-snug">
              {t('headline')}
            </h2>

            <p className="text-sm sm:text-base text-white/75 leading-relaxed font-light">
              {t('bioLead')}
            </p>

            <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
              {t('bioStory')}
            </p>

            {/* Quote Glass Card */}
            <div className="w-full p-5 sm:p-6 rounded-2xl bg-void-card/90 border border-[#E60049]/30 backdrop-blur-2xl relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#E60049]/10 rounded-full blur-2xl pointer-events-none" />
              <p className="text-xs sm:text-sm text-white/90 italic font-serif leading-relaxed">
                "{t('quote')}"
              </p>
              <span className="block mt-3 text-[11px] font-mono text-gold uppercase tracking-wider">
                — Fiha Islam, Studio Founder
              </span>
            </div>

            {/* Quick CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link href="/shop">
                <MagneticButton variant="primary" className="text-xs sm:text-sm min-h-[46px] px-6">
                  <span>{t('ctaExplore')}</span>
                  <ArrowRight className="w-4 h-4" />
                </MagneticButton>
              </Link>
              <Link href="/commission">
                <MagneticButton variant="gold" className="text-xs sm:text-sm min-h-[46px] px-6">
                  <span>{t('ctaCommission')}</span>
                  <Palette className="w-4 h-4" />
                </MagneticButton>
              </Link>
            </div>
          </div>

          {/* Right: Futuristic Liquid Glass Artist Portrait Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md group">
              {/* Glowing aura */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#E60049]/40 via-gold/20 to-[#00F0FF]/30 rounded-[36px] blur-xl opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Main Liquid Glass Frame */}
              <div className="relative rounded-[32px] overflow-hidden bg-void-card border border-white/15 backdrop-blur-2xl shadow-2xl p-3 sm:p-4">
                <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#2B020A] to-[#0D0004]">
                  <Image
                    src="/images/fiha-islam.png"
                    alt="Fiha Islam - Fine Artist & Master Calligrapher"
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0004] via-transparent to-black/20" />

                  {/* Corner Accent Pills */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-void-card/90 border border-glass-border backdrop-blur-md text-[10px] font-mono text-white/90 flex items-center gap-1.5 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Studio Practice Active</span>
                  </div>

                  {/* Bottom Studio Info Overlay */}
                  <div className="absolute bottom-3 inset-x-3 p-4 rounded-xl bg-void-card/95 border border-glass-border backdrop-blur-xl space-y-1.5 shadow-2xl">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white">Fiha Islam</h3>
                      <span className="text-[10px] font-mono text-gold font-semibold">100% Original</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-white/70">
                      <MapPin className="w-3.5 h-3.5 text-[#E60049]" />
                      <span>Kutubpur, Fatullah, Narayanganj</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== CREATIVE EVOLUTION: TIMELINE SECTION ===================== */}
        <section className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-gold uppercase tracking-widest font-mono">
              {t('timelineSubtitle')}
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white">
              {t('timelineTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="p-6 sm:p-7 rounded-3xl bg-void-card/90 border border-glass-border hover:border-gold/50 transition-all duration-300 backdrop-blur-2xl relative overflow-hidden group shadow-xl flex flex-col justify-between space-y-6"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none group-hover:bg-gold/10 transition-colors" />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-lg font-black text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/30">
                        {item.year}
                      </span>
                      <div className="p-2.5 rounded-xl bg-white/5 border border-glass-border text-white group-hover:text-gold transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="font-display font-bold text-base text-white leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-white/70 leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-glass-border flex items-center gap-2 text-[10px] text-white/40 font-mono">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Studio Milestone #{index + 1}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ===================== STUDIO PHILOSOPHY & MEDIUMS ===================== */}
        <section className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-[#00F0FF] uppercase tracking-widest font-mono">
              {t('philosophySubtitle')}
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white">
              {t('philosophyTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className={`p-8 rounded-3xl bg-void-card/90 border ${pillar.borderColor} transition-all duration-300 backdrop-blur-2xl shadow-2xl relative overflow-hidden group space-y-6 flex flex-col justify-between`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-white/5 border border-glass-border text-white/60">
                        {pillar.num}
                      </span>
                      <span className="text-[11px] font-mono text-[#00F0FF] bg-[#00F0FF]/10 px-2.5 py-1 rounded-full border border-[#00F0FF]/30">
                        {pillar.tag}
                      </span>
                    </div>

                    <div className="p-3 w-fit rounded-2xl bg-white/5 border border-glass-border text-gold">
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="font-display font-bold text-lg text-white">
                      {pillar.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-glass-border flex items-center justify-between text-[11px] text-white/50">
                    <span>100% Handcrafted</span>
                    <Award className="w-4 h-4 text-gold" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ===================== AUTHENTICITY & CERTIFICATION ===================== */}
        <section className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#1A030A] via-void-card to-[#0D0004] border border-[#E60049]/30 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-gold/10 border border-gold/30 text-gold">
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>Museum Standard Archival Varnish & Seal</span>
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
                {t('authenticityTitle')}
              </h2>
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-light">
                {t('authenticityDesc')}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-white/80 font-mono">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Artist Physical Signature
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Non-Yellowing UV Varnish
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Unique Registration Code
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="p-6 rounded-2xl bg-void-card border border-glass-border text-center space-y-3 backdrop-blur-xl shadow-xl w-full max-w-xs">
                <ShieldCheck className="w-12 h-12 text-gold mx-auto" />
                <h4 className="font-display font-bold text-sm text-white">Certificate of Authenticity</h4>
                <p className="text-[10px] text-white/50 leading-relaxed">
                  Issued under Artora Fine Art Studio registry & FramEmpire governance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== BOTTOM CTA BANNER ===================== */}
        <section className="text-center py-12 px-6 rounded-3xl bg-void-card/80 border border-glass-border backdrop-blur-2xl space-y-6 max-w-4xl mx-auto shadow-2xl">
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white">
            {t('ctaTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-white/70 max-w-xl mx-auto leading-relaxed">
            {t('ctaDesc')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link href="/shop">
              <MagneticButton variant="primary" className="text-sm min-h-[46px] px-7">
                <span>{t('ctaExplore')}</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </Link>
            <Link href="/commission">
              <MagneticButton variant="gold" className="text-sm min-h-[46px] px-7">
                <span>{t('ctaCommission')}</span>
                <Palette className="w-4 h-4" />
              </MagneticButton>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
