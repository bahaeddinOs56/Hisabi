"use client"

import React from "react"
import NavigationBar from "../../components/NavigationBar"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Globe, Instagram, Linkedin, Mail } from "lucide-react"
import styles from "./styles.module.css"
import { useLanguage } from "../../contexts/LanguageContext"
import { translations } from "../../utils/translations"

const ContactPage = () => {
  const { language } = useLanguage()
  const t = translations[language]

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  }

  const buttonHoverVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
    },
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${language === "ar" ? "rtl" : "ltr"}`}>
      <NavigationBar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className={styles.heroContainer}>
          <div className={styles.heroBackground}></div>
          <h1 className={styles.heroTitle}>{t.contactUs}</h1>
        </div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mt-8">
          <Card className={styles.contactCard}>
            <CardContent className="p-8">
              <motion.div variants={itemVariants} className="text-center mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-2">
                  {t.contactName}
                </h2>
                <div className="flex items-center justify-center space-x-2 text-lg text-gray-600">
                  <Phone className="w-5 h-5" />
                  <span dir="ltr">+212625866026</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-lg text-gray-600">
                  <Mail className="w-5 h-5" />
                  <span>bmestini@gmail.com</span>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <motion.div variants={buttonHoverVariants} whileHover="hover" whileTap="tap">
                  <Button
                    variant="outline"
                    className={`${styles.socialButton} w-full border-2 border-primary/20 hover:border-primary/40`}
                  >
                    <Globe className="w-5 h-5 mr-2" />
                    <a
                      href="https://portfolio-kohl-two-63.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      {t.portfolio}
                    </a>
                  </Button>
                </motion.div>

                <motion.div variants={buttonHoverVariants} whileHover="hover" whileTap="tap">
                  <Button
                    variant="outline"
                    className={`${styles.socialButton} w-full border-2 border-pink-500/20 hover:border-pink-500/40`}
                  >
                    <Instagram className="w-5 h-5 mr-2 text-pink-500" />
                    <a
                      href="https://www.instagram.com/your-instagram"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      {t.instagram}
                    </a>
                  </Button>
                </motion.div>

                <motion.div variants={buttonHoverVariants} whileHover="hover" whileTap="tap">
                  <Button
                    variant="outline"
                    className={`${styles.socialButton} w-full border-2 border-blue-600/20 hover:border-blue-600/40`}
                  >
                    <Linkedin className="w-5 h-5 mr-2 text-blue-600" />
                    <a
                      href="https://www.linkedin.com/in/bahaeddine-m-165a74347/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      {t.linkedin}
                    </a>
                  </Button>
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}

export default ContactPage

