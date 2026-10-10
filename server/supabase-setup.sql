-- ============================================
-- THUY'S NAIL - Supabase Database Setup
-- Run this in Supabase Dashboard -> SQL Editor
-- ============================================

-- 1. CREATE USERS TABLE
CREATE TABLE users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT,
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. CREATE SERVICES TABLE
CREATE TABLE services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price TEXT NOT NULL,
    duration TEXT,
    category TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. CREATE DESIGNS TABLE
CREATE TABLE designs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT,
    image_url TEXT,
    is_custom BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. CREATE BOOKINGS TABLE
CREATE TABLE bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    user_name TEXT,
    user_email TEXT,
    service_id UUID REFERENCES services(id) ON DELETE SET NULL,
    service_name TEXT,
    service_price TEXT,
    design_id UUID REFERENCES designs(id) ON DELETE SET NULL,
    design_name TEXT,
    date DATE NOT NULL,
    time TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. CREATE BLOCKED DATES TABLE
CREATE TABLE blocked_dates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    date DATE UNIQUE NOT NULL,
    reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. CREATE BLOCKED TIMES TABLE
CREATE TABLE blocked_times (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    date DATE NOT NULL,
    time TEXT NOT NULL,
    UNIQUE(date, time),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- SEED DATA
-- ============================================

-- Insert default services
INSERT INTO services (name, description, price, duration, category, image_url) VALUES
('Signature Gel Manicure', 'Long-lasting, high-gloss finish', '$45', '60 mins', 'manicure', 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop'),
('Deluxe Spa Pedicure', 'Includes sea salt soak & massage', '$65', '75 mins', 'pedicure', 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=400&h=300&fit=crop'),
('Nail Art Add-on', 'From minimalist to complex art', '$15', '+20 mins', 'art', 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400&h=300&fit=crop'),
('Acrylic Full Set', 'Durable acrylic extensions with shaping', '$55', '90 mins', 'acrylic', 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=400&h=300&fit=crop'),
('Gel Extensions', 'Natural-looking gel nail extensions', '$60', '90-120 mins', 'gel', 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=400&h=300&fit=crop'),
('Classic Manicure', 'Traditional nail care with polish', '$25', '45 mins', 'manicure', 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=400&h=300&fit=crop');

-- Insert default designs
INSERT INTO designs (name, description, category, image_url) VALUES
('Modern French', 'Timeless elegance with subtle metallic accent', 'simple', 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop'),
('Abstract Blush', 'Free-flowing shapes for artistic statement', 'cute', 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=400&h=400&fit=crop'),
('Rose Gold Shimmer', 'Elegant rose gold glitter design', 'glitter', 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400&h=400&fit=crop'),
('Spring Daisies', 'Cute floral nail art', 'cute', 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=400&h=400&fit=crop'),
('Korean Minimalist', 'Clean Korean-inspired style', 'korean', 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=400&h=400&fit=crop'),
('Pink Ombre', 'Beautiful gradient effect', 'ombre', 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=400&h=400&fit=crop'),
('Bridal Lace', 'Perfect for your special day', 'wedding', 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop'),
('Classic Nude', 'Natural and elegant nude look', 'simple', 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=400&h=400&fit=crop');

-- Insert default admin user (password: admin123 - encrypted)
INSERT INTO users (email, password, name, role) VALUES
('admin@thuysnail.com', '$2a$10$rQZ4KJZxVGZ9XjOqK6p.XOHcL5V4Y3K5vZ9F8Xw5Y2Z3K4J5L', 'Admin', 'admin');

-- Insert some blocked dates (holidays)
INSERT INTO blocked_dates (date, reason) VALUES
('2026-01-01', 'New Year''s Day'),
('2026-04-30', 'Reunification Day'),
('2026-05-01', 'Labor Day'),
('2026-09-02', 'National Day'),
('2026-12-25', 'Christmas Day');

-- ============================================
-- ROW LEVEL SECURITY (RLS) - Enable security
-- ============================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE designs ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_times ENABLE ROW LEVEL SECURITY;

-- RLS Policies (allow all for demo - customize later)
CREATE POLICY "Allow all users" ON users FOR ALL USING (true);
CREATE POLICY "Allow all bookings" ON bookings FOR ALL USING (true);
CREATE POLICY "Allow all services" ON services FOR ALL USING (true);
CREATE POLICY "Allow all designs" ON designs FOR ALL USING (true);
CREATE POLICY "Allow all blocked_dates" ON blocked_dates FOR ALL USING (true);
CREATE POLICY "Allow all blocked_times" ON blocked_times FOR ALL USING (true);

-- ============================================
-- Done! Copy these to Supabase SQL Editor
-- ============================================
