'use client'

import { useState, useRef } from 'react'
import { supabase } from '../../../lib/supabase'
import SignatureCanvas from 'react-signature-canvas'
import { Calendar, Clock, Users, FileText, CheckCircle, AlertCircle, CreditCard, Package, MessageSquare } from 'lucide-react'
import PaymentModal from './PaymentModal'

const PACKAGE_OPTIONS = [
  {
    name: 'Holiday Package',
    price: 1600,
    deposit: 400,
    description: 'Perfect for holiday celebrations with festive decorations',
    features: ['Holiday decorations', 'Festive lighting', 'Seasonal backdrop', 'Sound system']
  },
  {
    name: 'Bridal Shower Package',
    price: 2500,
    deposit: 625,
    description: 'Elegant setup for the perfect bridal shower',
    features: ['Elegant decorations', 'Bridal backdrop', 'Champagne service', 'Photo props']
  },
  {
    name: 'Celebration Package',
    price: 1800,
    deposit: 450,
    description: 'All-purpose celebration package for any special occasion',
    features: ['Custom decorations', 'Sound system', 'Lighting', 'Tables & chairs']
  },
  {
    name: 'Baby Shower Package',
    price: 1800,
    deposit: 450,
    description: 'Sweet setup for welcoming the little one',
    features: ['Baby-themed decorations', 'Soft lighting', 'Gift table', 'Photo backdrop']
  },
  {
    name: 'Kids Party',
    price: 2000,
    deposit: 500,
    description: 'Fun-filled party setup for children',
    features: ['Colorful decorations', 'Entertainment area', 'Kid-friendly setup', 'Activity space']
  },
  {
    name: 'Intimate Dinner Package',
    price: 1300,
    deposit: 325,
    description: 'Perfect for small gatherings and intimate dinners',
    features: ['Elegant table setting', 'Ambient lighting', 'Intimate atmosphere', 'Premium service']
  },
  {
    name: 'Wedding & Reception',
    price: 2500,
    deposit: 625,
    description: 'Complete wedding package for your special day',
    features: ['Bridal decorations', 'Reception setup', 'Dance floor', 'Full service']
  },
  {
    name: 'Custom Event Package',
    price: 1500,
    deposit: 375,
    description: 'Flexible package customized to your specific needs',
    features: ['Custom decorations', 'Flexible setup', 'Personalized service', 'Tailored experience']
  }
]

interface FormData {
  customerName: string
  customerEmail: string
  customerPhone: string
  eventType: string
  eventDate: string
  guestCount: string
  packageName: string
  totalAmount: number
  depositAmount: number
  message: string
}

