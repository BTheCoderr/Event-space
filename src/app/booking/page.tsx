import BookingSystem from '../components/BookingSystem'

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-12">
        <BookingSystem />
      </div>
    </div>
  )
}

export const metadata = {
  title: 'Book Your Event - Events On Charles',
  description: 'Professional event booking system with electronic signatures and contract management.',
} 