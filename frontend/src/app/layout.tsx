import type { Metadata } from 'next'
import { Raleway, Lato } from 'next/font/google'
import './globals.css'
import Loader from '@/components/ui/Loader'
import ScrollBar from '@/components/ui/ScrollBar'
import WhatsAppFloat from '@/components/ui/WhatsAppFloat'
import { Toaster } from 'react-hot-toast'

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-raleway',
  display: 'swap',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-lato',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SAPRES SARL — Énergie Solaire au Cameroun',
  description:
    'SAPRES SARL - Spécialiste énergie solaire au Cameroun. Installations résidentielles, industrielles, éclairage public, pompes solaires. Partenaire Blue Carbon.',
  keywords: ['solaire', 'Cameroun', 'Blue Carbon', 'panneaux solaires', 'énergie renouvelable', 'SAPRES'],
  openGraph: {
    title: 'SAPRES SARL — Énergie Solaire au Cameroun',
    description: 'Solutions solaires complètes pour particuliers et entreprises. Partenaire officiel Blue Carbon.',
    locale: 'fr_CM',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${raleway.variable} ${lato.variable}`}>
      <body>
        <Loader />
        <ScrollBar />
        {children}
        <WhatsAppFloat />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1E2A3A',
              color: '#fff',
              borderLeft: '4px solid #8CC63F',
              fontFamily: 'Lato, sans-serif',
              fontSize: '.85rem',
            },
          }}
        />
      </body>
    </html>
  )
}
