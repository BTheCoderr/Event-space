'use client'

import { useState } from 'react'
import { FileText, Download, Check, AlertTriangle } from 'lucide-react'

interface ContractData {
  clientName: string
  eventDate: string
  eventType: string
  guestCount: number
  duration: string
  totalCost: number
  deposit: number
  specialRequests: string
}

const venueRules = [
  {
    category: 'General Rules',
    rules: [
      'No smoking inside the venue premises',
      'Alcohol service must end 30 minutes before event conclusion',
      'Maximum occupancy limits must be strictly observed',
      'All decorations must be fire-safe and pre-approved',
      'Music volume must not exceed 85 decibels after 10 PM'
    ]
  },
  {
    category: 'Setup & Cleanup',
    rules: [
      'Venue access begins 2 hours before event start time',
      'All personal items must be removed by midnight',
      'Cleanup includes removing all decorations and personal belongings',
      'Vendor coordination must be arranged 48 hours in advance',
      'Any damages will be assessed and charged separately'
    ]
  },
  {
    category: 'Catering & Service',
    rules: [
      'Outside catering requires pre-approval and insurance',
      'Kitchen facilities are available with additional fee',
      'All vendors must provide proof of insurance',
      'Food service must comply with local health regulations',
      'Bar service requires certified bartender'
    ]
  },
  {
    category: 'Security & Safety',
    rules: [
      'Emergency exits must remain clear at all times',
      'Fire extinguishers and safety equipment cannot be moved',
      'Security may be required for events over 100 guests',
      'Client is responsible for guest behavior and actions',
      'Venue reserves right to end event for safety violations'
    ]
  }
]

