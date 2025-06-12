'use client'

import { useEffect, useState } from 'react'

export default function ScrollIndicator() {
  const [scrollPercentage, setScrollPercentage] = useState(0)

  useEffect(() => {
    const updateScrollPercentage = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = (window.scrollY / scrollHeight) * 100
      setScrollPercentage(scrolled)
    }

    window.addEventListener('scroll', updateScrollPercentage)
    updateScrollPercentage()

    return () => window.removeEventListener('scroll', updateScrollPercentage)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-50">
      <div 
        className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 transition-all duration-300 ease-out shadow-lg"
        style={{ width: `${scrollPercentage}%` }}
      />
    </div>
  )
} 