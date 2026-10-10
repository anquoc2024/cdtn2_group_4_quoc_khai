import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaInstagram } from 'react-icons/fa'

const ContactPage = () => {
  const contactInfo = [
    { icon: FaMapMarkerAlt, label: 'Address', value: '123 Neighborhood Way, Cozy Studio District' },
    { icon: FaPhone, label: 'Phone', value: '(555) 123-4567' },
    { icon: FaEnvelope, label: 'Email', value: 'hello@thuysnail.com' },
    { icon: FaClock, label: 'Hours', value: 'Tue-Sun: 9am - 7pm' },
  ]

  return (
    <div className="bg-surface text-on-surface font-body-md">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-surface shadow-soft">
        <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 w-full max-w-7xl mx-auto">
          <Link to="/" className="font-headline-md text-headline-md font-semibold text-primary">Thuy's Nail</Link>
          <div className="hidden md:flex gap-gutter items-center">
            <Link to="/" className="font-body-md text-on-surface-variant pb-1 hover:text-primary transition-colors">Home</Link>
            <Link to="/services" className="font-body-md text-on-surface-variant pb-1 hover:text-primary transition-colors">Services</Link>
            <Link to="/gallery" className="font-body-md text-on-surface-variant pb-1 hover:text-primary transition-colors">Nail Gallery</Link>
            <Link to="/about" className="font-body-md text-on-surface-variant pb-1 hover:text-primary transition-colors">About</Link>
            <Link to="/contact" className="font-body-md text-primary border-b-2 border-primary pb-1">Contact</Link>
          </div>
          <Link to="/booking" className="flex items-center gap-2 bg-primary text-on-primary px-6 py-2 rounded-full font-label-md hover:scale-105 transition-all">
            Book Appointment
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-xl px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="font-headline-xl text-headline-xl text-primary mb-4">Contact Us</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Get in touch with us. We'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {contactInfo.map((item, index) => (
              <div key={index} className="flex items-start space-x-4 p-6 bg-surface-container-lowest rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center text-primary flex-shrink-0">
                  <item.icon size={20} />
                </div>
                <div>
                  <p className="text-label-sm text-on-surface-variant">{item.label}</p>
                  <p className="font-headline-md text-on-surface">{item.value}</p>
                </div>
              </div>
            ))}

            {/* Social Links */}
            <div className="pt-4">
              <p className="text-label-sm text-on-surface-variant mb-4">Follow Us</p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-on-primary transition-all hover:scale-110 hover:shadow-soft"
                >
                  <FaFacebook size={20} />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-on-primary transition-all hover:scale-110 hover:shadow-soft"
                >
                  <FaInstagram size={20} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden shadow-soft h-80 lg:h-auto"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316bb7c0ed%3A0xb8d4db8b6a2e8c8!2sNail%20Salon!5e0!3m2!1sen!2sus!4v1648820000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Thuy's Nail Location"
              className="min-h-[400px]"
            />
          </motion.div>
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-surface-container-lowest rounded-3xl p-8 md:p-12 shadow-soft"
        >
          <h2 className="font-headline-lg text-headline-lg text-primary text-center mb-8">Send Us a Message</h2>
          <form className="max-w-xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-label-sm text-on-surface-variant mb-2">Your Name</label>
                <input
                  type="text"
                  className="w-full bg-surface-container-low border-none rounded-xl py-4 px-6 focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-label-sm text-on-surface-variant mb-2">Email Address</label>
                <input
                  type="email"
                  className="w-full bg-surface-container-low border-none rounded-xl py-4 px-6 focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="hello@example.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-label-sm text-on-surface-variant mb-2">Message</label>
              <textarea
                rows={5}
                className="w-full bg-surface-container-low border-none rounded-xl py-4 px-6 focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                placeholder="How can we help you?"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-primary text-on-primary px-10 py-4 rounded-full font-label-md hover:opacity-90 transition-all shadow-md"
              >
                Send Message
              </button>
            </div>
          </form>
        </motion.div>
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
            <p className="font-label-sm text-on-surface-variant">(555) 123-4567</p>
          </div>
        </div>
        <div className="border-t border-outline-variant py-6 text-center">
          <p className="font-label-sm text-on-surface-variant">© 2026 Thuy's Nail Salon. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default ContactPage
