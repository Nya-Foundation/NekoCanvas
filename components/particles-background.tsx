"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  type: "particle" | "star"
}

export function ParticlesBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const particles = useRef<Particle[]>([])
  const animationRef = useRef<number>(0)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const createParticles = () => {
      if (!container) return

      // Clear existing particles
      particles.current = []

      // Create new particles
      const count = Math.min(Math.floor(window.innerWidth / 25), 40)
      for (let i = 0; i < count; i++) {
        particles.current.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 3 + 1,
          speedX: Math.random() * 0.2 - 0.1,
          speedY: Math.random() * 0.2 - 0.1,
          opacity: Math.random() * 0.5 + 0.3,
          type: Math.random() > 0.8 ? "star" : "particle",
        })
      }

      renderParticles()
    }

    const renderParticles = () => {
      if (!container) return

      // Clear container
      container.innerHTML = ""

      // Render each particle
      particles.current.forEach((particle) => {
        const element = document.createElement("div")
        element.className =
          particle.type === "star" ? "neko-star animate-sparkle-fade" : "neko-particle animate-gentle-pulse"

        element.style.width = `${particle.size * (particle.type === "star" ? 10 : 4)}px`
        element.style.height = `${particle.size * (particle.type === "star" ? 10 : 4)}px`
        element.style.left = `${particle.x}px`
        element.style.top = `${particle.y}px`
        element.style.opacity = `${particle.opacity}`

        // Add random animation delay
        element.style.animationDelay = `${Math.random() * 5}s`

        container.appendChild(element)
      })
    }

    const updateParticles = () => {
      if (!container) return

      particles.current.forEach((particle) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce off edges
        if (particle.x < 0 || particle.x > window.innerWidth) {
          particle.speedX *= -1
        }

        if (particle.y < 0 || particle.y > window.innerHeight) {
          particle.speedY *= -1
        }

        // Wrap around edges (alternative)
        if (particle.x < -50) particle.x = window.innerWidth + 50
        if (particle.x > window.innerWidth + 50) particle.x = -50
        if (particle.y < -50) particle.y = window.innerHeight + 50
        if (particle.y > window.innerHeight + 50) particle.y = -50
      })

      renderParticles()
      animationRef.current = requestAnimationFrame(updateParticles)
    }

    // Handle resize
    const handleResize = () => {
      createParticles()
    }

    window.addEventListener("resize", handleResize)
    createParticles()
    animationRef.current = requestAnimationFrame(updateParticles)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationRef.current)
    }
  }, [isDark])

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true" />
}
