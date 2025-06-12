'use client'

import { Award, Heart, Users, Star } from 'lucide-react'

const teamMembers = [
  {
    name: 'Sarah Johnson',
    role: 'Founder & Event Director',
    bio: 'With over 15 years in event planning, Sarah brings creativity and precision to every celebration.',
    image: 'https://picsum.photos/300/300?random=22',
    specialties: ['Wedding Planning', 'Corporate Events', 'Venue Design'],
    contact: 'sarah@eliteeventspaces.com'
  },
  {
    name: 'Michael Chen',
    role: 'Operations Manager',
    bio: 'Michael ensures every detail runs smoothly, from setup to cleanup, with military precision.',
    image: 'https://picsum.photos/300/300?random=23',
    specialties: ['Event Logistics', 'Vendor Coordination', 'Timeline Management'],
    contact: 'michael@eliteeventspaces.com'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Creative Director',
    bio: 'Emily transforms visions into reality with her artistic eye and innovative design solutions.',
    image: 'https://picsum.photos/300/300?random=24',
    specialties: ['Interior Design', 'Floral Arrangements', 'Lighting Design'],
    contact: 'emily@eliteeventspaces.com'
  }
]

const companyStats = [
  { number: '1000+', label: 'Events Hosted', icon: <Heart className="w-6 h-6" /> },
  { number: '15+', label: 'Years Experience', icon: <Award className="w-6 h-6" /> },
  { number: '50,000+', label: 'Happy Guests', icon: <Users className="w-6 h-6" /> },
  { number: '4.9/5', label: 'Average Rating', icon: <Star className="w-6 h-6" /> }
]

export default function OwnerInfo() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Company Story */}
      <div className="text-center mb-16">
        <h3 className="text-3xl font-bold mb-6">Our Story</h3>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Founded in 2009, Elite Event Spaces began as a dream to create extraordinary venues 
          where life's most precious moments unfold. What started as a single event hall has 
          grown into a premier destination for weddings, corporate events, and celebrations 
          of all kinds. Our commitment to excellence and personal touch has made us the 
          preferred choice for thousands of satisfied clients.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {companyStats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="text-purple-600">{stat.icon}</div>
            </div>
            <div className="text-3xl font-bold text-purple-600 mb-2">{stat.number}</div>
            <div className="text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Team Members */}
      <div className="space-y-12">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className={`flex flex-col lg:flex-row items-center gap-8 ${
              index % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            <div className="lg:w-1/3">
              <img
                src={member.image}
                alt={member.name}
                className="w-full max-w-sm mx-auto rounded-lg shadow-lg"
              />
            </div>
            
            <div className="lg:w-2/3 space-y-6">
              <div>
                <h4 className="text-2xl font-bold mb-2">{member.name}</h4>
                <p className="text-purple-600 font-medium text-lg mb-4">{member.role}</p>
                <p className="text-gray-600 leading-relaxed">{member.bio}</p>
              </div>
              
                              <div className="bg-purple-50 rounded-lg p-6">
                  <div>
                    <h5 className="font-semibold mb-3">Specialties:</h5>
                  <ul className="space-y-2">
                    {member.specialties.map((specialty, specialtyIndex) => (
                      <li key={specialtyIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                        <span className="text-gray-700">{specialty}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mission & Values */}
      <div className="mt-16 grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h4 className="text-xl font-bold mb-4">Our Mission</h4>
          <p className="text-gray-600 leading-relaxed">
            To provide exceptional event venues and unparalleled service that transform 
            your special occasions into unforgettable memories. We believe every event 
            deserves the perfect setting, and we're dedicated to making that vision a reality.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h4 className="text-xl font-bold mb-4">Our Values</h4>
          <ul className="space-y-3">
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              <span className="text-gray-700">Excellence in every detail</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              <span className="text-gray-700">Personalized service and attention</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              <span className="text-gray-700">Creating lasting memories</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              <span className="text-gray-700">Integrity and transparency</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Awards & Recognition */}
      <div className="mt-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 text-white text-center">
        <h4 className="text-2xl font-bold mb-6">Awards & Recognition</h4>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="text-3xl mb-2">🏆</div>
            <h5 className="font-semibold mb-2">Best Event Venue 2023</h5>
            <p className="text-sm opacity-90">City Business Awards</p>
          </div>
          <div>
            <div className="text-3xl mb-2">⭐</div>
            <h5 className="font-semibold mb-2">5-Star Rating</h5>
            <p className="text-sm opacity-90">Google Reviews & Yelp</p>
          </div>
          <div>
            <div className="text-3xl mb-2">💍</div>
            <h5 className="font-semibold mb-2">Top Wedding Venue</h5>
            <p className="text-sm opacity-90">Wedding Wire Couples' Choice</p>
          </div>
        </div>
      </div>
    </div>
  )
} 