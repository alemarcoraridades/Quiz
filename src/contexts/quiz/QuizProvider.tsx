import { useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Quiz, PublishSettings } from '@/types/quiz';
import { getQuizShareUrl } from '@/lib/quiz/urls';
import { QuizContext } from './QuizContext';

const STORAGE_KEY = 'quiz-builder-quizzes';

interface QuizProviderProps {
  children: ReactNode;
}

export function QuizProvider({ children }: QuizProviderProps) {
  const [quizzes, setQuizzes] = useState<Quiz[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(quizzes));
  }, [quizzes]);

  const createQuiz = (quiz: Quiz) => {
    setQuizzes(prev => [...prev, { ...quiz, publishStatus: 'draft' }]);
    navigate('/');
  };

  const updateQuiz = (quiz: Quiz) => {
    setQuizzes(prev => prev.map(q => q.id === quiz.id ? quiz : q));
    navigate('/');
  };

  const deleteQuiz = (id: string) => {
    setQuizzes(prev => prev.filter(q => q.id !== id));
  };

  const publishQuiz = async (quiz: Quiz, settings: PublishSettings) => {
    const updatedQuiz = {
      ...quiz,
      publishStatus: 'published',
      publishedAt: new Date().toISOString(),
      ...settings
    };

    setQuizzes(prev => prev.map(q => 
      q.id === quiz.id ? updatedQuiz : q
    ));

    return getQuizShareUrl(quiz.id);
  };

  const archiveQuiz = (id: string) => {
    setQuizzes(prev => prev.map(q => 
      q.id === id 
        ? { ...q, publishStatus: 'archived' }
        : q
    ));
  };

  const getQuiz = (id: string) => quizzes.find(q => q.id === id);

  return (
    <QuizContext.Provider value={{
      quizzes,
      createQuiz,
      updateQuiz,
      deleteQuiz,
      publishQuiz,
      archiveQuiz,
      getQuiz
    }}>
      {children}
    </QuizContext.Provider>
  );
}
