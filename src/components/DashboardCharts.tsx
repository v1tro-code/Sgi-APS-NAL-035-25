'use client';

import { Suspense, useState } from 'react';
import MonthlyTimelineChart from './charts/MonthlyTimelineChart';
import HelpTypesTreemapChart from './charts/HelpTypesTreemapChart';
import MunicipalityRadarChart from './charts/MunicipalityRadarChart';
import { BarChart3, TrendingUp, MapPin } from 'lucide-react';

type Municipality = 'Tumaco' | 'Buenaventura' | null;

const DashboardCharts = () => {
  const [selectedMunicipality, setSelectedMunicipality] = useState<Municipality>(null);

  const handleMunicipalityFilter = (municipality: Municipality) => {
    setSelectedMunicipality(municipality);
  };

  return (
    <div className="space-y-8">
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center space-x-3">
          <BarChart3 size={32} />
          <div>
            <h2 className="text-2xl font-bold">Dashboard de Análisis</h2>
            <p className="text-gray-200">Visualización interactiva de datos del sistema</p>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Monthly Timeline Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6 col-span-1 xl:col-span-2">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="text-blue-600" size={24} />
            </div>
            <div>
            </div>
          </div>
          <Suspense fallback={
            <div className="flex items-center justify-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          }>
            <MonthlyTimelineChart selectedMunicipality={selectedMunicipality} />
          </Suspense>
        </div>

        {/* Help Types Treemap */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-green-100 rounded-lg">
              <BarChart3 className="text-green-600" size={24} />
            </div>
            <div>
            </div>
          </div>
          <Suspense fallback={
            <div className="flex items-center justify-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          }>
            <HelpTypesTreemapChart selectedMunicipality={selectedMunicipality} />
          </Suspense>
        </div>

        {/* Municipality Radar Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-purple-100 rounded-lg">
              <MapPin className="text-purple-600" size={24} />
            </div>
            <div>
            </div>
          </div>
          <Suspense fallback={
            <div className="flex items-center justify-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          }>
            <MunicipalityRadarChart onMunicipalitySelect={handleMunicipalityFilter} selectedMunicipality={selectedMunicipality} />
          </Suspense>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 font-medium">Total de Casos</p>
              <p className="text-3xl font-bold text-blue-900">1,247</p>
            </div>
            <div className="p-3 bg-blue-200 rounded-full">
              <BarChart3 className="text-blue-700" size={24} />
            </div>
          </div>
          <p className="text-blue-600 text-sm mt-2">↗ +12% vs mes anterior</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 font-medium">Casos Resueltos</p>
              <p className="text-3xl font-bold text-green-900">892</p>
            </div>
            <div className="p-3 bg-green-200 rounded-full">
              <TrendingUp className="text-green-700" size={24} />
            </div>
          </div>
          <p className="text-green-600 text-sm mt-2">↗ +8% vs mes anterior</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 font-medium">Municipios Activos</p>
              <p className="text-3xl font-bold text-purple-900">2</p>
            </div>
            <div className="p-3 bg-purple-200 rounded-full">
              <MapPin className="text-purple-700" size={24} />
            </div>
          </div>
          <p className="text-purple-600 text-sm mt-2">Tumaco y Buenaventura</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;