import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Panel de Control - Sistema de Gestión Institucional",
  description: "Panel administrativo para la gestión de solicitudes de ayuda, registros institucionales, usuarios y capacitaciones. Acceso completo a todas las funcionalidades del sistema.",
  openGraph: {
    title: "Panel de Control - Sistema de Gestión Institucional",
    description: "Panel administrativo para la gestión de solicitudes de ayuda, registros institucionales, usuarios y capacitaciones.",
    images: ['/logo.jpeg'],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}