import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { TMDB_IMAGE_BASE_URL } from './constants';

// Utility function for merging Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// TODO: Add utility functions for image URLs
// Hint: TMDB returns relative paths, you need to construct full image URLs
// Reference: https://developer.themoviedb.org/docs/image-basics

export function getImageUrl(path: string | null | undefined, size: string = 'original'): string {
  // TODO: Implement image URL construction
  // Use VITE_TMDB_IMAGE_BASE_URL from environment variables
  if (!path) return '/placeholder.jpg';
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

// TODO: Add more utility functions as needed
// Examples: formatDate, formatRuntime, etc.
export function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return 'N/A';
  return new Date(dateStr).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatRuntime(minutes: number | null | undefined): string {
  if (!minutes) return 'N/A';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}j ${m}m` : `${m}m`;
}

export function formatCurrency(amount: number): string {
  if (!amount) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(amount);
}
