import React from 'react';
import { Quiz } from '@/types/quiz';
import { Button } from '@/components/ui/Button';
import { getQuizShareUrl } from '@/lib/quiz/urls';

interface QuizShareSectionProps {
  quiz: Quiz;
}

export const QuizShareSection: React.FC<QuizShareSectionProps> = ({ quiz }) => {
  if (quiz.publishStatus !== 'published') {
    return null;
  }

  const shareUrl = getQuizShareUrl(quiz.id);

  return (
    <div className="mb-4 p-3 bg-gray-50 rounded-md">
      <p className="text-sm font-medium text-gray-700 mb-1">Share URL:</p>
      <div className="flex items-center gap-2">
        <input
          type="text"
          readOnly
          value={shareUrl}
          className="text-sm bg-white p-1 rounded border flex-1 overflow-hidden"
        />
        <Button
          size="sm"
          variant="outline"
          onClick={() => navigator.clipboard.writeText(shareUrl)}
        >
          Copy
        </Button>
      </div>
    </div>
  );
};