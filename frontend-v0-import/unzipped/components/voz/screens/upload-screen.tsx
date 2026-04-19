"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Plus, X, Check, Play, Pause, Mic } from "lucide-react"
import type { Language, ProductUpload, VoiceRecording } from "../voz-app"
import { RippleButton } from "../ui/ripple-button"

interface UploadScreenProps {
  language: Language
  onComplete: (products: ProductUpload[], recording: VoiceRecording) => void
  onBack: () => void
}

const content = {
  en: {
    title: "Add Your Products",
    subtitle: "Upload photos and tell us about your craft",
    uploadPrompt: "Tap to add a photo",
    taglineLabel: "Product tagline",
    taglinePlaceholder: "e.g., Handwoven silk scarf",
    descriptionLabel: "Product description",
    descriptionPlaceholder: "Describe your product in detail - materials, techniques, inspiration, dimensions...",
    descriptionHint: "The more detail, the better your storefront will be",
    voiceTitle: "Tell Your Story",
    voiceSubtitle: "Record a voice message about yourself and your craft",
    tapToRecord: "Tap to Record",
    recording: "Recording...",
    recorded: "Recording saved",
    continueBtn: "Create My Store",
    addAnother: "Add another product",
  },
  es: {
    title: "Agrega Tus Productos",
    subtitle: "Sube fotos y cuéntanos sobre tu artesanía",
    uploadPrompt: "Toca para agregar una foto",
    taglineLabel: "Título del producto",
    taglinePlaceholder: "ej., Bufanda de seda tejida a mano",
    descriptionLabel: "Descripción del producto",
    descriptionPlaceholder: "Describe tu producto en detalle - materiales, técnicas, inspiración, dimensiones...",
    descriptionHint: "Cuanto más detalle, mejor será tu tienda",
    voiceTitle: "Cuenta Tu Historia",
    voiceSubtitle: "Graba un mensaje de voz sobre ti y tu artesanía",
    tapToRecord: "Toca para Grabar",
    recording: "Grabando...",
    recorded: "Grabación guardada",
    continueBtn: "Crear Mi Tienda",
    addAnother: "Agregar otro producto",
  },
}

