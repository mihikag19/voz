"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface AnimatedLogoProps {
  size?: "sm" | "md" | "lg"
  showShimmer?: boolean
}

export function AnimatedLogo({ size = "md", showShimmer = true }: AnimatedLogoProps) {
  const [shimmerActive, setShimmerActive] = useState(false)

  // Trigger shimmer every 6 seconds
  useEffect(() => {
    if (!showShimmer) return
    const interval = setInterval(() => {
      setShimmerActive(true)
      setTimeout(() => setShimmerActive(false), 1000)
    }, 6000)
    return () => clearInterval(interval)
  }, [showShimmer])

  const sizeClasses = {
    sm: "text-3xl",
    md: "text-5xl md:text-6xl",
    lg: "text-7xl md:text-8xl lg:text-9xl",
  }

  const letters = ["V", "o", "z"]

  return (
    <motion.div 
      className={`font-serif italic ${sizeClasses[size]} relative inline-flex`}
      animate={{
        textShadow: [
          "0 0 20px rgba(160, 154, 188, 0.3)",
          "0 0 40px rgba(160, 154, 188, 0.5)",
          "0 0 20px rgba(160, 154, 188, 0.3)",
        ],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={letter}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.3 + index * 0.15,
            duration: 0.6,
            type: "spring",
            stiffness: 200,
            damping: 12,
          }}
          className="relative inline-block text-[var(--lavender-grey)]"
        >
          {letter}
          {/* Shimmer overlay */}
          {showShimmer && (
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              style={{
                backgroundSize: "200% 100%",
              }}
              initial={{ x: "-100%" }}
              animate={shimmerActive ? { x: "100%" } : { x: "-100%" }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
              }}
            />
          )}
        </motion.span>
      ))}
    </motion.div>
  )
}

// Word-by-word tagline animation
interface AnimatedTaglineProps {
  text: string
  delay?: number
}

export function AnimatedTagline({ text, delay = 1.2 }: AnimatedTaglineProps) {
  const words = text.split(" ")

  return (
    <p className="font-serif italic text-muted-foreground text-lg">
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: delay + index * 0.08,
            duration: 0.4,
          }}
          className="inline-block mr-1"
        >
          {word}
        </motion.span>
      ))}
    </p>
  )
}
