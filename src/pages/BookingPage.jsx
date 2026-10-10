import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'
import { useBooking } from '../hooks/useBooking'
import { useAdmin } from '../hooks/useAdmin'

const BookingPage = () => {
  const { isAuthenticated, user } = useAuth()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedDesign, setSelectedDesign] = useState(null)
  const [selectedService, setSelectedService] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [calendarDate, setCalendarDate] = useState(new Date())

  const totalSteps = 6

  // Check auth and redirect
  useEffect(() => {
    if (!isAuthenticated) {
      // Store intended destination
      localStorage.setItem('redirectAfterLogin', '/booking')
    }
  }, [isAuthenticated])

  // Auto-skip if design or service was selected from gallery/home
  useEffect(() => {
    let newStep = 1
    let hasDesign = false
    let hasService = false

    // Check if user came with a preselected design
    const preselectedDesign = localStorage.getItem('selectedDesign')
    if (preselectedDesign) {
      try {
        const design = JSON.parse(preselectedDesign)
        setSelectedDesign(design)
        hasDesign = true
        localStorage.removeItem('selectedDesign')
      } catch (e) {
        console.log('Error parsing preselected design:', e)
      }
    }

    // Check if user came with a preselected service
    const preselectedService = localStorage.getItem('selectedService')
    if (preselectedService) {
      try {
        const service = JSON.parse(preselectedService)
        setSelectedService(service)
        hasService = true
        localStorage.removeItem('selectedService')
      } catch (e) {
        console.log('Error parsing preselected service:', e)
      }
    }

    // Determine starting step based on selections
    if (hasDesign && hasService) {
      newStep = 3 // Skip to Account step
    } else if (hasDesign || hasService) {
      newStep = 4 // Skip to Services step (if design selected) or Schedule step (if service selected)
    }

    if (newStep > 1) {
      setCurrentStep(newStep)
    }
  }, [])

  const { blockedDates, blockedTimes, customDesigns } = useAdmin()
  const { createBooking } = useBooking()

  // Calendar navigation
  const prevMonth = () => {
    setCalendarDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
  }
  const nextMonth = () => {
    setCalendarDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
  }

  // Get days in month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const days = []
    
    // Add empty slots for days before first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }
    // Add days of month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }
    return days
  }

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  const updateProgress = () => {
    return ((currentStep - 1) / (totalSteps - 1)) * 100
  }

  const designs = [
    { id: 1, name: 'Modern French', desc: 'Timeless elegance with a subtle metallic accent.', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=250&fit=crop' },
    { id: 2, name: 'Abstract Blush', desc: 'Free-flowing shapes for a unique, artistic statement.', image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=400&h=250&fit=crop' },
    { id: 3, name: 'Rose Gold Shimmer', desc: 'Elegant rose gold glitter design.', image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400&h=250&fit=crop' },
    { id: 4, name: 'Spring Daisies', desc: 'Cute floral nail art.', image: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=400&h=250&fit=crop' },
    { id: 5, name: 'Classic Nude', desc: 'Natural and elegant nude look.', image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=400&h=250&fit=crop' },
    { id: 6, name: 'Bridal Lace', desc: 'Perfect for your special day.', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=250&fit=crop' },
  ]

  // Merge default designs with custom admin designs
  const allDesigns = [...designs, ...customDesigns.map(d => ({
    id: d.id,
    name: d.title,
    desc: d.description,
    image: d.image,
    isCustom: true
  }))]

  const services = [
    { id: 1, name: 'Signature Gel Manicure', duration: '60 mins', desc: 'Long-lasting, high-gloss finish', price: 45 },
    { id: 2, name: 'Deluxe Spa Pedicure', duration: '75 mins', desc: 'Includes sea salt soak & massage', price: 65 },
    { id: 3, name: 'Nail Art Add-on', duration: '+20 mins', desc: 'From minimalist to complex art', price: 15 },
  ]

  const timeSlots = ['09:00 AM', '10:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:30 PM']

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleFinish = async () => {
    setIsLoading(true)
    try {
      const result = await createBooking(user, {
        service: selectedService,
        design: selectedDesign,
        date: selectedDate,
        time: selectedTime
      })
      setIsLoading(false)
      if (result.success) {
        // Store booking for success page
        localStorage.setItem('lastBooking', JSON.stringify(result.booking))
        navigate('/booking/success', { state: { booking: result.booking } })
      } else {
        alert('Error: ' + (result.error || 'Failed to create booking'))
      }
    } catch (error) {
      setIsLoading(false)
      alert('Error: ' + error.message)
    }
  }

  const progressWidth = updateProgress()

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md p-8"
        >
          <div className="w-20 h-20 mx-auto mb-6 bg-primary-container rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-4xl text-primary">lock</span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-primary mb-4">Login Required</h1>
          <p className="text-on-surface-variant mb-6 font-body-lg">
            You need to be logged in to book an appointment. Please login or create an account.
          </p>
          <Link
            to="/login"
            className="inline-block bg-primary text-on-primary px-8 py-4 rounded-full font-label-md hover:opacity-90 transition-all"
          >
            Login / Register
          </Link>
          <p className="mt-4 text-on-surface-variant text-label-sm">
            Just want to browse?{' '}
            <Link to="/gallery" className="text-primary underline">View our gallery</Link>
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="bg-surface text-on-surface font-body-md overflow-x-hidden">
      {/* Top Navigation */}
      <header className="w-full py-6 px-margin-mobile md:px-margin-desktop flex justify-between items-center bg-surface sticky top-0 z-50">
        <div className="font-headline-md text-headline-md font-semibold text-primary">Thuy's Nail</div>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-primary font-label-md hover:opacity-70 transition-all"
        >
          <span className="material-symbols-outlined">close</span>
          <span>Exit Booking</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-12 min-h-[819px]">
        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4 relative">
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-surface-container-highest -z-10 -translate-y-1/2" />
            <div
              className="absolute top-1/2 left-0 h-[2px] bg-primary -z-10 -translate-y-1/2 transition-all duration-300"
              style={{ width: `${progressWidth}%` }}
            />
            {[1, 2, 3, 4, 5, 6].map((step) => (
              <div
                key={step}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-sm transition-colors ${
                  step < currentStep
                    ? 'bg-primary-container text-primary'
                    : step === currentStep
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-highest text-on-surface-variant'
                }`}
              >
                {step < currentStep ? (
                  <span className="material-symbols-outlined text-sm">check</span>
                ) : (
                  step
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[10px] md:text-label-sm font-label-sm uppercase tracking-widest text-on-surface-variant">
            <span>Gallery</span>
            <span>Design</span>
            <span>Account</span>
            <span>Service</span>
            <span>Schedule</span>
            <span>Confirm</span>
          </div>
        </div>

        {/* Step 1: Browse Gallery */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="font-headline-lg text-headline-lg mb-4 text-center md:text-left">Inspiration Gallery</h1>
            <p className="text-on-surface-variant mb-8 text-center md:text-left">Start by browsing some of our latest creations for inspiration.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-gutter">
              {allDesigns.slice(0, 6).map((design, i) => (
                <div
                  key={design.id}
                  className="aspect-[4/5] bg-surface-container-low rounded-xl overflow-hidden shadow-soft group cursor-pointer hover:shadow-hover transition-all"
                  onClick={handleNext}
                >
                  <img
                    src={design.image}
                    alt={`Design ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=500&fit=crop'
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-12 flex justify-center md:justify-end">
              <button
                onClick={handleNext}
                className="bg-primary text-on-primary px-10 py-4 rounded-full font-label-md hover:shadow-lg transition-all active:scale-95"
              >
                Browse More Designs
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Select Design */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="font-headline-lg text-headline-lg mb-4">Choose Your Base Design</h1>
            <p className="text-on-surface-variant mb-8">Select a style to use as a starting point. We can customize it during your appointment.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              {allDesigns.map((design) => (
                <div
                  key={design.id}
                  onClick={() => {
                    setSelectedDesign(design)
                    setTimeout(handleNext, 400)
                  }}
                  className={`bg-surface-container-lowest p-4 rounded-xl shadow-sm border-2 cursor-pointer transition-all hover:border-primary/20 ${
                    selectedDesign?.id === design.id ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <div className="aspect-video rounded-lg overflow-hidden mb-4">
                    <img src={design.image} alt={design.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-headline-md text-headline-md mb-1">{design.name}</h3>
                      <p className="text-on-surface-variant text-label-sm">{design.desc}</p>
                    </div>
                    {design.isCustom && (
                      <span className="bg-tertiary text-on-tertiary px-2 py-1 rounded-full text-label-sm">Custom</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 flex justify-between items-center">
              <button onClick={handlePrev} className="text-primary font-label-md hover:underline">Back</button>
              <button onClick={handleNext} className="bg-primary text-on-primary px-10 py-4 rounded-full font-label-md hover:shadow-lg transition-all">Next: Services</button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Login/Account (Already logged in, show info) */}
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-md mx-auto text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-primary-container rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl text-primary">check_circle</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg mb-4">Welcome, {user?.name}!</h1>
            <p className="text-on-surface-variant mb-8">You're logged in and ready to book your appointment.</p>
            <div className="bg-surface-container-low p-6 rounded-xl text-left mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-primary text-xl font-bold">
                  {user?.name?.charAt(0)}
                </div>
                <div>
                  <p className="font-headline-md">{user?.name}</p>
                  <p className="text-on-surface-variant text-label-sm">{user?.email}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-start">
              <button onClick={handleNext} className="bg-primary text-on-primary px-10 py-4 rounded-full font-label-md hover:shadow-lg transition-all">Continue to Services</button>
            </div>
            <div className="mt-8 flex justify-start">
              <button onClick={handlePrev} className="text-primary font-label-md hover:underline">Back</button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Choose Service */}
        {currentStep === 4 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="font-headline-lg text-headline-lg mb-4">Select Your Services</h1>
            <p className="text-on-surface-variant mb-8">Choose the treatment that fits your needs today.</p>
            <div className="space-y-4">
              {services.map((service) => (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className={`group flex items-center justify-between p-6 bg-surface-container-lowest rounded-xl shadow-sm border-2 cursor-pointer transition-all hover:border-primary/30 ${
                    selectedService?.id === service.id ? 'border-primary/30 bg-primary-container/20' : 'border-transparent'
                  }`}
                >
                  <div>
                    <h3 className="font-headline-md text-headline-md">{service.name}</h3>
                    <p className="text-on-surface-variant font-body-md">Duration: {service.duration} • {service.desc}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-headline-md text-primary">${service.price}</span>
                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                      selectedService?.id === service.id ? 'bg-primary border-primary' : 'border-primary/30'
                    }`}>
                      {selectedService?.id === service.id && (
                        <span className="material-symbols-outlined text-on-primary text-xs font-bold">check</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 flex justify-between items-center">
              <button onClick={handlePrev} className="text-primary font-label-md hover:underline">Back</button>
              <button onClick={handleNext} className="bg-primary text-on-primary px-10 py-4 rounded-full font-label-md hover:shadow-lg transition-all active:scale-95">Next: Schedule</button>
            </div>
          </motion.div>
        )}

        {/* Step 5: Pick Date & Time */}
        {currentStep === 5 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="font-headline-lg text-headline-lg mb-4">Pick a Time</h1>
            <p className="text-on-surface-variant mb-8">We can't wait to see you. Choose a slot that works for you.</p>

            {/* Blocked Date Warning */}
            {selectedDate && blockedDates.some(d => d.blocked_date === selectedDate) && (
              <div className="bg-error-container text-on-error-container p-4 rounded-xl mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined">warning</span>
                <span>This date is unavailable. Please select another date.</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Calendar */}
              <div>
                <div className="bg-surface-container-low rounded-2xl p-6">
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-headline-md">{monthNames[calendarDate.getMonth()]} {calendarDate.getFullYear()}</span>
                    <div className="flex gap-2">
                      <button onClick={prevMonth} className="p-2 hover:bg-surface-container-highest rounded-full transition-colors">
                        <span className="material-symbols-outlined">chevron_left</span>
                      </button>
                      <button onClick={nextMonth} className="p-2 hover:bg-surface-container-highest rounded-full transition-colors">
                        <span className="material-symbols-outlined">chevron_right</span>
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-2 text-center text-label-sm font-semibold mb-2">
                    <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
                  </div>
                  <div className="grid grid-cols-7 gap-2 text-center">
                    {getDaysInMonth(calendarDate).map((day, i) => {
                      if (day === null) {
                        return <div key={`empty-${i}`} />
                      }
                      const dateStr = `${calendarDate.getFullYear()}-${(calendarDate.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
                      const isBlocked = blockedDates.some(d => d.blocked_date === dateStr)
                      const isSelected = selectedDate === dateStr
                      const today = new Date()
                      today.setHours(0, 0, 0, 0)
                      const checkDate = new Date(dateStr)
                      const isPast = checkDate < today

                      return (
                        <button
                          key={i}
                          onClick={() => !isBlocked && !isPast && setSelectedDate(dateStr)}
                          disabled={isBlocked || isPast || !day}
                          className={`h-10 w-10 flex items-center justify-center rounded-full transition-all ${
                            !day ? '' :
                            isBlocked ? 'bg-error-container/30 text-error line-through cursor-not-allowed' :
                            isPast ? 'text-on-surface-variant/30 cursor-not-allowed' :
                            isSelected ? 'bg-primary text-on-primary font-bold' :
                            'hover:bg-primary-container'
                          }`}
                        >
                          {day}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Blocked dates legend */}
                <div className="mt-4 p-4 bg-surface-container-low rounded-xl">
                  <p className="text-label-sm text-on-surface-variant flex items-center gap-2">
                    <span className="w-4 h-4 bg-error-container/30 rounded"></span>
                    = Unavailable (blocked by admin)
                  </p>
                </div>
              </div>

              {/* Time Selection */}
              <div className="space-y-6">
                <h4 className="text-label-sm uppercase tracking-widest font-semibold text-primary">Available Times</h4>
                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map((time) => {
                    const isBlocked = blockedTimes.some(t => t.blocked_date === selectedDate && t.blocked_time === time)
                    return (
                      <button
                        key={time}
                        onClick={() => !isBlocked && setSelectedTime(time)}
                        disabled={isBlocked || !selectedDate || blockedDates.some(d => d.blocked_date === selectedDate)}
                        className={`py-4 border-2 rounded-xl transition-all font-label-md ${
                          isBlocked
                            ? 'bg-error-container/30 text-error border-error/30 cursor-not-allowed line-through'
                            : !selectedDate
                            ? 'bg-surface-container-lowest border-primary/20 cursor-not-allowed opacity-50'
                            : selectedTime === time
                            ? 'bg-primary text-on-primary border-primary font-bold'
                            : 'border-primary/20 hover:border-primary'
                        }`}
                      >
                        {time}
                      </button>
                    )
                  })}
                </div>
                {selectedDate && (
                  <p className="text-label-sm text-on-surface-variant">
                    {blockedDates.some(d => d.blocked_date === selectedDate)
                      ? 'This day is fully booked/unavailable.'
                      : 'Select a time slot.'}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-12 flex justify-between items-center">
              <button onClick={handlePrev} className="text-primary font-label-md hover:underline">Back</button>
              <button
                onClick={handleNext}
                disabled={!selectedDate || !selectedTime || blockedDates.some(d => d.blocked_date === selectedDate) || blockedTimes.some(t => t.blocked_date === selectedDate && t.blocked_time === selectedTime)}
                className="bg-primary text-on-primary px-10 py-4 rounded-full font-label-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Review Booking
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 6: Confirmation */}
        {currentStep === 6 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-surface-container-lowest rounded-3xl p-8 md:p-12 shadow-soft">
              <h1 className="font-headline-lg text-headline-lg mb-8 text-center">Confirm Your Visit</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Summary */}
                <div>
                  <h3 className="text-label-sm uppercase tracking-widest font-semibold text-primary mb-4">Summary</h3>
                  <ul className="space-y-4">
                    <li className="flex justify-between items-end pb-4 border-b border-outline-variant">
                      <div>
                        <p className="font-headline-md">{selectedService?.name || 'Service'}</p>
                        <p className="text-label-sm text-on-surface-variant">
                          {selectedDate} at {selectedTime}
                        </p>
                      </div>
                      <span className="font-headline-md">${selectedService?.price || 0}.00</span>
                    </li>
                    <li className="flex justify-between items-end">
                      <p className="font-body-md">Subtotal</p>
                      <span className="font-body-md">${selectedService?.price || 0}.00</span>
                    </li>
                    <li className="flex justify-between items-end">
                      <p className="font-body-md">Tax</p>
                      <span className="font-body-md">$5.20</span>
                    </li>
                    <li className="flex justify-between items-end pt-4 border-t border-primary/20">
                      <p className="font-headline-md text-primary">Total</p>
                      <span className="font-headline-md text-primary">${((selectedService?.price || 0) + 5.2).toFixed(2)}</span>
                    </li>
                  </ul>
                </div>
                {/* Design & Message */}
                <div className="space-y-6">
                  <div className="bg-surface-container-low p-6 rounded-2xl flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                      <img
                        src={selectedDesign?.image || 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=100&h=100&fit=crop'}
                        alt="Selected design"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-label-sm font-semibold text-primary uppercase">Selected Style</p>
                      <p className="font-headline-md">{selectedDesign?.name || 'Design'}</p>
                    </div>
                  </div>
                  <div className="bg-primary-container p-6 rounded-2xl">
                    <p className="text-on-primary-container font-body-md italic">
                      "A community-focused studio where every client is known by name. We look forward to treating you!"
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6">
              <button onClick={handlePrev} className="text-primary font-label-md hover:underline order-2 md:order-1">Modify Appointment</button>
              <button
                onClick={handleFinish}
                disabled={isLoading}
                className="w-full md:w-auto bg-primary text-on-primary px-16 py-5 rounded-full font-headline-md shadow-xl hover:scale-105 active:scale-95 transition-all order-1 md:order-2 disabled:opacity-50"
              >
                {isLoading ? 'Booking...' : 'Confirm & Book Now'}
              </button>
            </div>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-xl border-t border-outline-variant">
        <div className="max-w-7xl mx-auto px-margin-desktop py-xl grid grid-cols-1 md:grid-cols-4 gap-gutter">
          <div className="col-span-1 md:col-span-2">
            <div className="font-headline-md text-headline-md text-primary mb-4">Thuy's Nail</div>
            <p className="text-on-surface-variant text-body-md max-w-sm mb-6">
              A warm, approachable neighborhood studio for your personal care and relaxation.
            </p>
          </div>
          <div>
            <h4 className="font-label-md text-primary mb-4">Navigation</h4>
            <ul className="space-y-2 text-on-surface-variant text-label-sm">
              <li><a className="hover:text-primary transition-colors" href="/">Home</a></li>
              <li><a className="hover:text-primary transition-colors" href="/services">Services</a></li>
              <li><a className="hover:text-primary transition-colors" href="/about">About</a></li>
              <li><a className="hover:text-primary transition-colors" href="/contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-label-md text-primary mb-4">Visit Us</h4>
            <p className="text-on-surface-variant text-label-sm">
              123 Neighborhood Way<br />Cozy Studio District<br />Open Tue-Sun: 9am - 7pm
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-margin-desktop py-6 border-t border-outline-variant flex justify-between items-center text-label-sm text-on-surface-variant/60">
          <span>© 2026 Thuy's Nail Salon. All rights reserved.</span>
          <div className="flex gap-6">
            <a className="hover:underline" href="#">Privacy Policy</a>
            <a className="hover:underline" href="#">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default BookingPage
