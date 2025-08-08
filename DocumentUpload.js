import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { 
  DocumentArrowUpIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const DocumentUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      status: 'uploading',
      progress: 0,
      clauses: 0,
      needsOCR: file.type === 'application/pdf' && Math.random() > 0.7
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);
    
    // Simulate file processing
    newFiles.forEach((fileObj, index) => {
      setTimeout(() => {
        processFile(fileObj.id);
      }, index * 1000);
    });
  }, []);

  const processFile = async (fileId) => {
    setIsProcessing(true);
    
    // Simulate processing steps
    const steps = [
      { progress: 20, status: 'parsing' },
      { progress: 40, status: 'extracting' },
      { progress: 60, status: 'chunking' },
      { progress: 80, status: 'embedding' },
      { progress: 100, status: 'processed' }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setUploadedFiles(prev => prev.map(file => 
        file.id === fileId 
          ? { 
              ...file, 
              progress: step.progress,
              status: step.status,
              clauses: step.progress === 100 ? Math.floor(Math.random() * 15) + 5 : file.clauses
            }
          : file
      ));
      
      setProcessingProgress(step.progress);
    }
    
    setIsProcessing(false);
    setProcessingProgress(0);
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    multiple: true
  });

  const getStatusIcon = (status, needsOCR) => {
    switch (status) {
      case 'processed':
        return <CheckCircleIcon className="h-5 w-5 text-success" />;
      case 'uploading':
      case 'parsing':
      case 'extracting':
      case 'chunking':
      case 'embedding':
        return <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>;
      default:
        return needsOCR ? 
          <ExclamationTriangleIcon className="h-5 w-5 text-warning" /> :
          <CheckCircleIcon className="h-5 w-5 text-success" />;
    }
  };

  const getStatusText = (status, needsOCR) => {
    if (needsOCR && status === 'processed') return 'OCR Required';
    switch (status) {
      case 'processed': return 'Processed ✅';
      case 'uploading': return 'Uploading...';
      case 'parsing': return 'Parsing document...';
      case 'extracting': return 'Extracting text...';
      case 'chunking': return 'Creating chunks...';
      case 'embedding': return 'Generating embeddings...';
      default: return 'Ready';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Document Upload</h1>
        <p className="text-gray-600">Upload PDFs, Word docs, or email extracts for processing</p>
      </div>

      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive 
            ? 'border-primary bg-blue-50' 
            : 'border-gray-300 hover:border-primary hover:bg-gray-50'
        }`}
      >
        <input {...getInputProps()} />
        <DocumentArrowUpIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        {isDragActive ? (
          <p className="text-lg text-primary font-medium">Drop the files here...</p>
        ) : (
          <div>
            <p className="text-lg text-gray-600 mb-2">
              Drag & drop files here, or <span className="text-primary font-medium">browse</span>
            </p>
            <p className="text-sm text-gray-500">
              Supports PDF, DOC, DOCX, TXT files
            </p>
          </div>
        )}
      </div>

      {/* Processing Progress */}
      {isProcessing && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Processing documents...</span>
            <span className="text-sm text-gray-500">{processingProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${processingProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Uploaded Files</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  {getStatusIcon(file.status, file.needsOCR)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <div className="flex items-center space-x-4 mt-1">
                      <p className="text-xs text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <p className="text-xs text-gray-600">
                        {getStatusText(file.status, file.needsOCR)}
                      </p>
                      {file.clauses > 0 && (
                        <p className="text-xs text-success font-medium">
                          {file.clauses} clauses extracted
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                
                {file.status !== 'uploading' && file.status !== 'parsing' && (
                  <button
                    onClick={() => removeFile(file.id)}
                    className="ml-4 text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Message Panel */}
      {uploadedFiles.some(f => f.status === 'processed') && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex">
            <CheckCircleIcon className="h-5 w-5 text-green-400 mt-0.5" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">
                Documents processed successfully!
              </h3>
              <div className="mt-2 text-sm text-green-700">
                <p>
                  Total clauses extracted: {uploadedFiles.reduce((sum, file) => sum + file.clauses, 0)}
                </p>
                <p className="mt-1">
                  Ready for querying. Go to the Query Interface to start asking questions.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;