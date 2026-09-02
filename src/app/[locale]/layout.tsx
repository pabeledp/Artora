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

export const metadata: Metadata = {
  metadataBase: new URL('https://www.artora.framempire.com'),
  title: 'Professional Canvas Artist | Fiha Islam',
  description:
    'Original hand-painted acrylic impasto, sacred Arabic calligraphy, and bespoke fine art by artist Fiha Islam. Based in Kutubpur, Fatullah, Narayanganj, Dhaka.',
  keywords: [
    'Professional Canvas Artist',
    'Fiha Islam',
    'Artora',
    'FramEmpire',
    'Arabic Calligraphy Canvas',
    'Acrylic Impasto Artist Bangladesh',
    'Fine Art Dhaka',
    'Custom Painting Commission',
  ],
  icons: {
    icon: '/images/artora-logo.png',
    shortcut: '/images/artora-logo.png',
    apple: '/images/artora-logo.png',
  },
  openGraph: {
    title: 'Professional Canvas Artist | Fiha Islam',
    description:
      'Original hand-painted acrylic impasto, sacred Arabic calligraphy, and bespoke fine art by artist Fiha Islam. Nationwide delivery via Steadfast Courier.',
    url: 'https://www.artora.framempire.com',
    siteName: 'Artora by FramEmpire',
    images: [
      {
        url: '/images/fiha-islam.png',
        width: 1200,
        height: 1200,
        alt: 'Professional Canvas Artist - Fiha Islam',
      },
    ],
    locale: 'bn_BD',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional Canvas Artist | Fiha Islam',
    description:
      'Original hand-painted acrylic impasto, sacred Arabic calligraphy, and bespoke fine art by artist Fiha Islam.',
    images: ['/images/fiha-islam.png'],
  },
};

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
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;600;700;900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/images/artora-logo.png" type="image/png" />
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
