import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  CreditCardIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

const PaymentGateway = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentStatus, setPaymentStatus] = useState('pending'); // pending, processing, completed, failed
  const [queryId] = useState(() => 'Q' + Date.now().toString().slice(-6));
  const [countdown, setCountdown] = useState(0);
  
  const queryData = location.state?.queryData || {
    query: "Sample query",
    amount: 20
  };

  const UPI_ID = "rik64712@oksbi";
  const AMOUNT = queryData.amount;
  const PAYEE_NAME = "AIYB";

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const generateUPILink = () => {
    const upiParams = new URLSearchParams({
      pa: UPI_ID,
      pn: PAYEE_NAME,
      am: AMOUNT.toString(),
      cu: 'INR',
      tn: `Query Access ${queryId}`
    });
    
    return `upi://pay?${upiParams.toString()}`;
  };

  const handlePayNow = () => {
    setPaymentStatus('processing');
    setCountdown(30);
    
    // Generate UPI deep link
    const upiLink = generateUPILink();
    
    // Try to open UPI app
    window.location.href = upiLink;
    
    // Fallback: show manual payment instructions after 3 seconds
    setTimeout(() => {
      if (paymentStatus === 'processing') {
        // Keep processing state for manual confirmation
      }
    }, 3000);
  };

  const handlePaymentConfirmation = () => {
    setPaymentStatus('completed');
    
    // Simulate verification delay
    setTimeout(() => {
      navigate('/query', { 
        state: { 
          paymentVerified: true, 
          queryId: queryId,
          queryData: queryData 
        } 
      });
    }, 2000);
  };

  const handleGoBack = () => {
    navigate('/query');
  };

  if (paymentStatus === 'completed') {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <CheckCircleIcon className="mx-auto h-16 w-16 text-success mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">
            Redirecting you to view your query results...
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-primary text-white p-6 text-center">
          <CreditCardIcon className="mx-auto h-12 w-12 mb-3" />
          <h2 className="text-2xl font-bold">Unlock Results</h2>
          <p className="text-blue-100 mt-1">Pay ₹{AMOUNT} to Proceed</p>
        </div>

        {/* Payment Details */}
        <div className="p-6">
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Query ID:</span>
              <span className="font-medium text-gray-900">{queryId}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">UPI ID:</span>
              <span className="font-medium text-gray-900">{UPI_ID}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Amount:</span>
              <span className="font-bold text-lg text-primary">₹{AMOUNT}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Service:</span>
              <span className="font-medium text-gray-900">Query Access</span>
            </div>
          </div>

          {/* Payment Status */}
          {paymentStatus === 'pending' && (
            <div className="space-y-4">
              <button
                onClick={handlePayNow}
                className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <CreditCardIcon className="h-5 w-5" />
                <span>Pay Now</span>
              </button>
              
              <p className="text-xs text-gray-500 text-center">
                You'll be redirected to your UPI app (GPay, PhonePe, Paytm)
              </p>
            </div>
          )}

          {paymentStatus === 'processing' && (
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400 mt-0.5" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      Complete Payment in UPI App
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>1. Open your UPI app (GPay/PhonePe/Paytm)</p>
                      <p>2. Complete the payment to <strong>{UPI_ID}</strong></p>
                      <p>3. Return here and click "I've Paid"</p>
                    </div>
                  </div>
                </div>
              </div>

              {countdown > 0 && (
                <div className="text-center text-sm text-gray-500">
                  Auto-refresh in {countdown} seconds
                </div>
              )}

              <div className="space-y-3">
                <button
                  onClick={handlePaymentConfirmation}
                  className="w-full bg-success text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  I've Paid - Unlock Now
                </button>
                
                <button
                  onClick={handlePayNow}
                  className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm"
                >
                  Try Payment Again
                </button>
              </div>
            </div>
          )}

          {/* Manual Payment Instructions */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Manual Payment:</h4>
            <div className="text-xs text-gray-600 space-y-1">
              <p>• Open any UPI app</p>
              <p>• Send ₹{AMOUNT} to <strong>{UPI_ID}</strong></p>
              <p>• Add note: "Query {queryId}"</p>
              <p>• Return and click "I've Paid"</p>
            </div>
          </div>

          {/* Back Button */}
          <button
            onClick={handleGoBack}
            className="w-full mt-4 flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-800 py-2"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            <span>Back to Query</span>
          </button>
        </div>
      </div>

      {/* Security Notice */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-blue-700 text-center">
          🔒 Secure payment via UPI. Your payment details are not stored.
        </p>
      </div>
    </div>
  );
};

export default PaymentGateway;