// Marching ants upload zone
function MarchingAntsUploadZone({ onClick, label }: { onClick: () => void; label: string }) {
  const [offset, setOffset] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [cameraRotation, setCameraRotation] = useState(0)
  
  useEffect(() => {
    const speed = isHovered ? 2 : 1
    const interval = setInterval(() => {
      setOffset(prev => (prev + speed) % 24)
    }, 50)
    return () => clearInterval(interval)
  }, [isHovered])

  // Camera icon rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCameraRotation(prev => {
        if (prev >= 8) return -8
        if (prev <= -8) return 8
        return prev + (prev >= 0 ? 0.5 : -0.5) * (prev >= 0 ? 1 : -1)
      })
    }, 50)
    return () => clearInterval(interval)
  }, [])

  // Smooth camera oscillation
  useEffect(() => {
    let direction = 1
    const interval = setInterval(() => {
      setCameraRotation(prev => {
        if (prev >= 8) direction = -1
        if (prev <= -8) direction = 1
        return prev + 0.3 * direction
      })
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full aspect-[4/3] rounded-2xl bg-white/50 flex flex-col items-center justify-center gap-3 transition-all overflow-hidden"
    >
      {/* SVG marching ants border */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
      >
        <rect
          x="2"
          y="2"
          width="calc(100% - 4px)"
          height="calc(100% - 4px)"
          rx="16"
          ry="16"
          fill="none"
          stroke={isHovered ? "#C1694F" : "#9CA3AF"}
          strokeWidth="2"
          strokeDasharray="10 6"
          strokeDashoffset={-offset}
          style={{
            transition: "stroke 0.3s ease",
          }}
        />
      </svg>

      {/* Camera icon with rotation */}
      <motion.div 
        className="w-16 h-16 rounded-full bg-[var(--lavender-light)] flex items-center justify-center"
        style={{ rotate: cameraRotation }}
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-[var(--lavender-grey)]" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
        </svg>
      </motion.div>
      <span className="text-muted-foreground font-medium relative z-10">{label}</span>
    </motion.button>
  )
}

// Voice record button with breathing/sonar rings
function VoiceRecordButtonWithRings({ 
  isRecording, 
  onClick 
}: { 
  isRecording: boolean
  onClick: () => void 
}) {
  const [audioLevels, setAudioLevels] = useState<number[]>(Array(12).fill(0.3))

  // Simulate audio visualizer when recording
  useEffect(() => {
    if (!isRecording) {
      setAudioLevels(Array(12).fill(0.3))
      return
    }
    const interval = setInterval(() => {
      setAudioLevels(Array(12).fill(0).map(() => 0.2 + Math.random() * 0.8))
    }, 100)
    return () => clearInterval(interval)
  }, [isRecording])

  return (
    <div className="relative flex flex-col items-center">
      {/* Audio visualizer bars - only when recording */}
      {isRecording && (
        <div className="flex items-end justify-center gap-1 h-12 mb-4">
          {audioLevels.map((level, i) => (
            <motion.div
              key={i}
              className="w-1.5 bg-[var(--terracotta)] rounded-full"
              animate={{ height: level * 40 }}
              transition={{ duration: 0.1 }}
            />
          ))}
        </div>
      )}

      {/* Button container with rings */}
      <div className="relative">
        {/* Breathing rings (at rest) or Sonar rings (recording) */}
        {!isRecording ? (
          // Breathing rings
          <>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border-2 border-[var(--lavender-grey)]/30"
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: [0.4, 0.2, 0.4],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.8,
                }}
                style={{
                  width: 80 + i * 20,
                  height: 80 + i * 20,
                  left: -(i * 10),
                  top: -(i * 10),
                }}
              />
            ))}
          </>
        ) : (
          // Sonar pulse rings
          <AnimatePresence>
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={`sonar-${i}`}
                className="absolute rounded-full border-2 border-[var(--terracotta)]"
                initial={{ 
                  scale: 1, 
                  opacity: 0.6,
                  left: 0,
                  top: 0,
                  width: 80,
                  height: 80,
                }}
                animate={{ 
                  scale: 2.5, 
                  opacity: 0,
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: i * 0.4,
                }}
                style={{
                  left: 0,
                  top: 0,
                }}
              />
            ))}
          </AnimatePresence>
        )}

        {/* Main button */}
        <RippleButton
          onClick={onClick}
          className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
            isRecording 
              ? "bg-[var(--terracotta)] shadow-lg shadow-[var(--terracotta)]/30" 
              : "bg-[var(--lavender-grey)] hover:bg-[var(--lilac)]"
          }`}
        >
          {isRecording ? (
            <div className="w-6 h-6 bg-white rounded-sm" />
          ) : (
            <Mic className="w-8 h-8 text-white" />
          )}
        </RippleButton>
      </div>
    </div>
  )
}

export function UploadScreen({ language, onComplete, onBack }: UploadScreenProps) {
  const t = content[language]
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [products, setProducts] = useState<ProductUpload[]>([])
  const [activeProductId, setActiveProductId] = useState<string | null>(null)
  const [voiceRecording, setVoiceRecording] = useState<VoiceRecording>({ blob: null, duration: 0 })
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length) return

    Array.from(files).forEach((file) => {
      const id = crypto.randomUUID()
      const preview = URL.createObjectURL(file)
      const newProduct: ProductUpload = {
        id,
        file,
        preview,
        tagline: "",
        description: "",
      }
      setProducts((prev) => [...prev, newProduct])
      setActiveProductId(id)
    })

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }, [])

  const removeProduct = useCallback((id: string) => {
    setProducts((prev) => {
      const product = prev.find((p) => p.id === id)
      if (product) {
        URL.revokeObjectURL(product.preview)
      }
      return prev.filter((p) => p.id !== id)
    })
    if (activeProductId === id) {
      setActiveProductId(null)
    }
  }, [activeProductId])

  const updateProduct = useCallback((id: string, updates: Partial<ProductUpload>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    )
  }, [])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data)
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" })
        setVoiceRecording({ blob, duration: recordingTime })
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } catch (err) {
      console.error("Failed to start recording:", err)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  const playRecording = () => {
    if (voiceRecording.blob && !isPlaying) {
      const url = URL.createObjectURL(voiceRecording.blob)
      const audio = new Audio(url)
      audioRef.current = audio
      audio.onended = () => {
        setIsPlaying(false)
        URL.revokeObjectURL(url)
      }
      audio.play()
      setIsPlaying(true)
    } else if (audioRef.current && isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const canContinue = products.length > 0 && products.every((p) => p.tagline && p.description) && voiceRecording.blob

  const activeProduct = products.find((p) => p.id === activeProductId)

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen pb-24 relative"
    >
      {/* Header */}
      <header className="sticky top-0 z-20 bg-[var(--cream)]/95 backdrop-blur-sm border-b border-[var(--lavender)]">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <RippleButton
            onClick={onBack}
            className="p-2 rounded-full hover:bg-[var(--lavender-light)] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </RippleButton>
          <div>
            <h1 className="font-serif text-2xl italic text-foreground">{t.title}</h1>
            <p className="text-sm text-muted-foreground">{t.subtitle}</p>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-2xl mx-auto px-4 py-6 space-y-8">
        {/* Product Upload Section */}
        <section>
          {/* Product Thumbnails Grid */}
          <div className="flex flex-wrap gap-3 mb-6">
            <AnimatePresence mode="popLayout">
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  layout
                  className={`relative w-24 h-24 rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                    activeProductId === product.id
                      ? "border-[var(--lavender-grey)] shadow-lg"
                      : "border-transparent hover:border-[var(--lavender)]"
                  }`}
                  onClick={() => setActiveProductId(product.id)}
                >
                  <img
                    src={product.preview}
                    alt={product.tagline || "Product"}
                    className="w-full h-full object-cover"
                  />
                  {product.tagline && product.description && (
                    <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-[var(--success)] flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      removeProduct(product.id)
                    }}
                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-foreground/70 flex items-center justify-center hover:bg-foreground transition-colors"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Add Photo Button */}
            {products.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => fileInputRef.current?.click()}
                className="w-24 h-24 rounded-xl border-2 border-dashed border-[var(--lavender)] bg-white/50 flex flex-col items-center justify-center gap-1 hover:border-[var(--lavender-grey)] hover:bg-white transition-all"
              >
                <Plus className="w-6 h-6 text-[var(--lavender-grey)]" />
                <span className="text-xs text-muted-foreground">Add</span>
              </motion.button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* Active Product Form */}
          <AnimatePresence mode="wait">
            {activeProduct && (
              <motion.div
                key={activeProduct.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white rounded-2xl p-5 border border-[var(--lavender)] space-y-4"
              >
                <div className="flex gap-4">
                  <img
                    src={activeProduct.preview}
                    alt={activeProduct.tagline || "Product"}
                    className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1 space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        {t.taglineLabel}
                      </label>
                      <input
                        type="text"
                        value={activeProduct.tagline}
                        onChange={(e) => updateProduct(activeProduct.id, { tagline: e.target.value })}
                        placeholder={t.taglinePlaceholder}
                        className="w-full px-3 py-2 rounded-lg border border-[var(--lavender)] bg-[var(--cream)] focus:outline-none focus:border-[var(--lavender-grey)] focus:ring-2 focus:ring-[var(--lavender-grey)]/20 transition-all text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    {t.descriptionLabel}
                  </label>
                  <textarea
                    value={activeProduct.description}
                    onChange={(e) => updateProduct(activeProduct.id, { description: e.target.value })}
                    placeholder={t.descriptionPlaceholder}
                    rows={4}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--lavender)] bg-[var(--cream)] focus:outline-none focus:border-[var(--lavender-grey)] focus:ring-2 focus:ring-[var(--lavender-grey)]/20 transition-all text-foreground placeholder:text-muted-foreground resize-none"
                  />
                  <p className="text-xs text-muted-foreground mt-1">{t.descriptionHint}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty state - Marching ants upload zone */}
          {products.length === 0 && (
            <MarchingAntsUploadZone 
              onClick={() => fileInputRef.current?.click()} 
              label={t.uploadPrompt}
            />
          )}
        </section>

        {/* Voice Recording Section */}
        <section className="bg-white rounded-2xl p-8 border border-[var(--lavender)]">
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl italic text-foreground mb-2">{t.voiceTitle}</h2>
            <p className="text-sm text-muted-foreground">{t.voiceSubtitle}</p>
          </div>

          <div className="flex flex-col items-center gap-6">
            {voiceRecording.blob && !isRecording ? (
              // Playback UI
              <>
                <div className="flex items-center gap-3 px-5 py-4 bg-[var(--lavender-light)] rounded-full">
                  <RippleButton
                    onClick={playRecording}
                    className="w-12 h-12 rounded-full bg-[var(--lavender-grey)] flex items-center justify-center text-white"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                  </RippleButton>
                  <span className="text-foreground font-medium text-lg">{formatTime(voiceRecording.duration)}</span>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-[var(--success)]" />
                    <span className="text-sm text-[var(--success)]">{t.recorded}</span>
                  </div>
                </div>
                <button
                  onClick={() => setVoiceRecording({ blob: null, duration: 0 })}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Re-record
                </button>
              </>
            ) : (
              // Recording UI
              <>
                <VoiceRecordButtonWithRings 
                  isRecording={isRecording} 
                  onClick={toggleRecording} 
                />
                <motion.p 
                  className="text-sm font-medium"
                  style={{ color: isRecording ? "var(--terracotta)" : "var(--muted-foreground)" }}
                  animate={isRecording ? { opacity: [1, 0.6, 1] } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  {isRecording ? formatTime(recordingTime) : t.tapToRecord}
                </motion.p>
              </>
            )}
          </div>
        </section>
      </main>

      {/* Continue Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[var(--cream)] via-[var(--cream)] to-transparent z-20">
        <div className="max-w-2xl mx-auto">
          <RippleButton
            onClick={() => canContinue && onComplete(products, voiceRecording)}
            disabled={!canContinue}
            className={`w-full py-4 rounded-2xl font-serif text-lg italic transition-all ${
              canContinue
                ? "bg-[var(--lavender-grey)] text-white shadow-lg hover:bg-[var(--lilac)]"
                : "bg-[var(--lavender-light)] text-muted-foreground cursor-not-allowed"
            }`}
          >
            {t.continueBtn}
          </RippleButton>
        </div>
      </div>
    </motion.div>
  )
}
