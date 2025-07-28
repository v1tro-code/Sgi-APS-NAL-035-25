'use client';

import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Download,
  Upload,
  Calendar,
  User,
  MapPin,
  Phone,
  Mail,
  Save,
  X,
  CheckCircle
} from 'lucide-react';
import RecordWizard from './RecordWizard';

interface Record {
  id: number;
  type: string;
  title: string;
  beneficiary: string;
  location: string;
  date: string;
  status: 'Sincronizado' | 'Pendiente' | 'Error';
  lastModified: string;
}

const RecordsModule = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [editingRecord, setEditingRecord] = useState<Record | null>(null);
  const [showWizard, setShowWizard] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Datos quemados para la demo
  const [records, setRecords] = useState<Record[]>([
    {
      id: 1,
      type: 'Beneficiario',
      title: 'Registro de Beneficiario - María González',
      beneficiary: 'María González Pérez',
      location: 'Managua, Nicaragua',
      date: '2024-01-15',
      status: 'Sincronizado',
      lastModified: '2024-01-15 14:30'
    },
    {
      id: 2,
      type: 'Proyecto',
      title: 'Evaluación Proyecto Educativo Rural',
      beneficiary: 'Comunidad El Progreso',
      location: 'Matagalpa, Nicaragua',
      date: '2024-01-14',
      status: 'Pendiente',
      lastModified: '2024-01-14 16:45'
    },
    {
      id: 3,
      type: 'Capacitación',
      title: 'Capacitación en Agricultura Sostenible',
      beneficiary: 'Cooperativa Los Pinos',
      location: 'León, Nicaragua',
      date: '2024-01-13',
      status: 'Sincronizado',
      lastModified: '2024-01-13 10:15'
    },
    {
      id: 4,
      type: 'Informe',
      title: 'Informe Mensual de Actividades',
      beneficiary: 'Oficina Regional Norte',
      location: 'Estelí, Nicaragua',
      date: '2024-01-12',
      status: 'Error',
      lastModified: '2024-01-12 09:20'
    }
  ]);

  const recordTypes = [
    { value: 'all', label: 'Todos los tipos' },
    { value: 'Beneficiario', label: 'Beneficiarios' },
    { value: 'Proyecto', label: 'Proyectos' },
    { value: 'Capacitación', label: 'Capacitaciones' },
    { value: 'Informe', label: 'Informes' }
  ];

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.beneficiary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || record.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Sincronizado':
        return 'bg-green-100 text-green-800';
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleNewRecord = () => {
    setShowWizard(true);
  };

  const handleEditRecord = (record: Record) => {
    setEditingRecord(record);
    setShowForm(true);
  };

  const handleSaveRecord = (formData: any) => {
    if (editingRecord) {
      // Actualizar registro existente
      setRecords(records.map(record => 
        record.id === editingRecord.id 
          ? { ...record, ...formData, lastModified: new Date().toLocaleString() }
          : record
      ));
    } else {
      // Crear nuevo registro
      const newRecord: Record = {
        id: Math.max(...records.map(r => r.id)) + 1,
        ...formData,
        status: 'Pendiente' as const,
        lastModified: new Date().toLocaleString()
      };
      setRecords([newRecord, ...records]);
    }
    setShowForm(false);
    setEditingRecord(null);
  };

  const handleDeleteRecord = (id: number) => {
    if (confirm('¿Está seguro de que desea eliminar este registro?')) {
      setRecords(records.filter(record => record.id !== id));
    }
  };

  const handleSaveNewRecord = (formData: any) => {
    // Crear nuevo registro con los datos del formulario
    const newRecord = {
      id: records.length + 1,
      type: formData.type,
      title: formData.title,
      beneficiary: formData.beneficiaryName,
      location: `${formData.municipality}, ${formData.region}`,
      date: formData.startDate,
      status: formData.approvalRequired ? 'Pendiente' : 'Sincronizado',
      lastModified: new Date().toLocaleString()
    };
    
    // Agregar el nuevo registro a la lista
    setRecords(prev => [newRecord, ...prev]);
    
    // Cerrar el wizard y mostrar mensaje de éxito
    setShowWizard(false);
    setShowSuccessMessage(true);
    
    // Ocultar mensaje de éxito después de 3 segundos
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Registros Institucionales</h2>
          <p className="text-gray-600 mt-1">Gestión de beneficiarios, proyectos y actividades</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={handleNewRecord}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Nuevo Registro</span>
          </button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center space-x-2">
            <Download size={20} />
            <span>Exportar</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar registros..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="md:w-64">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              {recordTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Records List */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Registros ({filteredRecords.length})
          </h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredRecords.map((record) => (
            <div key={record.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {record.type}
                    </span>
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${getStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-1">{record.title}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <User size={16} />
                      <span>{record.beneficiary}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin size={16} />
                      <span>{record.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar size={16} />
                      <span>{record.date}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Última modificación: {record.lastModified}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded">
                    <Eye size={18} />
                  </button>
                  <button 
                    onClick={() => handleEditRecord(record)}
                    className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded"
                  >
                    <Edit size={18} />
                  </button>
                  <button 
                    onClick={() => handleDeleteRecord(record.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingRecord ? 'Editar Registro' : 'Nuevo Registro'}
                </h3>
                <button 
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            <RecordForm 
              record={editingRecord}
              onSave={handleSaveRecord}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
      
      {/* Wizard para nuevo registro */}
      {showWizard && (
        <RecordWizard 
          onClose={() => setShowWizard(false)}
          onSave={handleSaveNewRecord}
        />
      )}
      
      {/* Mensaje de éxito */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2">
          <CheckCircle size={20} />
          <span>¡Registro creado exitosamente!</span>
        </div>
      )}
    </div>
  );
};

// Componente del formulario
const RecordForm = ({ record, onSave, onCancel }: {
  record: Record | null;
  onSave: (data: any) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState({
    type: record?.type || 'Beneficiario',
    title: record?.title || '',
    beneficiary: record?.beneficiary || '',
    location: record?.location || '',
    date: record?.date || new Date().toISOString().split('T')[0],
    description: '',
    contact: '',
    email: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Registro
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            required
          >
            <option value="Beneficiario">Beneficiario</option>
            <option value="Proyecto">Proyecto</option>
            <option value="Capacitación">Capacitación</option>
            <option value="Informe">Informe</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Título del Registro
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          placeholder="Ingrese el título del registro"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Beneficiario/Entidad
        </label>
        <input
          type="text"
          name="beneficiary"
          value={formData.beneficiary}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          placeholder="Nombre del beneficiario o entidad"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ubicación
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Ciudad, País"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono de Contacto
          </label>
          <input
            type="tel"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Número de teléfono"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email de Contacto
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          placeholder="correo@ejemplo.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descripción
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          placeholder="Descripción detallada del registro"
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center space-x-2"
        >
          <Save size={20} />
          <span>{record ? 'Actualizar' : 'Guardar'}</span>
        </button>
      </div>
    </form>
  );
};

export default RecordsModule;