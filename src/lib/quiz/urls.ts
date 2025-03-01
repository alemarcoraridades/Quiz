const getGitHubPagesBase = () => {
  return '/Quiz';
};

const isDev = () => {
  return import.meta.env.DEV || window.location.hostname === 'localhost';
};

export const getBaseUrl = (): string => {
  if (isDev()) {
    return '';
  }
  
 // if (window.location.hostname === 'sonhocarroantigo.com.br') {
 //   return '';
 // }
  
  if (window.location.hostname.includes('github.io')) {
    return getGitHubPagesBase();
  }
  
  return '';
};

export const getQuizShareUrl = (quizId: string): string => {
  const hostname = window.location.hostname;
  
  // For development or preview
  if (isDev()) {
    return `${window.location.origin}/#/quiz/${quizId}`;
  }
  
  // For production with custom domain
  //if (hostname === 'sonhocarroantigo.com.br') {
 //   return `https://sonhocarroantigo.com.br/#/quiz/${quizId}`;
//  }
  
  // For GitHub Pages
  if (hostname.includes('github.io')) {
    return `${window.location.origin}${getGitHubPagesBase()}/#/quiz/${quizId}`;
  }
  
  // Fallback to current origin
  return `${window.location.origin}/#/quiz/${quizId}`;
};

export const getQuizPreviewUrl = (quizId: string): string => {
  const hostname = window.location.hostname;
  
  // For development or preview
  if (isDev()) {
    return `${window.location.origin}/#/quiz/${quizId}/preview`;
  }
  
  // For production with custom domain
//  if (hostname === 'sonhocarroantigo.com.br') {
//    return `https://sonhocarroantigo.com.br/#/quiz/${quizId}/preview`;
//  }
  
  // For GitHub Pages
  if (hostname.includes('github.io')) {
    return `${window.location.origin}${getGitHubPagesBase()}/#/quiz/${quizId}/preview`;
  }
  
  // Fallback to current origin
  return `${window.location.origin}/#/quiz/${quizId}/preview`;
};
