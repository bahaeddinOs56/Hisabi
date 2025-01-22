'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import TaxCalculator from '@/components/TaxCalculator'
import TaxInfo from '@/components/TaxInfo'

const categoryTaxRates = {
  individual: [
    { threshold: 40000, rate: 0 },
    { threshold: 60000, rate: 0.10 },
    { threshold: 80000, rate: 0.20 },
    { threshold: 100000, rate: 0.30 },
    { threshold: 180000, rate: 0.34 },
    { threshold: Infinity, rate: 0.37 },
  ],
  freelancer: [
    { threshold: 30000, rate: 0 },
    { threshold: 50000, rate: 0.10 },
    { threshold: 100000, rate: 0.20 },
    { threshold: 180000, rate: 0.30 },
    { threshold: Infinity, rate: 0.34 },
  ],
  company: [
    { threshold: 300000, rate: 0.10 },
    { threshold: 1000000, rate: 0.20 },
    { threshold: Infinity, rate: 0.31 },
  ],
  other: [
    { threshold: 30000, rate: 0 },
    { threshold: 50000, rate: 0.15 },
    { threshold: 100000, rate: 0.25 },
    { threshold: Infinity, rate: 0.35 },
  ],
}

export default function Calculator() {
  const { category } = useParams()
  const [income, setIncome] = useState<number>(0)
  const [isMonthly, setIsMonthly] = useState<boolean>(true)
  const [taxAmount, setTaxAmount] = useState<number>(0)
  const [effectiveRate, setEffectiveRate] = useState<number>(0)

  useEffect(() => {
    if (category === 'company') {
      setIsMonthly(false)
    }
  }, [category])

  const calculateTax = (incomeValue: number, monthly: boolean) => {
    const annualIncome = monthly ? incomeValue * 12 : incomeValue
    let tax = 0
    let remainingIncome = annualIncome

    const rates = categoryTaxRates[category as keyof typeof categoryTaxRates] || categoryTaxRates.other

    for (let i = 0; i < rates.length; i++) {
      if (remainingIncome > rates[i].threshold) {
        const taxableAmount = i === rates.length - 1 ? remainingIncome - rates[i-1].threshold : rates[i].threshold - (i > 0 ? rates[i-1].threshold : 0)
        tax += taxableAmount * rates[i].rate
        remainingIncome -= taxableAmount
      } else {
        break
      }
    }

    setTaxAmount(Math.round(tax))
    setEffectiveRate(Number(((tax / annualIncome) * 100).toFixed(2)))
  }

  return (
    <main className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Moroccan Income Tax Calculator 2025 - {category?.charAt(0).toUpperCase() + category?.slice(1)}
        </h1>
        <TaxCalculator
          income={income}
          setIncome={setIncome}
          isMonthly={isMonthly}
          setIsMonthly={setIsMonthly}
          calculateTax={calculateTax}
          category={category as string}
        />
        <TaxInfo taxAmount={taxAmount} effectiveRate={effectiveRate} />
      </div>
    </main>
  )
}

