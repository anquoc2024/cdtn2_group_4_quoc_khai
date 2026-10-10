import React, { createContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export const AdminContext = createContext()

export const AdminProvider = ({ children }) => {
  const [blockedDates, setBlockedDates] = useState([])
  const [blockedTimes, setBlockedTimes] = useState([])
  const [customDesigns, setCustomDesigns] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    loadBlockedDates()
    loadBlockedTimes()
    loadDesigns()
  }, [])

  const loadBlockedDates = async () => {
    try {
      const { data, error } = await supabase
        .from('blocked_dates')
        .select('*')
        .order('blocked_date')
      if (data) setBlockedDates(data || [])
    } catch (e) {
      console.log('Load blocked dates error:', e)
    }
  }

  const loadBlockedTimes = async () => {
    try {
      const { data, error } = await supabase
        .from('blocked_times')
        .select('*')
      if (data) setBlockedTimes(data || [])
    } catch (e) {
      console.log('Load blocked times error:', e)
    }
  }

  const loadDesigns = async () => {
    try {
      const { data, error } = await supabase
        .from('designs')
        .select('*')
      if (data) setCustomDesigns((data || []).filter(d => d.is_custom))
    } catch (e) {
      console.log('Load designs error:', e)
    }
  }

  // Blocked Dates
  const addBlockedDate = async (date, reason = 'Unavailable') => {
    try {
      const { data, error } = await supabase
        .from('blocked_dates')
        .insert({ blocked_date: date, reason })
        .select()
        .single()
      if (data) setBlockedDates(prev => [...prev, data])
      return { success: !error, error }
    } catch (e) {
      return { success: false, error: e.message }
    }
  }

  const removeBlockedDate = async (id) => {
    try {
      const { error } = await supabase
        .from('blocked_dates')
        .delete()
        .eq('id', id)
      if (!error) setBlockedDates(prev => prev.filter(d => d.id !== id))
      return { success: !error, error }
    } catch (e) {
      return { success: false, error: e.message }
    }
  }

  // Blocked Times
  const addBlockedTime = async (date, time) => {
    try {
      const { data, error } = await supabase
        .from('blocked_times')
        .insert({ blocked_date: date, blocked_time: time })
        .select()
        .single()
      if (data) setBlockedTimes(prev => [...prev, data])
      return { success: !error, error }
    } catch (e) {
      return { success: false, error: e.message }
    }
  }

  const removeBlockedTime = async (id) => {
    try {
      const { error } = await supabase
        .from('blocked_times')
        .delete()
        .eq('id', id)
      if (!error) setBlockedTimes(prev => prev.filter(t => t.id !== id))
      return { success: !error, error }
    } catch (e) {
      return { success: false, error: e.message }
    }
  }

  // Check if date/time is blocked
  const isDateBlocked = (date) => {
    return blockedDates.some(d => d.blocked_date === date)
  }

  const isTimeBlocked = (date, time) => {
    return blockedTimes.some(t => t.blocked_date === date && t.blocked_time === time)
  }

  // Designs
  const addDesign = async (design) => {
    try {
      const { data, error } = await supabase
        .from('designs')
        .insert({ ...design, is_custom: true })
        .select()
        .single()
      if (data) setCustomDesigns(prev => [...prev, data])
      return { success: !error, error }
    } catch (e) {
      return { success: false, error: e.message }
    }
  }

  const deleteDesign = async (id) => {
    try {
      const { error } = await supabase.from('designs').delete().eq('id', id)
      if (!error) {
        setCustomDesigns(prev => prev.filter(d => d.id !== id))
      }
      return { success: !error, error }
    } catch (e) {
      return { success: false, error: e.message }
    }
  }

  return (
    <AdminContext.Provider value={{
      blockedDates, blockedTimes, customDesigns, isLoading,
      loadBlockedDates, loadBlockedTimes, loadDesigns,
      addBlockedDate, removeBlockedDate,
      addBlockedTime, removeBlockedTime,
      isDateBlocked, isTimeBlocked,
      addDesign, deleteDesign
    }}>
      {children}
    </AdminContext.Provider>
  )
}
