"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/components/language-provider"

export default function ENSTPCyclesPage() {
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
    setLoading(false)
  }, [router])

  // Rediriger vers la page correspondante au cycle choisi
  const handleCycleSelection = (cycle: "ci" | "cp") => {
    router.push(`/enstp/${cycle}`)
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
            onClick={() => router.push("/enstp")}
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

        <h2 className="text-2xl font-bold text-center text-[#F57C00] mb-8">Sélectionnez votre cycle d'études</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
          {/* Bloc Cycle Ingénieur */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => handleCycleSelection("ci")}
          >
            <Card className="bg-[#0A1D37]/80 border-[#F57C00] border-2 hover:bg-[#0A1D37]/60 transition-all cursor-pointer h-full">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="text-4xl mb-4">🔷</div>
                <h3 className="text-xl font-bold text-white mb-2">Cycle Ingénieur (CI)</h3>
                <p className="text-white/70">
                  Accédez aux modules et ressources du cycle ingénieur en génie civil et travaux publics.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Bloc Cycle Préparatoire */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => handleCycleSelection("cp")}
          >
            <Card className="bg-[#0A1D37]/80 border-[#F57C00] border-2 hover:bg-[#0A1D37]/60 transition-all cursor-pointer h-full">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="text-4xl mb-4">🔶</div>
                <h3 className="text-xl font-bold text-white mb-2">Cycle Préparatoire (CP)</h3>
                <p className="text-white/70">
                  Accédez aux modules et ressources du cycle préparatoire en sciences fondamentales.
                </p>
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

        {/* Bâtiment stylisé */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
          <rect x="300" y="400" width="400" height="500" fill="none" stroke="white" strokeWidth="2" />
          <line x1="300" y1="500" x2="700" y2="500" stroke="white" strokeWidth="1" />
          <line x1="300" y1="600" x2="700" y2="600" stroke="white" strokeWidth="1" />
          <line x1="300" y1="700" x2="700" y2="700" stroke="white" strokeWidth="1" />
          <line x1="300" y1="800" x2="700" y2="800" stroke="white" strokeWidth="1" />

          <line x1="400" y1="400" x2="400" y2="900" stroke="white" strokeWidth="1" />
          <line x1="500" y1="400" x2="500" y2="900" stroke="white" strokeWidth="1" />
          <line x1="600" y1="400" x2="600" y2="900" stroke="white" strokeWidth="1" />
        </motion.g>

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
      </svg>
    </div>
  )
}
