import type { ReadingTimeResult } from '../types/index.ts';

/**
 * Calculate estimated reading time for text content
 * Based on average reading speed of 200 words per minute
 */
export function calculateReadingTime(content: string): ReadingTimeResult {
  // Remove HTML tags and normalize whitespace
  const cleanContent = content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();

  // Count words (split by whitespace and filter empty strings)
  const words = cleanContent.split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;

  // Calculate reading time (200 words per minute)
  const wordsPerMinute = 200;
  const minutes = Math.ceil(wordCount / wordsPerMinute);

  // Generate readable text
  let readingTimeText: string;
  if (minutes <= 1) {
    readingTimeText = '1 min read';
  } else {
    readingTimeText = `${minutes} min read`;
  }

  return {
    text: readingTimeText,
    minutes,
    words: wordCount
  };
}

/**
 * Calculate reading time from markdown content
 * Handles frontmatter and markdown syntax
 */
export function calculateMarkdownReadingTime(markdownContent: string): ReadingTimeResult {
  // Remove frontmatter (everything between --- delimiters)
  let content = markdownContent.replace(/^---[\s\S]*?---/, '');

  // Remove markdown syntax while preserving text
  content = content
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    // Remove headers (but keep the text)
    .replace(/^#+\s+/gm, '')
    // Remove links but keep the text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove bold/italic markers
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    // Remove list markers
    .replace(/^[-*+]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    // Remove blockquote markers
    .replace(/^>\s+/gm, '')
    // Remove horizontal rules
    .replace(/^---+$/gm, '')
    .replace(/^\*\*\*+$/gm, '');

  return calculateReadingTime(content);
}

/**
 * Get reading time category for styling purposes
 */
export function getReadingTimeCategory(minutes: number): 'quick' | 'medium' | 'long' {
  if (minutes <= 3) return 'quick';
  if (minutes <= 10) return 'medium';
  return 'long';
}

/**
 * Format reading time with additional context
 */
export function formatReadingTimeWithContext(
  readingTime: ReadingTimeResult,
  includeWordCount = false
): string {
  const category = getReadingTimeCategory(readingTime.minutes);
  const categoryLabels = {
    quick: '⚡ Quick read',
    medium: '📖 Medium read',
    long: '📚 Long read'
  };

  let formattedTime = `${categoryLabels[category]} • ${readingTime.text}`;
  
  if (includeWordCount) {
    formattedTime += ` • ${readingTime.words} words`;
  }

  return formattedTime;
}