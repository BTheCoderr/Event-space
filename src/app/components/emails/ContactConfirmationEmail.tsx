import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Hr,
  Column,
  Row,
} from '@react-email/components'

interface ContactConfirmationEmailProps {
  name: string
  eventType?: string
  eventDate?: string
  guestCount?: string
}

export const ContactConfirmationEmail = ({
  name,
  eventType,
  eventDate,
  guestCount,
}: ContactConfirmationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Thank you for your inquiry - We'll be in touch soon!</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={h1}>Events On Charles</Heading>
            <Text style={subtitle}>Providence, Rhode Island</Text>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={h2}>Thank You for Your Inquiry!</Heading>
            
            <Text style={text}>
              Dear {name},
            </Text>
            
            <Text style={text}>
              Thank you for considering Events On Charles for your special occasion. 
              We've received your inquiry and are excited to help make your event unforgettable.
            </Text>

            {/* Event Details */}
            {(eventType || eventDate || guestCount) && (
              <Section style={eventDetails}>
                <Heading style={h3}>Your Event Details</Heading>
                <Row>
                  <Column>
                    {eventType && (
                      <Text style={detailText}>
                        <strong>Event Type:</strong> {eventType}
                      </Text>
                    )}
                    {eventDate && (
                      <Text style={detailText}>
                        <strong>Preferred Date:</strong> {eventDate}
                      </Text>
                    )}
                    {guestCount && (
                      <Text style={detailText}>
                        <strong>Expected Guests:</strong> {guestCount}
                      </Text>
                    )}
                  </Column>
                </Row>
              </Section>
            )}

            <Hr style={hr} />

            {/* What's Next */}
            <Section>
              <Heading style={h3}>What Happens Next?</Heading>
              <Text style={text}>
                • Our event coordinator will review your requirements
              </Text>
              <Text style={text}>
                • We'll contact you within 24 hours to discuss your vision
              </Text>
              <Text style={text}>
                • Schedule a venue tour and consultation
              </Text>
              <Text style={text}>
                • Receive a custom quote tailored to your needs
              </Text>
            </Section>

            <Hr style={hr} />

            {/* Contact Information */}
            <Section>
              <Heading style={h3}>Contact Information</Heading>
              <Text style={text}>
                <strong>Phone:</strong> (401) 671-6758<br />
                <strong>Email:</strong> info@eventsoncharles.com<br />
                <strong>Address:</strong> 593 Charles Street, Providence, RI 02904
              </Text>
              
              <Text style={text}>
                <strong>Hours:</strong><br />
                Monday - Friday: 9:00 AM - 6:00 PM<br />
                Saturday - Sunday: 10:00 AM - 4:00 PM
              </Text>
            </Section>

            <Hr style={hr} />

            {/* Footer */}
            <Section>
              <Text style={footerText}>
                We look forward to creating magical moments for your special day!
              </Text>
              <Text style={footerText}>
                <strong>The Events On Charles Team</strong>
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
  backgroundColor: '#d4af37',
  textAlign: 'center' as const,
}

const h1 = {
  color: '#ffffff',
  fontSize: '36px',
  fontWeight: '700',
  margin: '0 0 8px',
  textAlign: 'center' as const,
}

const subtitle = {
  color: '#ffffff',
  fontSize: '16px',
  margin: '0',
  textAlign: 'center' as const,
}

const content = {
  padding: '0 48px',
}

const h2 = {
  color: '#1a1a1a',
  fontSize: '28px',
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

const detailText = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 8px',
}

const eventDetails = {
  backgroundColor: '#f9fafb',
  padding: '24px',
  borderRadius: '8px',
  margin: '24px 0',
}

const hr = {
  borderColor: '#e5e7eb',
  margin: '32px 0',
}

const footerText = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0 0 8px',
  textAlign: 'center' as const,
}

export default ContactConfirmationEmail 