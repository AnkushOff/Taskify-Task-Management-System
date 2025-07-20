import React, { useState, useEffect } from 'react';
import { useAuth } from './App';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { 
  UserIcon, 
  BellIcon, 
  ChartBarIcon, 
  CheckCircleIcon,
  ClockIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement);

// Loading Screen Component
const LoadingScreen = () => (
  <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
      <p className="text-purple-600 font-medium">Loading Taskify...</p>
    </div>
  </div>
);

// Auth Components
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(email, password);
    if (result.success) {
      navigate('/');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to your Taskify account</p>
        </div>
        
        <form className="mt-8 space-y-6 bg-white p-8 rounded-2xl shadow-lg" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 rounded-xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative mt-1">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="appearance-none relative block w-full px-3 py-3 pr-10 border border-gray-300 rounded-xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                'Sign In'
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-purple-600 hover:text-purple-500">
                Sign up here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await register(name, email, password);
    if (result.success) {
      navigate('/');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="mt-2 text-sm text-gray-600">Join Taskify and boost your productivity</p>
        </div>
        
        <form className="mt-8 space-y-6 bg-white p-8 rounded-2xl shadow-lg" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 rounded-xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 rounded-xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative mt-1">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="appearance-none relative block w-full px-3 py-3 pr-10 border border-gray-300 rounded-xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                'Create Account'
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500">
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

// Navigation Component
const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${API}/notifications`);
      setNotifications(response.data.filter(n => !n.read).slice(0, 3));
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Taskify
            </Link>
            
            <div className="hidden md:flex space-x-6">
              <Link to="/" className="nav-item nav-item-inactive hover:nav-item-active">Dashboard</Link>
              <Link to="/tasks" className="nav-item nav-item-inactive hover:nav-item-active">Tasks</Link>
              <Link to="/analytics" className="nav-item nav-item-inactive hover:nav-item-active">Analytics</Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/notifications')}
              className="relative p-2 text-gray-600 hover:text-purple-600 transition-colors"
            >
              <BellIcon className="h-6 w-6" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>
            
            <div className="flex items-center space-x-3">
              <UserIcon className="h-6 w-6 text-purple-600" />
              <span className="text-gray-700 font-medium">{user?.name}</span>
              <button
                onClick={logout}
                className="text-sm text-gray-600 hover:text-purple-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Dashboard Component
const Dashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [recentTasks, setRecentTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [analyticsRes, tasksRes] = await Promise.all([
        axios.get(`${API}/analytics`),
        axios.get(`${API}/tasks`)
      ]);
      
      setAnalytics(analyticsRes.data);
      setRecentTasks(tasksRes.data.slice(0, 5));
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      toast.error('Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your productivity overview.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="stats-card stats-card-total">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">Total Tasks</p>
                <p className="text-3xl font-bold text-white">{analytics?.total_tasks || 0}</p>
              </div>
              <ChartBarIcon className="h-8 w-8 text-white/60" />
            </div>
          </div>
          
          <div className="stats-card stats-card-completed">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">Completed</p>
                <p className="text-3xl font-bold text-white">{analytics?.completed_tasks || 0}</p>
              </div>
              <CheckCircleIcon className="h-8 w-8 text-white/60" />
            </div>
          </div>
          
          <div className="stats-card stats-card-progress">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">In Progress</p>
                <p className="text-3xl font-bold text-white">{analytics?.in_progress_tasks || 0}</p>
              </div>
              <ClockIcon className="h-8 w-8 text-white/60" />
            </div>
          </div>
          
          <div className="stats-card stats-card-productivity">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">Productivity</p>
                <p className="text-3xl font-bold text-white">{analytics?.productivity_score || 0}%</p>
              </div>
              <ChartBarIcon className="h-8 w-8 text-white/60" />
            </div>
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Tasks</h2>
            <Link to="/tasks" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
              View All →
            </Link>
          </div>
          
          <div className="space-y-3">
            {recentTasks.length > 0 ? (
              recentTasks.map((task) => (
                <div key={task.id} className="flex items-center p-3 bg-gray-50 rounded-xl">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    task.status === 'completed' ? 'bg-green-500' :
                    task.status === 'in_progress' ? 'bg-yellow-500' : 'bg-gray-400'
                  }`}></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{task.title}</p>
                    {task.description && (
                      <p className="text-sm text-gray-600">{task.description}</p>
                    )}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    task.priority === 'urgent' ? 'bg-red-100 text-red-700' :
                    task.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                    task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {task.priority}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center py-8 text-gray-500">No tasks yet. Create your first task!</p>
            )}
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="text-center">
          <Link
            to="/tasks"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium rounded-xl hover:from-purple-600 hover:to-indigo-700 transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Create New Task
          </Link>
        </div>
      </div>
    </div>
  );
};

