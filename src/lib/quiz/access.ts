import { Quiz } from '@/types/quiz';

export const isQuizAccessible = (quiz: Quiz): boolean => {
  if (quiz.publishStatus !== 'published') {
    return false;
  }

  if (quiz.expiresAt && new Date(quiz.expiresAt) < new Date()) {
    return false;
  }

  return true;
};

export const validateQuizAccess = (
  quiz: Quiz,
  accessCode?: string
): { isValid: boolean; error?: string } => {
  if (!isQuizAccessible(quiz)) {
    return {
      isValid: false,
      error: 'This quiz is no longer accessible',
    };
  }

  if (quiz.accessCode && quiz.accessCode !== accessCode) {
    return {
      isValid: false,
      error: 'Invalid access code',
    };
  }

  return { isValid: true };
};