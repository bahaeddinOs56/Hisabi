'use client'

import React from 'react'
import NavigationBar from '../../components/NavigationBar'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Home, GraduationCap, Heart, PiggyBank, Building2, TreePine, Users, Calculator } from 'lucide-react'
import Link from 'next/link'
import styles from './styles.module.css'
import { useLanguage } from '../../contexts/LanguageContext'
import { translations } from '../../utils/translations'

const TaxSavingsTipsPage = () => {
  const { language } = useLanguage()
  const t = translations[language]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  const tips = [
    {
      icon: <Home className="w-6 h-6" />,
      title: t.housingBenefits,
      tips: [
        t.housingTip1,
        t.housingTip2,
        t.housingTip3
      ]
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: t.educationTraining,
      tips: [
        t.educationTip1,
        t.educationTip2,
        t.educationTip3
      ]
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: t.healthcareInsurance,
      tips: [
        t.healthcareTip1,
        t.healthcareTip2,
        t.healthcareTip3
      ]
    },
    {
      icon: <PiggyBank className="w-6 h-6" />,
      title: t.retirementPlanning,
      tips: [
        t.retirementTip1,
        t.retirementTip2,
        t.retirementTip3
      ]
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: t.businessDeductions,
      tips: [
        t.businessTip1,
        t.businessTip2,
        t.businessTip3
      ]
    },
    {
      icon: <TreePine className="w-6 h-6" />,
      title: t.environmentalIncentives,
      tips: [
        t.environmentalTip1,
        t.environmentalTip2,
        t.environmentalTip3
      ]
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: t.familyBenefits,
      tips: [
        t.familyTip1,
        t.familyTip2,
        t.familyTip3
      ]
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: t.employmentBenefits,
      tips: [
        t.employmentTip1,
        t.employmentTip2,
        t.employmentTip3
      ]
    }
  ]

  return (
    <div className={`min-h-screen bg-gray-50 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <NavigationBar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className={styles.heroContainer}>
          <div className={styles.heroBackground}></div>
          <h1 className={styles.heroTitle}>
            {t.taxSavingsTips}
          </h1>
        </div>

        <div className="mt-8 mb-6 text-center">
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t.taxSavingsTipsIntro}
          </p>
          <Link 
            href="/"
            className="inline-flex items-center mt-4 text-primary hover:text-primary/80"
          >
            <Calculator className="w-4 h-4 mr-2" />
            {t.useCalculatorToEstimate}
          </Link>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {tips.map((section, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className={styles.tipCard}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <span className="p-2 rounded-lg bg-primary/10 text-primary">
                      {section.icon}
                    </span>
                    <span>{section.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start">
                        <span className="mr-2 mt-1 h-2 w-2 rounded-full bg-primary/60" />
                        <span className="text-gray-600">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">
            {t.importantNotes}:
          </h2>
          <ul className="space-y-2 text-blue-700">
            <li>• {t.importantNote1}</li>
            <li>• {t.importantNote2}</li>
            <li>• {t.importantNote3}</li>
            <li>• {t.importantNote4}</li>
          </ul>
        </div>
      </main>
    </div>
  )
}

export default TaxSavingsTipsPage

