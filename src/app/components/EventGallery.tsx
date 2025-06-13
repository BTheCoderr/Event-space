'use client'

import { useState } from 'react'
import { Eye, Calendar, Users, X } from 'lucide-react'

interface Event {
  id: string
  title: string
  date: string
  guestCount: number
  type: string
  images: string[]
  description: string
  featured: boolean
}

const events: Event[] = [
  {
    id: '1',
    title: 'Sarah & Michael\'s Wedding',
    date: '2024-05-14',
    guestCount: 150,
    type: 'Wedding',
    images: ['https://picsum.photos/400/300?random=11', 'https://picsum.photos/400/300?random=12', 'https://picsum.photos/400/300?random=13'],
    description: 'A beautiful garden wedding with elegant floral arrangements and romantic lighting.',
    featured: true
  },
  {
    id: '2',
    title: 'TechCorp Annual Conference',
    date: '2024-04-21',
    guestCount: 200,
    type: 'Corporate Event',
    images: ['https://picsum.photos/400/300?random=14', 'https://picsum.photos/400/300?random=15'],
    description: 'Professional corporate conference with state-of-the-art AV equipment.',
    featured: false
  },
  {
    id: '3',
    title: 'Emma\'s Sweet 16',
    date: '2024-03-09',
    guestCount: 80,
    type: 'Birthday Party',
    images: ['https://picsum.photos/400/300?random=16', 'https://picsum.photos/400/300?random=17', 'https://picsum.photos/400/300?random=18', 'https://picsum.photos/400/300?random=19'],
    description: 'A vibrant and fun celebration with custom decorations and entertainment.',
    featured: true
  },
  {
    id: '4',
    title: 'Golden Anniversary Celebration',
    date: '2024-02-13',
    guestCount: 120,
    type: 'Anniversary',
    images: ['https://picsum.photos/400/300?random=20', 'https://picsum.photos/400/300?random=21'],
    description: 'An elegant 50th anniversary celebration with family and friends.',
    featured: false
  }
]

const eventTypes = ['All', 'Wedding', 'Corporate Event', 'Birthday Party', 'Anniversary']

export default function EventGallery() {
  const [selectedType, setSelectedType] = useState('All')
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const filteredEvents = selectedType === 'All' 
    ? events 
    : events.filter(event => event.type === selectedType)

  const openEventModal = (event: Event) => {
    setSelectedEvent(event)
    setCurrentImageIndex(0)
  }

  const closeModal = () => {
    setSelectedEvent(null)
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    if (selectedEvent) {
      setCurrentImageIndex((prev) => 
        prev === selectedEvent.images.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (selectedEvent) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedEvent.images.length - 1 : prev - 1
      )
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {eventTypes.map(type => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedType === type
                ? 'bg-yellow-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map(event => (
          <div
            key={event.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() => openEventModal(event)}
          >
            <div className="relative">
              <img
                src={event.images[0]}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              {event.featured && (
                <div className="absolute top-2 left-2 bg-yellow-600 text-white px-2 py-1 rounded text-xs font-medium">
                  Featured
                </div>
              )}
              <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                {event.images.length} photos
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all flex items-center justify-center">
                <Eye className="w-8 h-8 text-white opacity-0 hover:opacity-100 transition-opacity" />
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{event.guestCount} guests</span>
                </div>
              </div>
              <span className="inline-block bg-purple-100 text-purple-600 px-2 py-1 rounded text-xs font-medium">
                {event.type}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-semibold">{selectedEvent.title}</h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image Carousel */}
            <div className="relative">
              <img
                src={selectedEvent.images[currentImageIndex]}
                alt={`${selectedEvent.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-96 object-cover"
              />
              
              {selectedEvent.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors"
                  >
                    ←
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors"
                  >
                    →
                  </button>
                  
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {selectedEvent.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Event Details */}
            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-yellow-600" />
                  <span>{new Date(selectedEvent.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-yellow-600" />
                  <span>{selectedEvent.guestCount} guests</span>
                </div>
                <span className="inline-block bg-yellow-100 text-yellow-600 px-3 py-1 rounded font-medium">
                  {selectedEvent.type}
                </span>
              </div>
              
              <p className="text-gray-600 leading-relaxed">{selectedEvent.description}</p>
              
              <div className="mt-6 pt-4 border-t">
                <button className="w-full bg-yellow-600 text-white py-3 px-6 rounded-lg hover:bg-yellow-700 transition-colors">
                  Book Similar Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 