'use client'

import { useState } from 'react'
import { MapPin, Users, Star, Phone, Mail, Menu, X } from 'lucide-react'
import ChatBox from './components/ChatBox'
import AvailabilityCalendar from './components/AvailabilityCalendar'
import VirtualTour from './components/VirtualTour'
import InventoryShowcase from './components/InventoryShowcase'
import ContactForm from './components/ContactForm'
import EventGallery from './components/EventGallery'
import OwnerInfo from './components/OwnerInfo'

import ScrollIndicator from './components/ScrollIndicator'
import ScrollToTop from './components/ScrollToTop'

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ScrollIndicator />
      {/* Navigation */}
      <nav className="fixed top-0 w-full frosted-glass z-50 shadow-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shine-effect">
                <span className="text-black font-bold text-lg">EC</span>
              </div>
              <span className="text-xl font-bold gradient-text-gold">Events On Charles</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-yellow-600 transition-colors">Home</a>
              <a href="#gallery" className="text-gray-700 hover:text-yellow-600 transition-colors">Gallery</a>
              <a href="#spaces" className="text-gray-700 hover:text-yellow-600 transition-colors">Spaces</a>
              <a href="#inventory" className="text-gray-700 hover:text-yellow-600 transition-colors">Inventory</a>
              <a href="#availability" className="text-gray-700 hover:text-yellow-600 transition-colors">Availability</a>
              <a href="#contact" className="text-gray-700 hover:text-yellow-600 transition-colors">Contact</a>
              <button 
                onClick={() => window.location.href = '/booking'}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Book Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-gray-700 hover:text-yellow-600 transition-colors p-2"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200/20">
              <div className="flex flex-col space-y-4 pt-4">
                <a 
                  href="#home" 
                  className="text-gray-700 hover:text-yellow-600 transition-colors py-2"
                  onClick={closeMobileMenu}
                >
                  Home
                </a>
                <a 
                  href="#gallery" 
                  className="text-gray-700 hover:text-yellow-600 transition-colors py-2"
                  onClick={closeMobileMenu}
                >
                  Gallery
                </a>
                <a 
                  href="#spaces" 
                  className="text-gray-700 hover:text-yellow-600 transition-colors py-2"
                  onClick={closeMobileMenu}
                >
                  Spaces
                </a>
                <a 
                  href="#inventory" 
                  className="text-gray-700 hover:text-yellow-600 transition-colors py-2"
                  onClick={closeMobileMenu}
                >
                  Inventory
                </a>
                <a 
                  href="#availability" 
                  className="text-gray-700 hover:text-yellow-600 transition-colors py-2"
                  onClick={closeMobileMenu}
                >
                  Availability
                </a>
                <a 
                  href="#contact" 
                  className="text-gray-700 hover:text-yellow-600 transition-colors py-2"
                  onClick={closeMobileMenu}
                >
                  Contact
                </a>
                <button 
                  onClick={() => {
                    window.location.href = '/booking'
                    closeMobileMenu()
                  }}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors w-full mt-2"
                >
                  Book Now
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-br from-gray-900 via-gray-800 to-yellow-900 relative min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 relative z-10 pt-24">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Events On Charles
            </h1>
            <div className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              Professional event venue in historic Providence, Rhode Island. Specializing in weddings, corporate events, and celebrations with exceptional service and attention to detail.
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button 
                onClick={() => window.location.href = '/booking'}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-12 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg"
              >
                Book Your Event
              </button>
              <button 
                onClick={() => window.open('https://discover.matterport.com/space/5Jbu5a8n85j', '_blank')}
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-12 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg"
              >
                Virtual Tour
              </button>
              <button 
                onClick={() => document.getElementById('availability')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white px-12 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg"
              >
                View Availability
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Why Choose Events On Charles?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <MapPin className="w-8 h-8" />,
                title: "Charles Street Location",
                description: "Conveniently located on historic Charles Street in Providence, RI with elegant surroundings and easy accessibility."
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Intimate & Grand Events",
                description: "Perfect for both intimate celebrations and larger gatherings, with flexible space configurations."
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: "White-Glove Service",
                description: "Our experienced team provides personalized attention to make your event truly exceptional."
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-yellow-600 mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Gallery */}
      <section id="gallery" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Past Events Gallery</h2>
          <EventGallery />
        </div>
      </section>

      {/* Virtual Tour */}
      <section id="spaces" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Virtual Tour</h2>
          <VirtualTour />
        </div>
      </section>

      {/* Inventory Showcase */}
      <section id="inventory" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Rental Inventory</h2>
          <InventoryShowcase />
        </div>
      </section>

      {/* Availability Calendar */}
      <section id="availability" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Check Availability</h2>
          <AvailabilityCalendar />
        </div>
      </section>

      {/* Owner Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Meet Our Team</h2>
          <OwnerInfo />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Get In Touch</h2>
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold">EC</span>
                </div>
                <span className="text-lg font-bold">Events On Charles</span>
              </div>
              <p className="text-gray-400">Where your most treasured moments come to life on historic Charles Street in Providence, Rhode Island.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#gallery" className="hover:text-white transition-colors">Gallery</a></li>
                <li><a href="#spaces" className="hover:text-white transition-colors">Virtual Tour</a></li>
                <li><a href="#inventory" className="hover:text-white transition-colors">Inventory</a></li>
                <li><a href="#availability" className="hover:text-white transition-colors">Availability</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Wedding Venues</li>
                <li>Corporate Events</li>
                <li>Birthday Parties</li>
                <li>Conference Rooms</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>(401) 671-6758</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>info@eventsoncharles.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>593 Charles Street, Providence, RI 02904</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Events On Charles. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Chat Box */}
      <ChatBox />

      {/* Professional Quick Actions */}
      <div className="fixed left-6 bottom-6 flex flex-col space-y-3 z-30">
        <button
          onClick={() => window.location.href = '/booking'}
          className="bg-yellow-600 text-white w-14 h-14 rounded-lg flex items-center justify-center shadow-lg hover:bg-yellow-700 transition-colors"
          title="Book Event"
        >
          <Phone className="w-5 h-5" />
        </button>
        <button
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-gray-800 text-white w-14 h-14 rounded-lg flex items-center justify-center shadow-lg hover:bg-gray-700 transition-colors"
          title="Contact Us"
        >
          <Mail className="w-5 h-5" />
        </button>
      </div>
      
      <ScrollToTop />
    </div>
  )
}
