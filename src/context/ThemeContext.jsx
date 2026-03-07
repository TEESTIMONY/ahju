import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Load from localStorage if available
    const savedTheme = localStorage.getItem('linkhub-theme')
    return savedTheme ? JSON.parse(savedTheme) : {
      background: 'gradient', // solid, gradient, or image
      accentColor: '#00FF99',
      fontStyle: 'Poppins',
      buttonStyle: 'filled',
      isDark: true
    }
  })

  useEffect(() => {
    localStorage.setItem('linkhub-theme', JSON.stringify(theme))
  }, [theme])

  useEffect(() => {
    const darkGradient = 'linear-gradient(135deg, #0a0a0a 0%, #121212 100%)'
    document.body.style.background = darkGradient
  }, [])

  const updateTheme = (newTheme) => {
    setTheme({ ...theme, ...newTheme })
  }

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
