import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { galleryData, categories } from '../../utils/constants'

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [hoveredImage, setHoveredImage] = useState(null)

  const filteredImages = selectedCategory === 'all'
    ? galleryData
    : galleryData.filter(img => img.category === selectedCategory)

  const displayedImages = filteredImages.slice(0, 6)

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
          <h2 className="section-title">Nail Design Gallery</h2>
          <p className="section-subtitle">
            Browse our collection of beautiful nail designs for inspiration
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-rose-pink text-white shadow-hover'
                  : 'bg-light-gray text-gray-600 hover:bg-soft-pink'
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {displayedImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-xl group cursor-pointer"
              onMouseEnter={() => setHoveredImage(image.id)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <img
                src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop"
                alt={image.title}
                className="w-full h-48 md:h-56 lg:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${
                hoveredImage === image.id ? 'opacity-100' : 'opacity-0'
              }`}>
                <div className="absolute bottom-4 left-4 right-4">
                  <h4 className="text-white font-semibold text-sm">{image.title}</h4>
                  <p className="text-white/80 text-xs">{image.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Link to="/gallery" className="btn-secondary">
            View All Designs
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Gallery
