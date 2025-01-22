'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../utils/translations'

interface VATCalculatorProps {
  amount: number
  setAmount: (amount: number) => void
  setVATAmount: (amount: number) => void
}

export default function VATCalculator({ amount, setAmount, setVATAmount }: VATCalculatorProps) {
  const [vatRate, setVatRate] = useState<number>(20) // Standard VAT rate in Morocco
  const { language } = useLanguage()
  const t = translations[language]

  const calculateVAT = (value: number, rate: number) => {
    const vatAmount = (value * rate) / 100
    setVATAmount(vatAmount)
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    setAmount(value)
    calculateVAT(value, vatRate)
  }

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rate = Number(e.target.value)
    setVatRate(rate)
    calculateVAT(amount, rate)
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="amount">{t.amount} (MAD)</Label>
          <Input
            id="amount"
            type="number"
            value={amount || ''}
            onChange={handleAmountChange}
            placeholder={t.enterAmount}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="vatRate">{t.vatRate} (%)</Label>
          <Input
            id="vatRate"
            type="number"
            value={vatRate}
            onChange={handleRateChange}
            placeholder={t.enterVATRate}
          />
        </div>
      </CardContent>
    </Card>
  )
}

