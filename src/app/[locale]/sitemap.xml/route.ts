import { ARTWORKS_DATA } from '@/lib/art-data';

export async function GET() {
  const baseUrl = 'https://artora.framempire.com';
  const locales = ['en', 'bn'];
  const currentDate = new Date().toISOString().split('T')[0];
  const staticPages = ['', '/shop', '/commission', '/checkout'];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

  for (const page of staticPages) {
    for (const locale of locales) {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/${locale}${page}</loc>\n`;
      xml += `    <lastmod>${currentDate}</lastmod>\n`;
      xml += `    <changefreq>${page === '' ? 'daily' : 'weekly'}</changefreq>\n`;
      xml += `    <priority>${page === '' ? '1.0' : '0.8'}</priority>\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en${page}"/>\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="bn" href="${baseUrl}/bn${page}"/>\n`;
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
