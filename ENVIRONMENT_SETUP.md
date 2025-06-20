# 🚀 Environment Variables Setup Guide

## 📋 **Required Environment Variables for Production**

### **1. Missing Critical Variables**
You need to add these to your `.env.local` file and your hosting platform:

```bash
# CRITICAL: Get from Supabase Dashboard > Settings > API > Service Role Key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key-here

# CRITICAL: Fix your Stripe keys (they appear truncated)
STRIPE_SECRET_KEY=sk_live_51QnoIsGzpz6fWtnw...your-complete-secret-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_51QnoIsGzpz6fWtnw...your-complete-publishable-key

# CRITICAL: Set your production domain
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

---

## 🔧 **Step-by-Step Setup**

### **Step 1: Get Missing Supabase Service Role Key**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: `ddmrpyapztbayqnnwttv`
3. Go to **Settings** > **API**
4. Copy the **Service Role Key** (starts with `eyJ...`)
5. Add it to your environment variables

### **Step 2: Verify Stripe Keys**
1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Go to **Developers** > **API Keys**
3. Copy your **Live** keys (not test keys)
4. **Secret Key** should start with `sk_live_`
5. **Publishable Key** should start with `pk_live_`

### **Step 3: Set Production Domain**
Replace `your-domain.com` with your actual domain in:
- `NEXT_PUBLIC_BASE_URL`
- `NEXT_PUBLIC_SITE_URL`
- `ALLOWED_ORIGINS`

---

## 🌐 **Where to Add Environment Variables**

### **For Netlify Deployment:**
1. Go to your Netlify site dashboard
2. Go to **Site settings** > **Environment variables**
3. Add each variable individually:

```
NEXT_PUBLIC_SUPABASE_URL = https://ddmrpyapztbayqnnwttv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY = [GET FROM SUPABASE]
STRIPE_SECRET_KEY = sk_live_51QnoIsGzpz6fWtnw...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_live_51QnoIsGzpz6fWtnw...
ZOHO_EMAIL_PRIMARY = support@eventsoncharles.com
ZOHO_PASSWORD_PRIMARY = Eventsoncharles45722691
ZOHO_EMAIL_BACKUP = info@eventsoncharles.com
ZOHO_PASSWORD_BACKUP = Kdotc457$
NEXT_PUBLIC_BASE_URL = https://your-domain.com
NODE_ENV = production
```

### **For Vercel Deployment:**
1. Go to your Vercel project dashboard
2. Go to **Settings** > **Environment Variables**
3. Add the same variables as above

### **For Other Hosting Platforms:**
- **Heroku**: Use `heroku config:set VARIABLE_NAME=value`
- **Railway**: Add in project settings > Variables
- **DigitalOcean App Platform**: Add in app settings > Environment

---

## ✅ **Complete Environment Variables List**

Here's your complete `.env.local` file structure:

```bash
# Application
NEXT_PUBLIC_BASE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NODE_ENV=production

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://ddmrpyapztbayqnnwttv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkbXJweWFwenRiYXlxbm53dHR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzNzExNDIsImV4cCI6MjA2NTk0NzE0Mn0.vyFTX51N5sYY5n-HzxJBz7lK-TNjojU3VXR0pSBcyto
SUPABASE_SERVICE_ROLE_KEY=[GET FROM SUPABASE DASHBOARD]

# Stripe
STRIPE_SECRET_KEY=sk_live_51QnoIsGzpz6fWtnw[YOUR COMPLETE KEY]
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_51QnoIsGzpz6fWtnw[YOUR COMPLETE KEY]

# Email System
ZOHO_EMAIL_PRIMARY=support@eventsoncharles.com
ZOHO_PASSWORD_PRIMARY=Eventsoncharles45722691
ZOHO_EMAIL_BACKUP=info@eventsoncharles.com
ZOHO_PASSWORD_BACKUP=Kdotc457$
ZOHO_EMAIL=support@eventsoncharles.com
ZOHO_PASSWORD=Eventsoncharles45722691
BUSINESS_EMAIL=support@eventsoncharles.com

# Security
ALLOWED_ORIGINS=https://your-domain.com,https://www.your-domain.com
```

---

## 🚨 **Critical Actions Needed**

1. **Get Supabase Service Role Key** - Required for database operations
2. **Verify Stripe Keys** - Your current keys appear truncated
3. **Set Production Domain** - Replace all `your-domain.com` references
4. **Add to Hosting Platform** - Configure environment variables in your deployment platform

---

## 🧪 **Testing Environment Variables**

After setting up, test with:

```bash
# Test locally
npm run dev

# Check if variables are loaded
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
console.log('Stripe Key exists:', !!process.env.STRIPE_SECRET_KEY)
```

---

## 📞 **Support**

If you need help getting the missing keys:
- **Supabase Service Role Key**: Check Supabase dashboard > Settings > API
- **Stripe Keys**: Check Stripe dashboard > Developers > API Keys
- **Domain Setup**: Configure your domain in hosting platform settings 