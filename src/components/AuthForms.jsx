import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Loader2, ShieldCheck } from 'lucide-react'
import { signInWithPopup } from 'firebase/auth'
import ahjuLogo from '../../logo.jpg'
import { auth, googleProvider } from '../lib/firebase'

// Use optimized WebP assets for much faster auth page image loading.
const signInImage = new URL('../../signin.webp', import.meta.url).href
const signUpImage = new URL('../../signup_image.webp', import.meta.url).href
const GUEST_CART_SESSION_KEY = 'ahju_cart_session'

const AuthForms = ({ mode = 'login' }) => {
  const isLogin = mode === 'login'
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showUsernameStep, setShowUsernameStep] = useState(false)
  const [username, setUsername] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [usernameLoading, setUsernameLoading] = useState(false)

  const handleGoogleContinue = async () => {
    setError('')
    setIsLoading(true)

    try {
      const firebaseResult = await signInWithPopup(auth, googleProvider)
      const idToken = await firebaseResult.user.getIdToken()

      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://homeless-cassandre-delo-ab483b1e.koyeb.app'
      const guestCartSession = localStorage.getItem(GUEST_CART_SESSION_KEY) || ''
      const response = await fetch(`${apiBaseUrl}/api/auth/google/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_token: idToken, session_key: guestCartSession }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.detail || 'Authentication failed')
      }

      localStorage.setItem('ahju_access_token', data.access)
      localStorage.setItem('ahju_refresh_token', data.refresh)
      localStorage.setItem('ahju_user', JSON.stringify(data.user))

      const shouldPromptUsername = mode === 'register' && data.needs_username
      if (shouldPromptUsername) {
        setShowUsernameStep(true)
      } else {
        navigate('/dashboard')
      }
    } catch (err) {
      setError(err.message || 'Unable to continue with Google')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSetUsername = async (e) => {
    e.preventDefault()
    setUsernameError('')

    const trimmed = username.trim()
    if (!/^[a-zA-Z0-9_]{3,30}$/.test(trimmed)) {
      setUsernameError('Username must be 3-30 chars and use letters, numbers, or underscores only.')
      return
    }

    const accessToken = localStorage.getItem('ahju_access_token')
    if (!accessToken) {
      setUsernameError('Session expired. Please sign in again.')
      return
    }

    setUsernameLoading(true)
    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://homeless-cassandre-delo-ab483b1e.koyeb.app'

      const availabilityRes = await fetch(
        `${apiBaseUrl}/api/users/check-username/?username=${encodeURIComponent(trimmed)}`,
      )
      const availabilityData = await availabilityRes.json()
      if (!availabilityData.available) {
        throw new Error(availabilityData.detail || 'Username is already taken')
      }

      const response = await fetch(`${apiBaseUrl}/api/users/set-username/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ username: trimmed }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data?.detail || 'Could not save username')
      }

      localStorage.setItem('ahju_user', JSON.stringify(data.user))
      setShowUsernameStep(false)
      navigate('/dashboard')
    } catch (err) {
      setUsernameError(err.message || 'Could not set username')
    } finally {
      setUsernameLoading(false)
    }
  }

  return (
    <div className="relative z-10 min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="grid min-h-screen lg:grid-cols-2"
      >
        <div
          className="hidden lg:block bg-cover bg-center"
          style={{ backgroundImage: `url('${isLogin ? signInImage : signUpImage}')` }}
        />

        <div className="relative flex min-h-screen items-center justify-center bg-white px-6 py-10 sm:px-10">
          <div className="absolute left-6 top-6 sm:left-10 sm:top-8">
            <div className="flex items-center gap-3">
              <img src={ahjuLogo} alt="AHJU logo" className="h-10 w-10 rounded-md object-cover" />
              <span className="text-base font-semibold tracking-[0.1em] text-brand-charcoal">AHJU</span>
            </div>
          </div>

          <div className="w-full max-w-md">
            <p className="text-sm font-medium uppercase tracking-[0.14em] text-brand-green/90">
              {showUsernameStep ? 'One last step' : isLogin ? 'Welcome back' : 'Get started'}
            </p>
            <h2 className="mt-2 text-3xl font-bold leading-tight text-brand-charcoal sm:text-4xl">
              {showUsernameStep
                ? 'Choose your username'
                : isLogin
                  ? 'Sign in to your AHJU account'
                  : 'Create your AHJU account'}
            </h2>
            <p className="mt-3 text-brand-slate/75">
              {showUsernameStep
                ? 'Pick a unique username for your account. This will be shown in your dashboard and profile.'
                : isLogin
                  ? 'Continue securely with Google to access your profile, links, and analytics dashboard.'
                  : 'Set up your professional digital identity in minutes and manage everything from one dashboard.'}
            </p>
            {!showUsernameStep ? (
              <motion.button
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGoogleContinue}
                disabled={isLoading}
                className="mt-7 w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl border border-brand-slate/20 bg-white text-brand-charcoal font-semibold transition hover:border-brand-green/45 hover:bg-brand-green/5"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.55-.2-2.27H12v4.31h6.45a5.5 5.5 0 0 1-2.39 3.6v2.99h3.87c2.26-2.08 3.56-5.15 3.56-8.63Z" />
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.07 7.93-2.9l-3.87-2.99c-1.07.72-2.44 1.14-4.06 1.14-3.12 0-5.77-2.1-6.71-4.93H1.29v3.1A12 12 0 0 0 12 24Z" />
                  <path fill="#FBBC05" d="M5.29 14.32A7.21 7.21 0 0 1 4.92 12c0-.81.14-1.6.37-2.32v-3.1H1.29A12 12 0 0 0 0 12c0 1.93.46 3.76 1.29 5.42l4-3.1Z" />
                  <path fill="#EA4335" d="M12 4.77c1.76 0 3.35.6 4.59 1.78l3.44-3.44C17.94 1.14 15.24 0 12 0A12 12 0 0 0 1.29 6.58l4 3.1C6.23 6.87 8.88 4.77 12 4.77Z" />
                </svg>
                {isLoading ? 'Signing you in...' : 'Continue securely with Google'}
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
              </motion.button>
            ) : (
              <form className="mt-7" onSubmit={handleSetUsername}>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. teestimony"
                  className="h-11 w-full rounded-xl border border-brand-slate/20 px-3 text-sm outline-none focus:border-brand-green/60"
                />
                {usernameError && <p className="mt-2 text-sm text-red-600">{usernameError}</p>}

                <button
                  type="submit"
                  disabled={usernameLoading}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-green px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#489b2d] disabled:opacity-70 dark:bg-[#348539] dark:hover:bg-[#348539]"
                >
                  {usernameLoading ? 'Saving...' : 'Save username'}
                  {usernameLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                </button>
              </form>
            )}

            {error && (
              <div className="mt-3 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="mt-4 rounded-xl border border-brand-green/25 bg-brand-green/10 px-4 py-3 text-sm text-brand-slate/90">
              <p className="flex items-center gap-2 font-medium">
                <ShieldCheck className="h-4 w-4 text-brand-green" />
                {showUsernameStep ? 'Username will be saved to your account immediately.' : 'Secure Google sign-in. No password needed.'}
              </p>
            </div>

            {!showUsernameStep && <div className="mt-6 text-center">
              <p className="text-brand-slate/75">
                {isLogin ? 'Don\'t have an account? ' : 'Already have an account? '}
                <Link to={isLogin ? '/register' : '/login'} className="text-brand-green hover:text-brand-slate transition-colors font-semibold">
                  {isLogin ? 'Create one now' : 'Sign in'}
                </Link>
              </p>
            </div>}

            <p className="mt-5 text-center text-xs leading-relaxed text-brand-slate/55">
              By continuing, you agree to AHJU&apos;s Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </motion.div>


    </div>
  )
}

export default AuthForms
