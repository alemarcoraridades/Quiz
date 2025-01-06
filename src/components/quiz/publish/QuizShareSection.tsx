import React from 'react';
import { Link, Copy } from 'lucide-react';
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

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  return (
    <div className="border-t border-gray-200 pt-4 mt-4">
      <div className="flex items-center gap-2 text-sm">
        <Link className="w-4 h-4 text-gray-400" />
        <span className="truncate flex-1 text-gray-600">{shareUrl}</span>
        <button
          onClick={handleCopyLink}
          className="p-1 hover:bg-gray-100 rounded-full"
          title="Copy link"
        >
          <Copy className="w-4 h-4 text-gray-500" />
        </button>
      </div>
    </div>
  );
}
