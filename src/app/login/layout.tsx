import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Iniciar Sesión - Sistema de Gestión Institucional",
  description: "Accede al sistema de gestión institucional para administrar solicitudes de ayuda, registros y usuarios. Plataforma segura para funcionarios autorizados.",
  openGraph: {
    title: "Iniciar Sesión - Sistema de Gestión Institucional",
    description: "Accede al sistema de gestión institucional para administrar solicitudes de ayuda, registros y usuarios.",
    images: ['/logo.jpeg'],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}