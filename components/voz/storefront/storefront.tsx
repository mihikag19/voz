"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, MapPin, ShieldCheck, ChevronDown, Globe } from "lucide-react"
import Image from "next/image"

// Artisan data with translations
const artisans = {
  priya: {
    name: "Priya Sharma",
    nameNative: "प्रिया शर्मा",
    craft: "Warli Painting",
    craftNative: "वारली चित्रकला",
    location: "Palghar, Maharashtra, India",
    locationNative: "पालघर, महाराष्ट्र, भारत",
    language: "hi",
    languageName: "हिन्दी",
    story: {
      en: `Priya learned Warli art from her grandmother at age seven. Each piece takes three days to complete using natural white pigment on handmade paper. Her paintings tell stories of harvest, marriage, and the forest — traditions that have survived 3,000 years.

When she holds the bamboo brush, she feels connected to generations of Warli women who painted these same sacred symbols on the walls of their homes. The circular patterns represent the sun and moon, the triangular figures are dancers at a wedding, and the trees hold the spirits of the forest.

Every painting is a prayer, a celebration, and a piece of her soul.`,
      hi: `प्रिया ने सात साल की उम्र में अपनी दादी से वारली कला सीखी। प्रत्येक कृति को हस्तनिर्मित कागज पर प्राकृतिक सफेद रंजक का उपयोग करके पूरा करने में तीन दिन लगते हैं। उनकी पेंटिंग्स फसल, विवाह और जंगल की कहानियाँ बताती हैं — परंपराएँ जो 3,000 वर्षों से जीवित हैं।

जब वह बांस की तूलिका पकड़ती हैं, तो उन्हें वारली महिलाओं की पीढ़ियों से जुड़ाव महसूस होता है जिन्होंने अपने घरों की दीवारों पर इन्हीं पवित्र प्रतीकों को चित्रित किया। गोलाकार पैटर्न सूर्य और चंद्रमा का प्रतिनिधित्व करते हैं, त्रिकोणीय आकृतियाँ विवाह में नर्तक हैं, और पेड़ जंगल की आत्माओं को धारण करते हैं।

हर पेंटिंग एक प्रार्थना है, एक उत्सव है, और उनकी आत्मा का एक टुकड़ा है।`
    },
    phone: "+91-98765-43210",
    products: [
      {
        id: 1,
        name: { en: "Forest Ceremony", hi: "वन समारोह" },
        tagline: { 
          en: "A large Warli composition depicting a wedding ritual", 
          hi: "एक बड़ी वारली रचना जो विवाह अनुष्ठान को दर्शाती है" 
        },
        price: "$185",
        description: { 
          en: "This piece depicts a traditional Warli wedding ceremony surrounded by the sacred forest. The central spiral represents the tarpa dance, while the border shows the procession of villagers bringing gifts. Painted on handmade paper using natural white pigment made from rice paste and gum. 18x24 inches.", 
          hi: "यह कृति पवित्र जंगल से घिरे पारंपरिक वारली विवाह समारोह को दर्शाती है। केंद्रीय सर्पिल तारपा नृत्य का प्रतिनिधित्व करता है, जबकि सीमा उपहार लाने वाले ग्रामीणों के जुलूस को दर्शाती है। चावल के पेस्ट और गोंद से बने प्राकृतिक सफेद रंजक का उपयोग करके हस्तनिर्मित कागज पर चित्रित। 18x24 इंच।" 
        },
        materials: { en: "Natural pigment on handmade paper", hi: "हस्तनिर्मित कागज पर प्राकृतिक रंजक" },
        dimensions: "18x24 inches",
        image: "https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=800&h=1000&fit=crop",
        ethicsVerified: true,
      },
      {
        id: 2,
        name: { en: "Dance of the Tarpa", hi: "तारपा का नृत्य" },
        tagline: { 
          en: "Circular Warli piece showing the traditional Tarpa dance", 
          hi: "पारंपरिक तारपा नृत्य दिखाने वाली गोलाकार वारली कृति" 
        },
        price: "$120",
        description: { 
          en: "The Tarpa dance is performed during harvest festivals, with villagers forming a spiral around the musician playing the tarpa horn. This circular composition captures the rhythmic movement and community joy. 12x12 inches.", 
          hi: "तारपा नृत्य फसल उत्सवों के दौरान किया जाता है, जिसमें ग्रामीण तारपा बाजा बजाने वाले संगीतकार के चारों ओर एक सर्पिल बनाते हैं। यह गोलाकार रचना लयबद्ध गति और सामुदायिक खुशी को कैद करती है। 12x12 इंच।" 
        },
        materials: { en: "Natural pigment on handmade paper", hi: "हस्तनिर्मित कागज पर प्राकृतिक रंजक" },
        dimensions: "12x12 inches",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop",
        ethicsVerified: true,
      },
      {
        id: 3,
        name: { en: "Harvest Moon", hi: "फसल का चाँद" },
        tagline: { 
          en: "Depicting the rice harvest festival", 
          hi: "धान की फसल उत्सव का चित्रण" 
        },
        price: "$95",
        description: { 
          en: "A celebration of the rice harvest, showing women carrying grain, men with ploughs, and the sacred trees that bless the fields. The moon watches over the abundance. 10x14 inches.", 
          hi: "धान की फसल का उत्सव, जिसमें अनाज ले जाती महिलाएँ, हल वाले पुरुष, और खेतों को आशीर्वाद देने वाले पवित्र वृक्ष दिखाए गए हैं। चंद्रमा इस प्रचुरता को देखता है। 10x14 इंच।" 
        },
        materials: { en: "Natural pigment on handmade paper", hi: "हस्तनिर्मित कागज पर प्राकृतिक रंजक" },
        dimensions: "10x14 inches",
        image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=1000&fit=crop",
        ethicsVerified: true,
      },
    ],
  },
  carmen: {
    name: "Carmen Reyes",
    craft: "Oaxacan Textile Weaving",
    location: "Teotitlán del Valle, Oaxaca, Mexico",
    language: "es",
    languageName: "Español",
    story: {
      en: `Carmen is a fourth-generation weaver from Teotitlán del Valle, the weaving capital of Oaxaca. Her family has been creating zapotec textiles for over 100 years, using techniques passed down from the ancient Zapotec civilization.

She dyes her wool using only natural materials: cochineal insects for red, indigo plants for blue, and local herbs for yellows and greens. Each rug takes 2-6 weeks to complete on her wooden loom.`,
      es: `Carmen es una tejedora de cuarta generación de Teotitlán del Valle, la capital textil de Oaxaca. Su familia ha estado creando textiles zapotecas durante más de 100 años, utilizando técnicas transmitidas desde la antigua civilización zapoteca.

Ella tiñe su lana usando solo materiales naturales: insectos de cochinilla para el rojo, plantas de índigo para el azul, y hierbas locales para amarillos y verdes. Cada tapete toma de 2 a 6 semanas en completarse en su telar de madera.`
    },
    phone: "+52-951-123-4567",
    products: [],
  }
}

