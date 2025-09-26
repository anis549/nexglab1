"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/components/language-provider"

export default function HomePage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const { t, dir } = useLanguage()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation de l'email avec le domaine NEXGlab.edu.dz
    if (!email.endsWith("@NEXGlab.edu.dz")) {
      setError(t("invalidEmail"))
      return
    }

    // Redirection vers la page de sélection des universités
    router.push("/select")
  }

  return (
    <div className="min-h-screen bg-gradient-animation text-white" dir={dir}>
      <div className="absolute top-4 right-4 z-20">
        <LanguageSwitcher />
      </div>

      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <motion.div
            className="flex justify-center mb-8"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              y: {
                duration: 0.8,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
          >
            <div className="relative w-80 h-24">
              <Image src="/images/nexglab-logo.png" alt="NEXGlab Logo" fill className="object-contain" priority />
            </div>
          </motion.div>

          <Card className="w-full bg-zinc-900/80 backdrop-blur-sm border-zinc-800">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-white">{t("welcome")}</CardTitle>
              <CardDescription className="text-center text-zinc-400">{t("subtitle")}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email" className="text-zinc-300">
                      {t("email")}
                    </Label>
                    <Input
                      id="email"
                      placeholder={t("emailPlaceholder")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-white"
                    />
                  </div>
                  {error && (
                    <Alert variant="destructive" className="bg-red-900/50 border-red-800">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full mt-6 bg-[#F57C00] hover:bg-[#FF8C42] text-white font-bold py-3 transition-all duration-300 hover:scale-105"
                >
                  {t("access")}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center border-t border-zinc-800 pt-4">
              <p className="text-xs text-zinc-500">{t("copyright")}</p>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Animations d'arrière-plan */}
      <div className="fixed inset-0 -z-10">
        <BackgroundAnimation />
      </div>
    </div>
  )
}

function BackgroundAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg className="w-full h-full opacity-20" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        {/* Grille de fond */}
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Routes stylisées */}
        <motion.path
          d="M 0 300 C 200 300, 300 100, 500 100 S 800 300, 1000 300"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeDasharray="5,5"
          initial={{ strokeDashoffset: 1000 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        <motion.path
          d="M 0 500 C 200 500, 300 700, 500 700 S 800 500, 1000 500"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeDasharray="5,5"
          initial={{ strokeDashoffset: -1000 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        {/* Structures filaires */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
          {/* Bâtiment stylisé */}
          <rect x="100" y="600" width="200" height="300" fill="none" stroke="white" strokeWidth="1" />
          <line x1="100" y1="650" x2="300" y2="650" stroke="white" strokeWidth="0.5" />
          <line x1="100" y1="700" x2="300" y2="700" stroke="white" strokeWidth="0.5" />
          <line x1="100" y1="750" x2="300" y2="750" stroke="white" strokeWidth="0.5" />
          <line x1="100" y1="800" x2="300" y2="800" stroke="white" strokeWidth="0.5" />
          <line x1="150" y1="600" x2="150" y2="900" stroke="white" strokeWidth="0.5" />
          <line x1="200" y1="600" x2="200" y2="900" stroke="white" strokeWidth="0.5" />
          <line x1="250" y1="600" x2="250" y2="900" stroke="white" strokeWidth="0.5" />

          {/* Pont stylisé */}
          <line x1="400" y1="800" x2="800" y2="800" stroke="white" strokeWidth="1.5" />
          <path d="M 400 800 Q 600 700 800 800" fill="none" stroke="white" strokeWidth="1" />
          <line x1="450" y1="800" x2="450" y2="770" stroke="white" strokeWidth="0.5" />
          <line x1="500" y1="800" x2="500" y2="750" stroke="white" strokeWidth="0.5" />
          <line x1="550" y1="800" x2="550" y2="730" stroke="white" strokeWidth="0.5" />
          <line x1="600" y1="800" x2="600" y2="720" stroke="white" strokeWidth="0.5" />
          <line x1="650" y1="800" x2="650" y2="730" stroke="white" strokeWidth="0.5" />
          <line x1="700" y1="800" x2="700" y2="750" stroke="white" strokeWidth="0.5" />
          <line x1="750" y1="800" x2="750" y2="770" stroke="white" strokeWidth="0.5" />
        </motion.g>

        {/* Grue animée */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          style={{ transformOrigin: "900px 200px" }}
        >
          <line x1="900" y1="200" x2="900" y2="100" stroke="white" strokeWidth="2" />
          <line x1="900" y1="100" x2="950" y2="100" stroke="white" strokeWidth="2" />
          <line x1="900" y1="120" x2="940" y2="100" stroke="white" strokeWidth="1" />
          <rect x="895" y="200" width="10" height="10" fill="white" />
        </motion.g>
      </svg>
    </div>
  )
}
