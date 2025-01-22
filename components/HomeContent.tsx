"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import TaxCalculator from "./TaxCalculator"
import VATCalculator from "./VATCalculator"
import PropertyTaxCalculator from "./PropertyTaxCalculator"
import EnterpriseTaxCalculator from "./EnterpriseTaxCalculator"
import TaxInfo from "./TaxInfo"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "../contexts/LanguageContext"
import { translations } from "../utils/translations"

export default function HomeContent() {
  const searchParams = useSearchParams()
  const { language } = useLanguage()
  const t = translations[language]

  // Income Tax States
  const [income, setIncome] = useState<number>(0)
  const [isMonthly, setIsMonthly] = useState<boolean>(true)
  const [isCompany, setIsCompany] = useState<boolean>(false)
  const [taxAmount, setTaxAmount] = useState<number>(0)
  const [effectiveRate, setEffectiveRate] = useState<number>(0)

  // VAT States
  const [vatableAmount, setVatableAmount] = useState<number>(0)
  const [vatAmount, setVATAmount] = useState<number>(0)

  // Property Tax States
  const [propertyValue, setPropertyValue] = useState<number>(0)
  const [propertyTaxAmount, setPropertyTaxAmount] = useState<number>(0)

  // Enterprise Tax States
  const [revenue, setRevenue] = useState<number>(0)
  const [enterpriseTaxAmount, setEnterpriseTaxAmount] = useState<number>(0)

  // Set initial tab based on URL parameter
  const [activeTab, setActiveTab] = useState<string>("income")

  useEffect(() => {
    const calculatorParam = searchParams.get("calculator")
    if (calculatorParam && ["income", "vat", "property", "enterprise"].includes(calculatorParam)) {
      setActiveTab(calculatorParam)
    }
  }, [searchParams])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    const url = new URL(window.location.href)
    url.searchParams.set("calculator", value)
    window.history.pushState({}, "", url)
  }

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
      <TabsList className="grid grid-cols-4 w-full">
        <TabsTrigger value="income">{t.incomeTax}</TabsTrigger>
        <TabsTrigger value="vat">{t.vat}</TabsTrigger>
        <TabsTrigger value="property">{t.propertyTax}</TabsTrigger>
        <TabsTrigger value="enterprise">{t.enterpriseTax}</TabsTrigger>
      </TabsList>

      <TabsContent value="income">
        <TaxCalculator
          income={income}
          setIncome={setIncome}
          isMonthly={isMonthly}
          setIsMonthly={setIsMonthly}
          isCompany={isCompany}
          setTaxAmount={setTaxAmount}
          setEffectiveRate={setEffectiveRate}
        />
        <TaxInfo taxAmount={taxAmount} effectiveRate={effectiveRate} />
      </TabsContent>

      <TabsContent value="vat">
        <VATCalculator amount={vatableAmount} setAmount={setVatableAmount} setVATAmount={setVATAmount} />
        <TaxInfo taxAmount={vatAmount} effectiveRate={(vatAmount / vatableAmount) * 100 || 0} />
      </TabsContent>

      <TabsContent value="property">
        <PropertyTaxCalculator value={propertyValue} setValue={setPropertyValue} setTaxAmount={setPropertyTaxAmount} />
        <TaxInfo taxAmount={propertyTaxAmount} effectiveRate={(propertyTaxAmount / propertyValue) * 100 || 0} />
      </TabsContent>

      <TabsContent value="enterprise">
        <EnterpriseTaxCalculator revenue={revenue} setRevenue={setRevenue} setTaxAmount={setEnterpriseTaxAmount} />
        <TaxInfo taxAmount={enterpriseTaxAmount} effectiveRate={(enterpriseTaxAmount / revenue) * 100 || 0} />
      </TabsContent>
    </Tabs>
  )
}

