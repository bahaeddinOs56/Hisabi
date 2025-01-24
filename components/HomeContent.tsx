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
import { categoryTaxRates, FAMILY_ALLOWANCE_DEDUCTION, MAX_FAMILY_ALLOWANCE_DEDUCTION } from "../utils/taxRates"
import { Calculator, Briefcase, Home, Building, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function HomeContent() {
  const searchParams = useSearchParams()
  const { language } = useLanguage()
  const t = translations[language]

  // States for all calculators
  const [income, setIncome] = useState<number>(0)
  const [isMonthly, setIsMonthly] = useState<boolean>(true)
  const [isCompany, setIsCompany] = useState<boolean>(false)
  const [taxAmount, setTaxAmount] = useState<number>(0)
  const [effectiveRate, setEffectiveRate] = useState<number>(0)
  const [vatableAmount, setVatableAmount] = useState<number>(0)
  const [vatAmount, setVATAmount] = useState<number>(0)
  const [propertyValue, setPropertyValue] = useState<number>(0) //This line is not used anymore, but kept for reference
  const [propertyTaxAmount, setPropertyTaxAmount] = useState<number>(0)
  const [revenue, setRevenue] = useState<number>(0)
  const [enterpriseTaxAmount, setEnterpriseTaxAmount] = useState<number>(0)
  const [rentalValue, setRentalValue] = useState<number>(0)

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

  const calculateTax = (incomeValue: number, monthly: boolean, dependents: number) => {
    const annualIncome = monthly ? incomeValue * 12 : incomeValue
    let tax = 0
    let remainingIncome = annualIncome

    // Apply family allowance deduction
    const familyAllowanceDeduction = Math.min(dependents * FAMILY_ALLOWANCE_DEDUCTION, MAX_FAMILY_ALLOWANCE_DEDUCTION)
    remainingIncome -= familyAllowanceDeduction

    const rates = categoryTaxRates[isCompany ? "company" : "individual"]

    for (let i = 0; i < rates.length; i++) {
      if (remainingIncome > rates[i].threshold) {
        const taxableAmount = i === 0 ? rates[i].threshold : rates[i].threshold - rates[i - 1].threshold
        tax += taxableAmount * rates[i].rate
        remainingIncome -= taxableAmount
      } else {
        tax += remainingIncome * rates[i].rate
        break
      }
    }

    setTaxAmount(Math.round(tax))
    setEffectiveRate(Number(((tax / annualIncome) * 100).toFixed(2)))
  }

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
      <TabsList className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap justify-center p-1 bg-gray-100 rounded-lg mb-24 sm:mb-32">
        {[
          { value: "income", icon: Calculator, label: t.incomeTax },
          { value: "vat", icon: Briefcase, label: t.vat },
          { value: "property", icon: Home, label: t.propertyTax },
          { value: "enterprise", icon: Building, label: t.enterpriseTax },
        ].map(({ value, icon: Icon, label }) => (
          <TabsTrigger
            key={value}
            value={value}
            className="flex flex-col items-center justify-center py-2 px-3 space-y-1 bg-white rounded-md shadow-sm transition-all duration-200 ease-in-out hover:bg-gray-50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground sm:flex-1"
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs font-medium">{label}</span>
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="income" className="mt-48 sm:mt-64 mb-12">
        <div className="space-y-8 sm:space-y-12">
          <TaxCalculator
            income={income}
            setIncome={setIncome}
            isMonthly={isMonthly}
            setIsMonthly={setIsMonthly}
            calculateTax={calculateTax}
            category="individual"
            isCompany={isCompany}
            setTaxAmount={setTaxAmount}
            setEffectiveRate={setEffectiveRate}
          />
          <TaxInfo taxAmount={taxAmount} effectiveRate={effectiveRate} />
        </div>
      </TabsContent>

      <TabsContent value="vat" className="mt-48 sm:mt-64 mb-12">
        <div className="space-y-8 sm:space-y-12">
          <VATCalculator amount={vatableAmount} setAmount={setVatableAmount} setVATAmount={setVATAmount} />
          <TaxInfo taxAmount={vatAmount} effectiveRate={(vatAmount / vatableAmount) * 100 || 0} />
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>{t.vatComplianceInfo}</AlertTitle>
            <AlertDescription>
              <p>{t.vatTaxPoint}</p>
              <p>{t.vatInvoiceRequirements}</p>
            </AlertDescription>
          </Alert>
        </div>
      </TabsContent>

      <TabsContent value="property" className="mt-48 sm:mt-64 mb-12">
        <div className="space-y-8 sm:space-y-12">
          <PropertyTaxCalculator
            rentalValue={rentalValue}
            setRentalValue={setRentalValue}
            setTaxAmount={setPropertyTaxAmount}
          />
          <TaxInfo taxAmount={propertyTaxAmount} effectiveRate={(propertyTaxAmount / rentalValue) * 100 || 0} />
        </div>
      </TabsContent>

      <TabsContent value="enterprise" className="mt-48 sm:mt-64 mb-12">
        <div className="space-y-8 sm:space-y-12">
          <EnterpriseTaxCalculator revenue={revenue} setRevenue={setRevenue} setTaxAmount={setEnterpriseTaxAmount} />
          <TaxInfo taxAmount={enterpriseTaxAmount} effectiveRate={(enterpriseTaxAmount / revenue) * 100 || 0} />
        </div>
      </TabsContent>
    </Tabs>
  )
}

