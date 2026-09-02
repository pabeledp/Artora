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
  title: 'Artora by FramEmpire • Fiha Islam | Futuristic Acrylic & Fine Art',
  description:
    'Futuristic luxury e-commerce portfolio and 3D art experience by artist Fiha Islam. Original acrylic impasto, wearable canvas silks, and bespoke art commissions in Dhaka, Bangladesh.',
  keywords: [
    'Artora',
    'FramEmpire',
    'Fiha Islam',
    'Acrylic Impasto Bangladesh',
    'Fine Art Dhaka',
    'Custom Painting Commission',
    '3D Art Gallery',
    'Hand-Painted Silk',
  ],
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
      </head>
      <body className="bg-void text-white font-sans antialiased selection:bg-crimson selection:text-white bg-tech-grid min-h-screen flex flex-col justify-between relative">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <CurrencyProvider>
            <CartProvider>
              <CursorFollower />
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <CartDrawer />
            </CartProvider>
          </CurrencyProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
