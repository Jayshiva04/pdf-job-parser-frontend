import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isUploading: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, isUploading }) => {
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
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer
          transition-all duration-300 bg-card shadow-card hover:shadow-upload
          ${isDragActive 
            ? 'border-primary bg-primary/5 scale-105' 
            : 'border-border hover:border-primary'
          }
          ${isUploading ? 'pointer-events-none opacity-70' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center gap-4">
          <div className={`
            p-4 rounded-full bg-gradient-primary transition-transform duration-300
            ${isDragActive ? 'scale-110' : 'hover:scale-105'}
          `}>
            {isUploading ? (
              <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <Upload className="w-8 h-8 text-white" />
            )}
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">
              {isUploading ? 'Processing PDF...' : 'Upload Job Notification PDF'}
            </h3>
            <p className="text-muted-foreground">
              {isDragActive 
                ? 'Drop your PDF file here'
                : 'Drag & drop your PDF here, or click to browse'
              }
            </p>
            <p className="text-sm text-muted-foreground">
              Maximum file size: 10MB
            </p>
          </div>
          
          {!isUploading && (
            <Button variant="upload" size="lg" className="mt-2">
              <FileText className="w-5 h-5" />
              Choose PDF File
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};