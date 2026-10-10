import React from 'react'
import { FaHeart, FaHands, FaLeaf, FaStar, FaGlobe, FaShieldAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'

const About = () => {
  const features = [
    { icon: FaHeart, text: 'Friendly Staff' },
    { icon: FaShieldAlt, text: 'Clean Environment' },
    { icon: FaStar, text: 'Affordable Prices' },
    { icon: FaLeaf, text: 'Quality Products' },
    { icon: FaGlobe, text: 'English-speaking Service' },
    { icon: FaHands, text: 'Expert Technicians' },
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title">About Thuy's Nail</h2>
          <p className="section-subtitle">
            A cozy neighborhood nail salon where every client feels like family
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-soft">
              <img
                src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800&h=600&fit=crop"
                alt="Thuy's Nail Salon Interior"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-rose-pink text-white px-6 py-3 rounded-xl shadow-soft">
              <p className="font-semibold">Est. 2015</p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-gray-600 leading-relaxed">
              At Thuy's Nail, we believe that beautiful nails should be accessible to everyone.
              Our small, cozy salon provides a warm and welcoming atmosphere where you can relax
              and enjoy professional nail care services.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We specialize in serving international customers, ensuring clear communication
              and understanding of your desired nail designs. Our team of experienced technicians
              uses only high-quality products to give you the perfect nails you deserve.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <feature.icon className="text-rose-pink text-lg" />
                  <span className="text-sm text-gray-700 font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <p className="text-sm text-rose-pink font-medium">
                Proudly serving international clients since 2015
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
