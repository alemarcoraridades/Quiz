export const getBaseUrl = (): string => {
  // When deployed to GitHub Pages, we need to include the repo name
  const isGitHubPages = window.location.hostname.includes('github.io');
  return isGitHubPages ? '/Quiz' : '';
};

export const getQuizShareUrl = (quizId: string): string => {
  const baseUrl = window.location.origin + getBaseUrl();
  // Always include the hash for HashRouter navigation
  return `${baseUrl}/#/quiz/${quizId}`;
};

export const getQuizPreviewUrl = (quizId: string): string => {
  const baseUrl = window.location.origin + getBaseUrl();
  // Always include the hash for HashRouter navigation
  return `${baseUrl}/#/quiz/${quizId}/preview`;
};
