import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaBars, FaTimes, FaUser, FaSignOutAlt, FaCog } from 'react-icons/fa'
import { useAuth } from '../../hooks/useAuth'
import { supabaseDb } from '../../lib/supabase'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [salonInfo, setSalonInfo] = useState({ name: "Thuy's Nail", logo: null })
  const { user, logout, isAuthenticated, isAdmin } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
          logo: infoObj.logo || null
        })
      }
    } catch (error) {
      console.error('Error loading salon info:', error)
    }
  }

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Nail Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-surface/95 backdrop-blur-md shadow-soft' : 'bg-surface'
      }`}
    >
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            {salonInfo.logo ? (
              <img src={salonInfo.logo} alt={salonInfo.name} className="h-16 md:h-20 w-auto object-contain" />
            ) : (
              <span className="text-2xl md:text-3xl font-bold text-primary font-playfair">{salonInfo.name}</span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-gutter">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="font-body-md text-on-surface-variant pb-1 hover:text-primary transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-4">
            {isAdmin && (
              <Link
                to="/admin"
                className="flex items-center space-x-2 text-tertiary hover:text-primary transition-colors"
                title="Admin Dashboard"
              >
                <FaCog />
                <span>Admin</span>
              </Link>
            )}
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 text-on-surface-variant hover:text-primary transition-colors"
                >
                  <FaUser />
                  <span>{user?.name || 'Account'}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-on-surface-variant hover:text-primary transition-colors"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-on-surface-variant hover:text-primary transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-on-surface-variant hover:text-primary transition-colors"
                >
                  Register
                </Link>
              </>
            )}
            <Link
              to="/booking"
              className="bg-primary text-on-primary px-6 py-2 rounded-full font-label-md hover:opacity-90 transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-xl">calendar_month</span>
              Book
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-2xl text-primary"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-0 top-20 bg-surface z-40 transition-all duration-300 ${
            isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
        >
          <div className="flex flex-col items-center justify-start pt-8 space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xl text-on-surface-variant hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <hr className="w-3/4 border-outline-variant" />
            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xl text-tertiary hover:text-primary transition-colors flex items-center gap-2"
              >
                <FaCog /> Admin Dashboard
              </Link>
            )}
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xl text-on-surface-variant hover:text-primary transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout()
                    setIsMobileMenuOpen(false)
                  }}
                  className="text-xl text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xl text-on-surface-variant hover:text-primary transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xl text-on-surface-variant hover:text-primary transition-colors"
                >
                  Register
                </Link>
              </>
            )}
            <Link
              to="/booking"
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-primary text-on-primary px-8 py-3 rounded-full font-label-md flex items-center gap-2"
            >
              <span className="material-symbols-outlined">calendar_month</span>
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
