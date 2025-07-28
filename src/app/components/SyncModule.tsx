'use client';

import { useState, useEffect } from 'react';
import { 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Upload,
  Download,
  RefreshCw as Sync,
  Database,
  Activity,
  Calendar,
  User,
  FileText,
  Settings,
  Trash2,
  Eye
} from 'lucide-react';

interface SyncRecord {
  id: number;
  type: 'create' | 'update' | 'delete';
  entity: string;
  entityId: number;
  description: string;
  timestamp: string;
  status: 'pending' | 'synced' | 'error' | 'conflict';
  user: string;
  size: number;
  retries: number;
}

const SyncModule = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState('2024-01-15 14:30:25');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [autoSync, setAutoSync] = useState(true);

  // Datos quemados para la demo
  const [syncRecords, setSyncRecords] = useState<SyncRecord[]>([
    {
      id: 1,
      type: 'create',
      entity: 'Beneficiario',
      entityId: 156,
      description: 'Nuevo beneficiario: María González Pérez',
      timestamp: '2024-01-15 14:25:30',
      status: 'synced',
      user: 'Ana Rodríguez',
      size: 2.3,
      retries: 0
    },
    {
      id: 2,
      type: 'update',
      entity: 'Proyecto',
      entityId: 23,
      description: 'Actualización de progreso: Proyecto Educativo Rural',
      timestamp: '2024-01-15 13:45:15',
      status: 'pending',
      user: 'Carlos Mendoza',
      size: 1.8,
      retries: 2
    },
    {
      id: 3,
      type: 'create',
      entity: 'Capacitación',
      entityId: 89,
      description: 'Nueva capacitación: Agricultura Sostenible',
      timestamp: '2024-01-15 12:30:45',
      status: 'error',
      user: 'María Vásquez',
      size: 4.1,
      retries: 3
    },
    {
      id: 4,
      type: 'update',
      entity: 'Usuario',
      entityId: 12,
      description: 'Actualización de perfil: Roberto Silva',
      timestamp: '2024-01-15 11:15:20',
      status: 'conflict',
      user: 'Ana Rodríguez',
      size: 0.9,
      retries: 1
    },
    {
      id: 5,
      type: 'delete',
      entity: 'Registro',
      entityId: 445,
      description: 'Eliminación de registro duplicado',
      timestamp: '2024-01-15 10:20:10',
      status: 'synced',
      user: 'Carlos Mendoza',
      size: 0.5,
      retries: 0
    },
    {
      id: 6,
      type: 'create',
      entity: 'Informe',
      entityId: 78,
      description: 'Nuevo informe mensual - Enero 2024',
      timestamp: '2024-01-15 09:45:30',
      status: 'pending',
      user: 'Lucía Hernández',
      size: 12.7,
      retries: 0
    }
  ]);

  const syncStats = {
    total: syncRecords.length,
    pending: syncRecords.filter(r => r.status === 'pending').length,
    synced: syncRecords.filter(r => r.status === 'synced').length,
    errors: syncRecords.filter(r => r.status === 'error').length,
    conflicts: syncRecords.filter(r => r.status === 'conflict').length,
    totalSize: syncRecords.reduce((sum, r) => sum + r.size, 0)
  };

  const statusOptions = [
    { value: 'all', label: 'Todos los estados' },
    { value: 'pending', label: 'Pendientes' },
    { value: 'synced', label: 'Sincronizados' },
    { value: 'error', label: 'Con errores' },
    { value: 'conflict', label: 'Conflictos' }
  ];

  const typeOptions = [
    { value: 'all', label: 'Todas las acciones' },
    { value: 'create', label: 'Creaciones' },
    { value: 'update', label: 'Actualizaciones' },
    { value: 'delete', label: 'Eliminaciones' }
  ];

  const filteredRecords = syncRecords.filter(record => {
    const matchesStatus = selectedStatus === 'all' || record.status === selectedStatus;
    const matchesType = selectedType === 'all' || record.type === selectedType;
    return matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'synced':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'conflict':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'synced':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'pending':
        return <Clock size={16} className="text-yellow-600" />;
      case 'error':
        return <XCircle size={16} className="text-red-600" />;
      case 'conflict':
        return <AlertCircle size={16} className="text-purple-600" />;
      default:
        return <Clock size={16} className="text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'create':
        return 'bg-blue-100 text-blue-800';
      case 'update':
        return 'bg-orange-100 text-orange-800';
      case 'delete':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'create':
        return 'Crear';
      case 'update':
        return 'Actualizar';
      case 'delete':
        return 'Eliminar';
      default:
        return type;
    }
  };

  const handleManualSync = async () => {
    setIsSyncing(true);
    // Simular sincronización
    setTimeout(() => {
      setSyncRecords(records => 
        records.map(record => 
          record.status === 'pending' 
            ? { ...record, status: 'synced', retries: 0 }
            : record
        )
      );
      setLastSync(new Date().toLocaleString());
      setIsSyncing(false);
    }, 3000);
  };

  const handleRetryRecord = (id: number) => {
    setSyncRecords(records => 
      records.map(record => 
        record.id === id 
          ? { ...record, status: 'pending', retries: record.retries + 1 }
          : record
      )
    );
  };

  const handleDeleteRecord = (id: number) => {
    if (confirm('¿Está seguro de que desea eliminar este registro del historial?')) {
      setSyncRecords(records => records.filter(record => record.id !== id));
    }
  };

  const handleResolveConflict = (id: number) => {
    setSyncRecords(records => 
      records.map(record => 
        record.id === id 
          ? { ...record, status: 'synced' }
          : record
      )
    );
  };

  // Simular cambios de conectividad
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.1) { // 10% de probabilidad de cambio
        setIsOnline(prev => !prev);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Historial y Sincronización</h2>
          <p className="text-gray-600 mt-1">Gestión de sincronización offline y historial de cambios</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={handleManualSync}
            disabled={isSyncing || !isOnline}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:bg-gray-400 flex items-center space-x-2"
          >
            <RefreshCw size={20} className={isSyncing ? 'animate-spin' : ''} />
            <span>{isSyncing ? 'Sincronizando...' : 'Sincronizar Ahora'}</span>
          </button>
        </div>
      </div>

      {/* Connection Status */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Estado de Conexión</h3>
          <div className="flex items-center space-x-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={autoSync}
                onChange={(e) => setAutoSync(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-gray-600">Sincronización automática</span>
            </label>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-full ${
              isOnline ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {isOnline ? (
                <Wifi className="text-green-600" size={24} />
              ) : (
                <WifiOff className="text-red-600" size={24} />
              )}
            </div>
            <div>
              <p className="font-medium text-gray-900">
                {isOnline ? 'En línea' : 'Sin conexión'}
              </p>
              <p className="text-sm text-gray-600">
                {isOnline ? 'Conectado al servidor' : 'Modo offline activo'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-full bg-blue-100">
              <Database className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="font-medium text-gray-900">Última sincronización</p>
              <p className="text-sm text-gray-600">{lastSync}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-full bg-purple-100">
              <Activity className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="font-medium text-gray-900">Datos pendientes</p>
              <p className="text-sm text-gray-600">{syncStats.totalSize.toFixed(1)} MB</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sync Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-gray-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total</p>
              <p className="text-xl font-bold text-gray-900">{syncStats.total}</p>
            </div>
            <Sync className="text-gray-500" size={24} />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Pendientes</p>
              <p className="text-xl font-bold text-gray-900">{syncStats.pending}</p>
            </div>
            <Clock className="text-yellow-500" size={24} />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Sincronizados</p>
              <p className="text-xl font-bold text-gray-900">{syncStats.synced}</p>
            </div>
            <CheckCircle className="text-green-500" size={24} />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Errores</p>
              <p className="text-xl font-bold text-gray-900">{syncStats.errors}</p>
            </div>
            <XCircle className="text-red-500" size={24} />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Conflictos</p>
              <p className="text-xl font-bold text-gray-900">{syncStats.conflicts}</p>
            </div>
            <AlertCircle className="text-purple-500" size={24} />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-64">
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <div className="md:w-64">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Acción</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              {typeOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Sync Records */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Historial de Sincronización ({filteredRecords.length})
          </h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredRecords.map((record) => (
            <div key={record.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getStatusIcon(record.status)}
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${getTypeColor(record.type)}`}>
                      {getTypeLabel(record.type)}
                    </span>
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${getStatusColor(record.status)}`}>
                      {record.status === 'synced' ? 'Sincronizado' :
                       record.status === 'pending' ? 'Pendiente' :
                       record.status === 'error' ? 'Error' : 'Conflicto'}
                    </span>
                    <span className="text-xs text-gray-500">
                      {record.entity} #{record.entityId}
                    </span>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">{record.description}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <User size={14} />
                      <span>{record.user}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>{record.timestamp}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Database size={14} />
                      <span>{record.size} KB</span>
                    </div>
                    {record.retries > 0 && (
                      <div className="flex items-center space-x-1">
                        <RefreshCw size={14} />
                        <span>{record.retries} reintentos</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {record.status === 'conflict' && (
                    <button 
                      onClick={() => handleResolveConflict(record.id)}
                      className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded"
                      title="Resolver conflicto"
                    >
                      <Settings size={18} />
                    </button>
                  )}
                  {(record.status === 'error' || record.status === 'pending') && (
                    <button 
                      onClick={() => handleRetryRecord(record.id)}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded"
                      title="Reintentar sincronización"
                    >
                      <RefreshCw size={18} />
                    </button>
                  )}
                  <button 
                    className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded"
                    title="Ver detalles"
                  >
                    <Eye size={18} />
                  </button>
                  <button 
                    onClick={() => handleDeleteRecord(record.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded"
                    title="Eliminar del historial"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SyncModule;