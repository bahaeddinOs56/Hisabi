"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useLanguage } from "../contexts/LanguageContext"
import { translations } from "../utils/translations"

interface PropertyTaxCalculatorProps {
  rentalValue: number
  setRentalValue: (value: number) => void
  setTaxAmount: (amount: number) => void
}

export default function PropertyTaxCalculator({
  rentalValue,
  setRentalValue,
  setTaxAmount,
}: PropertyTaxCalculatorProps) {
  const [propertyType, setPropertyType] = useState<string>("residential")
  const [location, setLocation] = useState<string>("urban")
  const { language } = useLanguage()
  const t = translations[language]

  const calculatePropertyTax = (value: number, type: string, loc: string) => {
    // Property Tax (Taxe Foncière)
    const propertyTax = value * 0.1

    // Housing Tax (Taxe d'Habitation)
    let housingTax = 0
    if (type === "residential") {
      if (value <= 5000) {
        housingTax = 0
      } else if (value <= 20000) {
        housingTax = (value - 5000) * 0.1
      } else if (value <= 40000) {
        housingTax = 1500 + (value - 20000) * 0.2
      } else {
        housingTax = 5500 + (value - 40000) * 0.3
      }
    }

    // Municipal Tax
    const municipalTaxRate = loc === "urban" ? 0.105 : 0.065
    const municipalTax = value * municipalTaxRate

    const totalTax = propertyTax + housingTax + municipalTax
    setTaxAmount(totalTax)
  }

  const handleRentalValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    setRentalValue(value)
    calculatePropertyTax(value, propertyType, location)
  }

  const handlePropertyTypeChange = (type: string) => {
    setPropertyType(type)
    calculatePropertyTax(rentalValue, type, location)
  }

  const handleLocationChange = (loc: string) => {
    setLocation(loc)
    calculatePropertyTax(rentalValue, propertyType, loc)
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="rentalValue">{t.rentalValue} (MAD)</Label>
          <Input
            id="rentalValue"
            type="number"
            value={rentalValue || ""}
            onChange={handleRentalValueChange}
            placeholder={t.enterRentalValue}
          />
        </div>
        <div className="space-y-2">
          <Label>{t.propertyType}</Label>
          <RadioGroup value={propertyType} onValueChange={handlePropertyTypeChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="residential" id="residential" />
              <Label htmlFor="residential">{t.residential}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="commercial" id="commercial" />
              <Label htmlFor="commercial">{t.commercial}</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="space-y-2">
          <Label>{t.location}</Label>
          <RadioGroup value={location} onValueChange={handleLocationChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="urban" id="urban" />
              <Label htmlFor="urban">{t.urban}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="peripheral" id="peripheral" />
              <Label htmlFor="peripheral">{t.peripheral}</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  )
}

