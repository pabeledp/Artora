import { MetadataRoute } from 'next';
import { ARTWORKS_DATA } from '@/lib/art-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://artora.framempire.com';
  const locales = ['en', 'bn'];
  const currentDate = new Date().toISOString();

  // Static core pages
  const staticPages = [
    { path: '', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/shop', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/about', priority: 0.85, changeFrequency: 'weekly' as const },
    { path: '/commission', priority: 0.85, changeFrequency: 'weekly' as const },
    { path: '/privacy-policy', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/checkout', priority: 0.75, changeFrequency: 'weekly' as const },
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add static routes for each locale
  for (const page of staticPages) {
    for (const locale of locales) {
      const url = `${baseUrl}/${locale}${page.path}`;
      sitemapEntries.push({
        url,
        lastModified: currentDate,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: {
            en: `${baseUrl}/en${page.path}`,
            bn: `${baseUrl}/bn${page.path}`,
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
