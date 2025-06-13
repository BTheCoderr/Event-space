'use client'

import { useState } from 'react'
import { Eye, Calendar, Users, X, Play, Upload, Image as ImageIcon, Video } from 'lucide-react'

interface MediaItem {
  type: 'image' | 'video'
  url: string
  thumbnail?: string
}

interface Event {
  id: string
  title: string
  date: string
  guestCount: number
  type: string
  media: MediaItem[]
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
    media: [
      { type: 'image', url: 'https://picsum.photos/400/300?random=11' },
      { type: 'image', url: 'https://picsum.photos/400/300?random=12' },
      { type: 'image', url: 'https://picsum.photos/400/300?random=13' },
      { type: 'video', url: '/videos/wedding-sample.mp4', thumbnail: 'https://picsum.photos/400/300?random=21' }
    ],
    description: 'A beautiful garden wedding with elegant floral arrangements and romantic lighting.',
    featured: true
  },
  {
    id: '2',
    title: 'TechCorp Annual Conference',
    date: '2024-04-21',
    guestCount: 200,
    type: 'Corporate Event',
    media: [
      { type: 'image', url: 'https://picsum.photos/400/300?random=14' },
      { type: 'video', url: '/videos/corporate-sample.mp4', thumbnail: 'https://picsum.photos/400/300?random=22' },
      { type: 'image', url: 'https://picsum.photos/400/300?random=15' }
    ],
    description: 'Professional corporate conference with state-of-the-art AV equipment.',
    featured: false
  },
  {
    id: '3',
    title: 'Sweet 15 Elegant Celebration',
    date: '2024-03-09',
    guestCount: 80,
    type: 'Birthday Party',
    media: [
      { type: 'image', url: '/images/sweet15-elegant-celebration-01.jpg' },
      { type: 'image', url: '/images/sweet15-elegant-celebration-02.jpg' },
      { type: 'image', url: '/images/sweet15-elegant-celebration-03.jpg' },
      { type: 'image', url: '/images/sweet15-elegant-celebration-04.jpg' },
      { type: 'image', url: '/images/sweet15-elegant-celebration-05.jpg' },
      { type: 'image', url: '/images/sweet15-elegant-celebration-06.jpg' }
    ],
    description: 'An elegant quinceañera celebration featuring luxurious black and gold decor, throne seating, and stunning floral arrangements. A truly magical evening celebrating this milestone birthday with style and sophistication.',
    featured: true
  },
  {
    id: '4',
    title: 'Golden Anniversary Celebration',
    date: '2024-02-13',
    guestCount: 120,
    type: 'Anniversary',
    media: [
      { type: 'image', url: 'https://picsum.photos/400/300?random=20' },
      { type: 'video', url: '/videos/anniversary-sample.mp4', thumbnail: 'https://picsum.photos/400/300?random=24' },
      { type: 'image', url: 'https://picsum.photos/400/300?random=21' }
    ],
    description: 'An elegant 50th anniversary celebration with family and friends.',
    featured: false
  }
]

const eventTypes = ['All', 'Wedding', 'Corporate Event', 'Birthday Party', 'Anniversary']

