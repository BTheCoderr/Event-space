-- Enable RLS on all tables
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_inventory ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow public to submit bookings (INSERT only)
CREATE POLICY "Public can submit bookings"
ON bookings
FOR INSERT
TO public
WITH CHECK (true);

-- Policy 2: Allow public to read inventory items
CREATE POLICY "Public can view inventory"
ON inventory
FOR SELECT
TO public
USING (true);

-- Policy 3: Admin full access to bookings (you'll need to replace with your actual user ID)
-- To get your user ID, sign up with Supabase Auth first, then check auth.users table
CREATE POLICY "Admin full access to bookings"
ON bookings
FOR ALL
TO authenticated
USING (true);  -- For now, any authenticated user has full access

-- Policy 4: Admin full access to inventory
CREATE POLICY "Admin full access to inventory"
ON inventory
FOR ALL
TO authenticated
USING (true);

-- Policy 5: Admin full access to booking_inventory
CREATE POLICY "Admin full access to booking_inventory"
ON booking_inventory
FOR ALL
TO authenticated
USING (true);

-- Optional: Create a function to check if user is admin
-- CREATE OR REPLACE FUNCTION is_admin()
-- RETURNS BOOLEAN AS $$
-- BEGIN
--   RETURN auth.email() = 'your-admin-email@example.com';
-- END;
-- $$ LANGUAGE plpgsql SECURITY DEFINER;

-- Insert some sample inventory data if not exists
INSERT INTO inventory (name, category, price_per_day, quantity_available, description) 
VALUES 
  ('Round Tables (8-person)', 'Tables', 15.00, 20, 'Elegant round tables seating 8 guests each'),
  ('Chiavari Chairs', 'Seating', 5.00, 200, 'Classic gold chiavari chairs'),
  ('LED Uplighting', 'Lighting', 25.00, 16, 'Color-changing LED uplights'),
  ('Sound System', 'Audio/Visual', 150.00, 2, 'Professional sound system with wireless mics'),
  ('Dance Floor (20x20)', 'Flooring', 300.00, 1, 'Portable dance floor 20ft x 20ft'),
  ('Backdrop Stand', 'Decor', 75.00, 3, 'Adjustable backdrop stand for ceremonies')
ON CONFLICT (name) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bookings_event_date ON bookings(event_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_customer_email ON bookings(customer_email);
CREATE INDEX IF NOT EXISTS idx_inventory_category ON inventory(category); 