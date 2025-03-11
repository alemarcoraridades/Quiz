const getGitHubPagesBase = () => {
  return '/Quiz';
};

const isDev = () => {
  return import.meta.env.DEV || window.location.hostname === 'localhost';
};

// Helper function to check if a path is a quiz URL
const isQuizUrl = (path: string): boolean => {
  return path.startsWith('/#/quiz/');
};

// Function to get the base URL based on the current path
export const getBaseUrl = (path: string = window.location.pathname): string => {
  if (isDev()) {
    return ''; // No base URL for development
  }

  // For quiz URLs, use the custom domain
  if (isQuizUrl(path)) {
    return 'https://sonhocarroantigo.com.br';
  }

  // For GitHub Pages, use the GitHub Pages URL
  if (window.location.hostname.includes('github.io')) {
    return getGitHubPagesBase();
  }

  // Fallback to current origin
  return '';
};

// Function to generate the shareable quiz URL
export const getQuizShareUrl = (quizId: string): string => {
  const baseUrl = getBaseUrl(`/#/quiz/${quizId}`);
  return `${baseUrl}/#/quiz/${quizId}`;
};

// Function to generate the quiz preview URL
export const getQuizPreviewUrl = (quizId: string): string => {
  const baseUrl = getBaseUrl(`/#/quiz/${quizId}/preview`);
  return `${baseUrl}/#/quiz/${quizId}/preview`;
};
