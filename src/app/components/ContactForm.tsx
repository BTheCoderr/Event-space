'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Send, Check, Clock } from 'lucide-react'

interface FormData {
  name: string
  email: string
  phone: string
  eventType: string
  eventDate: string
  guestCount: string
  message: string
  marketingConsent: boolean
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    guestCount: '',
    message: '',
    marketingConsent: false
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      const result = await response.json()
      console.log('Email sent successfully:', result)
      
      setIsSubmitted(true)
      setIsSubmitting(false)
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          name: '',
          email: '',
          phone: '',
          eventType: '',
          eventDate: '',
          guestCount: '',
          message: '',
          marketingConsent: false
        })
      }, 5000)
    } catch (error) {
      console.error('Error sending email:', error)
      setIsSubmitting(false)
      // You might want to show an error message to the user here
      alert('There was an error sending your message. Please try again or call us directly at (401) 671-6758.')
    }
  }

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-green-50 border border-green-200 rounded-lg p-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-green-800 mb-2">Thank You!</h3>
          <p className="text-green-700 mb-4">
            We&apos;ve received your inquiry and will get back to you within 24 hours.
          </p>
          <p className="text-sm text-green-600">
            Check your email for a confirmation and our event planning guide.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Get In Touch</h3>
            <p className="text-gray-600 mb-6">
              Ready to plan your perfect event? Contact us today and let&apos;s make your vision come to life.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-gray-600">(401) 671-6758</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="font-medium">Email</p>
                <p className="text-gray-600">support@eventsoncharles.com</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="font-medium">Address</p>
                <p className="text-gray-600">593 Charles Street<br />Providence, RI 02904</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="font-medium">Hours</p>
                <p className="text-gray-600">
                  Mon-Fri: 9:00 AM - 6:00 PM<br />
                  Sat-Sun: 10:00 AM - 4:00 PM
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 rounded-lg p-6">
            <h4 className="font-semibold mb-3">Quick Response Guarantee</h4>
            <p className="text-sm text-gray-600">
              We respond to all inquiries within 24 hours. For urgent requests, 
              please call us directly at (555) 123-4567.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  placeholder="(555) 123-4567"
                />
              </div>
              
              <div>
                <label htmlFor="eventType" className="block text-sm font-medium mb-2">
                  Event Type
                </label>
                <select
                  id="eventType"
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                >
                  <option value="">Select event type</option>
                  <option value="wedding">Wedding & Reception</option>
                  <option value="bridal-shower">Bridal Shower</option>
                  <option value="baby-shower">Baby Shower</option>
                  <option value="birthday">Birthday Party</option>
                  <option value="kids-party">Kids Party</option>
                  <option value="holiday">Holiday Celebration</option>
                  <option value="intimate-dinner">Intimate Dinner</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="graduation">Graduation</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="eventDate" className="block text-sm font-medium mb-2">
                  Preferred Date
                </label>
                <input
                  type="date"
                  id="eventDate"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                />
              </div>
              
              <div>
                <label htmlFor="guestCount" className="block text-sm font-medium mb-2">
                  Expected Guests
                </label>
                <input
                  type="number"
                  id="guestCount"
                  name="guestCount"
                  value={formData.guestCount}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  placeholder="Number of guests"
                  min="1"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                placeholder="Tell us about your event vision, special requirements, or any questions..."
              />
            </div>
            
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="marketingConsent"
                name="marketingConsent"
                checked={formData.marketingConsent}
                onChange={handleInputChange}
                className="mt-1 w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-600"
              />
              <label htmlFor="marketingConsent" className="text-sm text-gray-600">
                I agree to receive marketing communications about special offers, 
                event planning tips, and venue updates. You can unsubscribe at any time.
              </label>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-yellow-600 text-white py-3 px-6 rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center space-x-2 disabled:bg-gray-400"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
} 