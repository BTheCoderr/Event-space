'use client'

import { useState, useRef } from 'react'
import { supabase } from '../../../lib/supabase'
import SignatureCanvas from 'react-signature-canvas'
import { Calendar, Clock, Users, FileText, CheckCircle, AlertCircle } from 'lucide-react'

interface BookingFormData {
  customer_name: string
  customer_email: string
  customer_phone: string
  event_type: string
  event_date: string
  guest_count: number
  package_name: string
  total_amount: number
  deposit_amount: number
  special_requests: string
  agreed_to_terms: boolean
  signature_data: string
}

export default function BookingSystem() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<BookingFormData>({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    event_type: '',
    event_date: '',
    guest_count: 0,
    package_name: '',
    total_amount: 0,
    deposit_amount: 0,
    special_requests: '',
    agreed_to_terms: false,
    signature_data: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const signatureRef = useRef<SignatureCanvas>(null)

  const packageOptions = [
    { name: 'Holiday Celebration', price: 1600, description: 'Perfect for holiday parties and seasonal celebrations' },
    { name: 'Bridal Shower', price: 2500, description: 'Elegant bridal shower with premium amenities' },
    { name: 'Celebration Package', price: 1800, description: 'General celebration for any special occasion' },
    { name: 'Baby Shower', price: 1800, description: 'Welcoming celebration for new arrivals' },
    { name: 'Kids Party', price: 2000, description: 'Fun-filled party perfect for children' },
    { name: 'Intimate Dinner', price: 1300, description: 'Small, elegant dinner gathering' },
    { name: 'Wedding & Reception', price: 2500, description: 'Complete wedding and reception package' }
  ]

  const contractTerms = `VENUE RENTAL AGREEMENT - EVENTS ON CHARLES

1. BOOKING & PAYMENT TERMS
- A 25% deposit is required to secure your booking
- Remaining balance is due on the day of the event
- All payments are processed securely through Stripe

2. VENUE USAGE GUIDELINES
- Maximum occupancy must not exceed agreed guest count
- Events must end by agreed end time
- Venue must be left in clean, undamaged condition
- No smoking inside the venue premises

3. CANCELLATION POLICY
- Cancellations 30+ days before event: Full refund minus processing fees
- Cancellations 14-29 days before: 50% refund
- Cancellations less than 14 days: No refund

4. LIABILITY & RESPONSIBILITY
- Client is responsible for guest behavior and any damages
- Events On Charles is not liable for personal property
- Adequate insurance coverage is recommended

5. FORCE MAJEURE
- Events On Charles is not liable for circumstances beyond our control
- In case of venue unavailability, full refund will be provided

By signing below, you acknowledge that you have read, understood, and agree to all terms and conditions.`

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handlePackageSelect = (packageOption: typeof packageOptions[0]) => {
    setFormData(prev => ({
      ...prev,
      package_name: packageOption.name,
      total_amount: packageOption.price,
      deposit_amount: packageOption.price * 0.25
    }))
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

  const submitBooking = async () => {
    setIsSubmitting(true)
    try {
      // Save booking to Supabase
      const { error } = await supabase
        .from('bookings')
        .insert([{
          customer_name: formData.customer_name,
          customer_email: formData.customer_email,
          customer_phone: formData.customer_phone,
          event_type: formData.event_type,
          event_date: formData.event_date,
          guest_count: formData.guest_count,
          package_name: formData.package_name,
          base_price: formData.total_amount,
          total_amount: formData.total_amount,
          deposit_amount: formData.deposit_amount,
          remaining_amount: formData.total_amount - formData.deposit_amount,
          message: formData.special_requests,
          status: 'inquiry',
          payment_status: 'pending',
          add_ons: []
        }])

      if (error) throw error

      // Send confirmation email
      await fetch('/.netlify/functions/sendBookingConfirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.customer_email,
          name: formData.customer_name,
          eventType: formData.event_type,
          eventDate: formData.event_date,
          packageName: formData.package_name,
          totalAmount: formData.total_amount,
          depositAmount: formData.deposit_amount,
          password: 'Eventoncharles457$$'
        })
      })

      setSuccess(true)
    } catch (error) {
      console.error('Error submitting booking:', error)
      alert('There was an error submitting your booking. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  if (success) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Submitted Successfully!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for choosing Events On Charles. We've received your booking request and will contact you within 24 hours to confirm details and process your deposit.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg text-left">
          <h3 className="font-semibold mb-2">Booking Summary:</h3>
          <p><strong>Event:</strong> {formData.event_type}</p>
          <p><strong>Date:</strong> {formData.event_date}</p>
          <p><strong>Package:</strong> {formData.package_name}</p>
          <p><strong>Total:</strong> ${formData.total_amount}</p>
          <p><strong>Deposit Due:</strong> ${formData.deposit_amount}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Professional Event Booking</h1>
        
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= step ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {step}
              </div>
              <span className={`ml-2 text-sm ${currentStep >= step ? 'text-yellow-600' : 'text-gray-500'}`}>
                {step === 1 && 'Event Details'}
                {step === 2 && 'Package Selection'}
                {step === 3 && 'Contract Terms'}
                {step === 4 && 'Confirmation'}
              </span>
              {step < 4 && <div className="flex-1 h-px bg-gray-200 mx-4" />}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Event Details */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold mb-4">Event Information</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name *</label>
              <input
                type="text"
                name="customer_name"
                value={formData.customer_name}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Email Address *</label>
              <input
                type="email"
                name="customer_email"
                value={formData.customer_email}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <input
                type="tel"
                name="customer_phone"
                value={formData.customer_phone}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Event Type *</label>
              <select
                name="event_type"
                value={formData.event_type}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
              >
                <option value="">Select Event Type</option>
                <option value="Wedding & Reception">Wedding & Reception</option>
                <option value="Bridal Shower">Bridal Shower</option>
                <option value="Baby Shower">Baby Shower</option>
                <option value="Birthday Party">Birthday Party</option>
                <option value="Corporate Event">Corporate Event</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Holiday Celebration">Holiday Celebration</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Event Date *</label>
              <input
                type="date"
                name="event_date"
                value={formData.event_date}
                onChange={handleInputChange}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Guest Count *</label>
              <input
                type="number"
                name="guest_count"
                value={formData.guest_count}
                onChange={handleInputChange}
                required
                min="1"
                max="200"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Special Requests</label>
            <textarea
              name="special_requests"
              value={formData.special_requests}
              onChange={handleInputChange}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
              placeholder="Any special requirements or requests for your event..."
            />
          </div>
          
          <button
            onClick={nextStep}
            disabled={!formData.customer_name || !formData.customer_email || !formData.event_type || !formData.event_date || !formData.guest_count}
            className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Continue to Package Selection
          </button>
        </div>
      )}

      {/* Step 2: Package Selection */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold mb-4">Select Your Package</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packageOptions.map((pkg) => (
              <div
                key={pkg.name}
                className={`border-2 rounded-lg p-6 cursor-pointer transition-colors ${
                  formData.package_name === pkg.name
                    ? 'border-yellow-600 bg-yellow-50'
                    : 'border-gray-200 hover:border-yellow-300'
                }`}
                onClick={() => handlePackageSelect(pkg)}
              >
                <h3 className="text-lg font-semibold mb-2">{pkg.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
                <div className="text-2xl font-bold text-yellow-600">${pkg.price}</div>
                <div className="text-sm text-gray-500">25% deposit: ${pkg.price * 0.25}</div>
              </div>
            ))}
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={prevStep}
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50"
            >
              Back
            </button>
            <button
              onClick={nextStep}
              disabled={!formData.package_name}
              className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Review Contract Terms
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Contract Terms & Signature */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold mb-4">Contract Terms & Agreement</h2>
          
          <div className="bg-gray-50 p-6 rounded-lg max-h-96 overflow-y-auto">
            <pre className="whitespace-pre-wrap text-sm text-gray-700">{contractTerms}</pre>
          </div>
          
          <div className="border-2 border-gray-300 rounded-lg p-4">
            <h3 className="font-semibold mb-4">Electronic Signature</h3>
            <p className="text-sm text-gray-600 mb-4">
              Please sign below to acknowledge that you have read and agree to the terms and conditions.
            </p>
            
            <div className="border border-gray-300 rounded">
              <SignatureCanvas
                ref={signatureRef}
                canvasProps={{
                  width: 500,
                  height: 200,
                  className: 'signature-canvas w-full'
                }}
                onEnd={saveSignature}
              />
            </div>
            
            <div className="flex space-x-3 mt-4">
              <button
                onClick={clearSignature}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Clear Signature
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="agreed_to_terms"
              checked={formData.agreed_to_terms}
              onChange={handleInputChange}
              required
              className="w-4 h-4 text-yellow-600"
            />
            <label className="text-sm text-gray-700">
              I have read, understood, and agree to the terms and conditions outlined above.
            </label>
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={prevStep}
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50"
            >
              Back
            </button>
            <button
              onClick={nextStep}
              disabled={!formData.agreed_to_terms || !formData.signature_data}
              className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Review & Submit
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Final Review */}
      {currentStep === 4 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold mb-4">Review Your Booking</h2>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Contact Information</h3>
                <p><strong>Name:</strong> {formData.customer_name}</p>
                <p><strong>Email:</strong> {formData.customer_email}</p>
                <p><strong>Phone:</strong> {formData.customer_phone}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Event Details</h3>
                <p><strong>Type:</strong> {formData.event_type}</p>
                <p><strong>Date:</strong> {formData.event_date}</p>
                <p><strong>Guests:</strong> {formData.guest_count}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Package & Pricing</h3>
                <p><strong>Package:</strong> {formData.package_name}</p>
                <p><strong>Total Amount:</strong> ${formData.total_amount}</p>
                <p><strong>Deposit (25%):</strong> ${formData.deposit_amount}</p>
                <p><strong>Balance Due:</strong> ${formData.total_amount - formData.deposit_amount}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Agreement Status</h3>
                <p className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Terms & conditions agreed
                </p>
                <p className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Electronic signature provided
                </p>
              </div>
            </div>
            
            {formData.special_requests && (
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Special Requests</h3>
                <p className="text-gray-700">{formData.special_requests}</p>
              </div>
            )}
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-800">Next Steps</h4>
                <p className="text-yellow-700 text-sm">
                  After submitting, we'll contact you within 24 hours to confirm your booking and process the deposit payment.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={prevStep}
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50"
            >
              Back
            </button>
            <button
              onClick={submitBooking}
              disabled={isSubmitting}
              className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
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
    </div>
  )
} 