'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { 
  Shield, 
  Users, 
  BarChart3, 
  Heart, 
  ArrowRight,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Search,
  FileText
} from "lucide-react";
import HelpRequestModal from "./components/HelpRequestModal";
import RequestTracker from "./components/RequestTracker";
import useGSAPScrollSnap from "../hooks/useGSAPScrollSnap";

export default function LandingPage() {
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showTracker, setShowTracker] = useState(false);
  
  // Configurar GSAP Scroll Snap
  const { containerRef } = useGSAPScrollSnap({
    snap: true,
    duration: 1.2,
    ease: 'power2.inOut',
    directional: false
  });
  
  const features = [
    {
      icon: Shield,
      title: "Protección y Seguridad",
      description: "Sistema seguro para el registro y seguimiento de casos de violencia de género con protocolos de confidencialidad.",
      color: "bg-primary"
    },
    {
      icon: Users,
      title: "Gestión de Beneficiarios",
      description: "Registro completo de beneficiarios con seguimiento personalizado y atención integral.",
      color: "bg-blue-500"
    },
    {
      icon: BarChart3,
      title: "Análisis y Reportes",
      description: "Generación de reportes estadísticos para la toma de decisiones basada en datos.",
      color: "bg-purple-500"
    },
    {
      icon: Heart,
      title: "Atención Humanizada",
      description: "Enfoque centrado en la persona con respeto a la dignidad y derechos humanos.",
      color: "bg-pink-500"
    }
  ];

  const stats = [
    { number: "500+", label: "Beneficiarios Atendidos" },
    { number: "15", label: "Municipios Cubiertos" },
    { number: "98%", label: "Casos Resueltos" },
    { number: "24/7", label: "Atención Disponible" }
  ];

  const services = [
    "Atención psicosocial especializada",
    "Asesoría jurídica gratuita",
    "Acompañamiento en procesos legales",
    "Programas de empoderamiento económico",
    "Capacitación en derechos humanos",
    "Red de apoyo comunitario"
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white scroll-snap-container">
      {/* Hero Section */}
      <section id="inicio" className="panel bg-gradient-to-br from-secondary to-white py-20 min-h-screen flex items-center relative">
        {/* Transparent Header */}
        <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-3">
                <Image
                  src="/icon-institutional.svg"
                  alt="Alianza por la Solidaridad"
                  width={50}
                  height={50}
                  className="rounded-lg"
                />
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Alianza por la Solidaridad</h1>
                  <p className="text-sm text-secondary">ActionAid</p>
                </div>
              </div>

              <Link 
                href="/login"
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors shadow-primary backdrop-blur-sm"
              >
                Acceso Administrativo
              </Link>
            </div>
          </div>
        </header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="flex flex-col items-center justify-center text-center space-y-8">
            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <button 
                onClick={() => setShowHelpModal(true)}
                className="bg-primary text-white px-8 py-4 rounded-lg hover:bg-primary-dark transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg text-lg font-bold hover:shadow-primary cursor-pointer"
              >
                <FileText size={24} />
                <span>Registrar mi caso</span>
              </button>
              
              <button 
                onClick={() => setShowTracker(true)}
                className="bg-secondary text-primary border-2 border-primary px-8 py-4 rounded-lg hover:bg-primary hover:text-white hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg text-lg font-bold cursor-pointer"
              >
                <Search size={24} />
                <span>Seguimiento de mi caso</span>
              </button>
            </div>
            
            {/* Contenido principal centrado */}
            <div className="max-w-4xl">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Construyendo una vida 
                <span className="text-primary">libre de violencia</span>
              </h1>
              <p className="text-xl text-gray-600">
                Trabajamos en Tumaco y Buenaventura (Colombia) para contribuir al derecho 
                a una vida libre de violencia, fortaleciendo las capacidades institucionales 
                y comunitarias de protección.
              </p>
=======

            </div>
            <div className="flex justify-center">
              <button 
                onClick={() => setShowHelpModal(true)}
                className="bg-primary text-white px-8 py-4 rounded-lg hover:bg-primary-dark transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg text-lg font-bold hover:shadow-primary cursor-pointer"
              >
                <span>Solicitar Ayuda Ahora</span>
                <ArrowRight size={24} className="animate-pulse" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="panel py-20 bg-gray-50 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Nuestro Enfoque
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Implementamos un sistema integral de atención que fortalece las rutas 
              institucionales y comunitarias de protección contra la violencia de género.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                    <IconComponent className="text-white" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="panel py-20 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Servicios de Atención Integral
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Ofrecemos una gama completa de servicios especializados para la 
                prevención y atención de la violencia de género, con enfoque 
                diferencial y territorial.
              </p>
              <div className="space-y-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-primary text-white p-8 rounded-2xl shadow-primary">
              <h3 className="text-2xl font-bold mb-6">¿Necesitas Ayuda?</h3>
              <p className="mb-6">
                Si estás en situación de violencia o conoces a alguien que necesita ayuda, 
                no dudes en contactarnos. Nuestro equipo está disponible para brindarte 
                el apoyo que necesitas.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone size={20} />
                  <span>Línea de emergencia: 123-456-7890</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail size={20} />
                  <span>ayuda@alianzasolidaridad.org</span>
                </div>
              </div>
              <button 
                 onClick={() => setShowHelpModal(true)}
                 className="mt-6 bg-white text-primary px-6 py-3 rounded-lg hover:bg-secondary transition-colors font-semibold shadow-primary"
               >
                 Contactar Ahora
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Section */}
      <section id="consultas" className="panel py-20 bg-secondary min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Consulta tu Solicitud
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Si ya enviaste una solicitud de ayuda, puedes hacer seguimiento a tu caso 
              usando el número de radicado que recibiste.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center">
                    <Search className="w-8 h-8" style={{color: '#fafafa'}} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Seguimiento de Casos</h3>
                    <p className="text-gray-600">Conoce el estado actual de tu solicitud</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6">
                  Ingresa tu número de radicado para ver el progreso de tu caso, 
                  los próximos pasos y cualquier actualización importante.
                </p>
                
                <button 
                  onClick={() => setShowTracker(true)}
                  className="w-full bg-primary text-white px-8 py-4 rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center space-x-3 text-lg font-semibold shadow-primary"
                >
                  <Search size={24} />
                  <span>Consultar mi Solicitud</span>
                </button>
                
                <div className="mt-6 p-4 bg-secondary rounded-lg">
                  <p className="text-sm text-accent">
                    <strong>¿No tienes tu número de radicado?</strong> Revisa el correo electrónico 
                    o mensaje que recibiste después de enviar tu solicitud.
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Estados de tu Solicitud</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-yellow-600 font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Solicitud Recibida</h4>
                      <p className="text-gray-600 text-sm">
                        Tu solicitud ha sido registrada en nuestro sistema y está en cola para ser procesada.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="font-bold" style={{color: '#fafafa'}}>2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">En Proceso de Atención</h4>
                      <p className="text-gray-600 text-sm">
                        Nuestro equipo especializado está trabajando en tu caso y preparando la respuesta adecuada.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Caso Resuelto</h4>
                      <p className="text-gray-600 text-sm">
                        Tu caso ha sido atendido satisfactoriamente y se han tomado las medidas necesarias.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white font-bold text-xs">!</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-accent mb-1">¿Necesitas ayuda inmediata?</h4>
                      <p className="text-accent text-sm mb-2">
                        Si estás en peligro, no esperes. Contacta inmediatamente:
                      </p>
                      <div className="text-sm text-accent space-y-1">
                        <p><strong>Línea Nacional:</strong> 155</p>
                        <p><strong>Policía:</strong> 123</p>
                        <p><strong>Emergencias:</strong> 123-456-7890</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
<<<<<<< HEAD
      <section id="nosotros" className="panel py-20 bg-gray-50 min-h-screen flex items-center">
=======
      <section id="nosotros" className="py-20 bg-gray-50">
>>>>>>> 255e4db4205d85d85cf5c60cf4112cd293a1de67
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Sobre el Proyecto
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              El proyecto APS-NAL-035-25 busca contribuir de forma significativa a la 
              reducción de la violencia de género en las zonas de ejecución, permitiendo 
              que las personas en situación de mayor vulnerabilidad puedan ejercer su 
              derecho a una vida sin violencia.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fortalecimiento Institucional</h3>
              <p className="text-gray-600">
                Mejoramos las rutas institucionales de atención para disminuir 
                las barreras de acceso y revictimización.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Capacidades Comunitarias</h3>
              <p className="text-gray-600">
                Fortalecemos las capacidades comunitarias de protección para 
                la prevención y respuesta de VdG.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Gestión de Información</h3>
              <p className="text-gray-600">
                Implementamos sistemas de información eficientes y seguros 
                para la documentación de casos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
<<<<<<< HEAD
      <section id="contacto" className="panel py-20 min-h-screen flex items-center">
=======
      <section id="contacto" className="py-20">
>>>>>>> 255e4db4205d85d85cf5c60cf4112cd293a1de67
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Contáctanos
            </h2>
            <p className="text-xl text-gray-600">
              Estamos aquí para ayudarte. No dudes en contactarnos.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Información de Contacto</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="text-primary mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-gray-900">Oficinas</h4>
                    <p className="text-gray-600">Tumaco, Nariño - Colombia</p>
                    <p className="text-gray-600">Buenaventura, Valle del Cauca - Colombia</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="text-primary mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-gray-900">Teléfonos</h4>
                    <p className="text-gray-600">Línea de emergencia: 123-456-7890</p>
                    <p className="text-gray-600">Oficina principal: +57 (2) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Mail className="text-primary mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">info@alianzasolidaridad.org</p>
                    <p className="text-gray-600">ayuda@alianzasolidaridad.org</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h4 className="font-semibold text-gray-900 mb-4">Síguenos</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-primary hover:text-primary-dark transition-colors">
                    <Facebook size={24} />
                  </a>
                  <a href="#" className="text-primary hover:text-primary-dark transition-colors">
                    <Twitter size={24} />
                  </a>
                  <a href="#" className="text-primary hover:text-primary-dark transition-colors">
                    <Instagram size={24} />
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Envíanos un Mensaje</h3>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre Completo
                  </label>
                  <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-600 font-medium placeholder-gray-400"
                  placeholder="Tu nombre completo"
                />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-600 font-medium placeholder-gray-400"
                  placeholder="tu@email.com"
                />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-600 font-medium placeholder-gray-400"
                  placeholder="+57 300 123 4567"
                />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mensaje
                  </label>
                  <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-600 font-medium placeholder-gray-400"
                  placeholder="Describe tu situación o consulta..."
                ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors font-semibold shadow-primary"
                >
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-accent text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src="/icon-institutional.svg"
                  alt="Alianza por la Solidaridad"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
                <div>
                  <h3 className="text-lg font-bold">Alianza por la Solidaridad</h3>
                  <p className="text-sm text-gray-400">ActionAid</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Trabajamos por una vida libre de violencia en Tumaco y Buenaventura, 
                fortaleciendo las capacidades institucionales y comunitarias de protección.
              </p>
              <p className="text-sm text-gray-500">
                Proyecto APS-NAL-035-25
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#inicio" className="hover:text-white">Inicio</a></li>
                <li><a href="#servicios" className="hover:text-white">Servicios</a></li>
                <li><a href="#nosotros" className="hover:text-white">Nosotros</a></li>
                <li><a href="#contacto" className="hover:text-white">Contacto</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Emergencias</h4>
              <div className="space-y-2 text-gray-400">
                <p>Línea Nacional: 155</p>
                <p>Policía: 123</p>
                <p>Línea Proyecto: 123-456-7890</p>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-gray-400" style={{borderTopColor: '#fafafa'}}>
            <p>&copy; 2025 Alianza por la Solidaridad - ActionAid. Todos los derechos reservados.</p>
            <div className="mt-4 flex items-center justify-center space-x-2">
              <span className="text-sm">Hecho con</span>
              <a 
                href="https://v1tr0.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-red-500 hover:text-red-600 transition-colors duration-200"
              >
                <Heart size={16} className="inline" />
              </a>
              <span className="text-sm">por v1tr0</span>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Modal de Solicitud de Ayuda */}
      <HelpRequestModal 
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
      />
      
      {/* Modal de Consulta de Solicitud */}
      <RequestTracker 
        isOpen={showTracker}
        onClose={() => setShowTracker(false)}
      />
    </div>
  );
}
