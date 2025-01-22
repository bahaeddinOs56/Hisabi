'use client'

import React from 'react'
import NavigationBar from '../../components/NavigationBar'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import styles from './styles.module.css'
import zellijStyles from './zellij.module.css'
import { useLanguage } from '../../contexts/LanguageContext'
import { translations } from '../../utils/translations'

const TaxBracketsPage = () => {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className={`min-h-screen bg-gray-50`}>
      <NavigationBar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={zellijStyles.zellijContainer}>
          <div className={zellijStyles.zellijPattern}></div>
          <h1 className={zellijStyles.zellijTitle}>
            {t.moroccanTaxBrackets2025}
          </h1>
        </div>
        
        <Card className={`mb-8 ${styles.cardHover}`}>
          <CardHeader className="sm:px-6">
            <CardTitle className="text-xl sm:text-2xl font-semibold text-gray-800">{t.individualIncomeTaxBrackets}</CardTitle>
          </CardHeader>
          <CardContent className="px-2 sm:px-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead className="w-1/2 font-bold whitespace-nowrap">{t.annualIncome} (MAD)</TableHead>
                    <TableHead className="font-bold">{t.taxRate}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium whitespace-nowrap">{t.upTo} 40,000</TableCell>
                    <TableCell className="text-green-600 font-medium">0% ({t.taxExempt})</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium whitespace-nowrap">40,001 {t.to} 60,000</TableCell>
                    <TableCell>10%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium whitespace-nowrap">60,001 {t.to} 80,000</TableCell>
                    <TableCell>20%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium whitespace-nowrap">80,001 {t.to} 100,000</TableCell>
                    <TableCell>30%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium whitespace-nowrap">100,001 {t.to} 180,000</TableCell>
                    <TableCell>34%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium whitespace-nowrap">{t.over} 180,000</TableCell>
                    <TableCell className="text-red-600 font-medium">37%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className={styles.cardHover}>
          <CardHeader className="sm:px-6">
            <CardTitle className="text-xl sm:text-2xl font-semibold text-gray-800">{t.corporateIncomeTaxBrackets}</CardTitle>
          </CardHeader>
          <CardContent className="px-2 sm:px-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead className="w-1/2 font-bold whitespace-nowrap">{t.netTaxableIncome} (MAD)</TableHead>
                    <TableHead className="font-bold">{t.taxRate}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium whitespace-nowrap">{t.upTo} 300,000</TableCell>
                    <TableCell>17.5%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium whitespace-nowrap">300,001 {t.to} 1,000,000</TableCell>
                    <TableCell>20%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium whitespace-nowrap">1,000,001 {t.to} 100,000,000</TableCell>
                    <TableCell>22.75%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium whitespace-nowrap">{t.over} 100,000,000</TableCell>
                    <TableCell className="text-red-600 font-medium">35%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default TaxBracketsPage

