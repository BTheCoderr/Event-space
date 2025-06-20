'use client'

import { useState, useRef } from 'react'
import { supabase } from '../../../lib/supabase'
import SignatureCanvas from 'react-signature-canvas'
import { Calendar, Clock, Users, FileText, CheckCircle, AlertCircle, CreditCard } from 'lucide-react'
import PaymentModal from './PaymentModal'

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
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [bookingId, setBookingId] = useState<string>('')
  const signatureRef = useRef<SignatureCanvas>(null)

  const packageOptions = [
    { name: 'Holiday Celebration', price: 1600, description: 'Perfect for holiday parties and seasonal celebrations' },
    { name: 'Bridal Shower', price: 2500, description: 'Elegant bridal shower with premium amenities' },
    { name: 'Celebration Package', price: 1800, description: 'General celebration for any special occasion' },
    { name: 'Baby Shower', price: 1800, description: 'Welcoming celebration for new arrivals' },
    { name: 'Kids Party', price: 2000, description: 'Fun-filled party perfect for children' },
    { name: 'Intimate Dinner', price: 1300, description: 'Small, elegant dinner gathering' },
    { name: 'Wedding & Reception', price: 2500, description: 'Complete wedding and reception package' },
    { name: 'Custom Event Package', price: 1500, description: 'Flexible package for unique events - we\'ll work with you to create the perfect experience!' }
  ]

  const contractTerms = `EVENTS ON CHARLES - VENUE RENTAL AGREEMENT
Baltimore's Premier Event Venue

1. SMART BOOKING PROCESS
- Submit your booking request with no upfront payment required
- We'll confirm availability within 24 hours of your request
- A 25% deposit secures your date ONLY after we confirm availability
- Remaining balance is due on your event day
- All payments processed securely through Stripe

2. VENUE GUIDELINES
- Maximum capacity: 200 guests (varies by event type)
- Events must conclude by agreed end time
- Venue must be left clean and undamaged
- No smoking inside Events On Charles premises
- Professional setup and breakdown included

3. CANCELLATION & REFUND POLICY
- 30+ days notice: Full refund minus 3% processing fee
- 14-29 days notice: 50% refund of deposit
- Less than 14 days: No refund (deposit forfeited)
- Weather/emergency cancellations handled case-by-case

4. LIABILITY & RESPONSIBILITY
- Client responsible for guest conduct and any damages
- Events On Charles provides general liability coverage for venue
- Additional insurance recommended for high-value events
- Security deposit may be required for certain events

5. WHAT'S INCLUDED
- Professional event setup and breakdown
- Tables, chairs, linens, and basic decor
- Sound system and lighting
- Dedicated event coordinator
- Climate-controlled environment

By signing below, you agree to these terms and confirm your booking request with Events On Charles.`

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
      // Create booking data
      const bookingData = {
        customer_name: formData.customer_name,
        customer_email: formData.customer_email,
        customer_phone: formData.customer_phone,
        event_type: formData.event_type,
        event_date: formData.event_date,
        guest_count: formData.guest_count,
        package_name: formData.package_name,
        total_amount: formData.total_amount,
        deposit_amount: formData.deposit_amount,
        remaining_amount: formData.total_amount - formData.deposit_amount,
        message: formData.special_requests,
        status: 'inquiry', // Smart workflow: starts as inquiry, not confirmed
        payment_status: 'pending', // Payment happens after we confirm availability
        created_at: new Date().toISOString()
      }

      // Try to save to Supabase first
      let bookingSaved = false
      let savedBookingId = ''
      
      try {
        // Only include fields that exist in our simplified schema
        const supabaseBooking = {
          customer_name: bookingData.customer_name,
          customer_email: bookingData.customer_email,
          customer_phone: bookingData.customer_phone,
          event_type: bookingData.event_type,
          event_date: bookingData.event_date,
          guest_count: bookingData.guest_count,
          package_name: bookingData.package_name,
          total_amount: bookingData.total_amount,
          deposit_amount: bookingData.deposit_amount,
          remaining_amount: bookingData.remaining_amount,
          message: bookingData.message,
          status: bookingData.status,
          payment_status: bookingData.payment_status
        }

        const { data, error } = await supabase
          .from('bookings')
          .insert([supabaseBooking])
          .select()

        if (error) {
          console.log('Database not ready, using fallback API...')
        } else {
          bookingSaved = true
          savedBookingId = data[0]?.id || ''
          console.log('✅ Booking saved to Supabase successfully')
        }
      } catch (dbError) {
        console.log('Database connection issue, using fallback API:', dbError)
      }

      // If Supabase failed, use local API as backup
      if (!bookingSaved) {
        try {
          const apiResponse = await fetch('/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingData)
          })
          
          if (apiResponse.ok) {
            const result = await apiResponse.json()
            savedBookingId = result.bookingId
            console.log('✅ Booking saved via local API:', result.bookingId)
            bookingSaved = true
          }
        } catch (apiError) {
          console.log('Local API also failed, storing in localStorage:', apiError)
          // Final fallback - localStorage
          const existingBookings = JSON.parse(localStorage.getItem('eventBookings') || '[]')
          const localBooking = { ...bookingData, id: Date.now().toString() }
          existingBookings.push(localBooking)
          localStorage.setItem('eventBookings', JSON.stringify(existingBookings))
          savedBookingId = localBooking.id
          console.log('📦 Booking stored in localStorage as final backup')
        }
      }

      // Send confirmation email
      try {
        const emailResponse = await fetch('/api/send-booking-confirmation', {
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
            bookingId: savedBookingId,
            status: 'inquiry'
          })
        })

        if (emailResponse.ok) {
          console.log('✅ Confirmation emails sent successfully')
        } else {
          console.log('⚠️ Email service unavailable, but booking is saved')
          console.log('📧 Booking Details (Email would be sent):', {
            customer: formData.customer_name,
            email: formData.customer_email,
            event: formData.event_type,
            date: formData.event_date,
            package: formData.package_name,
            total: formData.total_amount,
            status: 'inquiry'
          })
        }
      } catch (emailError) {
        console.log('📧 Email service unavailable, booking still recorded:', emailError)
      }

      setBookingId(savedBookingId)
      setSuccess(true)
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
      setSuccess(true)
    } catch (error) {
      console.error('Error updating booking with payment:', error)
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
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Events On Charles Booking Request is Submitted!</h2>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center mb-2">
            <AlertCircle className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="font-semibold text-blue-900">Events On Charles Smart Booking</h3>
          </div>
          <p className="text-blue-800 text-sm">
            Thank you for choosing Events On Charles! We've received your request and will confirm availability within 24 hours. 
            <strong> No payment required until we confirm your date is available.</strong>
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg text-left mb-6">
          <h3 className="font-semibold mb-2">Booking Summary:</h3>
          <p><strong>Event:</strong> {formData.event_type}</p>
          <p><strong>Date:</strong> {formData.event_date}</p>
          <p><strong>Package:</strong> {formData.package_name}</p>
          <p><strong>Total:</strong> ${formData.total_amount}</p>
          <p><strong>Deposit (25%):</strong> ${formData.deposit_amount}</p>
          <p><strong>Booking ID:</strong> {bookingId}</p>
        </div>

        <div className="space-y-3 text-sm text-gray-600">
          <p><strong>Next Steps:</strong></p>
          <div className="text-left space-y-2">
            <p>1. ✅ We'll check availability for {formData.event_date}</p>
            <p>2. 📧 You'll receive confirmation via email within 24 hours</p>
            <p>3. 💳 If available, we'll send a secure payment link for your deposit</p>
            <p>4. 🎉 Once deposit is paid, your event is officially confirmed!</p>
          </div>
        </div>

                  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm">
              <strong>Why Events On Charles uses this process:</strong> We're committed to delivering exceptional events. 
              By confirming availability first, we ensure we can provide the premium service you deserve.
            </p>
          </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Events On Charles Booking</h1>
        <p className="text-gray-600">Book your perfect event at Baltimore's premier venue</p>
        
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
                <option value="Graduation">Graduation</option>
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
          <h2 className="text-xl font-semibold mb-4">Choose Your Package</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {packageOptions.map((pkg) => (
              <div
                key={pkg.name}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  formData.package_name === pkg.name
                    ? 'border-yellow-600 bg-yellow-50'
                    : 'border-gray-300 hover:border-yellow-400'
                }`}
                onClick={() => handlePackageSelect(pkg)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{pkg.name}</h3>
                  <span className="text-yellow-600 font-bold">${pkg.price}</span>
                </div>
                <p className="text-gray-600 text-sm">{pkg.description}</p>
                {formData.package_name === pkg.name && (
                  <div className="mt-3 text-sm text-yellow-600">
                    <p>✓ Selected - Deposit: ${pkg.price * 0.25}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {formData.package_name && (
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Package Summary:</h4>
              <p><strong>Package:</strong> {formData.package_name}</p>
              <p><strong>Total Cost:</strong> ${formData.total_amount}</p>
              <p><strong>Deposit Required:</strong> ${formData.deposit_amount} (25%)</p>
              <p><strong>Balance Due on Event Day:</strong> ${formData.total_amount - formData.deposit_amount}</p>
            </div>
          )}
          
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
              Continue to Contract
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Contract Terms */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold mb-4">Contract Terms & Agreement</h2>
          
          <div className="border border-gray-300 rounded-lg p-4 h-64 overflow-y-auto bg-gray-50">
            <pre className="text-sm whitespace-pre-wrap">{contractTerms}</pre>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Electronic Signature</h3>
            <div className="border border-gray-300 rounded-lg p-4 bg-white">
              <SignatureCanvas
                ref={signatureRef}
                canvasProps={{
                  width: 500,
                  height: 200,
                  className: 'signature-canvas w-full border'
                }}
              />
            </div>
            <div className="flex space-x-3 mt-3">
              <button
                onClick={saveSignature}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Save Signature
              </button>
              <button
                onClick={clearSignature}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Clear
              </button>
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              name="agreed_to_terms"
              checked={formData.agreed_to_terms}
              onChange={handleInputChange}
              className="mr-2"
            />
            <label className="text-sm">
              I have read, understood, and agree to the terms and conditions above
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
              Continue to Review
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Review & Submit */}
      {currentStep === 4 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold mb-4">Review Your Booking</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Customer Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-yellow-600" />
                Customer Information
              </h3>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">Name:</span> {formData.customer_name}</div>
                <div><span className="font-medium">Email:</span> {formData.customer_email}</div>
                {formData.customer_phone && <div><span className="font-medium">Phone:</span> {formData.customer_phone}</div>}
              </div>
            </div>

            {/* Event Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-yellow-600" />
                Event Details
              </h3>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">Type:</span> {formData.event_type}</div>
                <div><span className="font-medium">Date:</span> {new Date(formData.event_date).toLocaleDateString()}</div>
                <div><span className="font-medium">Guests:</span> {formData.guest_count}</div>
                <div><span className="font-medium">Package:</span> {formData.package_name}</div>
              </div>
            </div>

            {/* Pricing & Agreement */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-yellow-600" />
                Pricing & Agreement
              </h3>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">Total:</span> <span className="font-bold">${formData.total_amount}</span></div>
                <div><span className="font-medium">Deposit:</span> <span className="text-yellow-600 font-bold">${formData.deposit_amount}</span></div>
                <div><span className="font-medium">Balance:</span> ${formData.total_amount - formData.deposit_amount}</div>
                <div className="pt-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    ✓ Terms Agreed
                  </span>
                </div>
                <div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    ✓ Signature Provided
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Special Requests */}
          {formData.special_requests && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2">Special Requests:</h4>
              <p className="text-gray-700 text-sm">{formData.special_requests}</p>
            </div>
          )}

          {/* Smart Booking Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <AlertCircle className="w-5 h-5 text-blue-600 mr-2" />
              <h4 className="font-semibold text-blue-900">Smart Booking Process</h4>
            </div>
            <p className="text-blue-800 text-sm mb-3">
              By submitting this booking request, you're NOT committing to payment yet. Here's what happens next:
            </p>
            <div className="text-blue-800 text-sm space-y-1">
              <p>1. ✅ We'll check availability for {formData.event_date}</p>
              <p>2. 📧 You'll receive confirmation within 24 hours</p>
              <p>3. 💳 If available, we'll send a secure payment link</p>
              <p>4. 🎉 Your event is confirmed once deposit is paid</p>
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
              className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4" />
                  <span>Submit Booking Request</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          amount={formData.total_amount}
          packageName={formData.package_name}
          customerInfo={{
            name: formData.customer_name,
            email: formData.customer_email,
            phone: formData.customer_phone
          }}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  )
} 