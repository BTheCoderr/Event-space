import { NextRequest, NextResponse } from 'next/server'

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

    // Log the form submission (for testing)
    console.log('📧 FORM SUBMISSION RECEIVED:')
    console.log('==============================')
    console.log(`Name: ${name}`)
    console.log(`Email: ${email}`)
    console.log(`Phone: ${phone || 'Not provided'}`)
    console.log(`Event Type: ${eventType || 'Not specified'}`)
    console.log(`Event Date: ${eventDate || 'Not specified'}`)
    console.log(`Guest Count: ${guestCount || 'Not specified'}`)
    console.log(`Message: ${message || 'No message'}`)
    console.log(`Marketing Consent: ${marketingConsent ? 'Yes' : 'No'}`)
    console.log('==============================')

    // Return success (simulating email sent)
    return NextResponse.json({
      success: true,
      message: 'Form submitted successfully! (Emails will work once Zoho is fully configured)',
      debug: {
        formData,
        note: 'This is a temporary endpoint for testing'
      }
    })

  } catch (error) {
    console.error('Form processing error:', error)
    return NextResponse.json(
      { error: 'Failed to process form' },
      { status: 500 }
    )
  }
} 