-- 🎯 Events On Charles Database Schema (Simplified)
-- Enable UUID extension first
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  event_type TEXT,
  event_date DATE,
  guest_count INTEGER,
  package_name TEXT,
  total_amount NUMERIC(10, 2),
  deposit_amount NUMERIC(10, 2),
  remaining_amount NUMERIC(10, 2),
  message TEXT,
  status TEXT DEFAULT 'inquiry',
  payment_status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inventory Items Table
CREATE TABLE IF NOT EXISTS inventory_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  quantity_total INTEGER DEFAULT 0,
  quantity_available INTEGER DEFAULT 0,
  price_per_unit NUMERIC(10, 2),
  category TEXT,
  description TEXT,
  image_url TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Booking ↔ Inventory Join Table
CREATE TABLE IF NOT EXISTS booking_inventory (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  inventory_item_id UUID REFERENCES inventory_items(id),
  quantity_reserved INTEGER DEFAULT 1,
  date_needed DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Email Sequences Table (for follow-ups, auto reminders)
CREATE TABLE IF NOT EXISTS email_sequences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  email_type TEXT, -- 'confirmation', 'reminder', etc.
  status TEXT DEFAULT 'scheduled', -- 'scheduled', 'sent', 'failed'
  scheduled_for TIMESTAMP WITH TIME ZONE,
  sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bookings_event_date ON bookings(event_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_customer_email ON bookings(customer_email);

-- Sample Inventory Items
INSERT INTO inventory_items (name, quantity_total, quantity_available, price_per_unit, category, description)
VALUES 
  ('Gold Chiavari Chair', 100, 100, 8.00, 'Seating', 'Elegant gold chiavari chairs'),
  ('Silver Chiavari Chair', 100, 100, 8.00, 'Seating', 'Elegant silver chiavari chairs'),
  ('60" Round Table', 25, 25, 25.00, 'Tables', '60-inch round tables that seat 8 people'),
  ('6ft Rectangular Table', 15, 15, 20.00, 'Tables', '6-foot rectangular tables for 6 people'),
  ('Premium Lighting Package', 10, 10, 300.00, 'Lighting', 'Uplighting and ambient lighting package'),
  ('Sound System - Basic', 5, 5, 150.00, 'Audio', 'Wireless microphone and speaker system'),
  ('Backdrop - Elegant', 8, 8, 100.00, 'Decor', 'Fabric backdrop with lighting'),
  ('Centerpiece - Floral', 50, 50, 45.00, 'Decor', 'Fresh floral centerpieces'),
  ('Bar Setup - Full', 3, 3, 400.00, 'Bar', 'Complete bar setup with glassware'),
  ('Premium White Linens', 50, 50, 15.00, 'Linens', 'Premium white table linens')
ON CONFLICT DO NOTHING;

-- 🔐 Enable RLS (Row Level Security) - but allow public access for now
-- We'll set up proper admin authentication later
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_sequences ENABLE ROW LEVEL SECURITY;

-- Temporary policies that allow all operations (we'll restrict this later)
CREATE POLICY "Allow all operations on bookings" ON bookings FOR ALL USING (true);
CREATE POLICY "Allow all operations on inventory_items" ON inventory_items FOR ALL USING (true);
CREATE POLICY "Allow all operations on booking_inventory" ON booking_inventory FOR ALL USING (true);
CREATE POLICY "Allow all operations on email_sequences" ON email_sequences FOR ALL USING (true); 