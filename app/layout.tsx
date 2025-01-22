'use client'

import './globals.css'
import { Inter, Amiri } from 'next/font/google'
import { LanguageProvider, useLanguage } from '../contexts/LanguageContext'

const inter = Inter({ subsets: ['latin'] })

const amiri = Amiri({ 
  weight: ['400', '700'],
  subsets: ['arabic'],
  variable: '--font-amiri',
})

function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage()

  return (
    <html lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <body className={`${inter.className} ${amiri.variable}`}>
        {children}
      </body>
    </html>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LanguageProvider>
      <RootLayoutContent>{children}</RootLayoutContent>
    </LanguageProvider>
  )
}