// UI text translations
const uiText = {
  en: {
    myStory: "My Story",
    myCreations: "My Creations",
    moreDetails: "More details",
    lessDetails: "Less details",
    inquire: "Inquire on WhatsApp",
    contact: "Contact",
    ethicsVerified: "Ethics Verified",
    createdWith: "Store created with",
    tagline: "Your store, in your voice",
    viewIn: "View in",
  },
  hi: {
    myStory: "मेरी कहानी",
    myCreations: "मेरी कृतियाँ",
    moreDetails: "अधिक विवरण",
    lessDetails: "कम विवरण",
    inquire: "व्हाट्सएप पर पूछताछ करें",
    contact: "संपर्क करें",
    ethicsVerified: "नैतिकता सत्यापित",
    createdWith: "इसके साथ बनाई गई दुकान",
    tagline: "आपकी दुकान, आपकी आवाज़ में",
    viewIn: "में देखें",
  },
  es: {
    myStory: "Mi Historia",
    myCreations: "Mis Creaciones",
    moreDetails: "Más detalles",
    lessDetails: "Menos detalles",
    inquire: "Preguntar en WhatsApp",
    contact: "Contactar",
    ethicsVerified: "Ética Verificada",
    createdWith: "Tienda creada con",
    tagline: "Tu tienda, en tu voz",
    viewIn: "Ver en",
  }
}

interface StorefrontProps {
  artisanId?: "priya" | "carmen"
}

