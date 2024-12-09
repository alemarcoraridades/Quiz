import React from 'react';
import { Quiz } from '@/types/quiz';
import { QUIZ_STATUS_LABELS, QUIZ_STATUS_STYLES } from '@/lib/quiz/constants';

interface QuizStatusBadgeProps {
  status: Quiz['publishStatus'];
}

export const QuizStatusBadge: React.FC<QuizStatusBadgeProps> = ({ status }) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${QUIZ_STATUS_STYLES[status]}`}
    >
      {QUIZ_STATUS_LABELS[status]}
    </span>
  );
};