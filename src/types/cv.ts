export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  linkedin: string;
  github: string;
  hamRadio: string;
  summary: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  type: 'full-time' | 'consulting' | 'part-time';
  responsibilities: string[];
}

export interface LeadershipRole {
  title: string;
  organization: string;
  description?: string;
}

export interface Leadership {
  category: string;
  roles: LeadershipRole[];
}

export interface Competency {
  title: string;
  items: string[];
}

export interface Skills {
  systems: string[];
  security: string[];
  specializations: string[];
}

export interface CVData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  leadership: Leadership[];
  certifications: string[];
  skills: Skills;
  competencies: Competency[];
}

// Utility functions
export function formatDateRange(startDate: string, endDate: string | null, current: boolean): string {
  const start = new Date(startDate);
  const startFormatted = start.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  
  if (current || !endDate) {
    return `${startFormatted} - Present`;
  }
  
  const end = new Date(endDate);
  const endFormatted = end.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  
  return `${startFormatted} - ${endFormatted}`;
}

export function getDurationInYears(startDate: string, endDate: string | null): number {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
  
  return Math.round(diffYears * 10) / 10; // Round to 1 decimal place
}