export function Storefront({ artisanId = "priya" }: StorefrontProps) {
  const artisan = artisans[artisanId]
  const vendorLanguage = artisan.language as "hi" | "es"
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "hi" | "es">("en")
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
  const [expandedProduct, setExpandedProduct] = useState<number | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const ui = uiText[currentLanguage] || uiText.en
  const storyText = artisan.story[currentLanguage as keyof typeof artisan.story] || artisan.story.en

  // Update page title when language changes
  useEffect(() => {
    const title = currentLanguage === "hi" && artisanId === "priya"
      ? "प्रिया की वारली कला"
      : `${artisan.name}'s ${artisan.craft}`
    document.title = title
  }, [currentLanguage, artisan.name, artisan.craft, artisanId])

  const handleLanguageChange = (lang: "en" | "hi" | "es") => {
    if (lang === currentLanguage) {
      setIsLanguageDropdownOpen(false)
      return
    }
    setIsTransitioning(true)
    setIsLanguageDropdownOpen(false)
    
    setTimeout(() => {
      setCurrentLanguage(lang)
      setTimeout(() => setIsTransitioning(false), 150)
    }, 150)
  }

  const handleWhatsApp = (productName?: string) => {
    const message = productName
      ? `Hi ${artisan.name}! I'm interested in the ${productName} from your Voz store.`
      : `Hi ${artisan.name}! I found your store on Voz and would love to learn more about your work.`
    window.open(`https://wa.me/${artisan.phone.replace(/[^0-9+]/g, "")}?text=${encodeURIComponent(message)}`, "_blank")
  }

  const getLocalizedText = (textObj: { en: string; hi?: string; es?: string }) => {
    return textObj[currentLanguage as keyof typeof textObj] || textObj.en
  }

  const displayName = currentLanguage === "hi" && 'nameNative' in artisan 
    ? artisan.nameNative 
    : artisan.name

  const displayCraft = currentLanguage === "hi" && 'craftNative' in artisan 
    ? artisan.craftNative 
    : artisan.craft

  const displayLocation = currentLanguage === "hi" && 'locationNative' in artisan
    ? artisan.locationNative
    : artisan.location

  return (
    <div className="min-h-screen bg-[var(--cream)]">
      {/* Language Toggle Bar - Prominent at the top */}
      <motion.div 
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-[#FDF8F3] border-b border-[var(--almond-silk)] shadow-sm"
      >
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Globe className="w-4 h-4" />
            <span>{ui.viewIn}:</span>
          </div>
          
          <div className="relative">
            <button
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-[var(--lavender)] hover:border-[var(--lavender-grey)] transition-colors"
            >
              <span className="font-medium text-foreground">
                {currentLanguage === "en" ? "English" : currentLanguage === "hi" ? "हिन्दी" : "Español"}
              </span>
              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isLanguageDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {isLanguageDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-40 bg-white rounded-lg border border-[var(--lavender)] shadow-lg overflow-hidden z-50"
                >
                  <button
                    onClick={() => handleLanguageChange("en")}
                    className={`w-full px-4 py-3 text-left hover:bg-[var(--lavender-light)] transition-colors ${currentLanguage === "en" ? "bg-[var(--lavender-light)]" : ""}`}
                  >
                    English
                  </button>
                  {vendorLanguage === "hi" && (
                    <button
                      onClick={() => handleLanguageChange("hi")}
                      className={`w-full px-4 py-3 text-left hover:bg-[var(--lavender-light)] transition-colors ${currentLanguage === "hi" ? "bg-[var(--lavender-light)]" : ""}`}
                    >
                      हिन्दी — Hindi
                    </button>
                  )}
                  {vendorLanguage === "es" && (
                    <button
                      onClick={() => handleLanguageChange("es")}
                      className={`w-full px-4 py-3 text-left hover:bg-[var(--lavender-light)] transition-colors ${currentLanguage === "es" ? "bg-[var(--lavender-light)]" : ""}`}
                    >
                      Español — Spanish
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px]">
        <Image
          src="https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=1600&h=1000&fit=crop"
          alt="Warli art"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2D2A32] via-[#2D2A32]/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 text-white/70 mb-3"
              style={{ opacity: isTransitioning ? 0 : 1, transition: "opacity 150ms" }}
            >
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{displayLocation}</span>
            </motion.div>
            
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="font-serif text-5xl md:text-7xl italic text-white mb-4"
              style={{ opacity: isTransitioning ? 0 : 1, transition: "opacity 150ms" }}
            >
              {displayName}
            </motion.h1>
            
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="font-serif text-xl md:text-2xl italic text-white/80"
              style={{ opacity: isTransitioning ? 0 : 1, transition: "opacity 150ms" }}
            >
              {displayCraft}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Artisan Story Section */}
      <section className="py-12 md:py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 
              className="font-serif text-3xl md:text-4xl italic text-foreground mb-6"
              style={{ opacity: isTransitioning ? 0 : 1, transition: "opacity 150ms" }}
            >
              {ui.myStory}
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="prose prose-lg max-w-none"
            style={{ opacity: isTransitioning ? 0 : 1, transition: "opacity 150ms" }}
          >
            {storyText.split("\n\n").map((paragraph, index) => (
              <p
                key={index}
                className="text-muted-foreground leading-relaxed mb-6 text-lg"
              >
                {paragraph}
              </p>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      {'products' in artisan && artisan.products.length > 0 && (
        <section className="py-12 md:py-20 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-3xl md:text-4xl italic text-foreground text-center mb-12"
              style={{ opacity: isTransitioning ? 0 : 1, transition: "opacity 150ms" }}
            >
              {ui.myCreations}
            </motion.h2>

            <div className="space-y-8">
              {artisan.products.map((product, index) => (
                <motion.article
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-[var(--cream)] rounded-3xl overflow-hidden border border-[var(--lavender)]">
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <Image
                        src={product.image}
                        alt={getLocalizedText(product.name)}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {product.ethicsVerified && (
                        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-[var(--success)]/90 backdrop-blur-sm rounded-full text-white text-sm">
                          <ShieldCheck className="w-4 h-4" />
                          <span style={{ opacity: isTransitioning ? 0 : 1, transition: "opacity 150ms" }}>
                            {ui.ethicsVerified}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-6 md:p-8">
                      <div 
                        className="flex items-start justify-between gap-4 mb-3"
                        style={{ opacity: isTransitioning ? 0 : 1, transition: "opacity 150ms" }}
                      >
                        <div>
                          <h3 className="font-serif text-2xl md:text-3xl italic text-foreground mb-1">
                            {getLocalizedText(product.name)}
                          </h3>
                          <p className="text-muted-foreground">{getLocalizedText(product.tagline)}</p>
                        </div>
                        <span className="text-2xl font-serif italic text-[var(--lavender-grey)] flex-shrink-0">
                          {product.price}
                        </span>
                      </div>

                      <button
                        onClick={() => setExpandedProduct(expandedProduct === product.id ? null : product.id)}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mt-4"
                        style={{ opacity: isTransitioning ? 0 : 1, transition: "opacity 150ms" }}
                      >
                        <span>{expandedProduct === product.id ? ui.lessDetails : ui.moreDetails}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${expandedProduct === product.id ? "rotate-180" : ""}`} />
                      </button>

                      <AnimatePresence>
                        {expandedProduct === product.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <p 
                              className="text-muted-foreground mt-4 leading-relaxed"
                              style={{ opacity: isTransitioning ? 0 : 1, transition: "opacity 150ms" }}
                            >
                              {getLocalizedText(product.description)}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <button
                        onClick={() => handleWhatsApp(getLocalizedText(product.name))}
                        className="mt-6 w-full flex items-center justify-center gap-2 py-3 px-6 bg-[var(--lavender-grey)] text-white rounded-xl font-serif italic hover:bg-[var(--lilac)] transition-colors"
                        style={{ opacity: isTransitioning ? 0 : 1, transition: "opacity 150ms" }}
                      >
                        <MessageCircle className="w-5 h-5" />
                        {ui.inquire}
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-[var(--lavender)]">
        <div className="max-w-4xl mx-auto text-center">
          <p 
            className="text-sm text-muted-foreground mb-2"
            style={{ opacity: isTransitioning ? 0 : 1, transition: "opacity 150ms" }}
          >
            {ui.createdWith}
          </p>
          <p className="font-serif text-2xl italic text-foreground">Voz</p>
          <p 
            className="text-xs text-muted-foreground mt-2"
            style={{ opacity: isTransitioning ? 0 : 1, transition: "opacity 150ms" }}
          >
            {ui.tagline}
          </p>
        </div>
      </footer>

      {/* Sticky WhatsApp Button */}
      <motion.button
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1 }}
        onClick={() => handleWhatsApp()}
        className="fixed bottom-6 right-6 flex items-center gap-2 px-5 py-3 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20BD5A] transition-colors z-40"
        style={{ opacity: isTransitioning ? 0 : 1, transition: "opacity 150ms" }}
      >
        <MessageCircle className="w-5 h-5" />
        <span className="font-medium">{ui.contact} {artisan.name.split(" ")[0]}</span>
      </motion.button>
    </div>
  )
}
