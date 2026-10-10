import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaCheckCircle, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp, FaHome, FaArrowLeft } from 'react-icons/fa'
import { supabaseDb } from '../lib/supabase'

const BookingSuccessPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [booking, setBooking] = useState(null)
  const [salonInfo, setSalonInfo] = useState({
    name: "Thuy's Nail",
    address: '123 Neighborhood Way',
    phone: '(555) 123-4567',
    email: 'hello@thuysnail.com',
    hours: 'Tue-Sun: 9am - 7pm',
    map_url: ''
  })

  useEffect(() => {
    // Get booking from location state or localStorage
    const bookingData = location.state?.booking
    if (bookingData) {
      setBooking(bookingData)
    } else {
      // Try to get from localStorage
      const stored = localStorage.getItem('lastBooking')
      if (stored) {
        setBooking(JSON.parse(stored))
      }
    }
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
          address: infoObj.address || '123 Neighborhood Way',
          phone: infoObj.phone || '(555) 123-4567',
          email: infoObj.email || 'hello@thuysnail.com',
          hours: infoObj.hours || 'Tue-Sun: 9am - 7pm',
          map_url: infoObj.map_url || ''
        })
      }
    } catch (error) {
      console.error('Error loading salon info:', error)
    }
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Không tìm thấy thông tin đặt lịch</p>
          <Link to="/" className="text-primary hover:underline">Về trang chủ</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
          >
            <FaArrowLeft />
            <span>Back to Home</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <FaCheckCircle className="text-green-500 text-5xl" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Booking Confirmed!
          </h1>
          <p className="text-gray-600 text-lg">
            Thank you for booking with {salonInfo.name}! We look forward to seeing you.
          </p>
        </motion.div>

        {/* Booking Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">{salonInfo.name}</h2>
                <p className="text-white/80 text-sm">Booking Confirmation</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-white/80">Booking ID</p>
                <p className="font-mono text-sm">#{booking.id?.slice(0, 8).toUpperCase() || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="p-6 md:p-8">
            {/* Service Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FaCalendarAlt className="text-pink-500 text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-semibold text-gray-800 text-lg">
                    {booking.booking_date ? new Date(booking.booking_date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : 'N/A'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FaClock className="text-pink-500 text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-semibold text-gray-800 text-lg">{booking.booking_time || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Service & Design */}
            <div className="border-t border-gray-100 pt-6 mb-6">
              <h3 className="text-sm text-gray-500 mb-3">Your Selection</h3>
              <div className="space-y-3">
                {booking.service_name && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Service</span>
                    <span className="font-medium text-gray-800">{booking.service_name}</span>
                  </div>
                )}
                {booking.service_price && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Price</span>
                    <span className="font-medium text-gray-800">{booking.service_price}</span>
                  </div>
                )}
                {booking.design_name && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Nail Design</span>
                    <span className="font-medium text-gray-800">{booking.design_name}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Status */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="font-medium text-yellow-800">Pending Confirmation</p>
                  <p className="text-sm text-yellow-600">We will confirm your booking soon. Please wait for our confirmation.</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/dashboard"
                className="flex-1 bg-primary text-white text-center py-4 rounded-xl font-medium hover:bg-pink-600 transition-colors"
              >
                View My Bookings
              </Link>
              <a
                href={`https://wa.me/${salonInfo.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi! I just booked an appointment for ${booking.booking_date} at ${booking.booking_time}. Thank you!`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-500 text-white text-center py-4 rounded-xl font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
              >
                <FaWhatsapp />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </motion.div>

        {/* Salon Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl shadow-lg p-6 md:p-8"
        >
          <h3 className="font-bold text-gray-800 mb-4">Salon Information</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FaMapMarkerAlt className="text-gray-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Address</p>
                <a
                  href={salonInfo.map_url || `https://maps.google.com/?q=${encodeURIComponent(salonInfo.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:text-primary transition-colors"
                >
                  {salonInfo.address}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FaPhone className="text-gray-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <a href={`tel:${salonInfo.phone}`} className="text-gray-800 hover:text-primary transition-colors">
                  {salonInfo.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FaClock className="text-gray-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Business Hours</p>
                <p className="text-gray-800">{salonInfo.hours}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <Link
              to="/faq"
              className="text-primary hover:underline text-sm flex items-center gap-2"
            >
              <FaArrowLeft size={14} />
              View FAQ & Cancellation Policy
            </Link>
          </div>
        </motion.div>

        {/* Reminder */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 text-center text-gray-500 text-sm"
        >
          <p>Please arrive 10 minutes early for your appointment.</p>
          <p>Need to reschedule or cancel? Contact us at least 24 hours in advance.</p>
        </motion.div>
      </div>
    </div>
  )
}

export default BookingSuccessPage
