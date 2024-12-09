export const getBaseUrl = (): string => {
  if (import.meta.env.DEV) {
    return window.location.origin;
  }
  return `${window.location.origin}/Quiz`;
};

export const getQuizShareUrl = (quizId: string): string => {
  const baseUrl = getBaseUrl();
  return `${baseUrl}/quiz/${quizId}`;
};

export const getQuizPreviewUrl = (quizId: string): string => {
  const baseUrl = getBaseUrl();
  return `${baseUrl}/quiz/${quizId}/preview`;
};