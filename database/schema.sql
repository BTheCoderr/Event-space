-- Events On Charles Database Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Bookings table (main table for all event bookings)
CREATE TABLE bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Customer Information
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50),
  
  -- Event Details
  event_type VARCHAR(100) NOT NULL,
  event_date DATE NOT NULL,
  guest_count INTEGER NOT NULL,
  message TEXT,
  
  -- Package & Pricing
  package_name VARCHAR(100) NOT NULL,
  base_price DECIMAL(10,2) NOT NULL,
  add_ons JSONB DEFAULT '[]'::jsonb,
  total_amount DECIMAL(10,2) NOT NULL,
  deposit_amount DECIMAL(10,2) NOT NULL,
  remaining_amount DECIMAL(10,2) NOT NULL,
  
  -- Payment Information
  stripe_payment_intent_id VARCHAR(255),
  payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'deposit_paid', 'fully_paid', 'refunded')),
  
  -- Booking Status
  status VARCHAR(20) DEFAULT 'inquiry' CHECK (status IN ('inquiry', 'quote_sent', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  
  -- Admin Notes
  admin_notes TEXT,
  internal_notes TEXT
);

-- Inventory Items table
CREATE TABLE inventory_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  quantity_total INTEGER NOT NULL DEFAULT 0,
  quantity_available INTEGER NOT NULL DEFAULT 0,
  price_per_unit DECIMAL(10,2),
  description TEXT,
  image_url VARCHAR(500)
);

-- Booking Inventory (tracks what inventory is reserved for each booking)
CREATE TABLE booking_inventory (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  inventory_item_id UUID REFERENCES inventory_items(id) ON DELETE CASCADE,
  quantity_reserved INTEGER NOT NULL,
  date_needed DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Email Sequences (automated email scheduling)
CREATE TABLE email_sequences (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  email_type VARCHAR(50) NOT NULL CHECK (email_type IN ('confirmation', 'reminder', 'followup', 'review_request')),
  scheduled_for TIMESTAMP WITH TIME ZONE NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE,
  status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'sent', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX idx_bookings_event_date ON bookings(event_date);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_customer_email ON bookings(customer_email);
CREATE INDEX idx_bookings_payment_status ON bookings(payment_status);
CREATE INDEX idx_booking_inventory_date ON booking_inventory(date_needed);
CREATE INDEX idx_email_sequences_scheduled ON email_sequences(scheduled_for);

-- Update trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inventory_items_updated_at BEFORE UPDATE ON inventory_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) - Only you can access admin data
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_sequences ENABLE ROW LEVEL SECURITY;

-- Policies (you'll need to update these with your admin email)
CREATE POLICY "Admin can do everything on bookings" ON bookings
    FOR ALL USING (auth.jwt() ->> 'email' = 'your-admin-email@eventsoncharles.com');

CREATE POLICY "Admin can do everything on inventory" ON inventory_items
    FOR ALL USING (auth.jwt() ->> 'email' = 'your-admin-email@eventsoncharles.com');

CREATE POLICY "Admin can do everything on booking_inventory" ON booking_inventory
    FOR ALL USING (auth.jwt() ->> 'email' = 'your-admin-email@eventsoncharles.com');

CREATE POLICY "Admin can do everything on email_sequences" ON email_sequences
    FOR ALL USING (auth.jwt() ->> 'email' = 'your-admin-email@eventsoncharles.com');

-- Sample inventory data
INSERT INTO inventory_items (name, category, quantity_total, quantity_available, price_per_unit, description) VALUES
('Round Table (8-person)', 'Tables', 20, 20, 25.00, '60-inch round tables that seat 8 people comfortably'),
('Rectangular Table (6-person)', 'Tables', 15, 15, 20.00, '6-foot rectangular tables for 6 people'),
('Chiavari Chair - Gold', 'Seating', 100, 100, 8.00, 'Elegant gold chiavari chairs'),
('Chiavari Chair - Silver', 'Seating', 100, 100, 8.00, 'Elegant silver chiavari chairs'),
('Premium Lighting Package', 'Lighting', 5, 5, 300.00, 'Uplighting and ambient lighting package'),
('Sound System - Basic', 'Audio', 3, 3, 150.00, 'Wireless microphone and speaker system'),
('Sound System - Premium', 'Audio', 2, 2, 300.00, 'Full DJ setup with mixing board'),
('Backdrop - Elegant', 'Decor', 8, 8, 100.00, 'Fabric backdrop with lighting'),
('Centerpiece - Floral', 'Decor', 50, 50, 45.00, 'Fresh floral centerpieces'),
('Bar Setup - Full', 'Bar', 2, 2, 400.00, 'Complete bar setup with glassware'),
('Linens - White', 'Linens', 50, 50, 15.00, 'Premium white table linens'),
('Linens - Colored', 'Linens', 30, 30, 18.00, 'Colored table linens (various colors)'); 