"use client"

import { useState, useEffect, useRef } from "react"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface RMRLabFrameProps {
  url: string
}

export function RMRLabFrame({ url }: RMRLabFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Fonction pour vérifier si l'iframe a bien chargé
    const checkIframeLoaded = () => {
      if (iframeRef.current) {
        setIsLoading(false)
      }
    }

    // Essayer de charger l'iframe
    const timer = setTimeout(() => {
      if (isLoading) {
        setError("Le chargement du laboratoire prend plus de temps que prévu. Veuillez patienter...")
      }
    }, 5000)

    return () => {
      clearTimeout(timer)
    }
  }, [isLoading])

  const handleIframeLoad = () => {
    setIsLoading(false)
    setError(null)
  }

  const handleIframeError = () => {
    setIsLoading(false)
    setError("Impossible de charger le laboratoire. Veuillez réessayer plus tard.")
  }

  return (
    <div className="w-full h-full flex flex-col">
      {isLoading && (
        <div className="flex items-center justify-center p-8">
          <div className="animate-pulse text-white text-xl">Chargement du laboratoire...</div>
        </div>
      )}

      {error && (
        <Alert variant="destructive" className="mb-4 bg-red-900/50 border-red-800/50">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <iframe
        ref={iframeRef}
        src={url}
        className={`w-full h-[80vh] border-0 rounded-lg ${isLoading ? "opacity-0" : "opacity-100"}`}
        onLoad={handleIframeLoad}
        onError={handleIframeError}
        allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; microphone; midi; payment; usb; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      />
    </div>
  )
}
