import type React from "react"
import type { Metadata } from "next"
import { Inter, Cairo } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { LanguageProvider } from "@/components/language-provider"

// Police pour le français et l'anglais
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

// Police pour l'arabe
const cairo = Cairo({ subsets: ["arabic"], variable: "--font-cairo" })

export const metadata: Metadata = {
  title: "NEXGlab",
  description: "Plateforme académique immersive pour les étudiants scientifiques algériens",
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://nexglab.lite.vusercontent.net"),
  openGraph: {
    title: "NEXGlab",
    description: "Plateforme académique immersive pour les étudiants scientifiques algériens",
    url: "https://nexglab.lite.vusercontent.net",
    siteName: "NEXGlab",
    locale: "fr_FR",
    type: "website",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" dir="ltr" suppressHydrationWarning>
      <body className={`${inter.variable} ${cairo.variable} font-sans`}>
        <LanguageProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
            {children}
            <Toaster />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
