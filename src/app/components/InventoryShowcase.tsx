'use client'

import { useState } from 'react'
import { ShoppingCart, Plus, Minus, Check, Star, Calendar, Users, Camera, Music, Utensils, Lightbulb, Flower, Wine, Sparkles, User, Mail, Phone } from 'lucide-react'
import PaymentModal from './PaymentModal'

interface PackageService {
  id: string
  name: string
  price: number
  description: string
  icon: React.ComponentType<{ className?: string; w?: string; h?: string }>
  category: string
  included: boolean
  popular?: boolean
}

interface EventPackage {
  id: string
  name: string
  basePrice: number
  guestRange: string
  description: string
  image: string
  baseServices: string[]
  recommendedServices: string[]
  color: string
}

const eventPackages: EventPackage[] = [
  {
    id: 'holiday',
    name: 'Holiday Packages',
    basePrice: 1600,
    guestRange: 'Up to 30 Guests',
    description: 'Perfect for intimate holiday celebrations and festive gatherings',
    image: '/images/ecpackagesofferings/package-offering-01.jpg',
    baseServices: ['venue-rental', 'event-setup', 'focal-point', 'backdrop', 'tables-chairs', 'speaker', 'welcome-sign'],
    recommendedServices: ['uplighting', 'centerpieces', 'bar-setup', 'linens'],
    color: 'bg-red-500'
  },
  {
    id: 'bridal-shower',
    name: 'Bridal Shower Packages',
    basePrice: 2500,
    guestRange: 'Up to 60 Guests',
    description: 'Elegant bridal shower celebrations with beautiful décor and amenities',
    image: '/images/ecpackagesofferings/package-offering-02.jpg',
    baseServices: ['venue-rental', 'event-setup', 'focal-point', 'backdrop', 'tables-chairs', 'speaker', 'photo-board'],
    recommendedServices: ['champagne-wall', 'flower-bar', 'uplighting', 'centerpieces'],
    color: 'bg-pink-500'
  },
  {
    id: 'celebration',
    name: 'Celebration Packages',
    basePrice: 1800,
    guestRange: 'Up to 60 Guests',
    description: 'Versatile celebration packages for birthdays, anniversaries, and special occasions',
    image: '/images/ecpackagesofferings/package-offering-03.jpg',
    baseServices: ['venue-rental', 'event-setup', 'focal-point', 'backdrop', 'tables-chairs', 'speaker', 'welcome-sign'],
    recommendedServices: ['uplighting', 'centerpieces', 'bar-setup', 'photo-booth'],
    color: 'bg-purple-500'
  },
  {
    id: 'baby-shower',
    name: 'Baby Shower Packages',
    basePrice: 1800,
    guestRange: 'Up to 60 Guests',
    description: 'Charming baby shower setups with adorable themes and comfortable seating',
    image: '/images/ecpackagesofferings/package-offering-04.jpg',
    baseServices: ['venue-rental', 'event-setup', 'focal-point', 'backdrop', 'tables-chairs', 'speaker', 'welcome-sign'],
    recommendedServices: ['balloon-arch', 'centerpieces', 'photo-booth', 'gift-station'],
    color: 'bg-blue-500'
  },
  {
    id: 'kids-party',
    name: 'Kids Party Packages',
    basePrice: 2000,
    guestRange: 'Up to 60 Guests',
    description: 'Fun-filled kids party packages with entertainment and colorful decorations',
    image: '/images/ecpackagesofferings/package-offering-05.jpg',
    baseServices: ['venue-rental', 'event-setup', 'focal-point', 'backdrop', 'tables-chairs', 'speaker', 'treat-stand'],
    recommendedServices: ['bounce-house', 'photo-booth', 'balloon-arch', 'entertainment'],
    color: 'bg-yellow-500'
  },
  {
    id: 'intimate-dinner',
    name: 'Intimate Dinner Package',
    basePrice: 1300,
    guestRange: 'Up to 30 Seated Guests',
    description: 'Sophisticated intimate dining experience with elegant table settings',
    image: '/images/ecpackagesofferings/package-offering-06.jpg',
    baseServices: ['venue-rental', 'event-setup', 'focal-point', 'backdrop', 'tables-chairs', 'speaker', 'welcome-sign'],
    recommendedServices: ['bar-attendant', 'food-service', 'champagne-wall', 'uplighting'],
    color: 'bg-gray-700'
  },
  {
    id: 'wedding-reception',
    name: 'Wedding & Reception Packages',
    basePrice: 2500,
    guestRange: 'Up to 60 Guests',
    description: 'Complete wedding and reception packages with all the essentials',
    image: '/images/ecpackagesofferings/package-offering-07.jpg',
    baseServices: ['venue-rental', 'event-setup', 'focal-point', 'backdrop', 'tables-chairs', 'speaker', 'photo-board'],
    recommendedServices: ['champagne-wall', 'flower-bar', 'bar-attendant', 'food-service'],
    color: 'bg-rose-500'
  }
]

