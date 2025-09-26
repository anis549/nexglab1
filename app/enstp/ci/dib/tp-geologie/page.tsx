"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/components/language-provider"

export default function TPGeologiePage() {
  const router = useRouter()
  const { t, dir } = useLanguage()
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  // Vérifier l'authentification au chargement de la page
  useEffect(() => {
    const email = localStorage.getItem("emailENSTP")
    if (!email || !email.endsWith("@enstp.edu.dz")) {
      router.push("/enstp")
    } else {
      setAuthenticated(true)
    }

    // Simuler un temps de chargement pour la démo
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [router])

  // Fonction pour ouvrir l'expérience PETRO Geo Lab
  const handleOpenPETROGeoLab = () => {
    // Ouvrir le lien dans un nouvel onglet
    window.open("https://kzmfx1gvq9owohucaqu1.lite.vusercontent.net/", "_blank")
  }

  // Afficher un écran de chargement pendant la vérification
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A1D37] flex items-center justify-center">
        <div className="animate-pulse text-white text-xl">Chargement...</div>
      </div>
    )
  }

  // Si non authentifié, la redirection est déjà en cours
  if (!authenticated) {
    return null
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0A1D37] text-white" dir={dir}>
      {/* Loader personnalisé */}

      {/* Animations d'arrière-plan */}
      <div className="absolute inset-0 opacity-20">
        <BackgroundAnimation />
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="absolute top-4 left-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/enstp/ci/dib")}
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>

        <div className="absolute top-4 right-4">
          <LanguageSwitcher />
        </div>

        <motion.div
          className="mb-10 flex items-center gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo ENSTP */}
          <div className="relative w-20 h-20">
            <Image
              src="/images/enstp-logo.png"
              alt="ENSTP Logo"
              width={80}
              height={80}
              className="object-contain"
              priority
            />
          </div>

          {/* Séparateur vertical */}
          <div className="h-16 w-px bg-white/30"></div>

          {/* Logo et slogan NEXGlab */}
          <div>
            <Image
              src="/images/nexglab-logo.png"
              alt="NEXGlab Logo"
              width={120}
              height={40}
              className="object-contain"
              priority
            />
            <p className="text-xs text-white/70 mt-1">{t("subtitle")}</p>
          </div>
        </motion.div>

        <h2 className="text-2xl font-bold text-center text-[#F57C00] mb-8">
          <span className="mr-2">🔍</span>TP GÉOLOGIE
        </h2>

        <div className="w-full max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
            onClick={handleOpenPETROGeoLab}
          >
            <Card className="bg-[#0A1D37]/80 border-[#F57C00] border-2 hover:bg-[#0A1D37]/60 transition-all cursor-pointer">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="text-4xl mb-4">🔬</div>
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  PETRO Geo Lab
                  <ExternalLink className="h-4 w-4 text-[#F57C00]" />
                </h3>
                <p className="text-white/70">Laboratoire virtuel pour l'étude pétrographique des roches et minéraux.</p>
                <Button
                  className="mt-4 bg-[#F57C00] hover:bg-[#FF8C42] text-white"
                  onClick={(e) => {
                    e.stopPropagation() // Empêcher le déclenchement du onClick du parent
                    handleOpenPETROGeoLab()
                  }}
                >
                  Lancer l'expérience
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 text-center text-white/60 text-xs"
        >
          <p>{t("copyright")}</p>
        </motion.div>
      </div>
    </div>
  )
}

// Composant pour l'animation d'arrière-plan
function BackgroundAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Éléments de géologie stylisés */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
          {/* Couches géologiques */}
          <path d="M 100,400 L 900,400 L 900,450 L 100,450 Z" fill="none" stroke="white" strokeWidth="1" />
          <path d="M 100,450 L 900,450 L 900,520 L 100,520 Z" fill="none" stroke="white" strokeWidth="1" />
          <path d="M 100,520 L 900,520 L 900,600 L 100,600 Z" fill="none" stroke="white" strokeWidth="1" />
          <path d="M 100,600 L 900,600 L 900,700 L 100,700 Z" fill="none" stroke="white" strokeWidth="1" />
          <path d="M 100,700 L 900,700 L 900,800 L 100,800 Z" fill="none" stroke="white" strokeWidth="1" />

          {/* Symboles de minéraux */}
          <polygon points="300,450 320,430 340,450 320,470" fill="none" stroke="white" strokeWidth="1" />
          <polygon points="500,520 530,500 560,520 530,540" fill="none" stroke="white" strokeWidth="1" />
          <polygon points="700,600 720,580 740,600 720,620" fill="none" stroke="white" strokeWidth="1" />

          {/* Failles */}
          <path d="M 400,400 L 450,800" fill="none" stroke="white" strokeWidth="1" strokeDasharray="5,5" />
          <path d="M 600,400 L 650,800" fill="none" stroke="white" strokeWidth="1" strokeDasharray="5,5" />
        </motion.g>
      </svg>
    </div>
  )
}
