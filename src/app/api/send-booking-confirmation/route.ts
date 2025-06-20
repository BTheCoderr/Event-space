import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { 
      email, 
      name, 
      eventType, 
      eventDate, 
      packageName, 
      totalAmount, 
      depositAmount,
      bookingId,
      status = 'inquiry'
    } = await request.json()

    // Create Zoho Mail transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.ZOHO_EMAIL || 'support@eventsoncharles.com',
        pass: process.env.ZOHO_PASSWORD || 'Eventsoncharles45722691'
      }
    })

    // Customer confirmation email
    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Booking Confirmation - Events On Charles</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #d4af37, #f4e4a1); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Events On Charles</h1>
          <p style="color: white; margin: 5px 0 0 0; font-size: 16px;">Baltimore's Premier Event Venue</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #d4af37; margin-top: 0;">Thank You for Your Booking Request!</h2>
          
          <p>Dear ${name},</p>
          
          <p>Thank you for choosing Events On Charles! We've received your booking request and are excited to help make your event unforgettable.</p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #d4af37; margin-top: 0;">Event Details:</h3>
            <p><strong>📅 Date:</strong> ${new Date(eventDate).toLocaleDateString()}</p>
            <p><strong>🎉 Event Type:</strong> ${eventType}</p>
            <p><strong>📦 Package:</strong> ${packageName}</p>
            <p><strong>💰 Total Cost:</strong> $${totalAmount}</p>
            <p><strong>💳 Deposit (25%):</strong> $${depositAmount}</p>
            <p><strong>🆔 Booking ID:</strong> ${bookingId}</p>
          </div>
          
          <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
            <h3 style="color: #28a745; margin-top: 0;">🎯 Next Steps:</h3>
            <p>1. ✅ We'll check availability for ${new Date(eventDate).toLocaleDateString()}</p>
            <p>2. 📧 You'll receive confirmation within 24 hours</p>
            <p>3. 💳 If available, we'll send a secure payment link for your deposit</p>
            <p>4. 🎉 Once deposit is paid, your event is officially confirmed!</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <p><strong>📞 Phone:</strong> (401) 671-6758</p>
            <p><strong>📧 Email:</strong> support@eventsoncharles.com</p>
          </div>
          
          <p>We're excited to host your special event at Events On Charles!</p>
          
          <p>Best regards,<br>
          <strong>Events On Charles Team</strong><br>
          Baltimore's Premier Event Venue</p>
        </div>
      </body>
      </html>
    `

    // Send customer email
    await transporter.sendMail({
      from: 'Events On Charles <support@eventsoncharles.com>',
      to: email,
      subject: `Booking Request Received - ${eventType} on ${new Date(eventDate).toLocaleDateString()}`,
      html: customerEmailHtml
    })

    // Internal notification email
    const internalEmailHtml = `
      <!DOCTYPE html>
      <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2>🎉 New Booking Request Received!</h2>
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Customer Information:</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          
          <h3>Event Details:</h3>
          <p><strong>Type:</strong> ${eventType}</p>
          <p><strong>Date:</strong> ${new Date(eventDate).toLocaleDateString()}</p>
          <p><strong>Package:</strong> ${packageName}</p>
          <p><strong>Total:</strong> $${totalAmount}</p>
          <p><strong>Deposit:</strong> $${depositAmount}</p>
          <p><strong>Status:</strong> ${status}</p>
          <p><strong>Booking ID:</strong> ${bookingId}</p>
        </div>
        
        <p><strong>Action Required:</strong> Check admin panel to confirm availability and send payment link.</p>
        <p><strong>Admin Panel:</strong> http://localhost:3005/admin/workflow</p>
      </body>
      </html>
    `

    // Send internal notification
    await transporter.sendMail({
      from: 'Events On Charles <support@eventsoncharles.com>',
      to: 'support@eventsoncharles.com',
      subject: `New Booking: ${name} - ${eventType} (${bookingId})`,
      html: internalEmailHtml
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Booking confirmation emails sent successfully' 
    })

  } catch (error) {
    console.error('Error sending booking confirmation:', error)
    return NextResponse.json(
      { error: 'Failed to send booking confirmation emails' },
      { status: 500 }
    )
  }
} 