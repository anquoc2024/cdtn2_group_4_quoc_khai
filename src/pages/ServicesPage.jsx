import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { servicesData, categories } from '../utils/constants'

const ServicesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredServices = selectedCategory === 'all'
    ? servicesData
    : servicesData.filter(s => s.category === selectedCategory)

  return (
    <div className="bg-surface text-on-surface font-body-md">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-surface shadow-soft">
        <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 w-full max-w-7xl mx-auto">
          <Link to="/" className="font-headline-md text-headline-md font-semibold text-primary">Thuy's Nail</Link>
          <div className="hidden md:flex gap-gutter items-center">
            <Link to="/" className="font-body-md text-on-surface-variant pb-1 hover:text-primary transition-colors">Home</Link>
            <Link to="/services" className="font-body-md text-primary border-b-2 border-primary pb-1">Services</Link>
            <Link to="/gallery" className="font-body-md text-on-surface-variant pb-1 hover:text-primary transition-colors">Nail Gallery</Link>
            <Link to="/about" className="font-body-md text-on-surface-variant pb-1 hover:text-primary transition-colors">About</Link>
            <Link to="/contact" className="font-body-md text-on-surface-variant pb-1 hover:text-primary transition-colors">Contact</Link>
          </div>
          <Link to="/booking" className="flex items-center gap-2 bg-primary text-on-primary px-6 py-2 rounded-full font-label-md hover:scale-105 transition-all">
            Book Appointment
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-xl px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-lg text-center">
          <h1 className="font-headline-xl text-headline-xl text-primary mb-4">Our Services</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Discover our range of professional nail care services designed to pamper you and make your nails look stunning.
          </p>
        </header>

        {/* Filter Chips */}
        <div className="flex flex-wrap justify-center gap-4 mb-lg">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-2 rounded-full border font-label-md transition-all ${
                selectedCategory === cat.id
                  ? 'bg-primary text-on-primary'
                  : 'border-outline-variant text-on-surface-variant hover:bg-primary-container hover:text-on-primary-container'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-soft group hover:shadow-hover transition-all"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=250&fit=crop'
                  }}
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline-md text-headline-md text-on-surface">{service.name}</h3>
                  <span className="font-headline-md text-primary">{service.price}</span>
                </div>
                <p className="text-on-surface-variant font-body-md mb-2">{service.description}</p>
                <p className="text-label-sm text-on-surface-variant mb-4">{service.duration}</p>
                <Link
                  to="/booking"
                  className="inline-block w-full text-center bg-primary text-on-primary px-6 py-3 rounded-full font-label-md hover:opacity-90 transition-all"
                >
                  Book Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-xl grid grid-cols-1 md:grid-cols-4 gap-gutter">
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
              <li><Link to="/gallery" className="font-body-md text-on-surface-variant hover:text-primary underline">Gallery</Link></li>
              <li><Link to="/about" className="font-body-md text-on-surface-variant hover:text-primary underline">About</Link></li>
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
            <p className="font-label-sm text-on-surface-variant">(555) 123-4567</p>
          </div>
        </div>
        <div className="border-t border-outline-variant py-6 text-center">
          <p className="font-label-sm text-on-surface-variant">© 2026 Thuy's Nail Salon. All rights reserved.</p>
        </div>
      </footer>

      {/* Floating Action Button */}
      <Link to="/booking" className="fixed bottom-8 right-8 bg-primary text-on-primary w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all z-40">
        <span className="material-symbols-outlined text-3xl">calendar_month</span>
      </Link>
    </div>
  )
}

export default ServicesPage
