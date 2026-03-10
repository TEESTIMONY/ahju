import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const logoImage = new URL('../../logo.jpg', import.meta.url).href

const Header = ({ isLoggedIn = false }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="sticky top-0 z-30 w-full border-b border-brand-green/25 bg-white/90 backdrop-blur"
    >
      <div className="mx-auto flex w-full max-w-[86rem] items-center justify-between px-2 py-4 sm:px-3 lg:px-4">
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
        <Link to="/" className="flex items-center gap-2">
          <img src={logoImage} alt="AHJU logo" className="h-8 w-8 rounded-full object-cover shadow-sm shadow-brand-green/35" />
          <h1 className="text-base font-semibold tracking-tight text-brand-charcoal">AHJU</h1>
        </Link>
        </motion.div>

        <div className="flex items-center gap-3">
          {!isLoggedIn && (
            <>
              <Link to="/login" className="hidden text-sm font-medium text-brand-slate/80 transition-colors hover:text-brand-green sm:inline">
                Sign in
              </Link>
              <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 rounded-full bg-[#2f3b40] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#253035]"
                >
                  Get started
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </motion.header>
  )
}

export default Header
