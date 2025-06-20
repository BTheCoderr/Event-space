'use client'

import { useState } from 'react'
import { Calendar, Clock, Users, FileText, CheckCircle, Package, MessageSquare } from 'lucide-react'
import RentalContract from './RentalContract'

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
  startTime: string
  endTime: string
  guestCount: string
  guestsUnder21: string
  packageName: string
  totalAmount: number
  depositAmount: number
  message: string
  signatureData?: string
  contractAccepted?: boolean
}

export default function BookingSystem() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    eventType: '',
    eventDate: '',
    startTime: '',
    endTime: '',
    guestCount: '',
    guestsUnder21: '',
    packageName: '',
    totalAmount: 0,
    depositAmount: 0,
    message: '',
    signatureData: '',
    contractAccepted: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const updateFormData = (field: keyof FormData, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const selectPackage = (pkg: typeof PACKAGE_OPTIONS[0]) => {
    updateFormData('packageName', pkg.name)
    updateFormData('totalAmount', pkg.price)
    updateFormData('depositAmount', pkg.deposit)
  }

  const handleSignatureComplete = (signatureData: string) => {
    updateFormData('signatureData', signatureData)
  }

  const handleContractAccepted = () => {
    updateFormData('contractAccepted', true)
    setCurrentStep(5) // Move to final confirmation
  }

  // Prepare contract data for the RentalContract component
  const getContractData = () => {
    const selectedPackage = PACKAGE_OPTIONS.find(pkg => pkg.name === formData.packageName)
    
    return {
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone,
      eventType: formData.eventType,
      eventDate: formData.eventDate,
      startTime: formData.startTime,
      endTime: formData.endTime,
      guestCount: formData.guestCount,
      guestsUnder21: formData.guestsUnder21,
      packageName: formData.packageName,
      totalAmount: formData.totalAmount,
      depositAmount: formData.depositAmount,
      securityDeposit: 0, // Could be calculated based on package
      eventItems: selectedPackage ? selectedPackage.features.map(feature => ({
        item: feature,
        amount: 0, // Individual item pricing could be added later
        checked: true
      })) : []
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
          start_time: formData.startTime,
          end_time: formData.endTime,
          guest_count: parseInt(formData.guestCount),
          guests_under_21: formData.guestsUnder21,
          package_name: formData.packageName,
          total_amount: formData.totalAmount,
          deposit_amount: formData.depositAmount,
          remaining_amount: formData.totalAmount - formData.depositAmount,
          message: formData.message,
          signature_data: formData.signatureData,
          contract_accepted: formData.contractAccepted,
          status: 'inquiry',
          payment_status: 'pending'
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        // Already at step 5, show success message
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

  const nextStep = () => {
    if (currentStep < 5) {
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step
                      ? 'bg-yellow-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step}
                </div>
                {step < 5 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      currentStep > step ? 'bg-yellow-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Labels */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-8 text-sm">
            <span className={currentStep >= 1 ? 'text-yellow-600 font-medium' : 'text-gray-500'}>
              Event Details
            </span>
            <span className={currentStep >= 2 ? 'text-yellow-600 font-medium' : 'text-gray-500'}>
              Package
            </span>
            <span className={currentStep >= 3 ? 'text-yellow-600 font-medium' : 'text-gray-500'}>
              Contact Info
            </span>
            <span className={currentStep >= 4 ? 'text-yellow-600 font-medium' : 'text-gray-500'}>
              Contract
            </span>
            <span className={currentStep >= 5 ? 'text-yellow-600 font-medium' : 'text-gray-500'}>
              Confirmation
            </span>
          </div>
        </div>

        {/* Success Message */}
        {isSubmitted && (
          <div className="bg-white rounded-lg shadow-xl p-8 text-center">
            <div className="mb-6">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Request Submitted!</h2>
              <p className="text-gray-600">
                Thank you for choosing Events On Charles. We've received your booking request and signed contract.
              </p>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-yellow-800 mb-2">What happens next?</h3>
              <ul className="text-yellow-700 text-sm space-y-1 text-left">
                <li>• We'll confirm your event date availability within 24 hours</li>
                <li>• You'll receive a payment link for your ${formData.depositAmount} deposit</li>
                <li>• Your event is officially confirmed once deposit is received</li>
                <li>• We'll send you a detailed event planning guide</li>
              </ul>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                <strong>Booking Reference:</strong> {formData.customerName} - {formData.eventType} - {new Date(formData.eventDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">
                Questions? Contact us at <strong>support@eventsoncharles.com</strong> or <strong>(410) 555-0123</strong>
              </p>
            </div>
          </div>
        )}

        {!isSubmitted && (
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

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="w-4 h-4 inline mr-2" />
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => updateFormData('startTime', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="w-4 h-4 inline mr-2" />
                    End Time
                  </label>
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => updateFormData('endTime', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    required
                  />
                </div>
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Will there be guests under 21 years old?
                </label>
                <select
                  value={formData.guestsUnder21}
                  onChange={(e) => updateFormData('guestsUnder21', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  required
                >
                  <option value="">Please select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!formData.eventType || !formData.eventDate || !formData.startTime || !formData.endTime || !formData.guestCount || !formData.guestsUnder21}
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
                  Next: Review Contract
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Contract Review */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                <FileText className="w-6 h-6 inline mr-2" />
                Event Facility Rental Agreement
              </h2>
              
              <RentalContract
                contractData={getContractData()}
                onSignatureComplete={handleSignatureComplete}
                onContractAccepted={handleContractAccepted}
              />

              <div className="flex justify-between pt-6">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                >
                  Back to Contact Info
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Final Confirmation */}
          {currentStep === 5 && (
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

                {formData.contractAccepted && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Contract Signed
                    </h4>
                    <p className="text-green-700 text-sm">
                      You have successfully reviewed and signed the Event Facility Rental Agreement.
                    </p>
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
                  onClick={() => setCurrentStep(4)}
                  className="bg-gray-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                >
                  Back to Contract
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.contractAccepted}
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
        )}
      </div>
    </div>
  )
} 