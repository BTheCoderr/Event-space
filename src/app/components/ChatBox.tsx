'use client'

import { useState, useRef } from 'react'
import { Bot, User, X, Send } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  actionType?: 'quote' | 'booking' | 'contact'
}

// Enhanced business responses
const businessResponses = {
  pricing: {
    keywords: ['price', 'cost', 'rate', 'pricing', 'quote', 'how much', 'expensive', 'budget'],
    response: "I'd be happy to help with pricing! Our rates vary based on your event type, guest count, and date. Would you like me to connect you with our team for a personalized quote? I can also share our general pricing ranges:\n\n• Small events (up to 50 guests): Starting at $800\n• Medium events (50-100 guests): Starting at $1,200\n• Large events (100+ guests): Starting at $1,800\n\nWould you like a detailed quote sent to your email?",
    actionType: 'quote' as const
  },
  booking: {
    keywords: ['book', 'reserve', 'available', 'availability', 'schedule', 'confirm', 'secure'],
    response: "Great! I can help you check availability and start the booking process. To get started, I'll need:\n\n• Your preferred date\n• Event type (wedding, birthday, corporate, etc.)\n• Expected guest count\n• Your contact information\n\nWould you like me to connect you with our booking team to check availability for your date?",
    actionType: 'booking' as const
  },
  services: {
    keywords: ['services', 'what do you offer', 'include', 'amenities', 'features', 'facilities'],
    response: "Events On Charles offers comprehensive event services:\n\n🏛️ **Venue Features:**\n• Elegant historic building on Charles Street\n• Flexible space for 20-150 guests\n• Professional lighting & sound system\n• Bridal suite and prep areas\n\n🍽️ **Services Available:**\n• Full catering kitchen\n• Bar service coordination\n• Event planning assistance\n• Setup & cleanup\n• Parking coordination\n\nWould you like more details about any specific service?",
    actionType: 'contact' as const
  },
  catering: {
    keywords: ['food', 'catering', 'menu', 'bar', 'drinks', 'alcohol', 'kitchen'],
    response: "We have a full commercial kitchen and work with preferred caterers, though you're welcome to bring your own! Our catering options include:\n\n🍽️ **Catering Options:**\n• Preferred vendor list available\n• Full kitchen access for outside caterers\n• Bar service coordination\n• Dietary restriction accommodations\n\n🍷 **Bar Service:**\n• Full bar setup available\n• Wine & beer packages\n• Signature cocktail options\n• Professional bartender referrals\n\nWould you like our preferred vendor list sent to your email?",
    actionType: 'contact' as const
  },
  location: {
    keywords: ['location', 'address', 'where', 'parking', 'directions', 'charles street'],
    response: "We're located in the heart of Providence's historic district!\n\n📍 **Address:**\n593 Charles Street, Providence, RI 02904\n\n🚗 **Parking:**\n• Street parking available\n• Nearby parking garages\n• Valet service can be arranged\n\n🚌 **Transportation:**\n• Easy access from I-95\n• Public transportation nearby\n• 10 minutes from downtown Providence\n\nWould you like detailed directions or parking information?",
    actionType: 'contact' as const
  },
  contact: {
    keywords: ['contact', 'phone', 'email', 'hours', 'reach', 'call', 'speak'],
    response: "I'd be happy to connect you with our team!\n\n📞 **Contact Information:**\n• Phone: (401) 671-6758\n• Email: info@eventsoncharles.com\n\n🕐 **Business Hours:**\n• Monday-Friday: 9:00 AM - 6:00 PM\n• Saturday-Sunday: 10:00 AM - 4:00 PM\n\nWould you like me to have someone call you back, or would you prefer to schedule a venue tour?",
    actionType: 'contact' as const
  },
  tour: {
    keywords: ['tour', 'visit', 'see', 'view', 'walkthrough', 'show', 'look'],
    response: "A venue tour is the best way to experience Events On Charles! We offer:\n\n🏛️ **Tour Options:**\n• In-person guided tours\n• Virtual 360° tour (available on our website)\n• Private consultation tours\n• Group tours for wedding parties\n\n📅 **Scheduling:**\n• Tours available during business hours\n• Weekend tours by appointment\n• Usually takes 30-45 minutes\n\nWould you like to schedule a tour? I can connect you with our team to find a convenient time!",
    actionType: 'booking' as const
  }
}

