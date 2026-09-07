import type { Metadata } from 'next';
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
    authors: [{ name: 'Fiha Islam', url: baseUrl }],
    creator: 'Fiha Islam (Artora by FramEmpire)',
    publisher: 'FramEmpire',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    icons: {
      icon: [
        { url: '/images/artora-logo.png', sizes: '32x32', type: 'image/png' },
        { url: '/images/artora-logo.png', sizes: '192x192', type: 'image/png' },
      ],
      shortcut: '/images/artora-logo.png',
      apple: '/images/artora-logo.png',
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

  return (
    <html lang={locale} className="dark">
      <head>
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
