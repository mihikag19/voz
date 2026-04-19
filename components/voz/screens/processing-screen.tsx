"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, Eye, FileText, Store, Loader2, Check, Shield } from "lucide-react"
import type { Language, ProductUpload, VoiceRecording } from "../voz-app"

interface ProcessingScreenProps {
  language: Language
  products: ProductUpload[]
  voiceRecording: VoiceRecording
  onComplete: (url: string) => void
}

type AgentStatus = "waiting" | "working" | "done"

interface AgentState {
  voice: { status: AgentStatus; message: string }
  vision: { status: AgentStatus; message: string }
  listing: { status: AgentStatus; message: string }
  ethics: { status: AgentStatus; message: string }
  storefront: { status: AgentStatus; message: string }
}

const content = {
  en: {
    title: "Creating Your Store",
    subtitle: "Our AI agents are working together",
    voice: {
      name: "VOICE",
      waiting: "Waiting to process...",
      working: "Transcribing your story...",
      done: "Story captured",
    },
    vision: {
      name: "VISION",
      waiting: "Waiting for voice...",
      working: "Analyzing product images...",
      done: "Products identified",
    },
    listing: {
      name: "LISTING",
      waiting: "Waiting for analysis...",
      working: "Generating product descriptions...",
      done: "Listings created",
    },
    ethics: {
      name: "ETHICS",
      waiting: "Waiting for listings...",
      working: "Verifying authenticity...",
      done: "Ethics verified",
    },
    storefront: {
      name: "STOREFRONT",
      waiting: "Waiting for verification...",
      working: "Building your storefront...",
      done: "Store ready",
    },
  },
  es: {
    title: "Creando Tu Tienda",
    subtitle: "Nuestros agentes de IA están trabajando juntos",
    voice: {
      name: "VOZ",
      waiting: "Esperando para procesar...",
      working: "Transcribiendo tu historia...",
      done: "Historia capturada",
    },
    vision: {
      name: "VISIÓN",
      waiting: "Esperando la voz...",
      working: "Analizando imágenes de productos...",
      done: "Productos identificados",
    },
    listing: {
      name: "LISTADO",
      waiting: "Esperando análisis...",
      working: "Generando descripciones...",
      done: "Listados creados",
    },
    ethics: {
      name: "ÉTICA",
      waiting: "Esperando listados...",
      working: "Verificando autenticidad...",
      done: "Ética verificada",
    },
    storefront: {
      name: "TIENDA",
      waiting: "Esperando verificación...",
      working: "Construyendo tu tienda...",
      done: "Tienda lista",
    },
  },
}

const streamingLogs = [
  "Initializing voice transcription pipeline...",
  "Loading Whisper model...",
  'Transcription complete: "I learned this craft from my grandmother..."',
  "Processing image batch (3 items)...",
  "Running CLIP visual encoder...",
  "Detected: Handwoven textile, traditional pattern",
  "Identified craft type: Warli painting technique",
  "Extracting color palette: Earth tones, natural dyes",
  "Generating SEO-optimized product titles...",
  "Creating compelling product narratives...",
  "Running ethics verification pipeline...",
  "Checking cultural authenticity markers...",
  "Verifying fair-trade compliance...",
  "Ethics check passed ✓",
  "Initializing storefront builder...",
  "Applying responsive design templates...",
  "Optimizing images for web...",
  "Generating Open Graph metadata...",
  "Deploying to edge network...",
  "Store URL generated successfully",
]

// Progress Arc Component
function ProgressArc({ progress }: { progress: number }) {
  const radius = 180
  const strokeWidth = 3
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <svg
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none z-0"
      viewBox="0 0 400 400"
    >
      {/* Background arc */}
      <circle
        cx="200"
        cy="200"
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.05)"
        strokeWidth={strokeWidth}
      />
      {/* Progress arc */}
      <motion.circle
        cx="200"
        cy="200"
        r={radius}
        fill="none"
        stroke="var(--terracotta)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        transform="rotate(-90 200 200)"
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ filter: "drop-shadow(0 0 8px var(--terracotta))" }}
      />
    </svg>
  )
}

// Cinematic Terminal Component
function CinematicTerminal({ logs, isVisible }: { logs: string[]; isVisible: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [logs])

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl bg-[#0D0D0D] border border-[#2A2A2A] overflow-hidden shadow-2xl"
    >
      {/* Terminal header */}
      <div className="px-4 py-2 bg-[#1A1A1A] border-b border-[#2A2A2A] flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
        <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
        <div className="w-3 h-3 rounded-full bg-[#27CA40]" />
        <span className="ml-3 text-xs text-white/40 font-mono">voz-agent-logs</span>
      </div>

      {/* Terminal content */}
      <div ref={scrollRef} className="p-4 h-56 overflow-y-auto font-mono text-sm">
        <AnimatePresence>
          {logs.map((log, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="mb-1.5 flex"
            >
              <span className="text-[#C9A08A] mr-2 select-none">{">"}</span>
              <TypewriterText 
                text={log} 
                color={
                  log.includes("✓") || log.includes("complete") || log.includes("success")
                    ? "#4ADE80"
                    : log.includes("...")
                    ? "#FBBF24"
                    : "#E5E5E5"
                }
              />
            </motion.div>
          ))}
        </AnimatePresence>
        {/* Blinking cursor */}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-2 h-5 bg-[#C9A08A] ml-4"
        />
      </div>
    </motion.div>
  )
}

// Typewriter text effect
function TypewriterText({ text, color }: { text: string; color: string }) {
  const [displayedText, setDisplayedText] = useState("")

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
      }
    }, 15)

    return () => clearInterval(interval)
  }, [text])

  return <span style={{ color }}>{displayedText}</span>
}

