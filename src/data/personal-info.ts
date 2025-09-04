// Centralized personal information store
// This ensures consistency across all pages and components

export const personalInfo = {
  name: 'Austin Cole',
  title: 'Deputy IT Director & CISO',
  location: 'Genesee, Idaho',
  linkedin: 'https://www.linkedin.com/in/austintcole/',
  github: 'https://github.com/ATCUSA',
  hamRadio: 'KF7SIW',
  phone: undefined, // Not publicly displayed
  summary: 'Experienced IT leader with over 20 years of experience in cybersecurity, infrastructure management, and emergency preparedness. Currently serving as Deputy IT Director and Chief Information Security Officer for Latah County, Idaho.'
} as const;

export type PersonalInfo = typeof personalInfo;
