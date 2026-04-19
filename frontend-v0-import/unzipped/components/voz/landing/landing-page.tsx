"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion"
import { Mic, Camera, Sparkles, Globe, ArrowRight, Check } from "lucide-react"
import { AnimatedBackground } from "../ui/animated-background"
import { AnimatedLogo } from "../ui/animated-logo"

interface LandingPageProps {
  onGetStarted: () => void
}

const features = [
  {
    icon: Camera,
    title: "Upload Photos",
    description: "Snap or upload images of your handcrafted products"
  },
  {
    icon: Mic,
    title: "Tell Your Story",
    description: "Record your voice to share the tradition behind your craft"
  },
  {
    icon: Sparkles,
    title: "AI Creates Your Store",
    description: "Watch as AI transforms your uploads into a beautiful storefront"
  },
  {
    icon: Globe,
    title: "Reach 47 Countries",
    description: "Your store is automatically translated and ready for the world"
  }
]

const testimonials = [
  {
    quote: "I went from selling at the local market to shipping worldwide in one afternoon.",
    name: "Priya Sharma",
    craft: "Warli Painter, Maharashtra"
  },
  {
    quote: "Voz understood my story better than I could have written it myself.",
    name: "Carmen Reyes",
    craft: "Textile Weaver, Oaxaca"
  }
]

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const springX = useSpring(cursorX, { damping: 25, stiffness: 200 })
  const springY = useSpring(cursorY, { damping: 25, stiffness: 200 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [cursorX, cursorY])

  return (
    <div ref={containerRef} className="min-h-screen bg-[var(--cream)] relative overflow-x-hidden">
      {/* Animated background with gradient mesh and bokeh */}
      <AnimatedBackground variant="warm" />
      
      {/* Cursor glow effect */}
      <motion.div
        className="fixed w-64 h-64 pointer-events-none z-0 hidden md:block"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, rgba(201, 160, 138, 0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Animated Logo */}
          <div className="mb-8">
            <AnimatedLogo size="lg" />
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="text-xl md:text-2xl text-[var(--muted-foreground)] mb-4 font-serif italic"
          >
            Your Store, In Your Voice
          </motion.p>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="text-base md:text-lg text-[var(--muted-foreground)] mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Create a professional storefront in minutes using just your voice and photos. 
            No writing. No design skills. Just your craft and your story.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={onGetStarted}
            className="group relative px-8 py-4 bg-[var(--lavender-grey)] text-white rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
            <span className="relative flex items-center gap-2">
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>

          {/* Trust badge */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            className="mt-6 text-sm text-[var(--muted-foreground)]"
          >
            Trusted by 2,000+ artisans worldwide
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-[var(--lavender)] flex items-start justify-center p-1"
          >
            <motion.div className="w-1.5 h-3 bg-[var(--lavender-grey)] rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-serif text-center text-[var(--foreground)] mb-16"
          >
            How It Works
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="group relative bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[var(--lavender-light)] hover:border-[var(--lavender)] transition-colors"
              >
                {/* Step number */}
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-[var(--lavender-grey)] text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--lavender-light)] flex items-center justify-center shrink-0 group-hover:bg-[var(--lavender)] transition-colors">
                    <feature.icon className="w-6 h-6 text-[var(--lavender-grey)]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-[var(--foreground)] mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-24 px-6 bg-gradient-to-b from-transparent to-[var(--lavender-light)]/30">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-serif text-center text-[var(--foreground)] mb-16"
          >
            Artisan Stories
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.blockquote
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative bg-white rounded-2xl p-8 shadow-sm border border-[var(--lavender-light)]"
              >
                {/* Quote mark */}
                <div className="absolute -top-4 left-6 text-6xl text-[var(--lavender)] font-serif leading-none">
                  &ldquo;
                </div>
                
                <p className="text-[var(--foreground)] text-lg leading-relaxed mb-6 font-serif italic">
                  {testimonial.quote}
                </p>
                
                <footer className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--lavender-light)] flex items-center justify-center">
                    <span className="text-sm font-medium text-[var(--lavender-grey)]">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <cite className="not-italic font-medium text-[var(--foreground)]">
                      {testimonial.name}
                    </cite>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      {testimonial.craft}
                    </p>
                  </div>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Features List Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-serif text-[var(--foreground)] mb-8"
          >
            Everything You Need
          </motion.h2>

          <motion.ul
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid sm:grid-cols-2 gap-4 text-left max-w-xl mx-auto"
          >
            {[
              "Voice-to-text product descriptions",
              "AI-powered image enhancement",
              "47 language translations",
              "Ethics & authenticity verification",
              "WhatsApp order integration",
              "Mobile-first storefront",
              "No monthly fees",
              "SSL security included"
            ].map((feature, index) => (
              <motion.li
                key={feature}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="flex items-center gap-3 text-[var(--foreground)]"
              >
                <Check className="w-5 h-5 text-[var(--success)] shrink-0" />
                <span>{feature}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-serif text-[var(--foreground)] mb-4">
            Ready to Share Your Craft?
          </h2>
          <p className="text-[var(--muted-foreground)] mb-8 text-lg">
            Join thousands of artisans who have already launched their stores with Voz.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={onGetStarted}
            className="group px-10 py-5 bg-[var(--lavender-grey)] text-white rounded-full font-medium text-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <span className="flex items-center gap-3">
              Create Your Store
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-[var(--lavender-light)]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-serif text-2xl italic text-[var(--lavender-grey)]">
            Voz
          </div>
          <p className="text-sm text-[var(--muted-foreground)]">
            &copy; 2024 Voz. Empowering artisans worldwide.
          </p>
        </div>
      </footer>
    </div>
  )
}