export default function BookingSystem() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    eventType: '',
    eventDate: '',
    guestCount: '',
    packageName: '',
    totalAmount: 0,
    depositAmount: 0,
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [bookingId, setBookingId] = useState<string>('')
  const signatureRef = useRef<SignatureCanvas>(null)

  const updateFormData = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const selectPackage = (pkg: typeof PACKAGE_OPTIONS[0]) => {
    updateFormData('packageName', pkg.name)
    updateFormData('totalAmount', pkg.price)
    updateFormData('depositAmount', pkg.deposit)
  }

  const saveSignature = () => {
    if (signatureRef.current) {
      const signatureData = signatureRef.current.toDataURL()
      setFormData(prev => ({ ...prev, signature_data: signatureData }))
    }
  }

  const clearSignature = () => {
    if (signatureRef.current) {
      signatureRef.current.clear()
      setFormData(prev => ({ ...prev, signature_data: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Submit booking data
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_name: formData.customerName,
          customer_email: formData.customerEmail,
          customer_phone: formData.customerPhone,
          event_type: formData.eventType,
          event_date: formData.eventDate,
          guest_count: parseInt(formData.guestCount),
          package_name: formData.packageName,
          total_amount: formData.totalAmount,
          deposit_amount: formData.depositAmount,
          remaining_amount: formData.totalAmount - formData.depositAmount,
          message: formData.message,
          status: 'inquiry',
          payment_status: 'pending'
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setCurrentStep(5) // Success step
      } else {
        throw new Error('Failed to submit booking')
      }
    } catch (error) {
      console.error('Error submitting booking:', error)
      alert('There was an error submitting your booking. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePaymentSuccess = async (paymentIntent: any) => {
    try {
      // Update booking with payment information
      if (bookingId) {
        const { error } = await supabase
          .from('bookings')
          .update({
            payment_status: 'deposit_paid',
            status: 'confirmed',
            stripe_payment_intent_id: paymentIntent.id
          })
          .eq('id', bookingId)

        if (!error) {
          console.log('✅ Booking updated with payment info')
        }
      }

      setShowPaymentModal(false)
      // Refresh the success message to show payment confirmation
      setIsSubmitted(true)
    } catch (error) {
      console.error('Error updating booking with payment:', error)
    }
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Booking Request Submitted!</h2>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">🎯 Smart Booking Process</h3>
              <p className="text-yellow-700 text-left">
                <strong>Why no upfront payment?</strong> We believe in protecting both our customers and our business. 
                Here's how our smart process works:
              </p>
              <ol className="text-yellow-700 text-left mt-3 space-y-1">
                <li><strong>1.</strong> You submit your request (no payment required)</li>
                <li><strong>2.</strong> We confirm availability and send you a secure payment link</li>
                <li><strong>3.</strong> You pay only after we've confirmed your date is available</li>
                <li><strong>4.</strong> Your event is officially booked!</li>
              </ol>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">📋 Your Booking Summary</h3>
              <div className="text-left space-y-2">
                <p><strong>Event:</strong> {formData.eventType}</p>
                <p><strong>Date:</strong> {new Date(formData.eventDate).toLocaleDateString()}</p>
                <p><strong>Package:</strong> {formData.packageName}</p>
                <p><strong>Guests:</strong> {formData.guestCount}</p>
                <p><strong>Total:</strong> ${formData.totalAmount}</p>
                <p><strong>Deposit (25%):</strong> ${formData.depositAmount}</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-blue-800 mb-2">📧 Next Steps</h4>
              <p className="text-blue-700 text-sm">
                We'll review your request and send you a confirmation email within 24 hours. 
                If your date is available, we'll include a secure payment link for your deposit.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-yellow-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-yellow-700 transition-colors"
              >
                Submit Another Booking
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                className="w-full bg-gray-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                Return to Home
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 text-sm text-gray-600">
              <p><strong>Questions?</strong> Call us at (401) 671-6758 or email support@eventsoncharles.com</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                  step <= currentStep ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`w-24 h-1 mx-2 ${
                    step < currentStep ? 'bg-yellow-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Event Details</span>
            <span>Package Selection</span>
            <span>Contact Info</span>
            <span>Confirmation</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl p-8">
          {/* Step 1: Event Details */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Tell us about your event</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Event Type
                </label>
                <select
                  value={formData.eventType}
                  onChange={(e) => updateFormData('eventType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  required
                >
                  <option value="">Select event type</option>
                  <option value="Birthday Party">Birthday Party</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Baby Shower">Baby Shower</option>
                  <option value="Bridal Shower">Bridal Shower</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Corporate Event">Corporate Event</option>
                  <option value="Holiday Party">Holiday Party</option>
                  <option value="Graduation">Graduation</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Date
                </label>
                <input
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => updateFormData('eventDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="w-4 h-4 inline mr-2" />
                  Expected Number of Guests
                </label>
                <select
                  value={formData.guestCount}
                  onChange={(e) => updateFormData('guestCount', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  required
                >
                  <option value="">Select guest count</option>
                  <option value="10-25">10-25 guests</option>
                  <option value="26-50">26-50 guests</option>
                  <option value="51-75">51-75 guests</option>
                  <option value="76-100">76-100 guests</option>
                  <option value="100+">100+ guests</option>
                </select>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!formData.eventType || !formData.eventDate || !formData.guestCount}
                  className="bg-yellow-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next: Choose Package
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Package Selection */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                <Package className="w-6 h-6 inline mr-2" />
                Choose Your Package
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {PACKAGE_OPTIONS.map((pkg) => (
                  <div
                    key={pkg.name}
                    className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                      formData.packageName === pkg.name
                        ? 'border-yellow-500 bg-yellow-50'
                        : 'border-gray-200 hover:border-yellow-300'
                    }`}
                    onClick={() => selectPackage(pkg)}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{pkg.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{pkg.description}</p>
                    <div className="text-2xl font-bold text-yellow-600 mb-3">
                      ${pkg.price}
                      <span className="text-sm text-gray-500 font-normal"> total</span>
                    </div>
                    <div className="text-sm text-gray-600 mb-3">
                      Deposit: <span className="font-medium">${pkg.deposit} (25%)</span>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!formData.packageName}
                  className="bg-yellow-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next: Contact Info
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Contact Information */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.customerName}
                    onChange={(e) => updateFormData('customerName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.customerEmail}
                    onChange={(e) => updateFormData('customerEmail', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.customerPhone}
                  onChange={(e) => updateFormData('customerPhone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MessageSquare className="w-4 h-4 inline mr-2" />
                  Special Requests or Additional Information
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => updateFormData('message', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Tell us about any special requirements, dietary restrictions, decorating preferences, or other details..."
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!formData.customerName || !formData.customerEmail}
                  className="bg-yellow-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Review Booking
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Booking</h2>
              
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Event Details</h3>
                    <p><strong>Type:</strong> {formData.eventType}</p>
                    <p><strong>Date:</strong> {new Date(formData.eventDate).toLocaleDateString()}</p>
                    <p><strong>Guests:</strong> {formData.guestCount}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
                    <p><strong>Name:</strong> {formData.customerName}</p>
                    <p><strong>Email:</strong> {formData.customerEmail}</p>
                    {formData.customerPhone && <p><strong>Phone:</strong> {formData.customerPhone}</p>}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Package & Pricing</h3>
                  <p><strong>Package:</strong> {formData.packageName}</p>
                  <p><strong>Total Amount:</strong> ${formData.totalAmount}</p>
                  <p><strong>Deposit Required:</strong> ${formData.depositAmount} (25%)</p>
                  <p><strong>Remaining Balance:</strong> ${formData.totalAmount - formData.depositAmount} (due on event date)</p>
                </div>

                {formData.message && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Special Requests</h3>
                    <p className="text-gray-700">{formData.message}</p>
                  </div>
                )}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">📋 Important Information</h4>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• This is a booking request, not a confirmed reservation</li>
                  <li>• We'll confirm availability and send payment instructions within 24 hours</li>
                  <li>• No payment is required until we confirm your date is available</li>
                  <li>• Your booking is confirmed only after deposit payment</li>
                </ul>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-yellow-600 text-white px-8 py-2 rounded-lg font-medium hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    'Submit Booking Request'
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
} 