// Task Manager Component
const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState({ status: '', priority: '', category_id: '' });

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category_id: '',
    due_date: ''
  });

  const [newCategory, setNewCategory] = useState({
    name: '',
    color: '#8B5CF6'
  });

  useEffect(() => {
    fetchTasks();
    fetchCategories();
  }, [filter]);

  const fetchTasks = async () => {
    try {
      const params = new URLSearchParams();
      if (filter.status) params.append('status', filter.status);
      if (filter.priority) params.append('priority', filter.priority);
      if (filter.category_id) params.append('category_id', filter.category_id);
      
      const response = await axios.get(`${API}/tasks?${params}`);
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API}/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const taskData = { ...newTask };
      if (taskData.due_date) {
        taskData.due_date = new Date(taskData.due_date).toISOString();
      }
      
      await axios.post(`${API}/tasks`, taskData);
      toast.success('Task created successfully!');
      setShowTaskModal(false);
      setNewTask({ title: '', description: '', priority: 'medium', category_id: '', due_date: '' });
      fetchTasks();
    } catch (error) {
      console.error('Failed to create task:', error);
      toast.error('Failed to create task');
    }
  };

  const handleUpdateTask = async (taskId, updates) => {
    try {
      await axios.put(`${API}/tasks/${taskId}`, updates);
      toast.success('Task updated successfully!');
      fetchTasks();
    } catch (error) {
      console.error('Failed to update task:', error);
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`${API}/tasks/${taskId}`);
        toast.success('Task deleted successfully!');
        fetchTasks();
      } catch (error) {
        console.error('Failed to delete task:', error);
        toast.error('Failed to delete task');
      }
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/categories`, newCategory);
      toast.success('Category created successfully!');
      setShowCategoryModal(false);
      setNewCategory({ name: '', color: '#8B5CF6' });
      fetchCategories();
    } catch (error) {
      console.error('Failed to create category:', error);
      toast.error('Failed to create category');
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in_progress': return 'bg-blue-500';
      case 'todo': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Task Manager</h1>
            <p className="text-gray-600">Organize and track your tasks efficiently</p>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={() => setShowCategoryModal(true)}
              className="btn-secondary"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Category
            </button>
            <button
              onClick={() => setShowTaskModal(true)}
              className="btn-primary"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Task
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={filter.status}
              onChange={(e) => setFilter({ ...filter, status: e.target.value })}
              className="form-input"
            >
              <option value="">All Statuses</option>
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            
            <select
              value={filter.priority}
              onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
              className="form-input"
            >
              <option value="">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
            
            <select
              value={filter.category_id}
              onChange={(e) => setFilter({ ...filter, category_id: e.target.value })}
              className="form-input"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Tasks Grid */}
        <div className="grid gap-6">
          {tasks.length > 0 ? (
            tasks.map(task => (
              <div key={task.id} className="task-card">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`status-indicator ${getStatusColor(task.status)}`}></div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{task.title}</h3>
                      {task.description && (
                        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setEditingTask(task);
                        setNewTask({
                          title: task.title,
                          description: task.description || '',
                          priority: task.priority,
                          category_id: task.category_id || '',
                          due_date: task.due_date ? task.due_date.split('T')[0] : ''
                        });
                        setShowTaskModal(true);
                      }}
                      className="p-1 text-gray-500 hover:text-purple-600"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="p-1 text-gray-500 hover:text-red-600"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className={`badge badge-priority-${task.priority}`}>
                      {task.priority}
                    </span>
                    
                    {task.category_id && (
                      <span className="text-sm text-gray-600">
                        {categories.find(c => c.id === task.category_id)?.name || 'Unknown'}
                      </span>
                    )}
                    
                    {task.due_date && (
                      <span className="text-sm text-gray-600">
                        Due: {formatDate(task.due_date)}
                      </span>
                    )}
                  </div>
                  
                  <select
                    value={task.status}
                    onChange={(e) => handleUpdateTask(task.id, { status: e.target.value })}
                    className="text-sm border border-gray-200 rounded-lg px-2 py-1"
                  >
                    <option value="todo">To Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">No tasks found</p>
              <button
                onClick={() => setShowTaskModal(true)}
                className="btn-primary"
              >
                Create Your First Task
              </button>
            </div>
          )}
        </div>

        {/* Task Modal */}
        {showTaskModal && (
          <div className="modal-overlay" onClick={() => setShowTaskModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {editingTask ? 'Edit Task' : 'Create New Task'}
              </h2>
              
              <form onSubmit={editingTask ? 
                (e) => { e.preventDefault(); handleUpdateTask(editingTask.id, newTask); setShowTaskModal(false); setEditingTask(null); } :
                handleCreateTask
              }>
                <div className="form-group">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-input h-24 resize-none"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Priority</label>
                    <select
                      className="form-input"
                      value={newTask.priority}
                      onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select
                      className="form-input"
                      value={newTask.category_id}
                      onChange={(e) => setNewTask({ ...newTask, category_id: e.target.value })}
                    >
                      <option value="">No Category</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Due Date</label>
                  <input
                    type="date"
                    className="form-input"
                    value={newTask.due_date}
                    onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
                  />
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowTaskModal(false);
                      setEditingTask(null);
                      setNewTask({ title: '', description: '', priority: 'medium', category_id: '', due_date: '' });
                    }}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    {editingTask ? 'Update Task' : 'Create Task'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Category Modal */}
        {showCategoryModal && (
          <div className="modal-overlay" onClick={() => setShowCategoryModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Category</h2>
              
              <form onSubmit={handleCreateCategory}>
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Color</label>
                  <input
                    type="color"
                    className="form-input h-12"
                    value={newCategory.color}
                    onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                  />
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCategoryModal(false);
                      setNewCategory({ name: '', color: '#8B5CF6' });
                    }}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Create Category
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Analytics Component
const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get(`${API}/analytics`);
      setAnalytics(response.data);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      toast.error('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingScreen />;

  const completionTrendData = {
    labels: analytics?.daily_completions.map(d => new Date(d.date).toLocaleDateString()) || [],
    datasets: [
      {
        label: 'Completed Tasks',
        data: analytics?.daily_completions.map(d => d.completed) || [],
        borderColor: '#8B5CF6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const priorityData = {
    labels: ['Low', 'Medium', 'High', 'Urgent'],
    datasets: [
      {
        data: [
          analytics?.priority_distribution.low || 0,
          analytics?.priority_distribution.medium || 0,
          analytics?.priority_distribution.high || 0,
          analytics?.priority_distribution.urgent || 0
        ],
        backgroundColor: [
          '#10B981',
          '#F59E0B', 
          '#EF4444',
          '#DC2626'
        ]
      }
    ]
  };

  const categoryData = {
    labels: analytics?.category_stats.map(c => c.name) || [],
    datasets: [
      {
        label: 'Total Tasks',
        data: analytics?.category_stats.map(c => c.total) || [],
        backgroundColor: '#8B5CF6'
      },
      {
        label: 'Completed',
        data: analytics?.category_stats.map(c => c.completed) || [],
        backgroundColor: '#10B981'
      }
    ]
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
          <p className="text-gray-600">Track your productivity and progress</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="stats-card stats-card-total">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">Completion Rate</p>
                <p className="text-3xl font-bold text-white">{analytics?.completion_rate.toFixed(1) || 0}%</p>
              </div>
              <ChartBarIcon className="h-8 w-8 text-white/60" />
            </div>
          </div>
          
          <div className="stats-card stats-card-productivity">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">Productivity Score</p>
                <p className="text-3xl font-bold text-white">{analytics?.productivity_score || 0}</p>
              </div>
              <ChartBarIcon className="h-8 w-8 text-white/60" />
            </div>
          </div>
          
          <div className="stats-card stats-card-completed">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">Completed</p>
                <p className="text-3xl font-bold text-white">{analytics?.completed_tasks || 0}</p>
              </div>
              <CheckCircleIcon className="h-8 w-8 text-white/60" />
            </div>
          </div>
          
          <div className="stats-card stats-card-progress">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">In Progress</p>
                <p className="text-3xl font-bold text-white">{analytics?.in_progress_tasks || 0}</p>
              </div>
              <ClockIcon className="h-8 w-8 text-white/60" />
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Completion Trend */}
          <div className="chart-container">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Completion Trend (Last 7 Days)</h3>
            <Line
              data={completionTrendData}
              options={{
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1
                    }
                  }
                }
              }}
            />
          </div>

          {/* Priority Distribution */}
          <div className="chart-container">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Priority Distribution</h3>
            <Doughnut
              data={priorityData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom'
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Category Performance */}
        <div className="chart-container">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Performance</h3>
          <Bar
            data={categoryData}
            options={{
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    stepSize: 1
                  }
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

// Notifications Component
const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${API}/notifications`);
      setNotifications(response.data);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      toast.error('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await axios.put(`${API}/notifications/${notificationId}/read`);
      setNotifications(notifications.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      ));
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      await axios.delete(`${API}/notifications/${notificationId}`);
      setNotifications(notifications.filter(n => n.id !== notificationId));
      toast.success('Notification deleted');
    } catch (error) {
      console.error('Failed to delete notification:', error);
      toast.error('Failed to delete notification');
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'task_completed':
        return <CheckCircleIcon className="h-6 w-6 text-green-500" />;
      case 'due_reminder':
        return <ClockIcon className="h-6 w-6 text-orange-500" />;
      default:
        return <BellIcon className="h-6 w-6 text-purple-500" />;
    }
  };

  const formatNotificationDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
          <p className="text-gray-600">Stay updated with your task progress</p>
        </div>

        <div className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map(notification => (
              <div
                key={notification.id}
                className={`notification-item ${notification.read ? 'notification-read' : 'notification-unread'}`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{notification.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {formatNotificationDate(notification.created_at)}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="text-sm text-purple-600 hover:text-purple-700"
                      >
                        Mark Read
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <BellIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No notifications yet</p>
              <p className="text-gray-400">You'll see task updates and reminders here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Export all components
const Components = {
  LoadingScreen,
  LoginPage,
  RegisterPage,
  Navigation,
  Dashboard,
  TaskManager,
  Analytics,
  Notifications
};

export default Components;