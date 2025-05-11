import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Gets the correct asset path considering the basePath in production
 */
export function getAssetPath(path: string): string {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  const basePath = process.env.NODE_ENV === 'production' ? '/NekoCanvas/' : '/';
  return `${basePath}${cleanPath}`;
}