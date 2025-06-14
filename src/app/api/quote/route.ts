import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { render } from '@react-email/render'
import { QuoteRequestEmail } from '@/app/components/emails/QuoteRequestEmail'
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

interface QuoteItem {
  name: string
  price: number
  quantity: number
  total: number
}

interface QuoteRequestData {
  customerName: string
  customerEmail: string
  customerPhone?: string
  eventType: string
  eventDate: string
  guestCount: number
  venuePackage: string
  items: QuoteItem[]
  message?: string
}

export async function POST(request: NextRequest) {
  try {
    const quoteData: QuoteRequestData = await request.json()
    const {
      customerName,
      customerEmail,
      customerPhone,
      eventType,
      eventDate,
      guestCount,
      venuePackage,
      items,
      message
    } = quoteData

    // Validation
    if (!customerName || !customerEmail || !eventType || !eventDate) {
      return NextResponse.json(
        { error: 'Required fields missing' },
        { status: 400 }
      )
    }

    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + item.total, 0)
    const deposit = Math.ceil(subtotal * 0.25) // 25% deposit
    const total = subtotal

    // Generate quote number
    const quoteNumber = `EOC-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`

    // Render email templates to HTML
    const customerQuoteHtml = await render(QuoteRequestEmail({
      customerName,
      customerEmail: customerEmail,
      eventType,
      eventDate,
      guestCount,
      venuePackage,
      items,
      subtotal,
      deposit,
      total,
      quoteNumber,
    }))

    const businessNotificationHtml = await render(InternalNotificationEmail({
      name: customerName,
      email: customerEmail,
      phone: customerPhone || '',
      eventType,
      eventDate,
      guestCount: guestCount.toString(),
      message: `Quote Details:\n\nVenue Package: ${venuePackage}\nItems: ${items.map(item => `${item.name} (${item.quantity}x)`).join(', ')}\nSubtotal: $${subtotal}\nDeposit Required: $${deposit}\n\nCustomer Message: ${message || 'None'}`,
      marketingConsent: false,
    }))

    // Send quote email to customer
    const customerEmailResponse = await transporter.sendMail({
      from: `"Events On Charles" <${process.env.ZOHO_EMAIL}>`,
      to: customerEmail,
      subject: `Your Custom Quote #${quoteNumber} - Events On Charles`,
      html: customerQuoteHtml,
    })

    // Send internal notification
    const businessEmailResponse = await transporter.sendMail({
      from: `"Quote System" <${process.env.ZOHO_EMAIL}>`,
      to: 'info@eventsoncharles.com',
      subject: `New Quote Generated - ${customerName} (${quoteNumber})`,
      html: businessNotificationHtml,
    })

    return NextResponse.json({
      success: true,
      message: 'Quote generated and sent successfully',
      quoteNumber,
      subtotal,
      deposit,
      total,
      customerEmailId: customerEmailResponse.messageId,
      businessEmailId: businessEmailResponse.messageId,
    })

  } catch (error) {
    console.error('Quote generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate quote' },
      { status: 500 }
    )
  }
}

// GET endpoint to retrieve quote by number
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const quoteNumber = searchParams.get('quoteNumber')

  if (!quoteNumber) {
    return NextResponse.json(
      { error: 'Quote number required' },
      { status: 400 }
    )
  }

  // In a real application, you would fetch this from a database
  // For now, we'll return a placeholder response
  return NextResponse.json({
    message: 'Quote retrieval would be implemented with a database',
    quoteNumber,
  })
} 