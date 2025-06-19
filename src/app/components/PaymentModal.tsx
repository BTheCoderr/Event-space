'use client'

import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { X, CreditCard, Lock, Check } from 'lucide-react'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  amount: number
  packageName: string
  customerInfo: {
    name: string
    email: string
    phone?: string
  }
  onPaymentSuccess: (paymentIntent: {
    id: string
    status: string
    amount: number
    demo?: boolean
  }) => void
}

function PaymentForm({ 
  amount, 
  packageName, 
  customerInfo, 
  onPaymentSuccess 
}: {
  amount: number
  packageName: string
  customerInfo: {
    name: string
    email: string
    phone?: string
  }
  onPaymentSuccess: (paymentIntent: {
    id: string
    status: string
    amount: number
    demo?: boolean
  }) => void
}) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    
    if (!stripe || !elements) {
      setError('Payment system not loaded')
      return
    }

    setIsProcessing(true)
    setError('')

    try {
      // Create payment intent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: depositAmount,
          packageName,
          customerInfo,
        }),
      })

      const { clientSecret, demoMode, message } = await response.json()

      if (!response.ok) {
        throw new Error(message || 'Payment setup failed')
      }

      // Handle demo mode
      if (demoMode) {
        setError('')
        onPaymentSuccess({
          id: 'demo_payment_' + Date.now(),
          status: 'succeeded',
          amount: depositAmount * 100,
          demo: true
        })
        return
      }

      // Real Stripe payment
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement)!,
            billing_details: {
              name: customerInfo.name,
              email: customerInfo.email,
            },
          },
        }
      )

      if (stripeError) {
        setError(stripeError.message || 'Payment failed')
      } else if (paymentIntent) {
        onPaymentSuccess(paymentIntent)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed')
    } finally {
      setIsProcessing(false)
    }
  }

  const depositAmount = amount * 0.25 // 25% deposit
  const remainingAmount = amount - depositAmount

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Payment Summary */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-3">Payment Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Package: {packageName}</span>
            <span className="font-medium">${amount}</span>
          </div>
          <div className="flex justify-between text-yellow-600 font-medium">
            <span>Deposit (25%):</span>
            <span>${depositAmount}</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Remaining (due on event date):</span>
            <span>${remainingAmount}</span>
          </div>
        </div>
      </div>

      {/* Customer Info */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2 flex items-center">
          <Check className="w-4 h-4 text-green-600 mr-2" />
          Billing Information
        </h4>
        <div className="text-sm space-y-1">
          <p><strong>Name:</strong> {customerInfo.name}</p>
          <p><strong>Email:</strong> {customerInfo.email}</p>
          {customerInfo.phone && <p><strong>Phone:</strong> {customerInfo.phone}</p>}
        </div>
      </div>

      {/* Card Element */}
      <div>
        <label className="block text-sm font-medium mb-2">
          <CreditCard className="w-4 h-4 inline mr-2" />
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

      {/* Security Notice */}
      <div className="flex items-center text-sm text-gray-600 bg-green-50 p-3 rounded-lg">
        <Lock className="w-4 h-4 mr-2 text-green-600" />
        <span>Your payment information is encrypted and secure</span>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-yellow-600 text-white py-3 px-4 rounded-lg hover:bg-yellow-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
      >
        {isProcessing ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Processing...</span>
          </>
        ) : (
          <>
            <Lock className="w-4 h-4" />
            <span>Pay ${depositAmount} Deposit</span>
          </>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        By clicking "Pay Deposit", you agree to our terms of service and authorize this payment.
      </p>
    </form>
  )
}

export default function PaymentModal({ isOpen, onClose, amount, packageName, customerInfo, onPaymentSuccess }: PaymentModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Secure Payment</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Demo Mode Notice */}
          {!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center">
                <div className="text-blue-600 mr-2">ℹ️</div>
                <div className="text-sm text-blue-800">
                  <strong>Demo Mode:</strong> This is a demonstration. No real payment will be processed.
                </div>
              </div>
            </div>
          )}

          <Elements stripe={stripePromise}>
            <PaymentForm
              amount={amount}
              packageName={packageName}
              customerInfo={customerInfo}
              onPaymentSuccess={onPaymentSuccess}
            />
          </Elements>
        </div>
      </div>
    </div>
  )
} 