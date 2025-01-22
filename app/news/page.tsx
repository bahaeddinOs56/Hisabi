"use client"

import React from "react"
import NavigationBar from "../../components/NavigationBar"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import styles from "./styles.module.css"
import { useLanguage } from "../../contexts/LanguageContext"
import { translations } from "../../utils/translations"

const NewsUpdatesPage = () => {
  const { language } = useLanguage()
  const t = translations[language]

  const newsItems = [
    {
      title: t.newsTitle1,
      date: t.newsDate1,
      summary: t.newsSummary1,
      source: "https://www.finances.gov.ma/",
      sourceName: t.newsSourceName1,
    },
    {
      title: t.newsTitle2,
      date: t.newsDate2,
      summary: t.newsSummary2,
      source: "https://www.tax.gov.ma/",
      sourceName: t.newsSourceName2,
    },
    {
      title: t.newsTitle3,
      date: t.newsDate3,
      summary: t.newsSummary3,
      source: "https://www.invest.gov.ma/",
      sourceName: t.newsSourceName3,
    },
    {
      title: t.newsTitle4,
      date: t.newsDate4,
      summary: t.newsSummary4,
      source: "https://www.tax.gov.ma/webinars",
      sourceName: t.newsSourceName4,
    },
    {
      title: t.newsTitle5,
      date: t.newsDate5,
      summary: t.newsSummary5,
      source: "https://www.tax.gov.ma/deadlines",
      sourceName: t.newsSourceName5,
    },
  ]

  return (
    <div className={`min-h-screen bg-gray-50 ${language === "ar" ? "rtl" : "ltr"}`}>
      <NavigationBar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={styles.heroContainer}>
          <div className={styles.heroBackground}></div>
          <h1 className={styles.heroTitle}>{t.newsAndUpdates}</h1>
        </div>

        <div className={styles.newsContainer}>
          {newsItems.map((item, index) => (
            <div key={index} className={styles.newsItem}>
              <div className={styles.newsContent}>
                <h2 className={styles.newsTitle}>{item.title}</h2>
                <p className={styles.newsDate}>{item.date}</p>
                <p className={styles.newsSummary}>{item.summary}</p>
                <a href={item.source} target="_blank" rel="noopener noreferrer" className={styles.newsLink}>
                  <Button variant="outline" size="sm" className={styles.readMoreButton}>
                    {t.readMoreOn} {item.sourceName}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default NewsUpdatesPage

