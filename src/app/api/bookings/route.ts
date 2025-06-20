import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const bookingData = await request.json()
    
    // Log the booking for development
    console.log('📋 New Booking Received:', {
      customer: bookingData.customer_name,
      email: bookingData.customer_email,
      event: bookingData.event_type,
      date: bookingData.event_date,
      package: bookingData.package_name,
      total: `$${bookingData.total_amount}`,
      deposit: `$${bookingData.deposit_amount}`,
      timestamp: new Date().toISOString()
    })

    // In a real app, you would save this to your database
    // For now, we'll just return success
    
    return NextResponse.json({ 
      success: true, 
      message: 'Booking received successfully',
      bookingId: `EC-${Date.now()}`
    })
    
  } catch (error) {
    console.error('Error processing booking:', error)
    return NextResponse.json(
      { error: 'Failed to process booking' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Events On Charles Booking API',
    status: 'Active'
  })
} 