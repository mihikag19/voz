"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Check } from "lucide-react"

export interface LanguageOption {
  code: string
  greeting: string
  nativeName: string
  englishName: string
}

// Complete list of languages with greetings
export const allLanguages: LanguageOption[] = [
  { code: "en", greeting: "Hello", nativeName: "English", englishName: "English" },
  { code: "es", greeting: "Hola", nativeName: "Español", englishName: "Spanish" },
  { code: "hi", greeting: "नमस्ते", nativeName: "हिन्दी", englishName: "Hindi" },
  { code: "vi", greeting: "Xin chào", nativeName: "Tiếng Việt", englishName: "Vietnamese" },
  { code: "ar", greeting: "مرحبا", nativeName: "العربية", englishName: "Arabic" },
  { code: "pt", greeting: "Olá", nativeName: "Português", englishName: "Portuguese" },
  { code: "ko", greeting: "안녕하세요", nativeName: "한국어", englishName: "Korean" },
  { code: "fr", greeting: "Bonjour", nativeName: "Français", englishName: "French" },
  { code: "it", greeting: "Ciao", nativeName: "Italiano", englishName: "Italian" },
  { code: "ja", greeting: "こんにちは", nativeName: "日本語", englishName: "Japanese" },
  { code: "tr", greeting: "Merhaba", nativeName: "Türkçe", englishName: "Turkish" },
  { code: "ru", greeting: "Привет", nativeName: "Русский", englishName: "Russian" },
  { code: "pa", greeting: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ", nativeName: "ਪੰਜਾਬੀ", englishName: "Punjabi" },
  { code: "ta", greeting: "வணக்கம்", nativeName: "தமிழ்", englishName: "Tamil" },
  { code: "te", greeting: "నమస్కారం", nativeName: "తెలుగు", englishName: "Telugu" },
  { code: "bn", greeting: "নমস্কার", nativeName: "বাংলা", englishName: "Bengali" },
  { code: "zu", greeting: "Sawubona", nativeName: "isiZulu", englishName: "Zulu" },
  { code: "sw", greeting: "Habari", nativeName: "Kiswahili", englishName: "Swahili" },
  { code: "he", greeting: "Shalom", nativeName: "עברית", englishName: "Hebrew" },
  { code: "fa", greeting: "Salam", nativeName: "فارسی", englishName: "Persian" },
  { code: "fi", greeting: "Hei", nativeName: "Suomi", englishName: "Finnish" },
  { code: "de", greeting: "Hallo", nativeName: "Deutsch", englishName: "German" },
  { code: "cs", greeting: "Ahoj", nativeName: "Čeština", englishName: "Czech" },
  { code: "pl", greeting: "Cześć", nativeName: "Polski", englishName: "Polish" },
  { code: "hu", greeting: "Szia", nativeName: "Magyar", englishName: "Hungarian" },
  { code: "ro", greeting: "Buna", nativeName: "Română", englishName: "Romanian" },
  { code: "hr", greeting: "Zdravo", nativeName: "Hrvatski", englishName: "Croatian" },
  { code: "el", greeting: "Γεια", nativeName: "Ελληνικά", englishName: "Greek" },
  { code: "tl", greeting: "Kamusta", nativeName: "Tagalog", englishName: "Tagalog" },
  { code: "sn", greeting: "Mhoro", nativeName: "Shona", englishName: "Shona" },
  { code: "si", greeting: "ආයුබෝවන්", nativeName: "සිංහල", englishName: "Sinhala" },
  { code: "th", greeting: "สวัสดี", nativeName: "ไทย", englishName: "Thai" },
  { code: "lo", greeting: "ສະບາຍດີ", nativeName: "ລາວ", englishName: "Lao" },
  { code: "km", greeting: "ជំរាបសួរ", nativeName: "ភាសាខ្មែរ", englishName: "Khmer" },
  { code: "my", greeting: "မင်္ဂလာပါ", nativeName: "မြန်မာ", englishName: "Burmese" },
  { code: "mn", greeting: "Сайн уу", nativeName: "Монгол", englishName: "Mongolian" },
  { code: "kk", greeting: "Сәлем", nativeName: "Қазақша", englishName: "Kazakh" },
  { code: "ky", greeting: "Саламатсызбы", nativeName: "Кыргызча", englishName: "Kyrgyz" },
  { code: "tg", greeting: "Салом", nativeName: "Тоҷикӣ", englishName: "Tajik" },
  { code: "uz", greeting: "Xush kelibsiz", nativeName: "Oʻzbekcha", englishName: "Uzbek" },
]

// Just the cycling greetings in exact order specified
export const cyclingGreetings = [
  "Hello", "Hola", "नमस्ते", "Xin chào", "مرحبا", "Olá", "안녕하세요", "Bonjour", 
  "Ciao", "こんにちは", "Merhaba", "Привет", "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ", "வணக்கம்", "నమస్కారం", 
  "নমস্কার", "Sawubona", "Habari", "Shalom", "Salam", "Hei", "Hallo", "Ahoj", 
  "Cześć", "Szia", "Buna", "Zdravo", "Γεια", "Selam", "Salut", "Kamusta", 
  "Kumusta", "Mhoro", "Hujambo", "Mbote", "Ayubowan", "ආයුබෝවන්", "สวัสดี", 
  "ສະບາຍດີ", "ជំរាបសួរ", "မင်္ဂလာပါ", "Сайн уу", "Сәлем", "Саламатсызбы", "Салом", "Xush kelibsiz"
]

interface LanguageSelectorProps {
  onSelect: (language: LanguageOption) => void
  selectedCode?: string
}

export function LanguageSelector({ onSelect, selectedCode }: LanguageSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")
  
  const filteredLanguages = useMemo(() => {
    if (!searchQuery) return allLanguages
    const query = searchQuery.toLowerCase()
    return allLanguages.filter(
      lang => 
        lang.nativeName.toLowerCase().includes(query) ||
        lang.englishName.toLowerCase().includes(query) ||
        lang.greeting.toLowerCase().includes(query)
    )
  }, [searchQuery])

  return (
    <div className="w-full max-w-sm">
      {/* Search input */}
      <div className="relative mb-2">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Choose your language"
          className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-colors"
        />
      </div>

      {/* Dropdown list */}
      <motion.div 
        className="bg-white/20 backdrop-blur-md rounded-xl border border-white/20 max-h-60 overflow-y-auto"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {filteredLanguages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onSelect(lang)}
            className={`w-full px-4 py-3 flex items-center justify-between hover:bg-white/10 transition-colors text-left ${
              selectedCode === lang.code ? "bg-white/15" : ""
            }`}
          >
            <div>
              <span className="text-white font-medium">{lang.nativeName}</span>
              <span className="text-white/50 ml-2">— {lang.englishName}</span>
            </div>
            {selectedCode === lang.code && (
              <Check className="w-4 h-4 text-white" />
            )}
          </button>
        ))}
        {filteredLanguages.length === 0 && (
          <div className="px-4 py-6 text-center text-white/50">
            No languages found
          </div>
        )}
      </motion.div>
    </div>
  )
}
