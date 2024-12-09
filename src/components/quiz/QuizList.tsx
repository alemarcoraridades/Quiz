import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Quiz } from '@/types/quiz';
import { PublishQuizModal } from './publish/PublishQuizModal';
import { QuizStatusBadge } from './publish/QuizStatusBadge';
import { QuizShareSection } from './publish/QuizShareSection';
import { QuizActions } from './publish/QuizActions';

interface QuizListProps {
  quizzes: Quiz[];
  onCreateNew: () => void;
  onEdit: (quiz: Quiz) => void;
  onDelete: (quizId: string) => void;
  onPublish: (quiz: Quiz, settings: { expiresAt?: string; accessCode?: string }) => void;
  onArchive: (quizId: string) => void;
}

export const QuizList: React.FC<QuizListProps> = ({
  quizzes,
  onCreateNew,
  onEdit,
  onDelete,
  onPublish,
  onArchive,
}) => {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [showPublishModal, setShowPublishModal] = useState(false);

  const handlePublish = (settings: { expiresAt?: string; accessCode?: string }) => {
    if (selectedQuiz) {
      onPublish(selectedQuiz, settings);
      setShowPublishModal(false);
      setSelectedQuiz(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Your Quizzes</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage and publish your quizzes
          </p>
        </div>
        <Button onClick={onCreateNew} className="flex items-center gap-2">
          <PlusCircle className="w-4 h-4" />
          Create New Quiz
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:border-blue-500 transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {quiz.title}
              </h3>
              <QuizStatusBadge status={quiz.publishStatus} />
            </div>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {quiz.description}
            </p>
            
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <span>
                {quiz.questions.length} question{quiz.questions.length !== 1 ? 's' : ''}
              </span>
              {quiz.publishedAt && (
                <span>
                  Published {new Date(quiz.publishedAt).toLocaleDateString()}
                </span>
              )}
            </div>

            <QuizShareSection quiz={quiz} />

            <QuizActions
              quiz={quiz}
              onEdit={onEdit}
              onDelete={onDelete}
              onArchive={onArchive}
              onPublish={() => {
                setSelectedQuiz(quiz);
                setShowPublishModal(true);
              }}
            />
          </div>
        ))}
      </div>

      {showPublishModal && selectedQuiz && (
        <PublishQuizModal
          quiz={selectedQuiz}
          onPublish={handlePublish}
          onClose={() => {
            setShowPublishModal(false);
            setSelectedQuiz(null);
          }}
        />
      )}
    </div>
  );
};