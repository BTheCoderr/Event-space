import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
  Column,
  Row,
} from '@react-email/components'

interface MarketingFollowUpEmailProps {
  customerName: string
  eventType: string
  eventDate?: string
  quoteNumber?: string
  lastInteraction: string
}

export const MarketingFollowUpEmail = ({
  customerName,
  eventType,
  eventDate,
  quoteNumber,
  lastInteraction,
}: MarketingFollowUpEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Still planning your {eventType}? We're here to help make it perfect!</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={h1}>We're Still Here For You!</Heading>
            <Text style={subtitle}>Events On Charles</Text>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Text style={greeting}>
              Hi {customerName},
            </Text>
            
            <Text style={text}>
              We wanted to follow up on your {eventType} planning. We know how exciting (and sometimes overwhelming!) 
              event planning can be, and we're here to make the process as smooth as possible.
            </Text>

            {/* Personalized Section */}
            {quoteNumber && (
              <Section style={quoteSection}>
                <Heading style={h3}>Your Quote Details</Heading>
                <Text style={quoteText}>
                  <strong>Quote #:</strong> {quoteNumber}<br />
                  <strong>Event Type:</strong> {eventType}<br />
                  {eventDate && <><strong>Date:</strong> {eventDate}<br /></>}
                  <strong>Last Updated:</strong> {lastInteraction}
                </Text>
                <Text style={quoteText}>
                  Remember, your quote is valid for 30 days and we're happy to make adjustments 
                  based on your evolving needs.
                </Text>
              </Section>
            )}

            <Hr style={hr} />

            {/* Value Propositions */}
            <Section>
              <Heading style={h2}>Why Choose Events On Charles?</Heading>
              
              <div style={benefitItem}>
                <Text style={benefitTitle}>🎯 Personalized Service</Text>
                <Text style={benefitText}>
                  Your dedicated event coordinator will work with you every step of the way to bring your vision to life.
                </Text>
              </div>

              <div style={benefitItem}>
                <Text style={benefitTitle}>✨ All-Inclusive Packages</Text>
                <Text style={benefitText}>
                  From tables and linens to lighting and setup, we handle everything so you can focus on enjoying your special day.
                </Text>
              </div>

              <div style={benefitItem}>
                <Text style={benefitTitle}>🏛️ Historic Elegance</Text>
                <Text style={benefitText}>
                  Our beautifully restored venue provides the perfect backdrop for unforgettable memories.
                </Text>
              </div>

              <div style={benefitItem}>
                <Text style={benefitTitle}>📍 Prime Location</Text>
                <Text style={benefitText}>
                  Located in the heart of Providence with easy access and free parking for your guests.
                </Text>
              </div>
                         </Section>

             <Hr style={hr} />

            {/* Social Proof */}
            <Section style={testimonialSection}>
              <Heading style={h3}>What Our Clients Say</Heading>
              <Text style={testimonialText}>
                "Events On Charles made our wedding reception absolutely magical. The attention to detail 
                and personalized service exceeded all our expectations. Our guests are still talking about 
                how beautiful everything was!" - Sarah & Michael, Wedding Reception
              </Text>
              <Text style={testimonialText}>
                "The team at Events On Charles took care of everything for our corporate event. Professional, 
                reliable, and the venue looked stunning. We couldn't have asked for a better experience." 
                - Jennifer K., Corporate Event Planner
              </Text>
            </Section>

            <Hr style={hr} />

            {/* Limited Time Offer */}
            <Section style={offerSection}>
              <Heading style={h3}>🎁 Special Offer Just For You</Heading>
              <Text style={offerText}>
                Book your event within the next 2 weeks and receive:
              </Text>
              <Text style={offerBenefits}>
                ✅ Complimentary centerpiece upgrade (valued at $200)<br />
                ✅ Free venue lighting consultation<br />
                ✅ Priority booking for future events<br />
                ✅ 10% discount on additional decor rentals
              </Text>
            </Section>

            <Hr style={hr} />

            {/* Call to Action */}
            <Section style={ctaSection}>
              <Heading style={h3}>Ready to Move Forward?</Heading>
              <Text style={ctaText}>
                We'd love to schedule a brief call to discuss your vision and answer any questions you might have. 
                Our calendar is filling up quickly, especially for {eventDate ? 'dates around ' + eventDate : 'popular event dates'}.
              </Text>
              
              <Text style={ctaText}>
                <strong>Here's how to get started:</strong><br />
                📞 Call us at (401) 671-6758<br />
                📧 Reply to this email<br />
                📅 Schedule a venue tour<br />
                💬 Text us your questions
              </Text>
            </Section>

            <Hr style={hr} />

            {/* FAQ Section */}
            <Section>
              <Heading style={h3}>Quick Answers to Common Questions</Heading>
              
              <div style={faqItem}>
                <Text style={faqQuestion}>Q: How far in advance should I book?</Text>
                <Text style={faqAnswer}>A: We recommend booking 3-6 months in advance, especially for weekend events.</Text>
              </div>

              <div style={faqItem}>
                <Text style={faqQuestion}>Q: Can I bring my own caterer?</Text>
                <Text style={faqAnswer}>A: Yes! We work with outside caterers and can provide a list of our preferred vendors.</Text>
              </div>

              <div style={faqItem}>
                <Text style={faqQuestion}>Q: What's included in the rental fee?</Text>
                <Text style={faqAnswer}>A: Tables, chairs, linens, basic lighting, setup/cleanup, and an on-site coordinator.</Text>
              </div>
            </Section>

            <Hr style={hr} />

            {/* Contact Information */}
            <Section style={contactSection}>
              <Text style={contactText}>
                Questions? We're here to help make your event planning stress-free!
              </Text>
              <Text style={contactInfo}>
                <strong>📞 Phone:</strong> (401) 671-6758<br />
                <strong>📧 Email:</strong> info@eventsoncharles.com<br />
                <strong>📍 Visit Us:</strong> 593 Charles Street, Providence, RI 02904<br />
                <strong>🕐 Hours:</strong> Mon-Fri 9AM-6PM, Sat-Sun 10AM-4PM
              </Text>
            </Section>

            {/* Footer */}
            <Section style={footer}>
              <Text style={footerText}>
                We're excited about the possibility of hosting your {eventType} and creating unforgettable memories together.
              </Text>
              <Text style={footerSignature}>
                <strong>The Events On Charles Team</strong>
              </Text>
              <Text style={unsubscribeText}>
                If you no longer wish to receive these emails, you can <a href="#" style={linkStyle}>unsubscribe here</a>.
              </Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
}

