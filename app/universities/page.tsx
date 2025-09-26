"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, ArrowLeft } from "lucide-react"

export default function UniversitiesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  // Liste des universités (pour l'instant, seulement ENSTP)
  const universities = [
    {
      id: "enstp",
      name: "ENSTP",
      fullName: "École Nationale Supérieure des Travaux Publics",
      logo: "/images/enstp-logo.png",
    },
  ]

  const filteredUniversities = universities.filter(
    (uni) =>
      uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.fullName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900 flex flex-col items-center p-4">
      <div className="w-full max-w-4xl">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/")}
            className="mr-2 text-zinc-400 hover:text-white hover:bg-zinc-800"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-white">Sélectionnez votre établissement</h1>
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500" />
          <Input
            placeholder="Rechercher un établissement..."
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
                className="cursor-pointer bg-zinc-800 border-zinc-700 hover:border-cyan-500 transition-colors"
                onClick={() => router.push(`/universities/${university.id}`)}
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
                  <p className="text-zinc-300 text-sm">
                    Accédez aux ressources et laboratoires virtuels de l&apos;ENSTP
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredUniversities.length === 0 && (
          <div className="text-center p-8">
            <p className="text-zinc-400">Aucun établissement trouvé pour &quot;{searchQuery}&quot;</p>
          </div>
        )}
      </div>
    </div>
  )
}
