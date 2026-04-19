"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface AnimatedBackgroundProps {
  variant?: "warm" | "neutral" | "dark"
}

export function AnimatedBackground({ variant = "warm" }: AnimatedBackgroundProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [smoothPos, setSmoothPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Smooth cursor follow with lag
  useEffect(() => {
    const interval = setInterval(() => {
      setSmoothPos(prev => ({
        x: prev.x + (mousePos.x - prev.x) * 0.08,
        y: prev.y + (mousePos.y - prev.y) * 0.08,
      }))
    }, 16)
    return () => clearInterval(interval)
  }, [mousePos])

  if (variant === "dark") {
    return <div className="fixed inset-0 z-0 bg-[#1A1A1A]" />
  }

  return (
    <>
      {/* Animated gradient mesh background */}
      <motion.div
        className="fixed inset-0 z-0"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 100%", "100% 0%", "0% 0%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, #FAF7F2 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, #F0E6D8 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, #EDCFB8 0%, transparent 60%),
            linear-gradient(180deg, #F8F6F4 0%, #F5F0E8 50%, #F8F6F4 100%)
          `,
          backgroundSize: "200% 200%",
        }}
      />

      {/* Floating bokeh orbs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Orb 1 - Terracotta */}
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(201, 160, 138, 0.15) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{
            x: ["-10%", "60%", "30%", "-10%"],
            y: ["20%", "60%", "10%", "20%"],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Orb 2 - Warm Amber */}
        <motion.div
          className="absolute w-[250px] h-[250px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(212, 184, 166, 0.15) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{
            x: ["80%", "20%", "50%", "80%"],
            y: ["70%", "30%", "80%", "70%"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Orb 3 - Soft Lavender */}
        <motion.div
          className="absolute w-[280px] h-[280px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(160, 154, 188, 0.12) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{
            x: ["40%", "70%", "10%", "40%"],
            y: ["10%", "50%", "60%", "10%"],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Cursor glow follow */}
      <div
        className="fixed z-0 pointer-events-none transition-opacity duration-300"
        style={{
          left: smoothPos.x - 75,
          top: smoothPos.y - 75,
          width: 150,
          height: 150,
          background: "radial-gradient(circle, rgba(201, 160, 138, 0.08) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />
    </>
  )
}
