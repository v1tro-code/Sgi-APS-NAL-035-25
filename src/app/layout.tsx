import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sistema de Gestión Institucional - Alianza",
  description: "Plataforma integral para la gestión de solicitudes de ayuda, registros institucionales, usuarios y capacitaciones. Sistema diseñado para optimizar los procesos administrativos y mejorar la atención ciudadana.",
  keywords: ["gestión institucional", "solicitudes de ayuda", "administración pública", "Nicaragua", "sistema administrativo"],
  authors: [{ name: "Alianza" }],
  creator: "Alianza",
  publisher: "Alianza",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Sistema de Gestión Institucional - Alianza",
    description: "Plataforma integral para la gestión de solicitudes de ayuda, registros institucionales, usuarios y capacitaciones.",
    url: 'http://localhost:3000',
    siteName: 'Sistema de Gestión Institucional',
    images: [
      {
        url: '/logo.jpeg',
        width: 1200,
        height: 630,
        alt: 'Logo Sistema de Gestión Institucional Alianza',
      },
    ],
    locale: 'es_NI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Sistema de Gestión Institucional - Alianza",
    description: "Plataforma integral para la gestión de solicitudes de ayuda, registros institucionales, usuarios y capacitaciones.",
    images: ['/logo.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo.jpeg',
    shortcut: '/logo.jpeg',
    apple: '/logo.jpeg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
