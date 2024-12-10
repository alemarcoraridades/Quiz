import { ENV } from '@/config/env';

export const getBaseUrl = (): string => {
  if (ENV.IS_DEV) {
    return '';
  }
  return '/Quiz';
};

export const getQuizShareUrl = (quizId: string): string => {
  const baseUrl = getBaseUrl();
  return `${baseUrl}/#/quiz/${quizId}`;
};

export const getQuizPreviewUrl = (quizId: string): string => {
  const baseUrl = getBaseUrl();
  return `${baseUrl}/#/quiz/${quizId}/preview`;
};