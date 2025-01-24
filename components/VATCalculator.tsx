"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "../contexts/LanguageContext"
import { translations } from "../utils/translations"

interface VATCalculatorProps {
  amount: number
  setAmount: (amount: number) => void
  setVATAmount: (amount: number) => void
}

export default function VATCalculator({ amount, setAmount, setVATAmount }: VATCalculatorProps) {
  const [vatRate, setVatRate] = useState<number>(20)
  const { language } = useLanguage()
  const t = translations[language]

  const vatRates = [
    { value: 20, label: t.standardRate },
    { value: 14, label: t.reducedRate14 },
    { value: 10, label: t.reducedRate10 },
    { value: 7, label: t.reducedRate7 },
    { value: 0, label: t.zeroRate },
  ]

  const calculateVAT = (value: number, rate: number) => {
    const vatAmount = (value * rate) / 100
    setVATAmount(vatAmount)
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    setAmount(value)
    calculateVAT(value, vatRate)
  }

  const handleRateChange = (rate: string) => {
    const newRate = Number(rate)
    setVatRate(newRate)
    calculateVAT(amount, newRate)
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="amount">{t.amount} (MAD)</Label>
          <Input
            id="amount"
            type="number"
            value={amount || ""}
            onChange={handleAmountChange}
            placeholder={t.enterAmount}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="vatRate">{t.vatRate}</Label>
          <Select value={vatRate.toString()} onValueChange={handleRateChange}>
            <SelectTrigger id="vatRate">
              <SelectValue placeholder={t.selectVATRate} />
            </SelectTrigger>
            <SelectContent>
              {vatRates.map((rate) => (
                <SelectItem key={rate.value} value={rate.value.toString()}>
                  {rate.label} ({rate.value}%)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}

