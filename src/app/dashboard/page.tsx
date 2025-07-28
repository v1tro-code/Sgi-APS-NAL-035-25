'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { 
  Users, 
  FileText, 
  BarChart3, 
  History, 
  GraduationCap, 
  Settings,
  Bell,
  Search,
  Menu,
  X,
  Plus,
  Download,
  Upload,
  Wifi,
  WifiOff,
  LogOut,
  User,
  Heart
} from "lucide-react";
import RecordsModule from "../components/RecordsModule";
import UsersModule from "../components/UsersModule";
import ReportsModule from "../components/ReportsModule";
import SyncModule from "../components/SyncModule";
import TrainingModule from "../components/TrainingModule";
import AdminRequestsModule from "../components/AdminRequestsModule";
import DataVisualization from "../components/DataVisualization";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [activeModule, setActiveModule] = useState('requests');
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);
  const router = useRouter();

  // Verificar autenticación al cargar
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userData = localStorage.getItem('user');
    
    if (!isAuthenticated || isAuthenticated !== 'true') {
      router.push('/login');
      return;
    }
    
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    router.push('/login');
  };

  // Variables removidas ya que no se usan en el componente actual

  const modules = [
    { id: 'dashboard', name: 'Panel Principal', icon: BarChart3, color: 'bg-red-500' },
    { id: 'requests', name: 'Solicitudes de Ayuda', icon: Heart, color: 'bg-pink-500' },
    { id: 'users', name: 'Gestión de Usuarios', icon: Users, color: 'bg-blue-500' },
    { id: 'records', name: 'Registros Institucionales', icon: FileText, color: 'bg-green-500' },
    { id: 'reports', name: 'Reportes e Indicadores', icon: BarChart3, color: 'bg-purple-500' },
    { id: 'history', name: 'Historial y Sincronización', icon: History, color: 'bg-orange-500' },
    { id: 'training', name: 'Capacitación', icon: GraduationCap, color: 'bg-indigo-500' }
  ];

  // Si no hay usuario, mostrar loading
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-red-600 text-white shadow-lg">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-red-700"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="flex items-center space-x-3">
              <Image
                src="/logo.jpeg"
                alt="Alianza por la Solidaridad"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <div>
                <h1 className="text-xl font-bold">Sistema de Gestión Institucional</h1>
                <p className="text-red-100 text-sm">APS-NAL-035-25</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {isOnline ? (
                <><Wifi size={20} className="text-green-300" /><span className="text-sm hidden md:block">En línea</span></>
              ) : (
                <><WifiOff size={20} className="text-yellow-300" /><span className="text-sm hidden md:block">Sin conexión</span></>
              )}
            </div>
            <button className="p-2 rounded-full hover:bg-red-700 relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-red-600 text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                3
              </span>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-800 rounded-full flex items-center justify-center">
                <User size={16} />
              </div>
              <div className="hidden md:block">
                <span className="text-sm font-medium">{user.username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-full hover:bg-red-700"
                title="Cerrar sesión"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out`}>
          <div className="p-4">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <nav className="space-y-2">
              {modules.map((module) => {
                const IconComponent = module.icon;
                return (
                  <button
                    key={module.id}
                    onClick={() => setActiveModule(module.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeModule === module.id
                        ? 'bg-red-50 text-red-600 border-l-4 border-red-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${module.color} text-white`}>
                      <IconComponent size={16} />
                    </div>
                    <span className="font-medium">{module.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeModule === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Panel Principal - Análisis de Datos</h2>
                <div className="flex space-x-2">
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center space-x-2">
                    <Plus size={20} />
                    <span>Nuevo Registro</span>
                  </button>
                  <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center space-x-2">
                    <Download size={20} />
                    <span>Exportar</span>
                  </button>
                </div>
              </div>

              {/* Visualizaciones de datos dinámicas */}
              <DataVisualization />
            </div>
          )}

          {activeModule === 'requests' && (
            <AdminRequestsModule />
          )}

          {activeModule === 'users' && (
            <UsersModule />
          )}

          {activeModule === 'records' && (
            <RecordsModule />
          )}

          {activeModule === 'reports' && (
            <ReportsModule />
          )}

          {activeModule === 'history' && (
            <SyncModule />
          )}

          {activeModule === 'training' && (
            <TrainingModule />
          )}
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}