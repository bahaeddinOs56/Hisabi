"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import NavigationBar from "../components/NavigationBar"
import { useLanguage } from "../contexts/LanguageContext"
import { translations } from "../utils/translations"
import styles from "./page.module.css"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe } from "lucide-react"

const DynamicHomeContent = dynamic(() => import("../components/HomeContent"), {
  ssr: false,
})

export default function Home() {
  const { language, setLanguage } = useLanguage()
  const t = translations[language]

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />
      <div className={styles.backgroundContainer}>
        <div className={styles.backgroundImage} />
        <main className="container mx-auto px-4 py-6 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-end mb-4">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[180px]">
                <Globe className="mr-2 h-4 w-4" />
                <SelectValue placeholder={t.language} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">🇫🇷 Français</SelectItem>
                <SelectItem value="ar">🇲🇦 العربية</SelectItem>
                <SelectItem value="en">🇬🇧 English</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
            {t.moroccanTaxCalculator2025}
          </h1>
          <Suspense fallback={<div className="text-center">Chargement...</div>}>
            <DynamicHomeContent />
          </Suspense>
        </main>
      </div>
    </div>
  )
}

