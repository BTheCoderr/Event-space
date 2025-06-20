const nodemailer = require('nodemailer')

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    const { email, name, eventType, eventDate, packageName, totalAmount, depositAmount, password } = JSON.parse(event.body)

    // Create transporter using Zoho SMTP
    const transporter = nodemailer.createTransporter({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true,
      auth: {
        user: 'support@eventsoncharles.com',
        pass: password
      }
    })

    // Email to customer
    const customerEmailOptions = {
      from: 'Events On Charles <support@eventsoncharles.com>',
      to: email,
      subject: 'Booking Confirmation - Events On Charles',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #d4af37, #f4e4a6); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Events On Charles</h1>
            <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Professional Event Planning</p>
          </div>
          
          <div style="padding: 30px; background: white;">
            <h2 style="color: #d4af37; margin-bottom: 20px;">Thank You for Your Booking Request!</h2>
            
            <p>Dear ${name},</p>
            
            <p>We have received your booking request and are excited to help make your event memorable. Here are the details we have on file:</p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Event Details</h3>
              <p><strong>Event Type:</strong> ${eventType}</p>
              <p><strong>Date:</strong> ${eventDate}</p>
              <p><strong>Package:</strong> ${packageName}</p>
              <p><strong>Total Amount:</strong> $${totalAmount}</p>
              <p><strong>Deposit Required:</strong> $${depositAmount} (25%)</p>
              <p><strong>Balance Due on Event Day:</strong> $${totalAmount - depositAmount}</p>
            </div>
            
            <div style="background: #fff8e1; border-left: 4px solid #d4af37; padding: 15px; margin: 20px 0;">
              <h4 style="color: #d4af37; margin-top: 0;">Next Steps</h4>
              <ul style="margin: 0; padding-left: 20px;">
                <li>We will contact you within 24 hours to confirm availability</li>
                <li>Once confirmed, we'll send a secure payment link for your deposit</li>
                <li>Final details will be coordinated 1 week before your event</li>
              </ul>
            </div>
            
            <p>If you have any questions or need to make changes, please don't hesitate to contact us:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <p><strong>Phone:</strong> (555) 123-4567</p>
              <p><strong>Email:</strong> support@eventsoncharles.com</p>
            </div>
            
            <p>Thank you for choosing Events On Charles for your special occasion!</p>
            
            <p>Best regards,<br>
            <strong>The Events On Charles Team</strong></p>
          </div>
          
          <div style="background: #333; color: white; padding: 20px; text-align: center; font-size: 12px;">
            <p>© 2024 Events On Charles. All rights reserved.</p>
            <p>This is an automated message. Please do not reply to this email.</p>
          </div>
        </div>
      `
    }

    // Email to business owner
    const businessEmailOptions = {
      from: 'Events On Charles <support@eventsoncharles.com>',
      to: 'support@eventsoncharles.com',
      subject: `New Booking Request - ${eventType} on ${eventDate}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #d4af37; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">New Booking Request</h1>
          </div>
          
          <div style="padding: 20px; background: white;">
            <h2>Customer Information</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            
            <h2>Event Details</h2>
            <p><strong>Event Type:</strong> ${eventType}</p>
            <p><strong>Date:</strong> ${eventDate}</p>
            <p><strong>Package:</strong> ${packageName}</p>
            <p><strong>Total Amount:</strong> $${totalAmount}</p>
            <p><strong>Deposit:</strong> $${depositAmount}</p>
            
            <div style="background: #f0f0f0; padding: 15px; margin: 20px 0; border-radius: 5px;">
              <p><strong>ACTION REQUIRED:</strong> Contact customer within 24 hours to confirm booking and arrange deposit payment.</p>
            </div>
          </div>
        </div>
      `
    }

    // Send both emails
    await Promise.all([
      transporter.sendMail(customerEmailOptions),
      transporter.sendMail(businessEmailOptions)
    ])

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        message: 'Booking confirmation emails sent successfully' 
      })
    }

  } catch (error) {
    console.error('Error sending emails:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to send confirmation emails',
        details: error.message 
      })
    }
  }
} 