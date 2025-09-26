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

export default function MecaniqueSolsPage() {
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

  // Fonction pour ouvrir l'expérience Essai PDL Lab
  const handleOpenPDLLab = () => {
    // Ouvrir le lien dans un nouvel onglet
    window.open("https://kzml3lqq20tt8qydujwx.lite.vusercontent.net/", "_blank")
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
          <span className="mr-2">🧪</span>MÉCANIQUE DES SOLS 3
        </h2>

        <div className="w-full max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
            onClick={handleOpenPDLLab}
          >
            <Card className="bg-[#0A1D37]/80 border-[#F57C00] border-2 hover:bg-[#0A1D37]/60 transition-all cursor-pointer">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  Essai PDL Lab
                  <ExternalLink className="h-4 w-4 text-[#F57C00]" />
                </h3>
                <p className="text-white/70">
                  Simulation interactive d'essais au pénétromètre dynamique léger pour l'analyse des sols.
                </p>
                <Button
                  className="mt-4 bg-[#F57C00] hover:bg-[#FF8C42] text-white"
                  onClick={(e) => {
                    e.stopPropagation() // Empêcher le déclenchement du onClick du parent
                    handleOpenPDLLab()
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

        {/* Éléments de mécanique des sols stylisés */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
          {/* Couches de sol */}
          <rect x="200" y="400" width="600" height="80" fill="none" stroke="white" strokeWidth="1" />
          <rect x="200" y="480" width="600" height="100" fill="none" stroke="white" strokeWidth="1" />
          <rect x="200" y="580" width="600" height="70" fill="none" stroke="white" strokeWidth="1" />
          <rect x="200" y="650" width="600" height="120" fill="none" stroke="white" strokeWidth="1" />
          <rect x="200" y="770" width="600" height="130" fill="none" stroke="white" strokeWidth="1" />

          {/* Pénétromètre stylisé */}
          <line x1="500" y1="300" x2="500" y2="800" stroke="white" strokeWidth="2" />
          <circle cx="500" cy="350" r="10" fill="none" stroke="white" strokeWidth="1" />
          <rect x="490" y="370" width="20" height="30" fill="none" stroke="white" strokeWidth="1" />
        </motion.g>

        {/* Graphique stylisé */}
        <motion.path
          d="M 800 400 L 820 450 L 840 430 L 860 500 L 880 520 L 900 480 L 920 550 L 940 600"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          strokeDasharray="5,5"
          initial={{ strokeDashoffset: 500 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </svg>
    </div>
  )
}
