'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    const particleCount = 50

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Initialize particles with consistent seed
    const initParticles = () => {
      particlesRef.current = []
      for (let i = 0; i < particleCount; i++) {
        // Use a more predictable random seed based on index
        const seed = i / particleCount
        particlesRef.current.push({
          x: (seed * 0.7 + 0.15) * canvas.width,
          y: (((i * 17) % 100) / 100) * canvas.height,
          size: 1 + (i % 3),
          speedX: ((i % 5) - 2) * 0.1,
          speedY: ((i % 7) - 3) * 0.1,
          opacity: 0.3 + ((i % 5) * 0.1)
        })
      }
    }

    // Update particles
    const updateParticles = () => {
      particlesRef.current.forEach(particle => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around screen
        if (particle.x > canvas.width) particle.x = 0
        if (particle.x < 0) particle.x = canvas.width
        if (particle.y > canvas.height) particle.y = 0
        if (particle.y < 0) particle.y = canvas.height

        // Pulse opacity
        particle.opacity += (Math.sin(Date.now() * 0.001 + particle.x * 0.01) - 0.5) * 0.01
        particle.opacity = Math.max(0.1, Math.min(0.8, particle.opacity))
      })
    }

    // Draw particles
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particlesRef.current.forEach(particle => {
        ctx.save()
        ctx.globalAlpha = particle.opacity
        ctx.fillStyle = '#ffffff'
        ctx.shadowBlur = 10
        ctx.shadowColor = '#667eea'
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      // Draw connections
      particlesRef.current.forEach((particle, i) => {
        particlesRef.current.slice(i + 1).forEach(otherParticle => {
          const distance = Math.sqrt(
            Math.pow(particle.x - otherParticle.x, 2) + 
            Math.pow(particle.y - otherParticle.y, 2)
          )

          if (distance < 100) {
            ctx.save()
            ctx.globalAlpha = (100 - distance) / 100 * 0.3
            ctx.strokeStyle = '#667eea'
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
            ctx.restore()
          }
        })
      })
    }

    // Animation loop
    const animate = () => {
      updateParticles()
      drawParticles()
      animationFrameId = requestAnimationFrame(animate)
    }

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      particlesRef.current.forEach(particle => {
        const distance = Math.sqrt(
          Math.pow(particle.x - mouseX, 2) + 
          Math.pow(particle.y - mouseY, 2)
        )

        if (distance < 100) {
          const force = (100 - distance) / 100
          const angle = Math.atan2(particle.y - mouseY, particle.x - mouseX)
          particle.speedX += Math.cos(angle) * force * 0.02
          particle.speedY += Math.sin(angle) * force * 0.02
        }
      })
    }

    // Setup
    resizeCanvas()
    initParticles()
    animate()

    window.addEventListener('resize', () => {
      resizeCanvas()
      initParticles()
    })

    canvas.addEventListener('mousemove', handleMouseMove)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  )
} 