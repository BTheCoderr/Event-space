# Zoho Mail Setup Guide - Events On Charles

## 🚀 Complete Setup Instructions

### Step 1: Zoho Mail Account Setup

1. **Complete Domain Setup in Zoho**
   - Verify your domain `eventsoncharles.com` in Zoho Mail Admin
   - Complete DNS configuration (MX, SPF, DKIM records)
   - Create your email accounts

2. **Create Email Accounts**
   ```
   info@eventsoncharles.com - Main business email
   noreply@eventsoncharles.com - Automated emails (optional)
   quotes@eventsoncharles.com - Quote system (optional)
   ```

### Step 2: Generate App Password

For security, you'll need an App Password (not your regular password):

1. Go to Zoho Mail Settings → Security → App Passwords
2. Create a new App Password for "Website Contact Form"
3. Copy the generated password (you'll need this for the `.env.local` file)

### Step 3: Environment Variables

Create a `.env.local` file in your project root:

```env
# Zoho Mail Configuration
ZOHO_EMAIL=info@eventsoncharles.com
ZOHO_PASSWORD=your_app_password_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3001

# Email Addresses
BUSINESS_EMAIL=info@eventsoncharles.com
CONTACT_EMAIL=info@eventsoncharles.com
```

### Step 4: Test Your Setup

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Test the contact form:**
   - Go to `http://localhost:3001`
   - Fill out the contact form
   - Check your console for success messages
   - Check your Zoho Mail inbox for emails

### Step 5: SMTP Settings Verification

Your Zoho Mail SMTP settings should be:
- **Host:** smtp.zoho.com
- **Port:** 587
- **Security:** STARTTLS
- **Authentication:** Required

## 🎯 What the System Does

### Customer Journey
1. **Customer fills out contact form** → Gets professional confirmation email
2. **Business receives notification** → Internal alert with priority level
3. **Quote generated** → Professional quote with itemized pricing
4. **Follow-up emails** → Marketing automation for unconverted leads

### Email Templates
- ✅ **Contact Confirmation** - Professional thank you with next steps
- ✅ **Internal Notifications** - Business alerts with customer details
- ✅ **Quote Requests** - Detailed pricing with Events On Charles branding
- ✅ **Booking Confirmations** - Complete event details and timeline
- ✅ **Marketing Follow-ups** - Automated sequences with offers

## 🛠️ Advanced Configuration

### Custom Email Addresses
You can customize the "from" addresses by updating the API routes:

**For Contact Form (`src/app/api/contact/route.ts`):**
```typescript
from: `"Events On Charles" <${process.env.ZOHO_EMAIL}>`,
```

**For Quotes (`src/app/api/quote/route.ts`):**
```typescript
from: `"Events On Charles Quotes" <${process.env.ZOHO_EMAIL}>`,
```

### Multiple Email Accounts
If you create multiple Zoho email accounts, you can route different types:

```env
ZOHO_EMAIL_MAIN=info@eventsoncharles.com
ZOHO_EMAIL_QUOTES=quotes@eventsoncharles.com
ZOHO_EMAIL_NOREPLY=noreply@eventsoncharles.com
```

## 🔧 Troubleshooting

### Common Issues:

**1. Authentication Failed**
- Double-check your app password (not regular password)
- Ensure the email address is correct
- Verify domain ownership in Zoho

**2. Emails Not Sending**
- Check SMTP settings (host, port, security)
- Verify app password is active
- Check Zoho Mail quotas and limits

**3. Emails Going to Spam**
- Ensure SPF records are configured
- Set up DKIM signing in Zoho
- Configure DMARC policy

### Testing Commands:

**Check environment variables:**
```bash
echo $ZOHO_EMAIL
echo $ZOHO_PASSWORD
```

**Test SMTP connection:**
You can test the SMTP connection in your browser console when form submission fails.

## 📊 Monitoring & Analytics

### Zoho Mail Analytics
- Monitor email delivery in Zoho Mail Admin
- Track sent/received emails
- Monitor quota usage

### Website Analytics
- Form submission rates
- Email delivery success rates
- Customer engagement tracking

## 🚀 Production Deployment

### Environment Variables for Production:
```env
ZOHO_EMAIL=info@eventsoncharles.com
ZOHO_PASSWORD=your_production_app_password
NEXT_PUBLIC_SITE_URL=https://eventsoncharles.com
BUSINESS_EMAIL=info@eventsoncharles.com
```

### DNS Records Required:
- **MX Record:** Points to Zoho Mail servers
- **SPF Record:** Authorizes Zoho to send emails for your domain
- **DKIM:** Digital signature for email authentication
- **DMARC:** Email authentication policy

## 🎨 Customization Options

### Email Branding
All templates use Events On Charles branding:
- Gold color scheme (#d4af37)
- Professional layout
- Consistent typography
- Mobile-responsive design

### Content Updates
You can modify email content in:
- `src/app/components/emails/ContactConfirmationEmail.tsx`
- `src/app/components/emails/InternalNotificationEmail.tsx`
- `src/app/components/emails/QuoteRequestEmail.tsx`
- `src/app/components/emails/BookingConfirmationEmail.tsx`

## 📞 Support

### Zoho Support
- Zoho Mail Help Center
- SMTP troubleshooting guides
- Domain verification assistance

### Development Support
- Check API route responses in browser console
- Monitor server logs for errors
- Test email templates in development

## ✅ Go-Live Checklist

- [ ] Zoho Mail domain verified
- [ ] DNS records configured (MX, SPF, DKIM)
- [ ] Email accounts created
- [ ] App password generated
- [ ] Environment variables set
- [ ] Contact form tested
- [ ] Quote system tested
- [ ] Email delivery confirmed
- [ ] Spam filtering verified
- [ ] Customer journey tested end-to-end

---

**🎉 You're all set!** 

Your Events On Charles website now has a professional email system powered by Zoho Mail. Customers will receive beautiful, branded emails, and your team will get instant notifications for all inquiries.

For questions or technical support, refer to the main project documentation or contact your development team. 