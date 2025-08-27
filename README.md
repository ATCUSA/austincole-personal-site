# Austin Cole's Personal Website

A personal bio site and blog built with Eleventy, Tailwind CSS, and deployed on Cloudflare Pages.

## Features

- 🌙 Dark mode toggle with system preference detection
- 📱 Fully responsive design
- ⚡ Fast static site generation with Eleventy
- 🎨 Modern UI with Tailwind CSS
- 📝 Blog functionality with Markdown posts
- 🔒 Security headers optimized for Cloudflare Pages
- 🎯 SEO-friendly structure

## Local Development

### Prerequisites

- Node.js (v16 or higher)
- pnpm (preferred) or npm

### Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

4. Open your browser to `http://localhost:8080`

### Available Commands

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build the site for production
- `pnpm start` - Start Eleventy development server (no CSS watching)

## Deployment

### GitHub Repository Setup

1. **Create GitHub repository**:
   ```bash
   gh repo create austincole-personal-site --public --description "Austin Cole's personal website built with Eleventy"
   ```

2. **Initial commit and push**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Austin Cole personal website"
   git branch -M main
   git remote add origin https://github.com/ATCUSA/austincole-personal-site.git
   git push -u origin main
   ```

### Cloudflare Pages

This site is optimized for deployment on Cloudflare Pages:

1. **Connect your repository** to Cloudflare Pages
2. **Build settings**:
   - Build command: `pnpm build`
   - Build output directory: `_site`
   - Root directory: `/` (or leave empty)

3. **Environment variables**: None required for basic setup
4. **Custom domain**: Configure your chosen domain (austincole.us recommended)

### Build Process

The build process:
1. Compiles Tailwind CSS from `src/assets/css/main.css`
2. Processes all Eleventy templates and markdown files
3. Copies static assets and Cloudflare configuration files
4. Outputs everything to `_site/` directory

## Project Structure

```
├── src/
│   ├── _includes/          # Reusable template components
│   │   └── icons.njk       # SVG icon macros
│   ├── _layouts/           # Page layouts
│   │   ├── base.njk        # Main layout template
│   │   └── post.njk        # Blog post layout
│   ├── assets/
│   │   └── css/
│   │       └── main.css    # Tailwind CSS input file
│   ├── posts/              # Blog posts (Markdown)
│   ├── 404.njk             # 404 error page
│   ├── about.njk           # About page
│   ├── blog.njk            # Blog listing page
│   └── index.njk           # Homepage
├── .eleventy.js            # Eleventy configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── _headers                # Cloudflare Pages headers
├── _redirects              # Cloudflare Pages redirects
└── package.json
```

## Content Management

### Adding Blog Posts

1. Create a new Markdown file in `src/posts/`
2. Use the filename format: `YYYY-MM-DD-title.md`
3. Include frontmatter:

```markdown
---
title: "Your Post Title"
description: "Brief description for SEO and previews"
date: 2024-01-15
tags:
  - post
  - your-tags
layout: post.njk
---

Your content here...
```

### Adding Testimonials

See `docs/TESTIMONIALS.md` for detailed instructions on gathering and adding testimonials to the website.

### Contact Form Setup

The site includes a contact form with Cloudflare Turnstile protection. See `docs/CONTACT-SETUP.md` for complete setup instructions including:
- Turnstile configuration
- Environment variables setup  
- Email routing integration

### Updating Bio Information

- Main bio content: Edit `src/about.njk`
- Homepage content: Edit `src/index.njk`
- Profile images: Place in `src/assets/images/` (see `docs/images-readme.md`)

## Customization

### Colors

The site uses a custom color palette defined in `tailwind.config.js`. The primary color can be changed by modifying the `primary` color values.

### Dark Mode

Dark mode is implemented using Tailwind CSS classes and JavaScript for toggle functionality. The preference is saved to localStorage and respects system preferences.

### Icons

Icons are implemented as Nunjucks macros in `src/_includes/icons.njk`. Add new icons by creating new macros following the existing pattern.

## Security

The site includes security headers in `_headers` file:
- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options
- XSS Protection
- Referrer Policy

## Social Links

Update social media links in:
- `src/_layouts/base.njk` (footer and navigation)
- `src/index.njk` (homepage)
- `src/about.njk` (about page)

Replace `austincole` with your actual usernames for GitHub and LinkedIn.

## License

This project is open source and available under the [MIT License](LICENSE).