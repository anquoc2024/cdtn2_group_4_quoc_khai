// RegisterPage is now integrated into LoginPage with tabs
// This file is kept for backwards compatibility but redirects to LoginPage
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const RegisterPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/login', { replace: true })
  }, [navigate])

  return null
}

export default RegisterPage