const header = {
  padding: '32px 48px',
  background: 'linear-gradient(135deg, #d4af37 0%, #f4d03f 100%)',
  textAlign: 'center' as const,
}

const h1 = {
  color: '#ffffff',
  fontSize: '32px',
  fontWeight: '700',
  margin: '0 0 8px',
  textAlign: 'center' as const,
}

const subtitle = {
  color: '#ffffff',
  fontSize: '18px',
  margin: '0',
  textAlign: 'center' as const,
}

const content = {
  padding: '0 48px',
}

const greeting = {
  color: '#1a1a1a',
  fontSize: '20px',
  fontWeight: '600',
  margin: '32px 0 16px',
}

const h2 = {
  color: '#1a1a1a',
  fontSize: '24px',
  fontWeight: '600',
  margin: '32px 0 16px',
}

const h3 = {
  color: '#1a1a1a',
  fontSize: '20px',
  fontWeight: '600',
  margin: '24px 0 12px',
}

const text = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 16px',
}

const quoteSection = {
  backgroundColor: '#f0f9ff',
  padding: '24px',
  borderRadius: '8px',
  border: '1px solid #0ea5e9',
  margin: '24px 0',
}

const quoteText = {
  color: '#0c4a6e',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 12px',
}

const benefitItem = {
  margin: '0 0 20px',
}

const benefitTitle = {
  color: '#d4af37',
  fontSize: '18px',
  fontWeight: '600',
  margin: '0 0 8px',
}

const benefitText = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0',
}

const testimonialSection = {
  backgroundColor: '#f8fafc',
  padding: '24px',
  borderRadius: '8px',
  border: '1px solid #e2e8f0',
}

const testimonialText = {
  color: '#475569',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 16px',
  fontStyle: 'italic',
}

const offerSection = {
  backgroundColor: '#fef3c7',
  padding: '24px',
  borderRadius: '8px',
  border: '2px solid #f59e0b',
  textAlign: 'center' as const,
}

const offerText = {
  color: '#92400e',
  fontSize: '18px',
  fontWeight: '600',
  margin: '0 0 16px',
}

const offerBenefits = {
  color: '#92400e',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0',
}

const ctaSection = {
  backgroundColor: '#f0fdf4',
  padding: '24px',
  borderRadius: '8px',
  border: '1px solid #22c55e',
}

const ctaText = {
  color: '#166534',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 16px',
}

const faqItem = {
  margin: '0 0 16px',
}

const faqQuestion = {
  color: '#1f2937',
  fontSize: '16px',
  fontWeight: '600',
  margin: '0 0 4px',
}

const faqAnswer = {
  color: '#6b7280',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0',
}

const contactSection = {
  backgroundColor: '#f3f4f6',
  padding: '24px',
  borderRadius: '8px',
  textAlign: 'center' as const,
}

const contactText = {
  color: '#374151',
  fontSize: '18px',
  fontWeight: '600',
  margin: '0 0 16px',
}

const contactInfo = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0',
}

const footer = {
  textAlign: 'center' as const,
  margin: '32px 0',
}

const footerText = {
  color: '#6b7280',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 16px',
}

const footerSignature = {
  color: '#d4af37',
  fontSize: '18px',
  fontWeight: '600',
  margin: '0 0 16px',
}

const unsubscribeText = {
  color: '#9ca3af',
  fontSize: '12px',
  margin: '0',
}

const linkStyle = {
  color: '#3b82f6',
  textDecoration: 'underline',
}

const hr = {
  borderColor: '#e5e7eb',
  margin: '32px 0',
}

export default MarketingFollowUpEmail 