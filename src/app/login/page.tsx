'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Eye, 
  EyeOff, 
  Lock, 
  User, 
  ArrowLeft,
  Shield,
  AlertCircle
} from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: 'admin',
    password: 'admin123'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'El usuario es requerido';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simular autenticación
    setTimeout(() => {
      // Credenciales de demo
      if (formData.username === 'admin' && formData.password === 'admin123') {
        // Guardar sesión (en un caso real usarías JWT o similar)
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify({
          username: formData.username,
          role: 'admin',
          name: 'Administrador Demo'
        }));
        
        // Redirigir al dashboard
        router.push('/dashboard');
      } else {
        setErrors({ general: 'Usuario o contraseña incorrectos' });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link 
            href="/"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-primary mb-6"
          >
            <ArrowLeft size={20} />
            <span>Volver al inicio</span>
          </Link>
          
          <div className="flex justify-center mb-6">
            <Image
              src="/icon-institutional.svg"
              alt="Alianza por la Solidaridad"
              width={80}
              height={80}
              className="rounded-lg"
            />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Acceso Administrativo
          </h1>
          <p className="text-gray-600">
            Sistema de Gestión Institucional
          </p>
          <p className="text-sm text-gray-500 font-medium">
            APS-NAL-035-25
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <Shield className="text-white" size={24} />
            </div>
          </div>
          
          <h2 className="text-xl font-semibold text-gray-900 text-center mb-6">
            Iniciar Sesión
          </h2>
          
          {errors.general && (
            <div className="mb-6 p-4 bg-accent-light border border-accent rounded-lg flex items-center space-x-2">
              <AlertCircle className="text-accent" size={20} />
              <span className="text-accent">{errors.general}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Usuario
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-600 font-medium placeholder-gray-400 ${
                    errors.username ? 'border-accent' : 'border-gray-300'
                  }`}
                  placeholder="Ingrese su usuario"
                  disabled={isLoading}
                />
              </div>
              {errors.username && (
                <p className="mt-1 text-sm text-accent flex items-center">
                  <AlertCircle size={16} className="mr-1" />
                  {errors.username}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-600 font-medium placeholder-gray-400 ${
                    errors.password ? 'border-accent' : 'border-gray-300'
                  }`}
                  placeholder="Ingrese su contraseña"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-accent flex items-center">
                  <AlertCircle size={16} className="mr-1" />
                  {errors.password}
                </p>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  disabled={isLoading}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Recordarme
                </label>
              </div>
              
              <button
                type="button"
                className="text-sm text-primary hover:text-primary-dark"
                disabled={isLoading}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-primary"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Iniciando sesión...</span>
                </>
              ) : (
                <span>Iniciar Sesión</span>
              )}
            </button>
          </form>
          
          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Credenciales de Demo:</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Usuario:</strong> admin</p>
              <p><strong>Contraseña:</strong> admin123</p>
            </div>
          </div>
        </div>
        
        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Este sistema maneja información confidencial. 
            <br />
            El acceso no autorizado está prohibido y será reportado.
          </p>
        </div>
      </div>
    </div>
  );
}