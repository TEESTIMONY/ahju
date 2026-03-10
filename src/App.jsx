import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'

// Placeholder for public profile
const ProfilePublic = () => <div className="min-h-screen bg-dark-900 p-8 flex items-center justify-center">Public Profile Page - Coming Soon</div>

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboad" element={<Dashboard />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/register" element={<Auth />} />
            <Route path="/u/:username" element={<ProfilePublic />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
