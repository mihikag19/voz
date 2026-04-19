"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Globe } from "lucide-react"
import type { Language } from "../voz-app"
import { LanguageSelector, cyclingGreetings, allLanguages, type LanguageOption } from "../ui/language-selector"

interface WelcomeScreenProps {
  onSelectLanguage: (lang: Language, fullLang: LanguageOption) => void
}

export function WelcomeScreen({ onSelectLanguage }: WelcomeScreenProps) {
  const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0)
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Cycle through greetings every 900ms
  useEffect(() => {
    if (selectedLanguage || isTransitioning) return

    const interval = setInterval(() => {
      setCurrentGreetingIndex((prev) => (prev + 1) % cyclingGreetings.length)
    }, 900)

    return () => clearInterval(interval)
  }, [selectedLanguage, isTransitioning])

  const handleLanguageSelect = (lang: LanguageOption) => {
    setSelectedLanguage(lang)
    setIsTransitioning(true)
    
    // Show the selected greeting scaled up, then slide away
    setTimeout(() => {
      // Map to our simple language type
      const simpleLang: Language = lang.code === "es" ? "es" : "en"
      onSelectLanguage(simpleLang, lang)
    }, 1500)
  }

  const currentGreeting = selectedLanguage?.greeting || cyclingGreetings[currentGreetingIndex]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ y: "-100%", opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-50 bg-[#1A1A1A] flex flex-col items-center justify-center px-6"
    >
      {/* Cycling greeting text */}
      <div className="h-32 md:h-40 flex items-center justify-center mb-12 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.h1
            key={currentGreeting}
            initial={{ opacity: 0, y: 12 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              scale: selectedLanguage ? 1.25 : 1,
            }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ 
              duration: 0.4, 
              ease: [0.22, 1, 0.36, 1]
            }}
            className="font-serif text-6xl md:text-[72px] italic text-white text-center"
            style={{
              textShadow: selectedLanguage ? "0 0 40px rgba(255,255,255,0.3)" : "none",
            }}
          >
            {currentGreeting}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* Language selector dropdown */}
      {!isTransitioning && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="w-full max-w-sm"
        >
          <LanguageSelector 
            onSelect={handleLanguageSelect}
            selectedCode={selectedLanguage?.code}
          />
        </motion.div>
      )}

      {/* Transition overlay with glow */}
      <AnimatePresence>
        {isTransitioning && selectedLanguage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Glow ring */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute w-64 h-64 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Globe button for re-opening language selector
export function LanguageGlobeButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-[var(--lavender)] flex items-center justify-center hover:bg-white/20 transition-colors"
      aria-label="Change language"
    >
      <Globe className="w-5 h-5 text-[var(--lavender-grey)]" />
    </motion.button>
  )
}
