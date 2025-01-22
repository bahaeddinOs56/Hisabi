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
  const { language, setLanguage } = useLanguage()
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
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link
                href="/"
                className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-red-600 font-[Amiri] tracking-wide"
              >
                {language === "ar" ? "حسابي" : "Hisabi"}
              </Link>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-4 rtl:space-x-reverse">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-gray-500 hover:text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out ${
                    pathname === item.href ? "bg-gray-100 text-gray-900" : ""
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4 rtl:space-x-reverse">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  {t.calculators}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={language === "ar" ? "end" : "start"}>
                <DropdownMenuItem asChild>
                  <Link href="/?calculator=income">{t.incomeTax}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/?calculator=vat">{t.vat}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/?calculator=property">{t.propertyTax}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/?calculator=enterprise">{t.enterpriseTax}</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  {t.language}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={language === "ar" ? "end" : "start"}>
                <DropdownMenuItem onSelect={() => setLanguage("en")}>English</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setLanguage("fr")}>Français</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setLanguage("ar")}>عربي</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="sm">
              {t.userAccount}
            </Button>
          </div>
          <div className="flex items-center md:hidden">
            <DropdownMenu open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open main menu</span>
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
                <DropdownMenuItem asChild>
                  <Link href="/?calculator=income" className="w-full">
                    {t.incomeTax}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/?calculator=vat" className="w-full">
                    {t.vat}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/?calculator=property" className="w-full">
                    {t.propertyTax}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/?calculator=enterprise" className="w-full">
                    {t.enterpriseTax}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setLanguage("en")}>English</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setLanguage("fr")}>Français</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setLanguage("ar")}>عربي</DropdownMenuItem>
                <DropdownMenuItem>{t.userAccount}</DropdownMenuItem>
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

