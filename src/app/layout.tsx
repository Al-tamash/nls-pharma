import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Noble Life Sciences - Pharmaceutical Intermediates & Chemicals',
  description:
    'Leading manufacturer of Intermediates for APIs and trader of Chemicals & Solvents since 2015. Based in Hyderabad, India, serving the pharmaceutical industry with premium quality products.',
  keywords: [
    'Noble Life Sciences',
    'pharmaceutical intermediates',
    'API intermediates',
    'chemical solvents',
    'pharmaceutical chemicals',
    'Hyderabad',
    'India',
  ],
  authors: [{ name: 'Noble Life Sciences' }],
  icons: {
    icon: '/nlsfavicon1.png',
    shortcut: '/nlsfavicon1.png',
    apple: '/nlsfavicon1.png',
  },
  openGraph: {
    title: 'Noble Life Sciences - Pharmaceutical Excellence',
    description:
      'Leading manufacturer of Intermediates for APIs and trader of Chemicals & Solvents',
    url: 'https://noblels.com',
    siteName: 'Noble Life Sciences',
    type: 'website',
    images: [
      {
        url: '/nlslogo4.png',
        width: 1024,
        height: 1024,
        alt: 'Noble Life Sciences Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Noble Life Sciences',
    description:
      'Leading manufacturer of Intermediates for APIs and trader of Chemicals & Solvents',
    images: ['/nlslogo4.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Navbar />
        <main className='min-h-screen'>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
