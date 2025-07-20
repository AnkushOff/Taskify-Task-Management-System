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
      <p className="text-purple-600 font-medium">Loading TaskMaster...</p>
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
          <p className="mt-2 text-sm text-gray-600">Sign in to your TaskMaster account</p>
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
          <p className="mt-2 text-sm text-gray-600">Join TaskMaster and boost your productivity</p>
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
              TaskMaster
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

// Export all components
const Components = {
  LoadingScreen,
  LoginPage,
  RegisterPage,
  Navigation,
  Dashboard,
  TaskManager: () => <div>Task Manager Coming Soon...</div>,
  Analytics: () => <div>Analytics Coming Soon...</div>,
  Notifications: () => <div>Notifications Coming Soon...</div>
};

export default Components;