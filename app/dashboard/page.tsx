"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Book,
  FileText,
  LayoutDashboard,
  LogOut,
  User,
  BarChart3,
  CuboidIcon as Cube,
  Activity,
  BrainCircuit,
  Info,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/components/language-provider"

export default function DashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("cp")
  const { t, dir } = useLanguage()

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-zinc-100" dir={dir}>
        <Sidebar side={dir === "rtl" ? "right" : "left"}>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-2">
              <div className="relative w-8 h-8">
                <Image src="/images/nexglab-logo.png" alt="NEXGlab Logo" fill className="object-contain" />
              </div>
              <div className="text-sm font-medium">ENSTP</div>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>{t("language")}</SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="px-2">
                  <LanguageSwitcher />
                </div>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive>
                      <LayoutDashboard className="h-4 w-4" />
                      <span>{t("dashboard")}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <User className="h-4 w-4" />
                      <span>{t("profile")}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Cycles</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SidebarMenuButton>
                            <Book className="h-4 w-4" />
                            <span>{t("cp")}</span>
                          </SidebarMenuButton>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{t("cp")}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SidebarMenuButton>
                            <FileText className="h-4 w-4" />
                            <span>{t("ci")}</span>
                          </SidebarMenuButton>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{t("ci")}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => router.push("/")}>
                  <LogOut className="h-4 w-4" />
                  <span>{t("logout")}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 overflow-auto">
          <header className="bg-white border-b border-zinc-200 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <h1 className="text-xl font-bold text-zinc-800">{t("dashboard")}</h1>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                <span>{t("student")}</span>
              </Badge>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
                <AvatarFallback>ET</AvatarFallback>
              </Avatar>
            </div>
          </header>

          <main className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { title: t("modules"), value: "5", desc: t("modules"), icon: Book, color: "bg-cyan-500" },
                {
                  title: t("completedLabs"),
                  value: "0",
                  desc: "Sur 12 travaux pratiques",
                  icon: FileText,
                  color: "bg-emerald-500",
                },
                {
                  title: t("nextSession"),
                  value: "2j",
                  desc: "TP Analyse Statistique",
                  icon: BarChart3,
                  color: "bg-amber-500",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-zinc-700">{item.title}</CardTitle>
                        <div className={`${item.color} p-2 rounded-md text-white`}>
                          <item.icon className="h-5 w-5" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-zinc-900">{item.value}</div>
                      <CardDescription>{item.desc}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center mb-4 gap-2">
              <h2 className="text-xl font-semibold">Cycles d'études</h2>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-zinc-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {t("cp")} | {t("ci")}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto">
                <TabsTrigger value="cp" className="flex items-center gap-1">
                  <span>CP</span>
                  <span className="hidden sm:inline">- {t("cp")}</span>
                </TabsTrigger>
                <TabsTrigger value="ci" className="flex items-center gap-1">
                  <span>CI</span>
                  <span className="hidden sm:inline">- {t("ci")}</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="cp" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{t("cp")}</CardTitle>
                    <CardDescription>Modules et ressources pour le cycle préparatoire</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Book className="h-16 w-16 text-zinc-300 mb-4" />
                      <h3 className="text-lg font-medium text-zinc-700">Aucun contenu disponible actuellement</h3>
                      <p className="text-zinc-500 max-w-md mt-2">
                        Le contenu du cycle préparatoire sera configuré par votre enseignant prochainement
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ci" className="space-y-4">
                <Tabs defaultValue="dib">
                  <TabsList>
                    <TabsTrigger value="dib">{t("engineeringData")}</TabsTrigger>
                    <TabsTrigger value="dms">{t("modelingData")}</TabsTrigger>
                  </TabsList>

                  <TabsContent value="dib" className="mt-4 space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>
                          {t("engineeringData")} - {t("ci")}
                        </CardTitle>
                        <CardDescription>Introduction aux principes fondamentaux de la géologie</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            {
                              title: "Introduction à la Géologie",
                              type: "Vidéo",
                              duration: "15 min",
                            },
                            {
                              title: "Classification des Roches",
                              type: "Simulation",
                              duration: "30 min",
                            },
                            {
                              title: "Analyse de Sols",
                              type: "PDF",
                              duration: "20 min",
                            },
                            {
                              title: "Exercices Pratiques",
                              type: "Formulaire",
                              duration: "45 min",
                            },
                          ].map((item, index) => (
                            <Card key={index} className="bg-zinc-50 hover:bg-zinc-100 transition-colors cursor-pointer">
                              <CardContent className="p-4">
                                <div className="font-medium">{item.title}</div>
                                <div className="flex justify-between text-sm text-zinc-500 mt-2">
                                  <span>{item.type}</span>
                                  <span>{item.duration}</span>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="dms" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>
                          {t("modelingData")} - {t("ci")}
                        </CardTitle>
                        <CardDescription>Modélisation et simulation pour l'ingénierie civile</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            {
                              title: "Simulations Physiques Avancées",
                              icon: Activity,
                              desc: "Modélisation complexe de systèmes physiques",
                              color: "bg-purple-100 text-purple-700",
                            },
                            {
                              title: "Interpréteur IA de Résultats",
                              icon: BrainCircuit,
                              desc: "Analyse intelligente de données techniques",
                              color: "bg-rose-100 text-rose-700",
                            },
                            {
                              title: "Modélisation 3D Professionnelle",
                              icon: Cube,
                              desc: "Création de modèles 3D pour l'ingénierie",
                              color: "bg-emerald-100 text-emerald-700",
                            },
                            {
                              title: "Analyse Statistique Avancée",
                              icon: BarChart3,
                              desc: "Traitement de données complexes et visualisation",
                              color: "bg-cyan-100 text-cyan-700",
                            },
                          ].map((item, index) => (
                            <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                              <CardContent className="p-4 flex items-start gap-4">
                                <div className={`p-3 rounded-lg ${item.color}`}>
                                  <item.icon className="h-5 w-5" />
                                </div>
                                <div>
                                  <h3 className="font-medium text-zinc-800">{item.title}</h3>
                                  <p className="text-sm text-zinc-500 mt-1">{item.desc}</p>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
