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

interface BookingConfirmationEmailProps {
  customerName: string
  customerEmail: string
  eventType: string
  eventDate: string
  eventTime: string
  guestCount: number
  venuePackage: string
  bookingNumber: string
  totalAmount: number
  depositPaid: number
  remainingBalance: number
  balanceDueDate: string
}

export const BookingConfirmationEmail = ({
  customerName,
  customerEmail,
  eventType,
  eventDate,
  eventTime,
  guestCount,
  venuePackage,
  bookingNumber,
  totalAmount,
  depositPaid,
  remainingBalance,
  balanceDueDate,
}: BookingConfirmationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>🎉 Booking Confirmed! Your event is secured - #{bookingNumber}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={h1}>🎉 Booking Confirmed!</Heading>
            <Text style={subtitle}>Events On Charles</Text>
          </Section>

          {/* Confirmation Message */}
          <Section style={content}>
            <div style={confirmationBanner}>
              <Text style={confirmationText}>
                Congratulations {customerName}! Your event is officially booked.
              </Text>
            </div>

            {/* Booking Details */}
            <Section style={bookingDetails}>
              <Heading style={h2}>Booking Details</Heading>
              <Row>
                <Column>
                  <Text style={detailText}>
                    <strong>Booking #:</strong> {bookingNumber}<br />
                    <strong>Event Type:</strong> {eventType}<br />
                    <strong>Date:</strong> {eventDate}<br />
                    <strong>Time:</strong> {eventTime}
                  </Text>
                </Column>
                <Column>
                  <Text style={detailText}>
                    <strong>Guest Count:</strong> {guestCount}<br />
                    <strong>Package:</strong> {venuePackage}<br />
                    <strong>Customer:</strong> {customerName}<br />
                    <strong>Email:</strong> {customerEmail}
                  </Text>
                </Column>
              </Row>
            </Section>

            <Hr style={hr} />

            {/* Payment Information */}
            <Section style={paymentSection}>
              <Heading style={h2}>Payment Summary</Heading>
              <div style={paymentDetails}>
                <Row>
                  <Column style={{ width: '60%' }}>
                    <Text style={paymentLabel}>Total Event Cost:</Text>
                  </Column>
                  <Column style={{ width: '40%' }}>
                    <Text style={paymentValue}>${totalAmount}</Text>
                  </Column>
                </Row>
                <Row>
                  <Column style={{ width: '60%' }}>
                    <Text style={paymentLabel}>Deposit Paid:</Text>
                  </Column>
                  <Column style={{ width: '40%' }}>
                    <Text style={paymentValuePaid}>-${depositPaid}</Text>
                  </Column>
                </Row>
                <Row>
                  <Column style={{ width: '60%' }}>
                    <Text style={remainingLabel}>Remaining Balance:</Text>
                  </Column>
                  <Column style={{ width: '40%' }}>
                    <Text style={remainingValue}>${remainingBalance}</Text>
                  </Column>
                </Row>
                <Row>
                  <Column style={{ width: '60%' }}>
                    <Text style={dueDateLabel}>Balance Due Date:</Text>
                  </Column>
                  <Column style={{ width: '40%' }}>
                    <Text style={dueDateValue}>{balanceDueDate}</Text>
                  </Column>
                </Row>
              </div>
            </Section>

            <Hr style={hr} />

            {/* What's Included */}
            <Section style={includesSection}>
              <Heading style={h3}>Your Event Package Includes:</Heading>
              <Text style={includesText}>
                ✅ 6-hour venue rental (until 11 PM)<br />
                ✅ Dedicated on-site event coordinator<br />
                ✅ 1-hour early access for setup<br />
                ✅ Professional lighting setup<br />
                ✅ Elegant focal point display with accent rug<br />
                ✅ Custom balloon arrangement (up to 3 colors)<br />
                ✅ Premium pipe & drape backdrop<br />
                ✅ Tables, chairs, and linens as selected<br />
                ✅ Sound system and microphone<br />
                ✅ Complimentary Wi-Fi access<br />
                ✅ Professional event cleanup
              </Text>
            </Section>

            <Hr style={hr} />

            {/* Important Reminders */}
            <Section style={remindersSection}>
              <Heading style={h3}>Important Reminders</Heading>
              <Text style={reminderText}>
                <strong>📅 Final Payment:</strong> Due 7 days before your event ({balanceDueDate})<br />
                <strong>👥 Final Guest Count:</strong> Please confirm 5 days before your event<br />
                <strong>🍽️ Catering:</strong> External catering coordination available<br />
                <strong>🚗 Parking:</strong> Free parking available on-site<br />
                <strong>📝 Event Timeline:</strong> We'll create a detailed timeline 2 weeks before your event
              </Text>
            </Section>

            <Hr style={hr} />

            {/* Next Steps */}
            <Section>
              <Heading style={h3}>What Happens Next?</Heading>
              <Text style={nextStepsText}>
                <strong>1. Event Planning Call</strong><br />
                Our coordinator will contact you within 48 hours to discuss your vision and specific requirements.
              </Text>
              
              <Text style={nextStepsText}>
                <strong>2. Venue Walkthrough</strong><br />
                Schedule a detailed walkthrough 4-6 weeks before your event to finalize setup details.
              </Text>
              
              <Text style={nextStepsText}>
                <strong>3. Final Preparations</strong><br />
                Two weeks before your event, we'll confirm all details and create your event timeline.
              </Text>
            </Section>

            <Hr style={hr} />

            {/* Contact Information */}
            <Section style={contactSection}>
              <Heading style={h3}>Need to Make Changes?</Heading>
              <Text style={contactText}>
                Our team is here to help make your event perfect. Don't hesitate to reach out with any questions or changes.
              </Text>
              <Text style={contactInfo}>
                <strong>📞 Phone:</strong> (401) 671-6758<br />
                <strong>📧 Email:</strong> info@eventsoncharles.com<br />
                <strong>📍 Address:</strong> 593 Charles Street, Providence, RI 02904<br />
                <strong>🕐 Hours:</strong> Mon-Fri 9AM-6PM, Sat-Sun 10AM-4PM
              </Text>
            </Section>

            <Hr style={hr} />

            {/* Social Media */}
            <Section style={socialSection}>
              <Heading style={h3}>Stay Connected</Heading>
              <Text style={socialText}>
                Follow us for event inspiration, tips, and behind-the-scenes content!
              </Text>
              <Text style={socialText}>
                📱 Instagram: @eventsoncharles<br />
                📘 Facebook: Events On Charles<br />
                💼 LinkedIn: Events On Charles
              </Text>
            </Section>

            {/* Footer */}
            <Section style={footer}>
              <Text style={footerText}>
                Thank you for choosing Events On Charles for your special day!<br />
                We can't wait to help create unforgettable memories.
              </Text>
              <Text style={footerSignature}>
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
  backgroundColor: '#16a34a',
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
  fontSize: '18px',
  margin: '0',
  textAlign: 'center' as const,
}

