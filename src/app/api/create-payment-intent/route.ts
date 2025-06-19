import { NextRequest, NextResponse } from 'next/server'
// import Stripe from 'stripe'

// Only initialize Stripe if we have the secret key
// const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY, {
//   apiVersion: '2025-05-28.basil',
// }) : null

// Simple rate limiting for payment attempts
const rateLimitMap = new Map<string, number[]>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowStart = now - 300000 // 5 minute window for payments
  
  const requestTimestamps = rateLimitMap.get(ip) || []
  const recentRequests = requestTimestamps.filter(timestamp => timestamp > windowStart)
  
  if (recentRequests.length >= 3) { // Max 3 payment attempts per 5 minutes
    return false
  }
  
  rateLimitMap.set(ip, [...recentRequests, now])
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting for payment attempts
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'anonymous'
    if (!checkRateLimit(ip)) {
      console.log(`Payment rate limit exceeded for IP: ${ip}`)
      return NextResponse.json(
        { error: 'Too many payment attempts. Please try again later.' }, 
        { status: 429 }
      )
    }

    // Log payment attempt
    console.log(`${new Date().toISOString()} - Payment attempt from IP: ${ip}`)

    const { amount, packageName, customerInfo } = await request.json()

    // Input validation
    if (!amount || amount < 50) { // Minimum $0.50
      return NextResponse.json(
        { error: 'Invalid payment amount' }, 
        { status: 400 }
      )
    }

    if (!customerInfo?.name || !customerInfo?.email) {
      return NextResponse.json(
        { error: 'Customer information is required' }, 
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(customerInfo.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' }, 
        { status: 400 }
      )
    }

    // Demo mode - return mock payment intent
    if (!process.env.STRIPE_SECRET_KEY) {
      console.log('Demo mode: Returning mock payment intent')
      return NextResponse.json({
        clientSecret: 'pi_demo_1234567890_secret_demo',
        demoMode: true,
        message: 'Demo mode - no real payment processed'
      })
    }

    // Real Stripe payment - dynamically import and initialize
    const Stripe = (await import('stripe')).default
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-05-28.basil',
    })

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        venue: 'Events On Charles',
        packageName,
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    })

  } catch (error) {
    console.error('Stripe Payment Error:', error)
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    )
  }
}

// Handle payment confirmation
export async function PUT(request: NextRequest) {
  try {
    const { paymentIntentId } = await request.json()

    // Demo mode
    if (!process.env.STRIPE_SECRET_KEY || paymentIntentId.startsWith('demo_')) {
      return NextResponse.json({
        status: 'succeeded',
        amount: 0,
        currency: 'usd',
        metadata: { demo: true },
      })
    }

    // Real Stripe payment - dynamically import and initialize
    const Stripe = (await import('stripe')).default
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-05-28.basil',
    })

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    return NextResponse.json({
      status: paymentIntent.status,
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency,
      metadata: paymentIntent.metadata,
    })

  } catch (error) {
    console.error('Payment Confirmation Error:', error)
    return NextResponse.json(
      { error: 'Failed to confirm payment' },
      { status: 500 }
    )
  }
} 