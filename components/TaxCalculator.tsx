"use client"

import type { ChangeEvent } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useLanguage } from "../contexts/LanguageContext"
import { translations } from "../utils/translations"

interface TaxCalculatorProps {
  income: number
  setIncome: (income: number) => void
  isMonthly: boolean
  setIsMonthly: (isMonthly: boolean) => void
  calculateTax: (incomeValue: number, monthly: boolean) => void
  category: string
  isCompany: boolean
  setTaxAmount: (amount: number) => void
  setEffectiveRate: (rate: number) => void
}

export default function TaxCalculator({
  income,
  setIncome,
  isMonthly,
  setIsMonthly,
  calculateTax,
  category,
  isCompany,
  setTaxAmount,
  setEffectiveRate,
}: TaxCalculatorProps) {
  const { language } = useLanguage()
  const t = translations[language]

  const handleIncomeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const incomeValue = Number(e.target.value)
    setIncome(incomeValue)
    calculateTax(incomeValue, isMonthly)
  }

  const handleMonthlyToggle = (checked: boolean) => {
    setIsMonthly(checked)
    setIncome(0)
    setTaxAmount(0)
    setEffectiveRate(0)
    calculateTax(0, checked)
  }

  return (
    <div className="bg-white shadow-sm rounded-lg p-4 pb-6 sm:pb-4 mb-4">
      {!isCompany && (
        <div className="mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-50 p-3 py-4 sm:py-3 rounded-lg border border-gray-200">
            <Label htmlFor="income-type" className="text-gray-700 text-sm font-medium mb-2 sm:mb-0">
              {isMonthly ? t.monthlyIncome : t.annualIncome} (MAD)
            </Label>
            <div className="flex items-center space-x-4">
              <Label
                htmlFor="income-type"
                className={`text-sm ${isMonthly ? "font-medium text-primary" : "text-gray-500"}`}
              >
                {t.monthly}
              </Label>
              <Switch
                id="income-type"
                checked={!isMonthly}
                onCheckedChange={(checked) => handleMonthlyToggle(!checked)}
                className="data-[state=checked]:bg-primary"
              />
              <Label
                htmlFor="income-type"
                className={`text-sm ${!isMonthly ? "font-medium text-primary" : "text-gray-500"}`}
              >
                {t.annual}
              </Label>
            </div>
          </div>
        </div>
      )}
      <div>
        <input
          className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          id="income"
          type="number"
          placeholder={`${t.enter} ${!isCompany ? (isMonthly ? t.monthlyIncome.toLowerCase() : t.annualIncome.toLowerCase()) : t.annualRevenue.toLowerCase()}`}
          value={income || ""}
          onChange={handleIncomeChange}
        />
      </div>
    </div>
  )
}