export default function ChatBox() {
  const [isOpen, setIsOpen] = useState(false)
  const messageIdCounter = useRef(1)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      text: "Hi! I'm here to help with questions about Events On Charles. I can assist with pricing, availability, services, and booking information. What would you like to know?",
      sender: 'bot',
      timestamp: new Date(Date.now())
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const generateMessageId = () => {
    return (messageIdCounter.current++).toString()
  }

  const findBestResponse = (userInput: string) => {
    const input = userInput.toLowerCase()
    
    // Find the best matching response
    for (const [, response] of Object.entries(businessResponses)) {
      if (response.keywords && response.keywords.some(keyword => input.includes(keyword))) {
        return response
      }
    }
    
    // Default response for unmatched queries
    return {
      response: "I'd be happy to help! For specific questions about Events On Charles, you can:\n\n• Ask about pricing and packages\n• Check availability for your date\n• Learn about our services and amenities\n• Schedule a venue tour\n• Get contact information\n\nYou can also call us directly at (401) 671-6758 or email info@eventsoncharles.com. What specific information can I help you find?",
      actionType: 'contact' as const
    }
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: generateMessageId(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    const currentInput = inputMessage
    setInputMessage('')
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const response = findBestResponse(currentInput)
      
      // TODO: UPGRADE TO REAL AI
      // Replace findBestResponse with OpenAI API call:
      // const aiResponse = await fetch('/api/ai-chat', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ 
      //     message: currentInput,
      //     context: 'Events On Charles venue assistant'
      //   })
      // })
      // const response = await aiResponse.json()
      
      const botMessage: Message = {
        id: generateMessageId(),
        text: response.response,
        sender: 'bot',
        timestamp: new Date(),
        actionType: response.actionType
      }

      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)

      // Add follow-up action buttons if applicable
      if (response.actionType) {
        setTimeout(() => {
          const actionMessage: Message = {
            id: generateMessageId(),
            text: getActionButtons(response.actionType!),
            sender: 'bot',
            timestamp: new Date()
          }
          setMessages(prev => [...prev, actionMessage])
        }, 1000)
      }
    }, 1500)
  }

  const getActionButtons = (actionType: string) => {
    switch (actionType) {
      case 'quote':
        return "Would you like me to:\n\n🎯 Connect you with our team for a personalized quote\n📧 Send you our pricing guide via email\n📞 Have someone call you back\n\nJust let me know how you'd prefer to proceed!"
      case 'booking':
        return "Ready to move forward? I can:\n\n📅 Check availability for your date\n📋 Start your booking application\n🏛️ Schedule a venue tour\n📞 Connect you with our booking coordinator\n\nWhat would be most helpful?"
      case 'contact':
        return "How would you like to connect?\n\n📞 Request a callback\n📧 Send you detailed information via email\n🏛️ Schedule a venue tour\n💬 Continue chatting here\n\nI'm here to help however works best for you!"
      default:
        return "Is there anything else I can help you with today? I'm here to make your event planning as smooth as possible!"
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 right-6 w-16 h-16 bg-yellow-600 hover:bg-yellow-700 text-white rounded-full shadow-lg z-40 flex items-center justify-center transition-all duration-300 hover:scale-110"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-yellow-600 text-white rounded-t-lg">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5" />
              <span className="font-semibold">Events On Charles Support</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <div className="flex items-start space-x-2">
                    {message.sender === 'bot' && <Bot className="w-4 h-4 mt-1 flex-shrink-0" />}
                    {message.sender === 'user' && <User className="w-4 h-4 mt-1 flex-shrink-0" />}
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg max-w-[85%]">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-4 h-4" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about pricing, availability, or services..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 