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

interface InternalNotificationEmailProps {
  name: string
  email: string
  phone?: string
  eventType?: string
  eventDate?: string
  guestCount?: string
  message?: string
  marketingConsent: boolean
}

export const InternalNotificationEmail = ({
  name,
  email,
  phone,
  eventType,
  eventDate,
  guestCount,
  message,
  marketingConsent,
}: InternalNotificationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>New event inquiry from {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={h1}>🎉 New Event Inquiry</Heading>
            <Text style={subtitle}>Events On Charles</Text>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={h2}>Customer Information</Heading>
            
            <Section style={customerDetails}>
              <Row>
                <Column>
                  <Text style={detailText}>
                    <strong>Name:</strong> {name}
                  </Text>
                  <Text style={detailText}>
                    <strong>Email:</strong> {email}
                  </Text>
                  {phone && (
                    <Text style={detailText}>
                      <strong>Phone:</strong> {phone}
                    </Text>
                  )}
                  <Text style={detailText}>
                    <strong>Marketing Consent:</strong> {marketingConsent ? 'Yes' : 'No'}
                  </Text>
                </Column>
              </Row>
            </Section>

            <Hr style={hr} />

            {/* Event Details */}
            <Heading style={h2}>Event Details</Heading>
            <Section style={eventDetails}>
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
                  {!eventType && !eventDate && !guestCount && (
                    <Text style={detailText}>
                      <em>No specific event details provided</em>
                    </Text>
                  )}
                </Column>
              </Row>
            </Section>

            {/* Message */}
            {message && (
              <>
                <Hr style={hr} />
                <Heading style={h2}>Customer Message</Heading>
                <Section style={messageSection}>
                  <Text style={messageText}>
                    {message}
                  </Text>
                </Section>
              </>
            )}

            <Hr style={hr} />

            {/* Action Items */}
            <Section>
              <Heading style={h2}>📋 Next Steps</Heading>
              <Text style={actionText}>
                ✅ Respond within 24 hours<br />
                ✅ Check venue availability for {eventDate || 'requested date'}<br />
                ✅ Prepare initial quote based on {guestCount || 'guest count'}<br />
                ✅ Schedule consultation call/tour<br />
                {marketingConsent && '✅ Add to marketing email list'}
              </Text>
            </Section>

            {/* Priority Level */}
            <Section style={prioritySection}>
              <Text style={priorityText}>
                <strong>Priority Level:</strong> {getPriorityLevel(eventDate, guestCount)}
              </Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// Helper function to determine priority
const getPriorityLevel = (eventDate?: string, guestCount?: string): string => {
  if (!eventDate) return 'Normal'
  
  const eventDateObj = new Date(eventDate)
  const now = new Date()
  const daysUntilEvent = Math.ceil((eventDateObj.getTime() - now.getTime()) / (1000 * 3600 * 24))
  
  if (daysUntilEvent <= 30) return '🔴 HIGH - Event within 30 days'
  if (daysUntilEvent <= 90) return '🟡 MEDIUM - Event within 90 days'
  if (parseInt(guestCount || '0') > 100) return '🟡 MEDIUM - Large event (100+ guests)'
  
  return '🟢 Normal'
}

// Styles
const main = {
  backgroundColor: '#f3f4f6',
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
  backgroundColor: '#1f2937',
  textAlign: 'center' as const,
}

const h1 = {
  color: '#d4af37',
  fontSize: '32px',
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
  color: '#1f2937',
  fontSize: '24px',
  fontWeight: '600',
  margin: '32px 0 16px',
}

const detailText = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 8px',
}

const customerDetails = {
  backgroundColor: '#f9fafb',
  padding: '24px',
  borderRadius: '8px',
  margin: '16px 0',
  border: '1px solid #e5e7eb',
}

const eventDetails = {
  backgroundColor: '#fef3c7',
  padding: '24px',
  borderRadius: '8px',
  margin: '16px 0',
  border: '1px solid #fbbf24',
}

const messageSection = {
  backgroundColor: '#eff6ff',
  padding: '24px',
  borderRadius: '8px',
  margin: '16px 0',
  border: '1px solid #3b82f6',
}

const messageText = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0',
  fontStyle: 'italic',
}

const prioritySection = {
  backgroundColor: '#f0fdf4',
  padding: '16px 24px',
  borderRadius: '8px',
  margin: '24px 0',
  border: '2px solid #22c55e',
}

const priorityText = {
  color: '#166534',
  fontSize: '16px',
  fontWeight: '600',
  margin: '0',
  textAlign: 'center' as const,
}

const actionText = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0',
}

const hr = {
  borderColor: '#e5e7eb',
  margin: '32px 0',
}

export default InternalNotificationEmail 