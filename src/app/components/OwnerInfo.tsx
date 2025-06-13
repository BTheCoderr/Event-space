'use client'

import { Award, Users, Calendar, Star } from 'lucide-react'

const companyStats = [
  { icon: <Calendar className="w-8 h-8" />, number: '15+', label: 'Years Experience' },
  { icon: <Users className="w-8 h-8" />, number: '500+', label: 'Events Hosted' },
  { icon: <Star className="w-8 h-8" />, number: '5.0', label: 'Google Rating' },
  { icon: <Award className="w-8 h-8" />, number: '100+', label: 'Happy Clients' }
]

const teamMembers = [
  {
    name: 'Dr. Ivory T. Jefferies-Carto',
    role: 'Owner and Lead Designer',
    bio: 'Dr. Jefferies-Carto brings over 15 years of experience in event design and venue management. Her vision and dedication have made Events On Charles a premier destination for elegant celebrations in Providence. With a doctorate in business and a passion for creating unforgettable experiences, she personally oversees every event to ensure perfection.',
    image: '/images/dr-ivory-jefferies-carto.jpg',
    specialties: ['Event Design & Planning', 'Venue Management', 'Client Relations', 'Business Development', 'Team Leadership']
  }
]

export default function OwnerInfo() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Company Story */}
      <div className="text-center mb-16">
        <h3 className="text-3xl font-bold mb-6">Our Story</h3>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Events On Charles has been creating magical moments on historic Charles Street 
          in Providence, Rhode Island since 2009. Founded by Dr. Ivory T. Jefferies-Carto, 
          our elegant venue combines timeless charm with modern amenities, providing the 
          perfect backdrop for weddings, corporate events, and life&apos;s most precious 
          celebrations. Located in the heart of Providence, we&apos;ve become the preferred 
          choice for those seeking sophistication and excellence.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {companyStats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="text-yellow-600">{stat.icon}</div>
            </div>
            <div className="text-3xl font-bold text-yellow-600 mb-2">{stat.number}</div>
            <div className="text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Owner Profile */}
      <div className="mb-16">
        <h3 className="text-3xl font-bold text-center mb-12">Meet Our Owner</h3>
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              <div className="flex-shrink-0">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-48 h-48 rounded-lg object-cover shadow-lg"
                />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div>
                  <h4 className="text-2xl font-bold mb-2">{member.name}</h4>
                  <p className="text-yellow-600 font-medium text-lg mb-4">{member.role}</p>
                  <p className="text-gray-600 leading-relaxed mb-6">{member.bio}</p>
                </div>
                
                <div className="bg-yellow-50 rounded-lg p-6">
                  <div>
                    <h5 className="font-semibold mb-3">Specialties:</h5>
                  <ul className="space-y-2">
                    {member.specialties.map((specialty, specialtyIndex) => (
                      <li key={specialtyIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                        <span className="text-gray-700">{specialty}</span>
                      </li>
                    ))}
                  </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mission and Values */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h4 className="text-xl font-bold mb-4">Our Mission</h4>
          <p className="text-gray-600 leading-relaxed">
            To provide exceptional event venues and unparalleled service that transform 
            your special occasions into unforgettable memories. We believe every event 
            deserves the perfect setting, and we&apos;re dedicated to making that vision a reality 
            in the heart of historic Providence.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h4 className="text-xl font-bold mb-4">Our Values</h4>
          <ul className="space-y-3">
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
              <span className="text-gray-700">Excellence in every detail</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
              <span className="text-gray-700">Personalized service and attention</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
              <span className="text-gray-700">Creating lasting memories</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
              <span className="text-gray-700">Integrity and transparency</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Awards & Recognition */}
      <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-lg p-8 text-white text-center">
        <h4 className="text-2xl font-bold mb-6">Awards & Recognition</h4>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="text-3xl mb-2">🏆</div>
            <h5 className="font-semibold mb-2">Top Event Venue 2024</h5>
            <p className="text-sm opacity-90">Providence Business Awards</p>
          </div>
          <div>
            <div className="text-3xl mb-2">⭐</div>
            <h5 className="font-semibold mb-2">5.0 Star Rating</h5>
            <p className="text-sm opacity-90">Google Reviews & Testimonials</p>
          </div>
          <div>
            <div className="text-3xl mb-2">💍</div>
            <h5 className="font-semibold mb-2">Premier Wedding Venue</h5>
            <p className="text-sm opacity-90">Rhode Island Couples&apos; Choice</p>
          </div>
        </div>
      </div>
    </div>
  )
} 