export function ProcessingScreen({ language, onComplete }: ProcessingScreenProps) {
  const t = content[language]
  const [agents, setAgents] = useState<AgentState>({
    voice: { status: "waiting", message: t.voice.waiting },
    vision: { status: "waiting", message: t.vision.waiting },
    listing: { status: "waiting", message: t.listing.waiting },
    ethics: { status: "waiting", message: t.ethics.waiting },
    storefront: { status: "waiting", message: t.storefront.waiting },
  })
  const [logs, setLogs] = useState<string[]>([])
  const [progress, setProgress] = useState(0)
  const [showLogs, setShowLogs] = useState(true)

  useEffect(() => {
    const timeline = [
      { delay: 500, agent: "voice", status: "working" as const, message: t.voice.working, progress: 10 },
      { delay: 2000, agent: "voice", status: "done" as const, message: t.voice.done, progress: 20 },
      { delay: 2500, agent: "vision", status: "working" as const, message: t.vision.working, progress: 30 },
      { delay: 4500, agent: "vision", status: "done" as const, message: t.vision.done, progress: 45 },
      { delay: 5000, agent: "listing", status: "working" as const, message: t.listing.working, progress: 55 },
      { delay: 7000, agent: "listing", status: "done" as const, message: t.listing.done, progress: 65 },
      { delay: 7500, agent: "ethics", status: "working" as const, message: t.ethics.working, progress: 75 },
      { delay: 9000, agent: "ethics", status: "done" as const, message: t.ethics.done, progress: 85 },
      { delay: 9500, agent: "storefront", status: "working" as const, message: t.storefront.working, progress: 92 },
      { delay: 11500, agent: "storefront", status: "done" as const, message: t.storefront.done, progress: 100 },
    ]

    const timeouts: NodeJS.Timeout[] = []

    timeline.forEach(({ delay, agent, status, message, progress: p }) => {
      const timeout = setTimeout(() => {
        setAgents((prev) => ({
          ...prev,
          [agent]: { status, message },
        }))
        setProgress(p)
      }, delay)
      timeouts.push(timeout)
    })

    // Streaming logs
    streamingLogs.forEach((log, index) => {
      const timeout = setTimeout(() => {
        setLogs((prev) => [...prev, log])
      }, 500 + index * 600)
      timeouts.push(timeout)
    })

    // Complete
    const completeTimeout = setTimeout(() => {
      onComplete(`https://voz.store/priya-handwoven`)
    }, 12500)
    timeouts.push(completeTimeout)

    return () => timeouts.forEach(clearTimeout)
  }, [t, onComplete])

  const agentConfig = [
    { key: "voice" as const, icon: Mic, ...t.voice },
    { key: "vision" as const, icon: Eye, ...t.vision },
    { key: "listing" as const, icon: FileText, ...t.listing },
    { key: "ethics" as const, icon: Shield, ...t.ethics },
    { key: "storefront" as const, icon: Store, ...t.storefront },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#1A1820] text-white px-4 py-8 relative overflow-hidden"
    >
      {/* Film grain overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Progress Arc */}
      <ProgressArc progress={progress} />

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[var(--terracotta)]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-10"
        >
          <h1 className="font-serif text-3xl md:text-4xl italic mb-2">{t.title}</h1>
          <p className="text-white/50">{t.subtitle}</p>
        </motion.div>

        {/* Agent Cards - Vertical Stack with Spring Animation */}
        <div className="space-y-3 mb-8">
          {agentConfig.map(({ key, icon: Icon, name }, index) => {
            const agent = agents[key]
            return (
              <motion.div
                key={key}
                initial={{ y: 60, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  delay: index * 0.12 
                }}
                className={`relative overflow-hidden rounded-xl p-4 transition-all duration-500 ${
                  agent.status === "working"
                    ? "bg-[var(--terracotta)]/15 border border-[var(--terracotta)]/50"
                    : agent.status === "done"
                    ? "bg-[#4ADE80]/10 border border-[#4ADE80]/30"
                    : "bg-white/5 border border-white/10"
                }`}
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    animate={agent.status === "working" ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                      agent.status === "working"
                        ? "bg-[var(--terracotta)]"
                        : agent.status === "done"
                        ? "bg-[#4ADE80]"
                        : "bg-white/10"
                    }`}
                  >
                    {agent.status === "working" ? (
                      <Loader2 className="w-6 h-6 text-white animate-spin" />
                    ) : agent.status === "done" ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      >
                        <Check className="w-6 h-6 text-white" />
                      </motion.div>
                    ) : (
                      <Icon className="w-6 h-6 text-white/40" />
                    )}
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-mono text-xs font-bold tracking-widest mb-0.5 text-white/70">
                      {name}
                    </h3>
                    <p
                      className={`text-sm transition-colors duration-300 ${
                        agent.status === "working"
                          ? "text-[var(--terracotta-light)]"
                          : agent.status === "done"
                          ? "text-[#4ADE80]"
                          : "text-white/30"
                      }`}
                    >
                      {agent.message}
                    </p>
                  </div>
                </div>

                {/* Animated progress line */}
                {agent.status === "working" && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 2 }}
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--terracotta)] to-transparent origin-left"
                  />
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Cinematic Terminal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={() => setShowLogs(!showLogs)}
            className="w-full mb-3 px-4 py-2 flex items-center justify-between text-left hover:bg-white/5 rounded-lg transition-colors"
          >
            <span className="font-mono text-xs text-white/40">
              {showLogs ? "Hide" : "Show"} agent reasoning
            </span>
            <motion.span
              animate={{ rotate: showLogs ? 180 : 0 }}
              className="text-white/30 text-sm"
            >
              ▼
            </motion.span>
          </button>

          <AnimatePresence>
            {showLogs && <CinematicTerminal logs={logs} isVisible={showLogs} />}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  )
}
