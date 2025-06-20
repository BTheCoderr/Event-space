// Events On Charles - Main Landing Page - Updated with Analytics & Speed Insights
'use client'

import { useState, useEffect } from 'react'
import { Calendar, MapPin, Phone, Mail, Clock, Users, Star, ChevronDown, ChevronUp, Menu, X } from 'lucide-react'
import ParticleBackground from './components/ParticleBackground'
import EventGallery from './components/EventGallery'
import InventoryShowcase from './components/InventoryShowcase'
import VirtualTour from './components/VirtualTour'
import OwnerInfo from './components/OwnerInfo'
import ContactForm from './components/ContactForm'
import ScrollToTop from './components/ScrollToTop'
import ScrollIndicator from './components/ScrollIndicator'
import ChatBox from './components/ChatBox'
import AvailabilityCalendar from './components/AvailabilityCalendar'

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
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 shadow-lg border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-black font-bold text-xl">EC</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-gray-800">Events On Charles</span>
                <div className="text-xs text-yellow-600 font-medium">Professional Event Venue</div>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              <a href="#home" className="px-4 py-2 text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-all font-medium">Home</a>
              <a href="#gallery" className="px-4 py-2 text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-all font-medium">Gallery</a>
              <a href="#spaces" className="px-4 py-2 text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-all font-medium">Spaces</a>
              <a href="#inventory" className="px-4 py-2 text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-all font-medium">Inventory</a>
              <a href="#availability" className="px-4 py-2 text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-all font-medium">Availability</a>
              <a href="#contact" className="px-4 py-2 text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-all font-medium">Contact</a>
              <button 
                onClick={() => window.location.href = '/booking'}
                className="ml-4 bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
              >
                Book Event
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition-colors p-2 rounded-lg"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
              <div className="flex flex-col space-y-2 pt-4">
                <a 
                  href="#home" 
                  className="text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 transition-colors py-3 px-4 rounded-lg font-medium"
                  onClick={closeMobileMenu}
                >
                  Home
                </a>
                <a 
                  href="#gallery" 
                  className="text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 transition-colors py-3 px-4 rounded-lg font-medium"
                  onClick={closeMobileMenu}
                >
                  Gallery
                </a>
                <a 
                  href="#spaces" 
                  className="text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 transition-colors py-3 px-4 rounded-lg font-medium"
                  onClick={closeMobileMenu}
                >
                  Spaces
                </a>
                <a 
                  href="#inventory" 
                  className="text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 transition-colors py-3 px-4 rounded-lg font-medium"
                  onClick={closeMobileMenu}
                >
                  Inventory
                </a>
                <a 
                  href="#availability" 
                  className="text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 transition-colors py-3 px-4 rounded-lg font-medium"
                  onClick={closeMobileMenu}
                >
                  Availability
                </a>
                <a 
                  href="#contact" 
                  className="text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 transition-colors py-3 px-4 rounded-lg font-medium"
                  onClick={closeMobileMenu}
                >
                  Contact
                </a>
                <button 
                  onClick={() => {
                    window.location.href = '/booking'
                    closeMobileMenu()
                  }}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors w-full mt-4 shadow-md"
                >
                  Book Event
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section - Inspired by upscale venue sites */}
      <section id="home" className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-yellow-50">
        {/* Elegant Pattern Overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23eab308' fill-opacity='0.08'%3E%3Cpath d='M40 40c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm20 0c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="container mx-auto px-4 relative z-10 pt-32 pb-16">
          <div className="max-w-7xl mx-auto">
            {/* Main Hero Content */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              {/* Left Column - Content */}
              <div className="text-left">
                <div className="inline-flex items-center bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold mb-8 shadow-sm">
                  <MapPin className="w-4 h-4 mr-2" />
                  Historic Charles Street, Providence, RI
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                  Events On
                  <span className="block text-yellow-600 italic">Charles</span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-gray-600 mb-10 leading-relaxed">
                  Where timeless elegance meets modern sophistication. Our distinguished venue provides the perfect setting for life's most cherished celebrations.
                </p>
                
                {/* Primary CTA */}
                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <button 
                    onClick={() => window.location.href = '/booking'}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
                  >
                    <Users className="w-5 h-5 mr-2" />
                    Start Your Booking
                  </button>
                  <button 
                    onClick={() => window.open('https://discover.matterport.com/space/5Jbu5a8n85j', '_blank')}
                    className="border-2 border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Virtual Tour
                  </button>
                </div>
                
                {/* Trust Indicators */}
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-1" />
                    <span className="font-medium">500+ Events</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-yellow-500 mr-1" />
                    <span className="font-medium">Up to 200 Guests</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-yellow-500 mr-1" />
                    <span className="font-medium">Historic Location</span>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Visual Elements */}
              <div className="relative">
                {/* Feature Cards - Venue Style */}
                <div className="grid grid-cols-1 gap-6">
                  <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 transform rotate-1 hover:rotate-0 transition-transform">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                        <Users className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">Flexible Layouts</h3>
                        <p className="text-gray-600 text-sm">Ceremony, Reception & Dancing</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 transform -rotate-1 hover:rotate-0 transition-transform ml-8">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                        <Star className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">Premium Service</h3>
                        <p className="text-gray-600 text-sm">Full Event Coordination</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 transform rotate-2 hover:rotate-0 transition-transform">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                        <MapPin className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">Historic Charm</h3>
                        <p className="text-gray-600 text-sm">Charles Street Heritage</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Why Choose Events On Charles?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Experience the difference of working with Providence's premier event venue</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <MapPin className="w-10 h-10" />,
                title: "Prime Location",
                description: "Situated on historic Charles Street in the heart of Providence, offering both charm and convenience for you and your guests."
              },
              {
                icon: <Users className="w-10 h-10" />,
                title: "Flexible Capacity",
                description: "From intimate gatherings of 20 to grand celebrations of 200, our versatile space adapts to your vision."
              },
              {
                icon: <Star className="w-10 h-10" />,
                title: "Full-Service Excellence",
                description: "Our dedicated team handles every detail, from setup to cleanup, ensuring your event exceeds expectations."
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-yellow-200"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 text-yellow-600 rounded-2xl mb-6 group-hover:bg-yellow-600 group-hover:text-white transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
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
                  <span>support@eventsoncharles.com</span>
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
          className="bg-yellow-600 text-white w-14 h-14 rounded-xl flex items-center justify-center shadow-lg hover:bg-yellow-700 transition-all hover:shadow-xl transform hover:-translate-y-1"
          title="Book Event"
        >
          <Phone className="w-5 h-5" />
        </button>
        <button
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-white text-yellow-600 border-2 border-yellow-600 w-14 h-14 rounded-xl flex items-center justify-center shadow-lg hover:bg-yellow-600 hover:text-white transition-all hover:shadow-xl transform hover:-translate-y-1"
          title="Contact Us"
        >
          <Mail className="w-5 h-5" />
        </button>
      </div>
      
      <ScrollToTop />
    </div>
  )
}
