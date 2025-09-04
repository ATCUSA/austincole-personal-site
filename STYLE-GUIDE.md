# Austin Cole Site - Style Guide

## Overview
This style guide documents the design system, components, and conventions used in Austin Cole's personal website built with Astro 5 and Tailwind CSS v4.

## Color System

### Brand Colors
Custom brand colors defined in `@theme` block in `global.css`:
- `brand-50`: #eff6ff (lightest)
- `brand-100`: #dbeafe
- `brand-200`: #bfdbfe
- `brand-300`: #93c5fd
- `brand-400`: #60a5fa
- `brand-500`: #3b82f6 (base)
- `brand-600`: #2563eb (primary action)
- `brand-700`: #1d4ed8
- `brand-800`: #1e40af
- `brand-900`: #1e3a8a
- `brand-950`: #172554 (darkest)

### Semantic Colors
- **Primary Text**: `text-primary` → gray-900/gray-100 (dark mode)
- **Secondary Text**: `text-secondary` → gray-600/gray-300 (dark mode)
- **Muted Text**: `text-muted` → gray-500/gray-400 (dark mode)
- **Surface**: `bg-surface` → white/gray-800 (dark mode)
- **Surface Secondary**: `bg-surface-secondary` → gray-50/gray-800 (dark mode)
- **Border**: `border-primary` → gray-200/gray-700 (dark mode)

## Typography

### Headings
- **Section Heading**: `.section-heading` - Large centered titles (3xl, bold)
- **Section Subheading**: `.section-subheading` - Medium section titles (2xl, bold)
- **Card Titles**: `text-xl font-semibold text-primary`
- **Role Titles**: `font-medium text-primary`

### Body Text
- **Primary**: `text-primary` for main content
- **Secondary**: `text-secondary` for descriptions
- **Muted**: `text-muted` for less important text

## Components

### Layout Components

#### Layout.astro
- **Purpose**: Base layout with comprehensive SEO, accessibility, and theme support
- **Features**: Enhanced BaseHead with Open Graph, Twitter Cards, JSON-LD structured data
- **Props**: `title`, `description`, `image`, `type`, `publishedTime`, `modifiedTime`, `author`
- **Usage**: Used by all pages as the primary layout

#### Section.astro
- **Purpose**: Standardized section wrapper with consistent styling and spacing
- **Features**: Multiple variants, responsive padding, semantic HTML
- **Props**: `variant` (default/gray/brand-gradient/hero), `className`, `maxWidth`, `padding`, `id`
- **Usage**: Wraps all major page sections to reduce code duplication

#### Hero.astro
- **Purpose**: Flexible hero section component with logo and action button support
- **Features**: Logo integration, background logos, action buttons, multiple variants
- **Props**: `title`, `subtitle`, `description`, `actions[]`, `showLogo`, `logoImage`, `backgroundLogo`, `variant`
- **Usage**: Homepage and CV page hero sections

### UI Components

#### Buttons
```astro
<!-- Primary button -->
<a href="/contact/" class="btn btn-primary">Get In Touch</a>

<!-- Secondary button -->
<button class="btn btn-secondary">Learn More</button>
```

#### Cards
```astro
<div class="card">
  <h3 class="text-xl font-semibold text-primary mb-4">Card Title</h3>
  <p class="text-secondary">Card content...</p>
</div>
```

#### SkillTag.astro
```astro
<!-- Small skill tag -->
<SkillTag size="sm" color="brand">React</SkillTag>

<!-- Default skill tag -->
<SkillTag color="blue">TypeScript</SkillTag>

<!-- Large skill tag with link -->
<SkillTag size="lg" color="green" href="/projects">Node.js</SkillTag>
```

**Props:**
- `size`: "sm" | "default" | "lg"
- `color`: "brand" | "gray" | "green" | "blue"
- `href`: Optional URL for links

#### TestimonialCard.astro
```astro
<TestimonialCard testimonial={testimonialData} variant="professional" />
```

**Props:**
- `testimonial`: Object with name, title, company, content, initials
- `variant`: "professional" | "community" | "personal"

#### ConnectBlock.astro
```astro
<ConnectBlock personalInfo={personalInfo} variant="full" showTitle={true} />
```

**Props:**
- `personalInfo`: Contact and social media data
- `variant`: "compact" | "full"
- `showTitle`: Boolean for section title display

