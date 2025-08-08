import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  DocumentTextIcon,
  CurrencyRupeeIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';

const QueryInterface = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [expandedClauses, setExpandedClauses] = useState({});
  const [paymentVerified, setPaymentVerified] = useState(false);

  useEffect(() => {
    // Check if payment was verified
    if (location.state?.paymentVerified) {
      setPaymentVerified(true);
      // Auto-populate query if coming from payment
      if (location.state?.queryData?.query) {
        setQuery(location.state.queryData.query);
        // Auto-submit the query
        setTimeout(() => {
          handleSubmit({ preventDefault: () => {} });
        }, 1000);
      }
    }
  }, [location.state]);

  const sampleQueries = [
    "46M, knee surgery in Pune, 3-month policy",
    "32F, cardiac procedure, Mumbai, 6-month policy",
    "28M, dental treatment, Delhi, 1-year policy",
    "55F, eye surgery, Bangalore, 2-year policy"
  ];

  const mockResults = {
    "46M, knee surgery in Pune, 3-month policy": {
      decision: "approved",
      amount: "₹75,000",
      justification: "Knee surgery is covered under orthopedic procedures after 90 days waiting period. Policy is 3 months old, meeting the requirement.",
      referenced_clauses: [
        {
          clause_number: "4.3",
          clause_text: "Orthopedic surgeries including knee, hip, and joint procedures are covered after 90 days of policy commencement with a maximum limit of ₹1,00,000 per year."
        },
        {
          clause_number: "2.1",
          clause_text: "All surgical procedures are subject to pre-authorization and must be performed at network hospitals."
        }
      ],
      entities: {
        age: "46",
        gender: "Male",
        procedure: "Knee surgery",
        location: "Pune",
        policy_duration: "3 months"
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Check if payment is required and not verified
    if (!paymentVerified) {
      navigate('/payment', { 
        state: { 
          queryData: { 
            query: query,
            amount: 20 
          } 
        } 
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockResult = mockResults[query] || {
        decision: "rejected",
        amount: "₹0",
        justification: "Insufficient information provided or procedure not covered under current policy terms.",
        referenced_clauses: [
          {
            clause_number: "1.2",
            clause_text: "Coverage is subject to policy terms and conditions. Pre-existing conditions are not covered."
          }
        ],
        entities: {
          procedure: "Unknown",
          policy_duration: "Unknown"
        }
      };
      
      setResult(mockResult);
      setIsLoading(false);
    }, 2000);
  };

  const toggleClause = (index) => {
    setExpandedClauses(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const downloadJSON = () => {
    const dataStr = JSON.stringify(result, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `query-result-${Date.now()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleSampleQuery = (sampleQuery) => {
    setQuery(sampleQuery);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Query Interface</h1>
        <p className="text-gray-600">Ask questions about your policy coverage and claims</p>
      </div>

      {/* Query Input */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="query" className="block text-sm font-medium text-gray-700 mb-2">
              Ask your question...
            </label>
            <textarea
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., 46M, knee surgery in Pune, 3-month policy"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              rows="3"
            />
          </div>
          
          <button
            type="submit"
            disabled={!query.trim() || isLoading}
            className="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Evaluating Query...</span>
              </>
            ) : (
              <>
                <MagnifyingGlassIcon className="h-5 w-5" />
                <span>{paymentVerified ? 'Evaluate Query' : 'Pay ₹20 & Evaluate'}</span>
              </>
            )}
          </button>
        </form>

        {/* Sample Queries */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Sample Queries:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {sampleQueries.map((sampleQuery, index) => (
              <button
                key={index}
                onClick={() => handleSampleQuery(sampleQuery)}
                className="text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 transition-colors"
              >
                "{sampleQuery}"
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Result Header */}
          <div className={`p-6 ${result.decision === 'approved' ? 'bg-green-50 border-b border-green-200' : 'bg-red-50 border-b border-red-200'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {result.decision === 'approved' ? (
                  <CheckCircleIcon className="h-8 w-8 text-success" />
                ) : (
                  <XCircleIcon className="h-8 w-8 text-error" />
                )}
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Decision: {result.decision === 'approved' ? '✅ Approved' : '❌ Rejected'}
                  </h3>
                  <div className="flex items-center space-x-4 mt-1">
                    <div className="flex items-center space-x-1">
                      <CurrencyRupeeIcon className="h-5 w-5 text-gray-600" />
                      <span className="text-lg font-semibold text-gray-900">
                        Amount: {result.amount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <button
                onClick={downloadJSON}
                className="flex items-center space-x-2 bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <ArrowDownTrayIcon className="h-4 w-4" />
                <span>Download JSON</span>
              </button>
            </div>
          </div>

          {/* Justification */}
          <div className="p-6 border-b border-gray-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Justification</h4>
            <p className="text-gray-700 leading-relaxed">{result.justification}</p>
          </div>

          {/* Referenced Clauses */}
          <div className="p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <DocumentTextIcon className="h-5 w-5" />
              <span>Referenced Clauses</span>
            </h4>
            
            <div className="space-y-3">
              {result.referenced_clauses.map((clause, index) => (
                <div key={index} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleClause(index)}
                    className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <span className="font-medium text-gray-900">
                        Clause {clause.clause_number}
                      </span>
                      <p className="text-sm text-gray-600 mt-1">
                        {expandedClauses[index] ? 
                          clause.clause_text : 
                          clause.clause_text.substring(0, 100) + '...'
                        }
                      </p>
                    </div>
                    {expandedClauses[index] ? (
                      <ChevronUpIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                  
                  {expandedClauses[index] && (
                    <div className="px-4 pb-4">
                      <div className="bg-gray-50 p-3 rounded text-sm text-gray-700">
                        {clause.clause_text}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Payment Status */}
      {!paymentVerified && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <CurrencyRupeeIcon className="h-5 w-5 text-yellow-400 mt-0.5" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Payment Required
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>Pay ₹20 to unlock query results and download JSON responses.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QueryInterface;