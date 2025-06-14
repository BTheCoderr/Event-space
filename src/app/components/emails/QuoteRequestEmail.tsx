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

interface QuoteItem {
  name: string
  price: number
  quantity: number
  total: number
}

interface QuoteRequestEmailProps {
  customerName: string
  customerEmail: string
  eventType: string
  eventDate: string
  guestCount: number
  venuePackage: string
  items: QuoteItem[]
  subtotal: number
  deposit: number
  total: number
  quoteNumber: string
}

export const QuoteRequestEmail = ({
  customerName,
  customerEmail,
  eventType,
  eventDate,
  guestCount,
  venuePackage,
  items,
  subtotal,
  deposit,
  total,
  quoteNumber,
}: QuoteRequestEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your custom quote #{quoteNumber} - Events On Charles</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={h1}>Events On Charles</Heading>
            <Text style={subtitle}>Custom Event Quote</Text>
          </Section>

          {/* Quote Information */}
          <Section style={content}>
            <div style={quoteHeader}>
              <Row>
                <Column>
                  <Text style={quoteInfo}>
                    <strong>Quote #:</strong> {quoteNumber}<br />
                    <strong>Date:</strong> {new Date().toLocaleDateString()}<br />
                    <strong>Valid Until:</strong> {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </Text>
                </Column>
                <Column>
                  <Text style={quoteInfo}>
                    <strong>Customer:</strong> {customerName}<br />
                    <strong>Email:</strong> {customerEmail}<br />
                    <strong>Event Date:</strong> {eventDate}
                  </Text>
                </Column>
              </Row>
            </div>

            <Hr style={hr} />

            {/* Event Summary */}
            <Section style={eventSummary}>
              <Heading style={h2}>Event Summary</Heading>
              <Text style={summaryText}>
                <strong>Event Type:</strong> {eventType}<br />
                <strong>Expected Guests:</strong> {guestCount}<br />
                <strong>Venue Package:</strong> {venuePackage}
              </Text>
            </Section>

            <Hr style={hr} />

            {/* Itemized Quote */}
            <Heading style={h2}>Itemized Quote</Heading>
            <div style={quoteTable}>
              {/* Table Header */}
              <div style={tableHeader}>
                <Row>
                  <Column style={columnItem}>
                    <Text style={headerText}>Item</Text>
                  </Column>
                  <Column style={columnPrice}>
                    <Text style={headerText}>Price</Text>
                  </Column>
                  <Column style={columnQty}>
                    <Text style={headerText}>Qty</Text>
                  </Column>
                  <Column style={columnTotal}>
                    <Text style={headerText}>Total</Text>
                  </Column>
                </Row>
              </div>

              {/* Table Rows */}
              {items.map((item, index) => (
                <div key={index} style={tableRow}>
                  <Row>
                    <Column style={columnItem}>
                      <Text style={cellText}>{item.name}</Text>
                    </Column>
                    <Column style={columnPrice}>
                      <Text style={cellText}>${item.price}</Text>
                    </Column>
                    <Column style={columnQty}>
                      <Text style={cellText}>{item.quantity}</Text>
                    </Column>
                    <Column style={columnTotal}>
                      <Text style={cellText}>${item.total}</Text>
                    </Column>
                  </Row>
                </div>
              ))}

              {/* Totals */}
              <div style={totalsSection}>
                <Row>
                  <Column style={{ width: '70%' }}>
                    <Text style={totalLabel}>Subtotal:</Text>
                  </Column>
                  <Column style={{ width: '30%' }}>
                    <Text style={totalValue}>${subtotal}</Text>
                  </Column>
                </Row>
                <Row>
                  <Column style={{ width: '70%' }}>
                    <Text style={totalLabel}>Required Deposit (25%):</Text>
                  </Column>
                  <Column style={{ width: '30%' }}>
                    <Text style={totalValue}>${deposit}</Text>
                  </Column>
                </Row>
                <Row>
                  <Column style={{ width: '70%' }}>
                    <Text style={grandTotalLabel}>Grand Total:</Text>
                  </Column>
                  <Column style={{ width: '30%' }}>
                    <Text style={grandTotalValue}>${total}</Text>
                  </Column>
                </Row>
              </div>
            </div>

            <Hr style={hr} />

            {/* Package Includes */}
            <Section style={includesSection}>
              <Heading style={h3}>Your Package Includes:</Heading>
              <Text style={includesText}>
                ✅ 6 hour hall rental up to 11pm<br />
                ✅ On-site event attendant<br />
                ✅ Entry to hall available up to 1 hour prior<br />
                ✅ Focal point set-up & accent rug<br />
                ✅ Choice of up to 3 balloon colors<br />
                ✅ Pipe & drape curtain backdrop<br />
                ✅ Tables, chairs, and linens as selected<br />
                ✅ Professional event coordination
              </Text>
            </Section>

            <Hr style={hr} />

            {/* Next Steps */}
            <Section>
              <Heading style={h3}>Ready to Book?</Heading>
              <Text style={text}>
                To secure your date, we require a 25% deposit (${deposit}). 
                The remaining balance is due 7 days before your event.
              </Text>
              
              <Text style={text}>
                <strong>Next Steps:</strong><br />
                1. Review your quote carefully<br />
                2. Contact us to discuss any changes<br />
                3. Schedule a venue tour if you haven't already<br />
                4. Submit your deposit to confirm booking
              </Text>
            </Section>

            <Hr style={hr} />

            {/* Contact Information */}
            <Section style={contactSection}>
              <Heading style={h3}>Questions? Let's Talk!</Heading>
              <Text style={contactText}>
                <strong>Phone:</strong> (401) 671-6758<br />
                <strong>Email:</strong> info@eventsoncharles.com<br />
                <strong>Address:</strong> 593 Charles Street, Providence, RI 02904
              </Text>
            </Section>

            {/* Footer */}
            <Section style={footer}>
              <Text style={footerText}>
                This quote is valid for 30 days. Prices subject to change based on availability and date.
              </Text>
              <Text style={footerText}>
                <strong>Thank you for choosing Events On Charles!</strong>
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
  fontSize: '18px',
  margin: '0',
  textAlign: 'center' as const,
}

const content = {
  padding: '0 48px',
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

const quoteHeader = {
  backgroundColor: '#f9fafb',
  padding: '24px',
  borderRadius: '8px',
  border: '1px solid #e5e7eb',
  margin: '16px 0',
}

const quoteInfo = {
  color: '#374151',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0',
}

const eventSummary = {
  backgroundColor: '#fef3c7',
  padding: '24px',
  borderRadius: '8px',
  border: '1px solid #f59e0b',
}

const summaryText = {
  color: '#92400e',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0',
}

const quoteTable = {
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  overflow: 'hidden',
  margin: '16px 0',
}

const tableHeader = {
  backgroundColor: '#f3f4f6',
  padding: '12px 0',
}

const tableRow = {
  borderTop: '1px solid #e5e7eb',
  padding: '12px 0',
}

const columnItem = { width: '50%', padding: '0 16px' }
const columnPrice = { width: '15%', padding: '0 16px' }
const columnQty = { width: '15%', padding: '0 16px' }
const columnTotal = { width: '20%', padding: '0 16px' }

const headerText = {
  color: '#1f2937',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0',
}

const cellText = {
  color: '#374151',
  fontSize: '14px',
  margin: '0',
}

const totalsSection = {
  backgroundColor: '#f9fafb',
  padding: '16px 24px',
  borderTop: '2px solid #d4af37',
}

const totalLabel = {
  color: '#374151',
  fontSize: '16px',
  margin: '4px 0',
  textAlign: 'right' as const,
}

const totalValue = {
  color: '#374151',
  fontSize: '16px',
  margin: '4px 0',
  textAlign: 'right' as const,
}

const grandTotalLabel = {
  color: '#1f2937',
  fontSize: '18px',
  fontWeight: '700',
  margin: '8px 0 4px',
  textAlign: 'right' as const,
}

const grandTotalValue = {
  color: '#d4af37',
  fontSize: '20px',
  fontWeight: '700',
  margin: '8px 0 4px',
  textAlign: 'right' as const,
}

const includesSection = {
  backgroundColor: '#f0fdf4',
  padding: '24px',
  borderRadius: '8px',
  border: '1px solid #22c55e',
}

const includesText = {
  color: '#166534',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0',
}

const contactSection = {
  backgroundColor: '#eff6ff',
  padding: '24px',
  borderRadius: '8px',
  border: '1px solid #3b82f6',
}

const contactText = {
  color: '#1e40af',
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
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0 0 8px',
  textAlign: 'center' as const,
}

const hr = {
  borderColor: '#e5e7eb',
  margin: '32px 0',
}

export default QuoteRequestEmail 