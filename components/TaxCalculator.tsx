'use client'

import { ChangeEvent } from 'react'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../utils/translations'

interface TaxCalculatorProps {
  income: number
  setIncome: (income: number) => void
  isMonthly: boolean
  setIsMonthly: (isMonthly: boolean) => void
  isCompany: boolean
  setTaxAmount: (tax: number) => void
  setEffectiveRate: (rate: number) => void
}

export default function TaxCalculator({
  income,
  setIncome,
  isMonthly,
  setIsMonthly,
  isCompany,
  setTaxAmount,
  setEffectiveRate,
}: TaxCalculatorProps) {
  const { language } = useLanguage()
  const t = translations[language]

  const calculateTax = (incomeValue: number, monthly: boolean) => {
    const annualIncome = monthly ? incomeValue * 12 : incomeValue
    let tax = 0
    let remainingIncome = annualIncome

    if (!isCompany) {
      // Individual Income Tax calculation
      if (remainingIncome > 180000) {
        tax += (remainingIncome - 180000) * 0.37
        remainingIncome = 180000
      }
      if (remainingIncome > 100000) {
        tax += (remainingIncome - 100000) * 0.34
        remainingIncome = 100000
      }
      if (remainingIncome > 80000) {
        tax += (remainingIncome - 80000) * 0.30
        remainingIncome = 80000
      }
      if (remainingIncome > 60000) {
        tax += (remainingIncome - 60000) * 0.20
        remainingIncome = 60000
      }
      if (remainingIncome > 40000) {
        tax += (remainingIncome - 40000) * 0.10
      }
    } else {
      // Corporate Income Tax calculation
      if (remainingIncome > 100000000) {
        tax += (remainingIncome - 100000000) * 0.35
        remainingIncome = 100000000
      }
      if (remainingIncome > 1000000) {
        tax += (remainingIncome - 1000000) * 0.2275
        remainingIncome = 1000000
      }
      if (remainingIncome > 300000) {
        tax += (remainingIncome - 300000) * 0.20
        remainingIncome = 300000
      }
      tax += remainingIncome * 0.175
    }

    // Social Solidarity Contribution
    if (annualIncome > 1000000) {
      tax += (annualIncome - 1000000) * 0.015
    }

    setTaxAmount(Math.round(tax))
    setEffectiveRate(Number(((tax / annualIncome) * 100).toFixed(2)))
  }

  const handleIncomeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const incomeValue = Number(e.target.value)
    setIncome(incomeValue)
    calculateTax(incomeValue, isMonthly)
  }

  const handleMonthlyToggle = (checked: boolean) => {
    setIsMonthly(checked);
    setIncome(0);
    setTaxAmount(0);
    setEffectiveRate(0);
  }

  return (
    <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
      {!isCompany && (
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="income-type" className="text-gray-700 text-sm font-medium">
              {isMonthly ? t.monthlyIncome : t.annualIncome} (MAD)
            </Label>
            <div className="flex items-center space-x-2">
              <Label htmlFor="income-type" className={`text-sm ${isMonthly ? 'font-medium' : ''}`}>{t.monthly}</Label>
              <Switch
                id="income-type"
                checked={!isMonthly}
                onCheckedChange={(checked) => handleMonthlyToggle(!checked)}
              />
              <Label htmlFor="income-type" className={`text-sm ${!isMonthly ? 'font-medium' : ''}`}>{t.annual}</Label>
            </div>
          </div>
        </div>
      )}
      <div className="mb-4">
        <input
          className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          id="income"
          type="number"
          placeholder={`${t.enter} ${!isCompany ? (isMonthly ? t.monthlyIncome.toLowerCase() : t.annualIncome.toLowerCase()) : t.annualIncome.toLowerCase()}`}
          value={income || ''}
          onChange={handleIncomeChange}
        />
      </div>
    </div>
  )
}

