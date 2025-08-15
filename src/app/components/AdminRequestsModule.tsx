'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Eye, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Phone, 
  Mail, 
  MapPin,
  Calendar,
  User,
  RefreshCw
} from 'lucide-react';
import { 
  getHelpRequests, 
  updateHelpRequestStatus, 
  getHelpRequestStats, 
  type HelpRequest 
} from '../utils/localStorage';

const AdminRequestsModule: React.FC = () => {
  const [requests, setRequests] = useState<HelpRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<HelpRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<HelpRequest | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
    lastWeek: 0
  });

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = () => {
    const allRequests = getHelpRequests();
    const requestStats = getHelpRequestStats();
    
    setRequests(allRequests);
    setStats(requestStats);
  };

  const filterRequests = useCallback(() => {
    let filtered = requests;

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(req => 
        req.radicado.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.municipality.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por estado
    if (statusFilter !== 'all') {
      filtered = filtered.filter(req => req.status === statusFilter);
    }

    // Ordenar por fecha de creación (más recientes primero)
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    setFilteredRequests(filtered);
  }, [requests, searchTerm, statusFilter]);

  useEffect(() => {
    filterRequests();
  }, [filterRequests]);

  const handleStatusChange = (requestId: string, newStatus: HelpRequest['status']) => {
    const success = updateHelpRequestStatus(requestId, newStatus);
    if (success) {
      loadRequests();
      // Actualizar la solicitud seleccionada si es la misma
      if (selectedRequest && selectedRequest.id === requestId) {
        const updatedRequest = requests.find(req => req.id === requestId);
        if (updatedRequest) {
          setSelectedRequest({ ...updatedRequest, status: newStatus, updatedAt: new Date().toISOString() });
        }
      }
    }
  };

  const getStatusInfo = (status: HelpRequest['status']) => {
    switch (status) {
      case 'pending':
        return {
          icon: Clock,
          text: 'Pendiente',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100',
          borderColor: 'border-yellow-200'
        };
      case 'in_progress':
        return {
          icon: AlertCircle,
          text: 'En Proceso',
          color: 'text-blue-600',
          bgColor: 'bg-blue-100',
          borderColor: 'border-blue-200'
        };
      case 'resolved':
        return {
          icon: CheckCircle,
          text: 'Resuelto',
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          borderColor: 'border-green-200'
        };
      default:
        return {
          icon: Clock,
          text: 'Desconocido',
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
          borderColor: 'border-gray-200'
        };
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">Pendientes</p>
              <p className="text-2xl font-bold text-yellow-700">{stats.pending}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">En Proceso</p>
              <p className="text-2xl font-bold text-blue-700">{stats.inProgress}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Resueltos</p>
              <p className="text-2xl font-bold text-green-700">{stats.resolved}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Esta Semana</p>
              <p className="text-2xl font-bold text-gray-900">{stats.lastWeek}</p>
            </div>
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por radicado, nombre o municipio..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 font-medium placeholder-gray-400"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 font-medium"
              >
                <option value="all">Todos los estados</option>
                <option value="pending">Pendientes</option>
                <option value="in_progress">En Proceso</option>
                <option value="resolved">Resueltos</option>
              </select>
            </div>
            
            <button
              onClick={loadRequests}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Actualizar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Lista de solicitudes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lista */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Solicitudes ({filteredRequests.length})
            </h3>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {filteredRequests.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No se encontraron solicitudes</p>
              </div>
            ) : (
              <div className="space-y-2 p-4">
                {filteredRequests.map((request) => {
                  const statusInfo = getStatusInfo(request.status);
                  const StatusIcon = statusInfo.icon;
                  
                  return (
                    <div
                      key={request.id}
                      onClick={() => setSelectedRequest(request)}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                        selectedRequest?.id === request.id ? 'border-red-300 bg-red-50' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-mono text-sm font-semibold text-gray-900">
                              {request.radicado}
                            </span>
                            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${statusInfo.bgColor} ${statusInfo.borderColor} border`}>
                              <StatusIcon className={`w-3 h-3 ${statusInfo.color}`} />
                              <span className={`text-xs font-medium ${statusInfo.color}`}>
                                {statusInfo.text}
                              </span>
                            </div>
                          </div>
                          
                          <p className="font-medium text-gray-900 mb-1">{request.name}</p>
                          <p className="text-sm text-gray-600 mb-1">{request.municipality}</p>
                          <p className="text-xs text-gray-500">{formatDate(request.createdAt)}</p>
                        </div>
                        
                        <Eye className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Detalles */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Detalles de la Solicitud</h3>
          </div>
          
          {selectedRequest ? (
            <div className="p-4 space-y-4">
              {/* Estado y acciones */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {(() => {
                    const statusInfo = getStatusInfo(selectedRequest.status);
                    const StatusIcon = statusInfo.icon;
                    return (
                      <>
                        <StatusIcon className={`w-5 h-5 ${statusInfo.color}`} />
                        <span className={`font-medium ${statusInfo.color}`}>{statusInfo.text}</span>
                      </>
                    );
                  })()}
                </div>
                
                <select
                  value={selectedRequest.status}
                  onChange={(e) => handleStatusChange(selectedRequest.id, e.target.value as HelpRequest['status'])}
                  className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 font-medium"
                >
                  <option value="pending">Pendiente</option>
                  <option value="in_progress">En Proceso</option>
                  <option value="resolved">Resuelto</option>
                </select>
              </div>

              {/* Información personal */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Información Personal</span>
                </h4>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Nombre:</span>
                    <p className="text-gray-900">{selectedRequest.name}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Edad:</span>
                    <p className="text-gray-900">{selectedRequest.age || 'No especificada'}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Teléfono:</span>
                    <p className="text-gray-900 flex items-center space-x-1">
                      <Phone className="w-3 h-3" />
                      <span>{selectedRequest.phone}</span>
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Email:</span>
                    <p className="text-gray-900 flex items-center space-x-1">
                      <Mail className="w-3 h-3" />
                      <span>{selectedRequest.email || 'No proporcionado'}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Ubicación */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Ubicación</span>
                </h4>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Municipio:</span>
                    <p className="text-gray-900">{selectedRequest.municipality}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Barrio/Vereda:</span>
                    <p className="text-gray-900">{selectedRequest.neighborhood || 'No especificado'}</p>
                  </div>
                </div>
              </div>

              {/* Tipo de ayuda */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Tipo de Ayuda</h4>
                <div className="text-sm">
                  <p className="text-gray-900">{selectedRequest.helpType}</p>
                  {selectedRequest.urgencyLevel && (
                    <p className="text-gray-600 mt-1">Urgencia: {selectedRequest.urgencyLevel}</p>
                  )}
                </div>
              </div>

              {/* Descripción */}
              {selectedRequest.description && (
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Descripción</h4>
                  <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded">
                    {selectedRequest.description}
                  </p>
                </div>
              )}

              {/* Fechas */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Creado:</span>
                    <p className="text-gray-900">{formatDate(selectedRequest.createdAt)}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Actualizado:</span>
                    <p className="text-gray-900">{formatDate(selectedRequest.updatedAt)}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              <Eye className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Selecciona una solicitud para ver los detalles</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminRequestsModule;