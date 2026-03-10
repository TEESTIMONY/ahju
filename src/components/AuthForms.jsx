import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import ahjuLogo from '../../logo.jpg'

const AuthForms = ({ mode = 'login' }) => {
  const isLogin = mode === 'login'

  const handleGoogleContinue = () => {
    // TODO: wire this to Firebase/Auth provider
    console.log('Continue with Google')
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
          style={{ backgroundImage: `url('${isLogin ? '/signin.png' : '/signup_image.png'}')` }}
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
              {isLogin ? 'Welcome back' : 'Get started'}
            </p>
            <h2 className="mt-2 text-3xl font-bold leading-tight text-brand-charcoal sm:text-4xl">
              {isLogin ? 'Sign in to your AHJU account' : 'Create your AHJU account'}
            </h2>
            <p className="mt-3 text-brand-slate/75">
              {isLogin
                ? 'Continue securely with Google to access your profile, links, and analytics dashboard.'
                : 'Set up your professional digital identity in minutes and manage everything from one dashboard.'}
            </p>

            <motion.button
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleContinue}
              className="mt-7 w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl border border-brand-slate/20 bg-white text-brand-charcoal font-semibold transition hover:border-brand-green/45 hover:bg-brand-green/5"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.55-.2-2.27H12v4.31h6.45a5.5 5.5 0 0 1-2.39 3.6v2.99h3.87c2.26-2.08 3.56-5.15 3.56-8.63Z" />
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.07 7.93-2.9l-3.87-2.99c-1.07.72-2.44 1.14-4.06 1.14-3.12 0-5.77-2.1-6.71-4.93H1.29v3.1A12 12 0 0 0 12 24Z" />
                <path fill="#FBBC05" d="M5.29 14.32A7.21 7.21 0 0 1 4.92 12c0-.81.14-1.6.37-2.32v-3.1H1.29A12 12 0 0 0 0 12c0 1.93.46 3.76 1.29 5.42l4-3.1Z" />
                <path fill="#EA4335" d="M12 4.77c1.76 0 3.35.6 4.59 1.78l3.44-3.44C17.94 1.14 15.24 0 12 0A12 12 0 0 0 1.29 6.58l4 3.1C6.23 6.87 8.88 4.77 12 4.77Z" />
              </svg>
              Continue securely with Google
              <ArrowRight className="h-4 w-4" />
            </motion.button>

            <div className="mt-4 rounded-xl border border-brand-green/25 bg-brand-green/10 px-4 py-3 text-sm text-brand-slate/90">
              <p className="flex items-center gap-2 font-medium">
                <ShieldCheck className="h-4 w-4 text-brand-green" />
                Secure Google sign-in. No password needed.
              </p>
            </div>

            <div className="mt-6 text-center">
              <p className="text-brand-slate/75">
                {isLogin ? 'Don\'t have an account? ' : 'Already have an account? '}
                <Link to={isLogin ? '/register' : '/login'} className="text-brand-green hover:text-brand-slate transition-colors font-semibold">
                  {isLogin ? 'Create one now' : 'Sign in'}
                </Link>
              </p>
            </div>

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
