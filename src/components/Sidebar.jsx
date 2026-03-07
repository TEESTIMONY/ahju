import React from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { BarChart3, Link as LinkIcon, Palette, LogOut, User, X } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const Sidebar = ({ onLogout, onTabChange, activeTab, isOpen, onClose }) => {

  const navItems = [
    { key: 'overview', icon: BarChart3, label: 'Overview' },
    { key: 'links', icon: LinkIcon, label: 'Links' },
    { key: 'analytics', icon: BarChart3, label: 'Analytics' },
    { key: 'appearance', icon: Palette, label: 'Appearance' },
  ]

  return (
    <div className={`w-64 h-screen glass border-r border-white/10 p-4 flex flex-col fixed md:relative z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 md:flex`}>
      <Link to="/" className="flex items-center space-x-2 mb-8 mt-12 md:mt-0">
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
          <span className="font-heading text-lg text-dark-900">L</span>
        </div>
        <motion.h1
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="font-heading text-xl font-bold text-primary"
        >
          LinkHub
        </motion.h1>
      </Link>

      <div className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.key
          return (
            <motion.button
              key={item.key}
              onClick={() => onTabChange(item.key)}
              animate={isActive ? { scale: [1, 1.05, 1] } : {}}
              whileHover={{ scale: 1.1, x: 10, skew: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={isActive ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : { type: "spring", stiffness: 300 }}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-primary/20 text-primary border-l-4 border-primary'
                  : 'hover:bg-white/10 text-light hover:text-primary'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>

              {isActive && (
                <motion.div
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute left-2 w-2 h-2 bg-primary rounded-full"
                />
              )}
            </motion.button>
          )
        })}
      </div>

      <div className="border-t border-white/10 pt-4 space-y-2">
        <div className="flex items-center space-x-3 px-4 py-2">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-medium">Username</p>
            <p className="text-xs text-white/60">john@example.com</p>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-900/30 transition-colors text-red-400 hover:text-red-300"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar
