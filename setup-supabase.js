/**
 * Thuy's Nail - Supabase Setup Script
 * Chay: node setup-supabase.js
 * 
 * Lưu ý: Cần SUPABASE_SERVICE_KEY trong .env
 */

import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'

// Load env
const envContent = fs.readFileSync('.env', 'utf-8')
const env = {}
envContent.split('\n').forEach(line => {
  if (line && !line.startsWith('#')) {
    const [key, value] = line.split('=')
    if (key && value) env[key.trim()] = value.trim()
  }
})

const supabase = createClient(
  env.VITE_SUPABASE_URL || 'https://drrjeuyjildgitwepvdn.supabase.co',
  env.VITE_SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRycmpldXlqaWxkZ2l0d2VwdmRuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjcyMDAxOCwiZXhwIjoyMDk4Mjk2MDE4fQ.0DScdknA95k_9sJp_yJevE6Be1ITPwNjswl_Gt3UQbs'
)

async function setup() {
  console.log('🚀 Bat dau setup Supabase...')

  try {
    // 1. Create users table
    console.log('📋 Tao bang users...')
    await supabase.rpc('exec', { 
      sql: `
        CREATE TABLE IF NOT EXISTS users (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          name TEXT,
          role TEXT DEFAULT 'user',
          phone TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    })

    // 2. Create services table
    console.log('📋 Tao bang services...')
    await supabase.rpc('exec', { 
      sql: `
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
      `
    })

    // 3. Create designs table
    console.log('📋 Tao bang designs...')
    await supabase.rpc('exec', { 
      sql: `
        CREATE TABLE IF NOT EXISTS designs (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name TEXT NOT NULL,
          description TEXT,
          category TEXT,
          image_url TEXT,
          is_custom BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    })

    // 4. Create bookings table
    console.log('📋 Tao bang bookings...')
    await supabase.rpc('exec', { 
      sql: `
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
          status TEXT DEFAULT 'pending',
          notes TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    })

    // 5. Create blocked_dates table
    console.log('📋 Tao bang blocked_dates...')
    await supabase.rpc('exec', { 
      sql: `
        CREATE TABLE IF NOT EXISTS blocked_dates (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          blocked_date DATE UNIQUE NOT NULL,
          reason TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    })

    // 6. Create blocked_times table
    console.log('📋 Tao bang blocked_times...')
    await supabase.rpc('exec', { 
      sql: `
        CREATE TABLE IF NOT EXISTS blocked_times (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          blocked_date DATE NOT NULL,
          blocked_time TEXT NOT NULL,
          UNIQUE(blocked_date, blocked_time),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    })

    // Insert seed data
    console.log('📊 Chen du lieu mau...')

    // Admin user
    await supabase.from('users').upsert({
      email: 'admin@thuysnail.com',
      password: 'admin123',
      name: 'Admin',
      role: 'admin'
    }, { onConflict: 'email' })

    // Services
    const services = [
      { name: 'Signature Gel Manicure', description: 'Long-lasting, high-gloss finish', price: '$45', duration: '60 mins', category: 'manicure', image_url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop' },
      { name: 'Deluxe Spa Pedicure', description: 'Includes sea salt soak & massage', price: '$65', duration: '75 mins', category: 'pedicure', image_url: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=400&h=300&fit=crop' },
      { name: 'Nail Art Add-on', description: 'From minimalist to complex art', price: '$15', duration: '+20 mins', category: 'art', image_url: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400&h=300&fit=crop' },
      { name: 'Acrylic Full Set', description: 'Durable acrylic extensions', price: '$55', duration: '90 mins', category: 'acrylic', image_url: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=400&h=300&fit=crop' },
      { name: 'Gel Extensions', description: 'Natural-looking gel extensions', price: '$60', duration: '90 mins', category: 'gel', image_url: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=400&h=300&fit=crop' },
      { name: 'Classic Manicure', description: 'Traditional nail care', price: '$25', duration: '45 mins', category: 'manicure', image_url: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=400&h=300&fit=crop' }
    ]
    await supabase.from('services').upsert(services)

    // Designs
    const designs = [
      { name: 'Modern French', description: 'Timeless elegance', category: 'simple', image_url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop' },
      { name: 'Abstract Blush', description: 'Artistic statement', category: 'cute', image_url: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=400&h=400&fit=crop' },
      { name: 'Rose Gold Shimmer', description: 'Elegant glitter', category: 'glitter', image_url: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400&h=400&fit=crop' },
      { name: 'Spring Daisies', description: 'Cute floral', category: 'cute', image_url: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=400&h=400&fit=crop' },
      { name: 'Korean Minimalist', description: 'Clean Korean style', category: 'korean', image_url: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=400&h=400&fit=crop' },
      { name: 'Pink Ombre', description: 'Gradient effect', category: 'ombre', image_url: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=400&h=400&fit=crop' },
      { name: 'Bridal Lace', description: 'Perfect for your special day', category: 'wedding', image_url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop' },
      { name: 'Classic Nude', description: 'Natural elegance', category: 'simple', image_url: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=400&h=400&fit=crop' }
    ]
    await supabase.from('designs').upsert(designs)

    // Blocked dates
    const blockedDates = [
      { blocked_date: '2026-01-01', reason: "New Year's Day" },
      { blocked_date: '2026-04-30', reason: 'Reunification Day' },
      { blocked_date: '2026-05-01', reason: 'Labor Day' },
      { blocked_date: '2026-09-02', reason: 'National Day' },
      { blocked_date: '2026-12-25', reason: 'Christmas Day' }
    ]
    for (const date of blockedDates) {
      await supabase.from('blocked_dates').upsert(date, { onConflict: 'blocked_date' })
    }

    console.log('✅ Setup hoan tat!')
    console.log('')
    console.log('📝 Thong tin dang nhap Admin:')
    console.log('   Email: admin@thuysnail.com')
    console.log('   Password: admin123')

  } catch (error) {
    console.error('❌ Loi:', error.message)
    console.log('')
    console.log('💡 Vui long chay SQL thu cong trong Supabase Dashboard:')
    console.log('   1. vao https://supabase.com/dashboard/project/drrjeuyjildgitwepvdn')
    console.log('   2. SQL Editor')
    console.log('   3. Copy noi dung tu file supabase-schema.sql')
    console.log('   4. Run')
  }
}

setup()
