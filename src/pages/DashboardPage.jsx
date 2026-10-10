import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'
import { useBooking } from '../hooks/useBooking'
import { FaUser, FaCalendarCheck, FaHistory, FaSignOutAlt, FaCheck, FaTimes } from 'react-icons/fa'

const DashboardPage = () => {
  const { user, logout } = useAuth()
  const { bookings, updateBookingStatus, isLoading } = useBooking()
  const [activeTab, setActiveTab] = useState('bookings')

  const tabs = [
    { id: 'bookings', label: 'My Bookings', icon: FaCalendarCheck },
    { id: 'profile', label: 'Profile', icon: FaUser },
    { id: 'history', label: 'History', icon: FaHistory },
  ]

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      await updateBookingStatus(bookingId, 'cancelled')
    }
  }

  return (
    <div className="min-h-screen py-20 px-4 md:px-10 bg-surface font-body-md text-on-surface">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-soft p-6 mb-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center text-primary text-2xl font-bold">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <h2 className="font-headline-lg text-headline-lg text-primary">
                    Welcome, {user?.name || 'User'}!
                  </h2>
                  <p className="text-on-surface-variant">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="flex items-center space-x-2 text-on-surface-variant hover:text-primary transition-colors"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-2 mb-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-primary text-on-primary shadow-soft'
                    : 'bg-surface-container-lowest text-on-surface-variant hover:bg-primary-container'
                }`}
              >
                <tab.icon />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-soft p-6 min-h-[400px]">
            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <div>
                <h3 className="font-headline-lg text-headline-lg text-primary mb-6">My Appointments</h3>
                {bookings.filter(b => (b.status === 'pending' || b.status === 'confirmed') && b.user_email === user?.email).length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-on-surface-variant mb-4">You don't have any appointments.</p>
                    <a
                      href="/booking"
                      className="inline-block bg-primary text-on-primary px-6 py-3 rounded-full font-label-md hover:opacity-90 transition-all"
                    >
                      Book Now
                    </a>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings
                      .filter(b => (b.status === 'pending' || b.status === 'confirmed') && b.user_email === user?.email)
                      .map((booking) => (
                        <div
                          key={booking.id}
                          className="border border-outline-variant rounded-xl p-4 hover:shadow-soft transition-all"
                        >
                          <div className="flex flex-wrap justify-between items-start gap-4">
                            <div>
                              <h4 className="font-headline-md text-on-surface">
                                {booking.service_name || 'Service'}
                              </h4>
                              <p className="text-on-surface-variant text-label-sm">
                                {booking.design_name || 'Design'}
                              </p>
                              <div className="flex items-center space-x-4 mt-2 text-on-surface-variant text-label-sm">
                                <span>📅 {booking.booking_date}</span>
                                <span>⏰ {booking.booking_time}</span>
                              </div>
                            </div>
                            <div className="flex flex-col items-end space-y-2">
                              <span className="text-primary font-headline-md">
                                {booking.service_price}
                              </span>
                              <span className={`text-label-sm font-medium px-2 py-1 rounded-full ${
                                booking.status === 'confirmed'
                                  ? 'bg-green-100 text-green-600'
                                  : 'bg-yellow-100 text-yellow-600'
                              }`}>
                                {booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                              </span>
                              <button
                                onClick={() => handleCancelBooking(booking.id)}
                                disabled={isLoading}
                                className="text-error hover:text-error-container transition-colors text-label-sm disabled:opacity-50"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <h3 className="font-headline-lg text-headline-lg text-primary mb-6">Profile Settings</h3>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-label-sm text-on-surface-variant mb-2">Full Name</label>
                    <input
                      type="text"
                      value={user?.name || ''}
                      className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/50 transition-all"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-label-sm text-on-surface-variant mb-2">Email Address</label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/50 transition-all"
                      disabled
                    />
                  </div>
                  <button className="bg-primary text-on-primary px-6 py-3 rounded-full font-label-md hover:opacity-90 transition-all">
                    Update Profile
                  </button>
                </div>
              </div>
            )}

            {/* History Tab */}
            {activeTab === 'history' && (
              <div>
                <h3 className="font-headline-lg text-headline-lg text-primary mb-6">Booking History</h3>
                {bookings.filter(b => b.user_email === user?.email).length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-on-surface-variant">No booking history found.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings
                      .filter(b => b.user_email === user?.email)
                      .map((booking) => (
                        <div
                          key={booking.id}
                          className="border border-outline-variant rounded-xl p-4"
                        >
                          <div className="flex flex-wrap justify-between items-start gap-4">
                            <div>
                              <h4 className="font-headline-md text-on-surface">
                                {booking.service_name || 'Service'}
                              </h4>
                              <p className="text-on-surface-variant text-label-sm">
                                {booking.design_name || 'Design'}
                              </p>
                              <div className="flex items-center space-x-4 mt-2 text-on-surface-variant text-label-sm">
                                <span>📅 {booking.booking_date}</span>
                                <span>⏰ {booking.booking_time}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-primary font-headline-md">
                                {booking.service_price}
                              </span>
                              <p className={`text-label-sm font-medium mt-1 ${
                                booking.status === 'confirmed'
                                  ? 'text-green-600'
                                  : booking.status === 'pending'
                                  ? 'text-yellow-600'
                                  : 'text-error'
                              }`}>
                                {booking.status === 'confirmed' ? (
                                  <span className="flex items-center gap-1 justify-end"><FaCheck /> Confirmed</span>
                                ) : booking.status === 'pending' ? (
                                  <span className="flex items-center gap-1 justify-end">⏳ Pending</span>
                                ) : (
                                  <span className="flex items-center gap-1 justify-end"><FaTimes /> Cancelled</span>
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default DashboardPage
