<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xhtml="http://www.w3.org/1999/xhtml"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>XML Sitemap • Artora by FramEmpire</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@500;600;700&amp;family=Inter:wght@400;500;600;700&amp;family=Space+Grotesk:wght@600;700&amp;display=swap" rel="stylesheet" />
        <style type="text/css">
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            background-color: #0D0004;
            color: #FFFFFF;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            font-size: 14px;
            line-height: 1.6;
            padding: 40px 20px;
            min-height: 100vh;
          }
          .container {
            max-width: 1080px;
            margin: 0 auto;
          }
          .header {
            margin-bottom: 32px;
            padding: 28px 32px;
            background: rgba(27, 3, 10, 0.85);
            border: 1px solid rgba(230, 0, 73, 0.25);
            border-radius: 20px;
            backdrop-filter: blur(20px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
          .badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 4px 14px;
            border-radius: 9999px;
            font-size: 11px;
            font-family: monospace;
            font-weight: 700;
            background: rgba(230, 0, 73, 0.15);
            border: 1px solid rgba(230, 0, 73, 0.4);
            color: #FFB0C1;
            width: fit-content;
          }
          .dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background-color: #E6B93F;
          }
          h1 {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 26px;
            font-weight: 700;
            color: #FFFFFF;
            letter-spacing: -0.02em;
          }
          p.desc {
            color: rgba(255, 255, 255, 0.65);
            font-size: 13px;
          }
          .stats {
            display: flex;
            gap: 20px;
            margin-top: 8px;
            font-size: 12px;
            color: #E6B93F;
            font-family: monospace;
          }
          .table-wrapper {
            background: rgba(27, 3, 10, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(16px);
          }
          table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
          }
          th {
            background: rgba(230, 0, 73, 0.12);
            padding: 14px 18px;
            font-weight: 600;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #FFB0C1;
            border-bottom: 1px solid rgba(230, 0, 73, 0.2);
          }
          td {
            padding: 14px 18px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            color: rgba(255, 255, 255, 0.85);
            font-size: 13px;
          }
          tr:last-child td {
            border-bottom: none;
          }
          tr:hover td {
            background: rgba(230, 0, 73, 0.06);
          }
          a {
            color: #FFB0C1;
            text-decoration: none;
            word-break: break-all;
            transition: color 0.2s ease;
          }
          a:hover {
            color: #E6B93F;
            text-decoration: underline;
          }
          .tag {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 6px;
            font-size: 11px;
            font-family: monospace;
            background: rgba(255, 255, 255, 0.06);
            color: rgba(255, 255, 255, 0.8);
          }
          .priority-high {
            color: #E6B93F;
            font-weight: 600;
          }
          @media (max-width: 768px) {
            body { padding: 20px 12px; }
            .header { padding: 20px; }
            th:nth-child(3), td:nth-child(3),
            th:nth-child(4), td:nth-child(4) { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="badge">
              <span class="dot"></span>
              ARTORA STUDIO • SITEMAP INDEX
            </div>
            <h1>Google Search Engine XML Sitemap</h1>
            <p class="desc">This is an XML sitemap generated dynamically for Google and other search engine web crawlers. It lists all public bilingual pages (English &amp; Bengali) and bespoke artwork canvases.</p>
            <div class="stats">
              <span>Total URLs: <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></span>
              <span>•</span>
              <span>Status: Active &amp; Indexed</span>
            </div>
          </div>

          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th style="width: 55%;">URL / Location</th>
                  <th style="width: 15%;">Priority</th>
                  <th style="width: 15%;">Change Frequency</th>
                  <th style="width: 15%;">Last Modified</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <tr>
                    <td>
                      <xsl:variable name="itemURL">
                        <xsl:value-of select="sitemap:loc"/>
                      </xsl:variable>
                      <a href="{$itemURL}">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    <td>
                      <span class="tag priority-high">
                        <xsl:value-of select="sitemap:priority"/>
                      </span>
                    </td>
                    <td>
                      <span class="tag">
                        <xsl:value-of select="sitemap:changefreq"/>
                      </span>
                    </td>
                    <td style="font-size: 11px; color: rgba(255, 255, 255, 0.5); font-family: monospace;">
                      <xsl:value-of select="substring(sitemap:lastmod, 0, 11)"/>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
