export const getBaseUrl = (): string => {
  // Check if we're in development
  if (import.meta.env.DEV) {
    return window.location.origin;
  }
  
  // For GitHub Pages
  return `${window.location.origin}/Quiz`;
};