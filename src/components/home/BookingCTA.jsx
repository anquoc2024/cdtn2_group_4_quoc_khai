import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../hooks/useAuth'

const BookingCTA = () => {
  const { isAuthenticated } = useAuth()

  return (
    <section className="py-20 bg-rose-pink relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-white mb-4">
            Ready to Get Beautiful Nails?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Book your appointment today and experience the best nail care service in town.
            Your perfect nails are waiting for you!
          </p>
          <Link
            to={isAuthenticated ? '/booking' : '/login'}
            className="inline-block bg-white text-rose-pink px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-hover active:scale-95"
          >
            Book Appointment Now
          </Link>
          <p className="text-white/80 text-sm mt-4">
            {!isAuthenticated && 'Please login to book an appointment'}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default BookingCTA
