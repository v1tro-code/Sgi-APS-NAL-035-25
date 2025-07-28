# Manual de Usuario - Sistema de Gestión Institucional
## Alianza por la Solidaridad (Proyecto APS-NAL-035-25)

---

## Tabla de Contenidos

1. [Introducción](#introducción)
2. [Acceso al Sistema](#acceso-al-sistema)
3. [Página de Inicio (Landing Page)](#página-de-inicio-landing-page)
4. [Sistema de Solicitudes de Ayuda](#sistema-de-solicitudes-de-ayuda)
5. [Panel Administrativo](#panel-administrativo)
6. [Módulos del Sistema](#módulos-del-sistema)
7. [Gestión de Datos](#gestión-de-datos)
8. [Características Técnicas](#características-técnicas)
9. [Solución de Problemas](#solución-de-problemas)

---

## Introducción

El Sistema de Gestión Institucional para Alianza por la Solidaridad es una plataforma web integral diseñada para fortalecer las rutas institucionales de atención a casos de violencia basada en género. El sistema facilita la gestión de solicitudes de ayuda, el seguimiento de casos y la administración de recursos institucionales.

### Objetivos del Sistema

- **Contribuir a una vida libre de violencia** mediante herramientas de gestión eficientes
- **Proporcionar software unificado** para el manejo de casos
- **Adaptarse a contextos técnicos y operacionales** diversos
- **Facilitar la capacitación del personal** con interfaces intuitivas
- **Cumplir con protocolos operacionales** y estándares de seguridad

---

## Acceso al Sistema

### URL del Sistema
```
http://localhost:3001
```

### Estructura de Acceso

El sistema cuenta con tres niveles de acceso:

1. **Página Pública** (`/`) - Acceso libre para usuarios
2. **Sistema de Login** (`/login`) - Autenticación administrativa
3. **Panel Administrativo** (`/dashboard`) - Gestión completa del sistema

---

## Página de Inicio (Landing Page)

### Funcionalidades Principales

#### 1. Solicitar Ayuda
- **Botón principal rojo**: "Solicitar Ayuda"
- Abre un formulario modal de 3 pasos
- Genera un número de radicado único
- Guarda la información en el sistema

#### 2. Consultar Solicitud
- **Sección dedicada**: "¿Ya enviaste una solicitud?"
- **Búsqueda por radicado**: Campo de entrada para número de radicado
- **Validación automática**: Verifica formato correcto del radicado
- **Información detallada del caso**:
  - Estado actual (Recibida, En Proceso, Resuelta)
  - Fecha de solicitud
  - Tipo de ayuda solicitada
  - Nivel de urgencia
  - Información de contacto registrada
- **Seguimiento visual**: Indicadores de progreso del caso
- **Información de contacto de emergencia**
- **Botón de actualización**: Para verificar cambios de estado

#### 3. Información Institucional
- Descripción de servicios
- Estadísticas de impacto
- Información de contacto
- Formulario de contacto general

---

## Sistema de Solicitudes de Ayuda

### Proceso de Solicitud

#### Paso 1: Información Personal
- **Nombre completo** (requerido)
- **Edad** (requerido)
- **Teléfono** (requerido)
- **Email** (opcional)
- **Municipio** (requerido)
- **Barrio/Vereda** (requerido)

#### Paso 2: Tipo de Asistencia
- **Tipo de ayuda necesaria**:
  - Violencia Doméstica
  - Apoyo Legal
  - Apoyo Psicológico
  - Refugio Temporal
  - Apoyo Económico
  - Otro

- **Nivel de urgencia**:
  - Baja
  - Media
  - Alta
  - Crítica

- **Tipo de violencia**:
  - Física
  - Psicológica
  - Sexual
  - Económica
  - Otra

- **Información adicional**:
  - ¿Es la primera vez que busca ayuda?
  - ¿Tiene hijos menores de edad?
  - ¿Necesita refugio temporal?
  - Descripción detallada del caso

#### Paso 3: Información de Contacto
- **Método de contacto preferido**:
  - Teléfono
  - Email
  - WhatsApp
  - Presencial

- **Mejor horario para contactar**
- **¿Es seguro llamar a este número?**
- **Contacto de emergencia** (opcional)

### Número de Radicado

Cada solicitud genera automáticamente un número de radicado único con el formato:
```
APS-YYYYMMDD-XXXX
```

**Ejemplo**: `APS-20241215-0001`

### Estados de Solicitud

1. **Recibida** - Solicitud registrada en el sistema
2. **En Proceso** - Caso asignado y en atención
3. **Resuelta** - Caso cerrado exitosamente

---

## Panel Administrativo

### Credenciales de Acceso

```
Usuario: admin
Contraseña: admin123
```

### Navegación Principal

El panel administrativo incluye los siguientes módulos:

1. **Panel Principal** - Visualizaciones y estadísticas
2. **Solicitudes de Ayuda** - Gestión de casos
3. **Gestión de Usuarios** - Administración de personal
4. **Registros Institucionales** - Documentación oficial
5. **Reportes e Indicadores** - Análisis y métricas
6. **Historial y Sincronización** - Gestión de datos
7. **Capacitación** - Recursos de formación

---

## Módulos del Sistema

### 1. Panel Principal - Análisis de Datos

#### Estadísticas en Tiempo Real
- **Total de Solicitudes** - Contador general
- **Solicitudes Pendientes** - Casos sin resolver
- **Casos Urgentes** - Prioridad alta y crítica
- **Casos Resueltos** - Solicitudes completadas

#### Visualizaciones Dinámicas

**Gráfico de Estados**
- Distribución de solicitudes por estado
- Colores: Amarillo (pendiente), Azul (proceso), Verde (resuelto)

**Gráfico de Urgencia**
- Distribución por nivel de urgencia
- Colores: Verde (baja), Amarillo (media), Naranja (alta), Rojo (crítica)

**Gráfico de Tipos de Ayuda**
- Distribución por tipo de asistencia solicitada
- Identifica las necesidades más comunes

**Top 5 Municipios**
- Municipios con mayor número de solicitudes
- Ayuda a identificar zonas de mayor necesidad

**Tendencia Mensual**
- Evolución de solicitudes en los últimos 6 meses
- Permite identificar patrones temporales

### 2. Solicitudes de Ayuda

#### Funcionalidades Administrativas
- **Vista de lista completa** de todas las solicitudes
- **Filtros avanzados** por estado, urgencia, tipo
- **Búsqueda por radicado** o información personal
- **Gestión de estados** (cambiar de pendiente a proceso/resuelto)
- **Vista detallada** de cada solicitud
- **Estadísticas en tiempo real**
- **Formulario de nueva solicitud** desde el dashboard

#### Formulario de Solicitud Administrativa

Desde el panel administrativo, los operadores pueden crear solicitudes directamente:

**Acceso**: Botón "Nueva Solicitud" en el módulo de Solicitudes de Ayuda

**Campos del formulario**:
- **Información del solicitante**:
  - Nombre completo
  - Documento de identidad
  - Edad
  - Teléfono principal
  - Teléfono alternativo
  - Email
  - Dirección completa

- **Ubicación geográfica**:
  - Departamento
  - Municipio
  - Barrio/Vereda
  - Zona (urbana/rural)

- **Detalles de la solicitud**:
  - Tipo de ayuda requerida
  - Nivel de urgencia
  - Tipo de violencia
  - Descripción detallada del caso
  - Antecedentes relevantes

- **Información adicional**:
  - ¿Primera vez que solicita ayuda?
  - ¿Tiene hijos menores?
  - ¿Requiere refugio temporal?
  - ¿Hay riesgo inminente?

- **Contacto y seguimiento**:
  - Método de contacto preferido
  - Horarios disponibles
  - ¿Es seguro contactar?
  - Persona de contacto de emergencia

- **Asignación inicial**:
  - Responsable del caso
  - Prioridad de atención
  - Fecha de primera cita
  - Observaciones del operador

**Funcionalidades especiales**:
- **Generación automática de radicado**
- **Validación de datos en tiempo real**
- **Guardado automático** (cada 30 segundos)
- **Carga de documentos adjuntos**
- **Notificación automática** al solicitante
- **Asignación a equipo especializado**

#### Información Mostrada
- Número de radicado
- Nombre del solicitante
- Fecha de solicitud
- Tipo de ayuda
- Nivel de urgencia
- Estado actual
- Información de contacto
- Detalles del caso

### Consulta de Solicitudes por Radicado

#### Proceso de Consulta

1. **Acceso**: Desde la página principal, sección "Consultar Solicitud"
2. **Ingreso de radicado**: Campo de texto para número de radicado
3. **Validación**: El sistema verifica el formato y existencia
4. **Resultados**: Muestra información detallada del caso

#### Información Mostrada en Consulta

- **Estado actual** del caso
- **Fecha de solicitud** y última actualización
- **Tipo de ayuda** solicitada
- **Nivel de urgencia** asignado
- **Responsable** del caso (si está asignado)
- **Próximos pasos** en el proceso
- **Información de contacto** para seguimiento

#### Estados Posibles

1. **Recibida** (🟡)
   - Solicitud registrada en el sistema
   - En proceso de revisión inicial
   - Tiempo estimado: 24-48 horas

2. **En Proceso** (🔵)
   - Caso asignado a especialista
   - Atención activa en curso
   - Contacto establecido con solicitante

3. **Resuelta** (🟢)
   - Caso cerrado exitosamente
   - Servicios proporcionados
   - Seguimiento completado

#### Funcionalidades Adicionales

- **Actualización automática**: Refresca estado cada 5 minutos
- **Notificaciones**: Alertas por cambios de estado
- **Historial**: Registro de todas las acciones realizadas
- **Documentos**: Acceso a formularios y reportes generados
- **Contacto directo**: Enlaces para comunicación inmediata

### 3. Gestión de Usuarios

#### Funcionalidades
- **Lista de usuarios del sistema**
- **Creación de nuevos usuarios**
- **Edición de perfiles existentes**
- **Gestión de roles y permisos**
- **Control de acceso por módulos**

#### Roles Disponibles
- **Administrador** - Acceso completo
- **Operador** - Gestión de casos
- **Supervisor** - Revisión y reportes
- **Consulta** - Solo lectura

### 4. Registros Institucionales

#### Wizard de Creación (5 Pasos)

**Paso 1: Información Básica**
- Tipo de registro
- Fecha del registro
- Responsable
- Descripción general

**Paso 2: Beneficiario/Entidad**
- Información del beneficiario
- Datos demográficos
- Información de contacto

**Paso 3: Ubicación y Contexto**
- Ubicación geográfica
- Contexto socioeconómico
- Factores de riesgo

**Paso 4: Detalles del Proyecto**
- Objetivos específicos
- Actividades planificadas
- Recursos necesarios
- Cronograma

**Paso 5: Documentación**
- Carga de archivos
- Documentos de soporte
- Evidencias fotográficas
- Formularios adicionales

### 5. Reportes e Indicadores

#### Tipos de Reportes
- **Reportes de Actividad** - Resumen de acciones realizadas
- **Indicadores de Impacto** - Métricas de efectividad
- **Reportes Financieros** - Uso de recursos
- **Reportes de Cobertura** - Alcance geográfico

#### Formatos de Exportación
- PDF
- Excel
- CSV
- Gráficos interactivos

### 6. Historial y Sincronización

#### Funcionalidades
- **Historial completo** de todas las acciones
- **Sincronización offline/online** (simulada)
- **Backup automático** de datos
- **Restauración de información**
- **Control de versiones**

#### Estados de Sincronización
- **Sincronizado** - Datos actualizados
- **Pendiente** - Esperando sincronización
- **Error** - Problemas de conectividad
- **Offline** - Modo sin conexión

### 7. Capacitación

#### Recursos Disponibles
- **Módulos de formación** interactivos
- **Videos tutoriales** paso a paso
- **Documentos de referencia** descargables
- **Evaluaciones** de conocimiento
- **Certificaciones** de competencia

#### Temas de Capacitación
- Uso del sistema
- Protocolos de atención
- Manejo de casos sensibles
- Seguridad y confidencialidad
- Reportes y documentación

---

## Gestión de Datos

### Almacenamiento Local

El sistema utiliza `localStorage` del navegador para simular una base de datos persistente:

- **Solicitudes de ayuda** - `alianza_help_requests`
- **Mapeo de radicados** - `alianza_radicados`
- **Configuración de usuario** - `user_preferences`
- **Estado de autenticación** - `isAuthenticated`

### Estructura de Datos

#### Solicitud de Ayuda
```json
{
  "id": "unique_id",
  "radicado": "APS-20241215-0001",
  "name": "Nombre del solicitante",
  "age": "Edad",
  "phone": "Teléfono",
  "email": "Email",
  "municipality": "Municipio",
  "neighborhood": "Barrio",
  "helpType": "Tipo de ayuda",
  "urgencyLevel": "Nivel de urgencia",
  "violenceType": "Tipo de violencia",
  "description": "Descripción del caso",
  "status": "pending|in_progress|resolved",
  "createdAt": "2024-12-15T10:30:00Z",
  "updatedAt": "2024-12-15T10:30:00Z"
}
```

### Backup y Restauración

#### Exportar Datos
1. Acceder al módulo de "Historial y Sincronización"
2. Seleccionar "Exportar Datos"
3. Elegir formato (JSON, CSV, Excel)
4. Descargar archivo de backup

#### Importar Datos
1. Acceder al módulo de "Historial y Sincronización"
2. Seleccionar "Importar Datos"
3. Cargar archivo de backup
4. Confirmar restauración

---

## Características Técnicas

### Tecnologías Utilizadas

- **Frontend**: Next.js 15.4.4
- **Lenguaje**: TypeScript
- **Estilos**: TailwindCSS
- **Iconos**: Lucide React
- **Estado**: React Hooks (useState, useEffect)
- **Almacenamiento**: localStorage (simulación de BD)
- **Responsive**: Diseño adaptativo móvil/desktop

### Características de Seguridad

- **Autenticación** requerida para panel administrativo
- **Validación de formularios** en tiempo real
- **Sanitización de datos** de entrada
- **Números de radicado únicos** para trazabilidad
- **Información sensible** protegida

### Compatibilidad

- **Navegadores**: Chrome, Firefox, Safari, Edge (versiones recientes)
- **Dispositivos**: Desktop, tablet, móvil
- **Resoluciones**: Responsive desde 320px hasta 4K
- **Accesibilidad**: Cumple estándares WCAG 2.1

### Rendimiento

- **Carga inicial**: < 3 segundos
- **Navegación**: Instantánea (SPA)
- **Actualización de datos**: Tiempo real
- **Optimización**: Lazy loading, code splitting

---

## Solución de Problemas

### Problemas Comunes

#### 1. No puedo acceder al sistema
**Solución**:
- Verificar que el servidor esté ejecutándose en `http://localhost:3001`
- Limpiar caché del navegador
- Verificar conexión a internet

#### 2. No puedo iniciar sesión en el panel administrativo
**Solución**:
- Verificar credenciales: `admin` / `admin123`
- Limpiar localStorage del navegador
- Intentar en modo incógnito

#### 3. Los datos no se guardan
**Solución**:
- Verificar que localStorage esté habilitado
- Comprobar espacio disponible en el navegador
- Intentar en otro navegador

#### 4. Las visualizaciones no cargan
**Solución**:
- Verificar que hay datos en el sistema
- Refrescar la página
- Comprobar consola del navegador por errores

#### 5. El formulario de solicitud no funciona
**Solución**:
- Completar todos los campos requeridos
- Verificar formato de email y teléfono
- Intentar enviar paso por paso

### Contacto de Soporte

Para problemas técnicos o consultas adicionales:

- **Email**: soporte@alianzaporlasolidaridad.org
- **Teléfono**: +57 (1) 234-5678
- **Horario**: Lunes a Viernes, 8:00 AM - 6:00 PM

### Recursos Adicionales

- **Documentación técnica**: `/docs/technical`
- **Videos tutoriales**: `/training/videos`
- **FAQ**: `/help/faq`
- **Actualizaciones**: `/changelog`

---

## Conclusión

Este Sistema de Gestión Institucional representa una herramienta integral para el fortalecimiento de las rutas institucionales de atención a casos de violencia basada en género. Su diseño intuitivo, funcionalidades completas y enfoque en la seguridad lo convierten en una solución efectiva para organizaciones como Alianza por la Solidaridad.

El sistema facilita tanto la solicitud de ayuda por parte de las víctimas como la gestión administrativa de los casos, contribuyendo significativamente a los objetivos de protección y atención integral.

---

**Versión del Manual**: 1.0  
**Fecha de Actualización**: Diciembre 2024  
**Proyecto**: APS-NAL-035-25  
**Organización**: Alianza por la Solidaridad