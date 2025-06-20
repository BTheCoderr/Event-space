'use client'

import { useState, useRef } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import { FileText, Download, Check } from 'lucide-react'

interface ContractData {
  customerName: string
  customerEmail: string
  customerPhone: string
  eventType: string
  eventDate: string
  startTime: string
  endTime: string
  guestCount: string
  guestsUnder21: string
  packageName: string
  totalAmount: number
  depositAmount: number
  securityDeposit: number
  eventItems: Array<{
    item: string
    amount: number
    checked: boolean
  }>
}

interface RentalContractProps {
  contractData: ContractData
  onSignatureComplete: (signatureData: string) => void
  onContractAccepted: () => void
}

export default function RentalContract({ contractData, onSignatureComplete, onContractAccepted }: RentalContractProps) {
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [signatureData, setSignatureData] = useState('')
  const signatureRef = useRef<SignatureCanvas>(null)

  const currentDate = new Date().toLocaleDateString()
  const eventDate = new Date(contractData.eventDate)
  const formattedEventDate = eventDate.toLocaleDateString()

  // Format time for display (convert 24hr to 12hr format)
  const formatTime = (time: string) => {
    if (!time) return '__:__ AM/PM'
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  const saveSignature = () => {
    if (signatureRef.current) {
      const signature = signatureRef.current.toDataURL()
      setSignatureData(signature)
      onSignatureComplete(signature)
    }
  }

  const clearSignature = () => {
    if (signatureRef.current) {
      signatureRef.current.clear()
      setSignatureData('')
    }
  }

  const handleContractAccept = () => {
    if (agreedToTerms && signatureData) {
      onContractAccepted()
    }
  }

  const downloadContract = () => {
    // Create a printable version
    window.print()
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">EVENT FACILITY RENTAL AGREEMENT</h1>
        <p className="text-gray-600">Events On Charles</p>
      </div>

      {/* Agreement Content */}
      <div className="space-y-6 text-sm leading-relaxed">
        {/* Opening Paragraph */}
        <p>
          This Event Facility Rental Agreement (the "Agreement") is entered into on this{' '}
          <span className="font-semibold border-b border-gray-400 px-1">{currentDate}</span> day of{' '}
          <span className="font-semibold border-b border-gray-400 px-1">{new Date().getFullYear()}</span>, by and between{' '}
          <strong>OWNER, Events On Charles</strong> ("Landlord") and{' '}
          <strong>LESSEE, <span className="border-b border-gray-400 px-1">{contractData.customerName}</span></strong> ("Lessee").
        </p>

        <p>
          Landlord is the owner of certain real property improved with a building (the "Building") known as 
          Events On Charles located at <strong>593 Charles Street, Providence, RI 02904</strong> (the real property and the Building are 
          collectively referred to herein as the "Property"). Lessee wishes to lease from Landlord, and 
          Landlord wishes to lease to Lessee, a portion of the Property (referred to herein as the "Event 
          Space") according to the following terms and conditions.
        </p>

        {/* Section 1: Term of Agreement */}
        <div>
          <h3 className="font-bold text-gray-900 mb-2">Section 1. Term of Agreement</h3>
          <p>
            This Agreement shall become effective upon the date of execution by both parties. The Event 
            Space will be occupied on the{' '}
            <span className="font-semibold border-b border-gray-400 px-1">{formattedEventDate}</span> day of{' '}
            <span className="font-semibold border-b border-gray-400 px-1">{eventDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>{' '}
            at <span className="font-semibold border-b border-gray-400 px-1">{formatTime(contractData.startTime)}</span> ("Commencement Date") and expire on the{' '}
            <span className="font-semibold border-b border-gray-400 px-1">{formattedEventDate}</span> day of{' '}
            <span className="font-semibold border-b border-gray-400 px-1">{eventDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>{' '}
            at <span className="font-semibold border-b border-gray-400 px-1">{formatTime(contractData.endTime)}</span> unless earlier 
            terminated in accordance with this Agreement. Provided Lessee is not in default under any of the 
            terms and conditions of this Agreement, and all payments required to be paid by Lessee have 
            been paid in full and in a timely manner.
          </p>
        </div>

        {/* Section 2: Event Details */}
        <div>
          <h3 className="font-bold text-gray-900 mb-2">Section 2. Event Details</h3>
          <div className="ml-4 space-y-1">
            <p><strong>A.</strong> Type of Event: <span className="border-b border-gray-400 px-1">{contractData.eventType}</span></p>
            <p><strong>B.</strong> Number of guests permitted: <span className="border-b border-gray-400 px-1">{contractData.guestCount}</span></p>
            <p><strong>C.</strong> Guests Under 21: <span className="border-b border-gray-400 px-1">{contractData.guestsUnder21}</span></p>
            <p><strong>D.</strong> Start Date <span className="border-b border-gray-400 px-1">{formattedEventDate}</span> Start Time <span className="border-b border-gray-400 px-1">{formatTime(contractData.startTime)}</span></p>
            <p><strong>E.</strong> End Date <span className="border-b border-gray-400 px-1">{formattedEventDate}</span> End Time <span className="border-b border-gray-400 px-1">{formatTime(contractData.endTime)}</span></p>
          </div>
        </div>

        {/* Section 3: Leased Items List */}
        <div>
          <h3 className="font-bold text-gray-900 mb-2">Section 3. Leased Items List</h3>
          <div className="ml-4 space-y-2">
            <div className="flex items-center">
              <input type="checkbox" checked className="mr-2" readOnly />
              <span className="border-b border-gray-400 px-1 flex-1">{contractData.packageName}</span>
              <span>Amount: $<span className="border-b border-gray-400 px-1">{contractData.totalAmount}</span></span>
            </div>
            {contractData.eventItems?.map((item, index) => (
              <div key={index} className="flex items-center">
                <input type="checkbox" checked={item.checked} className="mr-2" readOnly />
                <span className="border-b border-gray-400 px-1 flex-1">{item.item}</span>
                <span>Amount: $<span className="border-b border-gray-400 px-1">{item.amount}</span></span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Leased Items Damage */}
        <div>
          <h3 className="font-bold text-gray-900 mb-2">Section 4. Leased Items Damage</h3>
          <p>
            Lessee shall be held liable to compensate for any damage caused to leased items referenced in 
            Section 3, caused by Lessee, guests, agents, and invitees of lessee during the duration agreed 
            upon in Section 1 of the agreement.
          </p>
        </div>

        {/* Section 5: Permits and Licensure */}
        <div>
          <h3 className="font-bold text-gray-900 mb-2">Section 5. Permits and Licensure</h3>
          <p>
            So long as Lessee obtains and maintains all necessary licenses and permits for such operations, 
            and for no other purpose without Landlord's prior written consent, which consent shall not be 
            unreasonably withheld or delayed. All permits and submissions required to authorize Lessee's use shall be 
            paid for by Lessee, and Landlord's signature on Lessee's permit applications shall indicate 
            Landlord's approval. Tenant will operate the Premises and Tenant's business in a manner 
            consistent with the character and quality of the building within which the Premises are located. 
            Lessee shall keep the Premises in a neat, clean and safe condition. Lessee shall not operate its 
            business so as to overburden or exceed the capacity of the utility services installed in the 
            Property.
          </p>
        </div>

        {/* Section 6: Payment */}
        <div>
          <h3 className="font-bold text-gray-900 mb-2">Section 6. Payment</h3>
          <div className="ml-4 space-y-2">
            <p>
              <strong>A.</strong> Lessee shall pay Landlord a security deposit (the "Security Deposit") upon full execution 
              of this agreement in the amount of $<span className="border-b border-gray-400 px-1">{contractData.securityDeposit || '0'}</span>. The Security Deposit shall be retained 
              by the Landlord. Landlord shall refund the Security Deposit to Lessee within 48 hours 
              after the termination of the agreement, or following the complete evacuation of the 
              Premises by Lessee, less any amounts reasonably required to repair or restore the 
              Premises to the condition that existed on the Commencement date.
            </p>
            <p>
              <strong>B.</strong> A base fee for the Event Space shall be paid by Lessee to the Landlord in full on the{' '}
              <span className="border-b border-gray-400 px-1">{formattedEventDate}</span> day of{' '}
              <span className="border-b border-gray-400 px-1">{eventDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>{' '}
              in the amount of $<span className="border-b border-gray-400 px-1">{contractData.totalAmount - contractData.depositAmount}</span>.
            </p>
            <p>
              <strong>C.</strong> An additional fee for the Event Space shall be paid by Lessee to the Landlord in full on 
              the <span className="border-b border-gray-400 px-1">{currentDate}</span> day of{' '}
              <span className="border-b border-gray-400 px-1">{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>{' '}
              in the amount of $<span className="border-b border-gray-400 px-1">{contractData.depositAmount}</span>.
            </p>
          </div>
        </div>

        {/* Section 6: Condition of Premises */}
        <div>
          <h3 className="font-bold text-gray-900 mb-2">Section 6. Condition of Premises.</h3>
          <p>
            Landlord shall have no obligation to make any alterations, improvements or modifications to the 
            Premises. Except for the foregoing, Landlord shall deliver and provide the Premises to Lessee as 
            is and with all faults with no representations or warranties of any kind with respect to the quality 
            of the Premises or the suitability of the Premises for Lessee intended use. Lessee acknowledges 
            and agrees that the Premises are in a condition that is suitable and adequate for the use intended 
            by Lessee.
          </p>
        </div>

        {/* Section 7: Termination */}
        <div>
          <h3 className="font-bold text-gray-900 mb-2">Section 7. Termination</h3>
          <p>
            On the expiration date or earlier termination of the Term, Lessee shall: (a) immediately vacate 
            the Premises and surrender the same to Landlord; (b) repair all damage to the Premises and the 
            fixtures and personal property of Landlord located on the Premises caused by Lessee.
          </p>
        </div>

        {/* Section 8: Facility Alcohol Use Agreement */}
        <div>
          <h3 className="font-bold text-gray-900 mb-2">Section 8. Facility Alcohol Use Agreement</h3>
          <p className="mb-3">
            The following rules and regulations apply to the use of the Event Space mentioned above that 
            includes the serving of alcoholic beverages at a private event, without a licensed caterer and 
            where a state alcohol license is not required:
          </p>
          <div className="ml-4 space-y-2 text-sm">
            <p><strong>A.</strong> The service of alcoholic beverages at the Event Space without a licensed caterer is only permitted at a closed private party, wedding reception, reunion, etc. where the service of alcoholic beverages is limited to the Lessee's guests of legal age for alcoholic consumption. Service of alcoholic beverages to the public is NOT allowed.</p>
            <p><strong>B.</strong> The Lessee must provide all alcoholic beverages to be served. Guests cannot bring alcoholic beverages into Event Space</p>
            <p><strong>C.</strong> There can be NO CHARGE for the service of alcoholic beverages at the event and there can be no charge to or fee paid, via admission fee, donation, selling tickets, etc. for admission or attendance to the event.</p>
            <p><strong>D.</strong> The availability of alcoholic beverages at the event cannot be advertised</p>
            <p><strong>E.</strong> Lessee is responsible to monitor and control the serving of alcoholic beverages at the event</p>
            <p><strong>F.</strong> Alcoholic beverages cannot be served to minors. Renter assumes all responsibility and liability for serving alcoholic beverages and is responsible for age verification.</p>
            <p><strong>G.</strong> Alcoholic beverages may not be taken outside of the designated rental space and cannot be available to the general public.</p>
            <p><strong>H.</strong> Landlord and/or law enforcement have the right to enter the event and to monitor the event and the service and consumption of alcoholic beverages</p>
            <p><strong>I.</strong> Lessee is responsible for compliance with all city, state and federal laws and regulations governing the service, distribution and consumption of alcoholic beverages at the event.</p>
            <p><strong>J.</strong> Lessee is responsible for compliance with the terms of Renter's Rental Agreement, Booking Form, Facility Use Guidelines, and this Agreement at all times during the event.</p>
            <p><strong>J.</strong> Lessee hereby agrees to defend indemnify and hold harmless the Landlord and associated managing LLC (<span className="border-b border-gray-400 px-1">Events On Charles LLC</span>) from and against liability, suits, actions, proceedings, judgments, claims, losses, liens, damages, and injuries, (including attorneys' fees and other expenses of litigation, arbitration, mediation or appeal), to the extent related to use of the facility by Renter or Renter's guests, licensees, or invitees, including causes of action related to Renter's service of alcoholic beverages at Event Space.</p>
          </div>
        </div>

        {/* Closing Statement */}
        <div className="border-t pt-6">
          <p className="mb-6">
            Nothing herein shall be construed to act as a waiver or limitation of any and all defenses, 
            limitations of liability, damage limitations, or immunities available to the Landlord and 
            managing LLC (<span className="border-b border-gray-400 px-1">Events On Charles LLC</span>).
          </p>
          
          <div className="italic mb-6">
            <p>
              I have received, read, and reviewed the Entire Agreement related to use of Event Space. I 
              understand the conditions and regulations and hereby agree to the above conditions and 
              regulations. I further acknowledge and agree that, if I do not meet all of the above conditions 
              and limitations related to service and consumption of alcohol, I will not serve alcohol upon the 
              Event Space premises.
            </p>
          </div>

          <p className="font-semibold mb-8">
            IN WITNESS WHEREOF, the parties have executed this Lease as of the day and year first above written.
          </p>
        </div>
      </div>

      {/* Signature Section */}
      <div className="border-t pt-8 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Electronic Signature</h3>
        
        <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Please sign below to acknowledge your agreement to the terms:
          </label>
          <div className="border border-gray-300 rounded bg-white">
            <SignatureCanvas
              ref={signatureRef}
              canvasProps={{
                width: 600,
                height: 150,
                className: 'signature-canvas w-full'
              }}
            />
          </div>
          <div className="flex space-x-3 mt-3">
            <button
              onClick={saveSignature}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center"
            >
              <Check className="w-4 h-4 mr-2" />
              Save Signature
            </button>
            <button
              onClick={clearSignature}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Clear
            </button>
            <button
              onClick={downloadContract}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Contract
            </button>
          </div>
        </div>

        {/* Agreement Checkbox */}
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="agree-terms"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="mt-1"
          />
          <label htmlFor="agree-terms" className="text-sm text-gray-700">
            I have read, understood, and agree to all terms and conditions outlined in this Event Facility Rental Agreement. 
            I acknowledge that this is a legally binding contract and that my electronic signature has the same legal effect 
            as a handwritten signature.
          </label>
        </div>

        {/* Signature Lines */}
        <div className="grid md:grid-cols-2 gap-8 pt-6">
          <div>
            <div className="border-b border-gray-400 mb-2 h-8"></div>
            <p className="text-sm text-gray-600">Landlord Signature &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date</p>
          </div>
          <div>
            <div className="border-b border-gray-400 mb-2 h-8 flex items-end pb-1">
              {signatureData && (
                <img src={signatureData} alt="Tenant Signature" className="h-6 max-w-full" />
              )}
            </div>
            <p className="text-sm text-gray-600">Tenant Signature ({contractData.customerName}) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date</p>
          </div>
        </div>

        {/* Accept Button */}
        <div className="text-center pt-6">
          <button
            onClick={handleContractAccept}
            disabled={!agreedToTerms || !signatureData}
            className="bg-yellow-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center mx-auto"
          >
            <FileText className="w-5 h-5 mr-2" />
            Accept Contract & Continue
          </button>
        </div>
      </div>
    </div>
  )
} 