export default function EventGallery() {
  const [selectedType, setSelectedType] = useState('All')
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)
  const [showUploadModal, setShowUploadModal] = useState(false)

  const filteredEvents = selectedType === 'All' 
    ? events 
    : events.filter(event => event.type === selectedType)

  const openEventModal = (event: Event) => {
    setSelectedEvent(event)
    setCurrentMediaIndex(0)
  }

  const closeModal = () => {
    setSelectedEvent(null)
    setCurrentMediaIndex(0)
  }

  const nextMedia = () => {
    if (selectedEvent) {
      setCurrentMediaIndex((prev) => 
        prev === selectedEvent.media.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevMedia = () => {
    if (selectedEvent) {
      setCurrentMediaIndex((prev) => 
        prev === 0 ? selectedEvent.media.length - 1 : prev - 1
      )
    }
  }

  const getMediaCounts = (event: Event) => {
    const images = event.media.filter(item => item.type === 'image').length
    const videos = event.media.filter(item => item.type === 'video').length
    return { images, videos }
  }

  const getCurrentMedia = () => {
    if (!selectedEvent) return null
    return selectedEvent.media[currentMediaIndex]
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header with Upload Button */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex flex-wrap gap-2 justify-center flex-1">
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
        
        <button
          onClick={() => setShowUploadModal(true)}
          className="ml-4 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors flex items-center space-x-2"
        >
          <Upload className="w-4 h-4" />
          <span>Add Media</span>
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map(event => {
          const { images, videos } = getMediaCounts(event)
          const coverMedia = event.media[0]
          
          return (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => openEventModal(event)}
            >
              <div className="relative">
                {coverMedia.type === 'video' ? (
                  <div className="relative">
                    <img
                      src={coverMedia.thumbnail || coverMedia.url}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                  </div>
                ) : (
                  <img
                    src={coverMedia.url}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                
                {event.featured && (
                  <div className="absolute top-2 left-2 bg-yellow-600 text-white px-2 py-1 rounded text-xs font-medium">
                    Featured
                  </div>
                )}
                
                <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                  <div className="flex items-center space-x-2">
                    {images > 0 && (
                      <span className="flex items-center space-x-1">
                        <ImageIcon className="w-3 h-3" />
                        <span>{images}</span>
                      </span>
                    )}
                    {videos > 0 && (
                      <span className="flex items-center space-x-1">
                        <Video className="w-3 h-3" />
                        <span>{videos}</span>
                      </span>
                    )}
                  </div>
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
                <span className="inline-block bg-yellow-100 text-yellow-600 px-2 py-1 rounded text-xs font-medium">
                  {event.type}
                </span>
              </div>
            </div>
          )
        })}
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

            {/* Media Carousel */}
            <div className="relative">
              {getCurrentMedia()?.type === 'video' ? (
                <video
                  src={getCurrentMedia()?.url}
                  className="w-full h-96 object-cover"
                  controls
                  poster={getCurrentMedia()?.thumbnail}
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={getCurrentMedia()?.url}
                  alt={`${selectedEvent.title} - Media ${currentMediaIndex + 1}`}
                  className="w-full h-96 object-cover"
                />
              )}
              
              {selectedEvent.media.length > 1 && (
                <>
                  <button
                    onClick={prevMedia}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors"
                  >
                    ←
                  </button>
                  <button
                    onClick={nextMedia}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors"
                  >
                    →
                  </button>
                  
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {selectedEvent.media.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentMediaIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentMediaIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
              
              {/* Media Type Indicator */}
              <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                {getCurrentMedia()?.type === 'video' ? (
                  <>
                    <Video className="w-3 h-3" />
                    <span>Video</span>
                  </>
                ) : (
                  <>
                    <ImageIcon className="w-3 h-3" />
                    <span>Photo</span>
                  </>
                )}
                <span>({currentMediaIndex + 1}/{selectedEvent.media.length})</span>
              </div>
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
              
              <p className="text-gray-600 leading-relaxed mb-4">{selectedEvent.description}</p>
              
              {/* Media Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 className="font-semibold mb-2">Media Gallery</h4>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <ImageIcon className="w-4 h-4" />
                    <span>{getMediaCounts(selectedEvent).images} Photos</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Video className="w-4 h-4" />
                    <span>{getMediaCounts(selectedEvent).videos} Videos</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t">
                <button className="w-full bg-yellow-600 text-white py-3 px-6 rounded-lg hover:bg-yellow-700 transition-colors">
                  Book Similar Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Add Event Media</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Drag and drop your videos and photos here</p>
                <p className="text-sm text-gray-500 mb-4">Supports: MP4, MOV, JPG, PNG (Max 100MB per file)</p>
                <button className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
                  Choose Files
                </button>
              </div>
              
              <div className="text-sm text-gray-600">
                <p><strong>Tips for best results:</strong></p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>Videos should be 1080p or higher resolution</li>
                  <li>Keep video files under 100MB for faster loading</li>
                  <li>Include both wide shots and detail shots of your events</li>
                  <li>Good lighting and stable footage work best</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 