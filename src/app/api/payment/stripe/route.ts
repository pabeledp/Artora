import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderNumber, totalUSD, customerName, email } = body;

    // Simulate Stripe Payment Intent Creation
    // In production: const paymentIntent = await stripe.paymentIntents.create({ amount: totalUSD * 100, currency: 'usd' });
    const clientSecret = `pi_mock_${Math.random().toString(36).substring(2, 16)}_secret_${Math.random().toString(36).substring(2, 16)}`;

    return NextResponse.json({
      clientSecret,
      orderNumber,
      amount: totalUSD,
      currency: 'USD',
      status: 'requires_payment_method',
      mockSuccess: true,
    });
  } catch (error: any) {
    console.error('Stripe initiation error:', error);
    return NextResponse.json(
      { error: 'Stripe PaymentIntent creation failed', details: error.message },
      { status: 500 }
    );
  }
}
