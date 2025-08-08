import React, { useState } from 'react';
import { 
  CheckCircleIcon, 
  XCircleIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

const History = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const historyData = [
    {
      id: 'Q001234',
      query: '46M, knee surgery in Pune, 3-month policy',
      status: 'completed',
      decision: 'approved',
      amount: '₹75,000',
      timestamp: '2024-01-15T14:30:00Z',
      documents_used: ['Policy_Terms_2024.pdf', 'Orthopedic_Coverage.pdf'],
      processing_time: '2.3s'
    },
    {
      id: 'Q001235',
      query: '32F, cardiac procedure, Mumbai, 6-month policy',
      status: 'completed',
      decision: 'approved',
      amount: '₹1,50,000',
      timestamp: '2024-01-15T13:45:00Z',
      documents_used: ['Policy_Terms_2024.pdf', 'Cardiac_Coverage.pdf'],
      processing_time: '1.8s'
    },
    {
      id: 'Q001236',
      query: '28M, cosmetic surgery, Delhi, 1-year policy',
      status: 'completed',
      decision: 'rejected',
      amount: '₹0',
      timestamp: '2024-01-15T12:20:00Z',
      documents_used: ['Policy_Terms_2024.pdf', 'Exclusions.pdf'],
      processing_time: '1.5s'
    },
    {
      id: 'Q001237',
      query: '55F, eye surgery, Bangalore, 2-year policy',
      status: 'completed',
      decision: 'approved',
      amount: '₹45,000',
      timestamp: '2024-01-15T11:10:00Z',
      documents_used: ['Policy_Terms_2024.pdf', 'Eye_Care_Coverage.pdf'],
      processing_time: '2.1s'
    },
    {
      id: 'Q001238',
      query: '40M, dental implant, Chennai, 8-month policy',
      status: 'processing',
      decision: 'pending',
      amount: 'pending',
      timestamp: '2024-01-15T10:55:00Z',
      documents_used: [],
      processing_time: 'ongoing'
    }
  ];

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const downloadJSON = (query) => {
    const result = {
      query_id: query.id,
      query: query.query,
      decision: query.decision,
      amount: query.amount,
      timestamp: query.timestamp,
      documents_used: query.documents_used,
      processing_time: query.processing_time
    };
    
    const dataStr = JSON.stringify(result, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `query-${query.id}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const filteredHistory = historyData.filter(item => {
    const matchesSearch = item.query.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesDate = dateFilter === 'all' || 
                       (dateFilter === 'today' && new Date(item.timestamp).toDateString() === new Date().toDateString());
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const getStatusBadge = (status, decision) => {
    if (status === 'processing') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          🔄 Processing
        </span>
      );
    }
    
    if (decision === 'approved') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          ✅ Approved
        </span>
      );
    }
    
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
        ❌ Rejected
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Query History</h1>
        <p className="text-gray-600">View and manage your past queries and results</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search queries or IDs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <FunnelIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="processing">Processing</option>
            </select>
          </div>

          {/* Date Filter */}
          <div className="relative">
            <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <MagnifyingGlassIcon className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Queries</p>
              <p className="text-2xl font-semibold text-gray-900">{historyData.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircleIcon className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Approved</p>
              <p className="text-2xl font-semibold text-gray-900">
                {historyData.filter(q => q.decision === 'approved').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircleIcon className="h-5 w-5 text-red-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Rejected</p>
              <p className="text-2xl font-semibold text-gray-900">
                {historyData.filter(q => q.decision === 'rejected').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600"></div>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Processing</p>
              <p className="text-2xl font-semibold text-gray-900">
                {historyData.filter(q => q.status === 'processing').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Query History ({filteredHistory.length} results)
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Query
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Decision
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredHistory.map((query) => (
                <tr key={query.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {query.query}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {query.id}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(query.status, query.decision)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {query.decision === 'approved' ? (
                        <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                      ) : query.decision === 'rejected' ? (
                        <XCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                      ) : (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400 mr-2"></div>
                      )}
                      <span className="text-sm text-gray-900 capitalize">
                        {query.decision}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {query.amount}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {formatDate(query.timestamp)}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        className="text-primary hover:text-blue-700 flex items-center space-x-1"
                        title="View Details"
                      >
                        <EyeIcon className="h-4 w-4" />
                        <span>View</span>
                      </button>
                      {query.status === 'completed' && (
                        <button
                          onClick={() => downloadJSON(query)}
                          className="text-gray-600 hover:text-gray-800 flex items-center space-x-1"
                          title="Download JSON"
                        >
                          <ArrowDownTrayIcon className="h-4 w-4" />
                          <span>JSON</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredHistory.length === 0 && (
          <div className="text-center py-12">
            <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No queries found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;