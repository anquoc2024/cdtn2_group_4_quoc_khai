import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaHeart, FaShieldAlt, FaStar, FaGlobe, FaUsers, FaSpa, FaWhatsapp, FaQuoteLeft, FaInstagram } from 'react-icons/fa'
import { supabaseDb } from '../lib/supabase'

const AboutPage = () => {
  const [salonInfo, setSalonInfo] = useState({
    name: "Thuy's Nail",
    phone: '(555) 123-4567',
    hours: 'Tue-Sun: 9am - 7pm',
    instagram: ''
  })

  useEffect(() => {
    loadSalonInfo()
  }, [])

  const loadSalonInfo = async () => {
    try {
      const { data } = await supabaseDb.getSalonInfo()
      if (data && data.length > 0) {
        const infoObj = {}
        data.forEach(item => {
          infoObj[item.key] = item.value
        })
        setSalonInfo({
          name: infoObj.name || "Thuy's Nail",
          phone: infoObj.phone || '(555) 123-4567',
          hours: infoObj.hours || 'Tue-Sun: 9am - 7pm',
          instagram: infoObj.instagram || ''
        })
      }
    } catch (error) {
      console.error('Error loading salon info:', error)
    }
  }

  const features = [
    { icon: FaHeart, text: 'Friendly Staff' },
    { icon: FaShieldAlt, text: 'Clean Environment' },
    { icon: FaStar, text: 'Premium Products' },
    { icon: FaGlobe, text: 'English-speaking' },
    { icon: FaUsers, text: '500+ Happy Clients' },
    { icon: FaSpa, text: 'Expert Technicians' },
  ]

  const testimonials = [
    {
      name: 'Sarah M.',
      text: 'Best nail salon I have ever been to! The staff is super friendly and they speak great English.',
      country: '🇺🇸'
    },
    {
      name: 'Jennifer K.',
      text: 'Love my nails! The designs are beautiful and they take their time to make everything perfect.',
      country: '🇬🇧'
    },
    {
      name: 'Emma L.',
      text: 'Finally a nail salon where I can communicate clearly. Great service and amazing results!',
      country: '🇦🇺'
    }
  ]

  // Placeholder images - replace with real salon photos
  const salonImages = [
    { src: 'https://images.unsplash.com/photo-1560066984-138daaa3a8b6?w=600&h=400&fit=crop', alt: 'Salon Interior' },
    { src: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=600&h=400&fit=crop', alt: 'Nail Art Station' },
    { src: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=600&h=400&fit=crop', alt: 'Relaxing Atmosphere' },
    { src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=400&fit=crop', alt: 'Beautiful Nails' },
  ]

  const team = [
    { name: 'Thuy', role: 'Owner & Lead Technician', image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=300&h=300&fit=crop' },
    { name: 'Lan', role: 'Senior Nail Artist', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop' },
    { name: 'Mai', role: 'Nail Technician', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&h=300&fit=crop' },
  ]

  return (
    <div className="bg-surface text-on-surface font-body-md">
      {/* WhatsApp Float Button */}
      <a
        href={`https://wa.me/${salonInfo.phone.replace(/\D/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all hover:scale-110"
        title="Chat on WhatsApp"
      >
        <FaWhatsapp size={32} />
      </a>

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-surface shadow-soft">
        <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 w-full max-w-7xl mx-auto">
          <Link to="/" className="font-headline-md text-headline-md font-semibold text-primary">Thuy's Nail</Link>
          <div className="hidden md:flex gap-gutter items-center">
            <Link to="/" className="font-body-md text-on-surface-variant pb-1 hover:text-primary transition-colors">Home</Link>
            <Link to="/services" className="font-body-md text-on-surface-variant pb-1 hover:text-primary transition-colors">Services</Link>
            <Link to="/gallery" className="font-body-md text-on-surface-variant pb-1 hover:text-primary transition-colors">Nail Gallery</Link>
            <Link to="/about" className="font-body-md text-primary border-b-2 border-primary pb-1">About</Link>
            <Link to="/contact" className="font-body-md text-on-surface-variant pb-1 hover:text-primary transition-colors">Contact</Link>
          </div>
          <Link to="/booking" className="flex items-center gap-2 bg-primary text-on-primary px-6 py-2 rounded-full font-label-md hover:scale-105 transition-all">
            Book Appointment
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-xl px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="font-headline-xl text-headline-xl text-primary mb-4">About {salonInfo.name}</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Your neighborhood escape for nail artistry and relaxation. Where every detail matters.
          </p>
        </motion.div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-soft">
              <img
                src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800&h=600&fit=crop"
                alt="Thuy's Nail Salon"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-primary text-on-primary px-6 py-3 rounded-xl shadow-soft">
              <p className="font-label-md font-semibold">Est. 2015</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="font-headline-lg text-headline-lg text-primary">Our Story</h2>
            <p className="font-body-lg text-on-surface-variant leading-relaxed">
              At {salonInfo.name}, we believe that beautiful nails should be accessible to everyone. Our small, cozy salon provides a warm and welcoming atmosphere where you can relax and enjoy professional nail care services.
            </p>
            <p className="font-body-md text-on-surface-variant leading-relaxed">
              We specialize in serving international customers, ensuring clear communication and understanding of your desired nail designs. Our team of experienced technicians uses only high quality products to give you the perfect nails you deserve.
            </p>
            <div className="pt-4">
              <p className="text-label-sm text-primary font-semibold">
                Proudly serving international clients since 2015
              </p>
            </div>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-full font-label-md hover:opacity-90 transition-all"
              >
                Book Appointment
              </Link>
              <a
                href={`https://wa.me/${salonInfo.phone.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full font-label-md hover:bg-green-600 transition-all"
              >
                <FaWhatsapp /> WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="font-headline-lg text-headline-lg text-primary text-center mb-10">Why Choose Us</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-surface-container-lowest p-6 rounded-xl text-center shadow-sm hover:shadow-soft transition-all"
              >
                <div className="w-12 h-12 mx-auto mb-3 bg-primary-container rounded-full flex items-center justify-center">
                  <feature.icon className="text-primary text-xl" />
                </div>
                <p className="font-label-sm text-on-surface">{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="font-headline-lg text-headline-lg text-primary text-center mb-10">What Our International Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm hover:shadow-soft transition-all"
              >
                <FaQuoteLeft className="text-primary text-2xl mb-4" />
                <p className="font-body-md text-on-surface mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-on-surface">{testimonial.name} {testimonial.country}</p>
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} size={12} />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Salon Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="font-headline-lg text-headline-lg text-primary text-center mb-4">Our Salon</h2>
          <p className="text-center text-on-surface-variant mb-10 max-w-2xl mx-auto">
            Take a virtual tour of our cozy, clean, and relaxing nail studio
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {salonImages.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="font-headline-lg text-headline-lg text-primary text-center mb-4">Meet Our Team</h2>
          <p className="text-center text-on-surface-variant mb-10 max-w-2xl mx-auto">
            Our friendly and skilled technicians are here to make your nails beautiful
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all text-center"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-800">{member.name}</h3>
                  <p className="text-pink-500 text-sm">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Follow Us */}
        {salonInfo.instagram && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-20 text-center"
          >
            <div className="bg-pink-50 rounded-3xl p-8">
              <FaInstagram className="text-5xl text-pink-500 mx-auto mb-4" />
              <h2 className="font-headline-lg text-headline-lg text-primary mb-2">Follow Us on Instagram</h2>
              <p className="text-on-surface-variant mb-6">See our latest nail designs and behind-the-scenes content</p>
              <a
                href={salonInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-medium hover:shadow-lg transition-all"
              >
                <FaInstagram size={24} />
                Follow @thuysnail
              </a>
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl p-12 text-center"
        >
          <h2 className="font-headline-lg text-white mb-4">Ready for Your Visit?</h2>
          <p className="font-body-lg text-white/90 mb-8 max-w-xl mx-auto">
            Experience the warmth and artistry of {salonInfo.name}. Book your appointment today or chat with us on WhatsApp!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/booking"
              className="inline-block bg-white text-primary px-10 py-4 rounded-full font-label-md hover:opacity-90 transition-all shadow-md"
            >
              Book Appointment
            </Link>
            <a
              href={`https://wa.me/${salonInfo.phone.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 text-white px-10 py-4 rounded-full font-label-md hover:bg-green-600 transition-all shadow-md"
            >
              <FaWhatsapp size={20} /> WhatsApp Us
            </a>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-xl grid grid-cols-1 md:grid-cols-4 gap-gutter">
          <div className="col-span-1 md:col-span-1">
            <div className="font-headline-md text-headline-md text-primary mb-4">{salonInfo.name}</div>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Your neighborhood escape for artistry and relaxation.
            </p>
          </div>
          <div>
            <h4 className="font-label-md text-primary mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="flex flex-col gap-2">
              <li><Link to="/" className="font-body-md text-on-surface-variant hover:text-primary underline">Home</Link></li>
              <li><Link to="/services" className="font-body-md text-on-surface-variant hover:text-primary underline">Services</Link></li>
              <li><Link to="/gallery" className="font-body-md text-on-surface-variant hover:text-primary underline">Gallery</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-label-md text-primary mb-4 uppercase tracking-wider">Policies</h4>
            <ul className="flex flex-col gap-2">
              <li><a className="font-body-md text-on-surface-variant hover:text-primary underline" href="#">Privacy Policy</a></li>
              <li><a className="font-body-md text-on-surface-variant hover:text-primary underline" href="#">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-label-md text-primary mb-4 uppercase tracking-wider">Contact</h4>
            <p className="font-label-sm text-on-surface-variant">{salonInfo.phone}</p>
            <p className="font-label-sm text-on-surface-variant">{salonInfo.hours}</p>
          </div>
        </div>
        <div className="border-t border-outline-variant py-6 text-center">
          <p className="font-label-sm text-on-surface-variant">© {new Date().getFullYear()} {salonInfo.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default AboutPage
