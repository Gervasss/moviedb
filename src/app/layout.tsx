import './globals.css'
import { Providers } from './app'
import { Inter } from 'next/font/google'

import type { Metadata } from "next";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL("https://SEU-DOMINIO-AQUI.com"), 
  title: {
    default: "Movies DB — Top filmes, trending e favoritos",
    template: "%s | Movies DB",
  },
  description:
    "Descubra os filmes em alta (trending), explore por gêneros, veja médias e salve seus favoritos no Movies DB.",
  applicationName: "Movies DB",
  keywords: [
    "filmes",
    "movies",
    "trending",
    "top filmes",
    "gêneros",
    "avaliação",
    "médias",
    "favoritos",
    "database de filmes",
  ],
  authors: [{ name: "Gervásio Cardoso" }],
  creator: "Gervásio",
  publisher: "Movies DB",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "Movies DB — Top filmes, trending e favoritos",
    description:
      "Veja os top filmes, explore gêneros, confira médias e monte sua lista de favoritos.",
    url: "/",
    siteName: "Movies DB",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og.png", 
        width: 1200,
        height: 630,
        alt: "Movies DB — Top filmes, trending e favoritos",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Movies DB — Top filmes, trending e favoritos",
    description:
      "Descubra filmes em alta, explore por gêneros, veja médias e salve seus favoritos.",
    images: ["/og.png"],
  },

  icons: {
    icon: [
      { url: "/logo.png" },
      { url: "/icon.png", type: "image/png" }, 
    ],
    apple: [{ url: "/apple-icon.png" }], 
  },

  manifest: "/site.webmanifest", 
  category: "entertainment",
};



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body style={{ fontFamily: 'var(--font-inter), -apple-system, BlinkMacSystemFont, sans-serif' }}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
