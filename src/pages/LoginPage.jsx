import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login, register, isAdmin } = useAuth()
  const navigate = useNavigate()

  // Check if user was redirected from booking
  const redirectAfterLogin = localStorage.getItem('redirectAfterLogin') || '/dashboard'

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const result = await login(email, password)
      if (result.success) {
        // Clear redirect flag
        localStorage.removeItem('redirectAfterLogin')
        // Navigate to intended destination or admin dashboard
        if (result.user?.role === 'admin') {
          navigate('/admin')
        } else {
          navigate(redirectAfterLogin)
        }
      } else {
        setError(result.error || 'Login failed. Please try again.')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const result = await register({ name, email, password })
      if (result.success) {
        // Clear redirect flag
        localStorage.removeItem('redirectAfterLogin')
        // Navigate to intended destination
        navigate(redirectAfterLogin)
      } else {
        setError(result.error || 'Registration failed. Please try again.')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface font-body-md text-on-surface">
      <main className="flex-grow flex items-center justify-center p-4 md:p-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="bg-surface-container-lowest w-full max-w-6xl min-h-[700px] flex flex-col md:flex-row rounded-xl overflow-hidden shadow-soft"
        >
          {/* Left Side: Aesthetic Visuals & Branding */}
          <div className="relative w-full md:w-1/2 overflow-hidden bg-primary-container">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&h=1000&fit=crop)'
              }}
            />
            <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px]" />
            {/* Branding Overlay */}
            <div className="relative h-full flex flex-col justify-between p-margin-desktop text-on-primary">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[32px]">spa</span>
                <h1 className="font-headline-md text-headline-md font-semibold tracking-tight">Thuy's Nail</h1>
              </div>
              <div className="max-w-md">
                <h2 className="font-headline-xl text-headline-xl mb-base">Your self-care sanctuary.</h2>
                <p className="font-body-lg text-body-lg opacity-90 leading-relaxed">
                  Sign in to save your favorite designs and manage your appointments.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="flex -space-x-3 overflow-hidden">
                  <div className="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed font-label-sm">JD</div>
                  <div className="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-primary-fixed flex items-center justify-center text-on-primary-fixed font-label-sm">AL</div>
                  <div className="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed font-label-sm">MS</div>
                </div>
                <div className="text-label-sm font-label-sm flex items-center">
                  Join 500+ locals today
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Forms */}
          <div className="w-full md:w-1/2 p-margin-mobile md:p-margin-desktop flex flex-col justify-center">
            {/* Tabs */}
            <div className="mb-lg">
              <div className="flex space-x-base">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`px-6 py-2 rounded-full font-label-md transition-all duration-300 ${
                    isLogin
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`px-6 py-2 rounded-full font-label-md transition-all duration-300 ${
                    !isLogin
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  Register
                </button>
              </div>
            </div>

            {/* Login Form */}
            {isLogin && (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-md"
              >
                <div className="mb-md">
                  <h3 className="font-headline-lg text-headline-lg text-primary mb-xs">Welcome Back</h3>
                  <p className="font-body-md text-on-surface-variant">Please enter your details to sign in.</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-xs">
                    <label className="font-label-sm text-on-surface-variant block">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-md py-4 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary-container transition-all outline-none"
                      placeholder="hello@yourmail.com"
                      required
                    />
                  </div>
                  <div className="space-y-xs">
                    <div className="flex justify-between items-center">
                      <label className="font-label-sm text-on-surface-variant block">Password</label>
                      <a className="text-label-sm text-primary hover:underline" href="#">Forgot password?</a>
                    </div>
                    <div className="relative">
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-md py-4 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary-container transition-all outline-none"
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 py-2">
                    <input className="rounded border-outline-variant text-primary focus:ring-primary-container w-5 h-5 transition-all" id="remember" type="checkbox" />
                    <label className="font-label-md text-on-surface-variant cursor-pointer" htmlFor="remember">Remember me for 30 days</label>
                  </div>
                  {error && (
                    <div className="bg-error-container text-on-error-container p-3 rounded-xl text-sm">
                      {error}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-tertiary text-on-tertiary font-label-md py-4 rounded-xl transition-all hover:opacity-90 active:scale-[0.98] shadow-md flex items-center justify-center gap-2"
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                    {!isLoading && <span className="material-symbols-outlined text-[20px]">login</span>}
                  </button>
                </form>
                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-outline-variant"></div>
                  </div>
                  <div className="relative flex justify-center text-label-sm uppercase tracking-widest">
                    <span className="bg-surface-container-lowest px-4 text-on-surface-variant">Or continue with</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-3 border border-outline-variant py-3 rounded-xl hover:bg-surface-container-low transition-all">
                    <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path></svg>
                    <span className="font-label-sm">Google</span>
                  </button>
                  <button className="flex items-center justify-center gap-3 border border-outline-variant py-3 rounded-xl hover:bg-surface-container-low transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.988 1.57-.12 0-.243 0-.363-.03-.03-1.14.516-2.34 1.154-3.12.802-1.002 2.067-1.66 3.107-1.66.103 0 .213 0 .267.03.03.03.03.03.03.13zm3.133 12.03c.03 2.133 1.883 2.856 1.91 2.887-.03.03-.297.96-.967 1.937-.584.827-1.19 1.65-2.107 1.65-.89 0-1.177-.54-2.197-.54-1.033 0-1.34.526-2.183.556-.89.03-1.603-.89-2.187-1.727-1.21-1.743-2.133-4.913-.883-7.073.623-1.077 1.733-1.76 2.943-1.777 1.05-.017 1.883.673 2.457.673s1.61-.837 2.853-.71c.523.023 2.01.213 2.96 1.603-.077.047-1.77.103-1.8 2.52zM12 23.03c4.137 0 5.677-2.73 5.713-2.763l-.013-.007C17.663 20.227 12 20.227 12 23.03z"></path></svg>
                    <span className="font-label-sm">Apple</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Register Form */}
            {!isLogin && (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-md"
              >
                <div className="mb-md">
                  <h3 className="font-headline-lg text-headline-lg text-primary mb-xs">Join our Community</h3>
                  <p className="font-body-md text-on-surface-variant">Let's create your personal account.</p>
                </div>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-xs">
                      <label className="font-label-sm text-on-surface-variant block">First Name</label>
                      <input
                        type="text"
                        value={name.split(' ')[0] || ''}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-md py-4 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary-container outline-none"
                        placeholder="Your first name"
                        required
                      />
                    </div>
                    <div className="space-y-xs">
                      <label className="font-label-sm text-on-surface-variant block">Last Name</label>
                      <input
                        type="text"
                        className="w-full px-md py-4 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary-container outline-none"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>
                  <div className="space-y-xs">
                    <label className="font-label-sm text-on-surface-variant block">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-md py-4 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary-container outline-none"
                      placeholder="hello@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-xs">
                    <label className="font-label-sm text-on-surface-variant block">Create Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-md py-4 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary-container outline-none"
                      placeholder="Create a password"
                      required
                    />
                    <p className="text-[10px] text-on-surface-variant mt-1">Must be at least 8 characters with a number.</p>
                  </div>
                  {error && (
                    <div className="bg-error-container text-on-error-container p-3 rounded-xl text-sm">
                      {error}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary text-on-primary font-label-md py-4 rounded-xl transition-all hover:opacity-90 active:scale-[0.98] shadow-md"
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </button>
                  <p className="text-label-sm text-on-surface-variant text-center pt-2">
                    By registering, you agree to our <a className="text-primary underline" href="#">Terms</a> and <a className="text-primary underline" href="#">Privacy Policy</a>.
                  </p>
                </form>
              </motion.div>
            )}

            <div className="mt-xl text-center">
              <p className="font-label-sm text-on-surface-variant">
                Questions? Call us at <span className="font-semibold text-primary">(555) 123-4567</span>
              </p>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="w-full py-base bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-margin-desktop flex flex-col md:flex-row justify-between items-center text-on-surface-variant font-label-sm opacity-60">
          <p>© 2024 Thuy's Nail Salon. All rights reserved.</p>
          <div className="flex gap-gutter mt-2 md:mt-0">
            <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
            <a className="hover:text-primary transition-colors" href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LoginPage
