import React, { useState } from 'react';
import { 
  CheckCircleIcon, 
  ArrowRightIcon,
  DocumentTextIcon,
  UserIcon,
  MapPinIcon,
  CalendarIcon,
  CurrencyRupeeIcon
} from '@heroicons/react/24/outline';

const ClauseTraceability = () => {
  const [selectedQuery, setSelectedQuery] = useState('knee-surgery');

  const traceabilityData = {
    'knee-surgery': {
      query: "46M, knee surgery in Pune, 3-month policy",
      decision: "approved",
      amount: "₹75,000",
      steps: [
        {
          step: 1,
          title: "Entity Extraction",
          description: "Detected key information from query",
          status: "completed",
          details: {
            age: "46 years",
            gender: "Male",
            procedure: "Knee surgery",
            location: "Pune",
            policy_duration: "3 months"
          },
          icon: UserIcon,
          color: "blue"
        },
        {
          step: 2,
          title: "Semantic Search",
          description: "Found matching clauses in policy documents",
          status: "completed",
          details: {
            search_query: "orthopedic knee surgery coverage waiting period",
            matches_found: 3,
            top_similarity: "0.94",
            documents_searched: 5
          },
          icon: DocumentTextIcon,
          color: "purple"
        },
        {
          step: 3,
          title: "Clause Evaluation",
          description: "Analyzed relevant policy clauses",
          status: "completed",
          details: {
            primary_clause: "4.3 - Orthopedic Surgery Coverage",
            waiting_period: "90 days",
            coverage_limit: "₹1,00,000 per year",
            network_requirement: "Yes"
          },
          icon: CheckCircleIcon,
          color: "green"
        },
        {
          step: 4,
          title: "Condition Verification",
          description: "Checked policy conditions and eligibility",
          status: "completed",
          details: {
            waiting_period_met: "✅ Yes (90 days < 3 months)",
            procedure_covered: "✅ Yes (Orthopedic category)",
            location_covered: "✅ Yes (Network hospitals available)",
            amount_within_limit: "✅ Yes (₹75,000 < ₹1,00,000)"
          },
          icon: CheckCircleIcon,
          color: "green"
        },
        {
          step: 5,
          title: "Final Decision",
          description: "Generated approval with amount calculation",
          status: "completed",
          details: {
            decision: "APPROVED",
            approved_amount: "₹75,000",
            reasoning: "All conditions met for orthopedic surgery coverage",
            confidence_score: "96%"
          },
          icon: CurrencyRupeeIcon,
          color: "green"
        }
      ]
    }
  };

  const currentTrace = traceabilityData[selectedQuery];

  const getStepIcon = (step) => {
    const Icon = step.icon;
    return <Icon className="h-6 w-6" />;
  };

  const getStepColor = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600 border-blue-200',
      purple: 'bg-purple-100 text-purple-600 border-purple-200',
      green: 'bg-green-100 text-green-600 border-green-200',
      yellow: 'bg-yellow-100 text-yellow-600 border-yellow-200'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Clause Traceability</h1>
        <p className="text-gray-600">Understand how the system reached its decision</p>
      </div>

      {/* Query Selection */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Query to Trace</h3>
        <div className="space-y-2">
          <button
            onClick={() => setSelectedQuery('knee-surgery')}
            className={`w-full text-left p-4 rounded-lg border transition-colors ${
              selectedQuery === 'knee-surgery' 
                ? 'border-primary bg-blue-50 text-primary' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">46M, knee surgery in Pune, 3-month policy</p>
                <p className="text-sm text-gray-500 mt-1">Decision: Approved • Amount: ₹75,000</p>
              </div>
              <CheckCircleIcon className="h-5 w-5 text-green-500" />
            </div>
          </button>
        </div>
      </div>

      {/* Traceability Timeline */}
      {currentTrace && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">Decision Timeline</h3>
            <p className="text-gray-600 mt-1">Query: "{currentTrace.query}"</p>
          </div>

          <div className="p-6">
            <div className="space-y-8">
              {currentTrace.steps.map((step, index) => (
                <div key={step.step} className="relative">
                  {/* Timeline Line */}
                  {index < currentTrace.steps.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
                  )}

                  <div className="flex items-start space-x-4">
                    {/* Step Icon */}
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center ${getStepColor(step.color)}`}>
                      {getStepIcon(step)}
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">
                          Step {step.step}: {step.title}
                        </h4>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          ✅ {step.status}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{step.description}</p>

                      {/* Step Details */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {Object.entries(step.details).map(([key, value]) => (
                            <div key={key} className="flex justify-between items-center">
                              <span className="text-sm font-medium text-gray-700 capitalize">
                                {key.replace(/_/g, ' ')}:
                              </span>
                              <span className="text-sm text-gray-900 font-mono">
                                {value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Final Summary */}
          <div className="bg-green-50 border-t border-green-200 p-6">
            <div className="flex items-center space-x-3">
              <CheckCircleIcon className="h-8 w-8 text-green-600" />
              <div>
                <h4 className="text-lg font-semibold text-green-900">
                  Final Decision: {currentTrace.decision.toUpperCase()}
                </h4>
                <p className="text-green-700">
                  Amount: {currentTrace.amount} • All conditions satisfied
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Explanation Panel */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">How It Works</h3>
        <div className="space-y-3 text-blue-800">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold">1</div>
            <p className="text-sm">
              <strong>Entity Extraction:</strong> The LLM identifies key information like age, procedure, location, and policy duration from your natural language query.
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold">2</div>
            <p className="text-sm">
              <strong>Semantic Search:</strong> Your query is converted to embeddings and matched against policy document chunks using vector similarity.
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold">3</div>
            <p className="text-sm">
              <strong>Clause Analysis:</strong> Relevant clauses are analyzed for coverage conditions, waiting periods, and limits.
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold">4</div>
            <p className="text-sm">
              <strong>Decision Logic:</strong> The system verifies all conditions and generates a final decision with justification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClauseTraceability;