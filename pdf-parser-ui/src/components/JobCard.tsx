import React from 'react';
import { 
  Building2, 
  Users, 
  GraduationCap, 
  DollarSign, 
  Calendar, 
  ExternalLink,
  Download,
  Briefcase
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
    // Add currency formatting if it's a number
    const num = parseFloat(salary.replace(/[^\d.]/g, ''));
    if (!isNaN(num)) {
      return `₹${num.toLocaleString('en-IN')}`;
    }
    return salary;
  };

  const formatDeadline = (deadline: string | null) => {
    if (!deadline) return 'Not specified';
    try {
      // Try to parse and format the date
      const date = new Date(deadline);
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });
      }
    } catch (e) {
      // If parsing fails, return original
    }
    return deadline;
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-card hover:shadow-elegant transition-smooth">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-primary" />
              {jobInfo.job_title || 'Job Position'}
            </CardTitle>
            {jobInfo.department && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="w-4 h-4" />
                <span className="text-sm">{jobInfo.department}</span>
              </div>
            )}
          </div>
          <Badge variant="secondary" className="text-sm font-medium">
            Government Job
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Key Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {jobInfo.vacancies && (
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">Vacancies</span>
              </div>
              <p className="text-2xl font-bold text-primary">{jobInfo.vacancies}</p>
            </div>
          )}

          {jobInfo.salary && (
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <DollarSign className="w-4 h-4" />
                <span className="text-sm font-medium">Salary</span>
              </div>
              <p className="text-lg font-semibold text-success">{formatSalary(jobInfo.salary)}</p>
            </div>
          )}

          {jobInfo.application_deadline && (
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">Deadline</span>
              </div>
              <p className="text-sm font-semibold text-destructive">{formatDeadline(jobInfo.application_deadline)}</p>
            </div>
          )}

          {jobInfo.application_url && (
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <ExternalLink className="w-4 h-4" />
                <span className="text-sm font-medium">Apply At</span>
              </div>
              <a 
                href={jobInfo.application_url.startsWith('http') ? jobInfo.application_url : `https://${jobInfo.application_url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary hover:underline truncate block"
              >
                {jobInfo.application_url}
              </a>
            </div>
          )}
        </div>

        {/* Eligibility Criteria */}
        {jobInfo.eligibility && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Eligibility Criteria</h3>
            </div>
            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm text-foreground leading-relaxed">{jobInfo.eligibility}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <Button 
            variant="accent" 
            size="lg" 
            className="flex-1"
            onClick={() => {
              // Non-functional apply button as requested
              alert('Apply Now feature coming soon!');
            }}
          >
            <ExternalLink className="w-5 h-5" />
            Apply Now
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            onClick={onDownload}
            className="flex-1 sm:flex-none"
          >
            <Download className="w-5 h-5" />
            Download PDF
          </Button>
        </div>

        {/* File Info */}
        <div className="text-xs text-muted-foreground border-t border-border pt-3">
          <p>Source: {fileName}</p>
        </div>
      </CardContent>
    </Card>
  );
};