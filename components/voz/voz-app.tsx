"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { LandingPage } from "./landing/landing-page"
import { WelcomeScreen, LanguageGlobeButton } from "./screens/welcome-screen"
import { UploadScreen } from "./screens/upload-screen"
import { ProcessingScreen } from "./screens/processing-screen"
import { DoneScreen } from "./screens/done-screen"
import { AnimatedBackground } from "./ui/animated-background"
import type { LanguageOption } from "./ui/language-selector"

export type Language = "en" | "es"

export interface ProductUpload {
  id: string
  file: File
  preview: string
  tagline: string
  description: string
}

export interface VoiceRecording {
  blob: Blob | null
  duration: number
}

type Screen = "landing" | "welcome" | "upload" | "processing" | "done"

export function VozApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome")
  const [language, setLanguage] = useState<Language>("en")
  const [fullLanguage, setFullLanguage] = useState<LanguageOption | null>(null)
  const [products, setProducts] = useState<ProductUpload[]>([])
  const [voiceRecording, setVoiceRecording] = useState<VoiceRecording>({ blob: null, duration: 0 })
  const [storeUrl, setStoreUrl] = useState("")
  const [showLanguageSelector, setShowLanguageSelector] = useState(false)

  const handleGetStarted = () => {
    setCurrentScreen("upload")
  }

  const handleLanguageSelect = (lang: Language, fullLang: LanguageOption) => {
    setLanguage(lang)
    setFullLanguage(fullLang)
    if (!showLanguageSelector) {
      setCurrentScreen("landing")
    }
    setShowLanguageSelector(false)
  }

  const handleUploadComplete = (uploadedProducts: ProductUpload[], recording: VoiceRecording) => {
    setProducts(uploadedProducts)
    setVoiceRecording(recording)
    setCurrentScreen("processing")
  }

  const handleProcessingComplete = (url: string) => {
    setStoreUrl(url)
    setCurrentScreen("done")
  }

  const handleStartOver = () => {
    setProducts([])
    setVoiceRecording({ blob: null, duration: 0 })
    setStoreUrl("")
    setCurrentScreen("welcome")
  }

  const handleReopenLanguageSelector = () => {
    setShowLanguageSelector(true)
  }

  return (
    <div className="min-h-screen bg-[var(--cream)] relative overflow-hidden">
      {/* Animated background - only show on upload/processing/done screens */}
      {currentScreen !== "landing" && currentScreen !== "welcome" && !showLanguageSelector && (
        <AnimatedBackground variant="warm" />
      )}

      {/* Globe button to reopen language selector */}
      {currentScreen !== "landing" && currentScreen !== "welcome" && !showLanguageSelector && (
        <LanguageGlobeButton onClick={handleReopenLanguageSelector} />
      )}

      <AnimatePresence mode="wait">
        {currentScreen === "landing" && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <LandingPage onGetStarted={handleGetStarted} />
          </motion.div>
        )}
        {(currentScreen === "welcome" || showLanguageSelector) && (
          <WelcomeScreen 
            key="welcome"
            onSelectLanguage={handleLanguageSelect} 
          />
        )}
        {currentScreen === "upload" && !showLanguageSelector && (
          <UploadScreen
            key="upload"
            language={language}
            onComplete={handleUploadComplete}
            onBack={() => setCurrentScreen("welcome")}
          />
        )}
        {currentScreen === "processing" && !showLanguageSelector && (
          <ProcessingScreen
            key="processing"
            language={language}
            products={products}
            voiceRecording={voiceRecording}
            onComplete={handleProcessingComplete}
          />
        )}
        {currentScreen === "done" && !showLanguageSelector && (
          <DoneScreen
            key="done"
            language={language}
            storeUrl={storeUrl}
            onStartOver={handleStartOver}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
