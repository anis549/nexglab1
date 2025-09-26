"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, ArrowLeft, Info } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/components/language-provider"

export default function ENSTPPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { t, dir } = useLanguage()

  // Suivre la position de la souris pour l'effet parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation de l'email avec le domaine @enstp.edu.dz
    if (!email.endsWith("@enstp.edu.dz")) {
      setError(t("invalidEnstpEmail"))
      return
    }

    // Stocker l'email dans localStorage pour l'authentification persistante
    localStorage.setItem("emailENSTP", email)

    // Stocker l'email dans un cookie pour l'authentification côté serveur
    document.cookie = `emailENSTP=${email}; path=/; max-age=${60 * 60 * 24 * 7}` // 7 jours
    document.cookie = `enstp_auth=true; path=/; max-age=${60 * 60 * 24 * 7}` // 7 jours

    // Redirection vers la page de sélection des cycles
    router.push("/enstp/cycles")
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0A1D37] text-white" dir={dir}>
      {/* Animations d'arrière-plan */}
      <div className="absolute inset-0 opacity-20">
        <BuildingGrid mousePosition={mousePosition} />
        <CraneAnimation mousePosition={mousePosition} />
        <BridgeWireframe mousePosition={mousePosition} />
        <RoadPlan mousePosition={mousePosition} />
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="absolute top-4 left-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/select")}
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>

        <div className="absolute top-4 right-4">
          <LanguageSwitcher />
        </div>

        <motion.div
          className="mb-6 flex items-center gap-4"
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-md p-8 backdrop-blur-sm bg-[#0A1D37]/70 rounded-xl border border-white/10 shadow-2xl"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <h2 className="text-2xl font-bold text-center text-[#F57C00]">{t("enstp")}</h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-[#F57C00] cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {t("cp")} | {t("ci")}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-center text-white/80 mb-6">{t("enstpConnect")}</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                {t("email")}
              </Label>
              <Input
                id="email"
                placeholder={t("enstpEmailPlaceholder")}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  // Effacer l'erreur si l'utilisateur modifie l'email
                  if (error) setError("")
                }}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-[#F57C00]"
              />
            </div>

            {error && (
              <Alert variant="destructive" className="bg-red-900/50 border-red-800/50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full bg-[#F57C00] hover:bg-[#FF8C42] text-white font-bold py-3 transition-all duration-300 hover:scale-105"
            >
              {t("login")}
            </Button>
          </form>
        </motion.div>

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

// Composants d'animation d'arrière-plan (inchangés)
function BuildingGrid({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  // Code existant inchangé
  return (
    <div
      className="absolute inset-0"
      style={{
        transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
      }}
    >
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
      </svg>
    </div>
  )
}

function CraneAnimation({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  // Code existant inchangé
  return (
    <div
      className="absolute top-0 right-0 w-1/3 h-1/3"
      style={{
        transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 200 200">
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          style={{ transformOrigin: "100px 180px" }}
        >
          <line x1="100" y1="180" x2="100" y2="50" stroke="white" strokeWidth="3" />
          <line x1="100" y1="50" x2="180" y2="50" stroke="white" strokeWidth="3" />
          <line x1="100" y1="70" x2="170" y2="50" stroke="white" strokeWidth="2" />
          <line x1="180" y1="50" x2="180" y2="40" stroke="white" strokeWidth="2" />
          <line x1="170" y1="50" x2="170" y2="60" stroke="white" strokeWidth="1" />
          <rect x="90" y="180" width="20" height="10" fill="white" />
        </motion.g>
      </svg>
    </div>
  )
}

function BridgeWireframe({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  // Code existant inchangé
  return (
    <div
      className="absolute bottom-0 left-0 w-full h-1/4"
      style={{
        transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 1000 200">
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
          {/* Base du pont */}
          <line x1="0" y1="150" x2="1000" y2="150" stroke="white" strokeWidth="3" />

          {/* Arches */}
          <path d="M 50 150 Q 250 50 450 150" fill="none" stroke="white" strokeWidth="2" />
          <path d="M 450 150 Q 650 50 850 150" fill="none" stroke="white" strokeWidth="2" />

          {/* Supports verticaux */}
          {[100, 200, 300, 400, 500, 600, 700, 800].map((x, i) => (
            <line key={i} x1={x} y1="150" x2={x} y2="100" stroke="white" strokeWidth="1" />
          ))}

          {/* Câbles */}
          <path d="M 0 80 C 250 30 750 30 1000 80" fill="none" stroke="white" strokeWidth="1.5" />
          <path d="M 0 90 C 250 40 750 40 1000 90" fill="none" stroke="white" strokeWidth="1.5" />
        </motion.g>
      </svg>
    </div>
  )
}

function RoadPlan({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  // Code existant inchangé
  return (
    <div
      className="absolute top-0 left-0 w-1/3 h-1/3"
      style={{
        transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`,
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 300 300">
        <motion.g
          initial={{ strokeDashoffset: 1000 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <path
            d="M 50 50 C 100 50, 100 100, 150 100 S 200 150, 250 150 C 300 150, 300 200, 250 250"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
          <path
            d="M 70 70 C 120 70, 120 120, 170 120 S 220 170, 270 170 C 320 170, 320 220, 270 270"
            fill="none"
            stroke="white"
            strokeWidth="1"
            strokeDasharray="5,5"
          />

          {/* Symboles de plan */}
          <circle cx="50" cy="50" r="5" fill="none" stroke="white" />
          <circle cx="150" cy="100" r="5" fill="none" stroke="white" />
          <circle cx="250" cy="150" r="5" fill="none" stroke="white" />
          <circle cx="250" cy="250" r="5" fill="none" stroke="white" />
        </motion.g>
      </svg>
    </div>
  )
}
