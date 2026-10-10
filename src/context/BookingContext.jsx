import React, { createContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export const BookingContext = createContext()

export const BookingProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedDesign, setSelectedDesign] = useState(null)
  const [selectedService, setSelectedService] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [services, setServices] = useState([])
  const [designs, setDesigns] = useState([])
  const [bookings, setBookings] = useState([])
  const [allBookings, setAllBookings] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // Load data tu Supabase
  useEffect(() => {
    loadServices()
    loadDesigns()
    loadBookings()
  }, [])

  const loadServices = async () => {
    try {
      const { data, error } = await supabase.from('services').select('*').order('created_at')
      if (data) setServices(data)
    } catch (e) {
      console.log('Load services error:', e)
    }
  }

  const loadDesigns = async () => {
    try {
      const { data, error } = await supabase.from('designs').select('*').order('created_at')
      if (data) setDesigns(data)
    } catch (e) {
      console.log('Load designs error:', e)
    }
  }

  const loadBookings = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (data) {
        setBookings(data)
        setAllBookings(data)
      }
    } catch (e) {
      console.log('Load bookings error:', e)
    } finally {
      setIsLoading(false)
    }
  }

  const createBooking = async (user, { service, design, date, time }) => {
    if (!service || !date || !time) {
      return { success: false, error: 'Vui long chon dich vu, ngay va gio' }
    }

    setIsLoading(true)
    try {
      const insertData = {
        user_name: user?.name,
        user_email: user?.email,
        service_name: service.name,
        service_price: typeof service.price === 'number' ? `$${service.price}` : service.price,
        design_name: design?.name,
        design_image: design?.image || design?.image_url,
        booking_date: date,
        booking_time: time,
        status: 'pending'
      }

      // Add UUIDs only if they look like UUIDs
      if (user?.id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(user.id)) {
        insertData.user_id = user.id
      }
      if (service?.id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(service.id)) {
        insertData.service_id = service.id
      }
      if (design?.id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(design.id)) {
        insertData.design_id = design.id
      }

      const { data, error } = await supabase
        .from('bookings')
        .insert([insertData])
        .select()
        .single()

      if (error) throw error

      if (data) {
        setBookings(prev => [data, ...prev])
        setAllBookings(prev => [data, ...prev])
        resetBooking()
      }

      return { success: true, booking: data }
    } catch (e) {
      return { success: false, error: e.message }
    } finally {
      setIsLoading(false)
    }
  }

  const updateBookingStatus = async (id, status, notes = null) => {
    try {
      const updateData = { status }
      if (notes) {
        updateData.notes = notes
      }

      const { data, error } = await supabase
        .from('bookings')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      if (data) {
        setBookings(prev => prev.map(b => b.id === id ? data : b))
        setAllBookings(prev => prev.map(b => b.id === id ? data : b))
      }
      return { success: true }
    } catch (e) {
      return { success: false, error: e.message }
    }
  }

  const deleteBooking = async (id) => {
    try {
      const { error } = await supabase.from('bookings').delete().eq('id', id)
      if (error) throw error
      
      setBookings(prev => prev.filter(b => b.id !== id))
      setAllBookings(prev => prev.filter(b => b.id !== id))
      return { success: true }
    } catch (e) {
      return { success: false, error: e.message }
    }
  }

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 6))
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1))

  const resetBooking = () => {
    setCurrentStep(1)
    setSelectedDesign(null)
    setSelectedService(null)
    setSelectedDate(null)
    setSelectedTime(null)
  }

  const calculateRevenue = () => {
    return allBookings
      .filter(b => b.status === 'confirmed' || b.status === 'completed')
      .reduce((total, b) => {
        const price = parseFloat(b.service_price?.replace('$', '') || 0)
        return total + price
      }, 0)
  }

  return (
    <BookingContext.Provider value={{
      currentStep, setCurrentStep,
      selectedDesign, setSelectedDesign,
      selectedService, setSelectedService,
      selectedDate, setSelectedDate,
      selectedTime, setSelectedTime,
      services, designs, bookings, allBookings, isLoading,
      loadServices, loadDesigns, loadBookings,
      createBooking, updateBookingStatus, deleteBooking,
      nextStep, prevStep, resetBooking, calculateRevenue
    }}>
      {children}
    </BookingContext.Provider>
  )
}
