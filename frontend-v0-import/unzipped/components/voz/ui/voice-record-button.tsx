"use client"

import { motion } from "framer-motion"
import { Mic } from "lucide-react"

interface VoiceRecordButtonProps {
  isRecording: boolean
  onClick: () => void
}

export function VoiceRecordButton({ isRecording, onClick }: VoiceRecordButtonProps) {
  const ringCount = 4

  return (
    <div className="relative flex items-center justify-center">
      {/* Concentric rings */}
      {Array.from({ length: ringCount }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full border-2"
          style={{
            width: 96 + index * 40,
            height: 96 + index * 40,
            borderColor: isRecording 
              ? "var(--terracotta)" 
              : "var(--lavender)",
          }}
          initial={{ scale: 1, opacity: isRecording ? 0.6 : 0.15 }}
          animate={
            isRecording
              ? {
                  scale: [1, 1.15, 1],
                  opacity: [0.6, 0.2, 0.6],
                }
              : {
                  scale: 1,
                  opacity: 0.15,
                }
          }
          transition={
            isRecording
              ? {
                  duration: 1.5,
                  delay: index * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
              : {
                  duration: 0.3,
                }
          }
        />
      ))}

      {/* Radiating pulse rings when recording */}
      {isRecording && (
        <>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`pulse-${i}`}
              className="absolute rounded-full border border-[var(--terracotta)]"
              style={{
                width: 96,
                height: 96,
              }}
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{
                scale: [1, 3],
                opacity: [0.6, 0],
              }}
              transition={{
                duration: 2,
                delay: i * 0.6,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}
        </>
      )}

      {/* Main button */}
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative z-10 w-24 h-24 rounded-full flex items-center justify-center shadow-xl transition-colors"
        style={{
          backgroundColor: isRecording ? "var(--terracotta)" : "var(--lavender-grey)",
        }}
        animate={
          isRecording
            ? {
                boxShadow: [
                  "0 0 0 0 rgba(201, 160, 138, 0.4)",
                  "0 0 30px 10px rgba(201, 160, 138, 0.2)",
                  "0 0 0 0 rgba(201, 160, 138, 0.4)",
                ],
              }
            : {}
        }
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {isRecording ? (
          <motion.div
            className="w-7 h-7 rounded-sm bg-white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          />
        ) : (
          <Mic className="w-9 h-9 text-white" />
        )}
      </motion.button>
    </div>
  )
}
