import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  DocumentArrowUpIcon, 
  MagnifyingGlassIcon, 
  ClockIcon, 
  ChartBarIcon,
  CogIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline';

// Import pages
import DocumentUpload from './pages/DocumentUpload';
import QueryInterface from './pages/QueryInterface';
import ClauseTraceability from './pages/ClauseTraceability';
import History from './pages/History';
import AdminDashboard from './pages/AdminDashboard';
import PaymentGateway from './pages/PaymentGateway';

function Navigation() {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: DocumentArrowUpIcon, label: 'Upload Documents' },
    { path: '/query', icon: MagnifyingGlassIcon, label: 'Query Interface' },
    { path: '/traceability', icon: ChartBarIcon, label: 'Traceability' },
    { path: '/history', icon: ClockIcon, label: 'History' },
    { path: '/admin', icon: CogIcon, label: 'Admin' },
  ];

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="bg-primary text-white p-2 rounded-lg">
              <DocumentArrowUpIcon className="h-6 w-6" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">LLM Doc Processor</h1>
          </div>
          
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden md:block">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-7xl mx-auto py-6 px-4">
          <Routes>
            <Route path="/" element={<DocumentUpload />} />
            <Route path="/query" element={<QueryInterface />} />
            <Route path="/payment" element={<PaymentGateway />} />
            <Route path="/traceability" element={<ClauseTraceability />} />
            <Route path="/history" element={<History />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;