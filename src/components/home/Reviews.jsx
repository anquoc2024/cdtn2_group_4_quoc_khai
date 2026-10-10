import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { reviewsData } from '../../utils/constants'
import { FaStar } from 'react-icons/fa'

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const reviewsPerPage = 3

  const visibleReviews = reviewsData.slice(currentIndex, currentIndex + reviewsPerPage)

  const nextReviews = () => {
    if (currentIndex + reviewsPerPage < reviewsData.length) {
      setCurrentIndex(prev => prev + reviewsPerPage)
    } else {
      setCurrentIndex(0)
    }
  }

  const prevReviews = () => {
    if (currentIndex - reviewsPerPage >= 0) {
      setCurrentIndex(prev => prev - reviewsPerPage)
    } else {
      setCurrentIndex(Math.max(0, reviewsData.length - reviewsPerPage))
    }
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={i < rating ? 'text-yellow-400' : 'text-gray-300'}
        size={16}
      />
    ))
  }

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
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle">
            Real reviews from our happy customers around the world
          </p>
        </motion.div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-soft-pink flex items-center justify-center text-rose-pink font-bold text-lg">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{review.name}</h4>
                    <p className="text-sm text-gray-500">
                      {review.flag} {review.country}
                    </p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {renderStars(review.rating)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  "{review.review}"
                </p>
              </motion.div>
            ))}
          </div>

          {/* Navigation Buttons */}
          {reviewsData.length > reviewsPerPage && (
            <div className="flex justify-center mt-8 space-x-4">
              <button
                onClick={prevReviews}
                className="w-10 h-10 rounded-full bg-light-gray hover:bg-soft-pink transition-colors flex items-center justify-center text-gray-600 hover:text-rose-pink"
              >
                Prev
              </button>
              <button
                onClick={nextReviews}
                className="w-10 h-10 rounded-full bg-light-gray hover:bg-soft-pink transition-colors flex items-center justify-center text-gray-600 hover:text-rose-pink"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Reviews
