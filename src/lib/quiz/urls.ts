import { getBaseUrl } from './config';

export const getQuizShareUrl = (quizId: string): string => {
  const baseUrl = getBaseUrl();
  return `${baseUrl}/quiz/${quizId}`;
};

export const getQuizPreviewUrl = (quizId: string): string => {
  const baseUrl = getBaseUrl();
  return `${baseUrl}/quiz/${quizId}/preview`;
};