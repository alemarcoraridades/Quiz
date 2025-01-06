import { nanoid } from 'nanoid';
import { Quiz } from '@/types/quiz';

export function generateQuizId(): string {
  // Generate a shorter, URL-safe ID using nanoid
  return nanoid(10);
}

export function createNewQuiz(partial: Partial<Quiz>): Quiz {
  return {
    id: generateQuizId(),
    title: '',
    description: '',
    questions: [],
    publishStatus: 'draft',
    ...partial
  };
}
