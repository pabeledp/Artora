import React from 'react';
import Link from 'next/link';

export default function RootNotFound() {
  return (
    <html lang="en" className="dark">
      <head>
        <title>404 - Masterpiece Not Found | Artora by FramEmpire</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700;900&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ backgroundColor: '#0D0004', color: '#FFFFFF', margin: 0, fontFamily: 'Inter, sans-serif' }}>
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', position: 'relative', overflow: 'hidden' }}>
          {/* Ambient Glow */}
          <div style={{ position: 'absolute', top: '20%', left: '30%', width: '400px', height: '400px', backgroundColor: 'rgba(230, 0, 73, 0.15)', borderRadius: '50%', filter: 'blur(140px)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '20%', right: '30%', width: '400px', height: '400px', backgroundColor: 'rgba(230, 185, 63, 0.12)', borderRadius: '50%', filter: 'blur(140px)', pointerEvents: 'none' }} />

          <div style={{ maxWidth: '560px', width: '100%', position: 'relative', zIndex: 10, textAlign: 'center', backgroundColor: 'rgba(27, 3, 10, 0.85)', border: '1px solid rgba(230, 0, 73, 0.25)', borderRadius: '24px', padding: '40px 32px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(20px)' }}>
            <div style={{ display: 'inline-block', padding: '6px 16px', borderRadius: '9999px', fontSize: '11px', fontFamily: 'monospace', fontWeight: 'bold', backgroundColor: 'rgba(230, 0, 73, 0.15)', border: '1px solid rgba(230, 0, 73, 0.4)', color: '#FFB0C1', marginBottom: '16px' }}>
              404 • ARTORA STUDIO ARCHIVE
            </div>

            <div style={{ fontSize: '72px', fontWeight: 900, fontFamily: 'Space Grotesk, sans-serif', background: 'linear-gradient(135deg, #E60049 0%, #FFB0C1 50%, #E6B93F 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: '0 0 12px 0' }}>
              404
            </div>

            <h1 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 12px 0', color: '#FFFFFF' }}>
              Masterpiece Not Found
            </h1>

            <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6', margin: '0 0 28px 0' }}>
              The canvas or page you are looking for has been relocated or is resting in our private studio vault.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
              <Link href="/" style={{ textDecoration: 'none', padding: '12px 24px', borderRadius: '9999px', fontSize: '13px', fontWeight: 600, color: '#FFFFFF', backgroundColor: '#E60049', boxShadow: '0 0 25px -4px rgba(230, 0, 73, 0.45)', display: 'inline-block' }}>
                Return to Studio Home
              </Link>
              <Link href="/shop" style={{ textDecoration: 'none', padding: '12px 24px', borderRadius: '9999px', fontSize: '13px', fontWeight: 600, color: '#FFFFFF', backgroundColor: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)', display: 'inline-block' }}>
                Explore Gallery Shop
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
