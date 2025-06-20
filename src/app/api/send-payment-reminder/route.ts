import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { promises as fs } from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const { customerEmail, customerName, eventType, eventDate, packageName, depositAmount, bookingId } = await request.json()

    console.log('💳 Processing payment reminder for:', customerEmail)

    // Generate Stripe payment link
    const stripePaymentUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3005'}/payment?booking=${bookingId}&amount=${depositAmount}&type=deposit`
    
    console.log('💰 Generated payment link:', stripePaymentUrl)

    // Create HTML email content with payment link
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Payment Reminder - Events On Charles</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #d4af37, #f4e4a1); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Events On Charles</h1>
          <p style="color: white; margin: 5px 0 0 0; font-size: 16px;">Baltimore's Premier Event Venue</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #d4af37; margin-top: 0;">Payment Reminder - Your Event is Confirmed!</h2>
          
          <p>Dear ${customerName},</p>
          
          <p>Great news! We've confirmed availability for your <strong>${eventType}</strong> on <strong>${new Date(eventDate).toLocaleDateString()}</strong>.</p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #d4af37; margin-top: 0;">Event Details:</h3>
            <p><strong>📅 Date:</strong> ${new Date(eventDate).toLocaleDateString()}</p>
            <p><strong>🎉 Event Type:</strong> ${eventType}</p>
            <p><strong>📦 Package:</strong> ${packageName}</p>
            <p><strong>💰 Deposit Due:</strong> $${depositAmount}</p>
            <p><strong>🆔 Booking ID:</strong> ${bookingId}</p>
          </div>
          
          <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
            <h3 style="color: #28a745; margin-top: 0;">🎯 Secure Your Booking Now:</h3>
            <p>To secure your booking, please submit your 25% deposit payment of <strong>$${depositAmount}</strong>.</p>
            
            <div style="text-align: center; margin: 25px 0;">
              <a href="${stripePaymentUrl}" style="display: inline-block; background: #d4af37; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                💳 Pay Deposit - $${depositAmount}
              </a>
            </div>
            
            <p style="font-size: 14px; color: #666; text-align: center;">
              Secure payment powered by Stripe • Your card information is protected
            </p>
          </div>
          
          <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
            <h4 style="color: #856404; margin-top: 0;">💡 Alternative Payment Options:</h4>
            <p style="color: #856404; margin-bottom: 0;">
              Prefer to pay over the phone? Call us at <strong>(401) 671-6758</strong><br>
              We accept all major credit cards and can process your payment securely.
            </p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <p><strong>📞 Phone:</strong> (401) 671-6758</p>
            <p><strong>📧 Email:</strong> support@eventsoncharles.com</p>
            <p><strong>🌐 Website:</strong> eventsoncharles.com</p>
          </div>
          
          <p>We're excited to host your special event at Events On Charles!</p>
          
          <p>Best regards,<br>
          <strong>Events On Charles Team</strong><br>
          Baltimore's Premier Event Venue</p>
          
          <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px; font-size: 12px; color: #666; text-align: center;">
            <p>This payment link is secure and expires in 7 days. If you have any questions, please contact us immediately.</p>
            <p>Booking Reference: ${bookingId}</p>
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
        console.log(`📧 Attempting to send via ${account.name} (${account.user})...`)
        
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

        // Test the connection
        await transporter.verify()
        console.log(`✅ SMTP connection verified for ${account.name}`)

        // Send the email
        await transporter.sendMail({
          from: `Events On Charles <${account.user}>`,
          to: customerEmail,
          subject: `💳 Payment Required - ${eventType} on ${new Date(eventDate).toLocaleDateString()}`,
          html: htmlContent
        })

        console.log(`✅ Payment reminder sent successfully via ${account.name}!`)
        console.log(`📧 Email sent to: ${customerEmail}`)
        console.log(`📤 Sent from: ${account.user}`)
        console.log(`💰 Payment link: ${stripePaymentUrl}`)
        
        // Send internal notification with payment link
        try {
          await transporter.sendMail({
            from: `Events On Charles <${account.user}>`,
            to: account.user,
            subject: `💳 Payment Reminder Sent - ${customerName} (${bookingId})`,
            html: `
              <h2>Payment Reminder Sent Successfully</h2>
              <p><strong>Customer:</strong> ${customerName}</p>
              <p><strong>Email:</strong> ${customerEmail}</p>
              <p><strong>Event:</strong> ${eventType} on ${new Date(eventDate).toLocaleDateString()}</p>
              <p><strong>Package:</strong> ${packageName}</p>
              <p><strong>Deposit Due:</strong> $${depositAmount}</p>
              <p><strong>Booking ID:</strong> ${bookingId}</p>
              <p><strong>Sent via:</strong> ${account.user}</p>
              <p><strong>Payment Link:</strong> <a href="${stripePaymentUrl}">${stripePaymentUrl}</a></p>
              
              <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
                <h3>Next Steps:</h3>
                <ul>
                  <li>Customer will click the payment link</li>
                  <li>Stripe will process the $${depositAmount} deposit</li>
                  <li>System will update booking status automatically</li>
                  <li>You'll receive payment confirmation</li>
                </ul>
              </div>
            `
          })
          console.log('📧 Internal notification sent with payment link')
        } catch (error) {
          console.log('Internal notification failed, but customer email was sent successfully')
        }

        return NextResponse.json({ 
          success: true, 
          message: `✅ Payment reminder sent successfully via ${account.name}!`,
          sentFrom: account.user,
          sentTo: customerEmail,
          paymentLink: stripePaymentUrl,
          depositAmount: depositAmount
        })

      } catch (emailError) {
        console.error(`❌ Failed to send via ${account.name}:`, emailError instanceof Error ? emailError.message : 'Unknown error')
        
        // If this isn't the last account, try the next one
        if (i < emailAccounts.length - 1) {
          console.log(`🔄 Trying next email account...`)
          continue
        }
      }
    }

    // If all email accounts failed, log the email for manual sending
    console.log('📧 EMAIL TO BE SENT MANUALLY:')
    console.log('='.repeat(60))
    console.log(`TO: ${customerEmail}`)
    console.log(`SUBJECT: 💳 Payment Required - ${eventType} on ${new Date(eventDate).toLocaleDateString()}`)
    console.log(`PAYMENT LINK: ${stripePaymentUrl}`)
    console.log('')
    console.log('EMAIL BODY (Text Version):')
    console.log('-'.repeat(40))
    console.log(`Dear ${customerName},`)
    console.log('')
    console.log(`Your ${eventType} event at Events On Charles is confirmed for ${new Date(eventDate).toLocaleDateString()}!`)
    console.log('')
    console.log('Event Details:')
    console.log(`- Package: ${packageName}`)
    console.log(`- Deposit Due: $${depositAmount}`)
    console.log(`- Booking ID: ${bookingId}`)
    console.log('')
    console.log('🎯 SECURE YOUR BOOKING NOW:')
    console.log(`Payment Link: ${stripePaymentUrl}`)
    console.log('')
    console.log('Alternative: Call (401) 671-6758 to pay over the phone')
    console.log('')
    console.log('Thank you for choosing Events On Charles!')
    console.log('='.repeat(60))

    // Save to file for manual sending
    try {
      const logDir = path.join(process.cwd(), 'logs')
      const logFile = path.join(logDir, 'sent-emails.json')
      
      await fs.mkdir(logDir, { recursive: true })
      
      let emailLogs = []
      try {
        const existingLogs = await fs.readFile(logFile, 'utf8')
        emailLogs = JSON.parse(existingLogs)
      } catch {
        // File doesn't exist, start fresh
      }
      
      emailLogs.push({
        to: customerEmail,
        subject: `💳 Payment Required - ${eventType} on ${new Date(eventDate).toLocaleDateString()}`,
        customerName,
        eventType,
        eventDate: new Date(eventDate).toLocaleDateString(),
        packageName,
        depositAmount,
        bookingId,
        paymentLink: stripePaymentUrl,
        htmlContent,
        sentAt: new Date().toISOString(),
        status: 'logged_for_manual_sending',
        reason: 'All email accounts failed authentication'
      })
      
      await fs.writeFile(logFile, JSON.stringify(emailLogs, null, 2))
      
      console.log('✅ Email logged to file: logs/sent-emails.json')
      
    } catch (fileError) {
      console.error('Error saving to log file:', fileError)
    }

    return NextResponse.json({ 
      success: true, 
      message: `⚠️ Automatic email sending failed, but email content is ready for manual sending.\n\nPayment Link: ${stripePaymentUrl}\n\nCheck your terminal for the complete email content.`,
      paymentLink: stripePaymentUrl,
      emailPreview: {
        to: customerEmail,
        subject: `💳 Payment Required - ${eventType} on ${new Date(eventDate).toLocaleDateString()}`,
        customerName,
        eventType,
        eventDate: new Date(eventDate).toLocaleDateString(),
        packageName,
        depositAmount,
        bookingId,
        paymentLink: stripePaymentUrl
      }
    })

  } catch (error) {
    console.error('Error processing payment reminder:', error)
    return NextResponse.json(
      { error: 'Failed to process payment reminder', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
} 