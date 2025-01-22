'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../utils/translations'

interface PropertyTaxCalculatorProps {
  value: number
  setValue: (value: number) => void
  setTaxAmount: (amount: number) => void
}

export default function PropertyTaxCalculator({ value, setValue, setTaxAmount }: PropertyTaxCalculatorProps) {
  const [propertyType, setPropertyType] = useState<string>('residential')
  const { language } = useLanguage()
  const t = translations[language]

  const calculatePropertyTax = (propertyValue: number, type: string) => {
    let taxRate = 0
    // Simplified property tax rates for demonstration
    switch (type) {
      case 'residential':
        taxRate = 0.01 // 1% for residential
        break
      case 'commercial':
        taxRate = 0.015 // 1.5% for commercial
        break
      case 'industrial':
        taxRate = 0.02 // 2% for industrial
        break
      default:
        taxRate = 0.01
    }
    setTaxAmount(propertyValue * taxRate)
  }

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value)
    setValue(newValue)
    calculatePropertyTax(newValue, propertyType)
  }

  const handleTypeChange = (type: string) => {
    setPropertyType(type)
    calculatePropertyTax(value, type)
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="propertyValue">{t.propertyValue} (MAD)</Label>
          <Input
            id="propertyValue"
            type="number"
            value={value || ''}
            onChange={handleValueChange}
            placeholder={t.enterPropertyValue}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="propertyType">{t.propertyType}</Label>
          <Select value={propertyType} onValueChange={handleTypeChange}>
            <SelectTrigger id="propertyType">
              <SelectValue placeholder={t.selectPropertyType} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="residential">{t.residential}</SelectItem>
              <SelectItem value="commercial">{t.commercial}</SelectItem>
              <SelectItem value="industrial">{t.industrial}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}

