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

export default function ENSTPCIPage() {
  const router = useRouter()
  const { t, dir } = useLanguage()
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState<string | null>(null)

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

  // Afficher la section correspondante
  const handleSectionSelection = (section: string) => {
    if (section === "dib") {
      router.push("/enstp/ci/dib")
    } else {
      setActiveSection(section)
    }
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
            onClick={() => router.push("/enstp/cycles")}
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

        <h2 className="text-2xl font-bold text-center text-[#F57C00] mb-8">Cycle Ingénieur (CI)</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
          {/* Bloc DIB */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
          >
            <Card
              className="bg-[#0A1D37]/80 border-[#F57C00] border-2 hover:bg-[#0A1D37]/60 transition-all cursor-pointer h-full"
              onClick={() => handleSectionSelection("dib")}
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="text-4xl mb-4">🏗️</div>
                <h3 className="text-xl font-bold text-white mb-2">DIB : Département Infrastructures de Base</h3>
                <p className="text-white/70">
                  Modules et ressources pour les infrastructures de génie civil et travaux publics.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Bloc DMS */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => handleSectionSelection("dms")}
          >
            <Card className="bg-[#0A1D37]/80 border-[#F57C00] border-2 hover:bg-[#0A1D37]/60 transition-all cursor-pointer h-full">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="text-4xl mb-4">🧱</div>
                <h3 className="text-xl font-bold text-white mb-2">DMS : Département Matériaux et Structures</h3>
                <p className="text-white/70">
                  Modules et ressources pour l'étude des matériaux et structures en génie civil.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Contenu qui apparaît après sélection */}
        {activeSection && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 w-full max-w-3xl"
          >
            <Card className="bg-[#0A1D37]/90 border-[#F57C00] border">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  {activeSection === "dib"
                    ? "Département Infrastructures de Base"
                    : "Département Matériaux et Structures"}
                </h3>

                {activeSection === "dib" ? (
                  <div className="space-y-4">
                    <p className="text-white/80">
                      Le département Infrastructures de Base propose des modules d'apprentissage sur les fondamentaux
                      des infrastructures en génie civil.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      {[
                        { title: "Conception des routes", type: "Module", duree: "8 semaines" },
                        { title: "Hydraulique appliquée", type: "Module", duree: "6 semaines" },
                        { title: "Géotechnique avancée", type: "Module", duree: "10 semaines" },
                        { title: "Ouvrages d'art", type: "Module", duree: "12 semaines" },
                      ].map((module, index) => (
                        <div
                          key={index}
                          className="bg-white/10 p-4 rounded-md hover:bg-white/15 transition-colors cursor-pointer"
                        >
                          <h4 className="font-medium text-white">{module.title}</h4>
                          <div className="flex justify-between mt-2 text-sm text-white/60">
                            <span>{module.type}</span>
                            <span>{module.duree}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-white/80">
                      Le département Matériaux et Structures propose des modules d'apprentissage sur les matériaux de
                      construction et l'analyse structurelle.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      {[
                        { title: "Résistance des matériaux", type: "Module", duree: "10 semaines" },
                        { title: "Béton armé avancé", type: "Module", duree: "12 semaines" },
                        { title: "Structures métalliques", type: "Module", duree: "8 semaines" },
                        { title: "Matériaux innovants", type: "Module", duree: "6 semaines" },
                      ].map((module, index) => (
                        <div
                          key={index}
                          className="bg-white/10 p-4 rounded-md hover:bg-white/15 transition-colors cursor-pointer"
                        >
                          <h4 className="font-medium text-white">{module.title}</h4>
                          <div className="flex justify-between mt-2 text-sm text-white/60">
                            <span>{module.type}</span>
                            <span>{module.duree}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

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
