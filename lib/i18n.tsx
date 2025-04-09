"use client"

import { createContext, useState, useContext, type ReactNode, useEffect } from "react"

// Define available languages
export type Language = "en" | "es" | "fr" | "zh"

// Define the context type
type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

// Create the context with a default value
export const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
})

// English translations (default)
const translations: Record<Language, Record<string, string>> = {
  en: {
    "app.title": "DrugLedger",
    "app.description": "Blockchain Pharmaceutical Supply Chain Tracking",
    "nav.home": "Home",
    "nav.dashboard": "Dashboard",
    "nav.products": "Products",
    "nav.track": "Track",
    "nav.settings": "Settings",
    "nav.help": "Help",
    "action.connect": "Connect Wallet",
    "action.dashboard": "Go to Dashboard",
    // Add more translations as needed
  },
  es: {
    "app.title": "DrugLedger",
    "app.description": "Seguimiento de la Cadena de Suministro Farmacéutico Blockchain",
    "nav.home": "Inicio",
    "nav.dashboard": "Panel",
    "nav.products": "Productos",
    "nav.track": "Rastrear",
    "nav.settings": "Configuración",
    "nav.help": "Ayuda",
    "action.connect": "Conectar Billetera",
    "action.dashboard": "Ir al Panel",
    // Add more translations as needed
  },
  fr: {
    "app.title": "DrugLedger",
    "app.description": "Suivi de la Chaîne d'Approvisionnement Pharmaceutique Blockchain",
    "nav.home": "Accueil",
    "nav.dashboard": "Tableau de Bord",
    "nav.products": "Produits",
    "nav.track": "Suivre",
    "nav.settings": "Paramètres",
    "nav.help": "Aide",
    "action.connect": "Connecter le Portefeuille",
    "action.dashboard": "Aller au Tableau de Bord",
    // Add more translations as needed
  },
  zh: {
    "app.title": "DrugLedger",
    "app.description": "区块链制药供应链跟踪",
    "nav.home": "首页",
    "nav.dashboard": "仪表板",
    "nav.products": "产品",
    "nav.track": "追踪",
    "nav.settings": "设置",
    "nav.help": "帮助",
    "action.connect": "连接钱包",
    "action.dashboard": "前往仪表板",
    // Add more translations as needed
  },
}

// Create a hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext)
  return context
}

// Create the provider component
interface LanguageProviderProps {
  children: ReactNode
  defaultLanguage?: Language
}

export function LanguageProvider({ children, defaultLanguage = "en" }: LanguageProviderProps) {
  // Get initial language from localStorage or use default
  const [language, setLanguage] = useState<Language>(defaultLanguage)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("language") as Language
      if (
        storedLanguage &&
        (storedLanguage === "en" || storedLanguage === "es" || storedLanguage === "fr" || storedLanguage === "zh")
      ) {
        setLanguage(storedLanguage)
      }
    }
  }, [])

  // Function to change language
  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage)
    if (typeof window !== "undefined") {
      localStorage.setItem("language", newLanguage)
    }
  }

  // Translation function
  const t = (key: string): string => {
    if (!translations[language] || !translations[language][key]) {
      return translations["en"][key] || key
    }
    return translations[language][key]
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: changeLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}
