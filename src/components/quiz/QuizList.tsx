import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Quiz } from '@/types/quiz';
import { PublishQuizModal } from './publish/PublishQuizModal';
import { QuizStatusBadge } from './publish/QuizStatusBadge';
import { QuizShareSection } from './publish/QuizShareSection';
import { QuizActions } from './publish/QuizActions';
import { fetchQuizzes as fetchQuizzesFromApi, publishQuiz } from '@/services/quizApi';


interface QuizListProps {
  onCreateNew: () => void;
  onEdit: (quiz: Quiz) => void;
  onDelete: (quizId: string) => void;
  onPublish: (quiz: Quiz, settings: { expiresAt?: string; accessCode?: string }) => void;
  onArchive: (quizId: string) => void;
}

export const QuizList: React.FC<QuizListProps> = ({
  onCreateNew,
  onEdit,
  onDelete,
  onPublish,
  onArchive,
}) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [showPublishModal, setShowPublishModal] = useState(false);

  // Fetch quizzes from GitHub
  const fetchQuizzes = async () => {
  setLoading(true);
  setError(null);
  
  try {
    const quizData = await fetchQuizzesFromApi();
    setQuizzes(quizData);
  } catch (err) {
    console.error('Error fetching quiz list:', err);
    setError(err instanceof Error ? err.message : 'Failed to load quizzes');
  } finally {
    setLoading(false);
  }
};

// Update handlePublish to use the API:
const handlePublish = async (settings: { expiresAt?: string; accessCode?: string }) => {
  if (selectedQuiz) {
    try {
      await publishQuiz(selectedQuiz, settings);
      setShowPublishModal(false);
      setSelectedQuiz(null);
      await fetchQuizzes(); // Refresh the list after publishing
    } catch (error) {
      console.error('Publishing failed:', error);
    }
  }
 };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4">
        <div className="flex">
          <div className="flex-1">
            <p className="text-sm text-red-700">{error}</p>
            <Button
              onClick={fetchQuizzes}
              variant="ghost"
              className="mt-2 text-sm"
            >
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

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

      {quizzes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">You haven't created any quizzes yet.</p>
          <Button onClick={onCreateNew} className="mt-4">
            Create Your First Quiz
          </Button>
        </div>
      ) : (
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
      )}

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
