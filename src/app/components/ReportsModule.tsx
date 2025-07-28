'use client';

import { useState } from 'react';
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

  const monthlyData = [
    { month: 'Ene', beneficiaries: 1180, projects: 21, trainings: 12 },
    { month: 'Feb', beneficiaries: 1195, projects: 22, trainings: 15 },
    { month: 'Mar', beneficiaries: 1210, projects: 23, trainings: 18 },
    { month: 'Abr', beneficiaries: 1225, projects: 23, trainings: 22 },
    { month: 'May', beneficiaries: 1240, projects: 24, trainings: 28 },
    { month: 'Jun', beneficiaries: 1247, projects: 23, trainings: 31 }
  ];

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
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center space-x-2">
            <Download size={20} />
            <span>Exportar Reporte</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-48">
            <label className="block text-sm font-medium text-gray-700 mb-1">Período</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              {periods.map(period => (
                <option key={period.value} value={period.value}>{period.label}</option>
              ))}
            </select>
          </div>
          <div className="md:w-48">
            <label className="block text-sm font-medium text-gray-700 mb-1">Región</label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              {regions.map(region => (
                <option key={region.value} value={region.value}>{region.label}</option>
              ))}
            </select>
          </div>
          <div className="md:w-48">
            <label className="block text-sm font-medium text-gray-700 mb-1">Proyecto</label>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              {projects.map(project => (
                <option key={project.value} value={project.value}>{project.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Users className="text-blue-500" size={24} />
              <span className="text-sm font-medium text-gray-600">Beneficiarios</span>
            </div>
            <div className={`flex items-center space-x-1 ${getGrowthColor(kpis.beneficiariesGrowth)}`}>
              {getGrowthIcon(kpis.beneficiariesGrowth)}
              <span className="text-sm font-medium">{Math.abs(kpis.beneficiariesGrowth)}%</span>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{kpis.totalBeneficiaries.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-1">Total de beneficiarios activos</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Target className="text-green-500" size={24} />
              <span className="text-sm font-medium text-gray-600">Proyectos</span>
            </div>
            <div className={`flex items-center space-x-1 ${getGrowthColor(kpis.projectsGrowth)}`}>
              {getGrowthIcon(kpis.projectsGrowth)}
              <span className="text-sm font-medium">{Math.abs(kpis.projectsGrowth)}%</span>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{kpis.activeProjects}</p>
          <p className="text-sm text-gray-500 mt-1">Proyectos en ejecución</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Award className="text-purple-500" size={24} />
              <span className="text-sm font-medium text-gray-600">Capacitaciones</span>
            </div>
            <div className={`flex items-center space-x-1 ${getGrowthColor(kpis.trainingsGrowth)}`}>
              {getGrowthIcon(kpis.trainingsGrowth)}
              <span className="text-sm font-medium">{Math.abs(kpis.trainingsGrowth)}%</span>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{kpis.completedTrainings}</p>
          <p className="text-sm text-gray-500 mt-1">Capacitaciones completadas</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <DollarSign className="text-orange-500" size={24} />
              <span className="text-sm font-medium text-gray-600">Presupuesto</span>
            </div>
            <div className={`flex items-center space-x-1 ${getGrowthColor(kpis.budgetGrowth)}`}>
              {getGrowthIcon(kpis.budgetGrowth)}
              <span className="text-sm font-medium">{Math.abs(kpis.budgetGrowth)}%</span>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{kpis.budgetExecuted}%</p>
          <p className="text-sm text-gray-500 mt-1">Ejecución presupuestaria</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tendencias Mensuales</h3>
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={data.month} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600 w-12">{data.month}</span>
                <div className="flex-1 mx-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${(data.beneficiaries / 1300) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-16">{data.beneficiaries}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regional Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribución Regional</h3>
          <div className="space-y-4">
            {regionData.map((region) => (
              <div key={region.region} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-gray-900">{region.region}</h4>
                  <span className="text-sm text-gray-600">{region.projects} proyectos</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Beneficiarios:</span>
                    <span className="font-medium ml-2">{region.beneficiaries}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Presupuesto:</span>
                    <span className="font-medium ml-2">${region.budget.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Performance */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Desempeño de Proyectos</h3>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Proyecto</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Región</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Beneficiarios</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Presupuesto</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Progreso</th>
                </tr>
              </thead>
              <tbody>
                {projectsData.map((project, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{project.name}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center space-x-1">
                        <MapPin size={14} className="text-gray-400" />
                        <span className="text-gray-600">{project.region}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-gray-900">{project.beneficiaries}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-gray-900">${project.budget.toLocaleString()}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-24">
                          <div 
                            className={`h-2 rounded-full ${getCompletionColor(project.completion)}`}
                            style={{ width: `${project.completion}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-600 w-12">{project.completion}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Impact Summary */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Resumen de Impacto</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="text-blue-600" size={32} />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-1">1,247</h4>
              <p className="text-gray-600">Vidas impactadas directamente</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="text-green-600" size={32} />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-1">23</h4>
              <p className="text-gray-600">Proyectos en ejecución</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="text-purple-600" size={32} />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-1">156</h4>
              <p className="text-gray-600">Capacitaciones completadas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsModule;