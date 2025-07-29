// Utilidades para manejo de localStorage como simulación de base de datos

export interface HelpRequest {
  id: string;
  radicado: string;
  name: string;
  age: string;
  phone: string;
  email: string;
  municipality: string;
  neighborhood: string;
  helpType: string;
  urgencyLevel: string;
  violenceType: string;
  isFirstTime: string;
  hasChildren: string;
  needsShelter: string;
  description: string;
  preferredContact: string;
  bestTimeToCall: string;
  safeToCall: string;
  status: 'pending' | 'in_progress' | 'resolved';
  createdAt: string;
  updatedAt: string;
}

const HELP_REQUESTS_KEY = 'alianza_help_requests';
const RADICADOS_KEY = 'alianza_radicados';

// Guardar solicitud de ayuda
export const saveHelpRequest = (request: Omit<HelpRequest, 'id' | 'createdAt' | 'updatedAt' | 'status'>): HelpRequest => {
  const requests = getHelpRequests();
  const newRequest: HelpRequest = {
    ...request,
    id: generateId(),
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  requests.push(newRequest);
  localStorage.setItem(HELP_REQUESTS_KEY, JSON.stringify(requests));
  
  // Guardar radicado para búsqueda rápida
  const radicados = getRadicados();
  radicados[request.radicado] = newRequest.id;
  localStorage.setItem(RADICADOS_KEY, JSON.stringify(radicados));
  
  return newRequest;
};

// Datos ficticios por defecto
const getDefaultHelpRequests = (): HelpRequest[] => {
  const baseDate = new Date();
  const defaultRequests: HelpRequest[] = [
    {
      id: 'default-001',
      radicado: 'ALZ-2024-001',
      name: 'María González',
      age: '28',
      phone: '3001234567',
      email: 'maria.gonzalez@email.com',
      municipality: 'Tumaco',
      neighborhood: 'Centro',
      helpType: 'violencia-fisica',
      urgencyLevel: 'high',
      violenceType: 'física',
      isFirstTime: 'no',
      hasChildren: 'yes',
      needsShelter: 'yes',
      description: 'Necesito ayuda urgente por situación de violencia doméstica',
      preferredContact: 'phone',
      bestTimeToCall: 'morning',
      safeToCall: 'yes',
      status: 'pending',
      createdAt: new Date(baseDate.getTime() - 86400000 * 5).toISOString(),
      updatedAt: new Date(baseDate.getTime() - 86400000 * 5).toISOString()
    },
    {
      id: 'default-002',
      radicado: 'ALZ-2024-002',
      name: 'Ana Rodríguez',
      age: '35',
      phone: '3009876543',
      email: 'ana.rodriguez@email.com',
      municipality: 'Buenaventura',
      neighborhood: 'La Playita',
      helpType: 'violencia-psicologica',
      urgencyLevel: 'medium',
      violenceType: 'psicológica',
      isFirstTime: 'yes',
      hasChildren: 'no',
      needsShelter: 'no',
      description: 'Busco apoyo psicológico por violencia emocional',
      preferredContact: 'email',
      bestTimeToCall: 'afternoon',
      safeToCall: 'no',
      status: 'in_progress',
      createdAt: new Date(baseDate.getTime() - 86400000 * 10).toISOString(),
      updatedAt: new Date(baseDate.getTime() - 86400000 * 3).toISOString()
    },
    {
      id: 'default-003',
      radicado: 'ALZ-2024-003',
      name: 'Carmen López',
      age: '42',
      phone: '3005551234',
      email: 'carmen.lopez@email.com',
      municipality: 'Tumaco',
      neighborhood: 'Nuevo Milenio',
      helpType: 'asesoria-legal',
      urgencyLevel: 'low',
      violenceType: 'económica',
      isFirstTime: 'no',
      hasChildren: 'yes',
      needsShelter: 'no',
      description: 'Necesito asesoría legal para proceso de divorcio',
      preferredContact: 'phone',
      bestTimeToCall: 'evening',
      safeToCall: 'yes',
      status: 'resolved',
      createdAt: new Date(baseDate.getTime() - 86400000 * 15).toISOString(),
      updatedAt: new Date(baseDate.getTime() - 86400000 * 1).toISOString()
    },
    {
      id: 'default-004',
      radicado: 'ALZ-2024-004',
      name: 'Lucía Martínez',
      age: '31',
      phone: '3007778888',
      email: 'lucia.martinez@email.com',
      municipality: 'Buenaventura',
      neighborhood: 'San José',
      helpType: 'refugio-temporal',
      urgencyLevel: 'high',
      violenceType: 'física',
      isFirstTime: 'yes',
      hasChildren: 'yes',
      needsShelter: 'yes',
      description: 'Necesito refugio temporal para mí y mis hijos',
      preferredContact: 'phone',
      bestTimeToCall: 'morning',
      safeToCall: 'no',
      status: 'pending',
      createdAt: new Date(baseDate.getTime() - 86400000 * 2).toISOString(),
      updatedAt: new Date(baseDate.getTime() - 86400000 * 2).toISOString()
    },
    {
      id: 'default-005',
      radicado: 'ALZ-2024-005',
      name: 'Patricia Herrera',
      age: '26',
      phone: '3002223333',
      email: 'patricia.herrera@email.com',
      municipality: 'Tumaco',
      neighborhood: 'El Bajito',
      helpType: 'apoyo-psicologico',
      urgencyLevel: 'medium',
      violenceType: 'psicológica',
      isFirstTime: 'no',
      hasChildren: 'no',
      needsShelter: 'no',
      description: 'Solicito apoyo psicológico por trauma emocional',
      preferredContact: 'email',
      bestTimeToCall: 'afternoon',
      safeToCall: 'yes',
      status: 'in_progress',
      createdAt: new Date(baseDate.getTime() - 86400000 * 7).toISOString(),
      updatedAt: new Date(baseDate.getTime() - 86400000 * 4).toISOString()
    },
    {
      id: 'default-006',
      radicado: 'ALZ-2024-006',
      name: 'Rosa Jiménez',
      age: '39',
      phone: '3004445555',
      email: 'rosa.jimenez@email.com',
      municipality: 'Buenaventura',
      neighborhood: 'Bellavista',
      helpType: 'violencia-economica',
      urgencyLevel: 'medium',
      violenceType: 'económica',
      isFirstTime: 'yes',
      hasChildren: 'yes',
      needsShelter: 'no',
      description: 'Mi pareja controla todos mis ingresos y no me permite trabajar',
      preferredContact: 'phone',
      bestTimeToCall: 'morning',
      safeToCall: 'yes',
      status: 'pending',
      createdAt: new Date(baseDate.getTime() - 86400000 * 12).toISOString(),
      updatedAt: new Date(baseDate.getTime() - 86400000 * 12).toISOString()
    },
    {
      id: 'default-007',
      radicado: 'ALZ-2024-007',
      name: 'Elena Vargas',
      age: '33',
      phone: '3006667777',
      email: 'elena.vargas@email.com',
      municipality: 'Tumaco',
      neighborhood: 'Panamá',
      helpType: 'amenazas',
      urgencyLevel: 'high',
      violenceType: 'psicológica',
      isFirstTime: 'no',
      hasChildren: 'no',
      needsShelter: 'yes',
      description: 'Recibo amenazas constantes de mi ex pareja',
      preferredContact: 'phone',
      bestTimeToCall: 'evening',
      safeToCall: 'no',
      status: 'in_progress',
      createdAt: new Date(baseDate.getTime() - 86400000 * 8).toISOString(),
      updatedAt: new Date(baseDate.getTime() - 86400000 * 6).toISOString()
    },
    {
      id: 'default-008',
      radicado: 'ALZ-2024-008',
      name: 'Gloria Morales',
      age: '45',
      phone: '3008889999',
      email: 'gloria.morales@email.com',
      municipality: 'Buenaventura',
      neighborhood: 'Cristo Rey',
      helpType: 'violencia-sexual',
      urgencyLevel: 'high',
      violenceType: 'sexual',
      isFirstTime: 'yes',
      hasChildren: 'yes',
      needsShelter: 'yes',
      description: 'Necesito ayuda urgente por abuso sexual',
      preferredContact: 'phone',
      bestTimeToCall: 'morning',
      safeToCall: 'yes',
      status: 'pending',
      createdAt: new Date(baseDate.getTime() - 86400000 * 1).toISOString(),
      updatedAt: new Date(baseDate.getTime() - 86400000 * 1).toISOString()
    },
    {
      id: 'default-009',
      radicado: 'ALZ-2024-009',
      name: 'Sofía Castro',
      age: '29',
      phone: '3001112222',
      email: 'sofia.castro@email.com',
      municipality: 'Tumaco',
      neighborhood: 'La Ciudadela',
      helpType: 'otro',
      urgencyLevel: 'low',
      violenceType: 'otra',
      isFirstTime: 'no',
      hasChildren: 'no',
      needsShelter: 'no',
      description: 'Necesito información sobre mis derechos como mujer',
      preferredContact: 'email',
      bestTimeToCall: 'afternoon',
      safeToCall: 'yes',
      status: 'resolved',
      createdAt: new Date(baseDate.getTime() - 86400000 * 20).toISOString(),
      updatedAt: new Date(baseDate.getTime() - 86400000 * 18).toISOString()
    },
    {
      id: 'default-010',
      radicado: 'ALZ-2024-010',
      name: 'Beatriz Sánchez',
      age: '37',
      phone: '3003334444',
      email: 'beatriz.sanchez@email.com',
      municipality: 'Buenaventura',
      neighborhood: 'La Inmaculada',
      helpType: 'apoyo-psicologico',
      urgencyLevel: 'medium',
      violenceType: 'psicológica',
      isFirstTime: 'yes',
      hasChildren: 'yes',
      needsShelter: 'no',
      description: 'Busco terapia familiar por situación de violencia',
      preferredContact: 'phone',
      bestTimeToCall: 'morning',
      safeToCall: 'yes',
      status: 'in_progress',
      createdAt: new Date(baseDate.getTime() - 86400000 * 6).toISOString(),
      updatedAt: new Date(baseDate.getTime() - 86400000 * 4).toISOString()
    }
  ];
  
  return defaultRequests;
};

// Inicializar datos por defecto si no existen
const initializeDefaultData = (): void => {
  const existingRequests = localStorage.getItem(HELP_REQUESTS_KEY);
  const existingRadicados = localStorage.getItem(RADICADOS_KEY);
  
  let currentRequests: HelpRequest[] = [];
  let currentRadicados: Record<string, string> = {};
  
  // Cargar datos existentes si los hay
  if (existingRequests) {
    try {
      currentRequests = JSON.parse(existingRequests);
    } catch {
      currentRequests = [];
    }
  }
  
  if (existingRadicados) {
    try {
      currentRadicados = JSON.parse(existingRadicados);
    } catch {
      currentRadicados = {};
    }
  }
  
  // Verificar si ya existen los datos por defecto
  const hasDefaultData = currentRequests.some(req => req.id.startsWith('default-'));
  
  if (!hasDefaultData) {
    const defaultRequests = getDefaultHelpRequests();
    
    // Combinar datos por defecto con datos existentes
    const combinedRequests = [...defaultRequests, ...currentRequests];
    localStorage.setItem(HELP_REQUESTS_KEY, JSON.stringify(combinedRequests));
    
    // Agregar radicados de datos por defecto a los existentes
    defaultRequests.forEach(request => {
      currentRadicados[request.radicado] = request.id;
    });
    localStorage.setItem(RADICADOS_KEY, JSON.stringify(currentRadicados));
  }
};

// Obtener todas las solicitudes
export const getHelpRequests = (): HelpRequest[] => {
  try {
    // Inicializar datos por defecto si es necesario
    initializeDefaultData();
    
    const stored = localStorage.getItem(HELP_REQUESTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Obtener solicitud por radicado
export const getHelpRequestByRadicado = (radicado: string): HelpRequest | null => {
  const radicados = getRadicados();
  const requestId = radicados[radicado];
  
  if (!requestId) return null;
  
  const requests = getHelpRequests();
  return requests.find(req => req.id === requestId) || null;
};

// Obtener mapeo de radicados
const getRadicados = (): Record<string, string> => {
  try {
    const stored = localStorage.getItem(RADICADOS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

// Actualizar estado de solicitud
export const updateHelpRequestStatus = (id: string, status: HelpRequest['status']): boolean => {
  const requests = getHelpRequests();
  const index = requests.findIndex(req => req.id === id);
  
  if (index === -1) return false;
  
  requests[index].status = status;
  requests[index].updatedAt = new Date().toISOString();
  
  localStorage.setItem(HELP_REQUESTS_KEY, JSON.stringify(requests));
  return true;
};

// Generar ID único
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Limpiar datos (para testing)
export const clearAllData = (): void => {
  localStorage.removeItem(HELP_REQUESTS_KEY);
  localStorage.removeItem(RADICADOS_KEY);
};

// Obtener estadísticas
export const getHelpRequestStats = () => {
  const requests = getHelpRequests();
  
  return {
    total: requests.length,
    pending: requests.filter(req => req.status === 'pending').length,
    inProgress: requests.filter(req => req.status === 'in_progress').length,
    resolved: requests.filter(req => req.status === 'resolved').length,
    lastWeek: requests.filter(req => {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return new Date(req.createdAt) > weekAgo;
    }).length
  };
};