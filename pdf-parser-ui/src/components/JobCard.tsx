"use client";

import React from 'react';
import { 
  Building2, 
  Users, 
  IndianRupee, 
  Clock, 
  ExternalLink, 
  Download,
  Briefcase,
  GraduationCap,
  Calendar,
  FileText
} from 'lucide-react';

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

interface JobCardProps {
  jobInfo: JobInfo;
  fileName: string;
  onDownload: () => void;
}

export const JobCard: React.FC<JobCardProps> = ({ jobInfo, fileName, onDownload }) => {
  const formatSalary = (salary: string | null) => {
    if (!salary) return 'Not specified';
    // Add ₹ symbol if not present and format
    return salary.includes('₹') ? salary : `₹${salary}`;
  };

  const formatDeadline = (deadline: string | null) => {
    if (!deadline) return 'Not specified';
    try {
      // Try to parse and format the date
      const date = new Date(deadline);
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        });
      }
    } catch (e) {
      // If parsing fails, return as is
    }
    return deadline;
  };

  const isDeadlineUrgent = (deadline: string | null) => {
    if (!deadline) return false;
    try {
      const date = new Date(deadline);
      const now = new Date();
      const diffTime = date.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7 && diffDays > 0;
    } catch (e) {
      return false;
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="relative group">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-primary/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        
        <div className="relative bg-card/80 backdrop-blur-sm rounded-3xl shadow-elegant border border-border/50 overflow-hidden">
          {/* Header */}
          <div className="relative p-8 bg-gradient-primary/5">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gradient-primary rounded-lg shadow-card">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full border border-primary/20">
                    Government Job
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 leading-tight">
                  {jobInfo.job_title || 'Job Title Not Available'}
                </h2>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building2 className="w-5 h-5" />
                  <span className="text-lg">
                    {jobInfo.department || 'Department Not Specified'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main content grid */}
          <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Vacancies */}
            <div className="group/card relative h-full">
              <div className="absolute inset-0 bg-gradient-primary/5 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
              <div className="relative h-full p-6 bg-muted/20 rounded-2xl border border-border/30 transition-all duration-300 hover:shadow-card flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-gradient-primary rounded-xl shadow-sm">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Vacancies</span>
                </div>
                <div className="flex-1 flex items-center">
                  <div className="text-3xl font-bold text-primary">
                    {jobInfo.vacancies || 'N/A'}
                  </div>
                </div>
              </div>
            </div>

            {/* Salary */}
            <div className="group/card relative h-full">
              <div className="absolute inset-0 bg-gradient-success/5 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
              <div className="relative h-full p-6 bg-muted/20 rounded-2xl border border-border/30 transition-all duration-300 hover:shadow-card flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-gradient-success rounded-xl shadow-sm">
                    <IndianRupee className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Salary</span>
                </div>
                <div className="flex-1 flex items-center">
                  <div className="text-2xl font-bold text-success break-words">
                    {formatSalary(jobInfo.salary)}
                  </div>
                </div>
              </div>
            </div>

            {/* Deadline */}
            <div className="group/card relative h-full">
              <div className={`
                absolute inset-0 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-300
                ${isDeadlineUrgent(jobInfo.application_deadline) ? 'bg-destructive/5' : 'bg-gradient-accent/5'}
              `}></div>
              <div className="relative h-full p-6 bg-muted/20 rounded-2xl border border-border/30 transition-all duration-300 hover:shadow-card flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`
                    p-2.5 rounded-xl shadow-sm
                    ${isDeadlineUrgent(jobInfo.application_deadline) 
                      ? 'bg-gradient-to-r from-red-500 to-red-600' 
                      : 'bg-gradient-accent'
                    }
                  `}>
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Deadline</span>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <div className={`
                    text-2xl font-bold mb-1
                    ${isDeadlineUrgent(jobInfo.application_deadline) ? 'text-destructive' : 'text-foreground'}
                  `}>
                    {formatDeadline(jobInfo.application_deadline)}
                  </div>
                  {isDeadlineUrgent(jobInfo.application_deadline) && (
                    <div className="text-xs text-destructive font-medium">
                      ⚠️ Urgent
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Application Link */}
            <div className="group/card relative h-full">
              <div className="absolute inset-0 bg-gradient-accent/5 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
              <div className="relative h-full p-6 bg-muted/20 rounded-2xl border border-border/30 transition-all duration-300 hover:shadow-card flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-gradient-accent rounded-xl shadow-sm">
                    <ExternalLink className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Apply At</span>
                </div>
                <div className="flex-1 flex items-center">
                  {jobInfo.application_url ? (
                    <a
                      href={jobInfo.application_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors duration-200 group/link"
                    >
                      <span className="text-sm break-words leading-tight">
                        {jobInfo.application_url.replace(/^https?:\/\//, '').split('/')[0]}
                      </span>
                      <ExternalLink className="w-4 h-4 flex-shrink-0 group-hover/link:translate-x-0.5 transition-transform duration-200" />
                    </a>
                  ) : (
                    <div className="text-sm text-muted-foreground">Not provided</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Eligibility section */}
          {jobInfo.eligibility && (
            <div className="mx-8 mb-8">
              <div className="relative group/eligibility">
                <div className="absolute inset-0 bg-gradient-accent/5 rounded-2xl opacity-0 group-hover/eligibility:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-6 bg-muted/20 rounded-2xl border border-border/30">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-accent rounded-lg">
                      <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Eligibility Criteria</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {jobInfo.eligibility}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="p-8 pt-0 flex flex-col sm:flex-row gap-4">
            {jobInfo.application_url && (
              <a
                href={jobInfo.application_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn relative flex-1 inline-flex items-center justify-center gap-3 px-6 py-4 bg-gradient-primary text-primary-foreground font-semibold rounded-xl shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 hover-glow"
              >
                <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                <ExternalLink className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Apply Now</span>
              </a>
            )}
            
            <button
              onClick={onDownload}
              className="group/btn relative flex-1 inline-flex items-center justify-center gap-3 px-6 py-4 bg-card border-2 border-primary text-primary hover:bg-gradient-primary hover:text-primary-foreground font-semibold rounded-xl transition-all duration-300 hover:shadow-card hover:-translate-y-1"
            >
              <Download className="w-5 h-5" />
              <span>Download PDF</span>
            </button>
          </div>

          {/* Source info */}
          <div className="px-8 pb-6">
            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/30 rounded-lg p-3">
              <FileText className="w-4 h-4" />
              <span>Source: {fileName}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};