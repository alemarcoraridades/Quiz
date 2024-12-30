import React from 'react';
import { Link } from 'lucide-react';
import { Quiz } from '@/types/quiz';
import { getQuizShareUrl } from '@/lib/quiz/urls';

interface QuizShareSectionProps {
  quiz: Quiz;
}

export function QuizShareSection({ quiz }: QuizShareSectionProps) {
  if (quiz.publishStatus !== 'published') {
    return null;
  }

  const shareUrl = getQuizShareUrl(quiz.id);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
  };

  return (
    <div className="border-t border-gray-200 pt-4 mt-4">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Link className="w-4 h-4" />
        <button
          onClick={handleCopyLink}
          className="hover:text-blue-600 truncate flex-1"
          title={shareUrl}
        >
          {shareUrl}
        </button>
      </div>
    </div>
  );
}
