'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react'

interface BookedDate {
  date: string
  eventType: string
  timeSlot: string
}

const bookedDates: BookedDate[] = [
  { date: '2024-06-15', eventType: 'Wedding', timeSlot: 'All Day' },
  { date: '2024-06-22', eventType: 'Corporate Event', timeSlot: '9:00 AM - 5:00 PM' },
  { date: '2024-06-29', eventType: 'Birthday Party', timeSlot: '6:00 PM - 11:00 PM' },
  { date: '2024-07-04', eventType: 'Anniversary', timeSlot: 'All Day' },
  { date: '2024-07-12', eventType: 'Conference', timeSlot: '8:00 AM - 6:00 PM' },
]

const timeSlots = [
  { label: 'Morning (8:00 AM - 12:00 PM)', price: 300 },
  { label: 'Afternoon (1:00 PM - 5:00 PM)', price: 400 },
  { label: 'Evening (6:00 PM - 11:00 PM)', price: 500 },
  { label: 'All Day (8:00 AM - 11:00 PM)', price: 800 },
]

export default function AvailabilityCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('')
  const [guestCount, setGuestCount] = useState(50)
  const [showBookingForm, setShowBookingForm] = useState(false)

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const isDateBooked = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return bookedDates.some(booking => booking.date === dateStr)
  }

  const getBookingInfo = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return bookedDates.find(booking => booking.date === dateStr)
  }

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    setSelectedDate(clickedDate)
    setShowBookingForm(true)
  }

  const handleBooking = () => {
    alert('Booking request submitted! We will contact you within 24 hours to confirm your reservation.')
    setShowBookingForm(false)
    setSelectedDate(null)
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Calendar */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-semibold">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {emptyDays.map(day => (
              <div key={`empty-${day}`} className="p-3"></div>
            ))}
            {days.map(day => {
              const isBooked = isDateBooked(day)
              const bookingInfo = getBookingInfo(day)
              const isPast = new Date(currentDate.getFullYear(), currentDate.getMonth(), day) < new Date()
              
              return (
                <button
                  key={day}
                  onClick={() => !isBooked && !isPast && handleDateClick(day)}
                  disabled={isBooked || isPast}
                  className={`p-3 text-sm rounded-lg transition-all relative ${
                    isPast
                      ? 'text-gray-400 cursor-not-allowed'
                      : isBooked
                      ? 'bg-red-100 text-red-600 cursor-not-allowed'
                      : 'hover:bg-yellow-100 hover:text-yellow-600 cursor-pointer'
                  }`}
                  title={isBooked ? `Booked: ${bookingInfo?.eventType} (${bookingInfo?.timeSlot})` : ''}
                >
                  {day}
                  {isBooked && (
                    <div className="absolute inset-0 bg-red-500 opacity-20 rounded-lg"></div>
                  )}
                </button>
              )
            })}
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-200 rounded"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-200 rounded"></div>
              <span>Booked</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <span>Past Date</span>
            </div>
          </div>
        </div>

        {/* Booking Information */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-yellow-600" />
              Time Slots & Pricing
            </h3>
            <div className="space-y-3">
              {timeSlots.map((slot, index) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50">
                  <span className="text-sm">{slot.label}</span>
                  <span className="font-semibold text-yellow-600">${slot.price}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Upcoming Bookings</h3>
            <div className="space-y-3">
              {bookedDates.slice(0, 3).map((booking, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{booking.eventType}</p>
                    <p className="text-sm text-gray-600">{booking.date}</p>
                  </div>
                  <span className="text-sm text-gray-500">{booking.timeSlot}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingForm && selectedDate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              Book for {selectedDate.toLocaleDateString()}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Time Slot</label>
                <select
                  value={selectedTimeSlot}
                  onChange={(e) => setSelectedTimeSlot(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                >
                  <option value="">Select time slot</option>
                  {timeSlots.map((slot, index) => (
                    <option key={index} value={slot.label}>
                      {slot.label} - ${slot.price}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Expected Guests</label>
                <input
                  type="number"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  min="1"
                  max="500"
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowBookingForm(false)}
                  className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBooking}
                  disabled={!selectedTimeSlot}
                  className="flex-1 py-2 px-4 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors disabled:bg-gray-300"
                >
                  Request Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 