import React, { useState } from 'react';
import { 
  DocumentTextIcon, 
  QuestionMarkCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  ArrowDownTrayIcon,
  ChartBarIcon,
  CpuChipIcon,
  ServerIcon
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');

  const stats = {
    documents_uploaded: 34,
    queries_evaluated: 120,
    embedding_errors: 2,
    avg_response_time: 3.2,
    total_storage: '2.4 GB',
    api_calls_today: 45,
    success_rate: 98.3,
    active_users: 12
  };

  const recentActivity = [
    {
      id: 1,
      type: 'document_upload',
      message: 'Policy_Terms_2024.pdf uploaded successfully',
      timestamp: '2 minutes ago',
      status: 'success'
    },
    {
      id: 2,
      type: 'query_processed',
      message: 'Query Q001240 processed - Approved ₹85,000',
      timestamp: '5 minutes ago',
      status: 'success'
    },
    {
      id: 3,
      type: 'embedding_error',
      message: 'Failed to generate embeddings for corrupted_doc.pdf',
      timestamp: '12 minutes ago',
      status: 'error'
    },
    {
      id: 4,
      type: 'user_signup',
      message: 'New user registered: john.doe@example.com',
      timestamp: '18 minutes ago',
      status: 'info'
    },
    {
      id: 5,
      type: 'query_processed',
      message: 'Query Q001239 processed - Rejected',
      timestamp: '25 minutes ago',
      status: 'warning'
    }
  ];

  const systemHealth = [
    { component: 'API Server', status: 'healthy', uptime: '99.9%', response_time: '120ms' },
    { component: 'Vector Database', status: 'healthy', uptime: '99.8%', response_time: '45ms' },
    { component: 'LLM Service', status: 'healthy', uptime: '99.5%', response_time: '2.1s' },
    { component: 'OCR Service', status: 'degraded', uptime: '97.2%', response_time: '3.8s' },
    { component: 'Storage', status: 'healthy', uptime: '100%', response_time: '25ms' }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'document_upload':
        return <DocumentTextIcon className="h-5 w-5 text-blue-500" />;
      case 'query_processed':
        return <QuestionMarkCircleIcon className="h-5 w-5 text-green-500" />;
      case 'embedding_error':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />;
      case 'user_signup':
        return <ClockIcon className="h-5 w-5 text-purple-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
        return 'text-green-600 bg-green-100';
      case 'degraded':
        return 'text-yellow-600 bg-yellow-100';
      case 'down':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const exportLogs = () => {
    const logs = {
      exported_at: new Date().toISOString(),
      stats: stats,
      recent_activity: recentActivity,
      system_health: systemHealth
    };
    
    const dataStr = JSON.stringify(logs, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `admin-logs-${Date.now()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor system performance and usage</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="1d">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
          </select>
          <button
            onClick={exportLogs}
            className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowDownTrayIcon className="h-4 w-4" />
            <span>Export Logs</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <DocumentTextIcon className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Documents Uploaded</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.documents_uploaded}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <QuestionMarkCircleIcon className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Queries Evaluated</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.queries_evaluated}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Embedding Errors</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.embedding_errors}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <ClockIcon className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Avg Response Time</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.avg_response_time}s</p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Storage</p>
              <p className="text-xl font-semibold text-gray-900">{stats.total_storage}</p>
            </div>
            <ServerIcon className="h-8 w-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">API Calls Today</p>
              <p className="text-xl font-semibold text-gray-900">{stats.api_calls_today}</p>
            </div>
            <CpuChipIcon className="h-8 w-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Success Rate</p>
              <p className="text-xl font-semibold text-gray-900">{stats.success_rate}%</p>
            </div>
            <ChartBarIcon className="h-8 w-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Users</p>
              <p className="text-xl font-semibold text-gray-900">{stats.active_users}</p>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">System Health</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {systemHealth.map((component, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    component.status === 'healthy' ? 'bg-green-500' :
                    component.status === 'degraded' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <span className="font-medium text-gray-900">{component.component}</span>
                </div>
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <span>Uptime: {component.uptime}</span>
                  <span>Response: {component.response_time}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(component.status)}`}>
                    {component.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;