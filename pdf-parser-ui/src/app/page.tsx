"use client";

import React, { useState } from 'react';
import { FileUpload } from '@/components/FileUpload';
import { JobCard } from '@/components/JobCard';
import { toast } from "sonner";
import { FileText, Sparkles, Zap, Upload } from 'lucide-react';

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

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/parse-pdf`, {
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
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
        <div className="relative bg-card/80 backdrop-blur-sm shadow-card border-b border-border/50">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-primary rounded-xl blur-xl opacity-30 animate-pulse-glow"></div>
                <div className="relative p-3 bg-gradient-primary rounded-xl shadow-elegant hover-glow transition-all duration-300">
                  <FileText className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gradient-primary mb-1">
                  Job Notification PDF Summarizer
                </h1>
                <p className="text-muted-foreground text-lg">
                  Government job notification parser
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {!jobData ? (
          /* Upload Section */
          <div className="space-y-12">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Upload Your Job Notification PDF
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Upload a government job notification PDF and get an instant structured summary 
                with all the key information extracted automatically.
              </p>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary/5 rounded-3xl blur-3xl"></div>
              <div className="relative">
                <FileUpload 
                  onFileSelect={handleFileUpload} 
                  isUploading={isUploading} 
                />
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-20">
              <div className="group relative h-full">
                <div className="absolute inset-0 bg-gradient-primary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative h-full text-center p-8 bg-card rounded-2xl shadow-card border border-border/50 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 flex flex-col">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-primary/20 rounded-xl blur-lg"></div>
                    <div className="relative w-16 h-16 bg-gradient-primary rounded-xl mx-auto flex items-center justify-center shadow-card">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-foreground">Smart Extraction</h3>
                  <p className="text-muted-foreground leading-relaxed flex-1">
                    Automatically extracts job titles, departments, eligibility criteria, and more using advanced AI
                  </p>
                </div>
              </div>
              
              <div className="group relative h-full">
                <div className="absolute inset-0 bg-gradient-accent/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative h-full text-center p-8 bg-card rounded-2xl shadow-card border border-border/50 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 flex flex-col">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-accent/20 rounded-xl blur-lg"></div>
                    <div className="relative w-16 h-16 bg-gradient-accent rounded-xl mx-auto flex items-center justify-center shadow-card">
                      <FileText className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-foreground">Structured Format</h3>
                  <p className="text-muted-foreground leading-relaxed flex-1">
                    Converts complex PDFs into clean, organized job cards with all essential details
                  </p>
                </div>
              </div>
              
              <div className="group relative h-full">
                <div className="absolute inset-0 bg-gradient-success/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative h-full text-center p-8 bg-card rounded-2xl shadow-card border border-border/50 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 flex flex-col">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-success/20 rounded-xl blur-lg"></div>
                    <div className="relative w-16 h-16 bg-gradient-success rounded-xl mx-auto flex items-center justify-center shadow-card">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-foreground">Lightning Fast</h3>
                  <p className="text-muted-foreground leading-relaxed flex-1">
                    Process large PDFs in seconds with high accuracy and reliability
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Results Section */
          <div className="space-y-8">
            <div className="flex items-center justify-between p-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50">
              <div>
                <h2 className="text-3xl font-bold text-gradient-primary mb-2">
                  Extraction Results
                </h2>
                <p className="text-muted-foreground text-lg">
                  Successfully parsed job notification from {jobData.extraction_summary?.file_name}
                </p>
              </div>
              <button
                onClick={handleNewUpload}
                className="group px-6 py-3 text-primary hover:text-primary-foreground bg-transparent hover:bg-gradient-primary border-2 border-primary rounded-xl font-medium transition-all duration-300 hover:shadow-card hover:-translate-y-0.5"
              >
                <Upload className="w-4 h-4 inline-block mr-2" />
                Upload New PDF
              </button>
            </div>

            {jobData.data && (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-primary/5 rounded-3xl blur-3xl"></div>
                <div className="relative">
                  <JobCard
                    jobInfo={jobData.data}
                    fileName={jobData.extraction_summary?.file_name || 'Unknown'}
                    onDownload={handleDownload}
                  />
                </div>
              </div>
            )}

            {/* Extraction Summary */}
            {jobData.extraction_summary && (
              <div className="relative max-w-5xl mx-auto">
                <div className="absolute inset-0 bg-gradient-accent/5 rounded-2xl blur-2xl"></div>
                <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl p-8 shadow-card border border-border/50">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-gradient-accent rounded-lg">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">
                      Extraction Summary
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center p-6 bg-muted/30 rounded-xl border border-border/20 hover:bg-muted/40 transition-colors duration-300">
                      <div className="text-3xl font-bold text-primary mb-2">
                        {(jobData.extraction_summary.file_size_bytes / 1024 / 1024).toFixed(2)} MB
                      </div>
                      <div className="text-sm text-muted-foreground font-medium">File Size</div>
                    </div>
                    <div className="text-center p-6 bg-muted/30 rounded-xl border border-border/20 hover:bg-muted/40 transition-colors duration-300">
                      <div className="text-3xl font-bold text-accent mb-2">
                        {jobData.extraction_summary.text_length.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground font-medium">Characters</div>
                    </div>
                    <div className="text-center p-6 bg-muted/30 rounded-xl border border-border/20 hover:bg-muted/40 transition-colors duration-300">
                      <div className="text-3xl font-bold text-success mb-2">
                        {Object.values(jobData.extraction_summary.extracted_fields).filter(Boolean).length}
                      </div>
                      <div className="text-sm text-muted-foreground font-medium">Fields Extracted</div>
                    </div>
                    <div className="text-center p-6 bg-muted/30 rounded-xl border border-border/20 hover:bg-muted/40 transition-colors duration-300">
                      <div className="text-3xl font-bold text-foreground mb-2">
                        {new Date(jobData.extraction_summary.parsing_timestamp).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                      <div className="text-sm text-muted-foreground font-medium">Processed At</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center text-muted-foreground">
            <p>Built with ❤️ for efficient government job notification processing</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;