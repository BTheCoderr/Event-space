'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { CheckCircle, CreditCard, Shield, ArrowLeft } from 'lucide-react'

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface PaymentFormProps {
  bookingId: string
  amount: number
  type: string
}

function PaymentForm({ bookingId, amount, type }: PaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  })

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setLoading(true)
    setError(null)

    const cardElement = elements.getElement(CardElement)

    if (!cardElement) {
      setError('Card information is required')
      setLoading(false)
      return
    }

    try {
      // Create payment intent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount * 100, // Convert to cents
          bookingId,
          customerInfo,
          paymentType: type
        }),
      })

      const { clientSecret, error: apiError } = await response.json()

      if (apiError) {
        setError(apiError)
        setLoading(false)
        return
      }

      // Confirm payment
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: customerInfo.name,
            email: customerInfo.email,
            phone: customerInfo.phone,
          },
        },
      })

      if (stripeError) {
        setError(stripeError.message || 'Payment failed')
      } else if (paymentIntent.status === 'succeeded') {
        console.log('Payment succeeded:', paymentIntent.id)
        
        // Confirm payment and update booking status
        try {
          const confirmResponse = await fetch('/api/create-payment-intent', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              paymentIntentId: paymentIntent.id,
              bookingId
            }),
          })

          const confirmResult = await confirmResponse.json()
          
          if (confirmResult.success) {
            console.log('✅ Booking status updated:', confirmResult.booking)
            setSuccess(true)
          } else {
            setError('Payment processed but booking update failed. Please contact support.')
          }
        } catch (confirmError) {
          console.error('Error confirming payment:', confirmError)
          setError('Payment processed but confirmation failed. Please contact support.')
        }
      }
    } catch (err) {
      setError('An unexpected error occurred')
    }

    setLoading(false)
  }

  if (success) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Successful!</h2>
        <p className="text-gray-600 mb-6">
          Your ${amount} deposit has been processed successfully. You'll receive a confirmation email shortly.
        </p>
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600">
            <strong>Booking ID:</strong> {bookingId}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Amount Paid:</strong> ${amount}
          </p>
        </div>
        <button
          onClick={() => window.location.href = '/'}
          className="w-full bg-yellow-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-yellow-700 transition-colors"
        >
          Return to Events On Charles
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CreditCard className="w-8 h-8 text-yellow-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Secure Payment</h2>
        <p className="text-gray-600">
          {type === 'deposit' ? 'Event Deposit' : 'Payment'} - ${amount}
        </p>
      </div>

      {/* Customer Information */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            required
            value={customerInfo.name}
            onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            required
            value={customerInfo.email}
            onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            value={customerInfo.phone}
            onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            placeholder="Enter your phone number"
          />
        </div>
      </div>

      {/* Card Information */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Information
        </label>
        <div className="border border-gray-300 rounded-lg p-3 bg-white">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
              },
            }}
          />
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-yellow-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Processing...
          </>
        ) : (
          <>
            <Shield className="w-4 h-4 mr-2" />
            Pay ${amount} Securely
          </>
        )}
      </button>

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          🔒 Your payment information is encrypted and secure
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Powered by Stripe • PCI DSS Compliant
        </p>
      </div>
    </form>
  )
}

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const [bookingInfo, setBookingInfo] = useState<{
    bookingId: string
    amount: number
    type: string
  } | null>(null)

  useEffect(() => {
    const bookingId = searchParams.get('booking')
    const amount = parseFloat(searchParams.get('amount') || '0')
    const type = searchParams.get('type') || 'payment'

    if (bookingId && amount > 0) {
      setBookingInfo({ bookingId, amount, type })
    }
  }, [searchParams])

  if (!bookingInfo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Invalid Payment Link</h2>
          <p className="text-gray-600 mb-6">
            This payment link is invalid or has expired. Please contact Events On Charles for assistance.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="inline-flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to Website
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Events On Charles</h1>
          <p className="text-gray-600">Baltimore's Premier Event Venue</p>
        </div>

        {/* Payment Form */}
        <Elements stripe={stripePromise}>
          <PaymentForm
            bookingId={bookingInfo.bookingId}
            amount={bookingInfo.amount}
            type={bookingInfo.type}
          />
        </Elements>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Questions? Call us at (401) 671-6758 or email support@eventsoncharles.com</p>
        </div>
      </div>
    </div>
  )
} 