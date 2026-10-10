export const servicesData = [
  {
    id: 1,
    name: 'Classic Manicure',
    description: 'Traditional nail care with polish application',
    price: '$25',
    image: '/images/services/classic-manicure.jpg',
    duration: '45 min',
    category: 'manicure'
  },
  {
    id: 2,
    name: 'Gel Polish',
    description: 'Long-lasting gel polish with UV curing',
    price: '$35',
    image: '/images/services/gel-polish.jpg',
    duration: '60 min',
    category: 'gel'
  },
  {
    id: 3,
    name: 'Pedicure',
    description: 'Complete foot care and nail treatment',
    price: '$40',
    image: '/images/services/pedicure.jpg',
    duration: '60 min',
    category: 'pedicure'
  },
  {
    id: 4,
    name: 'Nail Art',
    description: 'Creative and custom nail designs',
    price: '$30',
    image: '/images/services/nail-art.jpg',
    duration: '45-90 min',
    category: 'art'
  },
  {
    id: 5,
    name: 'Acrylic Nails',
    description: 'Durable acrylic extensions with shaping',
    price: '$45',
    image: '/images/services/acrylic-nails.jpg',
    duration: '90 min',
    category: 'acrylic'
  },
  {
    id: 6,
    name: 'Gel Extensions',
    description: 'Natural-looking gel nail extensions',
    price: '$50',
    image: '/images/services/gel-extensions.jpg',
    duration: '90-120 min',
    category: 'gel'
  }
]

export const galleryData = [
  {
    id: 1,
    category: 'simple',
    image: '/images/gallery/simple/design1.jpg',
    title: 'Simple Pink Nails',
    description: 'Clean and elegant pink manicure'
  },
  {
    id: 2,
    category: 'simple',
    image: '/images/gallery/simple/design2.jpg',
    title: 'Nude Elegance',
    description: 'Classic nude nail design'
  },
  {
    id: 3,
    category: 'cute',
    image: '/images/gallery/cute/design1.jpg',
    title: 'Cute Floral Nails',
    description: 'Adorable floral patterns'
  },
  {
    id: 4,
    category: 'cute',
    image: '/images/gallery/cute/design2.jpg',
    title: 'Pastel Rainbow',
    description: 'Colorful pastel design'
  },
  {
    id: 5,
    category: 'korean',
    image: '/images/gallery/korean/design1.jpg',
    title: 'Korean Minimalist',
    description: 'Clean Korean-inspired style'
  },
  {
    id: 6,
    category: 'korean',
    image: '/images/gallery/korean/design2.jpg',
    title: 'Korean Glass Nails',
    description: 'Trendy glass nail art'
  },
  {
    id: 7,
    category: 'ombre',
    image: '/images/gallery/ombre/design1.jpg',
    title: 'Pink Ombre',
    description: 'Beautiful gradient effect'
  },
  {
    id: 8,
    category: 'ombre',
    image: '/images/gallery/ombre/design2.jpg',
    title: 'Sunset Ombre',
    description: 'Warm sunset colors'
  },
  {
    id: 9,
    category: 'wedding',
    image: '/images/gallery/wedding/design1.jpg',
    title: 'Bridal Elegance',
    description: 'Perfect for your special day'
  },
  {
    id: 10,
    category: 'wedding',
    image: '/images/gallery/wedding/design2.jpg',
    title: 'Pearl Wedding Nails',
    description: 'Classic pearl accents'
  },
  {
    id: 11,
    category: 'glitter',
    image: '/images/gallery/glitter/design1.jpg',
    title: 'Glitter Party',
    description: 'Sparkling glitter design'
  },
  {
    id: 12,
    category: 'glitter',
    image: '/images/gallery/glitter/design2.jpg',
    title: 'Champagne Glitter',
    description: 'Elegant champagne sparkle'
  }
]

export const reviewsData = [
  {
    id: 1,
    name: 'Sarah Johnson',
    country: 'USA',
    flag: '🇺🇸',
    rating: 5,
    review: 'Best nail salon in town! The staff is incredibly friendly and professional. My nails always look perfect!'
  },
  {
    id: 2,
    name: 'Maria Garcia',
    country: 'Spain',
    flag: '🇪🇸',
    rating: 5,
    review: 'I love coming here. The atmosphere is so relaxing and the nail art is amazing. Highly recommend!'
  },
  {
    id: 3,
    name: 'Yuki Tanaka',
    country: 'Japan',
    flag: '🇯🇵',
    rating: 5,
    review: 'The Korean-style nail designs are beautiful. They pay attention to every detail. My go-to salon!'
  },
  {
    id: 4,
    name: 'Emma Wilson',
    country: 'UK',
    flag: '🇬🇧',
    rating: 4,
    review: 'Great service and reasonable prices. The staff speaks English well, which made me feel comfortable.'
  },
  {
    id: 5,
    name: 'Lisa Chen',
    country: 'Singapore',
    flag: '🇸🇬',
    rating: 5,
    review: 'Absolutely love my nails! The technicians are skilled and the salon is always clean and welcoming.'
  },
  {
    id: 6,
    name: 'Anna Kovacs',
    country: 'Hungary',
    flag: '🇭🇺',
    rating: 5,
    review: 'Perfect place for beautiful nails. They have so many designs to choose from. Book in advance!'
  }
]

export const categories = [
  { id: 'all', name: 'All Designs' },
  { id: 'simple', name: 'Simple' },
  { id: 'cute', name: 'Cute' },
  { id: 'korean', name: 'Korean Style' },
  { id: 'ombre', name: 'Ombre' },
  { id: 'wedding', name: 'Wedding' },
  { id: 'glitter', name: 'Glitter' }
]

export const bookingSteps = [
  { id: 1, label: 'Browse Gallery', icon: '🖼️' },
  { id: 2, label: 'Select Design', icon: '💅' },
  { id: 3, label: 'Login/Register', icon: '🔐' },
  { id: 4, label: 'Choose Service', icon: '📋' },
  { id: 5, label: 'Pick Date & Time', icon: '📅' },
  { id: 6, label: 'Confirm Booking', icon: '✅' }
]

export const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
  '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM'
]
