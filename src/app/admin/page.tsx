'use client'

import { useState, useEffect } from 'react'
import { Calendar, Users, DollarSign, Package, Clock, CheckCircle, XCircle, Eye } from 'lucide-react'

// Mock data for now - will connect to Supabase later
const mockBookings = [
  {
    id: '1',
    customer_name: 'Sarah Johnson',
    customer_email: 'sarah@email.com',
    event_type: 'Wedding & Reception',
    event_date: '2024-06-15',
    guest_count: 150,
    package_name: 'Wedding & Reception',
    total_amount: 3500,
    deposit_amount: 875,
    remaining_amount: 2625,
    status: 'confirmed',
    payment_status: 'deposit_paid',
    created_at: '2024-01-15'
  },
  {
    id: '2',
    customer_name: 'Michael Chen',
    customer_email: 'michael@email.com',
    event_type: 'Birthday Party',
    event_date: '2024-05-20',
    guest_count: 50,
    package_name: 'Celebration Package',
    total_amount: 1800,
    deposit_amount: 450,
    remaining_amount: 1350,
    status: 'inquiry',
    payment_status: 'pending',
    created_at: '2024-01-10'
  }
]

export default function AdminDashboard() {
  const [bookings, setBookings] = useState(mockBookings)
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'inventory'>('overview')
  const [selectedBooking, setSelectedBooking] = useState<any>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'inquiry': return 'bg-blue-100 text-blue-800'
      case 'quote_sent': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'in_progress': return 'bg-purple-100 text-purple-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'deposit_paid': return 'bg-blue-100 text-blue-800'
      case 'fully_paid': return 'bg-green-100 text-green-800'
      case 'refunded': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const stats = {
    totalBookings: bookings.length,
    confirmedBookings: bookings.filter(b => b.status === 'confirmed').length,
    pendingPayments: bookings.filter(b => b.payment_status === 'pending').length,
    totalRevenue: bookings
      .filter(b => b.payment_status !== 'pending')
      .reduce((sum, b) => sum + (b.deposit_amount || 0), 0)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Events On Charles - Admin</h1>
              <p className="text-gray-600">Manage your bookings and inventory</p>
            </div>
            <div className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: Calendar },
              { id: 'bookings', name: 'Bookings', icon: Users },
              { id: 'inventory', name: 'Inventory', icon: Package }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`${
                  activeTab === tab.id
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'overview' && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Users className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Bookings</dt>
                        <dd className="text-lg font-medium text-gray-900">{stats.totalBookings}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-green-400" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Confirmed</dt>
                        <dd className="text-lg font-medium text-gray-900">{stats.confirmedBookings}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Clock className="h-6 w-6 text-yellow-400" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Pending Payments</dt>
                        <dd className="text-lg font-medium text-gray-900">{stats.pendingPayments}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <DollarSign className="h-6 w-6 text-green-400" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Revenue (Deposits)</dt>
                        <dd className="text-lg font-medium text-gray-900">${stats.totalRevenue.toFixed(2)}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Recent Bookings</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bookings.map((booking) => (
                      <tr key={booking.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{booking.customer_name}</div>
                            <div className="text-sm text-gray-500">{booking.customer_email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{booking.event_type}</div>
                          <div className="text-sm text-gray-500">{booking.guest_count} guests</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(booking.event_date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                            {booking.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(booking.payment_status)}`}>
                            {booking.payment_status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => setSelectedBooking(booking)}
                            className="text-yellow-600 hover:text-yellow-900 mr-3"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">All Bookings</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-500">Full bookings management interface coming soon...</p>
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Inventory Management</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-500">Inventory tracking interface coming soon...</p>
            </div>
          </div>
        )}
      </div>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Booking Details</h2>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900">Customer Information</h3>
                  <p className="text-gray-600">{selectedBooking.customer_name}</p>
                  <p className="text-gray-600">{selectedBooking.customer_email}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900">Event Details</h3>
                  <p className="text-gray-600">Type: {selectedBooking.event_type}</p>
                  <p className="text-gray-600">Date: {new Date(selectedBooking.event_date).toLocaleDateString()}</p>
                  <p className="text-gray-600">Guests: {selectedBooking.guest_count}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900">Package & Pricing</h3>
                  <p className="text-gray-600">Package: {selectedBooking.package_name}</p>
                  <p className="text-gray-600">Total: ${selectedBooking.total_amount}</p>
                  <p className="text-gray-600">Deposit: ${selectedBooking.deposit_amount}</p>
                  <p className="text-gray-600">Remaining: ${selectedBooking.remaining_amount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 