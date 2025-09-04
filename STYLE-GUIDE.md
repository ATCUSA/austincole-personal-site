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

#### BaseLayout.astro
- **Purpose**: Full navigation with mobile menu, hamburger, complete header/footer
- **Features**: Mobile-responsive navigation, theme toggle, social links
- **Usage**: Currently unused - designed for complex pages needing full navigation

#### SimpleLayout.astro  
- **Purpose**: Minimal navigation without mobile menu complexity
- **Features**: Simple horizontal nav, theme toggle, basic footer
- **Usage**: Used by ALL current pages (index, about, contact, testimonials, blog)

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

#### Brand Tags
```astro
<!-- Small rounded tags -->
<span class="brand-tag">Cybersecurity</span>

<!-- Large rectangular tags -->
<span class="brand-tag-lg">Emergency Management</span>
```

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
<SimpleLayout title="Page Title" description="Page description">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Page content -->
  </div>
</SimpleLayout>
```

### Section Structure
```astro
<section class="py-16">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="section-heading">Section Title</h2>
    <!-- Section content -->
  </div>
</section>
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

## File Organization

### Layouts
- `BaseLayout.astro` - Full navigation (unused currently)
- `SimpleLayout.astro` - Minimal navigation (used by all pages)

### Pages
- `index.astro` - Homepage
- `about.astro` - About page
- `contact.astro` - Contact form (layout only, no backend)
- `testimonials.astro` - Testimonials and recommendations
- `blog.astro` - Blog placeholder

### Styles
- `global.css` - Tailwind imports, theme colors, custom components and utilities

## Best Practices

### CSS Classes
1. Use semantic utility classes (`.text-primary`) over specific ones
2. Group related utilities with custom component classes
3. Prefer `@layer components` for reusable components
4. Use `@layer utilities` for single-purpose utilities

### Layout Consistency
1. All pages use `SimpleLayout` for consistency
2. Standard container and padding patterns
3. Consistent section spacing with `py-16`
4. Responsive grid patterns

### Dark Mode
1. Always provide dark mode variants for custom colors
2. Test both light and dark themes
3. Use semantic color utilities when possible

### Accessibility
1. Proper heading hierarchy (h1 → h2 → h3)
2. Focus states on interactive elements
3. Sufficient color contrast
4. Semantic HTML structure

## Future Considerations

### Layout Consolidation
- `BaseLayout` is currently unused - consider removing or finding specific use case
- Significant duplication between layouts could be extracted to shared components
- Mobile menu functionality in `BaseLayout` might be useful for complex pages

### Component Extraction
- Consider extracting repeated patterns into Astro components
- Navigation could be a separate component
- Footer could be a separate component
- Theme toggle could be a separate component

### Performance
- Custom utility classes reduce bundle size vs. repeated Tailwind classes
- Consider component-level CSS for complex interactions
- Optimize for Core Web Vitals
