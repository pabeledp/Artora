import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customerName,
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

    if (!customerName || !phone || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Customer name, phone and at least one artwork are required.' },
        { status: 400 }
      );
    }

    const orderNumber = `ART-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    // Safely attempt to persist in DB (non-blocking if serverless SQLite)
    try {
      await prisma.order.create({
        data: {
          orderNumber,
          customerName,
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

    // Build formatted WhatsApp message
    const itemSummary = items
      .map((it: any) => `• ${it.title} (${it.quantity || 1}x) - ৳${it.priceBDT || 0}`)
      .join('\n');

    const whatsappMessage = encodeURIComponent(
      `🎨 *Artora Art Inquiry & Order Request*\n\n` +
      `*Order/Inquiry Ref:* #${orderNumber}\n` +
      `*Collector Name:* ${customerName}\n` +
      `*Phone:* ${phone}\n` +
      `*Address/City:* ${shippingAddress || 'Dhaka'}\n` +
      `*Items Requested:*\n${itemSummary}\n\n` +
      (notes ? `*Custom Notes / Framing:* ${notes}\n\n` : '') +
      `Hello Fiha Islam, I would like to finalize pricing and discuss delivery for this artwork.`
    );

    const whatsappUrl = `https://wa.me/8801723722019?text=${whatsappMessage}`;

    return NextResponse.json({
      success: true,
      orderNumber,
      whatsappUrl,
      message: 'Inquiry received successfully. Direct WhatsApp discussion ready.',
    });
  } catch (error: any) {
    console.error('Error in orders API:', error);
    return NextResponse.json(
      { error: 'Failed to process inquiry', details: error.message },
      { status: 500 }
    );
  }
}
