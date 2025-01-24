"use client"

import { useState, type ChangeEvent } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useLanguage } from "../contexts/LanguageContext"
import { translations } from "../utils/translations"
import { categoryTaxRates, FAMILY_ALLOWANCE_DEDUCTION, MAX_FAMILY_ALLOWANCE_DEDUCTION } from "../utils/taxRates"

interface TaxCalculatorProps {
  income: number
  setIncome: (income: number) => void
  isMonthly: boolean
  setIsMonthly: (isMonthly: boolean) => void
  calculateTax: (incomeValue: number, monthly: boolean, dependents: number) => void
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
  const [dependents, setDependents] = useState<number>(0)

  const handleIncomeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const incomeValue = Number(e.target.value)
    setIncome(incomeValue)
    calculateTax(incomeValue, isMonthly, dependents)
  }

  const handleMonthlyToggle = (checked: boolean) => {
    setIsMonthly(checked)
    calculateTax(income, checked, dependents)
  }

  const handleDependentsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const dependentsValue = Number(e.target.value)
    setDependents(dependentsValue)
    calculateTax(income, isMonthly, dependentsValue)
  }

  return (
    <div className="bg-white shadow-sm rounded-lg p-4 pb-6 sm:pb-4 mb-4 mt-8 sm:mt-6">
      {!isCompany && (
        <div className="mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-50 p-3 py-4 sm:py-3 rounded-lg border border-gray-200 mt-4 sm:mt-2">
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
                checked={isMonthly}
                onCheckedChange={handleMonthlyToggle}
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
      <div className="space-y-4">
        <div>
          <Label htmlFor="income" className="text-sm font-medium text-gray-700">
            {t.income}
          </Label>
          <Input
            id="income"
            type="number"
            placeholder={`${t.enter} ${!isCompany ? (isMonthly ? t.monthlyIncome.toLowerCase() : t.annualIncome.toLowerCase()) : t.annualRevenue.toLowerCase()}`}
            value={income || ""}
            onChange={handleIncomeChange}
          />
        </div>
        {!isCompany && (
          <div>
            <Label htmlFor="dependents" className="text-sm font-medium text-gray-700">
              {t.numberOfDependents}
            </Label>
            <Input
              id="dependents"
              type="number"
              min="0"
              max="6"
              placeholder={t.enterNumberOfDependents}
              value={dependents}
              onChange={handleDependentsChange}
            />
          </div>
        )}
      </div>
    </div>
  )
}

