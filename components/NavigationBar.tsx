"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useLanguage } from "../contexts/LanguageContext"
import { translations } from "../utils/translations"

const NavigationBar = () => {
  const pathname = usePathname()
  const { language } = useLanguage()
  const t = translations[language]
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { name: t.home as string, href: "/" },
    { name: t.taxBrackets as string, href: "/tax-brackets" },
    { name: t.faq as string, href: "/faq" },
    { name: t.newsUpdates as string, href: "/news" },
    { name: t.resources as string, href: "/resources" },
    { name: t.taxCalendar as string, href: "/calendar" },
    { name: t.contact as string, href: "/contact" },
    { name: t.taxSavingsTips as string, href: "/savings-tips" },
  ]

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link
                href="/"
                className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-red-600 font-[Amiri] tracking-wide"
              >
                {language === "ar" ? "حسابي" : "Hisabi"}
              </Link>
            </div>
            <div className="hidden md:flex md:items-center md:ml-6 md:space-x-4 rtl:space-x-reverse">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-gray-500 hover:text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out flex items-center justify-center h-full ${
                    pathname === item.href ? "bg-gray-100 text-gray-900" : ""
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center md:hidden">
            <DropdownMenu open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Ouvrir le menu principal</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white shadow-lg rounded-md border border-gray-200">
                {navItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link href={item.href} className="w-full">
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMobileMenuOpen(false)} />
      )}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@700&display=swap');
      `}</style>
    </nav>
  )
}

export default NavigationBar

