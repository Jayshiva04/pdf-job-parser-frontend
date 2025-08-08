"use client";

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, Loader2, CheckCircle } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isUploading: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, isUploading }) => {
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false,
    maxSize: 10 * 1024 * 1024, // 10MB
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
  });

  return (
    <div className="max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={`
          relative group cursor-pointer transition-all duration-500 ease-out
          ${isDragActive || dragActive ? 'scale-105' : 'hover:scale-102'}
        `}
      >
        <input {...getInputProps()} />
        
        {/* Glow effect */}
        <div className={`
          absolute inset-0 rounded-3xl blur-2xl transition-opacity duration-500
          ${isDragActive ? 'opacity-30' : 'opacity-0 group-hover:opacity-20'}
          bg-gradient-primary
        `}></div>

        {/* Main upload area */}
        <div className={`
          relative p-12 rounded-3xl border-2 border-dashed transition-all duration-500
          ${isDragActive 
            ? 'border-primary bg-primary/5 shadow-upload' 
            : 'border-border bg-card/50 hover:border-primary/50 hover:bg-primary/2'
          }
          backdrop-blur-sm shadow-card
        `}>
          <div className="text-center space-y-6">
            {/* Icon */}
            <div className="relative mx-auto w-20 h-20">
              <div className={`
                absolute inset-0 rounded-2xl transition-all duration-500
                ${isDragActive 
                  ? 'bg-gradient-primary scale-110 animate-pulse-glow' 
                  : 'bg-gradient-to-br from-primary/20 to-primary/10 group-hover:scale-105'
                }
              `}></div>
              <div className="relative flex items-center justify-center w-full h-full">
                {isUploading ? (
                  <Loader2 className="w-10 h-10 text-primary animate-spin" />
                ) : isDragActive ? (
                  <CheckCircle className="w-10 h-10 text-primary animate-bounce" />
                ) : (
                  <Upload className="w-10 h-10 text-primary transition-transform duration-300 group-hover:scale-110" />
                )}
              </div>
            </div>

            {/* Text */}
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-foreground">
                {isUploading ? 'Processing PDF...' : 
                 isDragActive ? 'Drop your PDF here!' : 
                 'Upload Job Notification PDF'}
              </h3>
              <p className="text-muted-foreground text-lg">
                {isUploading ? 'Extracting information from your document' :
                 isDragActive ? 'Release to upload your file' :
                 'Drag & drop your PDF here, or click to browse'}
              </p>
              <p className="text-sm text-muted-foreground">
                Maximum file size: 10MB
              </p>
            </div>

            {/* Upload button */}
            {!isUploading && !isDragActive && (
              <div className="pt-4">
                <button
                  type="button"
                  className="group/btn relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-primary text-primary-foreground font-semibold rounded-xl shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 hover-glow"
                >
                  <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  <FileText className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Choose PDF File</span>
                </button>
              </div>
            )}

            {/* Progress indicator */}
            {isUploading && (
              <div className="pt-4">
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div className="h-full bg-gradient-primary animate-shimmer relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 animate-shimmer"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Supported formats */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full text-sm text-muted-foreground">
          <FileText className="w-4 h-4" />
          <span>Supports PDF files up to 10MB</span>
        </div>
      </div>
    </div>
  );
};