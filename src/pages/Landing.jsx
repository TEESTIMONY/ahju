import React from 'react'
import { motion } from 'framer-motion'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import Footer from '../components/Footer'

const Landing = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="min-h-screen bg-site text-brand-charcoal"
    >
      <Header />
      <HeroSection />
      <Footer />
    </motion.div>
  )
}

export default Landing
