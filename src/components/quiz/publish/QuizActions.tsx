import React from 'react';
import { Edit2, Trash2, Archive, Eye, Share2 } from 'lucide-react';
import { Quiz } from '@/types/quiz';
import { Button } from '@/components/ui/Button';
import { getQuizPreviewUrl } from '@/lib/quiz/urls';

interface QuizActionsProps {
  quiz: Quiz;
  onEdit: (quiz: Quiz) => void;
  onDelete: (quizId: string) => void;
  onArchive: (quizId: string) => void;
  onPublish: () => void;
}

export const QuizActions: React.FC<QuizActionsProps> = ({
  quiz,
  onEdit,
  onDelete,
  onArchive,
  onPublish,
}) => {
  return (
    <div className="flex items-center justify-between border-t pt-4">
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(quiz)}
          className="p-2 hover:text-blue-600 transition-colors"
          title="Edit"
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(quiz.id)}
          className="p-2 hover:text-red-600 transition-colors"
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </button>
        {quiz.publishStatus !== 'archived' && (
          <button
            onClick={() => onArchive(quiz.id)}
            className="p-2 hover:text-gray-800 transition-colors"
            title="Archive"
          >
            <Archive className="w-4 h-4" />
          </button>
        )}
      </div>
      
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          className="flex items-center gap-1"
          onClick={() => window.open(getQuizPreviewUrl(quiz.id), '_blank')}
        >
          <Eye className="w-4 h-4" />
          Preview
        </Button>
        {quiz.publishStatus !== 'published' && (
          <Button
            size="sm"
            onClick={onPublish}
            className="flex items-center gap-1"
          >
            <Share2 className="w-4 h-4" />
            Publish
          </Button>
        )}
      </div>
    </div>
  );
};