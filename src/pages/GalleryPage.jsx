import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import { supabaseDb } from '../lib/supabase'

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [designs, setDesigns] = useState([])
  const [salonInfo, setSalonInfo] = useState({ phone: '(555) 123-4567' })

  const categories = [
    { id: 'all', name: 'All Designs' },
    { id: 'simple', name: 'Simple' },
    { id: 'cute', name: 'Cute' },
    { id: 'glitter', name: 'Glitter' },
    { id: 'korean', name: 'Korean' },
    { id: 'ombre', name: 'Ombre' },
    { id: 'wedding', name: 'Wedding' },
  ]

  useEffect(() => {
    loadDesigns()
    loadSalonInfo()
  }, [])

  const loadDesigns = async () => {
    try {
      const { data } = await supabaseDb.getDesigns()
      if (data) {
        setDesigns(data)
      }
    } catch (error) {
      console.error('Error loading designs:', error)
    }
  }

  const loadSalonInfo = async () => {
    try {
      const { data } = await supabaseDb.getSalonInfo()
      if (data) {
        const infoObj = {}
        data.forEach(item => {
          infoObj[item.key] = item.value
        })
        setSalonInfo({
          phone: infoObj.phone || '(555) 123-4567'
        })
      }
    } catch (error) {
      console.error('Error loading salon info:', error)
    }
  }

  const filteredImages = selectedCategory === 'all'
    ? designs
    : designs.filter(img => img.category === selectedCategory)

  return (
    <div className="bg-surface font-body-md text-on-surface selection:bg-primary-container selection:text-on-primary-container">
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
            <Link to="/gallery" className="font-body-md text-primary border-b-2 border-primary pb-1">Nail Gallery</Link>
            <Link to="/about" className="font-body-md text-on-surface-variant pb-1 hover:text-primary transition-colors">About</Link>
            <Link to="/contact" className="font-body-md text-on-surface-variant pb-1 hover:text-primary transition-colors">Contact</Link>
          </div>
          <Link to="/booking" className="hidden sm:flex items-center gap-2 bg-primary text-on-primary px-6 py-2 rounded-full font-label-md hover:scale-105 transition-all">
            Book Appointment
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-xl px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-lg text-center">
          <h1 className="font-headline-xl text-headline-xl text-primary mb-4">Our Gallery</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Explore a curated collection of our finest artistry. From minimalist chic to extravagant glitter, find the perfect inspiration for your next visit.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-3 rounded-full font-label-md hover:opacity-90 transition-all shadow-lg"
            >
              Book This Design
            </Link>
            <a
              href={`https://wa.me/${salonInfo.phone.replace(/\D/g, '')}?text=${encodeURIComponent("Hi! I'm interested in your nail services.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-3 rounded-full font-label-md hover:bg-green-600 transition-all shadow-lg"
            >
              <FaWhatsapp /> Chat on WhatsApp
            </a>
          </div>
        </header>

        {/* Filter System */}
        <div className="flex flex-wrap justify-center gap-4 mb-lg">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-2 rounded-full border font-label-md transition-all hover:bg-primary-container hover:text-on-primary-container ${
                selectedCategory === cat.id
                  ? 'bg-primary text-on-primary'
                  : 'border-outline-variant text-on-surface-variant'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {filteredImages.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`group relative overflow-hidden rounded-xl shadow-soft hover:shadow-hover transition-all bg-surface-container-lowest ${
                  index === 0 ? 'md:col-span-2 md:row-span-2 h-96 lg:h-auto' :
                  index === 3 ? 'lg:col-span-2 h-96' :
                  'h-72'
                }`}
              >
                <img
                  src={image.image_url}
                  alt={image.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="bg-white/20 text-white px-3 py-1 rounded-full text-label-sm mb-2 inline-block capitalize w-fit backdrop-blur-sm">
                    {image.category || 'Design'}
                  </span>
                  <h3 className="text-white font-headline-md">{image.name}</h3>
                  {image.description && (
                    <p className="text-white/80 text-label-sm">{image.description}</p>
                  )}
                  <button
                    onClick={() => {
                      // Store selected design
                      localStorage.setItem('selectedDesign', JSON.stringify(image))
                      window.location.href = '/booking'
                    }}
                    className="mt-3 inline-block bg-primary text-white px-4 py-2 rounded-full text-label-sm text-center hover:bg-pink-600 transition-all"
                  >
                    Book This Design
                  </button>
                </div>
                {image.is_custom && (
                  <span className="absolute top-2 left-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
                    Custom
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            <p>No designs found in this category.</p>
          </div>
        )}
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-pink-500 to-rose-500 py-16">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <h2 className="font-headline-xl text-white mb-4">Love What You See?</h2>
          <p className="font-body-lg text-white/90 mb-8 max-w-xl mx-auto">
            Book your appointment today and let us create the perfect nail design for you!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/booking"
              className="inline-block bg-white text-primary px-10 py-4 rounded-full font-label-md hover:opacity-90 transition-all shadow-lg"
            >
              Book Appointment
            </Link>
            <a
              href={`https://wa.me/${salonInfo.phone.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 text-white px-10 py-4 rounded-full font-label-md hover:bg-green-600 transition-all shadow-lg"
            >
              <FaWhatsapp size={20} /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-xl w-full max-w-7xl mx-auto">
          <div className="col-span-1 md:col-span-1">
            <div className="font-headline-md text-headline-md text-primary mb-4">Thuy's Nail</div>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Your neighborhood escape for artistry and relaxation.
            </p>
          </div>
          <div>
            <h4 className="font-label-md text-primary mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="flex flex-col gap-2">
              <li><Link to="/" className="font-body-md text-on-surface-variant hover:text-primary underline">Home</Link></li>
              <li><Link to="/services" className="font-body-md text-on-surface-variant hover:text-primary underline">Services</Link></li>
              <li><Link to="/gallery" className="font-body-md text-primary font-bold">Gallery</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-label-md text-primary mb-4 uppercase tracking-wider">Policies</h4>
            <ul className="flex flex-col gap-2">
              <li><a className="font-body-md text-on-surface-variant hover:text-primary underline" href="#">About</a></li>
              <li><a className="font-body-md text-on-surface-variant hover:text-primary underline" href="#">Contact</a></li>
              <li><a className="font-body-md text-on-surface-variant hover:text-primary underline" href="#">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-label-md text-primary mb-4 uppercase tracking-wider">Contact</h4>
            <p className="font-label-sm text-on-surface-variant">{salonInfo.phone}</p>
          </div>
        </div>
        <div className="border-t border-outline-variant py-6 text-center">
          <p className="font-label-sm text-on-surface-variant">© {new Date().getFullYear()} Thuy's Nail. All rights reserved.</p>
        </div>
      </footer>

      {/* Floating Action Button */}
      <Link to="/booking" className="fixed bottom-8 right-8 bg-primary text-on-primary w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all z-40">
        <span className="material-symbols-outlined text-3xl">calendar_month</span>
      </Link>
    </div>
  )
}

export default GalleryPage
