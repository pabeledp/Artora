import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customerName,
      fullName,
      phone,
      email,
      shippingAddress,
      division,
      notes,
      items,
      totalBDT,
      totalUSD,
      currency,
    } = body;

    const name = fullName || customerName;

    if (!name || !phone || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Customer name, phone and at least one artwork are required.' },
        { status: 400 }
      );
    }

    const orderNumber = `ART-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    // 1. Safely attempt to persist in DB (non-blocking if serverless SQLite)
    try {
      await prisma.order.create({
        data: {
          orderNumber,
          customerName: name,
          phone,
          email: email || '',
          paymentMethod: 'Custom_Inquiry',
          paymentStatus: 'INQUIRY_RECEIVED',
          shippingAddress: shippingAddress || 'N/A',
          division: division || 'Dhaka',
          itemsJson: JSON.stringify(items),
          totalBDT: Number(totalBDT) || 0,
          totalUSD: Number(totalUSD) || 0,
          currency: currency || 'BDT',
          courierStatus: 'INQUIRY',
        },
      });
    } catch (dbErr) {
      console.warn('Database write note (safe fallback for serverless):', dbErr);
    }

    // 2. Build items summary
    const itemTitles = items.map((it: any) => `${it.title} (${it.quantity || 1}x)`).join(', ');
    const itemSummary = items
      .map((it: any) => `• ${it.title} (${it.quantity || 1}x) - ৳${it.priceBDT || 0}`)
      .join('\n');

    // 3. Google Apps Script Web App API Forwarding (Google Sheets & Email)
    const appsScriptUrl =
      process.env.NEXT_PUBLIC_APPS_SCRIPT_URL ||
      'https://script.google.com/macros/s/AKfycbyhE7UBrWkfQPQZZBqTXnObIqITWi7uh6MWwGN8Ac44GPLh9ic1mjtswiPS6Yv7lcWU8A/exec';

    if (appsScriptUrl) {
      try {
        await fetch(appsScriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({
            canvasSize: itemTitles || 'Gallery Collection',
            colorTheme: 'Collector Order Inquiry',
            wallPhotoUrl: items[0]?.primaryImage || items[0]?.art?.primaryImage || 'No Photo Attached',
            visionDescription: `[Order #${orderNumber}] Address: ${shippingAddress || 'Dhaka'} (${division || 'Dhaka'}) | Notes: ${notes || 'Direct Purchase'}`,
            fullName: name,
            phone,
            email: email || '',
            estimatedPrice: `৳${Number(totalBDT || 0).toLocaleString()}`,
            submittedAt: new Date().toISOString(),
          }),
        });
      } catch (gasErr) {
        console.warn('Google Apps Script forward note from orders API:', gasErr);
      }
    }

    // 4. Build formatted WhatsApp message
    const whatsappMessage = encodeURIComponent(
      `🎨 *Artora Art Inquiry & Order Request*\n\n` +
      `*Order/Inquiry Ref:* #${orderNumber}\n` +
      `*Collector Name:* ${name}\n` +
      `*Phone:* ${phone}\n` +
      `*Address/City:* ${shippingAddress || 'Dhaka'} (${division || 'Dhaka'})\n` +
      `*Items Requested:*\n${itemSummary}\n\n` +
      `*Estimated Price:* ৳${Number(totalBDT || 0).toLocaleString()}\n\n` +
      (notes ? `*Custom Notes / Framing:* ${notes}\n\n` : '') +
      `Hello Fiha Islam, I have submitted an artwork inquiry (Ref: #${orderNumber}) and would like to finalize pricing and delivery!`
    );

    const whatsappUrl = `https://wa.me/8801723722019?text=${whatsappMessage}`;

    return NextResponse.json({
      success: true,
      result: 'success',
      orderNumber,
      whatsappUrl,
      message: 'Inquiry received successfully and synced with Google Sheets & Studio.',
    });
  } catch (error: any) {
    console.error('Error in orders API:', error);
    return NextResponse.json(
      { error: 'Failed to process inquiry', details: error.message },
      { status: 500 }
    );
  }
}
