import React from 'react'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import AuthForms from '../components/AuthForms'

const Auth = () => {
  const { pathname } = useLocation()
  const mode = pathname === '/register' ? 'register' : 'login'

  return (
    <div className="min-h-screen bg-site relative overflow-hidden auth-grid-bg">
      <AuthForms mode={mode} />

      {/* Floating background elements */}
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-14 right-10 md:right-20 w-32 h-32 bg-brand-green/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -25, 0], y: [0, 35, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-8 md:left-20 w-40 h-40 bg-brand-slate/15 rounded-full blur-2xl"
      />
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 25, 0],
          scale: [1, 0.8, 1.1, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/4 w-24 h-24 bg-brand-green/20 rounded-full blur-2xl"
      />
    </div>
  )
}

export default Auth
