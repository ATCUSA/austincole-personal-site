// Site-wide configuration and constants
export const siteConfig = {
  name: 'Austin Cole',
  title: 'Austin Cole - Deputy IT Director & CISO',
  description: 'Deputy IT Director, CISO, Emergency Management Leader, Ham Radio Operator, and ITDRC Volunteer from Genesee, Idaho',
  url: 'https://austincole.us',
  author: 'Austin Cole',
  
  // Navigation
  nav: [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about/' },
    { name: 'CV', href: '/cv/' },
    { name: 'Blog', href: '/blog/' },
    { name: 'Testimonials', href: '/testimonials/' },
    { name: 'Contact', href: '/contact/' }
  ],
  
  // Brand colors (matching Tailwind config)
  brand: {
    primary: '#2563eb', // blue-600
    primaryDark: '#60a5fa', // blue-400
    secondary: '#64748b', // slate-500
    accent: '#f59e0b' // amber-500
  },
  
  // Common text snippets
  tagline: 'Deputy IT Director & CISO | Emergency Management Leader | Ham Radio Operator | ITDRC Volunteer',
  
  // Blog settings
  blog: {
    postsPerPage: 10,
    showFeaturedPosts: true,
    showTags: true
  }
} as const;

export type SiteConfig = typeof siteConfig;
