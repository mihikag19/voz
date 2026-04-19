"use client"

import { motion } from "framer-motion"

interface VoiceWaveformProps {
  isRecording: boolean
}

export function VoiceWaveform({ isRecording }: VoiceWaveformProps) {
  const bars = [0.4, 0.7, 1, 0.8, 0.5]
  
  return (
    <div className="flex items-center justify-center gap-1.5 h-12">
      {bars.map((height, index) => (
        <motion.div
          key={index}
          className="w-1.5 rounded-full bg-[var(--lavender-grey)]"
          animate={
            isRecording
              ? {
                  height: [
                    `${height * 48}px`,
                    `${height * 20}px`,
                    `${height * 40}px`,
                    `${height * 16}px`,
                    `${height * 48}px`,
                  ],
                }
              : { height: "8px" }
          }
          transition={
            isRecording
              ? {
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: index * 0.1,
                  ease: "easeInOut",
                }
              : { duration: 0.3 }
          }
        />
      ))}
    </div>
  )
}
