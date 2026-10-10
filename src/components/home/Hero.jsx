import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center relative overflow-hidden bg-light-beige">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/hero/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15
        }}
      />

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-soft-pink rounded-full opacity-20 blur-3xl" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-rose-pink rounded-full opacity-10 blur-3xl" />

      <div className="container-custom relative z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
              Beautiful Nails,
              <br />
              <span className="text-rose-pink">Friendly Service</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-lg">
              Browse our nail designs and easily book your next appointment online.
              Your perfect nails are just a click away!
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/gallery" className="btn-primary">
                View Nail Designs
              </Link>
              <Link to="/booking" className="btn-secondary">
                Book Appointment
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-6">
              <div>
                <p className="text-2xl font-bold text-rose-pink">500+</p>
                <p className="text-sm text-gray-600">Happy Clients</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-rose-pink">1000+</p>
                <p className="text-sm text-gray-600">Nail Designs</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-rose-pink">4.9</p>
                <p className="text-sm text-gray-600">Average Rating</p>
              </div>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-soft">
              <img
                src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&h=600&fit=crop"
                alt="Nail technician working with customer"
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-soft">
                <p className="text-sm font-semibold text-gray-800">Book Now & Get 10% Off</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
