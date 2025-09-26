import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Middleware pour vérifier l'authentification pour les routes protégées
export function middleware(request: NextRequest) {
  // Vérifier si l'utilisateur tente d'accéder à une route protégée
  if (
    request.nextUrl.pathname.startsWith("/enstp/ci") ||
    request.nextUrl.pathname.startsWith("/enstp/cp") ||
    request.nextUrl.pathname.includes("/mecanique-sols") ||
    request.nextUrl.pathname.includes("/mecanique-roches") ||
    request.nextUrl.pathname.includes("/tp-geologie")
  ) {
    // Vérifier si l'utilisateur est authentifié via un cookie
    const email = request.cookies.get("emailENSTP")?.value
    const isAuthenticated = email && email.endsWith("@enstp.edu.dz")

    // Si non authentifié, rediriger vers la page de connexion
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/enstp", request.url))
    }
  }

  return NextResponse.next()
}

// Configurer les chemins sur lesquels le middleware doit s'exécuter
export const config = {
  matcher: [
    "/enstp/ci/:path*",
    "/enstp/cp/:path*",
    "/enstp/ci/dib/:path*",
    "/enstp/ci/dib/mecanique-sols/:path*",
    "/enstp/ci/dib/mecanique-roches/:path*",
    "/enstp/ci/dib/tp-geologie/:path*",
  ],
}
