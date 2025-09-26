"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Check, ChevronDown, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/components/language-provider"

const languages = [
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "ar", name: "العربية", flag: "🇩🇿" },
]

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  // Éviter les erreurs d'hydratation
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="w-[130px] justify-start">
        <Globe className="mr-2 h-4 w-4" />
        <span>Langue</span>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="w-[130px] justify-start">
          <Globe className="mr-2 h-4 w-4" />
          <span className="mr-1">
            {languages.find((lang) => lang.code === language)?.flag}{" "}
            {languages.find((lang) => lang.code === language)?.code.toUpperCase()}
          </span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className={`flex items-center justify-between ${lang.code === "ar" ? "font-arabic" : ""}`}
            onClick={() => setLanguage(lang.code)}
          >
            <span>
              {lang.flag} {lang.name}
            </span>
            {language === lang.code && <Check className="h-4 w-4 ml-2" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
