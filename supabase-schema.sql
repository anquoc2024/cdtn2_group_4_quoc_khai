-- ============================================
-- THUY'S NAIL - Database Setup for Supabase
-- Run this in: Supabase Dashboard -> SQL Editor
-- ============================================

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT,
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. SERVICES TABLE
CREATE TABLE IF NOT EXISTS services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price TEXT NOT NULL,
    duration TEXT,
    category TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. DESIGNS TABLE
CREATE TABLE IF NOT EXISTS designs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT,
    image_url TEXT,
    is_custom BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID,
    user_name TEXT,
    user_email TEXT,
    service_id UUID,
    service_name TEXT,
    service_price TEXT,
    design_id UUID,
    design_name TEXT,
    design_image TEXT,
    booking_date DATE NOT NULL,
    booking_time TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. BLOCKED DATES TABLE
CREATE TABLE IF NOT EXISTS blocked_dates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    blocked_date DATE UNIQUE NOT NULL,
    reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. BLOCKED TIMES TABLE
CREATE TABLE IF NOT EXISTS blocked_times (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    blocked_date DATE NOT NULL,
    blocked_time TEXT NOT NULL,
    UNIQUE(blocked_date, blocked_time),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- SEED DATA - Services
-- ============================================
INSERT INTO services (name, description, price, duration, category, image_url) VALUES
('Signature Gel Manicure', 'Long-lasting, high-gloss finish', '$45', '60 mins', 'manicure', 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop'),
('Deluxe Spa Pedicure', 'Includes sea salt soak & massage', '$65', '75 mins', 'pedicure', 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=400&h=300&fit=crop'),
('Nail Art Add-on', 'From minimalist to complex art', '$15', '+20 mins', 'art', 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400&h=300&fit=crop'),
('Acrylic Full Set', 'Durable acrylic extensions', '$55', '90 mins', 'acrylic', 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=400&h=300&fit=crop'),
('Gel Extensions', 'Natural-looking gel extensions', '$60', '90 mins', 'gel', 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=400&h=300&fit=crop'),
('Classic Manicure', 'Traditional nail care', '$25', '45 mins', 'manicure', 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=400&h=300&fit=crop')
ON CONFLICT DO NOTHING;

-- ============================================
-- SEED DATA - Designs
-- ============================================
INSERT INTO designs (name, description, category, image_url) VALUES
('Modern French', 'Timeless elegance', 'simple', 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop'),
('Abstract Blush', 'Artistic statement', 'cute', 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=400&h=400&fit=crop'),
('Rose Gold Shimmer', 'Elegant glitter', 'glitter', 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400&h=400&fit=crop'),
('Spring Daisies', 'Cute floral', 'cute', 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=400&h=400&fit=crop'),
('Korean Minimalist', 'Clean Korean style', 'korean', 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=400&h=400&fit=crop'),
('Pink Ombre', 'Gradient effect', 'ombre', 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=400&h=400&fit=crop'),
('Bridal Lace', 'Perfect for your special day', 'wedding', 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop'),
('Classic Nude', 'Natural elegance', 'simple', 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=400&h=400&fit=crop')
ON CONFLICT DO NOTHING;

-- ============================================
-- SEED DATA - Admin User (password: admin123)
-- ============================================
INSERT INTO users (email, password, name, role) VALUES
('admin@thuysnail.com', 'admin123', 'Admin', 'admin')
ON CONFLICT (email) DO NOTHING;

-- ============================================
-- SEED DATA - Blocked Dates 2026
-- ============================================
INSERT INTO blocked_dates (blocked_date, reason) VALUES
('2026-01-01', 'New Year''s Day'),
('2026-04-30', 'Reunification Day'),
('2026-05-01', 'Labor Day'),
('2026-09-02', 'National Day'),
('2026-12-25', 'Christmas Day')
ON CONFLICT (blocked_date) DO NOTHING;

-- ============================================
-- SALON INFO TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS salon_info (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    key TEXT UNIQUE NOT NULL,
    value TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seed default salon info
INSERT INTO salon_info (key, value) VALUES
('name', 'Thuy''s Nail'),
('address', '123 Neighborhood Way, Cozy Studio District'),
('phone', '(555) 123-4567'),
('email', 'hello@thuysnail.com'),
('hours', 'Tue-Sun: 9am - 7pm'),
('facebook', 'https://facebook.com/thuysnail'),
('instagram', 'https://instagram.com/thuysnail'),
('map_url', '')
ON CONFLICT (key) DO NOTHING;

-- ============================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE designs ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_times ENABLE ROW LEVEL SECURITY;
ALTER TABLE salon_info ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES (Allow all for demo)
-- ============================================
CREATE POLICY "Allow all users" ON users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all services" ON services FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all designs" ON designs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all bookings" ON bookings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all blocked_dates" ON blocked_dates FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all blocked_times" ON blocked_times FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all salon_info" ON salon_info FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- Done! Tables created and seeded.
-- ============================================
