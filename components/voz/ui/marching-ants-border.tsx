"use client"

import { useRef, useEffect, useState } from "react"

interface MarchingAntsBorderProps {
  children: React.ReactNode
  className?: string
  isHovered?: boolean
}

export function MarchingAntsBorder({ children, className = "", isHovered = false }: MarchingAntsBorderProps) {
  const [offset, setOffset] = useState(0)
  
  useEffect(() => {
    const speed = isHovered ? 2 : 1
    const interval = setInterval(() => {
      setOffset(prev => (prev + speed) % 20)
    }, 50)
    return () => clearInterval(interval)
  }, [isHovered])

  return (
    <div className={`relative ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ overflow: "visible" }}
      >
        <rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx="16"
          ry="16"
          fill="none"
          stroke={isHovered ? "#C1694F" : "#9CA3AF"}
          strokeWidth="2"
          strokeDasharray="8 4"
          strokeDashoffset={-offset}
          style={{
            transition: "stroke 0.3s ease",
          }}
        />
      </svg>
      {children}
    </div>
  )
}
