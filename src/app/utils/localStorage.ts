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

// Obtener todas las solicitudes
export const getHelpRequests = (): HelpRequest[] => {
  try {
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