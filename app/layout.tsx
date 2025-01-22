import "./globals.css"
import { Inter, Amiri } from "next/font/google"
import { LanguageProvider } from "../contexts/LanguageContext"
import { metadata } from "./metadata"

const inter = Inter({ subsets: ["latin"] })

const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic"],
  variable: "--font-amiri",
})

export { metadata }

function RootLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/e6f2a53e-5d11-4da3-a29f-31e9d8a95612_removalai_preview-g1CD4LreBebPn1Z8gLOt7oOySZMbTK.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/e6f2a53e-5d11-4da3-a29f-31e9d8a95612_removalai_preview-g1CD4LreBebPn1Z8gLOt7oOySZMbTK.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/e6f2a53e-5d11-4da3-a29f-31e9d8a95612_removalai_preview-g1CD4LreBebPn1Z8gLOt7oOySZMbTK.png"
        />
      </head>
      <body className={`${inter.className} ${amiri.variable}`}>{children}</body>
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

