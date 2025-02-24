export const getBaseUrl = (): string => {
  // In development, we don't need a base URL
  if (import.meta.env.DEV) {
    return '';
  }
  
  // When deployed to GitHub Pages, we need to include the repo name
  const isGitHubPages = window.location.hostname.includes('github.io');
  return isGitHubPages ? '/Quiz' : '';
};

export const getQuizShareUrl = (quizId: string): string => {
  // For custom domain in production
  if (window.location.hostname === 'sonhocarroantigo.com.br') {
    return `https://sonhocarroantigo.com.br/#/quiz/${quizId}`;
  }
  
  // For GitHub Pages
  if (window.location.hostname.includes('github.io')) {
    return `${window.location.origin}/Quiz/#/quiz/${quizId}`;
  }
  
  // For development or other environments
  return `${window.location.origin}/#/quiz/${quizId}`;
};

export const getQuizPreviewUrl = (quizId: string): string => {
  // For custom domain in production
  if (window.location.hostname === 'sonhocarroantigo.com.br') {
    return `https://sonhocarroantigo.com.br/#/quiz/${quizId}/preview`;
  }
  
  // For GitHub Pages
  if (window.location.hostname.includes('github.io')) {
    return `${window.location.origin}/Quiz/#/quiz/${quizId}/preview`;
  }
  
  // For development or other environments
  return `${window.location.origin}/#/quiz/${quizId}/preview`;
};
