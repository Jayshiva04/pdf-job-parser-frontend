"use client";

import React, { useState } from 'react';
import { FileUpload } from '@/components/FileUpload';
import { JobCard } from '@/components/JobCard';
import { toast } from "sonner";
import { FileText, Sparkles } from 'lucide-react';

interface JobInfo {
  job_title: string | null;
  department: string | null;
  vacancies: string | null;
  eligibility: string | null;
  salary: string | null;
  application_deadline: string | null;
  application_url: string | null;
  raw_text: string | null;
}

interface APIResponse {
  success: boolean;
  data: JobInfo | null;
  error: string | null;
  extraction_summary: {
    file_name: string;
    file_size_bytes: number;
    text_length: number;
    extracted_fields: Record<string, boolean>;
    parsing_timestamp: string;
  } | null;
}

const Index = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [jobData, setJobData] = useState<APIResponse | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    setUploadedFile(file);
    
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:8000/parse-pdf', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: APIResponse = await response.json();
      
      if (data.success) {
        setJobData(data);
        toast.success("PDF Parsed Successfully!", {
          description: `Extracted information from ${file.name}`,
        });
      } else {
        throw new Error(data.error || 'Failed to parse PDF');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error("Upload Failed", {
        description: error instanceof Error ? error.message : 'Failed to process PDF file',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = () => {
    if (uploadedFile) {
      const url = URL.createObjectURL(uploadedFile);
      const a = document.createElement('a');
      a.href = url;
      a.download = uploadedFile.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleNewUpload = () => {
    setJobData(null);
    setUploadedFile(null);
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Header */}
      <header className="bg-card shadow-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Job Notification PDF Summarizer
              </h1>
              <p className="text-muted-foreground">
                Government job notification parser
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {!jobData ? (
          /* Upload Section */
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Upload Your Job Notification PDF
              </h2>
              <p className="text-lg text-muted-foreground">
                Upload a government job notification PDF and get an instant structured summary 
                with all the key information extracted automatically.
              </p>
            </div>
            
            <FileUpload 
              onFileSelect={handleFileUpload} 
              isUploading={isUploading} 
            />

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
              <div className="text-center p-6 bg-card rounded-xl shadow-card">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Smart Extraction</h3>
                <p className="text-sm text-muted-foreground">
                  Automatically extracts job titles, departments, eligibility, and more
                </p>
              </div>
              
              <div className="text-center p-6 bg-card rounded-xl shadow-card">
                <div className="w-12 h-12 bg-gradient-accent rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="font-semibold mb-2">Structured Format</h3>
                <p className="text-sm text-muted-foreground">
                  Converts complex PDFs into clean, organized job cards
                </p>
              </div>
              
              <div className="text-center p-6 bg-card rounded-xl shadow-card">
                <div className="w-12 h-12 bg-success rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground">
                  Process large PDFs in seconds with high accuracy
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Results Section */
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Extraction Results
                </h2>
                <p className="text-muted-foreground">
                  Successfully parsed job notification from {jobData.extraction_summary?.file_name}
                </p>
              </div>
              <button
                onClick={handleNewUpload}
                className="px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Upload New PDF
              </button>
            </div>

            {jobData.data && (
              <JobCard
                jobInfo={jobData.data}
                fileName={jobData.extraction_summary?.file_name || 'Unknown'}
                onDownload={handleDownload}
              />
            )}

            {/* Extraction Summary */}
            {jobData.extraction_summary && (
              <div className="max-w-4xl mx-auto">
                <div className="bg-card rounded-xl p-6 shadow-card">
                  <h3 className="text-lg font-semibold mb-4 text-foreground">
                    Extraction Summary
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">File Size:</span>
                      <p className="font-medium">
                        {(jobData.extraction_summary.file_size_bytes / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Text Length:</span>
                      <p className="font-medium">{jobData.extraction_summary.text_length} chars</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Fields Extracted:</span>
                      <p className="font-medium">
                        {Object.values(jobData.extraction_summary.extracted_fields).filter(Boolean).length}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Processed:</span>
                      <p className="font-medium">
                        {new Date(jobData.extraction_summary.parsing_timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;