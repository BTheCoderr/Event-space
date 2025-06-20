'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../../../lib/supabase'
import { CheckCircle, XCircle, CreditCard, Mail, Calendar, User, Package } from 'lucide-react'

interface Booking {
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
  remaining_amount: number
  message?: string
  status: string
  payment_status: string
  created_at: string
}

export default function AdminWorkflow() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .in('status', ['inquiry', 'confirmed'])
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching bookings:', error)
        return
      }

      setBookings(data || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const confirmBooking = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ 
          status: 'confirmed',
          // Note: In real implementation, this would trigger sending payment link
        })
        .eq('id', bookingId)

      if (!error) {
        console.log('✅ Booking confirmed - payment link would be sent')
        fetchBookings() // Refresh the list
        
        // In real implementation, you would:
        // 1. Send payment link via email
        // 2. Update customer with confirmation
        // 3. Block the date in calendar
      }
    } catch (error) {
      console.error('Error confirming booking:', error)
    }
  }

  const rejectBooking = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ 
          status: 'cancelled',
          // Note: In real implementation, this would send rejection email
        })
        .eq('id', bookingId)

      if (!error) {
        console.log('❌ Booking rejected - customer would be notified')
        fetchBookings() // Refresh the list
        
        // In real implementation, you would:
        // 1. Send polite rejection email
        // 2. Suggest alternative dates
        // 3. Remove from pending list
      }
    } catch (error) {
      console.error('Error rejecting booking:', error)
    }
  }

  const sendPaymentReminder = async (booking: Booking) => {
    try {
      const response = await fetch('/api/send-payment-reminder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerEmail: booking.customer_email,
          customerName: booking.customer_name,
          eventType: booking.event_type,
          eventDate: booking.event_date,
          packageName: booking.package_name,
          depositAmount: booking.deposit_amount,
          bookingId: booking.id
        })
      })

      if (response.ok) {
        const result = await response.json()
        console.log('✅ Payment reminder processed successfully to:', booking.customer_email)
        
        if (result.paymentLink) {
          alert(`✅ Payment reminder sent successfully!\n\n💰 Payment Link: ${result.paymentLink}\n📧 Sent to: ${booking.customer_email}\n📤 From: ${result.sentFrom || 'backup email'}\n\nCustomer can now pay their $${booking.deposit_amount} deposit securely!`)
        } else {
          alert(`✅ Payment reminder processed!\n\n${result.message}`)
        }
      } else {
        console.log('❌ Failed to send payment reminder')
        alert('Failed to send payment reminder. Please try again.')
      }
    } catch (error) {
      console.error('Error sending payment reminder:', error)
      alert('Error sending payment reminder. Please check your connection.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading bookings...</p>
          </div>
        </div>
      </div>
    )
  }

  const pendingBookings = bookings.filter(b => b.status === 'inquiry')
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed' && b.payment_status === 'pending')
  const paidBookings = bookings.filter(b => b.payment_status === 'deposit_paid')

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Events On Charles - Booking Management</h1>
          <p className="text-gray-600 mt-2">Manage your smart booking workflow: confirm → pay → book</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Calendar className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Confirmation</p>
                <p className="text-2xl font-bold text-gray-900">{pendingBookings.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CreditCard className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Awaiting Payment</p>
                <p className="text-2xl font-bold text-gray-900">{confirmedBookings.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Confirmed & Paid</p>
                <p className="text-2xl font-bold text-gray-900">{paidBookings.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Confirmations */}
        {pendingBookings.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              📋 Pending Confirmations ({pendingBookings.length})
            </h2>
            <div className="space-y-4">
              {pendingBookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="grid md:grid-cols-4 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <User className="w-4 h-4 mr-2 text-yellow-600" />
                        Customer
                      </h3>
                      <p className="text-sm text-gray-600">{booking.customer_name}</p>
                      <p className="text-sm text-gray-600">{booking.customer_email}</p>
                      {booking.customer_phone && (
                        <p className="text-sm text-gray-600">{booking.customer_phone}</p>
                      )}
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-yellow-600" />
                        Event
                      </h3>
                      <p className="text-sm text-gray-600">{booking.event_type}</p>
                      <p className="text-sm text-gray-600">{new Date(booking.event_date).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-600">{booking.guest_count} guests</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <Package className="w-4 h-4 mr-2 text-yellow-600" />
                        Package
                      </h3>
                      <p className="text-sm text-gray-600">{booking.package_name}</p>
                      <p className="text-sm text-gray-600">Total: ${booking.total_amount}</p>
                      <p className="text-sm text-gray-600">Deposit: ${booking.deposit_amount}</p>
                    </div>

                    <div className="flex flex-col space-y-3">
                      <button
                        onClick={() => confirmBooking(booking.id)}
                        className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Confirm & Send Payment Link
                      </button>
                      
                      <button
                        onClick={() => rejectBooking(booking.id)}
                        className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject Booking
                      </button>
                    </div>
                  </div>

                  {booking.message && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="font-medium text-gray-900 mb-2">Special Requests:</h4>
                      <p className="text-sm text-gray-600">{booking.message}</p>
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
                    Submitted: {new Date(booking.created_at).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Awaiting Payment */}
        {confirmedBookings.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              💳 Awaiting Payment ({confirmedBookings.length})
            </h2>
            <div className="space-y-4">
              {confirmedBookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="grid md:grid-cols-4 gap-6">
                    <div>
                      <p className="font-semibold text-gray-900">{booking.customer_name}</p>
                      <p className="text-sm text-gray-600">{booking.customer_email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{booking.event_type}</p>
                      <p className="text-sm text-gray-600">{new Date(booking.event_date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{booking.package_name}</p>
                      <p className="text-sm font-medium text-gray-900">Deposit Due: ${booking.deposit_amount}</p>
                    </div>
                    <div>
                      <button
                        onClick={() => sendPaymentReminder(booking)}
                        className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Send Payment Reminder
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Confirmed & Paid */}
        {paidBookings.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              ✅ Confirmed & Paid ({paidBookings.length})
            </h2>
            <div className="space-y-4">
              {paidBookings.map((booking) => (
                <div key={booking.id} className="bg-green-50 rounded-lg border border-green-200 p-6">
                  <div className="grid md:grid-cols-4 gap-6">
                    <div>
                      <p className="font-semibold text-gray-900">{booking.customer_name}</p>
                      <p className="text-sm text-gray-600">{booking.customer_email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{booking.event_type}</p>
                      <p className="text-sm text-gray-600">{new Date(booking.event_date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{booking.package_name}</p>
                      <p className="text-sm text-green-700 font-medium">✓ Deposit Paid: ${booking.deposit_amount}</p>
                    </div>
                    <div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        Event Confirmed
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {bookings.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Bookings Yet</h3>
            <p className="text-gray-600">Bookings will appear here when customers submit requests.</p>
          </div>
        )}
      </div>
    </div>
  )
} 