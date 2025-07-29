'use client';

import { useState, useEffect } from 'react';
import { getHelpRequests, HelpRequest } from '../utils/localStorage';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Download, 
  Calendar, 
  Filter,
  Users,
  FileText,
  Target,
  Award,
  MapPin,
  Clock,
  DollarSign,
  Activity
} from 'lucide-react';

const ReportsModule = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedProject, setSelectedProject] = useState('all');
  const [helpRequests, setHelpRequests] = useState<HelpRequest[]>([]);

  useEffect(() => {
    setHelpRequests(getHelpRequests());
  }, []);

  // Datos quemados para la demo
  const kpis = {
    totalBeneficiaries: 1247,
    activeProjects: 23,
    completedTrainings: 156,
    budgetExecuted: 78.5,
    beneficiariesGrowth: 12.3,
    projectsGrowth: -2.1,
    trainingsGrowth: 25.7,
    budgetGrowth: 8.9
  };

  const projectsData = [
    { name: 'Educación Rural', beneficiaries: 342, budget: 85000, completion: 75, region: 'Norte' },
    { name: 'Agricultura Sostenible', beneficiaries: 289, budget: 67000, completion: 92, region: 'Centro' },
    { name: 'Salud Comunitaria', beneficiaries: 198, budget: 45000, completion: 68, region: 'Sur' },
    { name: 'Microcréditos', beneficiaries: 156, budget: 32000, completion: 88, region: 'Norte' },
    { name: 'Capacitación Técnica', beneficiaries: 134, budget: 28000, completion: 45, region: 'Centro' },
    { name: 'Agua y Saneamiento', beneficiaries: 128, budget: 52000, completion: 82, region: 'Sur' }
  ];

  const regionData = [
    { region: 'Norte', projects: 8, beneficiaries: 498, budget: 145000 },
    { region: 'Centro', projects: 9, beneficiaries: 423, budget: 123000 },
    { region: 'Sur', projects: 6, beneficiaries: 326, budget: 97000 }
  ];

  // Procesar datos para línea de tiempo mensual
  const getMonthlyData = () => {
    const monthlyStats: Record<string, number> = {};
    
    helpRequests.forEach(request => {
      const date = new Date(request.createdAt);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      monthlyStats[monthKey] = (monthlyStats[monthKey] || 0) + 1;
    });

    // Obtener últimos 6 meses
    const months = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthName = date.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' });
      months.push({
        month: monthName,
        cases: monthlyStats[monthKey] || 0
      });
    }
    
    return months;
  };

  // Procesar datos para gráfica radial de tipos de ayuda
  const getViolenceTypeData = () => {
    const helpTypeStats: Record<string, number> = {};
    
    // Mapeo de valores del formulario a etiquetas legibles
    const helpTypeLabels: Record<string, string> = {
      'violencia-fisica': 'Violencia física',
      'violencia-psicologica': 'Violencia psicológica/emocional',
      'violencia-sexual': 'Violencia sexual',
      'violencia-economica': 'Violencia económica',
      'amenazas': 'Amenazas o intimidación',
      'asesoria-legal': 'Asesoría legal',
      'apoyo-psicologico': 'Apoyo psicológico',
      'refugio-temporal': 'Refugio temporal',
      'otro': 'Otro tipo de ayuda'
    };
    
    helpRequests.forEach(request => {
      const type = request.helpType || 'No especificado';
      const label = helpTypeLabels[type] || type;
      helpTypeStats[label] = (helpTypeStats[label] || 0) + 1;
    });

    const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899'];
    
    return Object.entries(helpTypeStats)
      .map(([type, count], index) => ({
        type,
        count,
        percentage: helpRequests.length > 0 ? Math.round((count / helpRequests.length) * 100) : 0,
        color: colors[index % colors.length]
      }))
      .sort((a, b) => b.count - a.count);
  };

  const monthlyData = getMonthlyData();
  const violenceData = getViolenceTypeData();
  const maxMonthlyCases = Math.max(...monthlyData.map(item => item.cases), 1);

  const periods = [
    { value: 'week', label: 'Esta semana' },
    { value: 'month', label: 'Este mes' },
    { value: 'quarter', label: 'Este trimestre' },
    { value: 'year', label: 'Este año' }
  ];

  const regions = [
    { value: 'all', label: 'Todas las regiones' },
    { value: 'norte', label: 'Región Norte' },
    { value: 'centro', label: 'Región Centro' },
    { value: 'sur', label: 'Región Sur' }
  ];

  const projects = [
    { value: 'all', label: 'Todos los proyectos' },
    { value: 'education', label: 'Educación' },
    { value: 'agriculture', label: 'Agricultura' },
    { value: 'health', label: 'Salud' },
    { value: 'microcredit', label: 'Microcréditos' }
  ];

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />;
  };

  const getCompletionColor = (completion: number) => {
    if (completion >= 80) return 'bg-green-500';
    if (completion >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reportes e Indicadores</h2>
          <p className="text-gray-600 mt-1">Análisis de desempeño y métricas clave</p>
        </div>
        <div className="flex space-x-2">
          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark flex items-center space-x-2 shadow-primary">
            <Download size={20} />
            <span>Exportar Reporte</span>
          </button>
        </div>
      </div>

      {/* Bento Grid with Maps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tumaco Map */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <MapPin className="text-primary" size={20} />
              <span>Tumaco</span>
            </h3>
            <p className="text-sm text-gray-600">Región de intervención - Costa Pacífica</p>
          </div>
          <div className="h-80">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15959.123456789!2d-78.78707138040848!3d1.7915513537832914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e2a0a0a0a0a0a0a%3A0x0!2sTumaco%2C%20Nari%C3%B1o%2C%20Colombia!5e0!3m2!1ses!2sco!4v1234567890123!5m2!1ses!2sco&zoom=12&center=1.7915513537832914,-78.78707138040848"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de Tumaco"
            ></iframe>
          </div>
        </div>

        {/* Buenaventura Map */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <MapPin className="text-primary" size={20} />
              <span>Buenaventura</span>
            </h3>
            <p className="text-sm text-gray-600">Región de intervención - Valle del Cauca</p>
          </div>
          <div className="h-80">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15959.123456789!2d-77.01891141790941!3d3.8777167260194947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e2a0a0a0a0a0a0a%3A0x0!2sBuenaventura%2C%20Valle%20del%20Cauca%2C%20Colombia!5e0!3m2!1ses!2sco!4v1234567890123!5m2!1ses!2sco&zoom=12&center=3.8777167260194947,-77.01891141790941"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de Buenaventura"
            ></iframe>
          </div>
        </div>
       </div>

      {/* Modern Timeline - Full Width */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <Calendar className="text-primary" size={20} />
            <span>Historial de Casos - Línea de Tiempo</span>
          </h3>
          <span className="text-sm text-gray-500">Últimos 6 meses</span>
        </div>
        
        {helpRequests.length > 0 ? (
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary to-primary-dark"></div>
            
            {/* Timeline Items */}
            <div className="space-y-6">
              {monthlyData.map((item, index) => (
                <div key={index} className="relative flex items-center">
                  {/* Timeline Dot */}
                  <div className={`absolute left-6 w-4 h-4 rounded-full border-2 border-white shadow-lg z-10 ${
                    item.cases > 0 ? 'bg-primary' : 'bg-gray-300'
                  }`}></div>
                  
                  {/* Content Card */}
                  <div className="ml-16 flex-1">
                    <div className={`p-4 rounded-lg border-l-4 transition-all duration-300 hover:shadow-md ${
                      item.cases > 0 
                        ? 'bg-primary-light border-primary shadow-sm' 
                        : 'bg-gray-50 border-gray-300'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900 capitalize">{item.month}</h4>
                          <p className={`text-sm ${
                            item.cases > 0 ? '' : 'text-gray-600'
                          }`} style={item.cases > 0 ? {color: '#fafafa'} : {}}>
                            {item.cases === 0 ? 'Sin casos registrados' : 
                             item.cases === 1 ? '1 caso registrado' : 
                             `${item.cases} casos registrados`}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${
                            item.cases > 0 ? 'text-primary' : 'text-gray-400'
                          }`}>
                            {item.cases}
                          </div>
                          {item.cases > 0 && helpRequests.length > 0 && (
                            <div className="text-xs" style={{color: '#fafafa'}}>
                              {Math.round((item.cases / helpRequests.length) * 100)}% del total
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      {item.cases > 0 && (
                        <div className="mt-3">
                          <div className="bg-white rounded-full h-2">
                            <div 
                              className="h-2 rounded-full bg-gradient-to-r from-primary to-primary-dark transition-all duration-700"
                              style={{ width: `${(item.cases / maxMonthlyCases) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="mx-auto text-gray-400 mb-4" size={48} />
            <h4 className="text-lg font-medium text-gray-900 mb-2">Sin datos históricos</h4>
            <p className="text-gray-500">Los casos aparecerán aquí cuando se registren solicitudes</p>
          </div>
        )}
      </div>

      {/* Bar Chart for Help Types */}
       <div className="bg-white rounded-lg shadow-md p-6">
         <div className="flex items-center justify-between mb-6">
           <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
             <Target className="text-primary" size={20} />
             <span>Distribución de Tipos de Ayuda</span>
           </h3>
           <span className="text-sm text-gray-500">Total: {helpRequests.length} casos</span>
         </div>
         
         {violenceData.length > 0 ? (
           <div className="space-y-4">
             {violenceData.map((item, index) => {
               const maxValue = Math.max(...violenceData.map(d => d.count), 1);
               return (
                 <div key={index} className="space-y-2">
                   <div className="flex items-center justify-between">
                     <div className="flex items-center space-x-3">
                       <div 
                         className="w-4 h-4 rounded-full shadow-sm" 
                         style={{ backgroundColor: item.color }}
                       ></div>
                       <span className="text-sm font-medium text-gray-900 flex-1">{item.type}</span>
                     </div>
                     <div className="flex items-center space-x-4">
                       <span className="text-sm" style={{color: '#fafafa'}}>
                         {item.count === 1 ? '1 caso' : `${item.count} casos`}
                       </span>
                       <span className="text-lg font-bold text-primary min-w-[3rem] text-right">{item.percentage}%</span>
                     </div>
                   </div>
                   <div className="relative">
                     <div className="bg-gray-200 rounded-full h-3">
                       <div 
                         className="h-3 rounded-full transition-all duration-700 ease-out"
                         style={{ 
                           backgroundColor: item.color,
                           width: `${(item.count / maxValue) * 100}%`,
                           filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))'
                         }}
                       ></div>
                     </div>
                   </div>
                 </div>
               );
             })}
           </div>
         ) : (
           <div className="text-center py-12">
             <Target className="mx-auto text-gray-400 mb-4" size={48} />
             <h4 className="text-lg font-medium text-gray-900 mb-2">Sin datos de ayuda</h4>
             <p className="text-gray-500">Los tipos de ayuda aparecerán cuando se registren solicitudes</p>
           </div>
         )}
       </div>

    </div>
  );
};

export default ReportsModule;