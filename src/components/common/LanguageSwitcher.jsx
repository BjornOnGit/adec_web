"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { AnimatePresence } from "framer-motion"
import { Globe, Check } from "lucide-react"

const LanguageSwitcher = ({ className }) => {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: "en", name: "English" },
    { code: "fr", name: "Français" },
    { code: "ar", name: "العربية" },
    { code: "pt", name: "Português" },
  ]

  const toggleDropdown = () => setIsOpen(!isOpen)
  const closeDropdown = () => setIsOpen(false)

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
    closeDropdown()
  }

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={toggleDropdown}
        className="bg-white text-primary hover:bg-primary hover:text-white transition-colors duration-300 rounded-full p-3 shadow-lg flex items-center justify-center"
        aria-label="Change language"
      >
        <Globe size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full mb-2 right-0 bg-white rounded-lg shadow-xl overflow-hidden w-40 z-50"
          >
            <div className="py-1">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => changeLanguage(language.code)}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <span className="flex-grow text-left">{language.name}</span>
                  {i18n.language === language.code && <Check size={16} className="text-primary" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LanguageSwitcher
