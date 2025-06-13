'use client'

import { useState } from 'react'
import { Maximize2, Camera, MapPin, Users, Square } from 'lucide-react'

interface SpaceLayout {
  id: string
  name: string
  capacity: number
  area: string
  image: string
  description: string
  features: string[]
}

const spaces: SpaceLayout[] = [
  {
    id: 'main-hall',
    name: 'Grand Ballroom',
    capacity: 300,
    area: '2,500 sq ft',
    image: 'https://picsum.photos/600/400?random=1',
    description: 'Our flagship venue featuring elegant chandeliers, hardwood floors, and floor-to-ceiling windows.',
    features: ['Built-in Sound System', 'Professional Lighting', 'Bridal Suite', 'Catering Kitchen', 'Dance Floor']
  },
  {
    id: 'conference-room',
    name: 'Executive Conference Room',
    capacity: 50,
    area: '800 sq ft',
    image: 'https://picsum.photos/600/400?random=2',
    description: 'Perfect for corporate meetings, presentations, and business events with modern AV equipment.',
    features: ['Projector & Screen', 'Video Conferencing', 'Whiteboard', 'High-Speed WiFi', 'Coffee Station']
  },
  {
    id: 'garden-terrace',
    name: 'Garden Terrace',
    capacity: 150,
    area: '1,800 sq ft',
    image: 'https://picsum.photos/600/400?random=3',
    description: 'Beautiful outdoor space with landscaped gardens and city skyline views.',
    features: ['Outdoor Seating', 'Weather Protection', 'String Lighting', 'Bar Area', 'Garden Views']
  },
  {
    id: 'intimate-lounge',
    name: 'Intimate Lounge',
    capacity: 80,
    area: '1,200 sq ft',
    image: 'https://picsum.photos/600/400?random=4',
    description: 'Cozy space perfect for smaller gatherings, cocktail parties, and networking events.',
    features: ['Fireplace', 'Comfortable Seating', 'Wine Bar', 'Ambient Lighting', 'Private Entrance']
  }
]

const tableLayouts = [
  {
    name: 'Wedding Reception',
    description: 'Round tables for 200 guests with dance floor',
    guestCount: 200,
    tables: '20 round tables (10 guests each)',
    layout: 'reception'
  },
  {
    name: 'Corporate Conference',
    description: 'Theater-style seating for presentations',
    guestCount: 150,
    tables: 'Theater rows with center aisle',
    layout: 'theater'
  },
  {
    name: 'Cocktail Party',
    description: 'High-top tables and mingling space',
    guestCount: 100,
    tables: '12 cocktail tables with standing room',
    layout: 'cocktail'
  },
  {
    name: 'Gala Dinner',
    description: 'Formal dining with head table',
    guestCount: 180,
    tables: '18 round tables + head table',
    layout: 'gala'
  }
]

export default function VirtualTour() {
  const [selectedSpace, setSelectedSpace] = useState(spaces[0])
  const [selectedLayout, setSelectedLayout] = useState(tableLayouts[0])
  const [showLayoutPlanner, setShowLayoutPlanner] = useState(false)

  return (
    <div className="max-w-6xl mx-auto">
      {/* Main Virtual Tour with Interactive Features */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Interactive 360° Virtual Tour</h3>
          <p className="text-gray-600 mb-6">
            Take a complete virtual walkthrough of our event space using our interactive 360° tour. 
            Navigate through different areas, zoom in on details, and get a real feel for the venue.
          </p>
        </div>

        <div className="relative">
          {/* Embedded 360° Tour */}
          <div className="relative bg-gray-100 rounded-lg overflow-hidden mx-6" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src="https://my.matterport.com/show/?m=5Jbu5a8n85j"
              frameBorder="0"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
              title="360° Virtual Tour"
            />
          </div>
          <div className="absolute top-4 right-10 bg-white bg-opacity-90 px-3 py-1 rounded-lg">
            <span className="text-sm font-medium">{selectedSpace.area}</span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button
              onClick={() => window.open('https://discover.matterport.com/space/5Jbu5a8n85j', '_blank')}
              className="flex-1 bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Maximize2 className="w-5 h-5" />
              <span>Open in Full Screen</span>
            </button>
            <button
              onClick={() => window.open('https://discover.matterport.com/space/5Jbu5a8n85j', '_blank')}
              className="flex-1 border-2 border-yellow-600 text-yellow-600 px-6 py-3 rounded-lg hover:bg-yellow-50 transition-colors flex items-center justify-center space-x-2"
            >
              <Camera className="w-5 h-5" />
              <span>Virtual Reality Mode</span>
            </button>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedSpace.name}</h3>
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>Up to {selectedSpace.capacity} guests</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Square className="w-4 h-4" />
                  <span>{selectedSpace.area}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowLayoutPlanner(!showLayoutPlanner)}
              className="mt-4 md:mt-0 bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
            >
              {showLayoutPlanner ? 'Hide' : 'Show'} Layout Planner
            </button>
          </div>
          
          <p className="text-gray-600 mb-4">{selectedSpace.description}</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Features & Amenities</h4>
              <ul className="space-y-2">
                {selectedSpace.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center space-x-2">
                  <Camera className="w-4 h-4 text-yellow-600" />
                  <span>Download Floor Plan</span>
                </button>
                <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center space-x-2">
                  <Maximize2 className="w-4 h-4 text-yellow-600" />
                  <span>View in Full Screen</span>
                </button>
                <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-yellow-600" />
                  <span>Get Directions</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Space Selection */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {spaces.map((space) => (
          <button
            key={space.id}
            onClick={() => setSelectedSpace(space)}
            className={`text-left p-4 rounded-lg border-2 transition-all ${
              selectedSpace.id === space.id
                ? 'border-yellow-600 bg-yellow-50'
                : 'border-gray-200 hover:border-yellow-300'
            }`}
          >
            <img
              src={space.image}
              alt={space.name}
              className="w-full h-24 object-cover rounded mb-2"
            />
            <h4 className="font-semibold text-sm mb-1">{space.name}</h4>
            <p className="text-xs text-gray-600">Up to {space.capacity} guests</p>
          </button>
        ))}
      </div>

      {/* Layout Planner */}
      {showLayoutPlanner && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Table & Chair Layout Planner</h3>
          <p className="text-gray-600 mb-6">
            See how your event setup will look with our furniture and layout options.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Layout Options</h4>
              <div className="space-y-2">
                {tableLayouts.map((layout, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedLayout(layout)}
                    className={`w-full text-left p-4 rounded-lg border transition-colors ${
                      selectedLayout.name === layout.name
                        ? 'border-yellow-600 bg-yellow-50'
                        : 'border-gray-200 hover:border-yellow-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-medium">{layout.name}</h5>
                      <span className="text-sm text-yellow-600">{layout.guestCount} guests</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{layout.description}</p>
                    <p className="text-xs text-gray-500">{layout.tables}</p>
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Preview: {selectedLayout.name}</h4>
              <div className="bg-gray-50 rounded-lg p-6 h-64 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-8 h-8 text-yellow-600" />
                  </div>
                  <p className="text-gray-600 text-sm mb-2">Interactive 3D Layout Preview</p>
                  <p className="text-xs text-gray-500">
                    {selectedLayout.guestCount} guests • {selectedLayout.tables}
                  </p>
                </div>
              </div>
              
              <div className="mt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Guest Capacity:</span>
                  <span className="text-sm font-medium">{selectedLayout.guestCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Table Configuration:</span>
                  <span className="text-sm font-medium">{selectedLayout.tables}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Layout Style:</span>
                  <span className="text-sm font-medium capitalize">{selectedLayout.layout}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 