'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import mockData from '@/data/mockCases.json';

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface MunicipalityRadarChartProps {
  height?: number;
  onMunicipalitySelect?: (municipality: 'Tumaco' | 'Buenaventura' | null) => void;
  selectedMunicipality?: 'Tumaco' | 'Buenaventura' | null;
}

const MunicipalityRadarChart: React.FC<MunicipalityRadarChartProps> = ({ 
  height = 400, 
  onMunicipalitySelect,
  selectedMunicipality 
}) => {
  const categories = [
    'Violencia Física',
    'Violencia Psicológica',
    'Violencia Sexual',
    'Violencia Económica',
    'Amenazas',
    'Asesoría Legal',
    'Apoyo Psicológico',
    'Refugio Temporal'
  ];

  const tumacoData = [
    mockData.municipalityData.Tumaco.violenciaFisica,
    mockData.municipalityData.Tumaco.violenciaPsicologica,
    mockData.municipalityData.Tumaco.violenciaSexual,
    mockData.municipalityData.Tumaco.violenciaEconomica,
    mockData.municipalityData.Tumaco.amenazas,
    mockData.municipalityData.Tumaco.asesoriaLegal,
    mockData.municipalityData.Tumaco.apoyoPsicologico,
    mockData.municipalityData.Tumaco.refugioTemporal
  ];

  const buenaventuraData = [
    mockData.municipalityData.Buenaventura.violenciaFisica,
    mockData.municipalityData.Buenaventura.violenciaPsicologica,
    mockData.municipalityData.Buenaventura.violenciaSexual,
    mockData.municipalityData.Buenaventura.violenciaEconomica,
    mockData.municipalityData.Buenaventura.amenazas,
    mockData.municipalityData.Buenaventura.asesoriaLegal,
    mockData.municipalityData.Buenaventura.apoyoPsicologico,
    mockData.municipalityData.Buenaventura.refugioTemporal
  ];

  const chartData = {
    series: [
      {
        name: 'Tumaco',
        data: tumacoData
      },
      {
        name: 'Buenaventura',
        data: buenaventuraData
      }
    ],
    options: {
      chart: {
        type: 'radar' as const,
        height: height,
        toolbar: {
          show: true,
          tools: {
            download: true,
            reset: true
          }
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800
        },
        events: {
          legendClick: function(chartContext: Record<string, unknown>, seriesIndex: number) {
            if (onMunicipalitySelect) {
              const municipalityName = seriesIndex === 0 ? 'Tumaco' : 'Buenaventura';
              // Toggle selection: if already selected, deselect; otherwise select
              const newSelection = selectedMunicipality === municipalityName ? null : municipalityName;
              onMunicipalitySelect(newSelection);
            }
          }
        }
      },
      colors: ['#3B82F6', '#EF4444'],
      xaxis: {
        categories: categories,
        labels: {
          style: {
            colors: '#111827',
            fontSize: '12px',
            fontWeight: 500
          }
        }
      },
      yaxis: {
        show: true,
        labels: {
          style: {
            colors: '#1F2937',
            fontSize: '11px'
          }
        }
      },
      plotOptions: {
        radar: {
          size: 140,
          polygons: {
          strokeColors: '#E5E7EB',
          strokeWidth: '1',
          connectorColors: '#E5E7EB',
          fill: {
            colors: ['#f9fafb', '#f3f4f6']
          }
        }
        }
      },
      fill: {
        opacity: 0.2
      },
      stroke: {
        show: true,
        width: 2
      },
      markers: {
        size: 4,
        colors: ['#3B82F6', '#EF4444'],
        strokeColors: '#ffffff',
        strokeWidth: 2
      },
      legend: {
        show: true,
        position: 'bottom' as const,
        horizontalAlign: 'center' as const,
        fontSize: '14px',
        fontWeight: 500,
        labels: {
          colors: '#111827'
        },
        markers: {
          width: 12,
          height: 12,
          radius: 6
        }
      },
      tooltip: {
        theme: 'light',
        style: {
          fontSize: '12px',
          color: '#000000'
        },
        custom: function({series, seriesIndex, dataPointIndex}: {series: number[][], seriesIndex: number, dataPointIndex: number, w: Record<string, unknown>}) {
          const value = series[seriesIndex][dataPointIndex];
          const municipality = seriesIndex === 0 ? 'Tumaco' : 'Buenaventura';
          const helpType = categories[dataPointIndex];
          
          return `<div style="
            background: #ffffff;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            padding: 12px 16px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            font-family: system-ui, -apple-system, sans-serif;
            min-width: 200px;
          ">
            <div style="
              color: #1f2937;
              font-weight: 700;
              font-size: 14px;
              margin-bottom: 8px;
              border-bottom: 1px solid #e5e7eb;
              padding-bottom: 6px;
            ">${helpType}</div>
            <div style="
              color: #374151;
              font-size: 13px;
              margin-bottom: 4px;
            "><strong>Casos:</strong> ${value}</div>
            <div style="
              color: #374151;
              font-size: 13px;
            "><strong>Lugar:</strong> ${municipality}</div>
          </div>`;
        }
      },
      title: {
        text: 'Comparación de Casos por Municipio',
        align: 'left' as const,
        style: {
          fontSize: '18px',
          fontWeight: 600,
          color: '#111827'
        }
      },
      subtitle: {
        text: 'Distribución de tipos de casos entre Tumaco y Buenaventura',
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
            height: 350
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
          },
          plotOptions: {
            radar: {
              size: 120
            }
          },
          xaxis: {
            labels: {
              style: {
                fontSize: '10px'
              }
            }
          }
        }
      }]
    } as ApexOptions
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="radar"
        height={height}
      />
    </div>
  );
};

export default MunicipalityRadarChart;