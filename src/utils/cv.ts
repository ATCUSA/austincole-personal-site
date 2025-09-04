import type { CVData } from '../types/cv';
import cvData from '../data/cv-data.json';

export function getCVData(): CVData {
  return cvData as CVData;
}

export async function generatePDFData(): Promise<any> {
  // This would be used for PDF generation libraries like Puppeteer, jsPDF, etc.
  const data = getCVData();
  
  return {
    ...data,
    // Add any PDF-specific formatting here
    formattedExperience: data.experience.map(exp => ({
      ...exp,
      dateRange: formatDateRange(exp.startDate, exp.endDate, exp.current),
      duration: getDurationInYears(exp.startDate, exp.endDate)
    }))
  };
}

function formatDateRange(startDate: string, endDate: string | null, current: boolean): string {
  const start = new Date(startDate);
  const startFormatted = start.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  
  if (current || !endDate) {
    return `${startFormatted} - Present`;
  }
  
  const end = new Date(endDate);
  const endFormatted = end.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  
  return `${startFormatted} - ${endFormatted}`;
}

function getDurationInYears(startDate: string, endDate: string | null): number {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
  
  return Math.round(diffYears * 10) / 10;
}
