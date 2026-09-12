import { ARTWORKS_DATA } from '@/lib/art-data';

export const dynamic = 'force-static';

export async function GET() {
  const baseUrl = 'https://artora.framempire.com';
  const locales = ['en', 'bn'];
  const currentDate = new Date().toISOString().split('T')[0];
  const staticPages = [
    { path: '', priority: '1.0', changefreq: 'daily' },
    { path: '/shop', priority: '0.9', changefreq: 'weekly' },
    { path: '/about', priority: '0.85', changefreq: 'weekly' },
    { path: '/commission', priority: '0.85', changefreq: 'weekly' },
    { path: '/privacy-policy', priority: '0.7', changefreq: 'monthly' },
    { path: '/checkout', priority: '0.75', changefreq: 'weekly' },
  ];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

  for (const page of staticPages) {
    for (const locale of locales) {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/${locale}${page.path}</loc>\n`;
      xml += `    <lastmod>${currentDate}</lastmod>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en${page.path}"/>\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="bn" href="${baseUrl}/bn${page.path}"/>\n`;
      xml += '  </url>\n';
    }
  }

  for (const art of ARTWORKS_DATA) {
    for (const locale of locales) {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/${locale}/art/${art.slug}</loc>\n`;
      xml += `    <lastmod>${currentDate}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.85</priority>\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/art/${art.slug}"/>\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="bn" href="${baseUrl}/bn/art/${art.slug}"/>\n`;
      xml += '  </url>\n';
    }
  }

  xml += '</urlset>';

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
