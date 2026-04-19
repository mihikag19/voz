"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Copy, ExternalLink, Check, MessageCircle } from "lucide-react"
import Link from "next/link"
import type { Language } from "../voz-app"
import { FloatingParticles } from "../ui/floating-particles"
import { RippleButton } from "../ui/ripple-button"

interface DoneScreenProps {
  language: Language
  storeUrl: string
  onStartOver: () => void
}

const content = {
  en: {
    title: "Your Store is Live!",
    subtitle: "Your store is now accessible in 47 countries",
    copyLink: "Copy Link",
    copied: "Copied!",
    viewStore: "View My Store",
    shareWhatsApp: "Share on WhatsApp",
    startOver: "Create Another Store",
  },
  es: {
    title: "¡Tu Tienda Está Activa!",
    subtitle: "Tu tienda es ahora accesible en 47 países",
    copyLink: "Copiar Enlace",
    copied: "¡Copiado!",
    viewStore: "Ver Mi Tienda",
    shareWhatsApp: "Compartir en WhatsApp",
    startOver: "Crear Otra Tienda",
  },
}

export function DoneScreen({ language, storeUrl, onStartOver }: DoneScreenProps) {
  const t = content[language]
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(storeUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleWhatsAppShare = () => {
    const absoluteUrl = `${window.location.origin}/storefront/priya-warli-painting`
    const message = encodeURIComponent(`Check out my store: ${absoluteUrl}`)
    window.open(`https://wa.me/?text=${message}`, "_blank")
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden"
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          background: [
            "linear-gradient(180deg, #F8F6F4 0%, #F8F6F4 100%)",
            "linear-gradient(180deg, #F8F6F4 0%, #E8F5E9 50%, #F8F6F4 100%)",
            "linear-gradient(180deg, #F8F6F4 0%, #F8F6F4 100%)",
          ],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating particles */}
      <FloatingParticles count={35} color="var(--success)" />

      {/* Celebratory confetti burst */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: "50%",
              top: "30%",
              backgroundColor: ["#81C784", "#A09ABC", "#C9A08A", "#B6A6CA", "#4ADE80"][i % 5],
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: (Math.random() - 0.5) * 400,
              y: Math.random() * 400 - 100,
              opacity: 0,
              scale: 0,
              rotate: Math.random() * 720,
            }}
            transition={{
              duration: 1.5,
              delay: 0.5 + i * 0.02,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Success Animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="relative z-20 mb-8"
      >
        <div className="relative">
          {/* Breathing glow */}
          <motion.div
            className="absolute inset-0 rounded-full blur-2xl"
            style={{ backgroundColor: "var(--success)" }}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative w-24 h-24 rounded-full bg-[var(--success)] flex items-center justify-center shadow-xl"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            >
              <Check className="w-12 h-12 text-white" strokeWidth={3} />
            </motion.div>
          </motion.div>

          {/* Expanding rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border-2 border-[var(--success)]"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 2 + i * 0.5, opacity: 0 }}
              transition={{
                delay: 0.4 + i * 0.15,
                duration: 1,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative z-20 font-serif text-4xl md:text-5xl italic text-foreground text-center mb-3"
      >
        {t.title}
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="relative z-20 text-muted-foreground text-center mb-10"
      >
        {t.subtitle}
      </motion.p>

      {/* URL Card with shimmer */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative z-20 w-full max-w-md"
      >
        <motion.div
          className="absolute -inset-0.5 rounded-2xl opacity-50"
          style={{
            background: "linear-gradient(90deg, transparent, var(--success), transparent)",
            backgroundSize: "200% 100%",
          }}
          animate={{
            backgroundPosition: ["200% 0%", "-200% 0%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <div className="relative bg-white rounded-2xl border border-[var(--lavender)] p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[var(--lavender-light)] flex items-center justify-center flex-shrink-0">
              <motion.div 
                className="w-6 h-6 rounded-full bg-[var(--lavender-grey)] flex items-center justify-center"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(160, 154, 188, 0)",
                    "0 0 10px 3px rgba(160, 154, 188, 0.3)",
                    "0 0 0 0 rgba(160, 154, 188, 0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-white text-xs font-bold">V</span>
              </motion.div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground mb-0.5">voz.store</p>
              <p className="text-foreground font-medium truncate">voz.store/storefront/priya-warli-painting</p>
            </div>
            <RippleButton
              onClick={handleCopy}
              className={`p-2.5 rounded-xl transition-all ${
                copied
                  ? "bg-[var(--success)] text-white"
                  : "bg-[var(--lavender-light)] text-[var(--lavender-grey)] hover:bg-[var(--lavender)]"
              }`}
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </RippleButton>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="relative z-20 w-full max-w-md space-y-3 mt-6"
      >
        <Link
          href="/storefront/priya-warli-painting"
          className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-[var(--lavender-grey)] text-white font-serif text-lg italic hover:bg-[var(--lilac)] transition-colors relative overflow-hidden group"
        >
          <motion.div
            className="absolute inset-0 bg-white/10"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.5 }}
          />
          <ExternalLink className="w-5 h-5 relative z-10" />
          <span className="relative z-10">{t.viewStore}</span>
        </Link>

        <button
          onClick={handleWhatsAppShare}
          className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-[#25D366] text-white font-serif text-lg italic hover:bg-[#20BD5A] transition-colors relative overflow-hidden group"
        >
          <motion.div
            className="absolute inset-0 bg-white/10"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.5 }}
          />
          <MessageCircle className="w-5 h-5 relative z-10" />
          <span className="relative z-10">{t.shareWhatsApp}</span>
        </button>
      </motion.div>

      {/* Start Over */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        onClick={onStartOver}
        className="relative z-20 mt-8 text-muted-foreground hover:text-foreground transition-colors"
      >
        {t.startOver}
      </motion.button>
    </motion.div>
  )
}
