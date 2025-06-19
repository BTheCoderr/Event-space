# 🔒 Website Security Setup - Events On Charles

## 🚨 Critical Security Checklist

### 1. SSL Certificate (HTTPS) ✅ PRIORITY 1
**Problem**: Your site shows "Not Secure" because SSL isn't configured.

**Solution**: 
1. **Netlify Dashboard** → Site Settings → Domain Management
2. **Add Custom Domain**: `eventsoncharles.com`
3. **Enable SSL**: Automatic with Let's Encrypt (free)
4. **Force HTTPS**: Enable redirect from HTTP to HTTPS
5. **Wait**: 24-48 hours for DNS propagation

**Verification**: Visit `https://eventsoncharles.com` - should show green lock 🔒

### 2. Environment Variables Security ✅ PRIORITY 1
**Never commit sensitive data to code!**

**Local Development (.env.local):**
```env
# Email Configuration
ZOHO_EMAIL=info@eventsoncharles.com
ZOHO_PASSWORD=your_app_password_here

# Stripe Keys (Test Mode for now)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3005
```

**Production (Netlify Environment Variables):**
1. Netlify Dashboard → Site Settings → Environment Variables
2. Add each variable individually
3. **Never** put real keys in code

### 3. Content Security Policy (CSP) ✅ IMPLEMENTED
**Prevents XSS attacks and unauthorized scripts**

Already configured in `netlify.toml`:
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### 4. Input Validation & Sanitization ✅ IMPLEMENTED
**Protects against injection attacks**

- ✅ Email validation in contact forms
- ✅ Phone number formatting
- ✅ Required field validation
- ✅ TypeScript type checking

### 5. Rate Limiting (API Protection)
**Prevents spam and abuse**

**Add to API routes:**
```typescript
// Simple rate limiting
const rateLimitMap = new Map()

export async function POST(request: NextRequest) {
  const ip = request.ip || 'anonymous'
  const now = Date.now()
  const windowStart = now - 60000 // 1 minute window
  
  const requestTimestamps = rateLimitMap.get(ip) || []
  const recentRequests = requestTimestamps.filter(timestamp => timestamp > windowStart)
  
  if (recentRequests.length >= 5) { // Max 5 requests per minute
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }
  
  rateLimitMap.set(ip, [...recentRequests, now])
  
  // Continue with normal processing...
}
```

### 6. Database Security (Future)
**When you add a database:**
- ✅ Use parameterized queries (prevent SQL injection)
- ✅ Encrypt sensitive data
- ✅ Regular backups
- ✅ Access controls

### 7. Payment Security ✅ STRIPE HANDLES THIS
**Stripe is PCI DSS compliant - you don't store card data**
- ✅ All payments processed on Stripe's secure servers
- ✅ No card data touches your server
- ✅ Stripe handles encryption and compliance

## 🛡️ Security Headers Configuration

### Current Headers (netlify.toml):
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"                    # Prevents iframe embedding
    X-XSS-Protection = "1; mode=block"          # XSS protection
    X-Content-Type-Options = "nosniff"          # MIME type sniffing protection
    Referrer-Policy = "strict-origin-when-cross-origin"  # Privacy protection
```

### Enhanced Security Headers:
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Strict-Transport-Security = "max-age=31536000; includeSubDomains"
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' js.stripe.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' api.stripe.com;"
```

## 🔐 Authentication & Authorization (Future Features)

### User Authentication:
- **NextAuth.js** for secure login
- **OAuth** with Google/Facebook
- **JWT tokens** for session management

### Admin Panel Security:
- **Role-based access control**
- **Two-factor authentication**
- **Session timeouts**

## 📊 Security Monitoring

### Log Monitoring:
```typescript
// Add to API routes
console.log(`${new Date().toISOString()} - ${request.method} ${request.url} - IP: ${request.ip}`)
```

### Error Handling:
```typescript
try {
  // API logic
} catch (error) {
  console.error('API Error:', error)
  // Don't expose internal errors to users
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
}
```

## 🚨 Security Incident Response

### If Compromised:
1. **Immediately revoke** all API keys
2. **Change passwords** for all accounts
3. **Check logs** for unauthorized access
4. **Update dependencies** to latest versions
5. **Audit code** for vulnerabilities

### Regular Maintenance:
- **Weekly**: Check for package updates
- **Monthly**: Review access logs
- **Quarterly**: Security audit

## 🔍 Security Testing Tools

### Automated Testing:
```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Security headers test
curl -I https://eventsoncharles.com
```

### Online Security Scanners:
- **SSL Labs**: Test SSL configuration
- **Security Headers**: Check HTTP headers
- **Observatory**: Mozilla security scanner

## 📋 Go-Live Security Checklist

- [ ] SSL certificate configured and working
- [ ] Environment variables secured (not in code)
- [ ] Security headers implemented
- [ ] Rate limiting on API routes
- [ ] Input validation on all forms
- [ ] Error handling doesn't expose sensitive info
- [ ] Dependencies updated to latest versions
- [ ] Backup strategy in place
- [ ] Monitoring and logging configured
- [ ] Incident response plan documented

## 🆘 Emergency Contacts

### Technical Support:
- **Netlify Support**: support@netlify.com
- **Stripe Support**: support@stripe.com
- **Zoho Support**: support@zoho.com

### Security Resources:
- **OWASP Top 10**: Common vulnerabilities
- **Next.js Security**: Framework-specific guidance
- **Stripe Security**: Payment security best practices

---

## 🎯 Immediate Actions Needed:

1. **Fix SSL Certificate** (Netlify domain settings)
2. **Set up environment variables** (Netlify dashboard)
3. **Get Stripe test keys** (stripe.com signup)
4. **Test payment flow** (with demo data)
5. **Monitor security headers** (online tools)

Your website will be enterprise-grade secure once these steps are complete! 🚀 