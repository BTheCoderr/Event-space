import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { render } from '@react-email/render'
import { ContactConfirmationEmail } from '@/app/components/emails/ContactConfirmationEmail'
import { InternalNotificationEmail } from '@/app/components/emails/InternalNotificationEmail'

// Create Zoho Mail transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_PASSWORD,
  },
  debug: true, // Enable debug logging
})

// Simple rate limiting
const rateLimitMap = new Map<string, number[]>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowStart = now - 60000 // 1 minute window
  
  const requestTimestamps = rateLimitMap.get(ip) || []
  const recentRequests = requestTimestamps.filter(timestamp => timestamp > windowStart)
  
  if (recentRequests.length >= 5) { // Max 5 requests per minute
    return false
  }
  
  rateLimitMap.set(ip, [...recentRequests, now])
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'anonymous'
    if (!checkRateLimit(ip)) {
      console.log(`Rate limit exceeded for IP: ${ip}`)
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' }, 
        { status: 429 }
      )
    }

    // Log request
    console.log(`${new Date().toISOString()} - Contact form submission from IP: ${ip}`)

    const body = await request.json()
    const { name, email, phone, eventType, eventDate, guestCount, message, marketingConsent } = body

    // Input validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' }, 
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' }, 
        { status: 400 }
      )
    }

    console.log('📧 Processing contact form for:', name, email)

    // Render email templates to HTML
    const customerEmailHtml = await render(ContactConfirmationEmail({
      name,
      eventType,
      eventDate,
      guestCount,
    }))

    const businessEmailHtml = await render(InternalNotificationEmail({
      name,
      email,
      phone,
      eventType,
      eventDate,
      guestCount,
      message,
      marketingConsent,
    }))

    // Send confirmation email to customer
    const customerEmailResult = await transporter.sendMail({
      from: `"Events On Charles" <${process.env.ZOHO_EMAIL}>`,
      to: email,
      subject: 'Thank you for your inquiry - Events On Charles',
      html: customerEmailHtml,
    })

    // Send notification email to business
    const businessEmailResult = await transporter.sendMail({
      from: `"Website Contact" <${process.env.ZOHO_EMAIL}>`,
      to: process.env.ZOHO_EMAIL,
      subject: `New Event Inquiry from ${name}`,
      html: businessEmailHtml,
    })

    return NextResponse.json({
      success: true,
      message: 'Emails sent successfully',
      customerEmailId: customerEmailResult.messageId,
      businessEmailId: businessEmailResult.messageId,
    })

  } catch (error) {
    console.error('Email sending error:', error)
    return NextResponse.json(
      { error: 'Failed to send emails' },
      { status: 500 }
    )
  }
} 