import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaSpa, FaHeart, FaStar, FaGlobe, FaMapMarkerAlt, FaClock, FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaWhatsapp, FaQuoteLeft, FaCheckCircle, FaCalendarAlt } from 'react-icons/fa'
import { supabaseDb } from '../lib/supabase'

const HomePage = () => {
  const [salonInfo, setSalonInfo] = useState({
    name: "Thuy's Nail",
    address: '123 Neighborhood Way, City',
    phone: '(555) 123-4567',
    email: 'hello@thuysnail.com',
    hours: 'Tue-Sun: 9am - 7pm',
    facebook: '#',
    instagram: '#',
    map_url: ''
  })
  const [services, setServices] = useState([])

  useEffect(() => {
    loadSalonInfo()
    loadServices()
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
          address: infoObj.address || '123 Neighborhood Way, City',
          phone: infoObj.phone || '(555) 123-4567',
          email: infoObj.email || 'hello@thuysnail.com',
          hours: infoObj.hours || 'Tue-Sun: 9am - 7pm',
          facebook: infoObj.facebook || '#',
          instagram: infoObj.instagram || '#',
          map_url: infoObj.map_url || ''
        })
      }
    } catch (error) {
      console.error('Error loading salon info:', error)
    }
  }

  const loadServices = async () => {
    try {
      const { data } = await supabaseDb.getServices()
      if (data && data.length > 0) {
        setServices(data.slice(0, 6)) // Show max 6 services
      }
    } catch (error) {
      console.error('Error loading services:', error)
    }
  }

  const features = [
    { icon: FaHeart, text: 'Friendly Staff' },
    { icon: FaStar, text: 'Premium Products' },
    { icon: FaGlobe, text: 'English-speaking' },
    { icon: FaSpa, text: 'Expert Technicians' },
  ]

  const testimonials = [
    {
      name: 'Sarah M.',
      text: 'Best nail salon I have ever been to! The staff is super friendly and they speak great English.',
      rating: 5
    },
    {
      name: 'Jennifer K.',
      text: 'Love my nails! The designs are beautiful and they take their time to make everything perfect.',
      rating: 5
    },
    {
      name: 'Lisa T.',
      text: 'Finally a nail salon where I can communicate clearly. Great service and amazing results!',
      rating: 5
    }
  ]

  const galleryImages = [
    'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=400&h=400&fit=crop',
  ]

  return (
    <div className="bg-surface font-body-md text-on-surface">
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

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-container/30 to-surface"></div>
          <div className="absolute top-20 right-20 w-64 h-64 bg-soft-pink rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-rose-pink rounded-full opacity-10 blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="font-headline-xl text-headline-xl text-primary leading-tight">
                Beautiful Nails,<br />
                <span className="text-tertiary">Friendly Service</span>
              </h1>
              <p className="font-body-lg text-on-surface-variant max-w-lg">
                Your neighborhood escape for nail artistry and relaxation. Where every detail matters.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/booking" className="bg-primary text-on-primary px-8 py-4 rounded-full font-label-md hover:opacity-90 transition-all shadow-lg flex items-center gap-2">
                  <FaCalendarAlt className="text-xl" />
                  Book Appointment
                </Link>
                <a
                  href={`https://wa.me/${salonInfo.phone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white px-8 py-4 rounded-full font-label-md hover:bg-green-600 transition-all shadow-lg flex items-center gap-2"
                >
                  <FaWhatsapp size={20} />
                  WhatsApp Us
                </a>
              </div>

              <div className="flex gap-8 pt-6">
                <div>
                  <p className="text-3xl font-headline-md text-primary">500+</p>
                  <p className="text-sm text-on-surface-variant">Happy Clients</p>
                </div>
                <div>
                  <p className="text-3xl font-headline-md text-primary">100+</p>
                  <p className="text-sm text-on-surface-variant">Nail Designs</p>
                </div>
                <div>
                  <p className="text-3xl font-headline-md text-primary">4.9</p>
                  <p className="text-sm text-on-surface-variant">Average Rating</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-soft">
                <img
                  src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&h=600&fit=crop"
                  alt="Beautiful nail art"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-primary text-on-primary px-6 py-3 rounded-xl shadow-soft">
                <p className="font-label-md">Book Now & Get 10% Off</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-surface">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-surface-container-low rounded-2xl"
              >
                <div className="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="text-primary text-2xl" />
                </div>
                <p className="font-label-md text-on-surface">{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services & Pricing Section */}
      <section className="py-20 bg-light-beige">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-headline-xl text-primary mb-4">Services & Pricing</h2>
            <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Professional nail care services with transparent pricing
            </p>
          </motion.div>

          {services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-surface rounded-2xl overflow-hidden shadow-soft group hover:shadow-hover transition-all"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={service.image_url || 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=250&fit=crop'}
                      alt={service.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-headline-md text-on-surface">{service.name}</h3>
                      <span className="font-headline-md text-primary">{service.price}</span>
                    </div>
                    <p className="text-sm text-on-surface-variant mb-1">{service.description}</p>
                    <p className="text-xs text-primary font-medium">⏱ {service.duration}</p>
                    <button
                      onClick={() => {
                        localStorage.setItem('selectedService', JSON.stringify(service))
                        window.location.href = '/booking'
                      }}
                      className="mt-4 inline-block w-full text-center bg-primary text-on-primary px-6 py-3 rounded-xl font-label-md hover:opacity-90 transition-all"
                    >
                      Book Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              Loading services...
            </div>
          )}

          <div className="text-center mt-10">
            <Link to="/services" className="border-2 border-primary text-primary px-8 py-4 rounded-full font-label-md hover:bg-primary hover:text-on-primary transition-all">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 bg-surface">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-headline-xl text-primary mb-4">Nail Design Gallery</h2>
            <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Browse our collection of beautiful nail designs for inspiration
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="aspect-square rounded-xl overflow-hidden shadow-soft group hover:shadow-hover transition-all cursor-pointer"
              >
                <Link to="/gallery">
                  <img
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/gallery" className="border-2 border-primary text-primary px-8 py-4 rounded-full font-label-md hover:bg-primary hover:text-on-primary transition-all">
              View All Designs
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-primary-container">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-headline-xl text-primary mb-4">What Our Clients Say</h2>
            <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Don't just take our word for it
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-surface rounded-2xl p-6 shadow-soft"
              >
                <FaQuoteLeft className="text-primary text-3xl mb-4" />
                <p className="text-on-surface mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-on-surface">{testimonial.name}</p>
                  <div className="flex text-yellow-500">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} size={14} />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-rose-500">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-headline-xl text-white mb-4">Ready to Get Beautiful Nails?</h2>
            <p className="font-body-lg text-white/90 mb-8 max-w-xl mx-auto">
              Book your appointment today and experience the best nail care service.
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
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-surface-container-lowest">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="font-headline-xl text-primary">Contact Us</h2>
              <div className="space-y-4">
                {salonInfo.address && (
                  <a
                    href={salonInfo.map_url || `https://maps.google.com/?q=${encodeURIComponent(salonInfo.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start space-x-4 hover:bg-surface p-2 rounded-lg transition-colors"
                  >
                    <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center text-primary flex-shrink-0">
                      <FaMapMarkerAlt />
                    </div>
                    <div>
                      <p className="text-sm text-on-surface-variant">Address</p>
                      <p className="font-label-md text-on-surface hover:text-primary">{salonInfo.address}</p>
                      <p className="text-xs text-primary">Click to view on map</p>
                    </div>
                  </a>
                )}
                {salonInfo.phone && (
                  <a
                    href={`tel:${salonInfo.phone}`}
                    className="flex items-center space-x-4 hover:bg-surface p-2 rounded-lg transition-colors"
                  >
                    <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center text-primary flex-shrink-0">
                      <FaPhone />
                    </div>
                    <div>
                      <p className="text-sm text-on-surface-variant">Call Us</p>
                      <p className="font-label-md text-on-surface hover:text-primary">{salonInfo.phone}</p>
                    </div>
                  </a>
                )}
                {salonInfo.email && (
                  <a
                    href={`mailto:${salonInfo.email}`}
                    className="flex items-center space-x-4 hover:bg-surface p-2 rounded-lg transition-colors"
                  >
                    <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center text-primary flex-shrink-0">
                      <FaEnvelope />
                    </div>
                    <div>
                      <p className="text-sm text-on-surface-variant">Email</p>
                      <p className="font-label-md text-on-surface hover:text-primary">{salonInfo.email}</p>
                    </div>
                  </a>
                )}
                {salonInfo.hours && (
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center text-primary flex-shrink-0">
                      <FaClock />
                    </div>
                    <div>
                      <p className="text-sm text-on-surface-variant">Hours</p>
                      <p className="font-label-md text-on-surface">{salonInfo.hours}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-4 pt-4">
                {salonInfo.facebook && (
                  <a
                    href={salonInfo.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-on-primary hover:opacity-90 transition-all"
                  >
                    <FaFacebook />
                  </a>
                )}
                {salonInfo.instagram && (
                  <a
                    href={salonInfo.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-on-primary hover:opacity-90 transition-all"
                  >
                    <FaInstagram />
                  </a>
                )}
                <a
                  href={`https://wa.me/${salonInfo.phone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white hover:opacity-90 transition-all"
                >
                  <FaWhatsapp />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-soft min-h-[400px]"
            >
              {salonInfo.map_url ? (
                <iframe
                  src={salonInfo.map_url}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '400px' }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Location"
                />
              ) : (
                <div className="w-full h-full min-h-[400px] bg-surface-container flex items-center justify-center">
                  <div className="text-center">
                    <FaMapMarkerAlt className="text-6xl text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Add Google Maps URL in Admin panel</p>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(salonInfo.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 bg-primary text-on-primary px-6 py-2 rounded-full"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
