'use client';

import React, { useState } from 'react';
import { Search, FileText, Clock, CheckCircle, AlertCircle, X } from 'lucide-react';
import { getHelpRequestByRadicado, type HelpRequest } from '../utils/localStorage';

interface RequestTrackerProps {
  isOpen: boolean;
  onClose: () => void;
}

const RequestTracker: React.FC<RequestTrackerProps> = ({ isOpen, onClose }) => {
  const [radicado, setRadicado] = useState('');
  const [request, setRequest] = useState<HelpRequest | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = async () => {
    if (!radicado.trim()) return;
    
    setIsSearching(true);
    setNotFound(false);
    setRequest(null);
    
    // Simular búsqueda
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundRequest = getHelpRequestByRadicado(radicado.trim());
    
    if (foundRequest) {
      setRequest(foundRequest);
    } else {
      setNotFound(true);
    }
    
    setIsSearching(false);
  };

  const getStatusInfo = (status: HelpRequest['status']) => {
    switch (status) {
      case 'pending':
        return {
          icon: Clock,
          text: 'Pendiente',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100',
          description: 'Tu solicitud ha sido recibida y está en cola para ser procesada.'
        };
      case 'in_progress':
        return {
          icon: AlertCircle,
          text: 'En Proceso',
          color: 'text-blue-600',
          bgColor: 'bg-blue-100',
          description: 'Nuestro equipo está trabajando en tu caso.'
        };
      case 'resolved':
        return {
          icon: CheckCircle,
          text: 'Resuelto',
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          description: 'Tu caso ha sido atendido satisfactoriamente.'
        };
      default:
        return {
          icon: Clock,
          text: 'Desconocido',
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
          description: 'Estado no disponible.'
        };
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const reset = () => {
    setRadicado('');
    setRequest(null);
    setNotFound(false);
    setIsSearching(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Consultar Solicitud</h2>
              <p className="text-gray-600 mt-1">Ingresa tu número de radicado para ver el estado de tu solicitud</p>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Número de Radicado
            </label>
            <div className="flex space-x-3">
              <input
                type="text"
                value={radicado}
                onChange={(e) => setRadicado(e.target.value.toUpperCase())}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-600 font-medium placeholder-gray-400"
                placeholder="APS-20240127-1234"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button
                onClick={handleSearch}
                disabled={isSearching || !radicado.trim()}
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2 shadow-primary"
              >
                <Search className="w-5 h-5" />
                <span>{isSearching ? 'Buscando...' : 'Buscar'}</span>
              </button>
            </div>
          </div>

          {notFound && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <h3 className="font-semibold text-red-800">Solicitud no encontrada</h3>
              </div>
              <p className="text-red-700 mt-1">
                No se encontró ninguna solicitud con el número de radicado ingresado. 
                Verifica que el número esté correcto.
              </p>
            </div>
          )}

          {request && (
            <div className="space-y-6">
              {/* Estado actual */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Estado Actual</h3>
                <div className="flex items-center space-x-3">
                  {(() => {
                    const statusInfo = getStatusInfo(request.status);
                    const StatusIcon = statusInfo.icon;
                    return (
                      <>
                        <div className={`w-10 h-10 rounded-full ${statusInfo.bgColor} flex items-center justify-center`}>
                          <StatusIcon className={`w-5 h-5 ${statusInfo.color}`} />
                        </div>
                        <div>
                          <p className={`font-semibold ${statusInfo.color}`}>{statusInfo.text}</p>
                          <p className="text-gray-600 text-sm">{statusInfo.description}</p>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>

              {/* Información de la solicitud */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Detalles de la Solicitud</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Número de Radicado:</span>
                    <p className="text-gray-900 font-mono">{request.radicado}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Fecha de Solicitud:</span>
                    <p className="text-gray-900">{formatDate(request.createdAt)}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Municipio:</span>
                    <p className="text-gray-900">{request.municipality}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Tipo de Ayuda:</span>
                    <p className="text-gray-900">{request.helpType}</p>
                  </div>
                  {request.urgencyLevel && (
                    <div>
                      <span className="font-medium text-gray-700">Nivel de Urgencia:</span>
                      <p className="text-gray-900">{request.urgencyLevel}</p>
                    </div>
                  )}
                  <div>
                    <span className="font-medium text-gray-700">Última Actualización:</span>
                    <p className="text-gray-900">{formatDate(request.updatedAt)}</p>
                  </div>
                </div>
              </div>

              {/* Información de contacto */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 mb-2">¿Necesitas ayuda inmediata?</h4>
                <div className="text-sm text-red-700">
                  <p>• Línea Nacional: 155</p>
                  <p>• WhatsApp: +57 300 912 3456</p>
                  <p>• Email: emergencia@alianza.org</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={handleClose}
            className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestTracker;