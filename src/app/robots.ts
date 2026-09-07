import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://artora.framempire.com/sitemap.xml',
    host: 'https://artora.framempire.com',
  };
}
