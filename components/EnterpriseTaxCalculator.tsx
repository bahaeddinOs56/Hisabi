'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../utils/translations'

interface EnterpriseTaxCalculatorProps {
  revenue: number
  setRevenue: (revenue: number) => void
  setTaxAmount: (amount: number) => void
}

export default function EnterpriseTaxCalculator({ revenue, setRevenue, setTaxAmount }: EnterpriseTaxCalculatorProps) {
  const [companyType, setCompanyType] = useState<string>('standard')
  const { language } = useLanguage()
  const t = translations[language]

  const calculateEnterpriseTax = (annualRevenue: number, type: string) => {
    let taxRate = 0
    // Enterprise tax rates for 2025 (simplified for demonstration)
    if (type === 'standard') {
      if (annualRevenue <= 300000) {
        taxRate = 0.175 // 17.5% for revenue up to 300,000 MAD
      } else if (annualRevenue <= 1000000) {
        taxRate = 0.20 // 20% for revenue between 300,001 and 1,000,000 MAD
      } else if (annualRevenue <= 100000000) {
        taxRate = 0.2275 // 22.75% for revenue between 1,000,001 and 100,000,000 MAD
      } else {
        taxRate = 0.35 // 35% for revenue over 100,000,000 MAD
      }
    } else if (type === 'export') {
      taxRate = 0.15 // 15% for export companies
    } else if (type === 'agricultural') {
      taxRate = 0.10 // 10% for agricultural companies
    }

    setTaxAmount(annualRevenue * taxRate)
  }

  const handleRevenueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRevenue = Number(e.target.value)
    setRevenue(newRevenue)
    calculateEnterpriseTax(newRevenue, companyType)
  }

  const handleTypeChange = (type: string) => {
    setCompanyType(type)
    calculateEnterpriseTax(revenue, type)
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="annualRevenue">{t.annualRevenue} (MAD)</Label>
          <Input
            id="annualRevenue"
            type="number"
            value={revenue || ''}
            onChange={handleRevenueChange}
            placeholder={t.enterAnnualRevenue}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="companyType">{t.companyType}</Label>
          <Select value={companyType} onValueChange={handleTypeChange}>
            <SelectTrigger id="companyType">
              <SelectValue placeholder={t.selectCompanyType} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">{t.standardCompany}</SelectItem>
              <SelectItem value="export">{t.exportCompany}</SelectItem>
              <SelectItem value="agricultural">{t.agriculturalCompany}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}

