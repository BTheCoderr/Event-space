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

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()
    const { name, email, phone, eventType, eventDate, guestCount, message, marketingConsent } = formData

    // Validation
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
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
      to: 'support@eventsoncharles.com',
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