"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import TaxCalculator from "@/components/TaxCalculator"
import TaxInfo from "@/components/TaxInfo"
import { useLanguage } from "@/contexts/LanguageContext"
import { translations } from "@/utils/translations"
import { categoryTaxRates } from "@/utils/taxRates"

export default function Calculator() {
  const { category } = useParams()
  const [income, setIncome] = useState<number>(0)
  const [isMonthly, setIsMonthly] = useState<boolean>(true)
  const [taxAmount, setTaxAmount] = useState<number>(0)
  const [effectiveRate, setEffectiveRate] = useState<number>(0)
  const [isCompany, setIsCompany] = useState<boolean>(false)
  const { language } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    if (category === "company") {
      setIsMonthly(false)
      setIsCompany(true)
    } else {
      setIsCompany(false)
    }
  }, [category])

  const calculateTax = (incomeValue: number, monthly: boolean) => {
    const annualIncome = monthly ? incomeValue * 12 : incomeValue
    let tax = 0
    let remainingIncome = annualIncome

    const rates = categoryTaxRates[category as keyof typeof categoryTaxRates] || categoryTaxRates.other

    for (let i = 0; i < rates.length; i++) {
      if (remainingIncome > rates[i].threshold) {
        const taxableAmount =
          i === rates.length - 1
            ? remainingIncome - rates[i - 1].threshold
            : rates[i].threshold - (i > 0 ? rates[i - 1].threshold : 0)
        tax += taxableAmount * rates[i].rate
        remainingIncome -= taxableAmount
      } else {
        break
      }
    }

    setTaxAmount(Math.round(tax))
    setEffectiveRate(Number(((tax / annualIncome) * 100).toFixed(2)))
  }

  const getCategoryName = (category: string | string[] | undefined): string => {
    if (typeof category === "string") {
      return category.charAt(0).toUpperCase() + category.slice(1)
    }
    return t.unknown
  }

  return (
    <main className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          {t.moroccanTaxCalculator2025} - {getCategoryName(category)}
        </h1>
        <TaxCalculator
          income={income}
          setIncome={setIncome}
          isMonthly={isMonthly}
          setIsMonthly={setIsMonthly}
          calculateTax={calculateTax}
          category={category as string}
          isCompany={isCompany}
          setTaxAmount={setTaxAmount}
          setEffectiveRate={setEffectiveRate}
        />
        <TaxInfo taxAmount={taxAmount} effectiveRate={effectiveRate} />
      </div>
    </main>
  )
}

