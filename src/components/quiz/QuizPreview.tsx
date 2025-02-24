import React, { useState, useEffect } from 'react';
import { Quiz } from '@/types/quiz';
import { QrCode } from 'lucide-react';
import { Button } from '../ui/button';
import { QuizResults } from './QuizResults';
import { QuestionView } from './QuestionView';
import { QuizHeader } from './QuizHeader';
import { ProgressBar } from './ProgressBar';
import QRCodeReact from 'qrcode.react';
import { useQuizResponses } from '@/hooks/useQuizResponses';
import { getQuizShareUrl } from '@/lib/quiz/urls';

interface QuizPreviewProps {
  quiz: Quiz;
  onClose: () => void;
}

export const QuizPreview: React.FC<QuizPreviewProps> = ({ quiz, onClose }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const { answers, setAnswer, getResponseStats, clearResponses } = useQuizResponses();

  const questions = quiz.settings.shuffleQuestions
    ? [...quiz.questions].sort(() => Math.random() - 0.5)
    : quiz.questions;

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  useEffect(() => {
    const answer = answers[currentQuestion.id];
    if (answer !== undefined && currentQuestionIndex < questions.length - 1) {
      const timer = setTimeout(() => {
        handleNext();
      }, 500); // Delay for smooth transition
      return () => clearTimeout(timer);
    }
  }, [answers[currentQuestion.id]]);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

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

  const shareUrl = getQuizShareUrl(quiz.id);

  // Determine the recommended product based on answers
  const recommendedProduct = quiz.settings.finalResultScreen?.productMapping?.find(
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
      <div className="max-w-3xl mx-auto px-4 py-8">
        {showResults ? (
          <div className="space-y-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-4">
                <span className="text-3xl font-bold text-blue-600">
                  {Math.round(
                    (quiz.questions.filter((q) => answers[q.id] !== undefined).length /
                      quiz.questions.length) *
                      100
                  )}
                  %
                </span>
              </div>
              <h2 className="text-3xl font-bold mb-2">Quiz Finalizado!</h2>
              <p className="text-lg text-gray-600">
                {recommendedProduct.checkoutLink}
              </p>
            </div>

            {/* Product Recommendation Section */}
            {recommendedProduct && (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <h3 className="text-xl font-semibold mb-4">{recommendedProduct.finalmessage}</h3>
                <img
                  src={recommendedProduct.imageUrl}
                  alt="Seu sonho do carro antigo agora!"
                  className="w-48 h-48 mx-auto mb-4 rounded-lg"
                />
                <a
                  href={recommendedProduct.checkoutLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Aquira seu Produto Agora!
                </a>
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                onClick={handleRestart}
              >
                Responda o Quiz novamente!
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <Button variant="outline" size="sm" onClick={onClose}>
                  Finalizar Visualizacao
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowQR(!showQR)}
                  leftIcon={<QrCode className="w-4 h-4" />}
                >
                  {showQR ? 'Hide QR' : 'Show QR'}
                </Button>
              </div>

              {showQR && (
                <div className="flex flex-col items-center mb-8 p-6 bg-white rounded-xl shadow-lg">
                  <QRCodeReact value={shareUrl} size={200} level="H" includeMargin={true} />
                  <p className="mt-3 text-sm text-gray-600">Scan to open on mobile</p>
                </div>
              )}

              <QuizHeader
                title={quiz.title}
                description={quiz.description}
                primaryColor={quiz.theme.primaryColor}
              />
            </div>

            {quiz.settings.showProgressBar && (
              <ProgressBar progress={progress} primaryColor={quiz.theme.primaryColor} />
            )}

            <QuestionView
              question={currentQuestion}
              questionIndex={currentQuestionIndex}
              totalQuestions={questions.length}
              answer={answers[currentQuestion.id]}
              onAnswer={(value) => setAnswer(currentQuestion.id, value)}
              allowSkip={quiz.settings.allowSkip}
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
