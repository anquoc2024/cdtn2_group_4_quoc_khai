import React, { createContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const savedUser = localStorage.getItem('thuys_user')
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
        setIsAuthenticated(true)
      } catch (err) {
        localStorage.removeItem('thuys_user')
      }
    }
    setIsLoading(false)
  }

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single()

      if (error || !data) {
        throw new Error('Email hoac mat khau khong dung')
      }

      setUser(data)
      setIsAuthenticated(true)
      localStorage.setItem('thuys_user', JSON.stringify(data))
      return { success: true, user: data }
    } catch (err) {
      setError(err.message || 'Dang nhap that bai')
      return { success: false, error: err.message }
    } finally {
      setIsLoading(false)
    }
  }

  const register = async ({ name, email, password }) => {
    setIsLoading(true)
    setError(null)
    try {
      // Kiem tra email da ton tai
      const { data: existing } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .single()

      if (existing) {
        throw new Error('Email da duoc dang ky')
      }

      const { data, error } = await supabase
        .from('users')
        .insert({ email, password, name, role: 'user' })
        .select()
        .single()

      if (error) throw error

      setUser(data)
      setIsAuthenticated(true)
      localStorage.setItem('thuys_user', JSON.stringify(data))
      return { success: true, user: data }
    } catch (err) {
      setError(err.message || 'Dang ky that bai')
      return { success: false, error: err.message }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('thuys_user')
    setError(null)
  }

  const isAdmin = user?.role === 'admin'

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isAdmin,
      isLoading,
      error,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}