const allServices: PackageService[] = [
  // Base Services
  { id: 'venue-rental', name: '6 Hour Hall Rental', price: 0, description: 'Hall rental up to 11pm', icon: Calendar, category: 'Base', included: true },
  { id: 'event-setup', name: 'Event Setup & Breakdown', price: 0, description: 'Professional setup and cleanup', icon: Users, category: 'Base', included: true },
  { id: 'focal-point', name: 'Focal Point Setup', price: 0, description: 'Accent rug with balloon colors', icon: Star, category: 'Base', included: true },
  { id: 'backdrop', name: 'Pipe & Drape Backdrop', price: 0, description: 'Professional backdrop curtains', icon: Camera, category: 'Base', included: true },
  { id: 'tables-chairs', name: 'Tables & Chair Seating', price: 0, description: 'Round tables with chair seating', icon: Utensils, category: 'Base', included: true },
  { id: 'speaker', name: 'Bluetooth Speaker', price: 0, description: 'Sound system for your event', icon: Music, category: 'Base', included: true },
  
  // Decor & Lighting
  { id: 'uplighting', name: 'LED Uplighting Package', price: 150, description: 'Transform your space with LED uplighting', icon: Lightbulb, category: 'Lighting', included: false, popular: true },
  { id: 'centerpieces', name: 'Centerpiece Displays', price: 35, description: 'Beautiful table centerpieces', icon: Flower, category: 'Decor', included: false },
  { id: 'balloon-arch', name: 'Balloon Arch/Garland', price: 125, description: 'Custom balloon arrangements', icon: Sparkles, category: 'Decor', included: false },
  { id: 'welcome-sign', name: 'Custom Welcome Sign', price: 50, description: 'Personalized entry welcome sign', icon: Star, category: 'Decor', included: false },
  { id: 'photo-board', name: 'Custom Photo Board', price: 75, description: 'Personalized photo display board', icon: Camera, category: 'Decor', included: false },
  
  // Bar & Food Service
  { id: 'bar-setup', name: 'Portable Bar Setup', price: 200, description: 'Complete bar station with accessories', icon: Wine, category: 'Bar', included: false, popular: true },
  { id: 'bar-attendant', name: 'Bar Attendant', price: 150, description: 'Professional bartender service', icon: Users, category: 'Bar', included: false },
  { id: 'food-service', name: 'Food Service Coordination', price: 100, description: 'Catering coordination and service', icon: Utensils, category: 'Food', included: false },
  { id: 'champagne-wall', name: 'Champagne Wall', price: 200, description: 'Elegant champagne display wall', icon: Wine, category: 'Bar', included: false },
  
  // Entertainment & Extras
  { id: 'photo-booth', name: 'Photo Booth Setup', price: 300, description: 'Fun photo booth with props', icon: Camera, category: 'Entertainment', included: false, popular: true },
  { id: 'bounce-house', name: 'Bounce House', price: 250, description: 'Inflatable bounce house for kids', icon: Star, category: 'Entertainment', included: false },
  { id: 'entertainment', name: 'Entertainment Coordination', price: 200, description: 'DJ/MC or entertainment coordination', icon: Music, category: 'Entertainment', included: false },
  { id: 'flower-bar', name: 'Flower Bar', price: 300, description: 'Interactive flower arrangement station', icon: Flower, category: 'Entertainment', included: false },
  { id: 'gift-station', name: 'Gift Station Setup', price: 75, description: 'Dedicated gift display area', icon: Star, category: 'Decor', included: false },
  { id: 'treat-stand', name: 'Treat Stand', price: 50, description: 'Candy or dessert display stand', icon: Sparkles, category: 'Food', included: false },
  
  // Premium Linens & Extras
  { id: 'linens', name: 'Premium Table Linens', price: 12, description: 'High-quality table linens in various colors', icon: Star, category: 'Linens', included: false }
]

const categories = ['All', 'Base', 'Lighting', 'Decor', 'Bar', 'Food', 'Entertainment', 'Linens']

