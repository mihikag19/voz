"use client"

import { useState, type MouseEvent, type ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Ripple {
  id: number
  x: number
  y: number
}

interface RippleButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
  rippleColor?: string
}

export function RippleButton({ 
  children, 
  onClick, 
  className = "", 
  disabled = false,
  rippleColor = "rgba(160, 154, 188, 0.3)"
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([])

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return
    
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const newRipple: Ripple = {
      id: Date.now(),
      x,
      y,
    }
    
    setRipples((prev) => [...prev, newRipple])
    
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
    }, 600)
    
    onClick?.()
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`relative overflow-hidden ${className}`}
    >
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 100,
              height: 100,
              marginLeft: -50,
              marginTop: -50,
              backgroundColor: rippleColor,
            }}
          />
        ))}
      </AnimatePresence>
      {children}
    </button>
  )
}
