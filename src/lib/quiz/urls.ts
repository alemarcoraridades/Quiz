export const getBaseUrl = (): string => {
  // In development, we don't need a base URL
  if (import.meta.env.DEV) {
    return '';
  }

  // When deployed to GitHub Pages, we need to include the repo name
  const isGitHubPages = window.location.hostname.includes('github.io');
  return isGitHubPages ? '/Quiz' : '';
};

export const getQuizShareUrl = (quizId: string, isPreview: boolean = false): string => {
  const hostname = window.location.hostname;
  
  // For preview mode or development
  if (isPreview || import.meta.env.DEV || hostname === 'localhost') {
    return `${window.location.origin}${getBaseUrl()}/#/quiz/${quizId}`;
  }

  // For GitHub Pages
  if (hostname.includes('github.io')) {
    return `${window.location.origin}/Quiz/#/quiz/${quizId}`;
  }

  // For production with custom domain
  return `https://sonhocarroantigo.com.br/#/quiz/${quizId}`;
};

export const getQuizPreviewUrl = (quizId: string): string => {
  const hostname = window.location.hostname;
  const baseUrl = getBaseUrl();

  // For GitHub Pages
  if (hostname.includes('github.io')) {
    return `${window.location.origin}/Quiz/#/quiz/${quizId}/preview`;
  }

  // For custom domain
  if (hostname === 'sonhocarroantigo.com.br') {
    return `https://sonhocarroantigo.com.br/#/quiz/${quizId}/preview`;
  }

  // For development or other environments
  return `${window.location.origin}${baseUrl}/#/quiz/${quizId}/preview`;
};
