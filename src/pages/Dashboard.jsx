import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'
import Sidebar from '../components/Sidebar'
import LinksList from '../components/LinksList'
import AnalyticsPanel from '../components/AnalyticsPanel'

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [links, setLinks] = useState([
    { id: 1, title: 'Portfolio', url: 'https://portfolio.example.com', icon: 'P', clicks: 156 },
    { id: 2, title: 'Twitter', url: 'https://twitter.com/username', icon: 'T', clicks: 89 },
    { id: 3, title: 'GitHub', url: 'https://github.com/username', icon: 'G', clicks: 67 }
  ])

  const handleLogout = () => {
    // Handle logout logic
    console.log('Logging out...')
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'links':
        return (
          <LinksList
            links={links}
            onAddLink={() => console.log('Add link')}
            onEditLink={(link) => console.log('Edit link:', link)}
            onDeleteLink={(id) => setLinks(links.filter(link => link.id !== id))}
            onReorderLinks={(newLinks) => setLinks(newLinks)}
          />
        )
      case 'analytics':
        return <AnalyticsPanel />
      default:
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-center min-h-64">
              <div className="text-center">
              <motion.h2
                className="text-3xl font-heading font-bold text-light mb-4"
                whileHover={{ scale: 1.05, rotate: [-2, 2, -1, 1, -2] }}
                transition={{ duration: 0.3 }}
              >
                Welcome to your Dashboard
              </motion.h2>
              <p className="text-white/60">Choose a section from the sidebar to get started</p>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="flex h-screen">
      <Sidebar onLogout={handleLogout} onTabChange={(tab) => { setActiveTab(tab); setIsSidebarOpen(false); }} activeTab={activeTab} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}
      <div className="relative flex-1 overflow-y-auto p-8">
        {/* Mobile menu button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-glass border border-white/10 hover:bg-white/10 transition-colors"
        >
          {isSidebarOpen ? <X className="w-6 h-6 text-light" /> : <Menu className="w-6 h-6 text-light" />}
        </button>
        {renderActiveTab()}

        {/* Floating background elements */}
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-24 h-24 bg-primary/5 rounded-full blur-2xl"
        />
        <motion.div
          animate={{ x: [0, 25, 0], y: [0, -40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-1/6 w-32 h-32 bg-secondary/5 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            x: [0, -20, 15, 0],
            y: [0, 35, -10, 0],
            rotate: [0, 45, -30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/3 w-16 h-16 bg-green-500/8 rounded-full blur-xl"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 0.8, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/6 w-20 h-20 bg-purple-500/6 rounded-full blur-xl"
        />
      </div>
    </div>
  )
}

export default Dashboard
