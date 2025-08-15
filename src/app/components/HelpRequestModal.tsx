'use client';

import { useState } from 'react';
import { 
  X,
  Phone,
  Mail,
  MapPin,
  User,
  Calendar,
  AlertTriangle,
  Shield,
  Heart,
  CheckCircle,
  Send
} from 'lucide-react';
import { saveHelpRequest } from '../utils/localStorage';

interface HelpRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpRequestModal = ({ isOpen, onClose }: HelpRequestModalProps) => {
  const [formData, setFormData] = useState({
    // Información personal
    name: '',
    age: '',
    phone: '',
    email: '',
    
    // Ubicación
    municipality: '',
    neighborhood: '',
    address: '',
    
    // Tipo de ayuda
    helpType: '',
    urgencyLevel: '',
    violenceType: '',
    
    // Situación
    description: '',
    isFirstTime: '',
    hasChildren: '',
    needsShelter: '',
    
    // Contacto preferido
    preferredContact: '',
    bestTimeToCall: '',
    safeToCall: ''
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [radicadoNumber, setRadicadoNumber] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error cuando se actualiza el campo
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    
    switch (step) {
      case 1:
        if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
        if (!formData.phone.trim()) newErrors.phone = 'El teléfono es requerido';
        if (!formData.municipality.trim()) newErrors.municipality = 'El municipio es requerido';
        break;
      case 2:
        if (!formData.helpType.trim()) newErrors.helpType = 'Seleccione el tipo de ayuda';
        if (!formData.urgencyLevel.trim()) newErrors.urgencyLevel = 'Seleccione el nivel de urgencia';
        break;
      case 3:
        if (!formData.description.trim()) newErrors.description = 'Describa brevemente su situación';
        if (!formData.preferredContact.trim()) newErrors.preferredContact = 'Seleccione su forma de contacto preferida';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const generateRadicado = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
    return `APS-${year}${month}${day}-${random}`;
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    
    setIsSubmitting(true);
    
    // Simular envío
    setTimeout(() => {
      // Generar número de radicado
      const newRadicado = generateRadicado();
      setRadicadoNumber(newRadicado);
      
      // Guardar en localStorage
      try {
        const savedRequest = saveHelpRequest({
          radicado: newRadicado,
          name: formData.name,
          age: formData.age,
          phone: formData.phone,
          email: formData.email,
          municipality: formData.municipality,
          neighborhood: formData.neighborhood,
          helpType: formData.helpType,
          urgencyLevel: formData.urgencyLevel,
          violenceType: formData.violenceType,
          isFirstTime: formData.isFirstTime,
          hasChildren: formData.hasChildren,
          needsShelter: formData.needsShelter,
          description: formData.description,
          preferredContact: formData.preferredContact,
          bestTimeToCall: formData.bestTimeToCall,
          safeToCall: formData.safeToCall
        });
        
        console.log('Solicitud guardada:', savedRequest);
      } catch (error) {
        console.error('Error al guardar solicitud:', error);
      }
      
      setIsSubmitted(true);
      setIsSubmitting(false);
    }, 2000);
  };

  const handleClose = () => {
    setCurrentStep(1);
    setIsSubmitted(false);
    setFormData({
      name: '', age: '', phone: '', email: '', municipality: '', neighborhood: '',
      address: '', helpType: '', urgencyLevel: '', violenceType: '', description: '',
      isFirstTime: '', hasChildren: '', needsShelter: '', preferredContact: '',
      bestTimeToCall: '', safeToCall: ''
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-600" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Solicitud Enviada</h2>
          <p className="text-gray-600 mb-4">
            Hemos recibido tu solicitud de ayuda. Nuestro equipo se pondrá en contacto contigo 
            en las próximas 2 horas.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-blue-800 mb-2">Número de Radicado</h4>
            <div className="bg-white border border-blue-300 rounded p-3 mb-2">
              <span className="text-lg font-mono font-bold text-blue-900">{radicadoNumber}</span>
            </div>
            <p className="text-sm text-blue-700">
              <strong>¡IMPORTANTE!</strong> Guarda este número de radicado. Te servirá para hacer seguimiento a tu solicitud.
            </p>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2 text-red-700">
              <Phone size={20} />
              <span className="font-semibold">Línea de Emergencia 24/7</span>
            </div>
            <p className="text-red-600 text-lg font-bold mt-1">123-456-7890</p>
            <p className="text-sm text-red-600 mt-1">Si estás en peligro inmediato, llama ahora</p>
          </div>
          
          <button
            onClick={() => {
              navigator.clipboard.writeText(radicadoNumber);
              alert('Número de radicado copiado al portapapeles');
            }}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold mb-3"
          >
            Copiar Número de Radicado
          </button>
          
          <button
            onClick={handleClose}
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors font-semibold shadow-primary"
          >
            Cerrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Solicitar Ayuda</h2>
              <p className="text-gray-600 mt-1">Estamos aquí para apoyarte de manera confidencial y segura</p>
            </div>
            <button 
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  step <= currentStep 
                    ? 'bg-primary border-primary text-white'
                    : 'bg-gray-100 border-gray-300 text-gray-400'
                }`}>
                  {step < currentStep ? <CheckCircle size={20} /> : step}
                </div>
                {step < 3 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    step < currentStep ? 'bg-primary' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className={currentStep >= 1 ? 'text-primary font-medium' : 'text-gray-500'}>Información Personal</span>
            <span className={currentStep >= 2 ? 'text-primary font-medium' : 'text-gray-500'}>Tipo de Ayuda</span>
            <span className={currentStep >= 3 ? 'text-primary font-medium' : 'text-gray-500'}>Detalles y Contacto</span>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6">
          {/* Paso 1: Información Personal */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Información Personal</h3>
                <p className="text-gray-600">Toda la información será tratada de forma confidencial</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre o como prefieres que te llamemos *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-600 font-medium placeholder-gray-400 ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Puedes usar un nombre ficticio"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Edad (opcional)
                  </label>
                  <select
                    value={formData.age}
                    onChange={(e) => updateFormData('age', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-600 font-medium"
                  >
                    <option value="">Seleccionar edad</option>
                    <option value="menor-18">Menor de 18 años</option>
                    <option value="18-25">18-25 años</option>
                    <option value="26-35">26-35 años</option>
                    <option value="36-45">36-45 años</option>
                    <option value="46-60">46-60 años</option>
                    <option value="mayor-60">Mayor de 60 años</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono de contacto *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-600 font-medium placeholder-gray-400 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="+57 300 123 4567"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email (opcional)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-600 font-medium placeholder-gray-400"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Municipio *
                  </label>
                  <select
                    value={formData.municipality}
                    onChange={(e) => updateFormData('municipality', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-600 font-medium ${
                      errors.municipality ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Seleccionar municipio</option>
                    <option value="tumaco">Tumaco, Nariño</option>
                    <option value="buenaventura">Buenaventura, Valle del Cauca</option>
                    <option value="otro">Otro municipio</option>
                  </select>
                  {errors.municipality && <p className="mt-1 text-sm text-red-600">{errors.municipality}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Barrio/Vereda (opcional)
                  </label>
                  <input
                    type="text"
                    value={formData.neighborhood}
                    onChange={(e) => updateFormData('neighborhood', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-600 font-medium placeholder-gray-400"
                    placeholder="Nombre del barrio o vereda"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Paso 2: Tipo de Ayuda */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">¿Qué tipo de situación estás pasando?</h3>
                <p className="text-gray-600">Selecciona la opción que mejor describa tu situación</p>
              </div>
              
              <div>

                <div className="space-y-3">
                  {[
                    { value: 'violencia-fisica', label: 'Violencia física', icon: '🤕' },
                    { value: 'violencia-psicologica', label: 'Violencia psicológica/emocional', icon: '💭' },
                    { value: 'violencia-sexual', label: 'Violencia sexual', icon: '🛡️' },
                    { value: 'violencia-economica', label: 'Violencia económica', icon: '💰' },
                    { value: 'amenazas', label: 'Amenazas o intimidación', icon: '⚠️' },
                    { value: 'asesoria-legal', label: 'Asesoría legal', icon: '⚖️' },
                    { value: 'apoyo-psicologico', label: 'Apoyo psicológico', icon: '💚' },
                    { value: 'refugio-temporal', label: 'Refugio temporal', icon: '🏠' },
                    { value: 'otro', label: 'Otro tipo de ayuda', icon: '📞' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="helpType"
                        value={option.value}
                        checked={formData.helpType === option.value}
                        onChange={(e) => updateFormData('helpType', e.target.value)}
                        className="text-primary focus:ring-primary"
                      />
                      <span className="text-xl">{option.icon}</span>
                      <span className="text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
                {errors.helpType && <p className="mt-1 text-sm text-red-600">{errors.helpType}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Nivel de urgencia *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { value: 'emergencia', label: 'Emergencia', desc: 'Peligro inmediato', color: 'border-red-500 bg-red-50' },
                    { value: 'urgente', label: 'Urgente', desc: 'Necesito ayuda pronto', color: 'border-orange-500 bg-orange-50' },
                    { value: 'normal', label: 'Normal', desc: 'Puedo esperar unos días', color: 'border-green-500 bg-green-50' }
                  ].map((option) => (
                    <label key={option.value} className={`flex flex-col p-4 border-2 rounded-lg cursor-pointer hover:shadow-md transition-shadow ${
                      formData.urgencyLevel === option.value ? option.color : 'border-gray-200'
                    }`}>
                      <input
                        type="radio"
                        name="urgencyLevel"
                        value={option.value}
                        checked={formData.urgencyLevel === option.value}
                        onChange={(e) => updateFormData('urgencyLevel', e.target.value)}
                        className="sr-only"
                      />
                      <span className="font-medium text-gray-900">{option.label}</span>
                      <span className="text-sm text-gray-600">{option.desc}</span>
                    </label>
                  ))}
                </div>
                {errors.urgencyLevel && <p className="mt-1 text-sm text-red-600">{errors.urgencyLevel}</p>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ¿Es la primera vez que buscas ayuda?
                  </label>
                  <select
                    value={formData.isFirstTime}
                    onChange={(e) => updateFormData('isFirstTime', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-600 font-medium"
                  >
                    <option value="">Seleccionar</option>
                    <option value="si">Sí, es la primera vez</option>
                    <option value="no">No, he buscado ayuda antes</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ¿Tienes hijos menores a cargo?
                  </label>
                  <select
                    value={formData.hasChildren}
                    onChange={(e) => updateFormData('hasChildren', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-600 font-medium"
                  >
                    <option value="">Seleccionar</option>
                    <option value="si">Sí</option>
                    <option value="no">No</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ¿Necesitas refugio temporal?
                  </label>
                  <select
                    value={formData.needsShelter}
                    onChange={(e) => updateFormData('needsShelter', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-600 font-medium"
                  >
                    <option value="">Seleccionar</option>
                    <option value="si">Sí, urgente</option>
                    <option value="tal-vez">Tal vez en el futuro</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Paso 3: Detalles y Contacto */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Detalles y Forma de Contacto</h3>
                <p className="text-gray-600">Información adicional para brindarte la mejor ayuda</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Describe brevemente tu situación *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-600 font-medium placeholder-gray-400 ${
                    errors.description ? 'border-accent' : 'border-gray-300'
                  }`}
                  placeholder="Comparte solo lo que te sientas cómoda contando. Esta información nos ayudará a preparar mejor el apoyo que necesitas."
                />
                {errors.description && <p className="mt-1 text-sm text-accent">{errors.description}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  ¿Cómo prefieres que te contactemos? *
                </label>
                <div className="space-y-3">
                  {[
                    { value: 'llamada', label: 'Llamada telefónica', icon: Phone },
                    { value: 'whatsapp', label: 'WhatsApp', icon: Phone },
                    { value: 'email', label: 'Correo electrónico', icon: Mail },
                    { value: 'presencial', label: 'Reunión presencial', icon: MapPin }
                  ].map((option) => {
                    const IconComponent = option.icon;
                    return (
                      <label key={option.value} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name="preferredContact"
                          value={option.value}
                          checked={formData.preferredContact === option.value}
                          onChange={(e) => updateFormData('preferredContact', e.target.value)}
                          className="text-primary focus:ring-primary"
                        />
                        <IconComponent size={20} className="text-gray-600" />
                        <span className="text-gray-700">{option.label}</span>
                      </label>
                    );
                  })}
                </div>
                {errors.preferredContact && <p className="mt-1 text-sm text-accent">{errors.preferredContact}</p>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mejor horario para contactarte
                  </label>
                  <select
                    value={formData.bestTimeToCall}
                    onChange={(e) => updateFormData('bestTimeToCall', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-600 font-medium"
                  >
                    <option value="">Seleccionar horario</option>
                    <option value="manana">Mañana (8:00 AM - 12:00 PM)</option>
                    <option value="tarde">Tarde (12:00 PM - 6:00 PM)</option>
                    <option value="noche">Noche (6:00 PM - 10:00 PM)</option>
                    <option value="cualquier">Cualquier momento</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ¿Es seguro llamarte a este número?
                  </label>
                  <select
                    value={formData.safeToCall}
                    onChange={(e) => updateFormData('safeToCall', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-600 font-medium"
                  >
                    <option value="">Seleccionar</option>
                    <option value="si">Sí, es seguro</option>
                    <option value="solo-ciertos-horarios">Solo en ciertos horarios</option>
                    <option value="no">No, prefiero otro método</option>
                  </select>
                </div>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="text-red-600 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-medium text-red-800">Si estás en peligro inmediato</h4>
                    <p className="text-red-700 text-sm mt-1">
                      No esperes nuestra respuesta. Llama inmediatamente a:
                    </p>
                    <div className="mt-2 space-y-1 text-sm">
                      <p className="text-red-800 font-semibold">• Línea Nacional: 155</p>
                      <p className="text-red-800 font-semibold">• Policía: 123</p>
                      <p className="text-red-800 font-semibold">• Emergencias: 123-456-7890</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between">
            <button
              onClick={currentStep === 1 ? handleClose : handlePrevious}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              {currentStep === 1 ? 'Cancelar' : 'Anterior'}
            </button>
            
            {currentStep < 3 ? (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark shadow-primary"
              >
                Siguiente
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center space-x-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed shadow-primary"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Enviar Solicitud</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpRequestModal;