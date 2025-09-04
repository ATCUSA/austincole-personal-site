// Personal Information Types
export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
}

// Social Media Types
export interface SocialLinks {
  linkedin: string;
  github: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
}

// Content Collection Types
export interface BlogPost {
  id: string;
  slug: string;
  data: {
    title: string;
    description: string;
    pubDate: Date;
    updatedDate?: Date;
    author: string;
    tags: string[];
    draft: boolean;
    featured: boolean;
    image?: {
      src: string;
      alt: string;
    };
  };
  body: string;
}

export interface Testimonial {
  id: string;
  slug: string;
  data: {
    name: string;
    title: string;
    company: string;
    category: 'professional' | 'community' | 'personal';
    initials?: string;
    featured: boolean;
    order: number;
  };
  body: string | undefined;
}

// CV/Resume Types
export interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  graduationDate: string;
  details?: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  dateEarned: string;
  expirationDate?: string;
  credentialId?: string;
  verificationUrl?: string;
}

export interface Skill {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface CompetencyArea {
  title: string;
  items: string[];
}

export interface Leadership {
  category: string;
  roles: LeadershipRole[];
}

export interface LeadershipRole {
  title: string;
  organization: string;
  description: string;
  startDate?: string;
  endDate?: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  competencies: CompetencyArea[];
  leadership: Leadership[];
  skills: {
    systems: string[];
    security: string[];
    specializations: string[];
  };
}

// Component Props Types
export interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  actions?: ActionButton[];
  showLogo?: boolean;
  logoImage?: any;
  logoAlt?: string;
  backgroundLogo?: boolean;
  variant?: 'default' | 'large';
  className?: string;
}

export interface ActionButton {
  label: string;
  href: string;
  variant: 'primary' | 'secondary';
  target?: string;
}

export interface SectionProps {
  variant?: 'default' | 'gray' | 'brand-gradient' | 'hero';
  maxWidth?: '2xl' | '4xl' | '6xl';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  id?: string;
}

export interface SkillTagProps {
  size?: 'sm' | 'default' | 'lg';
  color?: 'brand' | 'gray' | 'green' | 'blue';
  href?: string;
  children: string;
}

export interface TestimonialCardProps {
  testimonial: {
    name: string;
    title: string;
    company: string;
    content: string;
    initials?: string;
  };
  variant: 'professional' | 'community' | 'personal';
}

export interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured' | 'compact';
}

export interface ConnectBlockProps {
  personalInfo: PersonalInfo;
  variant?: 'compact' | 'full';
  showTitle?: boolean;
}

export interface SocialButtonsProps {
  linkedinUrl: string;
  githubUrl: string;
  variant?: 'default' | 'compact' | 'text';
  size?: 'sm' | 'md' | 'lg';
}

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  variant?: 'default' | 'large' | 'centered';
}

// API Types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormResponse {
  success: boolean;
  message?: string;
  errors?: FormValidationError[];
}

export interface FormValidationError {
  field: string;
  message: string;
}

// Navigation Types
export interface NavigationLink {
  href: string;
  label: string;
  icon?: any;
  active?: boolean;
}

export interface SkipLink {
  href: string;
  label: string;
}

// Meta/SEO Types
export interface MetaData {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  canonicalUrl?: string;
}

// Utility Types
export type Variant<T extends string> = T;
export type Size = 'sm' | 'md' | 'lg' | 'xl';
export type Color = 'brand' | 'gray' | 'green' | 'blue' | 'red' | 'yellow';

// Theme Types
export interface ThemeConfig {
  mode: 'light' | 'dark' | 'system';
  colors: {
    brand: Record<string, string>;
    gray: Record<string, string>;
  };
}

// Reading Time Utility Type
export interface ReadingTimeResult {
  text: string;
  minutes: number;
  words: number;
}

// Breadcrumb Types
export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

// Filter/Search Types
export interface BlogFilters {
  tags?: string[];
  author?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  featured?: boolean;
}

export interface SearchResult<T> {
  item: T;
  score: number;
  matches: string[];
}