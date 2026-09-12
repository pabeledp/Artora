import type { Metadata } from 'next';
import Script from 'next/script';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { CurrencyProvider } from '@/lib/currency';
import { CartProvider } from '@/lib/cart';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { CartDrawer } from '@/components/commerce/CartDrawer';
import { CursorFollower } from '@/components/ui/CursorFollower';
import '../globals.css';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isBn = locale === 'bn';
  const baseUrl = 'https://artora.framempire.com';
  const canonicalUrl = `${baseUrl}/${locale}`;

  const title = isBn
    ? 'Artora by FramEmpire | শিল্পী ফিহা ইসলামের স্বহস্তে আঁকা আরবি ক্যালিগ্রাফি ও ইম্পাস্তো ক্যানভাস'
    : 'Artora by FramEmpire | Sacred Calligraphy & Textured Impasto Art by Fiha Islam';

  const description = isBn
    ? 'শিল্পী ফিহা ইসলামের ত্রিমাত্রিক আরবি ক্যালিগ্রাফি, হেভি টেক্সচার্ড অ্যাক্রিলিক ইম্পাস্তো এবং হস্তনির্মিত এক্সক্লুসিভ ক্যানভাস আর্ট। স্টেডফাস্ট কুরিয়ারে সারাদেশে হোম ডেলিভারি।'
    : 'Handcrafted 3D Arabic calligraphy, heavy impasto acrylics, and bespoke collector canvases by fine artist Fiha Islam. Islamic wall art, gold leaf accents & nationwide delivery in Bangladesh.';

  const ogTitle = isBn
    ? 'Artora by FramEmpire | পবিত্র আরবি ক্যালিগ্রাফি ও টেক্সচার্ড ফাইন আর্ট ক্যানভাস'
    : 'Artora by FramEmpire | Sacred Calligraphy & Textured Canvases';

  const ogDescription = isBn
    ? 'শিল্পী ফিহা ইসলামের স্বহস্তে আঁকা অরিজিনাল ক্যানভাস ও কাস্টম আর্টওয়ার্ক। লিভিং রুম ও লাক্সারি ইন্টেরিয়রের জন্য প্রামাণ্য সনদসহ আর্ট।'
    : 'Handcrafted original artworks, 24k gold leaf accents, and bespoke studio pieces by Fiha Islam.';

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: title,
      template: '%s | Artora by FramEmpire',
    },
    description,
    keywords: [
      'Islamic Wall Art Bangladesh',
      'Handcrafted Impasto Painting Dhaka',
      'Bespoke Calligraphy Canvas',
      'Fine Artist Fiha Islam Studio',
      'Arabic Calligraphy Canvas Bangladesh',
      '3D Acrylic Impasto Painting',
      'Artora by FramEmpire',
      'Original Art Dhaka',
      'La Tahzan Calligraphy Canvas',
      'Custom Painting Commission Bangladesh',
    ],
    applicationName: 'Artora by FramEmpire',
    appleWebApp: {
      title: 'Artora by FramEmpire',
      statusBarStyle: 'default',
      capable: true,
    },
    authors: [{ name: 'Fiha Islam', url: baseUrl }],
    creator: 'Fiha Islam (Artora by FramEmpire)',
    publisher: 'Artora by FramEmpire',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/icon-48.png', sizes: '48x48', type: 'image/png' },
        { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { url: '/icon.png', sizes: '512x512', type: 'image/png' },
      ],
      shortcut: '/favicon.ico',
      apple: [
        { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/en`,
        bn: `${baseUrl}/bn`,
      },
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonicalUrl,
      siteName: 'Artora by FramEmpire',
      images: [
        {
          url: `${baseUrl}/images/hero-calligraphy.png`,
          width: 1200,
          height: 630,
          alt: 'Artora Gallery & Handcrafted Canvases by Fiha Islam',
          type: 'image/png',
        },
      ],
      locale: isBn ? 'bn_BD' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@framempire',
      images: [`${baseUrl}/images/hero-calligraphy.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: [
        '3tCfd3Vbg2DwmKkqnD01dIEa7JmUOEuMEkKW-UeRhOg',
        'Oy93MTaszG3wYsln_fWjPwYsDI8eSDTjNJOeaSJH8tI',
      ],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  const siteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://artora.framempire.com/#website',
    url: 'https://artora.framempire.com/',
    name: 'Artora by FramEmpire',
    alternateName: [
      'Artora',
      'Artora by FramEmpire (Fiha Islam)',
      'Artora Fine Art Studio',
      'Artora Studio',
    ],
    description:
      'Handcrafted 3D Arabic calligraphy, heavy impasto acrylics, and bespoke collector canvases by fine artist Fiha Islam.',
    inLanguage: locale === 'bn' ? 'bn-BD' : 'en-US',
    publisher: {
      '@type': 'Organization',
      name: 'FramEmpire',
      url: 'https://framempire.com',
      logo: 'https://artora.framempire.com/icon.png',
    },
  };

  return (
    <html lang={locale} className="dark">
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-GRCKHQTKZ0" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-GRCKHQTKZ0');
            `,
          }}
        />
        <meta name="google-site-verification" content="3tCfd3Vbg2DwmKkqnD01dIEa7JmUOEuMEkKW-UeRhOg" />
        <meta name="google-site-verification" content="Oy93MTaszG3wYsln_fWjPwYsDI8eSDTjNJOeaSJH8tI" />
        <link rel="icon" href="/favicon.ico" sizes="any" />

        <link rel="icon" href="/icon-48.png" type="image/png" sizes="48x48" />
        <link rel="icon" href="/icon-192.png" type="image/png" sizes="192x192" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/apple-icon.png" sizes="180x180" />
        <meta name="application-name" content="Artora by FramEmpire" />
        <meta name="apple-mobile-web-app-title" content="Artora by FramEmpire" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600;700&family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@600;700&display=swap"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600;700&family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className="bg-void text-white font-sans antialiased selection:bg-[#E60049] selection:text-white bg-tech-grid min-h-screen flex flex-col justify-between relative">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <CurrencyProvider>
            <CartProvider>
              <CursorFollower />
              <Navbar />
              <main className="flex-1 pb-20 md:pb-0">{children}</main>
              <Footer />
              <CartDrawer />
            </CartProvider>
          </CurrencyProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
