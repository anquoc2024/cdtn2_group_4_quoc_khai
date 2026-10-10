import React from 'react'
import { motion } from 'framer-motion'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaInstagram } from 'react-icons/fa'

const Contact = () => {
  const contactInfo = [
    { icon: FaMapMarkerAlt, label: 'Address', value: '123 Main Street, City' },
    { icon: FaPhone, label: 'Phone', value: '+1 (555) 123-4567' },
    { icon: FaEnvelope, label: 'Email', value: 'hello@thuysnail.com' },
    { icon: FaClock, label: 'Hours', value: 'Mon-Sat: 9:00 AM - 7:00 PM' },
  ]

  return (
    <section className="section-padding bg-light-gray">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Contact Us</h2>
          <p className="section-subtitle">
            Get in touch with us for any questions or to book your appointment
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {contactInfo.map((item, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-soft-pink rounded-xl flex items-center justify-center text-rose-pink flex-shrink-0">
                  <item.icon size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{item.label}</p>
                  <p className="text-gray-800 font-medium">{item.value}</p>
                </div>
              </div>
            ))}

            {/* Social Links */}
            <div className="pt-4">
              <p className="text-sm text-gray-500 mb-3">Follow Us</p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-12 h-12 bg-rose-pink rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:shadow-hover"
                >
                  <FaFacebook size={20} />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-rose-pink rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:shadow-hover"
                >
                  <FaInstagram size={20} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
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
              className="min-h-[300px]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
