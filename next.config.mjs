/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Configuration pour servir les fichiers statiques du TP PETRO geo Lab
  async rewrites() {
    return [
      {
        source: '/tp/petro/:path*',
        destination: '/tp/petro/:path*',
      },
    ]
  },
  // Configuration pour les domaines externes autorisés pour les iframes
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' *.vusercontent.net *.vercel.app;",
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ]
  },
}

export default nextConfig
