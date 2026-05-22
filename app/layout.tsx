import type { Metadata, Viewport } from 'next'
import { Cairo, Inter, Poppins, Geist, Geist_Mono } from 'next/font/google'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { PWAInstallPrompt } from '@/components/PWAInstallPrompt'
import { Toaster } from 'sonner'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

const geist = Geist({ 
  subsets: ["latin"],
  variable: '--font-geist',
  display: 'swap',
});

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-geist-mono',
  display: 'swap',
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'UNIMOVE-DZ',
  description: 'Plateforme intelligente de transport universitaire - الجامعة أقرب، أسهل، و أأمن',
  keywords: 'UNIMOVE-DZ, transport universitaire, Sidi Bel Abbès, université, réservation, bus universitaire',
  authors: [{ name: 'مراح ابتسام' }],
  creator: 'مراح ابتسام',
  publisher: 'UNIMOVE-DZ',
  manifest: '/manifest.json',
  applicationName: 'UNIMOVE-DZ',
  appleWebApp: {
    capable: true,
    title: 'UNIMOVE-DZ',
    statusBarStyle: 'black-translucent',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: '/images/logo.png?v=2026-logo-update',
    apple: '/images/logo.png?v=2026-logo-update',
  },
}

export const viewport: Viewport = {
  themeColor: '#059669',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${cairo.className} ${inter.className} ${poppins.className} ${geist.className} antialiased relative`}>
        <LanguageProvider>
          <AuthProvider>
            {/* Background image */}
            <div 
              className="fixed inset-0 z-0 opacity-15"
              style={{
                backgroundImage: 'url(/images/UNIMOVE_DZ.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
              }}
            />

            {/* Content wrapper */}
            <div className="relative z-10">
              {children}
            </div>

            <PWAInstallPrompt />
            
            {/* Toast Notifications */}
            <Toaster position="top-right" richColors closeButton />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
