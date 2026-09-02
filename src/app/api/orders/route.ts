import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customerName,
      phone,
      email,
      paymentMethod,
      shippingAddress,
      division,
      items,
      totalBDT,
      totalUSD,
      currency,
    } = body;

    if (!customerName || !phone || !shippingAddress || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required order fields or items' },
        { status: 400 }
      );
    }

    const orderNumber = `ART-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName,
        phone,
        email: email || '',
        paymentMethod: paymentMethod || 'bKash',
        paymentStatus: paymentMethod === 'Pathao_COD' ? 'COD' : 'PAID',
        shippingAddress,
        division: division || 'Dhaka',
        itemsJson: JSON.stringify(items),
        totalBDT: Number(totalBDT),
        totalUSD: Number(totalUSD),
        currency: currency || 'BDT',
        transactionId: `TXN-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        courierStatus: 'PROCESSING',
      },
    });

    return NextResponse.json({
      success: true,
      orderNumber: order.orderNumber,
      orderId: order.id,
      data: order,
    });
  } catch (error: any) {
    console.error('Error in orders API:', error);
    return NextResponse.json(
      { error: 'Failed to create order', details: error.message },
      { status: 500 }
    );
  }
}
