"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

// Types pour les langues supportées
type Language = "fr" | "en" | "ar"
type Direction = "ltr" | "rtl"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  dir: Direction
  t: (key: string) => string
}

// Traductions
const translations = {
  fr: {
    welcome: "Bienvenue sur la plateforme NEXGlab",
    subtitle: 'Laboratoire numérique "NEXGlab"',
    email: "Adresse Email",
    emailPlaceholder: "user@NEXGlab.edu.dz",
    access: "Accéder",
    invalidEmail: "Veuillez entrer une adresse email valide se terminant par @NEXGlab.edu.dz",
    selectUniversity: "Sélectionnez votre université",
    searchUniversity: "Rechercher une université...",
    noUniversityFound: "Aucune université trouvée",
    enstp: "École Nationale Supérieure des Travaux Publics",
    enstpWelcome: "Bienvenue à l'École Nationale Supérieure des Travaux Publics",
    enstpConnect: "Connectez-vous pour accéder à votre espace laboratoire NEXGlab.",
    enstpEmailPlaceholder: "user.NEXGlap@enstp.edu.dz",
    login: "Se connecter",
    invalidEnstpEmail: "Veuillez entrer une adresse email institutionnelle valide se terminant par @enstp.edu.dz",
    dashboard: "Tableau de Bord",
    profile: "Profil",
    logout: "Déconnexion",
    cp: "Cycle Préparatoire",
    ci: "Cycle Ingénieur",
    engineeringData: "Données d'Ingénierie de Base",
    modelingData: "Données de Modélisation Scientifique",
    modules: "Modules",
    completedLabs: "TP Complétés",
    nextSession: "Prochaine Session",
    copyright: "© 2025 NEXGlab - Tous droits réservés",
    student: "Étudiant",
    civilEngineering: "Génie Civil",
    publicWorks: "Travaux Publics",
    geotechnics: "Géotechnique",
    structures: "Structures, matériaux et conception",
    roads: "Routes, ponts et infrastructures",
    soils: "Sols, fondations et stabilité",
    language: "Langue",
  },
  en: {
    welcome: "Welcome to NEXGlab platform",
    subtitle: 'Digital Laboratory "NEXGlab"',
    email: "Email Address",
    emailPlaceholder: "user@NEXGlab.edu.dz",
    access: "Access",
    invalidEmail: "Please enter a valid email address ending with @NEXGlab.edu.dz",
    selectUniversity: "Select your university",
    searchUniversity: "Search for a university...",
    noUniversityFound: "No university found",
    enstp: "National School of Public Works",
    enstpWelcome: "Welcome to the National School of Public Works",
    enstpConnect: "Log in to access your NEXGlab laboratory space.",
    enstpEmailPlaceholder: "user.NEXGlap@enstp.edu.dz",
    login: "Log in",
    invalidEnstpEmail: "Please enter a valid institutional email address ending with @enstp.edu.dz",
    dashboard: "Dashboard",
    profile: "Profile",
    logout: "Logout",
    cp: "Preparatory Cycle",
    ci: "Engineering Cycle",
    engineeringData: "Basic Engineering Data",
    modelingData: "Scientific Modeling Data",
    modules: "Modules",
    completedLabs: "Completed Labs",
    nextSession: "Next Session",
    copyright: "© 2025 NEXGlab - All rights reserved",
    student: "Student",
    civilEngineering: "Civil Engineering",
    publicWorks: "Public Works",
    geotechnics: "Geotechnics",
    structures: "Structures, materials and design",
    roads: "Roads, bridges and infrastructure",
    soils: "Soils, foundations and stability",
    language: "Language",
  },
  ar: {
    welcome: "مرحبًا بكم في منصة NEXGlab",
    subtitle: 'المختبر الرقمي "NEXGlab"',
    email: "البريد الإلكتروني",
    emailPlaceholder: "user@NEXGlab.edu.dz",
    access: "الدخول",
    invalidEmail: "يرجى إدخال عنوان بريد إلكتروني صالح ينتهي بـ @NEXGlab.edu.dz",
    selectUniversity: "اختر جامعتك",
    searchUniversity: "البحث عن جامعة...",
    noUniversityFound: "لم يتم العثور على جامعة",
    enstp: "المدرسة الوطنية العليا للأشغال العمومية",
    enstpWelcome: "مرحبًا بكم في المدرسة الوطنية العليا للأشغال العمومية",
    enstpConnect: "قم بتسجيل الدخول للوصول إلى مساحة مختبر NEXGlab الخاصة بك.",
    enstpEmailPlaceholder: "user.NEXGlap@enstp.edu.dz",
    login: "تسجيل الدخول",
    invalidEnstpEmail: "يرجى إدخال عنوان بريد إلكتروني مؤسسي صالح ينتهي بـ @enstp.edu.dz",
    dashboard: "لوحة التحكم",
    profile: "الملف الشخصي",
    logout: "تسجيل الخروج",
    cp: "الدورة التحضيرية",
    ci: "دورة الهندسة",
    engineeringData: "بيانات الهندسة الأساسية",
    modelingData: "بيانات النمذجة العلمية",
    modules: "الوحدات",
    completedLabs: "المختبرات المكتملة",
    nextSession: "الجلسة القادمة",
    copyright: "© 2025 NEXGlab - جميع الحقوق محفوظة",
    student: "طالب",
    civilEngineering: "الهندسة المدنية",
    publicWorks: "الأشغال العمومية",
    geotechnics: "الجيوتقنية",
    structures: "الهياكل والمواد والتصميم",
    roads: "الطرق والجسور والبنية التحتية",
    soils: "التربة والأساسات والاستقرار",
    language: "اللغة",
  },
}

const LanguageContext = createContext<LanguageContextType>({
  language: "fr",
  setLanguage: () => {},
  dir: "ltr",
  t: (key) => key,
})

export const useLanguage = () => useContext(LanguageContext)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("fr")
  const [dir, setDir] = useState<Direction>("ltr")

  // Fonction pour définir la langue et mettre à jour la direction
  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    setDir(lang === "ar" ? "rtl" : "ltr")

    // Sauvegarder la préférence de langue dans localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang)
    }
  }

  // Fonction de traduction
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.fr] || key
  }

  // Récupérer la langue sauvegardée au chargement
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language") as Language | null
      if (savedLanguage && ["fr", "en", "ar"].includes(savedLanguage)) {
        setLanguage(savedLanguage)
      }
    }
  }, [])

  // Mettre à jour l'attribut dir sur l'élément html
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("dir", dir)
      document.documentElement.setAttribute("lang", language)
    }
  }, [dir, language])

  return <LanguageContext.Provider value={{ language, setLanguage, dir, t }}>{children}</LanguageContext.Provider>
}
