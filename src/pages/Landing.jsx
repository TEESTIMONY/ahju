import React from 'react'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import Footer from '../components/Footer'

const Landing = () => {
  return (
    <div className="min-h-screen bg-site text-black">
      <Header />
      <HeroSection />
      <Footer />
    </div>
  )
}

export default Landing
