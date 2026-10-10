import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa'
import { supabaseDb } from '../../lib/supabase'

const Footer = () => {
  const [salonInfo, setSalonInfo] = useState({
    name: "Thuy's Nail",
    address: '',
    phone: '',
    email: '',
    hours: 'Tue-Sun: 9am - 7pm',
    facebook: '',
    instagram: ''
  })
  const [isLoading, setIsLoading] = useState(true)

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
        setSalonInfo(prev => ({ ...prev, ...infoObj }))
      }
    } catch (error) {
      console.error('Error loading salon info:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Nail Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <footer className="bg-light-beige pt-16 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo & About */}
          <div>
            <h2 className="font-playfair text-2xl font-bold text-rose-pink mb-4">
              {salonInfo.name || "Thuy's Nail"}
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Beautiful nails, friendly service. Your neighborhood nail salon for international customers.
            </p>
            <div className="flex space-x-4">
              {salonInfo.facebook && (
                <a
                  href={salonInfo.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rose-pink hover:text-rose-dark transition-colors text-xl"
                  aria-label="Facebook"
                >
                  <FaFacebook />
                </a>
              )}
              {salonInfo.instagram && (
                <a
                  href={salonInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rose-pink hover:text-rose-dark transition-colors text-xl"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-playfair text-lg font-semibold text-gray-800 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-rose-pink transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="font-playfair text-lg font-semibold text-gray-800 mb-4">
              Opening Hours
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <FaClock className="text-rose-pink flex-shrink-0" />
                <span>{salonInfo.hours || 'Tue-Sun: 9am - 7pm'}</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-playfair text-lg font-semibold text-gray-800 mb-4">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              {salonInfo.address && (
                <li className="flex items-start space-x-3">
                  <FaMapMarkerAlt className="text-rose-pink mt-1 flex-shrink-0" />
                  <span>{salonInfo.address}</span>
                </li>
              )}
              {salonInfo.phone && (
                <li className="flex items-center space-x-3">
                  <FaPhone className="text-rose-pink flex-shrink-0" />
                  <span>{salonInfo.phone}</span>
                </li>
              )}
              {salonInfo.email && (
                <li className="flex items-center space-x-3">
                  <FaEnvelope className="text-rose-pink flex-shrink-0" />
                  <span>{salonInfo.email}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} {salonInfo.name || "Thuy's Nail"}. All rights reserved.</p>
          <div className="flex space-x-6 mt-2 md:mt-0">
            <Link to="/privacy" className="hover:text-rose-pink transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-rose-pink transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
