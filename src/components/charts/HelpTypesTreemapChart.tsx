'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import mockData from '@/data/mockCases.json';

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface HelpTypesTreemapChartProps {
  height?: number;
  selectedMunicipality?: 'Tumaco' | 'Buenaventura' | null;
}

const HelpTypesTreemapChart: React.FC<HelpTypesTreemapChartProps> = ({ height = 400, selectedMunicipality }) => {
  // Filter help types by municipality if selected
  const getFilteredHelpTypes = () => {
    if (!selectedMunicipality) {
      return mockData.helpTypes;
    }

    // Filter cases by municipality and count help types
    const filteredCases = mockData.cases.filter(case_ => case_.municipality === selectedMunicipality);
    const helpTypeCount: { [key: string]: number } = {};
    
    filteredCases.forEach(case_ => {
      helpTypeCount[case_.helpType] = (helpTypeCount[case_.helpType] || 0) + 1;
    });

    // Create filtered help types data
    return Object.entries(helpTypeCount).map(([type, count]) => ({
      type,
      count,
      percentage: (count / filteredCases.length) * 100
    })).sort((a, b) => b.count - a.count);
  };

  const helpTypesData = getFilteredHelpTypes();
  const chartData = {
    series: [{
      data: helpTypesData.map(item => ({
        x: item.type,
        y: item.count
      }))
    }],
    options: {
      chart: {
        type: 'treemap' as const,
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
        }
      },
      colors: [
        '#EF4444', // Red for violence types
        '#F59E0B', // Amber for psychological
        '#3B82F6', // Blue for legal
        '#10B981', // Green for psychological support
        '#8B5CF6', // Purple for shelter
        '#F97316', // Orange for sexual violence
        '#6B7280', // Gray for threats
        '#EC4899'  // Pink for economic violence
      ],
      plotOptions: {
        treemap: {
          enableShades: true,
          shadeIntensity: 0.5,
          reverseNegativeShade: true,
          colorScale: {
            ranges: [
              {
                from: 0,
                to: 20,
                color: '#FEE2E2'
              },
              {
                from: 21,
                to: 40,
                color: '#FECACA'
              },
              {
                from: 41,
                to: 60,
                color: '#FCA5A5'
              },
              {
                from: 61,
                to: 80,
                color: '#F87171'
              },
              {
                from: 81,
                to: 100,
                color: '#EF4444'
              }
            ]
          }
        }
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '12px',
          fontWeight: 600,
          colors: ['#000000']
        },
        formatter: function(text: string, op: Record<string, unknown>) {
          return [text, (op.value as number) + ' casos'];
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
              text-align: center;
            ">${value} casos</div>
          </div>`;
        }
      },
      title: {
        text: selectedMunicipality 
          ? `Tipos de Ayuda - ${selectedMunicipality}`
          : 'Tipos de Ayuda Más Solicitados',
        align: 'left' as const,
        style: {
          fontSize: '18px',
          fontWeight: 600,
          color: '#111827'
        }
      },
      subtitle: {
        text: selectedMunicipality 
          ? `Distribución de casos por tipo de ayuda en ${selectedMunicipality}`
          : 'Distribución de casos por tipo de ayuda solicitada',
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
          dataLabels: {
            style: {
              fontSize: '10px'
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
        type="treemap"
        height={height}
      />
    </div>
  );
};

export default HelpTypesTreemapChart;