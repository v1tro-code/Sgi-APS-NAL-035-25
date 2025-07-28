'use client';

import { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Video, 
  FileText, 
  Download, 
  Play, 
  Pause,
  CheckCircle,
  Clock,
  Users,
  Star,
  Award,
  Calendar,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  BarChart3
} from 'lucide-react';

interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  level: 'Básico' | 'Intermedio' | 'Avanzado';
  duration: number; // en horas
  modules: number;
  enrolled: number;
  completed: number;
  rating: number;
  instructor: string;
  thumbnail: string;
  status: 'Activo' | 'Borrador' | 'Archivado';
  createdAt: string;
}

interface Enrollment {
  id: number;
  courseId: number;
  courseName: string;
  userName: string;
  progress: number;
  status: 'En progreso' | 'Completado' | 'Abandonado';
  enrolledAt: string;
  completedAt?: string;
  lastAccess: string;
}

const TrainingModule = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterLevel, setFilterLevel] = useState('all');
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  // Datos quemados para la demo
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      title: 'Fundamentos de Desarrollo Comunitario',
      description: 'Curso introductorio sobre los principios básicos del desarrollo comunitario sostenible.',
      category: 'Desarrollo',
      level: 'Básico',
      duration: 8,
      modules: 6,
      enrolled: 45,
      completed: 32,
      rating: 4.7,
      instructor: 'Dr. Ana María Rodríguez',
      thumbnail: '/course1.jpg',
      status: 'Activo',
      createdAt: '2023-09-15'
    },
    {
      id: 2,
      title: 'Gestión de Proyectos Sociales',
      description: 'Metodologías y herramientas para la gestión efectiva de proyectos de impacto social.',
      category: 'Gestión',
      level: 'Intermedio',
      duration: 12,
      modules: 8,
      enrolled: 38,
      completed: 25,
      rating: 4.5,
      instructor: 'Ing. Carlos Mendoza',
      thumbnail: '/course2.jpg',
      status: 'Activo',
      createdAt: '2023-10-20'
    },
    {
      id: 3,
      title: 'Agricultura Sostenible y Orgánica',
      description: 'Técnicas modernas de agricultura sostenible para pequeños productores.',
      category: 'Agricultura',
      level: 'Intermedio',
      duration: 16,
      modules: 10,
      enrolled: 52,
      completed: 41,
      rating: 4.8,
      instructor: 'Ing. Agr. María Elena Vásquez',
      thumbnail: '/course3.jpg',
      status: 'Activo',
      createdAt: '2023-08-10'
    },
    {
      id: 4,
      title: 'Liderazgo Comunitario',
      description: 'Desarrollo de habilidades de liderazgo para agentes de cambio comunitario.',
      category: 'Liderazgo',
      level: 'Avanzado',
      duration: 20,
      modules: 12,
      enrolled: 28,
      completed: 15,
      rating: 4.6,
      instructor: 'Lic. Roberto Silva',
      thumbnail: '/course4.jpg',
      status: 'Activo',
      createdAt: '2023-11-05'
    },
    {
      id: 5,
      title: 'Microfinanzas y Emprendimiento',
      description: 'Conceptos básicos de microfinanzas y desarrollo de emprendimientos sociales.',
      category: 'Finanzas',
      level: 'Básico',
      duration: 10,
      modules: 7,
      enrolled: 35,
      completed: 28,
      rating: 4.4,
      instructor: 'Econ. Lucía Hernández',
      thumbnail: '/course5.jpg',
      status: 'Borrador',
      createdAt: '2023-12-01'
    }
  ]);

  const [enrollments, setEnrollments] = useState<Enrollment[]>([
    {
      id: 1,
      courseId: 1,
      courseName: 'Fundamentos de Desarrollo Comunitario',
      userName: 'Juan Pérez',
      progress: 85,
      status: 'En progreso',
      enrolledAt: '2024-01-10',
      lastAccess: '2024-01-15 14:30'
    },
    {
      id: 2,
      courseId: 2,
      courseName: 'Gestión de Proyectos Sociales',
      userName: 'María González',
      progress: 100,
      status: 'Completado',
      enrolledAt: '2024-01-05',
      completedAt: '2024-01-14',
      lastAccess: '2024-01-14 16:45'
    },
    {
      id: 3,
      courseId: 3,
      courseName: 'Agricultura Sostenible y Orgánica',
      userName: 'Carlos Ruiz',
      progress: 45,
      status: 'En progreso',
      enrolledAt: '2024-01-08',
      lastAccess: '2024-01-13 10:20'
    },
    {
      id: 4,
      courseId: 1,
      courseName: 'Fundamentos de Desarrollo Comunitario',
      userName: 'Ana Morales',
      progress: 25,
      status: 'Abandonado',
      enrolledAt: '2023-12-20',
      lastAccess: '2024-01-02 09:15'
    }
  ]);

  const categories = [
    { value: 'all', label: 'Todas las categorías' },
    { value: 'Desarrollo', label: 'Desarrollo Comunitario' },
    { value: 'Gestión', label: 'Gestión de Proyectos' },
    { value: 'Agricultura', label: 'Agricultura' },
    { value: 'Liderazgo', label: 'Liderazgo' },
    { value: 'Finanzas', label: 'Finanzas' }
  ];

  const levels = [
    { value: 'all', label: 'Todos los niveles' },
    { value: 'Básico', label: 'Básico' },
    { value: 'Intermedio', label: 'Intermedio' },
    { value: 'Avanzado', label: 'Avanzado' }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || course.category === filterCategory;
    const matchesLevel = filterLevel === 'all' || course.level === filterLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const trainingStats = {
    totalCourses: courses.length,
    activeCourses: courses.filter(c => c.status === 'Activo').length,
    totalEnrollments: enrollments.length,
    completedCourses: enrollments.filter(e => e.status === 'Completado').length,
    averageProgress: Math.round(enrollments.reduce((sum, e) => sum + e.progress, 0) / enrollments.length),
    averageRating: (courses.reduce((sum, c) => sum + c.rating, 0) / courses.length).toFixed(1)
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Básico':
        return 'bg-green-100 text-green-800';
      case 'Intermedio':
        return 'bg-yellow-100 text-yellow-800';
      case 'Avanzado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Activo':
        return 'bg-green-100 text-green-800';
      case 'Borrador':
        return 'bg-yellow-100 text-yellow-800';
      case 'Archivado':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const handleNewCourse = () => {
    setEditingCourse(null);
    setShowCourseForm(true);
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setShowCourseForm(true);
  };

  const handleDeleteCourse = (id: number) => {
    if (confirm('¿Está seguro de que desea eliminar este curso?')) {
      setCourses(courses.filter(course => course.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Capacitación</h2>
          <p className="text-gray-600 mt-1">Gestión de cursos, materiales y seguimiento de progreso</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={handleNewCourse}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Nuevo Curso</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Cursos</p>
              <p className="text-xl font-bold text-gray-900">{trainingStats.totalCourses}</p>
            </div>
            <BookOpen className="text-blue-500" size={24} />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Cursos Activos</p>
              <p className="text-xl font-bold text-gray-900">{trainingStats.activeCourses}</p>
            </div>
            <GraduationCap className="text-green-500" size={24} />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Inscripciones</p>
              <p className="text-xl font-bold text-gray-900">{trainingStats.totalEnrollments}</p>
            </div>
            <Users className="text-purple-500" size={24} />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Completados</p>
              <p className="text-xl font-bold text-gray-900">{trainingStats.completedCourses}</p>
            </div>
            <Award className="text-orange-500" size={24} />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Progreso Prom.</p>
              <p className="text-xl font-bold text-gray-900">{trainingStats.averageProgress}%</p>
            </div>
            <BarChart3 className="text-yellow-500" size={24} />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-pink-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Rating Prom.</p>
              <p className="text-xl font-bold text-gray-900">{trainingStats.averageRating}</p>
            </div>
            <Star className="text-pink-500" size={24} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('courses')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'courses'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Cursos
            </button>
            <button
              onClick={() => setActiveTab('enrollments')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'enrollments'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Inscripciones
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'analytics'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Analíticas
            </button>
          </nav>
        </div>

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div className="p-6">
            {/* Filters */}
            <div className="mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Buscar cursos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="md:w-48">
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>{category.label}</option>
                    ))}
                  </select>
                </div>
                <div className="md:w-48">
                  <select
                    value={filterLevel}
                    onChange={(e) => setFilterLevel(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    {levels.map(level => (
                      <option key={level.value} value={level.value}>{level.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div key={course.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
                    <GraduationCap className="text-white" size={64} />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${getLevelColor(course.level)}`}>
                        {course.level}
                      </span>
                      <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${getStatusColor(course.status)}`}>
                        {course.status}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.description}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <Clock size={14} />
                        <span>{course.duration}h</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BookOpen size={14} />
                        <span>{course.modules} módulos</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users size={14} />
                        <span>{course.enrolled}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-1">
                        <Star className="text-yellow-400" size={16} fill="currentColor" />
                        <span className="text-sm font-medium">{course.rating}</span>
                      </div>
                      <span className="text-xs text-gray-500">{course.instructor}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="flex-1 bg-red-600 text-white py-2 px-3 rounded text-sm hover:bg-red-700">
                        Ver Curso
                      </button>
                      <button 
                        onClick={() => handleEditCourse(course)}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteCourse(course.id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Enrollments Tab */}
        {activeTab === 'enrollments' && (
          <div className="p-6">
            <div className="space-y-4">
              {enrollments.map((enrollment) => (
                <div key={enrollment.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{enrollment.courseName}</h4>
                      <p className="text-sm text-gray-600 mb-2">{enrollment.userName}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Inscrito: {enrollment.enrolledAt}</span>
                        <span>Último acceso: {enrollment.lastAccess}</span>
                        {enrollment.completedAt && (
                          <span>Completado: {enrollment.completedAt}</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${getProgressColor(enrollment.progress)}`}
                            style={{ width: `${enrollment.progress}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900 w-12">{enrollment.progress}%</span>
                      </div>
                      <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${
                        enrollment.status === 'Completado' ? 'bg-green-100 text-green-800' :
                        enrollment.status === 'En progreso' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {enrollment.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Cursos más populares</h3>
                <div className="space-y-3">
                  {courses.sort((a, b) => b.enrolled - a.enrolled).slice(0, 5).map((course, index) => (
                    <div key={course.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-500 w-4">#{index + 1}</span>
                        <span className="text-sm font-medium text-gray-900">{course.title}</span>
                      </div>
                      <span className="text-sm text-gray-600">{course.enrolled} inscritos</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Cursos mejor valorados</h3>
                <div className="space-y-3">
                  {courses.sort((a, b) => b.rating - a.rating).slice(0, 5).map((course, index) => (
                    <div key={course.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-500 w-4">#{index + 1}</span>
                        <span className="text-sm font-medium text-gray-900">{course.title}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="text-yellow-400" size={14} fill="currentColor" />
                        <span className="text-sm text-gray-600">{course.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainingModule;