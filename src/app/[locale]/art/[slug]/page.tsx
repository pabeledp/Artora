import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ARTWORKS_DATA } from '@/lib/art-data';
import { ArtworkDetailView } from '@/components/commerce/ArtworkDetailView';

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  const locales = ['en', 'bn'];

  for (const locale of locales) {
    for (const art of ARTWORKS_DATA) {
      params.push({
        locale,
        slug: art.slug,
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const art = ARTWORKS_DATA.find((item) => item.slug === slug);
  if (!art) return {};

  const isBn = locale === 'bn';
  const baseUrl = 'https://artora.framempire.com';
  const pageUrl = `${baseUrl}/${locale}/art/${art.slug}`;
  const titleText = isBn ? art.titleBn : art.title;
  const metaTitle = `${titleText} | Handcrafted Canvas by Fiha Islam - Artora`;

  const metaDesc = isBn
    ? `${art.titleBn} - ${art.mediumBn}। সাইজ: ${art.canvasSizeBn}। রানিং মূল্য: ৳${art.priceBDT.toLocaleString()} টাকা। শিল্পী ফিহা ইসলামের স্বহস্তে অঙ্কিত অরিজিনাল ক্যানভাস আর্ট।`
    : `${art.title} - ${art.medium}. Canvas Size: ${art.canvasSize}. Current Price: ৳${art.priceBDT.toLocaleString()} BDT. Handcrafted original fine art by artist Fiha Islam.`;

  const imageUrl = `${baseUrl}${art.primaryImage}`;

  return {
    title: metaTitle,
    description: metaDesc,
    keywords: [
      art.title,
      'Islamic Wall Art Bangladesh',
      'Arabic Calligraphy Canvas',
      'Handcrafted Impasto Painting Dhaka',
      'Fine Artist Fiha Islam Studio',
      'Bespoke Calligraphy Canvas',
      'Artora Gallery',
    ],
    alternates: {
      canonical: pageUrl,
      languages: {
        en: `${baseUrl}/en/art/${art.slug}`,
        bn: `${baseUrl}/bn/art/${art.slug}`,
      },
    },
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      url: pageUrl,
      siteName: 'Artora by FramEmpire',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${art.title} by Fiha Islam - Artora Studio`,
        },
      ],
      locale: isBn ? 'bn_BD' : 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDesc,
      images: [imageUrl],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const art = ARTWORKS_DATA.find((item) => item.slug === slug);
  if (!art) {
    notFound();
  }

  const baseUrl = 'https://artora.framempire.com';
  const pageUrl = `${baseUrl}/${locale}/art/${art.slug}`;
  const imageUrl = `${baseUrl}${art.primaryImage}`;

  // Structured Data (JSON-LD): VisualArtwork & Product Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'VisualArtwork',
        '@id': `${pageUrl}#artwork`,
        name: art.title,
        alternateName: art.titleBn,
        image: imageUrl,
        description: art.description,
        artMedium: art.medium,
        artform: 'Painting',
        artist: {
          '@type': 'Person',
          name: 'Fiha Islam',
          jobTitle: 'Fine Artist & Master Calligrapher',
          url: baseUrl,
        },
        creator: {
          '@type': 'Person',
          name: 'Fiha Islam',
        },
        width: `${art.dimensions.widthInches} in`,
        height: `${art.dimensions.heightInches} in`,
        depth: `${art.dimensions.depthInches} in`,
      },
      {
        '@type': 'Product',
        '@id': `${pageUrl}#product`,
        name: `${art.title} - Handcrafted Canvas by Fiha Islam`,
        image: imageUrl,
        description: art.description,
        sku: art.id,
        brand: {
          '@type': 'Brand',
          name: 'Artora by FramEmpire',
        },
        offers: {
          '@type': 'Offer',
          url: pageUrl,
          priceCurrency: 'BDT',
          price: art.priceBDT,
          priceValidUntil: '2027-12-31',
          availability: art.isSold ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
          seller: {
            '@type': 'Organization',
            name: 'Artora by FramEmpire',
            url: baseUrl,
          },
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArtworkDetailView art={art} />
    </>
  );
}
