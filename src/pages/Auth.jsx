import React from 'react'
import { motion } from 'framer-motion'
import AuthForms from '../components/AuthForms'
import Footer from '../components/Footer'

const Auth = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-900 to-dark-800 relative">
      <AuthForms mode="login" />

      {/* Floating background elements */}
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-20 w-28 h-28 bg-primary/10 rounded-full blur-2xl"
      />
      <motion.div
        animate={{ x: [0, -25, 0], y: [0, 35, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-16 left-16 w-32 h-32 bg-secondary/8 rounded-full blur-xl"
      />
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 25, 0],
          scale: [1, 0.8, 1.1, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/4 w-20 h-20 bg-cyan-400/12 rounded-full blur-xl"
      />

      <Footer />
    </div>
  )
}

export default Auth
