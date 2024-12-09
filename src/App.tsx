import React, { useState } from 'react';
import { QuizList } from './components/quiz/QuizList';
import { QuizEditor } from './components/quiz/QuizEditor';
import { Quiz, PublishSettings } from './types/quiz';

function App() {
  const [view, setView] = useState<'list' | 'editor'>('list');
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | undefined>();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  const handleCreateNew = () => {
    setSelectedQuiz(undefined);
    setView('editor');
  };

  const handleEdit = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setView('editor');
  };

  const handleDelete = (quizId: string) => {
    setQuizzes((prev) => prev.filter((quiz) => quiz.id !== quizId));
  };

  const handleSave = (quiz: Quiz) => {
    if (selectedQuiz) {
      setQuizzes((prev) =>
        prev.map((q) => (q.id === quiz.id ? quiz : q))
      );
    } else {
      setQuizzes((prev) => [...prev, { ...quiz, publishStatus: 'draft' }]);
    }
    setView('list');
  };

  const handlePublish = (quiz: Quiz, settings: PublishSettings) => {
    setQuizzes((prev) =>
      prev.map((q) =>
        q.id === quiz.id
          ? {
              ...q,
              publishStatus: 'published',
              publishedAt: new Date().toISOString(),
              expiresAt: settings.expiresAt,
              accessCode: settings.accessCode,
            }
          : q
      )
    );
  };

  const handleArchive = (quizId: string) => {
    setQuizzes((prev) =>
      prev.map((q) =>
        q.id === quizId
          ? {
              ...q,
              publishStatus: 'archived',
            }
          : q
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">
                Quiz Builder
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'list' ? (
          <QuizList
            quizzes={quizzes}
            onCreateNew={handleCreateNew}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onPublish={handlePublish}
            onArchive={handleArchive}
          />
        ) : (
          <QuizEditor quiz={selectedQuiz} onSave={handleSave} />
        )}
      </main>
    </div>
  );
}

export default App;