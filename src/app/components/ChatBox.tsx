'use client'

import { useState } from 'react'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'bot' | 'user'
  timestamp: Date
}

const faqs = [
  {
    question: "What are your venue rental rates?",
    answer: "Our rates vary based on the space, duration, and services needed. Main hall starts at $500/day, conference rooms at $200/day. Contact us for a detailed quote!"
  },
  {
    question: "What's included in the rental?",
    answer: "All rentals include basic lighting, sound system, tables, chairs, kitchen access, parking, and setup/cleanup assistance."
  },
  {
    question: "Can I bring my own catering?",
    answer: "Yes! You can bring your own catering or choose from our list of preferred caterers. Outside catering requires a $50 kitchen cleaning fee."
  },
  {
    question: "How far in advance should I book?",
    answer: "We recommend booking 2-3 months in advance for popular dates. Weekend bookings fill up quickly, especially during wedding season."
  },
  {
    question: "What's your cancellation policy?",
    answer: "Cancellations 30+ days: full refund minus $100 processing fee. 15-29 days: 50% refund. Less than 15 days: no refund but can reschedule once."
  }
]

export default function ChatBox() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm here to help answer questions about our event spaces. What would you like to know?",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')

    // Simple FAQ matching
    const matchedFaq = faqs.find(faq => 
      inputMessage.toLowerCase().includes(faq.question.toLowerCase().split(' ')[0]) ||
      inputMessage.toLowerCase().includes('rate') && faq.question.includes('rate') ||
      inputMessage.toLowerCase().includes('price') && faq.question.includes('rate') ||
      inputMessage.toLowerCase().includes('cost') && faq.question.includes('rate') ||
      inputMessage.toLowerCase().includes('cancel') && faq.question.includes('cancel') ||
      inputMessage.toLowerCase().includes('food') && faq.question.includes('catering') ||
      inputMessage.toLowerCase().includes('catering') && faq.question.includes('catering') ||
      inputMessage.toLowerCase().includes('book') && faq.question.includes('advance') ||
      inputMessage.toLowerCase().includes('include') && faq.question.includes('included')
    )

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: matchedFaq ? matchedFaq.answer : "Thanks for your question! One of our team members will get back to you shortly. For immediate assistance, please call (555) 123-4567.",
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
    }, 1000)
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-16 h-16 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-all z-50 pulse-glow ${isOpen ? 'hidden' : 'flex'} items-center justify-center`}
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-96 bg-white rounded-lg shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-purple-600 text-white rounded-t-lg">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5" />
              <span className="font-semibold">Elite Events Support</span>
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
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <div className="flex items-start space-x-2">
                    {message.sender === 'bot' && <Bot className="w-4 h-4 mt-1 flex-shrink-0" />}
                    {message.sender === 'user' && <User className="w-4 h-4 mt-1 flex-shrink-0" />}
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about pricing, availability, or services..."
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm"
              />
              <button
                onClick={handleSendMessage}
                className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors"
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