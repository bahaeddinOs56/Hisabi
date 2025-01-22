'use client'

import React from 'react'
import Link from 'next/link'
import NavigationBar from '../../components/NavigationBar'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink } from 'lucide-react'
import styles from './styles.module.css'
import { useLanguage } from '../../contexts/LanguageContext'
import { translations } from '../../utils/translations'

const ResourcesPage = () => {
  const { language } = useLanguage()
  const t = translations[language]

  const resourceCategories = [
    {
      title: t.officialGovernmentResources,
      resources: [
        { name: t.moroccanTaxAuthority, url: "https://www.tax.gov.ma/" },
        { name: t.ministryOfFinance, url: "https://www.finances.gov.ma/" },
        { name: t.generalTreasuryOfTheKingdom, url: "https://www.tgr.gov.ma/" },
      ]
    },
    {
      title: t.taxGuidesAndPublications,
      resources: [
        { name: t.taxReformGuide2025, url: "#" },
        { name: t.individualIncomeTaxBrochure, url: "#" },
        { name: t.corporateTaxOverview, url: "#" },
      ]
    },
    {
      title: t.onlineTools,
      resources: [
        { name: t.taxCalculator, url: "/" },
        { name: t.vatCalculator, url: "#" },
        { name: t.taxCalendar, url: "/calendar" },
      ]
    },
    {
      title: t.educationalContent,
      resources: [
        { name: t.taxBasicsVideoSeries, url: "#" },
        { name: t.understandingMoroccanTaxLaw, url: "#" },
        { name: t.faq, url: "/faq" },
      ]
    },
  ]

  return (
    <div className={`min-h-screen bg-gray-50 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <NavigationBar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className={styles.heroContainer}>
          <div className={styles.heroBackground}></div>
          <h1 className={styles.heroTitle}>
            {t.taxResources}
          </h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {resourceCategories.map((category, index) => (
            <Card key={index} className={styles.resourceCard}>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {category.resources.map((resource, resourceIndex) => (
                    <li key={resourceIndex}>
                      {resource.url.startsWith('http') ? (
                        <a 
                          href={resource.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
                        >
                          {resource.name}
                          <ExternalLink className={`${language === 'ar' ? 'mr-1' : 'ml-1'} h-4 w-4`} />
                        </a>
                      ) : (
                        <Link 
                          href={resource.url}
                          className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                        >
                          {resource.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

export default ResourcesPage

