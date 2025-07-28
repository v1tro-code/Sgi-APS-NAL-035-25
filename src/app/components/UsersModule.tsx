'use client';

import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  UserCheck,
  UserX,
  Shield,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Save,
  X,
  Key,
  Settings
} from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'usuario' | 'lector';
  status: 'Activo' | 'Inactivo' | 'Suspendido';
  location: string;
  lastLogin: string;
  createdAt: string;
  avatar?: string;
}

const UsersModule = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showPermissions, setShowPermissions] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Datos quemados para la demo
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'Ana María Rodríguez',
      email: 'ana.rodriguez@alianza.org',
      phone: '+505 8888-1234',
      role: 'admin',
      status: 'Activo',
      location: 'Managua, Nicaragua',
      lastLogin: '2024-01-15 09:30',
      createdAt: '2023-06-15'
    },
    {
      id: 2,
      name: 'Carlos Mendoza',
      email: 'carlos.mendoza@alianza.org',
      phone: '+505 8888-5678',
      role: 'usuario',
      status: 'Activo',
      location: 'León, Nicaragua',
      lastLogin: '2024-01-14 16:45',
      createdAt: '2023-08-20'
    },
    {
      id: 3,
      name: 'María Elena Vásquez',
      email: 'maria.vasquez@alianza.org',
      phone: '+505 8888-9012',
      role: 'usuario',
      status: 'Activo',
      location: 'Matagalpa, Nicaragua',
      lastLogin: '2024-01-13 14:20',
      createdAt: '2023-09-10'
    },
    {
      id: 4,
      name: 'Roberto Silva',
      email: 'roberto.silva@alianza.org',
      phone: '+505 8888-3456',
      role: 'lector',
      status: 'Inactivo',
      location: 'Estelí, Nicaragua',
      lastLogin: '2024-01-05 11:15',
      createdAt: '2023-11-05'
    },
    {
      id: 5,
      name: 'Lucía Hernández',
      email: 'lucia.hernandez@alianza.org',
      phone: '+505 8888-7890',
      role: 'usuario',
      status: 'Suspendido',
      location: 'Granada, Nicaragua',
      lastLogin: '2024-01-10 08:30',
      createdAt: '2023-07-22'
    }
  ]);

  const roles = [
    { value: 'all', label: 'Todos los roles' },
    { value: 'admin', label: 'Administrador' },
    { value: 'usuario', label: 'Usuario' },
    { value: 'lector', label: 'Lector' }
  ];

  const statuses = [
    { value: 'all', label: 'Todos los estados' },
    { value: 'Activo', label: 'Activo' },
    { value: 'Inactivo', label: 'Inactivo' },
    { value: 'Suspendido', label: 'Suspendido' }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'usuario':
        return 'bg-blue-100 text-blue-800';
      case 'lector':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Activo':
        return 'bg-green-100 text-green-800';
      case 'Inactivo':
        return 'bg-yellow-100 text-yellow-800';
      case 'Suspendido':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'usuario':
        return 'Usuario';
      case 'lector':
        return 'Lector';
      default:
        return role;
    }
  };

  const handleNewUser = () => {
    setEditingUser(null);
    setShowForm(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleSaveUser = (formData: any) => {
    if (editingUser) {
      setUsers(users.map(user => 
        user.id === editingUser.id 
          ? { ...user, ...formData }
          : user
      ));
    } else {
      const newUser: User = {
        id: Math.max(...users.map(u => u.id)) + 1,
        ...formData,
        lastLogin: 'Nunca',
        createdAt: new Date().toISOString().split('T')[0]
      };
      setUsers([newUser, ...users]);
    }
    setShowForm(false);
    setEditingUser(null);
  };

  const handleDeleteUser = (id: number) => {
    if (confirm('¿Está seguro de que desea eliminar este usuario?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const handleToggleStatus = (user: User) => {
    const newStatus = user.status === 'Activo' ? 'Inactivo' : 'Activo';
    setUsers(users.map(u => 
      u.id === user.id 
        ? { ...u, status: newStatus }
        : u
    ));
  };

  const handleShowPermissions = (user: User) => {
    setSelectedUser(user);
    setShowPermissions(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestión de Usuarios</h2>
          <p className="text-gray-600 mt-1">Administración de usuarios, roles y permisos</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={handleNewUser}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Nuevo Usuario</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Usuarios</p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
            <Shield className="text-blue-500" size={32} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Usuarios Activos</p>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.status === 'Activo').length}
              </p>
            </div>
            <UserCheck className="text-green-500" size={32} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Administradores</p>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.role === 'admin').length}
              </p>
            </div>
            <Key className="text-red-500" size={32} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Suspendidos</p>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.status === 'Suspendido').length}
              </p>
            </div>
            <UserX className="text-yellow-500" size={32} />
          </div>
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
                placeholder="Buscar usuarios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="md:w-48">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              {roles.map(role => (
                <option key={role.value} value={role.value}>{role.label}</option>
              ))}
            </select>
          </div>
          <div className="md:w-48">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              {statuses.map(status => (
                <option key={status.value} value={status.value}>{status.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Users List */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Usuarios ({filteredUsers.length})
          </h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredUsers.map((user) => (
            <div key={user.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-semibold text-lg">
                      {user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                      <h4 className="text-lg font-medium text-gray-900">{user.name}</h4>
                      <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${getRoleColor(user.role)}`}>
                        {getRoleLabel(user.role)}
                      </span>
                      <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Mail size={16} />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone size={16} />
                        <span>{user.phone}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin size={16} />
                        <span>{user.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                      <span>Último acceso: {user.lastLogin}</span>
                      <span>Creado: {user.createdAt}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleShowPermissions(user)}
                    className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded"
                    title="Ver permisos"
                  >
                    <Settings size={18} />
                  </button>
                  <button 
                    onClick={() => handleToggleStatus(user)}
                    className={`p-2 rounded ${
                      user.status === 'Activo' 
                        ? 'text-gray-600 hover:text-yellow-600 hover:bg-yellow-50' 
                        : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                    }`}
                    title={user.status === 'Activo' ? 'Desactivar usuario' : 'Activar usuario'}
                  >
                    {user.status === 'Activo' ? <UserX size={18} /> : <UserCheck size={18} />}
                  </button>
                  <button 
                    onClick={() => handleEditUser(user)}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded"
                    title="Editar usuario"
                  >
                    <Edit size={18} />
                  </button>
                  <button 
                    onClick={() => handleDeleteUser(user.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded"
                    title="Eliminar usuario"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}
                </h3>
                <button 
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            <UserForm 
              user={editingUser}
              onSave={handleSaveUser}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      {/* Permissions Modal */}
      {showPermissions && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  Permisos de {selectedUser.name}
                </h3>
                <button 
                  onClick={() => setShowPermissions(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Crear registros</span>
                  <input type="checkbox" defaultChecked={selectedUser.role !== 'lector'} className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Editar registros</span>
                  <input type="checkbox" defaultChecked={selectedUser.role !== 'lector'} className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Eliminar registros</span>
                  <input type="checkbox" defaultChecked={selectedUser.role === 'admin'} className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Ver reportes</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Gestionar usuarios</span>
                  <input type="checkbox" defaultChecked={selectedUser.role === 'admin'} className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Configuración del sistema</span>
                  <input type="checkbox" defaultChecked={selectedUser.role === 'admin'} className="rounded" />
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-6">
                <button
                  onClick={() => setShowPermissions(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => setShowPermissions(false)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Guardar Permisos
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Componente del formulario de usuario
const UserForm = ({ user, onSave, onCancel }: {
  user: User | null;
  onSave: (data: any) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    role: user?.role || 'usuario',
    status: user?.status || 'Activo',
    location: user?.location || '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
            Nombre Completo
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Nombre completo del usuario"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="correo@ejemplo.com"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="+505 8888-1234"
            required
          />
        </div>
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rol
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            required
          >
            <option value="admin">Administrador</option>
            <option value="usuario">Usuario</option>
            <option value="lector">Lector</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estado
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            required
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
            <option value="Suspendido">Suspendido</option>
          </select>
        </div>
      </div>

      {!user && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Contraseña del usuario"
            required={!user}
          />
        </div>
      )}

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
          <span>{user ? 'Actualizar' : 'Crear Usuario'}</span>
        </button>
      </div>
    </form>
  );
};

export default UsersModule;