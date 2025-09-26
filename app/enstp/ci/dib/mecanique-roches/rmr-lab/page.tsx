"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/components/language-provider"
import { RMRLabFrame } from "@/components/rmr-lab-frame"

export default function RMRLabPage() {
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
    <div className="min-h-screen bg-[#0A1D37] text-white" dir={dir}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/enstp/ci/dib/mecanique-roches")}
              className="mr-2 text-white/70 hover:text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-4">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/enstp-logo.png"
                  alt="ENSTP Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                  priority
                />
              </div>
              <h1 className="text-xl font-bold text-white">MDR "RMR" Lab</h1>
            </div>
          </div>
          <LanguageSwitcher />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#0A1D37]/80 border-[#F57C00] border-2 rounded-lg p-4"
        >
          <RMRLabFrame url="https://kzmokm2p4jupj05bk8yx.lite.vusercontent.net/" />
        </motion.div>

        <div className="mt-4 text-center text-white/60 text-xs">
          <p>{t("copyright")}</p>
        </div>
      </div>
    </div>
  )
}
