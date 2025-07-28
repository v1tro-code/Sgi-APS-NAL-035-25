'use client';

import { useState } from 'react';
import { 
  ChevronLeft,
  ChevronRight,
  Check,
  User,
  MapPin,
  FileText,
  Calendar,
  Phone,
  Mail,
  DollarSign,
  Target,
  Users,
  Save,
  X,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface WizardStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}

interface FormData {
  // Paso 1: Información básica
  type: string;
  title: string;
  description: string;
  priority: string;
  
  // Paso 2: Beneficiario/Entidad
  beneficiaryType: string;
  beneficiaryName: string;
  beneficiaryId: string;
  contactPerson: string;
  phone: string;
  email: string;
  
  // Paso 3: Ubicación y contexto
  country: string;
  region: string;
  municipality: string;
  community: string;
  coordinates: string;
  populationSize: string;
  
  // Paso 4: Detalles del proyecto/actividad
  startDate: string;
  endDate: string;
  budget: string;
  fundingSource: string;
  objectives: string;
  expectedResults: string;
  
  // Paso 5: Documentación
  attachments: File[];
  notes: string;
  responsiblePerson: string;
  approvalRequired: boolean;
}

const RecordWizard = ({ onClose, onSave }: {
  onClose: () => void;
  onSave: (data: FormData) => void;
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    type: 'Beneficiario',
    title: '',
    description: '',
    priority: 'Media',
    beneficiaryType: 'Individual',
    beneficiaryName: '',
    beneficiaryId: '',
    contactPerson: '',
    phone: '',
    email: '',
    country: 'Nicaragua',
    region: '',
    municipality: '',
    community: '',
    coordinates: '',
    populationSize: '',
    startDate: '',
    endDate: '',
    budget: '',
    fundingSource: '',
    objectives: '',
    expectedResults: '',
    attachments: [],
    notes: '',
    responsiblePerson: '',
    approvalRequired: false
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps: WizardStep[] = [
    {
      id: 'basic',
      title: 'Información Básica',
      description: 'Tipo y descripción general del registro',
      icon: FileText
    },
    {
      id: 'beneficiary',
      title: 'Beneficiario/Entidad',
      description: 'Información del beneficiario o entidad',
      icon: User
    },
    {
      id: 'location',
      title: 'Ubicación y Contexto',
      description: 'Datos geográficos y demográficos',
      icon: MapPin
    },
    {
      id: 'details',
      title: 'Detalles del Proyecto',
      description: 'Cronograma, presupuesto y objetivos',
      icon: Target
    },
    {
      id: 'documentation',
      title: 'Documentación',
      description: 'Archivos adjuntos y notas adicionales',
      icon: FileText
    }
  ];

  const validateStep = (stepIndex: number): boolean => {
    const newErrors: Record<string, string> = {};
    
    switch (stepIndex) {
      case 0: // Información básica
        if (!formData.title.trim()) newErrors.title = 'El título es requerido';
        if (!formData.description.trim()) newErrors.description = 'La descripción es requerida';
        break;
        
      case 1: // Beneficiario
        if (!formData.beneficiaryName.trim()) newErrors.beneficiaryName = 'El nombre del beneficiario es requerido';
        if (!formData.contactPerson.trim()) newErrors.contactPerson = 'La persona de contacto es requerida';
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Email inválido';
        }
        break;
        
      case 2: // Ubicación
        if (!formData.region.trim()) newErrors.region = 'La región es requerida';
        if (!formData.municipality.trim()) newErrors.municipality = 'El municipio es requerido';
        break;
        
      case 3: // Detalles
        if (!formData.startDate) newErrors.startDate = 'La fecha de inicio es requerida';
        if (formData.endDate && formData.startDate && new Date(formData.endDate) < new Date(formData.startDate)) {
          newErrors.endDate = 'La fecha de fin debe ser posterior a la fecha de inicio';
        }
        if (!formData.objectives.trim()) newErrors.objectives = 'Los objetivos son requeridos';
        break;
        
      case 4: // Documentación
        if (!formData.responsiblePerson.trim()) newErrors.responsiblePerson = 'La persona responsable es requerida';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    
    setIsSubmitting(true);
    
    // Simular envío
    setTimeout(() => {
      onSave(formData);
      setIsSubmitting(false);
    }, 2000);
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error del campo cuando se actualiza
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getStepStatus = (stepIndex: number) => {
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'current';
    return 'pending';
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => {
        const status = getStepStatus(index);
        const IconComponent = step.icon;
        
        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                status === 'completed' 
                  ? 'bg-green-500 border-green-500 text-white'
                  : status === 'current'
                  ? 'bg-red-500 border-red-500 text-white'
                  : 'bg-gray-100 border-gray-300 text-gray-400'
              }`}>
                {status === 'completed' ? (
                  <Check size={20} />
                ) : (
                  <IconComponent size={20} />
                )}
              </div>
              <div className="mt-2 text-center">
                <p className={`text-sm font-medium ${
                  status === 'current' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {step.title}
                </p>
                <p className="text-xs text-gray-500 max-w-24">{step.description}</p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-4 ${
                index < currentStep ? 'bg-green-500' : 'bg-gray-300'
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 0: // Información básica
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Registro *
              </label>
              <select
                value={formData.type}
                onChange={(e) => updateFormData('type', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="Beneficiario">Beneficiario</option>
                <option value="Proyecto">Proyecto</option>
                <option value="Capacitación">Capacitación</option>
                <option value="Informe">Informe</option>
                <option value="Evaluación">Evaluación</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título del Registro *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => updateFormData('title', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ingrese un título descriptivo"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle size={16} className="mr-1" />
                  {errors.title}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => updateFormData('description', e.target.value)}
                rows={4}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Describa el propósito y contexto del registro"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle size={16} className="mr-1" />
                  {errors.description}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prioridad
              </label>
              <select
                value={formData.priority}
                onChange={(e) => updateFormData('priority', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="Baja">Baja</option>
                <option value="Media">Media</option>
                <option value="Alta">Alta</option>
                <option value="Crítica">Crítica</option>
              </select>
            </div>
          </div>
        );
        
      case 1: // Beneficiario
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Beneficiario
              </label>
              <select
                value={formData.beneficiaryType}
                onChange={(e) => updateFormData('beneficiaryType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="Individual">Individual</option>
                <option value="Familia">Familia</option>
                <option value="Comunidad">Comunidad</option>
                <option value="Organización">Organización</option>
                <option value="Cooperativa">Cooperativa</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre del Beneficiario *
                </label>
                <input
                  type="text"
                  value={formData.beneficiaryName}
                  onChange={(e) => updateFormData('beneficiaryName', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                    errors.beneficiaryName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Nombre completo o razón social"
                />
                {errors.beneficiaryName && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle size={16} className="mr-1" />
                    {errors.beneficiaryName}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de Identificación
                </label>
                <input
                  type="text"
                  value={formData.beneficiaryId}
                  onChange={(e) => updateFormData('beneficiaryId', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Cédula, RUC, etc."
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Persona de Contacto *
              </label>
              <input
                type="text"
                value={formData.contactPerson}
                onChange={(e) => updateFormData('contactPerson', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  errors.contactPerson ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Nombre de la persona de contacto"
              />
              {errors.contactPerson && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle size={16} className="mr-1" />
                  {errors.contactPerson}
                </p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="+505 8888-1234"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="correo@ejemplo.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle size={16} className="mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
        
      case 2: // Ubicación
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  País
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => updateFormData('country', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="Nicaragua">Nicaragua</option>
                  <option value="Honduras">Honduras</option>
                  <option value="El Salvador">El Salvador</option>
                  <option value="Guatemala">Guatemala</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Región/Departamento *
                </label>
                <input
                  type="text"
                  value={formData.region}
                  onChange={(e) => updateFormData('region', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                    errors.region ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ej: Managua, León, Matagalpa"
                />
                {errors.region && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle size={16} className="mr-1" />
                    {errors.region}
                  </p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Municipio *
                </label>
                <input
                  type="text"
                  value={formData.municipality}
                  onChange={(e) => updateFormData('municipality', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                    errors.municipality ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Nombre del municipio"
                />
                {errors.municipality && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle size={16} className="mr-1" />
                    {errors.municipality}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comunidad/Barrio
                </label>
                <input
                  type="text"
                  value={formData.community}
                  onChange={(e) => updateFormData('community', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Nombre de la comunidad o barrio"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Coordenadas GPS
                </label>
                <input
                  type="text"
                  value={formData.coordinates}
                  onChange={(e) => updateFormData('coordinates', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Lat, Lng (ej: 12.1364, -86.2514)"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tamaño de Población
                </label>
                <input
                  type="text"
                  value={formData.populationSize}
                  onChange={(e) => updateFormData('populationSize', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Número aproximado de habitantes"
                />
              </div>
            </div>
          </div>
        );
        
      case 3: // Detalles del proyecto
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de Inicio *
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => updateFormData('startDate', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                    errors.startDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.startDate && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle size={16} className="mr-1" />
                    {errors.startDate}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de Finalización
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => updateFormData('endDate', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                    errors.endDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.endDate && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle size={16} className="mr-1" />
                    {errors.endDate}
                  </p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Presupuesto (USD)
                </label>
                <input
                  type="number"
                  value={formData.budget}
                  onChange={(e) => updateFormData('budget', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fuente de Financiamiento
                </label>
                <input
                  type="text"
                  value={formData.fundingSource}
                  onChange={(e) => updateFormData('fundingSource', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Ej: Donante, Gobierno, Recursos propios"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Objetivos *
              </label>
              <textarea
                value={formData.objectives}
                onChange={(e) => updateFormData('objectives', e.target.value)}
                rows={3}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  errors.objectives ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Describa los objetivos principales del proyecto o actividad"
              />
              {errors.objectives && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle size={16} className="mr-1" />
                  {errors.objectives}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resultados Esperados
              </label>
              <textarea
                value={formData.expectedResults}
                onChange={(e) => updateFormData('expectedResults', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Describa los resultados e impactos esperados"
              />
            </div>
          </div>
        );
        
      case 4: // Documentación
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Archivos Adjuntos
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">Arrastra archivos aquí o haz clic para seleccionar</p>
                <p className="text-sm text-gray-500">PDF, DOC, XLS, IMG (máx. 10MB cada uno)</p>
                <input
                  type="file"
                  multiple
                  className="hidden"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    if (e.target.files) {
                      updateFormData('attachments', Array.from(e.target.files));
                    }
                  }}
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="mt-2 inline-block bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 cursor-pointer"
                >
                  Seleccionar Archivos
                </label>
              </div>
              {formData.attachments.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Archivos seleccionados:</p>
                  <ul className="space-y-1">
                    {formData.attachments.map((file, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center">
                        <CheckCircle size={16} className="text-green-500 mr-2" />
                        {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notas Adicionales
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => updateFormData('notes', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Información adicional, observaciones o comentarios especiales"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Persona Responsable *
              </label>
              <input
                type="text"
                value={formData.responsiblePerson}
                onChange={(e) => updateFormData('responsiblePerson', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  errors.responsiblePerson ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Nombre del responsable del registro"
              />
              {errors.responsiblePerson && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle size={16} className="mr-1" />
                  {errors.responsiblePerson}
                </p>
              )}
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="approval-required"
                checked={formData.approvalRequired}
                onChange={(e) => updateFormData('approvalRequired', e.target.checked)}
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <label htmlFor="approval-required" className="ml-2 block text-sm text-gray-700">
                Este registro requiere aprobación supervisora
              </label>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Crear Nuevo Registro</h2>
              <p className="text-gray-600 mt-1">Complete la información paso a paso</p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="p-6 border-b border-gray-200">
          {renderStepIndicator()}
        </div>

        {/* Form Content */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {steps[currentStep].title}
            </h3>
            <p className="text-gray-600">{steps[currentStep].description}</p>
          </div>
          
          {renderStep()}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
              <span>Anterior</span>
            </button>
            
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancelar
              </button>
              
              {currentStep < steps.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <span>Siguiente</span>
                  <ChevronRight size={20} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Guardando...</span>
                    </>
                  ) : (
                    <>
                      <Save size={20} />
                      <span>Crear Registro</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordWizard;