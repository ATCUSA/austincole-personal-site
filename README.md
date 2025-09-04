# Austin Cole - Personal Website

Professional website built with Astro 5, Tailwind CSS v4, and TypeScript. Features responsive design, dark mode, accessibility compliance, and a modern component-based architecture.

## 🚀 Project Structure

```text
/
├── public/                      # Static assets
│   ├── ai.txt                  # AI crawling policy
│   ├── robots.txt              # Search engine directives
│   └── .well-known/           # Security and verification files
├── src/
│   ├── components/            # Reusable components
│   │   ├── BlogCard.astro     # Blog post preview cards
│   │   ├── ConnectBlock.astro # Social links and contact CTA
│   │   ├── Hero.astro         # Page hero sections
│   │   ├── PageHeader.astro   # Page title headers
│   │   ├── Section.astro      # Styled section wrapper
│   │   ├── SkillTag.astro     # Skill/technology tags
│   │   ├── SkipLinks.astro    # Accessibility navigation
│   │   ├── SocialButtons.astro # Social media links
│   │   └── TestimonialCard.astro # Testimonial displays
│   ├── content/               # Content collections
│   │   └── testimonials/      # Testimonial markdown files
│   ├── data/                  # Static data files
│   │   └── personal-info.ts   # Contact and social information
│   ├── layouts/               # Page layouts
│   │   ├── Layout.astro       # Base layout with SEO
│   │   └── BlogPost.astro     # Blog post layout
│   ├── pages/                 # File-based routing
│   │   ├── api/              # API endpoints
│   │   │   └── contact.ts    # Contact form submission
│   │   ├── blog/             # Blog pages
│   │   ├── cv.astro          # Resume/CV page
│   │   ├── cv-print.astro    # Print-optimized CV
│   │   ├── contact.astro     # Contact form
│   │   ├── testimonials.astro # Testimonials page
│   │   └── index.astro       # Homepage
│   ├── styles/               # Modular CSS architecture
│   │   ├── global.css        # Main entry point with imports
│   │   ├── base/             # Theme and foundational styles
│   │   ├── components/       # Component-specific styles
│   │   ├── layout/           # Layout utilities and patterns
│   │   └── utilities/        # Typography and accessibility utilities
│   ├── types/                # TypeScript type definitions
│   ├── utils/                # Utility functions
│   │   ├── cv.ts            # CV data processing
│   │   └── date.ts          # Date formatting utilities
│   └── content.config.ts     # Content collections configuration
├── STYLE-GUIDE.md            # Design system documentation
└── package.json
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`            | Installs dependencies                            |
| `pnpm dev`                | Starts local dev server at `localhost:4321`     |
| `pnpm build`              | Build your production site to `./dist/`         |
| `pnpm preview`            | Preview your build locally, before deploying    |
| `pnpm astro ...`          | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help`    | Get help using the Astro CLI                    |

## 🎨 Design System

This project uses a comprehensive design system documented in `STYLE-GUIDE.md`. Key features:

- **Modular CSS Architecture**: Organized CSS files by function (base, components, layout, utilities) following Tailwind v4 best practices
- **Component Library**: Reusable Astro components with consistent styling
- **Dark Mode**: Complete dark mode support with system preference detection
- **Accessibility**: WCAG-compliant with skip links and keyboard navigation
- **Responsive Design**: Mobile-first approach with consistent breakpoints

### Key Components

- **Section.astro**: Standardized section wrapper with variants (default, gray, brand-gradient, hero)
- **Hero.astro**: Flexible hero component with logo support and action buttons
- **SkillTag.astro**: Consistent skill/technology tags with multiple variants
- **ConnectBlock.astro**: Social links and contact call-to-action
- **TestimonialCard.astro**: Testimonial displays with category-specific styling

## 📝 Content Management

### Content Collections

Uses Astro's content collections for type-safe content management:

- **Blog**: Markdown posts with frontmatter validation
- **Testimonials**: Categorized testimonials with order and featured properties

### Data Structure

- **Personal Info**: Centralized contact and social information in `src/data/personal-info.ts`
- **CV Data**: Structured resume data in `src/utils/cv.ts`
- **Type Definitions**: TypeScript interfaces for consistent data shapes

## 🔗 API Endpoints

### Contact Form (`/api/contact`)

Server-rendered API endpoint with:
- Zod schema validation
- Comprehensive error handling
- CORS support
- Sanitized JSON responses

**Validation Rules:**
- Name: Required, 1-100 characters
- Email: Valid email format
- Subject: Required, 1-200 characters
- Message: Required, 10-2000 characters

## 🎯 Features

- **Performance**: Optimized for Core Web Vitals with minimal client-side JavaScript
- **SEO**: Comprehensive meta tags, Open Graph, Twitter Cards, and JSON-LD structured data
- **Security**: Security headers, CSP-compliant, and sanitized user inputs
- **Accessibility**: Skip links, keyboard navigation, ARIA labels, and semantic HTML
- **Analytics Ready**: Structured data and meta tags for analytics integration

## 🚀 Deployment

Configured for Cloudflare Pages deployment with:
- `@astrojs/cloudflare` adapter
- Server-side rendering for API endpoints
- Static site generation for content pages
- Automatic build optimization

## 📚 Resources

- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Design System Style Guide](./STYLE-GUIDE.md)

## 🤝 Contributing

This is a personal website, but contributions for improvements are welcome. Please review the style guide before making changes to maintain consistency.