const content = {
  padding: '0 48px',
}

const confirmationBanner = {
  backgroundColor: '#f0fdf4',
  padding: '24px',
  borderRadius: '12px',
  border: '2px solid #22c55e',
  textAlign: 'center' as const,
  margin: '24px 0',
}

const confirmationText = {
  color: '#166534',
  fontSize: '20px',
  fontWeight: '600',
  margin: '0',
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

const bookingDetails = {
  backgroundColor: '#f9fafb',
  padding: '24px',
  borderRadius: '8px',
  border: '1px solid #e5e7eb',
  margin: '16px 0',
}

const detailText = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0',
}

const paymentSection = {
  backgroundColor: '#fef3c7',
  padding: '24px',
  borderRadius: '8px',
  border: '1px solid #f59e0b',
  margin: '16px 0',
}

const paymentDetails = {
  margin: '16px 0',
}

const paymentLabel = {
  color: '#92400e',
  fontSize: '16px',
  margin: '8px 0',
}

const paymentValue = {
  color: '#92400e',
  fontSize: '16px',
  margin: '8px 0',
  textAlign: 'right' as const,
}

const paymentValuePaid = {
  color: '#16a34a',
  fontSize: '16px',
  fontWeight: '600',
  margin: '8px 0',
  textAlign: 'right' as const,
}

const remainingLabel = {
  color: '#dc2626',
  fontSize: '18px',
  fontWeight: '700',
  margin: '12px 0 8px',
}

const remainingValue = {
  color: '#dc2626',
  fontSize: '20px',
  fontWeight: '700',
  margin: '12px 0 8px',
  textAlign: 'right' as const,
}

const dueDateLabel = {
  color: '#374151',
  fontSize: '14px',
  fontWeight: '600',
  margin: '4px 0',
}

const dueDateValue = {
  color: '#374151',
  fontSize: '14px',
  fontWeight: '600',
  margin: '4px 0',
  textAlign: 'right' as const,
}

const includesSection = {
  backgroundColor: '#f0fdf4',
  padding: '24px',
  borderRadius: '8px',
  border: '1px solid #22c55e',
  margin: '16px 0',
}

const includesText = {
  color: '#166534',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0',
}

const remindersSection = {
  backgroundColor: '#fef2f2',
  padding: '24px',
  borderRadius: '8px',
  border: '1px solid #f87171',
  margin: '16px 0',
}

const reminderText = {
  color: '#991b1b',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0',
}

const nextStepsText = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 16px',
}

const contactSection = {
  backgroundColor: '#eff6ff',
  padding: '24px',
  borderRadius: '8px',
  border: '1px solid #3b82f6',
  margin: '16px 0',
}

const contactText = {
  color: '#1e40af',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 16px',
}

const contactInfo = {
  color: '#1e40af',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0',
}

const socialSection = {
  backgroundColor: '#f3f4f6',
  padding: '24px',
  borderRadius: '8px',
  border: '1px solid #9ca3af',
  margin: '16px 0',
}

const socialText = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 8px',
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
  textAlign: 'center' as const,
}

const footerSignature = {
  color: '#d4af37',
  fontSize: '18px',
  fontWeight: '600',
  margin: '0',
  textAlign: 'center' as const,
}

const hr = {
  borderColor: '#e5e7eb',
  margin: '32px 0',
}

export default BookingConfirmationEmail 