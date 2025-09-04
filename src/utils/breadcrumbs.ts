import type { BreadcrumbItem } from '../types/index.ts';

// Define route mappings for better breadcrumb labels
const routeLabels: Record<string, string> = {
  '/': 'Home',
  '/about/': 'About',
  '/cv/': 'CV',
  '/cv-print/': 'CV Print',
  '/contact/': 'Contact',
  '/testimonials/': 'Testimonials',
  '/blog/': 'Blog',
  '/blog/[slug]/': 'Blog Post'
};

// Define parent relationships for nested routes
const routeParents: Record<string, string> = {
  '/cv-print/': '/cv/',
  '/blog/[slug]/': '/blog/'
};

/**
 * Generate breadcrumb items based on the current path
 */
export function generateBreadcrumbs(
  currentPath: string, 
  currentTitle?: string,
  customItems?: BreadcrumbItem[]
): BreadcrumbItem[] {
  // If custom items are provided, use them
  if (customItems) {
    return customItems;
  }

  const breadcrumbs: BreadcrumbItem[] = [];
  
  // Handle root path
  if (currentPath === '/') {
    return [{ label: 'Home', href: '/', current: true }];
  }

  // Handle blog post pages
  if (currentPath.startsWith('/blog/') && currentPath !== '/blog/') {
    breadcrumbs.push(
      { label: 'Blog', href: '/blog/' },
      { label: currentTitle || 'Post', current: true }
    );
    return breadcrumbs;
  }

  // Handle other routes
  const segments = currentPath.split('/').filter(segment => segment !== '');
  let currentUrl = '';

  segments.forEach((segment, index) => {
    currentUrl += `/${segment}/`;
    
    const isLast = index === segments.length - 1;
    const label = routeLabels[currentUrl] || formatSegmentLabel(segment);
    
    breadcrumbs.push({
      label,
      href: isLast ? undefined : currentUrl,
      current: isLast
    });
  });

  return breadcrumbs;
}

/**
 * Generate breadcrumbs for blog posts with tag filtering
 */
export function generateBlogBreadcrumbs(
  selectedTag?: string,
  showFeaturedOnly?: boolean,
  postTitle?: string
): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', href: '/blog/' }
  ];

  // Add filter breadcrumbs
  if (selectedTag || showFeaturedOnly) {
    let filterLabel = 'Filtered';
    let filterHref = '/blog/';
    
    if (selectedTag && showFeaturedOnly) {
      filterLabel = `Featured: ${selectedTag}`;
      filterHref = `/blog/?tag=${encodeURIComponent(selectedTag)}&featured=true`;
    } else if (selectedTag) {
      filterLabel = selectedTag;
      filterHref = `/blog/?tag=${encodeURIComponent(selectedTag)}`;
    } else if (showFeaturedOnly) {
      filterLabel = 'Featured';
      filterHref = '/blog/?featured=true';
    }
    
    if (!postTitle) {
      // We're on the filtered blog list page
      breadcrumbs.push({ label: filterLabel, current: true });
    } else {
      // We're on a specific post from a filtered view
      breadcrumbs.push(
        { label: filterLabel, href: filterHref },
        { label: postTitle, current: true }
      );
    }
  } else if (postTitle) {
    // Regular blog post without filters
    breadcrumbs.push({ label: postTitle, current: true });
  } else {
    // Regular blog list page
    breadcrumbs[0].current = true;
  }

  return breadcrumbs;
}

/**
 * Format a URL segment into a readable label
 */
function formatSegmentLabel(segment: string): string {
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Generate breadcrumbs for specific content types
 */
export function generateContentBreadcrumbs(
  contentType: 'testimonials' | 'cv',
  itemTitle?: string,
  variant?: string
): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = [];

  switch (contentType) {
    case 'testimonials':
      breadcrumbs.push({ label: 'Testimonials', href: '/testimonials/' });
      if (itemTitle) {
        breadcrumbs.push({ label: itemTitle, current: true });
      } else {
        breadcrumbs[0].current = true;
      }
      break;

    case 'cv':
      breadcrumbs.push({ label: 'CV', href: '/cv/' });
      if (variant === 'print') {
        breadcrumbs.push({ label: 'Print Version', current: true });
      } else {
        breadcrumbs[0].current = true;
      }
      break;
  }

  return breadcrumbs;
}

/**
 * Get breadcrumb schema.org structured data
 */
export function getBreadcrumbStructuredData(breadcrumbs: BreadcrumbItem[]): object {
  const listItems = breadcrumbs
    .filter(crumb => crumb.href) // Only include items with links
    .map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.label,
      "item": crumb.href
    }));

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": listItems
  };
}