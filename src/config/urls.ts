import { APP_CONFIG } from './constants';
import { ENV } from './env';

export const getBaseUrl = (): string => {
  if (ENV.IS_DEV) {
    return window.location.origin;
  }
  return `${window.location.origin}/${APP_CONFIG.REPO_NAME}`;
};

export const getQuizShareUrl = (quizId: string): string => {
  const baseUrl = getBaseUrl();
  return `${baseUrl}${APP_CONFIG.ROUTES.QUIZ}/${quizId}`;
};

export const getQuizPreviewUrl = (quizId: string): string => {
  const baseUrl = getBaseUrl();
  return `${baseUrl}${APP_CONFIG.ROUTES.QUIZ}/${quizId}${APP_CONFIG.ROUTES.PREVIEW}`;
};