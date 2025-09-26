"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, ArrowLeft } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/components/language-provider"

export default function SelectPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const { t, dir } = useLanguage()

  // Liste des universités (pour l'instant, seulement ENSTP)
  const universities = [
    {
      id: "enstp",
      name: "ENSTP",
      fullName: t("enstp"),
      logo: "/images/enstp-logo.png",
    },
  ]

  const filteredUniversities = universities.filter(
    (uni) =>
      uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.fullName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-animation flex flex-col items-center p-4" dir={dir}>
      <div className="absolute top-4 right-4 z-20">
        <LanguageSwitcher />
      </div>

      <div className="w-full max-w-4xl pt-16">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/")}
            className="mr-2 text-zinc-400 hover:text-white hover:bg-zinc-800"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-white">{t("selectUniversity")}</h1>
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500" />
          <Input
            placeholder={t("searchUniversity")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-zinc-800 border-zinc-700 text-white"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredUniversities.map((university) => (
            <motion.div
              key={university.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card
                className="cursor-pointer bg-zinc-800 border-zinc-700 hover:border-[#F57C00] transition-colors"
                onClick={() => router.push(`/enstp`)}
              >
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="relative w-16 h-16 bg-white rounded-lg p-1 flex items-center justify-center">
                    <Image
                      src={university.logo || "/placeholder.svg"}
                      alt={`${university.name} Logo`}
                      width={60}
                      height={60}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-white">{university.name}</CardTitle>
                    <p className="text-sm text-zinc-400">{university.fullName}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-300 text-sm">{t("enstpConnect")}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredUniversities.length === 0 && (
          <div className="text-center p-8">
            <p className="text-zinc-400">
              {t("noUniversityFound")} &quot;{searchQuery}&quot;
            </p>
          </div>
        )}
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
      </svg>
    </div>
  )
}
