import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-05-28.basil',
})

// Conditionally initialize Supabase only if environment variables are available
let supabase: any = null
if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
  const { createClient } = require('@supabase/supabase-js')
  supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}

// Conditionally initialize nodemailer only if available
let nodemailer: any = null
try {
  nodemailer = require('nodemailer')
} catch (error) {
  console.log('Nodemailer not available, email functionality disabled')
}

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
    const { bookingId, amount, customerEmail, customerName } = await request.json()

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Payment system not configured' },
        { status: 500 }
      )
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        bookingId,
        customerEmail,
        customerName,
      },
    })

    // Update booking status if Supabase is available
    if (supabase && bookingId) {
      try {
        await supabase
          .from('bookings')
          .update({
            payment_status: 'processing',
            stripe_payment_intent_id: paymentIntent.id
          })
          .eq('id', bookingId)
      } catch (dbError) {
        console.log('Database update failed:', dbError)
        // Continue with payment creation even if DB update fails
      }
    }

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    })

  } catch (error) {
    console.error('Payment intent creation failed:', error)
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
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

    // Update booking status if Supabase is available
    if (supabase) {
      try {
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
        } else {
          console.log('✅ Booking status updated:', updatedBooking)
          
          // Send payment confirmation email if nodemailer is available
          if (nodemailer) {
            try {
              await sendPaymentConfirmationEmail(updatedBooking, paymentIntent)
            } catch (emailError) {
              console.error('❌ Failed to send confirmation email:', emailError)
            }
          }
        }
      } catch (dbError) {
        console.error('Database update failed:', dbError)
      }
    }

    return NextResponse.json({
      success: true,
      paymentIntent: {
        id: paymentIntent.id,
        amount: paymentIntent.amount,
        status: paymentIntent.status
      }
    })

  } catch (error) {
    console.error('❌ Error confirming payment:', error)
    return NextResponse.json(
      { error: 'Failed to confirm payment' },
      { status: 500 }
    )
  }
}

async function sendPaymentConfirmationEmail(booking: any, paymentIntent: Stripe.PaymentIntent) {
  if (!nodemailer) {
    console.log('Nodemailer not available, skipping email')
    return
  }

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
        
        <p>Thank you for choosing Events On Charles!</p>
        
        <p>Best regards,<br>
        <strong>Events On Charles Team</strong></p>
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
        subject: `✅ Payment Confirmed - ${booking.event_type}`,
        html: htmlContent
      })

      console.log(`✅ Payment confirmation email sent via ${account.name}`)
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