"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import NavigationBar from "../components/NavigationBar"
import { useLanguage } from "../contexts/LanguageContext"
import { translations } from "../utils/translations"

const DynamicHomeContent = dynamic(() => import("../components/HomeContent"), {
  ssr: false,
})

export default function Home() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />
      <main className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">{t.moroccanTaxCalculator2025}</h1>
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <DynamicHomeContent />
        </Suspense>
      </main>
    </div>
  )
}