export default function RentalContract() {
  const [contractData, setContractData] = useState<ContractData>({
    clientName: '',
    eventDate: '',
    eventType: '',
    guestCount: 0,
    duration: '',
    totalCost: 0,
    deposit: 0,
    specialRequests: ''
  })
  
  const [isRulesAccepted, setIsRulesAccepted] = useState(false)
  const [isContractSigned, setIsContractSigned] = useState(false)
  const [activeRuleCategory, setActiveRuleCategory] = useState('General Rules')
  const [showContract, setShowContract] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setContractData(prev => ({
      ...prev,
      [name]: name === 'guestCount' || name === 'totalCost' || name === 'deposit' 
        ? Number(value) 
        : value
    }))
  }

  const generateContract = () => {
    setShowContract(true)
  }

  const signContract = () => {
    setIsContractSigned(true)
    alert('Contract signed successfully! You will receive a copy via email within 5 minutes.')
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Venue Rules */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 border-b">
            <h3 className="text-xl font-semibold flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-amber-600" />
              Venue Rules & Policies
            </h3>
            <p className="text-gray-600 mt-2">
              Please review all venue rules before completing your rental agreement.
            </p>
          </div>
          
          <div className="flex border-b">
            {venueRules.map((category) => (
              <button
                key={category.category}
                onClick={() => setActiveRuleCategory(category.category)}
                className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                  activeRuleCategory === category.category
                    ? 'bg-purple-50 text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {category.category}
              </button>
            ))}
          </div>
          
          <div className="p-6">
            <h4 className="font-semibold mb-4">{activeRuleCategory}</h4>
            <ul className="space-y-3">
              {venueRules
                .find(cat => cat.category === activeRuleCategory)
                ?.rules.map((rule, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 text-sm">{rule}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="p-6 border-t bg-gray-50">
            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={isRulesAccepted}
                onChange={(e) => setIsRulesAccepted(e.target.checked)}
                className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-600"
              />
              <span className="text-sm text-gray-700">
                I have read, understood, and agree to comply with all venue rules and policies listed above.
              </span>
            </label>
          </div>
        </div>

        {/* Contract Form */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 border-b">
            <h3 className="text-xl font-semibold flex items-center">
              <FileText className="w-5 h-5 mr-2 text-purple-600" />
              Rental Contract
            </h3>
            <p className="text-gray-600 mt-2">
              Complete the form below to generate your rental agreement.
            </p>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="clientName" className="block text-sm font-medium mb-2">
                  Client Name *
                </label>
                <input
                  type="text"
                  id="clientName"
                  name="clientName"
                  value={contractData.clientName}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Full name"
                />
              </div>
              
              <div>
                <label htmlFor="eventDate" className="block text-sm font-medium mb-2">
                  Event Date *
                </label>
                <input
                  type="date"
                  id="eventDate"
                  name="eventDate"
                  value={contractData.eventDate}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="eventType" className="block text-sm font-medium mb-2">
                  Event Type *
                </label>
                <select
                  id="eventType"
                  name="eventType"
                  value={contractData.eventType}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  <option value="">Select event type</option>
                  <option value="wedding">Wedding</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="birthday">Birthday Party</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="graduation">Graduation</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="guestCount" className="block text-sm font-medium mb-2">
                  Guest Count *
                </label>
                <input
                  type="number"
                  id="guestCount"
                  name="guestCount"
                  value={contractData.guestCount}
                  onChange={handleInputChange}
                  required
                  min="1"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Number of guests"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="duration" className="block text-sm font-medium mb-2">
                  Duration *
                </label>
                <select
                  id="duration"
                  name="duration"
                  value={contractData.duration}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  <option value="">Select duration</option>
                  <option value="4 hours">4 hours</option>
                  <option value="6 hours">6 hours</option>
                  <option value="8 hours">8 hours</option>
                  <option value="full-day">Full day</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="totalCost" className="block text-sm font-medium mb-2">
                  Total Cost *
                </label>
                <input
                  type="number"
                  id="totalCost"
                  name="totalCost"
                  value={contractData.totalCost}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="$0"
                />
              </div>
              
              <div>
                <label htmlFor="deposit" className="block text-sm font-medium mb-2">
                  Deposit (50%) *
                </label>
                <input
                  type="number"
                  id="deposit"
                  name="deposit"
                  value={contractData.deposit}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="$0"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="specialRequests" className="block text-sm font-medium mb-2">
                Special Requests
              </label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={contractData.specialRequests}
                onChange={handleInputChange}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Any special requirements or requests..."
              />
            </div>
          </div>
          
          <div className="p-6 border-t">
            <button
              onClick={generateContract}
              disabled={!isRulesAccepted || !contractData.clientName || !contractData.eventDate}
              className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-400 flex items-center justify-center space-x-2"
            >
              <FileText className="w-4 h-4" />
              <span>Generate Contract</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contract Preview Modal */}
      {showContract && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h3 className="text-xl font-semibold">Venue Rental Agreement</h3>
              <p className="text-gray-600">Review and sign your contract</p>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Event Details</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Client:</strong> {contractData.clientName}</p>
                    <p><strong>Event Date:</strong> {contractData.eventDate}</p>
                    <p><strong>Event Type:</strong> {contractData.eventType}</p>
                    <p><strong>Guest Count:</strong> {contractData.guestCount}</p>
                    <p><strong>Duration:</strong> {contractData.duration}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Financial Terms</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Total Cost:</strong> ${contractData.totalCost}</p>
                    <p><strong>Deposit Due:</strong> ${contractData.deposit}</p>
                    <p><strong>Balance Due:</strong> ${contractData.totalCost - contractData.deposit}</p>
                    <p><strong>Payment Due:</strong> 7 days before event</p>
                  </div>
                </div>
              </div>
              
              {contractData.specialRequests && (
                <div>
                  <h4 className="font-semibold mb-3">Special Requests</h4>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                    {contractData.specialRequests}
                  </p>
                </div>
              )}
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2 text-amber-600" />
                  Important Terms
                </h4>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• Cancellation more than 30 days: full refund minus $100 processing fee</li>
                  <li>• Cancellation 15-30 days: 50% refund</li>
                  <li>• Cancellation less than 15 days: no refund</li>
                  <li>• Client is responsible for any damages to the venue</li>
                  <li>• Final guest count must be confirmed 72 hours prior to event</li>
                </ul>
              </div>
            </div>
            
            <div className="p-6 border-t bg-gray-50">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setShowContract(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Close
                </button>
                <div className="flex space-x-3">
                  <button className="px-6 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>
                  <button
                    onClick={signContract}
                    disabled={isContractSigned}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:bg-green-600 flex items-center space-x-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>{isContractSigned ? 'Signed!' : 'Sign Contract'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 