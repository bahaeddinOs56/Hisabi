'use client'

import React from 'react'
import NavigationBar from '../../components/NavigationBar'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import styles from './styles.module.css'
import { useLanguage } from '../../contexts/LanguageContext'
import { translations } from '../../utils/translations'

const FAQPage = () => {
  const { language } = useLanguage()
  const t = translations[language]

  const faqs = [
    {
      question: t.faqQuestion1,
      answer: t.faqAnswer1
    },
    {
      question: t.faqQuestion2,
      answer: t.faqAnswer2
    },
    {
      question: t.faqQuestion3,
      answer: t.faqAnswer3
    },
    {
      question: t.faqQuestion4,
      answer: t.faqAnswer4
    },
    {
      question: t.faqQuestion5,
      answer: t.faqAnswer5
    }
  ]

  return (
    <div className={`min-h-screen bg-gray-50 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <NavigationBar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={styles.heroContainer}>
          <div className={styles.heroBackground}></div>
          <h1 className={styles.heroTitle}>
            {t.frequentlyAskedQuestions}
          </h1>
        </div>
        
        <div className={`${styles.faqContainer} bg-white rounded-lg shadow-sm p-6 mt-8`}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className={styles.faqItem}>
                <AccordionTrigger className={`${styles.faqQuestion} text-left`}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className={styles.faqAnswer}>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
    </div>
  )
}

export default FAQPage