export default function InventoryShowcase() {
  const [selectedPackage, setSelectedPackage] = useState<EventPackage | null>(null)
  const [selectedServices, setSelectedServices] = useState<{[key: string]: number}>({})
  const [showPackageBuilder, setShowPackageBuilder] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All')
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showCustomerForm, setShowCustomerForm] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  })

  const selectPackage = (pkg: EventPackage) => {
    setSelectedPackage(pkg)
    
    // Initialize selected services with base services
    const initialServices: {[key: string]: number} = {}
    pkg.baseServices.forEach(serviceId => {
      initialServices[serviceId] = 1
    })
    setSelectedServices(initialServices)
    setShowPackageBuilder(true)
  }

  const updateServiceQuantity = (serviceId: string, quantity: number) => {
    setSelectedServices(prev => ({
      ...prev,
      [serviceId]: Math.max(0, quantity)
    }))
  }

  const calculateTotal = () => {
    if (!selectedPackage) return 0
    
    const servicesTotal = Object.entries(selectedServices).reduce((total, [serviceId, quantity]) => {
      const service = allServices.find(s => s.id === serviceId)
      return total + (service ? service.price * quantity : 0)
    }, 0)
    
    return selectedPackage.basePrice + servicesTotal
  }

  const getSelectedServicesCount = () => {
    return Object.values(selectedServices).reduce((total, quantity) => total + quantity, 0)
  }

  const handleGetQuote = () => {
    setShowCustomerForm(true)
  }

  const handleCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (customerInfo.name && customerInfo.email) {
      setShowCustomerForm(false)
      setShowPaymentModal(true)
    }
  }

  const handlePaymentSuccess = (paymentIntent: {
    id: string
    status: string
    amount: number
    demo?: boolean
  }) => {
    alert(`Payment successful! Payment ID: ${paymentIntent.id}`)
    // Here you would normally:
    // 1. Send confirmation email
    // 2. Create booking record
    // 3. Redirect to success page
  }

  const filteredServices = activeCategory === 'All' 
    ? allServices 
    : allServices.filter(service => service.category === activeCategory)

  if (showPackageBuilder && selectedPackage) {
    return (
      <div className="max-w-6xl mx-auto">
        {/* Package Builder Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">{selectedPackage.name}</h2>
              <p className="text-gray-600">{selectedPackage.description}</p>
              <p className="text-sm text-gray-500 mt-1">{selectedPackage.guestRange}</p>
            </div>
            <button
              onClick={() => setShowPackageBuilder(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              ← Back to Packages
            </button>
          </div>
          
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
            <div>
              <span className="text-2xl font-bold text-yellow-600">${calculateTotal()}</span>
              <span className="text-gray-600 ml-2">Total ({getSelectedServicesCount()} services)</span>
            </div>
            <button 
              onClick={handleGetQuote}
              className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition-colors"
            >
              Get Quote
            </button>
          </div>
        </div>

        {/* Service Categories */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeCategory === category
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredServices.map(service => {
            const isSelected = selectedServices[service.id] > 0
            const isBaseService = selectedPackage.baseServices.includes(service.id)
            const isRecommended = selectedPackage.recommendedServices.includes(service.id)
            const quantity = selectedServices[service.id] || 0
            
            return (
              <div 
                key={service.id} 
                className={`bg-white rounded-lg shadow-md p-4 border-2 transition-all ${
                  isSelected ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200'
                } ${isBaseService ? 'opacity-90' : ''}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <service.icon className="w-5 h-5 text-yellow-600" />
                    <h3 className="font-semibold text-sm">{service.name}</h3>
                  </div>
                  <div className="flex items-center space-x-1">
                    {service.popular && (
                      <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">Popular</span>
                    )}
                    {isRecommended && (
                      <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">Recommended</span>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-600 text-xs mb-3">{service.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="font-bold text-yellow-600">
                    {service.price === 0 ? 'Included' : `$${service.price}`}
                  </span>
                  
                  {isBaseService ? (
                    <span className="text-green-600 flex items-center text-sm">
                      <Check className="w-4 h-4 mr-1" />
                      Included
                    </span>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateServiceQuantity(service.id, quantity - 1)}
                        className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                        disabled={quantity === 0}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{quantity}</span>
                      <button
                        onClick={() => updateServiceQuantity(service.id, quantity + 1)}
                        className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center hover:bg-yellow-700 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Floating Cart Summary */}
        {getSelectedServicesCount() > 0 && (
          <div className="fixed bottom-6 left-6 bg-white p-4 rounded-lg shadow-lg border max-w-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="w-5 h-5 text-yellow-600" />
                <span className="font-semibold">{getSelectedServicesCount()} services</span>
              </div>
              <span className="font-bold text-yellow-600">${calculateTotal()}</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Base: ${selectedPackage.basePrice} + Add-ons: ${calculateTotal() - selectedPackage.basePrice}
            </p>
            <button
              onClick={handleGetQuote}
              className="w-full bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors"
            >
              Get Custom Quote
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Choose Your Event Package</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select a package that matches your event type, then customize it with additional services to create your perfect celebration.
        </p>
      </div>

      {/* Package Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventPackages.map(pkg => (
          <div key={pkg.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative">
              <img
                src={pkg.image}
                alt={pkg.name}
                className="w-full h-48 object-cover"
              />
              <div className={`absolute top-2 left-2 ${pkg.color} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                {pkg.guestRange}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{pkg.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-yellow-600">${pkg.basePrice}</span>
                <span className="text-sm text-gray-500">Starting price</span>
              </div>
              
              <button
                onClick={() => selectPackage(pkg)}
                className="w-full bg-yellow-600 text-white py-3 px-4 rounded-lg hover:bg-yellow-700 transition-colors font-medium"
              >
                Customize Package
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Customer Information Modal */}
      {showCustomerForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Your Information</h3>
            <form onSubmit={handleCustomerSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  placeholder="(555) 123-4567"
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCustomerForm(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  Continue to Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && selectedPackage && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          amount={calculateTotal()}
          packageName={selectedPackage.name}
          customerInfo={customerInfo}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  )
} 