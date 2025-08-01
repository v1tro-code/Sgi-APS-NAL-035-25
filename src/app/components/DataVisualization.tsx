'use client';

import { useState, useEffect } from 'react';
import { getHelpRequests, HelpRequest } from '../utils/localStorage';
import { LucideIcon } from 'lucide-react';
import { 
  BarChart3, 
  Users, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  MapPin,
  Calendar
} from 'lucide-react';

interface ChartData {
  label: string;
  value: number;
  color: string;
}

export default function DataVisualization() {
  const [helpRequests, setHelpRequests] = useState<HelpRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      try {
        const requests = getHelpRequests();
        setHelpRequests(requests);
      } catch (error) {
        console.error('Error loading help requests:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
    // Actualizar cada 30 segundos
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-md animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  // Análisis de datos
  const totalRequests = helpRequests.length;
  const statusData: ChartData[] = [
    {
      label: 'Pendientes',
      value: helpRequests.filter(r => r.status === 'pending').length,
      color: 'bg-yellow-500'
    },
    {
      label: 'En Proceso',
      value: helpRequests.filter(r => r.status === 'in_progress').length,
      color: 'bg-blue-500'
    },
    {
      label: 'Resueltas',
      value: helpRequests.filter(r => r.status === 'resolved').length,
      color: 'bg-green-500'
    }
  ];

  const urgencyData: ChartData[] = [
    {
      label: 'Baja',
      value: helpRequests.filter(r => r.urgencyLevel === 'normal').length,
      color: 'bg-green-400'
    },
    {
      label: 'Media',
      value: helpRequests.filter(r => r.urgencyLevel === 'urgente').length,
      color: 'bg-yellow-400'
    },
    {
      label: 'Alta',
      value: helpRequests.filter(r => r.urgencyLevel === 'emergencia').length,
      color: 'bg-orange-400'
    },
    {
      label: 'Crítica',
      value: helpRequests.filter(r => r.urgencyLevel === 'critica').length,
      color: 'bg-red-500'
    }
  ];

  const helpTypeData: ChartData[] = [
    {
      label: 'Violencia Física',
      value: helpRequests.filter(r => r.helpType === 'violencia-fisica').length,
      color: 'bg-red-400'
    },
    {
      label: 'Violencia Psicológica',
      value: helpRequests.filter(r => r.helpType === 'violencia-psicologica').length,
      color: 'bg-orange-400'
    },
    {
      label: 'Violencia Sexual',
      value: helpRequests.filter(r => r.helpType === 'violencia-sexual').length,
      color: 'bg-red-600'
    },
    {
      label: 'Violencia Económica',
      value: helpRequests.filter(r => r.helpType === 'violencia-economica').length,
      color: 'bg-yellow-400'
    },
    {
      label: 'Amenazas',
      value: helpRequests.filter(r => r.helpType === 'amenazas').length,
      color: 'bg-purple-400'
    },
    {
      label: 'Asesoría Legal',
      value: helpRequests.filter(r => r.helpType === 'asesoria-legal').length,
      color: 'bg-blue-400'
    },
    {
      label: 'Apoyo Psicológico',
      value: helpRequests.filter(r => r.helpType === 'apoyo-psicologico').length,
      color: 'bg-green-400'
    },
    {
      label: 'Refugio Temporal',
      value: helpRequests.filter(r => r.helpType === 'refugio-temporal').length,
      color: 'bg-indigo-400'
    },
    {
      label: 'Otro',
      value: helpRequests.filter(r => r.helpType === 'otro').length,
      color: 'bg-gray-400'
    }
  ];

  // Datos por municipio
  const municipalityData = helpRequests.reduce((acc: Record<string, number>, request) => {
    const municipality = request.municipality || 'No especificado';
    acc[municipality] = (acc[municipality] || 0) + 1;
    return acc;
  }, {});

  const topMunicipalities = Object.entries(municipalityData)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([label, value]) => ({ label, value, color: 'bg-blue-400' }));

  // Datos por mes
  const monthlyData = helpRequests.reduce((acc: Record<string, number>, request) => {
    const date = new Date(request.createdAt);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    acc[monthKey] = (acc[monthKey] || 0) + 1;
    return acc;
  }, {});

  const monthlyChartData = Object.entries(monthlyData)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6) // Últimos 6 meses
    .map(([label, value]) => ({ label, value, color: 'bg-indigo-400' }));

  const BarChart = ({ data, title, icon: Icon }: { data: ChartData[], title: string, icon: LucideIcon }) => {
    const maxValue = Math.max(...data.map(d => d.value), 1);
    
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <Icon className="text-gray-500" size={24} />
        </div>
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 w-24 truncate">{item.label}</span>
              <div className="flex-1 mx-3">
                <div className="bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${item.color} transition-all duration-500`}
                    style={{ width: `${(item.value / maxValue) * 100}%` }}
                  ></div>
                </div>
              </div>
              <span className="text-sm font-bold text-gray-900 w-8 text-right">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">


      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChart data={statusData} title="Estado de Solicitudes" icon={BarChart3} />
        <BarChart data={urgencyData} title="Nivel de Urgencia" icon={AlertTriangle} />
        <BarChart data={helpTypeData} title="Tipo de Ayuda Solicitada" icon={Users} />
        <BarChart data={topMunicipalities} title="Top 5 Municipios" icon={MapPin} />
      </div>

      {/* Tendencia mensual */}
      {monthlyChartData.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Tendencia Mensual</h3>
            <Calendar className="text-gray-500" size={24} />
          </div>
          <div className="space-y-3">
            {monthlyChartData.map((item, index) => {
              const maxValue = Math.max(...monthlyChartData.map(d => d.value), 1);
              return (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 w-20">{item.label}</span>
                  <div className="flex-1 mx-3">
                    <div className="bg-gray-200 rounded-full h-4">
                      <div 
                        className={`h-4 rounded-full ${item.color} transition-all duration-500`}
                        style={{ width: `${(item.value / maxValue) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-gray-900 w-8 text-right">{item.value}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {totalRequests === 0 && (
        <div className="bg-white p-12 rounded-lg shadow-md text-center">
          <BarChart3 className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay datos disponibles</h3>
          <p className="text-gray-600">Las visualizaciones aparecerán cuando se registren solicitudes de ayuda.</p>
        </div>
      )}
    </div>
  );
}