#### Icon Containers
```astro
<!-- Square icon container -->
<div class="icon-container">
  <span class="icon-text text-xl">📧</span>
</div>

<!-- Round icon container -->
<div class="icon-container-round">
  <span class="icon-text font-semibold text-lg">AC</span>
</div>
```

#### Form Inputs
```astro
<input type="text" class="form-input" placeholder="Your name">
<select class="form-input">...</select>
<textarea class="form-input" rows="6">...</textarea>
```

#### Navigation Links
```astro
<a href="/about/" class="nav-link">About</a>
<a href="/contact/" class="nav-link active">Contact</a>
```

#### Social Links
```astro
<a href="https://github.com/user" class="social-link">GitHub</a>
```

## Layout Patterns

### Page Structure
```astro
<Layout title="Page Title" description="Page description">
  <SkipLinks links={skipLinksData} />
  <div id="main-content">
    <!-- Page content -->
  </div>
</Layout>
```

### Section Structure
```astro
<Section variant="default" maxWidth="6xl" padding="lg">
  <PageHeader title="Section Title" subtitle="Optional subtitle" />
  <!-- Section content -->
</Section>
```

### Hero Section Structure
```astro
<Hero 
  title="Page Title"
  subtitle="Subtitle"
  description="Description text"
  actions={[{ text: "Get Started", href: "/contact", primary: true }]}
  showLogo={true}
/>
```

### Grid Layouts
```astro
<!-- Two-column layout -->
<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
  <!-- Content -->
</div>

<!-- Card grid -->
<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
  <div class="card">...</div>
  <div class="card">...</div>
</div>
```

## Dark Mode

### Implementation
- Uses `darkMode: 'selector'` in Tailwind config
- Theme toggle in both layouts
- Automatic system preference detection
- Persistent localStorage storage

### Usage Pattern
```css
/* Always pair light/dark variants */
.example {
  @apply bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100;
}
```

## Spacing & Layout

### Container Widths
- **Max Width**: `max-w-6xl` for main content areas
- **Narrow Content**: `max-w-4xl` for text-heavy pages
- **Form Width**: `max-w-md` for forms and narrow components

### Padding & Margins
- **Section Padding**: `py-16` for main sections
- **Container Padding**: `px-4 sm:px-6 lg:px-8` for responsive horizontal padding
- **Card Padding**: `p-6` built into `.card` component
- **Element Spacing**: `mb-6`, `mb-8`, `mb-12` for consistent vertical rhythm

### Gaps
- **Grid Gaps**: `gap-8` for card grids, `gap-12` for large layouts
- **Flex Gaps**: `gap-3` for tags, `gap-4` for buttons

## Responsive Design

### Breakpoints
- **Mobile**: Default (< 640px)
- **Tablet**: `sm:` (≥ 640px)
- **Desktop**: `lg:` (≥ 1024px)

### Common Patterns
```astro
<!-- Responsive grid -->
<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">

<!-- Responsive flex -->
<div class="flex flex-col sm:flex-row gap-4">

<!-- Responsive text -->
<h1 class="text-2xl sm:text-3xl lg:text-4xl">
```

## CSS Architecture

### Modular Structure
The CSS is organized into logical modules imported through `global.css`:

```
src/styles/
├── global.css              # Main entry point with @import statements
├── base/
│   └── theme.css          # Brand colors and theme definitions
├── components/
│   ├── buttons.css        # Button variants and social buttons
│   ├── navigation.css     # Navigation link styles
│   ├── cards.css          # Card components and variants
│   ├── forms.css          # Form input utilities
│   └── tags.css           # Skill tag components
├── layout/
│   ├── grid.css           # Grid layouts and patterns
│   └── hero.css           # Hero section variants
└── utilities/
    ├── typography.css     # Text utilities and prose styles
    └── accessibility.css  # Skip links and semantic utilities
```

### Import Order
1. **Tailwind CSS**: Core framework import
2. **Theme**: Color definitions and design tokens
3. **Components**: Reusable component patterns
4. **Layout**: Grid systems and layout patterns
5. **Utilities**: Typography and accessibility utilities

## File Organization

### Layouts
- `Layout.astro` - Base layout with enhanced SEO and accessibility
- `BlogPost.astro` - Blog post layout with structured data

