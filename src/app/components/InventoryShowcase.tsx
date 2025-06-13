'use client'

import { useState } from 'react'
import { ShoppingCart, Plus, Minus, CreditCard } from 'lucide-react'

interface InventoryItem {
  id: string
  name: string
  price: number
  category: string
  image: string
  description: string
  available: number
  minRental: number
}

const inventory: InventoryItem[] = [
  {
    id: 'round-table',
    name: 'Round Tables (8-10 seats)',
    price: 15,
    category: 'Tables',
    image: '/images/ecpackagesofferings/package-offering-01.jpg',
    description: 'Elegant round tables perfect for dining and conversations',
    available: 50,
    minRental: 1
  },
  {
    id: 'chiavari-chairs',
    name: 'Chiavari Chairs',
    price: 8,
    category: 'Seating',
    image: '/images/ecpackagesofferings/package-offering-02.jpg',
    description: 'Classic elegant chairs available in gold, silver, and natural wood',
    available: 300,
    minRental: 10
  },
  {
    id: 'linens',
    name: 'Premium Table Linens',
    price: 12,
    category: 'Linens',
    image: '/images/ecpackagesofferings/package-offering-03.jpg',
    description: 'High-quality linens in various colors and sizes',
    available: 100,
    minRental: 1
  },
  {
    id: 'centerpieces',
    name: 'Floral Centerpieces',
    price: 35,
    category: 'Decor',
    image: '/images/ecpackagesofferings/package-offering-04.jpg',
    description: 'Beautiful fresh floral arrangements for tables',
    available: 30,
    minRental: 1
  },
  {
    id: 'lighting',
    name: 'Uplighting Package',
    price: 150,
    category: 'Lighting',
    image: '/images/ecpackagesofferings/package-offering-05.jpg',
    description: 'LED uplighting to transform your space ambiance',
    available: 10,
    minRental: 1
  },
  {
    id: 'bar-setup',
    name: 'Portable Bar Setup',
    price: 200,
    category: 'Bar',
    image: '/images/ecpackagesofferings/package-offering-06.jpg',
    description: 'Complete bar station with stools and accessories',
    available: 5,
    minRental: 1
  },
  {
    id: 'additional-services',
    name: 'Additional Event Services',
    price: 75,
    category: 'Services',
    image: '/images/ecpackagesofferings/package-offering-07.jpg',
    description: 'Custom event coordination and additional venue services',
    available: 20,
    minRental: 1
  }
]

const categories = ['All', 'Tables', 'Seating', 'Linens', 'Decor', 'Lighting', 'Bar', 'Services']

export default function InventoryShowcase() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [cart, setCart] = useState<{[key: string]: number}>({})
  const [showCheckout, setShowCheckout] = useState(false)

  const filteredInventory = selectedCategory === 'All' 
    ? inventory 
    : inventory.filter(item => item.category === selectedCategory)

  const addToCart = (itemId: string, quantity: number = 1) => {
    setCart(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + quantity
    }))
  }

  const removeFromCart = (itemId: string, quantity: number = 1) => {
    setCart(prev => {
      const newQuantity = (prev[itemId] || 0) - quantity
      if (newQuantity <= 0) {
        const newCart = { ...prev }
        delete newCart[itemId]
        return newCart
      }
      return { ...prev, [itemId]: newQuantity }
    })
  }

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [itemId, quantity]) => {
      const item = inventory.find(i => i.id === itemId)
      return total + (item ? item.price * quantity : 0)
    }, 0)
  }

  const getCartItemCount = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0)
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === category
                ? 'bg-yellow-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Inventory Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {filteredInventory.map(item => (
          <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <span className="text-yellow-600 font-bold">${item.price}</span>
              </div>
              <p className="text-gray-600 text-sm mb-3">{item.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                <span>Available: {item.available}</span>
                <span>Min: {item.minRental}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                    disabled={!cart[item.id]}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-medium">
                    {cart[item.id] || 0}
                  </span>
                  <button
                    onClick={() => addToCart(item.id)}
                    className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center hover:bg-yellow-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  ${(cart[item.id] || 0) * item.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      {getCartItemCount() > 0 && (
        <div className="fixed bottom-6 right-6 bg-white p-4 rounded-lg shadow-lg border">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="w-5 h-5 text-yellow-600" />
              <span className="font-semibold">{getCartItemCount()} items</span>
            </div>
            <span className="font-bold text-yellow-600">${getCartTotal()}</span>
          </div>
          <button
            onClick={() => setShowCheckout(true)}
            className="w-full bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors"
          >
            Checkout
          </button>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-96 overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">Rental Summary</h3>
            
            <div className="space-y-3 mb-4">
              {Object.entries(cart).map(([itemId, quantity]) => {
                const item = inventory.find(i => i.id === itemId)
                if (!item) return null
                
                return (
                  <div key={itemId} className="flex justify-between items-center">
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <div className="text-sm text-gray-600">
                        {quantity} × ${item.price}
                      </div>
                    </div>
                    <span className="font-semibold">${quantity * item.price}</span>
                  </div>
                )
              })}
            </div>
            
            <div className="border-t pt-3 mb-4">
              <div className="flex justify-between items-center font-bold text-lg">
                <span>Total:</span>
                <span className="text-yellow-600">${getCartTotal()}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <button className="w-full bg-yellow-600 text-white py-3 px-4 rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center space-x-2">
                <CreditCard className="w-4 h-4" />
                <span>Pay Now</span>
              </button>
              <button
                onClick={() => setShowCheckout(false)}
                className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 