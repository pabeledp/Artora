import { MetadataRoute } from 'next';
import { ARTWORKS_DATA } from '@/lib/art-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://artora.framempire.com';
  const locales = ['en', 'bn'];
  const currentDate = new Date().toISOString();

  // Static core pages
  const staticPages = ['', '/shop', '/commission', '/checkout'];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add static routes for each locale
  for (const page of staticPages) {
    for (const locale of locales) {
      const url = `${baseUrl}/${locale}${page}`;
      sitemapEntries.push({
        url,
        lastModified: currentDate,
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1.0 : page === '/shop' ? 0.9 : 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en${page}`,
            bn: `${baseUrl}/bn${page}`,
          },
        },
      });
    }
  }

  // Add dynamic artwork detail routes for each locale
  for (const art of ARTWORKS_DATA) {
    for (const locale of locales) {
      const url = `${baseUrl}/${locale}/art/${art.slug}`;
      sitemapEntries.push({
        url,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.85,
        alternates: {
          languages: {
            en: `${baseUrl}/en/art/${art.slug}`,
            bn: `${baseUrl}/bn/art/${art.slug}`,
          },
        },
      });
    }
  }

  return sitemapEntries;
}
