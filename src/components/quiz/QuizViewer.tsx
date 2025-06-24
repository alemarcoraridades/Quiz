import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Quiz } from '@/types/quiz';
import { Button } from '../ui/button';
import { ProgressBar } from './ProgressBar';
import { QuizHeader } from './QuizHeader';
import { QuestionView } from './QuestionView';
import { QuizResults } from './QuizResults';
import { useQuizResponses } from '@/hooks/useQuizResponses';
import { fetchQuiz } from '@/services/quizApi';

export const QuizViewer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [questions, setQuestions] = useState<Quiz['questions']>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { answers, setAnswer, clearResponses } = useQuizResponses();
  const navigate = useNavigate();

  const loadQuiz = useCallback(async () => {
  if (!id) {
    setError('ID do quiz não fornecido');
    setIsLoading(false);
   // navigate('/quizzes');
    return;
  }

  setIsLoading(true);
  setError(null);
  
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const shareId = urlParams.get('shareId');

    const quizData = await fetchQuiz(id, shareId || undefined);
    setQuiz(quizData);
    
    const shuffledQuestions = quizData.settings?.shuffleQuestions
      ? [...quizData.questions].sort(() => Math.random() - 0.5)
      : quizData.questions;
    setQuestions(shuffledQuestions);
  } catch (err) {
    console.error('Erro ao carregar quiz:', err);
    setError(err instanceof Error ? err.message : 'Falha ao carregar quiz');
   // navigate('/quizzes');
  } finally {
    setIsLoading(false);
  }
  }, [id, navigate]);

  useEffect(() => {
    loadQuiz();
  }, [loadQuiz]);

  const handleNext = useCallback(() => {
    if (currentQuestionIndex <= questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  }, [currentQuestionIndex, questions.length]);

  useEffect(() => {
    if (!questions.length) return;
    
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return;

    const answer = answers[currentQuestion.id];
    if (answer !== undefined && currentQuestionIndex <= questions.length - 1) {
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

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <p>Carregando quiz...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
       // <div className="text-center p-6 max-w-md">
       //   <h2 className="text-xl font-bold text-red-600 mb-2">Erro</h2>
       //   <p className="text-gray-600 mb-4">{error}</p>
       //   <Button onClick={() => navigate('/quizzes')}>Voltar para Quizzes</Button>
       // </div>
      </div>
    );
  }

  if (!quiz || !questions.length) {
    return null;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
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

            <div className="flex justify-center">
              <Button onClick={handleRestart} variant="outline">
                Reiniciar Quiz
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8">
             // <div className="flex justify-between items-center mb-6">
             //   <Button variant="outline" onClick={() => navigate('/quizzes')}>
             //     Finalizar Quiz
             //   </Button>
             // </div>

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
