import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Quiz } from '@/types/quiz';
import { Button } from '../ui/button';
import { ProgressBar } from './ProgressBar';
import { QuizHeader } from './QuizHeader';
import { QuestionView } from './QuestionView';
import { QuizResults } from './QuizResults';
import { useQuizResponses } from '@/hooks/useQuizResponses';

export const QuizViewer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [questions, setQuestions] = useState<Quiz['questions']>([]);

  const { answers, setAnswer, clearResponses } = useQuizResponses();
  const navigate = useNavigate();

  // Load quiz from localStorage
  useEffect(() => {
    const savedQuizzes = JSON.parse(localStorage.getItem('quizzes') || '[]') as Quiz[];
    const selectedQuiz = savedQuizzes.find((q) => q.id === id);
    
    if (selectedQuiz) {
      setQuiz(selectedQuiz);
      // Initialize questions based on shuffle setting
      const shuffledQuestions = selectedQuiz.settings?.shuffleQuestions
        ? [...selectedQuiz.questions].sort(() => Math.random() - 0.5)
        : selectedQuiz.questions;
      setQuestions(shuffledQuestions);
    } else {
      console.error('Quiz não encontrado!');
      navigate('/quizzes');
    }
  }, [id, navigate]);

  const handleNext = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  }, [currentQuestionIndex, questions.length]);

  // Auto-navigate effect with proper dependencies
  useEffect(() => {
    if (!questions.length) return;
    
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return;

    const answer = answers[currentQuestion.id];
    if (answer !== undefined && currentQuestionIndex < questions.length - 1) {
      const timer = setTimeout(handleNext, 500);
      return () => clearTimeout(timer);
    }
  }, [answers, currentQuestionIndex, questions, handleNext]);

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    clearResponses();
    setShowResults(false);
  };

  if (!quiz || !questions.length) {
    return <p>Carregando quiz...</p>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) {
    return <p>Questão não encontrada</p>;
  }

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  // Filter matching products based on user answers
  const matchingProducts = quiz.settings?.finalResultScreen?.productMapping?.find(
    (mapping) => answers[mapping.questionId] === mapping.answer
  )?.product;

  return (
    <div
      className="fixed inset-0 bg-white z-50 overflow-auto"
      style={{
        backgroundColor: quiz.theme.backgroundColor,
        fontFamily: quiz.theme.fontFamily,
      }}
    >
      <div className="container">
        {showResults ? (
          <div className="space-y-8 fade-in">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-4">
                <span className="text-3xl font-bold text-blue-600">
                  {Math.round(
                    (questions.filter((q) => answers[q.id] !== undefined).length /
                      questions.length) *
                      100
                  )}
                  %
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-2">Quiz Finalizado!</h2>
            </div>

            {matchingProducts && (
              <div className="card">
                <h3 className="text-xl font-semibold mb-4">{matchingProducts.finalmessage}</h3>
                <img
                  src={matchingProducts.imageUrl}
                  alt="Seu sonho do carro antigo agora!"
                  className="w-48 h-48 mx-auto mb-4 rounded-lg object-cover"
                />
                <a
                  href={matchingProducts.checkoutLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Adquira seu Produto Agora!
                </a>
              </div>
            )}

          </div>
        ) : (
          <>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <Button className="btn btn-outline" onClick={() => navigate('/quizzes')}>
                  Finalizar Quiz
                </Button>
              </div>

              <QuizHeader
                title={quiz.title}
                description={quiz.description}
                primaryColor={quiz.theme.primaryColor}
              />
            </div>

            {quiz.settings?.showProgressBar && (
              <ProgressBar progress={progress} primaryColor={quiz.theme.primaryColor} />
            )}

            <QuestionView
              question={currentQuestion}
              questionIndex={currentQuestionIndex}
              totalQuestions={questions.length}
              answer={answers[currentQuestion.id]}
              onAnswer={(value) => setAnswer(currentQuestion.id, value)}
              allowSkip={quiz.settings?.allowSkip}
              onNext={handleNext}
              onPrevious={handlePrevious}
              isLastQuestion={currentQuestionIndex === questions.length - 1}
            />
          </>
        )}
      </div>
    </div>
  );
};

