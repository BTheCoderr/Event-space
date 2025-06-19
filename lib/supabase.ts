import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface Booking {
  id: string
  created_at: string
  updated_at: string
  
  // Customer Info
  customer_name: string
  customer_email: string
  customer_phone?: string
  
  // Event Details
  event_type: string
  event_date: string
  guest_count: number
  message?: string
  
  // Package & Pricing
  package_name: string
  base_price: number
  add_ons: AddOn[]
  total_amount: number
  deposit_amount: number
  remaining_amount: number
  
  // Payment Info
  stripe_payment_intent_id?: string
  payment_status: 'pending' | 'deposit_paid' | 'fully_paid' | 'refunded'
  
  // Booking Status
  status: 'inquiry' | 'quote_sent' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
  
  // Admin Notes
  admin_notes?: string
  internal_notes?: string
}

export interface AddOn {
  id: string
  name: string
  price: number
  category: string
  quantity: number
}

export interface InventoryItem {
  id: string
  name: string
  category: string
  quantity_total: number
  quantity_available: number
  price_per_unit?: number
  description?: string
  image_url?: string
}

export interface BookingInventory {
  booking_id: string
  inventory_item_id: string
  quantity_reserved: number
  date_needed: string
}

export interface EmailSequence {
  id: string
  booking_id: string
  email_type: 'confirmation' | 'reminder' | 'followup' | 'review_request'
  scheduled_for: string
  sent_at?: string
  status: 'scheduled' | 'sent' | 'failed'
} 