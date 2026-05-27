"use client"

import { motion } from "framer-motion"
import { ArrowRight, Camera, Mic, Sparkles } from "lucide-react"
import { AnimatedBackground } from "../ui/animated-background"

interface LandingPageProps {
  onGetStarted: () => void
}

const steps = [
  {
    num: "01",
    icon: Camera,
    title: "Photograph",
    desc: "Snap your work — any phone camera works.",
  },
  {
    num: "02",
    icon: Mic,
    title: "Speak",
    desc: "Describe your craft in your own language. We understand.",
  },
  {
    num: "03",
    icon: Sparkles,
    title: "Your storefront goes live",
    desc: "A real store, shareable by WhatsApp, in minutes.",
  },
]

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[var(--cream)] relative overflow-x-hidden">
      <AnimatedBackground variant="warm" />

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto"
        >
          {/* Wordmark */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="font-serif font-medium text-[var(--foreground)] text-2xl md:text-3xl tracking-[0.18em] uppercase mb-16"
          >
            Voz
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-serif text-6xl md:text-8xl text-[var(--foreground)] leading-[1.0] tracking-tight mb-8"
          >
            Your <em>voice</em>.
            <br />
            Your store.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg md:text-xl text-[var(--muted-foreground)] mb-12 max-w-md mx-auto leading-relaxed"
          >
            Take a photo. Speak your story.
            <br />
            Your storefront is live in minutes.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onGetStarted}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-[var(--lavender-grey)] text-white rounded-full font-medium text-lg hover:bg-[var(--lilac)] transition-colors"
          >
            Create your store
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="mt-8 text-sm text-[var(--muted-foreground)] italic"
          >
            We speak South Asian and Latin American languages, African languages, and many more.
          </motion.p>
        </motion.div>
      </section>

      {/* How it works */}
      <section className="relative py-20 px-6 border-t border-[var(--lavender-light)]">
        <div className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs tracking-widest uppercase text-[var(--muted-foreground)] text-center mb-16"
          >
            How it works
          </motion.p>

          <div className="grid md:grid-cols-3 gap-10 md:gap-16">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="flex flex-col items-center md:items-start text-center md:text-left"
              >
                <div className="w-11 h-11 rounded-full bg-[var(--lavender-light)] flex items-center justify-center mb-5">
                  <step.icon className="w-5 h-5 text-[var(--lavender-grey)]" />
                </div>
                <p className="font-serif text-5xl text-[var(--lavender-light)] leading-none mb-3">
                  {step.num}
                </p>
                <h3 className="font-serif text-xl text-[var(--foreground)] mb-2">{step.title}</h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-6 border-t border-[var(--lavender-light)]">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="font-serif font-medium text-[var(--foreground)] text-sm tracking-[0.18em] uppercase">Voz</span>
          <p className="text-xs text-[var(--muted-foreground)]">Made by hand. Shipped with care.</p>
        </div>
      </footer>
    </div>
  )
}
