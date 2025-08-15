'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { ArrowLeft } from 'lucide-react';
import mockData from '@/data/mockCases.json';

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface MonthlyTimelineChartProps {
  height?: number;
  selectedMunicipality?: 'Tumaco' | 'Buenaventura' | null;
}

const MonthlyTimelineChart: React.FC<MonthlyTimelineChartProps> = ({ height = 500, selectedMunicipality }) => {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'overview' | 'monthly'>('overview');
  // Note: filteredCases logic preserved for potential future use

  // Month names array
  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                     'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  // Help types and their colors
  const helpTypes = [
    'Apoyo Psicológico',
    'Violencia Física', 
    'Asesoría Legal',
    'Violencia Psicológica',
    'Refugio Temporal',
    'Violencia Sexual',
    'Amenazas',
    'Violencia Económica'
  ];

  const colors = [
    '#3B82F6', // Blue
    '#EF4444', // Red
    '#10B981', // Green
    '#F59E0B', // Yellow
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#F97316', // Orange
    '#6B7280'  // Gray
  ];

  // Calculate monthly data by help type using JSON data
  const getStackedData = () => {
    // If municipality is selected, filter the data proportionally
    if (selectedMunicipality) {
      const municipalityRatio = selectedMunicipality === 'Tumaco' ? 0.6 : 0.4; // Tumaco gets 60%, Buenaventura 40%
      
      return helpTypes.map(type => ({
        name: type,
        data: mockData.monthlyData.map(monthData => 
          Math.round((monthData.byType[type] || 0) * municipalityRatio)
        )
      }));
    }

    // Use full data from JSON
    return helpTypes.map(type => ({
      name: type,
      data: mockData.monthlyData.map(monthData => monthData.byType[type] || 0)
    }));
  };

  // Calculate trend line data (total cases per month)
  const getTrendData = () => {
    if (selectedMunicipality) {
      const municipalityRatio = selectedMunicipality === 'Tumaco' ? 0.6 : 0.4;
      return mockData.monthlyData.map(monthData => Math.round(monthData.cases * municipalityRatio));
    }
    return mockData.monthlyData.map(monthData => monthData.cases);
  };

  // Generate monthly trend data for specific month view
  const getMonthlyTrendData = (monthIndex: number) => {
    if (monthIndex === null) return [];
    
    const monthData = mockData.monthlyData[monthIndex];
    
    // Create trend data for each help type across a simulated week
    const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    
    return helpTypes.map(type => {
      const baseValue = monthData.byType[type] || 0;
      if (selectedMunicipality) {
        const ratio = selectedMunicipality === 'Tumaco' ? 0.6 : 0.4;
        const adjustedBase = Math.round(baseValue * ratio);
        return {
          name: type,
          data: weekDays.map(() => Math.max(0, Math.round(adjustedBase / 7 + (Math.random() - 0.5) * adjustedBase * 0.3)))
        };
      }
      return {
        name: type,
        data: weekDays.map(() => Math.max(0, Math.round(baseValue / 7 + (Math.random() - 0.5) * baseValue * 0.3)))
      };
    }).filter(series => series.data.some(val => val > 0));
  };

  const stackedData = getStackedData();
  const trendData = getTrendData();
  const monthlyTrendData = viewMode === 'monthly' && selectedMonth !== null ? getMonthlyTrendData(selectedMonth) : [];
  
  const chartData = {
    series: viewMode === 'overview' ? [
      ...stackedData,
      {
        name: 'Tendencia Total',
        type: 'line',
        data: trendData
      }
    ] : monthlyTrendData,
    options: {

      plotOptions: viewMode === 'overview' ? {
        bar: {
          horizontal: false,
          columnWidth: '95%',
          borderRadius: 4,
          borderRadiusApplication: 'end',
          dataLabels: {
            position: 'center'
          }
        },
        line: {
          curve: 'smooth'
        }
      } : {
        line: {
          curve: 'smooth'
        }
      },
      stroke: viewMode === 'overview' ? {
        width: [0, 0, 0, 0, 0, 3],
        curve: 'smooth'
      } : {
        width: 3,
        curve: 'smooth',
        lineCap: 'round'
      },
      colors: [...colors, '#FF6B6B'], // Add red color for trend line
      xaxis: {
        categories: viewMode === 'overview' ? monthNames : ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
        title: {
          text: viewMode === 'overview' ? 'Meses del Año 2024' : `Tendencia Semanal - ${selectedMonth !== null ? monthNames[selectedMonth] : ''} 2024`,
          style: {
            fontSize: '14px',
            fontWeight: 600,
            color: '#374151'
          }
        },
        labels: {
          style: {
            colors: '#1F2937',
            fontSize: '12px'
          }
        }
      },
      chart: {
        type: viewMode === 'overview' ? 'line' as const : 'line' as const,
        height: height,
        stacked: viewMode === 'overview',
        toolbar: {
          show: false
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800
        },
        events: viewMode === 'overview' ? {
           xAxisLabelClick: function(event: Event, chartContext: object, config: { labelIndex: number }) {
             const monthIndex = config.labelIndex;
             setSelectedMonth(monthIndex);
             setViewMode('monthly');
           }
         } : {}
      },
      yaxis: {
        title: {
          text: 'Número de Casos',
          style: {
            fontSize: '14px',
            fontWeight: 600,
            color: '#374151'
          }
        },
        labels: {
          style: {
            colors: '#1F2937',
            fontSize: '12px'
          }
        }
      },
      grid: {
        borderColor: '#E5E7EB',
        strokeDashArray: 3
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        fontSize: '12px',
        fontWeight: 500,
        labels: {
          colors: '#374151'
        },
        markers: {
          width: 12,
          height: 12,
          radius: 3
        }
      },
      dataLabels: {
        enabled: false
      },
      tooltip: {
        theme: 'light',
        style: {
          fontSize: '12px',
          color: '#000000'
        },
        custom: function({series, seriesIndex, dataPointIndex, w}: { series: number[][], seriesIndex: number, dataPointIndex: number, w: { globals: { seriesNames: string[], labels: string[] } } }) {
          const value = series[seriesIndex][dataPointIndex];
          const seriesName = w.globals.seriesNames[seriesIndex];
          const month = w.globals.labels[dataPointIndex];
          
          // Different tooltip for trend line vs bars
          if (seriesName === 'Tendencia Total') {
            return `<div style="
              background: #ffffff;
              border: 2px solid #e5e7eb;
              border-radius: 8px;
              padding: 8px 12px;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
              font-family: system-ui, -apple-system, sans-serif;
            ">
              <div style="
                color: #1f2937;
                font-weight: 600;
                font-size: 14px;
                margin-bottom: 4px;
              ">Tendencia Total</div>
              <div style="
                color: #6b7280;
                font-size: 12px;
                margin-bottom: 2px;
              ">${month} 2024</div>
              <div style="
                color: #dc2626;
                font-weight: 600;
                font-size: 13px;
              ">${value} casos totales</div>
            </div>`;
          } else {
            return `<div style="
              background: #ffffff;
              border: 2px solid #e5e7eb;
              border-radius: 8px;
              padding: 8px 12px;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
              font-family: system-ui, -apple-system, sans-serif;
            ">
              <div style="
                color: #1f2937;
                font-weight: 600;
                font-size: 14px;
                margin-bottom: 4px;
              ">${seriesName}</div>
              <div style="
                color: #6b7280;
                font-size: 12px;
                margin-bottom: 2px;
              ">${month} 2024</div>
              <div style="
                color: #1f2937;
                font-weight: 600;
                font-size: 13px;
              ">${value} casos</div>
            </div>`;
          }
        }
      },
      title: {
        text: viewMode === 'overview' 
          ? (selectedMunicipality 
              ? `Distribución de Casos por Tipo - ${selectedMunicipality} 2024`
              : 'Distribución de Casos por Tipo - Mensual 2024')
          : `Tendencia de ${selectedMonth !== null ? monthNames[selectedMonth] : ''} por Tipo de Caso`,
        align: 'left' as const,
        style: {
          fontSize: '18px',
          fontWeight: 600,
          color: '#111827'
        }
      },
      subtitle: {
        text: viewMode === 'overview'
          ? (selectedMunicipality 
              ? `Casos por tipo de ayuda mensual en ${selectedMunicipality}`
              : 'Casos por tipo de ayuda distribuidos mensualmente')
          : `Distribución semanal de casos por tipo de ayuda${selectedMunicipality ? ` en ${selectedMunicipality}` : ''}`,
        align: 'left' as const,
        style: {
          fontSize: '14px',
          color: '#374151'
        }
      },
      responsive: [{
        breakpoint: 768,
        options: {
          chart: {
            height: 300
          },
          title: {
            style: {
              fontSize: '16px'
            }
          },
          subtitle: {
            style: {
              fontSize: '12px'
            }
          }
        }
      }]
    } as ApexOptions
  };





  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Back Button for Monthly View */}
        {viewMode === 'monthly' && (
          <div className="mb-4">
            <button
              onClick={() => {
                setViewMode('overview');
                setSelectedMonth(null);
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <ArrowLeft size={16} />
              <span>Volver a Vista General</span>
            </button>
          </div>
        )}
        
        <Chart
          options={chartData.options}
          series={chartData.series}
          type={viewMode === 'overview' ? "bar" : "line"}
          height={height}
        />
      </div>

    </>
  );
};

export default MonthlyTimelineChart;