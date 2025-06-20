import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import nodemailer from 'nodemailer'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil'
})

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Define types
interface BookingData {
  id: string
  customer_name: string
  customer_email: string
  customer_phone?: string
  event_type: string
  event_date: string
  guest_count: number
  package_name: string
  total_amount: number
  deposit_amount: number
  remaining_amount: number
  message?: string
  status: string
  payment_status: string
  created_at: string
  updated_at?: string
  stripe_payment_intent_id?: string
}

// Simple rate limiting for payment attempts
const attempts = new Map()

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    const now = Date.now()
    const windowMs = 5 * 60 * 1000 // 5 minutes
    const maxAttempts = 3

    if (!attempts.has(ip)) {
      attempts.set(ip, [])
    }

    const userAttempts = attempts.get(ip) as number[]
    const recentAttempts = userAttempts.filter(time => now - time < windowMs)
    
    if (recentAttempts.length >= maxAttempts) {
      return NextResponse.json(
        { error: 'Too many payment attempts. Please try again later.' },
        { status: 429 }
      )
    }

    recentAttempts.push(now)
    attempts.set(ip, recentAttempts)

    console.log(`${new Date().toISOString()} - Payment attempt from IP: ${ip}`)

    const { amount, bookingId, customerInfo, paymentType } = await request.json()

    console.log('💳 Creating payment intent:', { bookingId, amount, paymentType })

    // Get booking details from database
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', bookingId)
      .single()

    if (bookingError || !booking) {
      console.error('❌ Booking not found:', bookingError)
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      )
    }

    const bookingData = booking as BookingData

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      metadata: {
        bookingId,
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        paymentType,
        eventType: bookingData.event_type,
        eventDate: bookingData.event_date,
        packageName: bookingData.package_name
      },
      description: `${paymentType === 'deposit' ? 'Deposit' : 'Payment'} for ${bookingData.event_type} - ${bookingData.customer_name}`
    })

    console.log('✅ Payment intent created:', paymentIntent.id)

    // Set up webhook to handle successful payments
    // For now, we'll handle the success in the frontend and call another API

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    })

  } catch (error) {
    console.error('❌ Error creating payment intent:', error)
    return NextResponse.json(
      { error: 'Failed to create payment intent', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// Handle successful payment confirmation
export async function PUT(request: NextRequest) {
  try {
    const { paymentIntentId, bookingId } = await request.json()

    console.log('✅ Confirming payment success:', { paymentIntentId, bookingId })

    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    if (paymentIntent.status !== 'succeeded') {
      return NextResponse.json(
        { error: 'Payment not successful' },
        { status: 400 }
      )
    }

    // Update booking status in database
    const { data: updatedBooking, error: updateError } = await supabase
      .from('bookings')
      .update({
        status: 'confirmed',
        payment_status: paymentIntent.metadata.paymentType === 'deposit' ? 'deposit_paid' : 'fully_paid',
        stripe_payment_intent_id: paymentIntentId,
        updated_at: new Date().toISOString()
      })
      .eq('id', bookingId)
      .select()
      .single()

    if (updateError) {
      console.error('❌ Error updating booking:', updateError)
      return NextResponse.json(
        { error: 'Failed to update booking status' },
        { status: 500 }
      )
    }

    const updatedBookingData = updatedBooking as BookingData

    console.log('✅ Booking status updated:', updatedBookingData)

    // Send payment confirmation email
    try {
      await sendPaymentConfirmationEmail(updatedBookingData, paymentIntent)
    } catch (emailError) {
      console.error('❌ Failed to send confirmation email:', emailError)
      // Don't fail the entire request if email fails
    }

    return NextResponse.json({
      success: true,
      booking: updatedBookingData,
      paymentIntent: {
        id: paymentIntent.id,
        amount: paymentIntent.amount,
        status: paymentIntent.status
      }
    })

  } catch (error) {
    console.error('❌ Error confirming payment:', error)
    return NextResponse.json(
      { error: 'Failed to confirm payment', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

async function sendPaymentConfirmationEmail(booking: BookingData, paymentIntent: Stripe.PaymentIntent) {
  const amount = (paymentIntent.amount / 100).toFixed(2)
  const isDeposit = paymentIntent.metadata.paymentType === 'deposit'
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Payment Confirmation - Events On Charles</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #d4af37, #f4e4a1); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Events On Charles</h1>
        <p style="color: white; margin: 5px 0 0 0; font-size: 16px;">Baltimore's Premier Event Venue</p>
      </div>
      
      <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <h2 style="color: #28a745; margin-top: 0;">🎉 Payment Confirmed!</h2>
        
        <p>Dear ${booking.customer_name},</p>
        
        <p>Great news! We've successfully processed your ${isDeposit ? 'deposit' : 'payment'} for your upcoming event.</p>
        
        <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
          <h3 style="color: #28a745; margin-top: 0;">✅ Payment Details:</h3>
          <p><strong>💰 Amount Paid:</strong> $${amount}</p>
          <p><strong>💳 Payment Type:</strong> ${isDeposit ? 'Event Deposit (25%)' : 'Full Payment'}</p>
          <p><strong>🆔 Transaction ID:</strong> ${paymentIntent.id}</p>
          <p><strong>📅 Payment Date:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #d4af37; margin-top: 0;">🎊 Event Details:</h3>
          <p><strong>📅 Date:</strong> ${new Date(booking.event_date).toLocaleDateString()}</p>
          <p><strong>🎉 Event Type:</strong> ${booking.event_type}</p>
          <p><strong>📦 Package:</strong> ${booking.package_name}</p>
          <p><strong>🆔 Booking ID:</strong> ${booking.id}</p>
        </div>
        
        ${isDeposit ? `
        <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
          <h4 style="color: #856404; margin-top: 0;">📋 Next Steps:</h4>
          <p style="color: #856404; margin-bottom: 0;">
            Your event is now <strong>officially confirmed</strong>! The remaining balance will be due on your event date.<br><br>
            We'll contact you closer to your event date to finalize all the details and arrange final payment.
          </p>
        </div>
        ` : `
        <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
          <h4 style="color: #28a745; margin-top: 0;">🎯 You're All Set!</h4>
          <p style="color: #28a745; margin-bottom: 0;">
            Your payment is complete and your event is fully confirmed. We'll be in touch closer to your event date to finalize all the details.
          </p>
        </div>
        `}
        
        <div style="text-align: center; margin: 30px 0;">
          <p><strong>📞 Phone:</strong> (401) 671-6758</p>
          <p><strong>📧 Email:</strong> support@eventsoncharles.com</p>
          <p><strong>🌐 Website:</strong> eventsoncharles.com</p>
        </div>
        
        <p>Thank you for choosing Events On Charles for your special event. We can't wait to make your celebration unforgettable!</p>
        
        <p>Best regards,<br>
        <strong>Events On Charles Team</strong><br>
        Baltimore's Premier Event Venue</p>
        
        <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px; font-size: 12px; color: #666; text-align: center;">
          <p>Keep this email as your payment receipt. If you have any questions, please contact us immediately.</p>
          <p>Transaction ID: ${paymentIntent.id} | Booking Reference: ${booking.id}</p>
        </div>
      </div>
    </body>
    </html>
  `

  // Email accounts to try (primary and backup)
  const emailAccounts = [
    {
      name: 'Primary Support',
      user: 'support@eventsoncharles.com',
      pass: 'Eventsoncharles45722691'
    },
    {
      name: 'Backup Info',
      user: 'info@eventsoncharles.com',
      pass: 'Kdotc457$'
    }
  ]

  // Try each email account
  for (let i = 0; i < emailAccounts.length; i++) {
    const account = emailAccounts[i]
    
    try {
      console.log(`📧 Sending payment confirmation via ${account.name}...`)
      
      // Create Zoho Mail transporter
      const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 587,
        secure: false,
        auth: {
          user: account.user,
          pass: account.pass
        },
        tls: {
          rejectUnauthorized: false
        }
      })

      // Send customer confirmation
      await transporter.sendMail({
        from: `Events On Charles <${account.user}>`,
        to: booking.customer_email,
        subject: `✅ Payment Confirmed - ${booking.event_type} on ${new Date(booking.event_date).toLocaleDateString()}`,
        html: htmlContent
      })

      // Send internal notification
      await transporter.sendMail({
        from: `Events On Charles <${account.user}>`,
        to: account.user,
        subject: `💰 Payment Received - ${booking.customer_name} (${booking.id})`,
        html: `
          <h2>Payment Successfully Processed</h2>
          <p><strong>Customer:</strong> ${booking.customer_name}</p>
          <p><strong>Email:</strong> ${booking.customer_email}</p>
          <p><strong>Event:</strong> ${booking.event_type} on ${new Date(booking.event_date).toLocaleDateString()}</p>
          <p><strong>Package:</strong> ${booking.package_name}</p>
          <p><strong>Amount Paid:</strong> $${amount}</p>
          <p><strong>Payment Type:</strong> ${isDeposit ? 'Deposit (25%)' : 'Full Payment'}</p>
          <p><strong>Transaction ID:</strong> ${paymentIntent.id}</p>
          <p><strong>Booking ID:</strong> ${booking.id}</p>
          <p><strong>New Status:</strong> ${booking.status} (${booking.payment_status})</p>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3>Booking Status Updated:</h3>
            <ul>
              <li>✅ Payment processed successfully</li>
              <li>✅ Booking status: ${booking.status}</li>
              <li>✅ Payment status: ${booking.payment_status}</li>
              <li>✅ Customer confirmation email sent</li>
            </ul>
          </div>
        `
      })

      console.log(`✅ Payment confirmation emails sent via ${account.name}`)
      return // Success, exit the function

    } catch (emailError) {
      console.error(`❌ Failed to send via ${account.name}:`, emailError)
      
      // If this isn't the last account, try the next one
      if (i < emailAccounts.length - 1) {
        console.log(`🔄 Trying next email account...`)
        continue
      }
    }
  }

  // If all accounts failed, log the error
  console.error('❌ All email accounts failed for payment confirmation')
} 