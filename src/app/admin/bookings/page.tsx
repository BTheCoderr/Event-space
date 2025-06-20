'use client'

import { useState, useEffect } from 'react'
import { Calendar, Mail, Phone, User, Package, DollarSign } from 'lucide-react'

interface LocalBooking {
  id: string
  customer_name: string
  customer_email: string
  customer_phone?: string
  event_type: string
  event_date: string
  guest_count: number
  package_name: string
  total_amount: number
  deposit_amount: number
  message?: string
  created_at: string
}

export default function BookingsAdmin() {
  const [bookings, setBookings] = useState<LocalBooking[]>([])

  useEffect(() => {
    // Load bookings from localStorage
    const storedBookings = localStorage.getItem('eventBookings')
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings))
    }
  }, [])

  const clearBookings = () => {
    if (confirm('Are you sure you want to clear all local bookings?')) {
      localStorage.removeItem('eventBookings')
      setBookings([])
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Local Bookings</h1>
            <p className="text-gray-600 mt-2">Bookings stored locally (until database is connected)</p>
          </div>
          
          <div className="flex space-x-4">
            <div className="bg-white px-4 py-2 rounded-lg shadow">
              <span className="text-sm text-gray-600">Total Bookings: </span>
              <span className="font-bold text-yellow-600">{bookings.length}</span>
            </div>
            {bookings.length > 0 && (
              <button
                onClick={clearBookings}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Bookings Yet</h3>
            <p className="text-gray-600">Bookings will appear here when customers submit the booking form.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Customer Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <User className="w-5 h-5 mr-2 text-yellow-600" />
                      Customer Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <span className="font-medium w-16">Name:</span>
                        <span className="text-gray-700">{booking.customer_name}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="text-gray-700">{booking.customer_email}</span>
                      </div>
                      {booking.customer_phone && (
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="text-gray-700">{booking.customer_phone}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Event Details */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-yellow-600" />
                      Event Details
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <span className="font-medium w-16">Type:</span>
                        <span className="text-gray-700">{booking.event_type}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium w-16">Date:</span>
                        <span className="text-gray-700">{new Date(booking.event_date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium w-16">Guests:</span>
                        <span className="text-gray-700">{booking.guest_count}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium w-16">Package:</span>
                        <span className="text-gray-700">{booking.package_name}</span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing & Status */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <DollarSign className="w-5 h-5 mr-2 text-yellow-600" />
                      Pricing
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <span className="font-medium w-20">Total:</span>
                        <span className="text-gray-700 font-bold">${booking.total_amount}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium w-20">Deposit:</span>
                        <span className="text-yellow-600 font-bold">${booking.deposit_amount}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium w-20">Balance:</span>
                        <span className="text-gray-700">${booking.total_amount - booking.deposit_amount}</span>
                      </div>
                      <div className="pt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Inquiry
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Special Requests */}
                {booking.message && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-2">Special Requests:</h4>
                    <p className="text-gray-700 text-sm">{booking.message}</p>
                  </div>
                )}

                {/* Timestamp */}
                <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
                  Submitted: {new Date(booking.created_at).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 