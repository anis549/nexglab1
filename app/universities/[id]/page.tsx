"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, ArrowLeft } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"

export default function UniversityPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")

  // Vérifier si l'université est ENSTP
  if (params.id !== "enstp") {
    router.push("/universities")
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation de l'email avec le domaine NEXGlap@enstp.edu.dz
    if (!email.endsWith(".NEXGlap@enstp.edu.dz")) {
      setError("Veuillez entrer une adresse email valide avec le format user.NEXGlap@enstp.edu.dz")
      return
    }

    // Redirection vers le tableau de bord
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center p-4">
      <div className="w-full max-w-4xl">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/universities")}
            className="mr-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-blue-900">ENSTP - École Nationale Supérieure des Travaux Publics</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center"
          >
            <div className="relative w-64 h-64 mb-4">
              <Image src="/images/enstp-logo.png" alt="Logo ENSTP" fill className="object-contain" priority />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-blue-800">Bienvenue à l&apos;ENSTP</h2>
              <p className="text-blue-600 mt-2">Centre d&apos;excellence en génie civil et travaux publics</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Card className="w-full bg-white border-blue-100 shadow-lg">
              <CardHeader className="bg-blue-600 text-white rounded-t-lg">
                <CardTitle className="text-xl">Connexion ENSTP</CardTitle>
                <CardDescription className="text-blue-100">Accédez à votre espace étudiant</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="email" className="text-blue-800">
                        Adresse Email
                      </Label>
                      <Input
                        id="email"
                        placeholder="user.NEXGlap@enstp.edu.dz"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-blue-200 focus-visible:ring-blue-500"
                      />
                    </div>
                    {error && (
                      <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                  <Button type="submit" className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                    Se connecter
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center border-t border-blue-100 pt-4">
                <p className="text-xs text-blue-500">© 2025 ENSTP - NEXGlab</p>
              </CardFooter>
            </Card>
          </motion.div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Génie Civil", icon: "🏗️", desc: "Structures, matériaux et conception" },
            { title: "Travaux Publics", icon: "🛣️", desc: "Routes, ponts et infrastructures" },
            { title: "Géotechnique", icon: "🏔️", desc: "Sols, fondations et stabilité" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="bg-blue-50 border-blue-100">
                <CardHeader>
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <CardTitle className="text-blue-800">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-600">{item.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
