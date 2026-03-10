import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'

// Placeholder for public profile
const ProfilePublic = () => <div className="min-h-screen bg-dark-900 p-8 flex items-center justify-center">Public Profile Page - Coming Soon</div>

const AppRoutes = () => {
  const { theme, toggleDarkMode } = useTheme()

  return (
    <div className="App">
      <button
        type="button"
        onClick={toggleDarkMode}
        className="fixed bottom-5 right-5 z-[60] inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-slate/20 bg-white/90 text-brand-charcoal shadow-lg backdrop-blur transition hover:scale-105 dark:bg-[#1b2428] dark:text-white"
        aria-label={theme.isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        title={theme.isDark ? 'Light mode' : 'Dark mode'}
      >
        {theme.isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboad" element={<Dashboard />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/u/:username" element={<ProfilePublic />} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppRoutes />
      </Router>
    </ThemeProvider>
  )
}

export default App
