module.exports = function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/assets");
  
  // Copy Cloudflare Pages files
  eleventyConfig.addPassthroughCopy("_headers");
  eleventyConfig.addPassthroughCopy("_redirects");
  
  // Watch for changes in CSS files
  eleventyConfig.addWatchTarget("src/**/*.css");
  
  // Configure markdown
  eleventyConfig.setLibrary("md", require("markdown-it")({
    html: true,
    breaks: true,
    linkify: true
  }));
  
  // Add date filters
  eleventyConfig.addFilter("dateDisplay", (date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(new Date(date));
  });
  
  eleventyConfig.addFilter("date", (date, format) => {
    const d = new Date(date);
    if (format === 'YYYY-MM-DD') {
      return d.toISOString().split('T')[0];
    }
    if (format === 'YYYY') {
      return d.getFullYear().toString();
    }
    return d.toISOString();
  });
  
  eleventyConfig.addFilter("head", (array, count) => {
    return array.slice(0, count);
  });
  
  eleventyConfig.addFilter("striptags", (str) => {
    return str.replace(/<[^>]*>/g, '');
  });
  
  eleventyConfig.addFilter("truncate", (str, length) => {
    if (str.length <= length) return str;
    return str.substring(0, length) + '...';
  });
  
  // Create collections
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/**/*.md").reverse();
  });
  
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};