### Components
- `Section.astro` - Standardized section wrapper
- `Hero.astro` - Flexible hero component
- `SkillTag.astro` - Skill/technology tags
- `TestimonialCard.astro` - Testimonial display component
- `ConnectBlock.astro` - Social links and contact CTA
- `PageHeader.astro` - Page title headers
- `SkipLinks.astro` - Accessibility navigation
- `SocialButtons.astro` - Social media link buttons
- `BlogCard.astro` - Blog post preview cards

### Pages
- `index.astro` - Homepage with hero and sections
- `about.astro` - About page
- `contact.astro` - Contact form with API integration
- `testimonials.astro` - Testimonials using content collections
- `cv.astro` - Resume/CV page
- `cv-print.astro` - Print-optimized CV
- `blog/` - Blog pages and routing

### API Endpoints
- `api/contact.ts` - Contact form submission with validation
- `api/cv-pdf.ts` - CV data for PDF generation

### Content Collections
- `content/testimonials/` - Testimonial markdown files
- `content.config.ts` - Content collection schemas

### Styles
- `global.css` - Main entry point with imports following v4 best practices
- `base/` - Theme definitions and foundational styles
- `components/` - Component-specific styles (buttons, forms, cards, etc.)
- `layout/` - Layout utilities and patterns (grid, hero)
- `utilities/` - Typography and accessibility utilities

## Best Practices

### CSS Classes
1. Use CSS-first approach with modular organization following Tailwind v4 best practices
2. Use semantic utility classes (`.skill-tag`, `.btn-primary`) over inline repetitive classes
3. Prefer `@theme` definitions in `base/theme.css` for color systems
4. Group related utilities into appropriate module files for maintainability
5. Use `@layer components` for reusable component patterns
6. Use `@layer utilities` for single-purpose utility classes

### Component Architecture
1. Use `Section.astro` wrapper for all major page sections
2. Leverage `Hero.astro` for consistent hero sections
3. Use `SkillTag.astro` for all skill/technology displays
4. Implement `TestimonialCard.astro` for consistent testimonial formatting
5. Standard component props with TypeScript interfaces

### Layout Consistency
1. All pages use `Layout.astro` for consistent SEO and accessibility
2. Use `Section` component for standardized container and padding patterns
3. Implement `SkipLinks` for accessibility compliance
4. Consistent responsive grid patterns with dynamic layouts

### Dark Mode
1. Always provide dark mode variants for custom colors
2. Test both light and dark themes
3. Use semantic color utilities when possible

### Accessibility
1. Proper heading hierarchy (h1 → h2 → h3)
2. Focus states on interactive elements
3. Sufficient color contrast
4. Semantic HTML structure

## API Integration

### Contact Form API
- **Endpoint**: `/api/contact` (POST)
- **Validation**: Zod schema with comprehensive field validation
- **Features**: CORS support, detailed error messages, server-side rendering
- **Security**: Input sanitization, content-type validation, rate limiting ready

### Content Collections
- **Testimonials**: Type-safe testimonial management with categories and ordering
- **Blog**: Ready for blog content with frontmatter validation
- **Schema**: Zod validation for consistent data structure

## Accessibility Features

### WCAG Compliance
- Skip links with `SkipLinks.astro` component
- Semantic HTML structure with proper heading hierarchy
- ARIA labels and descriptions for form fields
- Keyboard navigation support
- Focus management and visible focus indicators

### Implementation
- `role` attributes for complex UI components
- `aria-live` regions for dynamic content updates
- `aria-describedby` for form validation messages
- Screen reader friendly error messaging

## Performance Optimization

### Bundle Size
- CSS-first utility classes reduce repeated Tailwind classes
- Component-based architecture for code reuse
- Minimal client-side JavaScript (vanilla JS for forms)
- Astro's zero-JS by default approach

### Loading Performance
- Optimized images and assets
- Critical CSS inlined
- Proper resource hints and preloading
- Core Web Vitals optimization

## Future Considerations

### Enhanced Features
- Consider adding search functionality for blog content
- Implement tag-based filtering for testimonials
- Add RSS feed generation for blog posts
- Consider PWA features for offline functionality

### Content Management
- Explore CMS integration for non-technical content updates
- Consider automated testimonial collection workflows
- Implement content versioning and scheduling

### Analytics Integration
- Implement privacy-focused analytics
- Add performance monitoring
- Track form conversion rates and user engagement
