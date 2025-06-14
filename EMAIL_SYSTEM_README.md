# Events On Charles - Email System Documentation

## Overview

This document outlines the comprehensive email system implemented for Events On Charles, including automated email templates, API routes, and configuration instructions.

## 🚀 Email System Features

### 1. **Contact Form Automation**
- Instant confirmation emails to customers
- Internal notifications to the business team
- Professional branded templates

### 2. **Quote Generation System**
- Custom quote emails with itemized pricing
- Professional PDF-style layout
- Automatic quote number generation
- Internal notifications for follow-up

### 3. **Booking Confirmations**
- Detailed booking confirmation emails
- Payment summaries and reminders
- Event timeline and next steps
- Professional contract-style format

### 4. **Marketing Follow-up**
- Automated follow-up sequences
- Personalized offers and incentives
- Social proof and testimonials
- Clear call-to-action sections

## 📧 Email Templates

### Available Templates:

1. **ContactConfirmationEmail.tsx**
   - Sent to customers after form submission
   - Includes event details and next steps
   - Professional Events On Charles branding

2. **InternalNotificationEmail.tsx**
   - Sent to business team for new inquiries
   - Priority level automation
   - Complete customer information

3. **QuoteRequestEmail.tsx**
   - Professional quote layout
   - Itemized pricing table
   - Package inclusions
   - Clear call-to-action

4. **BookingConfirmationEmail.tsx**
   - Comprehensive booking details
   - Payment summaries
   - Event timeline
   - Contact information

5. **MarketingFollowUpEmail.tsx**
   - Follow-up for unconverted leads
   - Social proof and testimonials
   - Limited-time offers
   - FAQ section

## 🛠️ Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in your project root:

```env
# Email Configuration
RESEND_API_KEY=your_resend_api_key_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3001

# Email Addresses
BUSINESS_EMAIL=info@eventsoncharles.com
CONTACT_EMAIL=info@eventsoncharles.com
```

### 2. Resend API Setup

1. Go to [Resend.com](https://resend.com)
2. Create an account
3. Generate an API key
4. Add your domain and verify DNS records
5. Add the API key to your environment variables

### 3. Domain Configuration

For production, configure these email addresses:
- `info@eventsoncharles.com` - Main contact
- `quotes@eventsoncharles.com` - Quote system
- `noreply@eventsoncharles.com` - Automated emails

## 📊 API Endpoints

### Contact Form API
```
POST /api/contact
```
**Purpose:** Handle contact form submissions
**Emails Sent:** 
- Customer confirmation
- Internal notification

### Quote Generation API
```
POST /api/quote
```
**Purpose:** Generate and send custom quotes
**Emails Sent:**
- Customer quote
- Internal notification

**Request Body:**
```json
{
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "eventType": "Wedding",
  "eventDate": "2024-06-15",
  "guestCount": 100,
  "venuePackage": "Premium Package",
  "items": [
    {
      "name": "Round Tables",
      "price": 15,
      "quantity": 10,
      "total": 150
    }
  ]
}
```

## 🎨 Email Design Features

### Professional Styling
- Events On Charles gold branding (#d4af37)
- Responsive design for all devices
- Professional typography
- Consistent color scheme

### Content Features
- Personalized customer names
- Dynamic event information
- Itemized pricing tables
- Call-to-action buttons
- Social proof elements
- Contact information

## 📱 Mobile Optimization

All email templates are fully responsive and optimized for:
- Desktop email clients
- Mobile devices
- Tablet viewing
- Dark mode compatibility

## 🔄 Email Sequences

### New Customer Journey
1. **Contact Form** → Confirmation + Internal Alert
2. **Quote Request** → Custom Quote + Follow-up
3. **Follow-up** → Marketing email after 3-7 days
4. **Booking** → Confirmation + Timeline

### Business Notifications
- Instant alerts for new inquiries
- Priority flags for urgent requests
- Customer information summary
- Follow-up reminders

## 🚀 Testing the System

### Development Testing
1. Start your dev server: `npm run dev`
2. Fill out the contact form on your site
3. Check console logs for email sending confirmation
4. Verify email delivery in Resend dashboard

### Production Testing
1. Set up proper DNS records
2. Verify domain ownership
3. Test all email templates
4. Monitor delivery rates

## 📈 Analytics & Monitoring

### Resend Dashboard Features
- Email delivery rates
- Open rates tracking
- Click-through rates
- Bounce rate monitoring
- Error logging

### Recommended Monitoring
- Set up email delivery alerts
- Monitor bounce rates
- Track customer engagement
- Review template performance

## 🔧 Customization Options

### Styling Changes
- Update color scheme in template files
- Modify typography settings
- Adjust spacing and layout
- Add company logos/images

### Content Modifications
- Update email copy
- Add/remove sections
- Modify call-to-action text
- Update contact information

### Feature Extensions
- Add more email templates
- Implement drip campaigns
- Add SMS notifications
- Create customer portals

## 🛡️ Security & Privacy

### Data Protection
- No sensitive data stored in emails
- GDPR compliant templates
- Unsubscribe links included
- Data encryption in transit

### Email Security
- SPF records configured
- DKIM signing enabled
- DMARC policy set
- Secure API endpoints

## 📞 Support & Maintenance

### Regular Tasks
- Monitor email delivery rates
- Update template content
- Review customer feedback
- Test new features

### Troubleshooting
- Check API key validity
- Verify DNS records
- Monitor error logs
- Test email templates

## 🎯 Best Practices

### Email Content
- Keep subject lines under 50 characters
- Use clear call-to-action buttons
- Include unsubscribe options
- Test across email clients

### Technical
- Validate email addresses
- Handle API errors gracefully
- Log important events
- Monitor rate limits

## 📋 Checklist for Go-Live

- [ ] Resend account created and verified
- [ ] Domain DNS records configured
- [ ] Environment variables set
- [ ] All email templates tested
- [ ] API endpoints functional
- [ ] Error handling implemented
- [ ] Monitoring dashboard configured
- [ ] Customer journey tested end-to-end

## 🤝 Team Responsibilities

### Marketing Team
- Monitor email performance
- Update template content
- Manage follow-up sequences
- Analyze customer engagement

### Development Team
- Maintain API endpoints
- Update email templates
- Monitor system health
- Implement new features

### Customer Service
- Respond to email inquiries
- Track customer interactions
- Provide feedback on templates
- Handle technical issues

---

**Events On Charles Email System**  
*Creating magical moments through professional communication*

For technical support or questions about this email system, contact the development team or refer to the Resend documentation. 