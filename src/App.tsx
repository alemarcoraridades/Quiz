import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QuizList } from './components/quiz/QuizList';
import { QuizEditor } from './components/quiz/QuizEditor';
import { Quiz, PublishSettings } from './types/quiz';

function App() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  const handleCreateNew = () => {
    return <Navigate to="/editor" />;
  };

  const handleEdit = (quiz: Quiz) => {
    return <Navigate to={`/editor/${quiz.id}`} />;
  };

  const handleDelete = (quizId: string) => {
    setQuizzes((prev) => prev.filter((quiz) => quiz.id !== quizId));
  };

  const handleSave = (quiz: Quiz) => {
    if (quizzes.find(q => q.id === quiz.id)) {
      setQuizzes((prev) =>
        prev.map((q) => (q.id === quiz.id ? quiz : q))
      );
    } else {
      setQuizzes((prev) => [...prev, { ...quiz, publishStatus: 'draft' }]);
    }
    return <Navigate to="/" />;
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
    <Router>
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
          <Routes>
            <Route 
              path="/" 
              element={
                <QuizList
                  quizzes={quizzes}
                  onCreateNew={handleCreateNew}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onPublish={handlePublish}
                  onArchive={handleArchive}
                />
              } 
            />
            <Route 
              path="/editor/:quizId?" 
              element={
                <QuizEditor onSave={handleSave} />
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;