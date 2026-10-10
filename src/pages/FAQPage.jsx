import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaWhatsapp, FaChevronDown, FaChevronUp, FaQuestionCircle, FaCalendarAlt, FaMoneyBill, FaCar, FaShoppingBag, FaClock, FaCreditCard } from 'react-icons/fa'
import { supabaseDb } from '../lib/supabase'

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null)
  const [salonInfo, setSalonInfo] = useState({ phone: '(555) 123-4567', hours: 'Tue-Sun: 9am - 7pm' })

  useEffect(() => {
    loadSalonInfo()
  }, [])

  const loadSalonInfo = async () => {
    try {
      const { data } = await supabaseDb.getSalonInfo()
      if (data) {
        const infoObj = {}
        data.forEach(item => {
          infoObj[item.key] = item.value
        })
        setSalonInfo({
          phone: infoObj.phone || '(555) 123-4567',
          hours: infoObj.hours || 'Tue-Sun: 9am - 7pm'
        })
      }
    } catch (error) {
      console.error('Error loading salon info:', error)
    }
  }

  const faqs = [
    // Booking
    {
      category: 'Booking & Appointments',
      icon: FaCalendarAlt,
      questions: [
        {
          q: 'How do I book an appointment?',
          a: 'You can book an appointment directly on our website by clicking the "Book Appointment" button. Select your desired service, choose a date and time that works for you, and confirm your booking. You will receive a confirmation notification.'
        },
        {
          q: 'Can I walk in without an appointment?',
          a: 'While we accept walk-ins based on availability, we highly recommend booking an appointment to ensure we can accommodate you at your preferred time. Walk-ins may experience longer wait times during peak hours.'
        },
        {
          q: 'How far in advance should I book?',
          a: 'We recommend booking at least 1-2 days in advance, especially for weekend appointments. For special occasions or holiday periods, we suggest booking 1-2 weeks ahead.'
        },
        {
          q: 'How will I know if my booking is confirmed?',
          a: 'After booking, you will see a confirmation page on our website. We will also update your booking status in the "My Bookings" section of your dashboard. You can log in anytime to check your booking status.'
        },
      ]
    },
    // Cancellation
    {
      category: 'Cancellation Policy',
      icon: FaQuestionCircle,
      questions: [
        {
          q: 'What is your cancellation policy?',
          a: 'We require at least 24 hours notice for any cancellations or rescheduling. This allows us to accommodate other clients waiting for appointments. Please contact us via WhatsApp or call us directly to modify or cancel your booking.'
        },
        {
          q: 'What happens if I miss my appointment?',
          a: 'If you miss your appointment without prior notice, we may not be able to reschedule without a new booking. We understand emergencies happen, so please contact us as soon as possible if you cannot make your appointment.'
        },
        {
          q: 'Can I reschedule my appointment?',
          a: 'Yes! You can reschedule your appointment by logging into your dashboard or contacting us via WhatsApp at least 24 hours before your scheduled time. We will do our best to accommodate your new preferred time.'
        },
      ]
    },
    // Payment
    {
      category: 'Payment & Pricing',
      icon: FaMoneyBill,
      questions: [
        {
          q: 'Do you require a deposit?',
          a: 'For most appointments, no deposit is required. However, for extensive nail art, bridal services, or group bookings, we may require a small deposit to secure your appointment.'
        },
        {
          q: 'What payment methods do you accept?',
          a: 'We accept cash, credit cards, debit cards, and mobile payments. Please inquire about available payment options when you arrive.'
        },
        {
          q: 'Are prices the same for all nail lengths?',
          a: 'Base prices are for standard nail lengths. Additional fees may apply for extra-long nails, complex nail art designs, or nail repairs. We will provide an exact quote before starting any service.'
        },
      ]
    },
    // Parking & Location
    {
      category: 'Location & Parking',
      icon: FaCar,
      questions: [
        {
          q: 'Is there parking available?',
          a: 'Yes, there is street parking available near our salon. We also recommend using public transportation or rideshare services when possible.'
        },
        {
          q: 'How do I find your salon?',
          a: 'Our address is provided on the Contact page. You can also click on the address in the footer of our website to open Google Maps for directions.'
        },
      ]
    },
    // What to Bring
    {
      category: 'What to Bring',
      icon: FaShoppingBag,
      questions: [
        {
          q: 'What should I bring to my appointment?',
          a: 'Just bring yourself! We provide all necessary tools, polishes, and equipment. If you have any inspiration photos or specific design ideas, feel free to bring them along or show us on your phone.'
        },
        {
          q: 'Should I remove old nail polish before coming?',
          a: 'No need! We will remove any existing nail polish as part of our service preparation. Just come as you are.'
        },
        {
          q: 'Can I bring my own nail polish or designs?',
          a: 'Absolutely! If you have a specific polish color or design in mind, feel free to bring it. We want to make sure you leave with exactly what you envisioned.'
        },
      ]
    },
    // Services
    {
      category: 'Services & Duration',
      icon: FaClock,
      questions: [
        {
          q: 'How long does a typical appointment take?',
          a: `Service duration varies: Manicure (45-60 min), Pedicure (60-75 min), Gel Nails (90-120 min), Nail Art (additional 20-30 min). ${salonInfo.hours}`
        },
        {
          q: 'Do you offer services for special occasions?',
          a: 'Yes! We specialize in bridal, engagement, prom, and other special occasion nail services. Please book in advance and mention your event so we can allocate enough time.'
        },
        {
          q: 'Can I get both manicure and pedicure in one visit?',
          a: 'Absolutely! We can安排 perform both services in one visit. Just select both services when booking or ask our staff to help you combine services.'
        },
      ]
    },
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  let globalIndex = 0

  return (
    <div className="bg-surface text-on-surface font-body-md">
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

      {/* Hero */}
      <section className="bg-gradient-to-r from-pink-500 to-rose-500 py-20">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
              Everything you need to know about our services, booking, and policies.
            </p>
            <a
              href={`https://wa.me/${salonInfo.phone.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-medium hover:shadow-lg transition-all"
            >
              <FaWhatsapp />
              Ask Us on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: FaCalendarAlt, text: 'Book Appointment', link: '/booking' },
              { icon: FaQuestionCircle, text: 'Contact Us', link: '/contact' },
              { icon: FaCreditCard, text: 'View Services', link: '/services' },
              { icon: FaWhatsapp, text: 'WhatsApp', link: `https://wa.me/${salonInfo.phone.replace(/\D/g, '')}` },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {item.link.startsWith('http') ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-surface rounded-xl hover:bg-pink-50 transition-colors"
                  >
                    <item.icon className="text-pink-500 text-xl" />
                    <span className="text-gray-700 font-medium">{item.text}</span>
                  </a>
                ) : (
                  <Link
                    to={item.link}
                    className="flex items-center gap-3 p-4 bg-surface rounded-xl hover:bg-pink-50 transition-colors"
                  >
                    <item.icon className="text-pink-500 text-xl" />
                    <span className="text-gray-700 font-medium">{item.text}</span>
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="container-custom max-w-4xl">
          {faqs.map((category, catIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIndex * 0.1 }}
              className="mb-8"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                  <category.icon className="text-pink-500 text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{category.category}</h2>
              </div>

              {/* Questions */}
              <div className="space-y-2">
                {category.questions.map((faq) => {
                  const currentIndex = globalIndex
                  globalIndex++
                  return (
                    <div
                      key={currentIndex}
                      className="bg-white rounded-xl shadow-sm overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFAQ(currentIndex)}
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-gray-800 pr-4">{faq.q}</span>
                        {openIndex === currentIndex ? (
                          <FaChevronUp className="text-pink-500 flex-shrink-0" />
                        ) : (
                          <FaChevronDown className="text-gray-400 flex-shrink-0" />
                        )}
                      </button>
                      {openIndex === currentIndex && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-5 pb-5"
                        >
                          <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                        </motion.div>
                      )}
                    </div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-pink-50">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Still have questions?</h2>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Can't find the answer you're looking for? Reach out to us directly and we'll get back to you as soon as possible.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`https://wa.me/${salonInfo.phone.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-4 rounded-full font-medium hover:bg-green-600 transition-all shadow-lg"
              >
                <FaWhatsapp size={24} />
                Chat on WhatsApp
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-medium hover:opacity-90 transition-all shadow-lg"
              >
                <FaQuestionCircle />
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="container-custom text-center">
          <Link to="/" className="text-pink-500 hover:underline">Back to Home</Link>
          <p className="text-gray-500 text-sm mt-4">© {new Date().getFullYear()} Thuy's Nail. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default FAQPage
