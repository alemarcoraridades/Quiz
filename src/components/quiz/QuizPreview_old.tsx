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

  
  const { 
    answers, 
    setAnswer, 
    getResponseStats,
    clearResponses 
  } = useQuizResponses();

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
          <QuizResults
            quiz={quiz}
            answers={answers}
            responseStats={getResponseStats()}
            onRestart={handleRestart}
            onClose={onClose}
          />
        ) : (
          <>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onClose}
                >
                  Exit Preview
                </Button>
              </div>

              <QuizHeader 
                title={quiz.title}
                description={quiz.description}
                primaryColor={quiz.theme.primaryColor}
              />
            </div>

            {quiz.settings.showProgressBar && (
              <ProgressBar 
                progress={progress}
                primaryColor={quiz.theme.primaryColor}
              />
            )}

             <div>
      		{/* Final Result Screen Preview */}
      		{showResults && (
        	<div>
          	  <h2>Final Result Screen Preview</h2>
          	  <p>{quiz.settings.finalResultScreen?.message}</p>
          	  {quiz.settings.finalResultScreen?.productMapping?.map((mapping, index) => (
            	  <div key={index}>
              	    <h3>Product Mapping {index + 1}</h3>
              	    <p>Question ID: {mapping.questionId}</p>
              	    <p>Answer: {mapping.answer}</p>
              	    <img src={mapping.product.imageUrl} alt="Product" />
              	    <a href={mapping.product.checkoutLink} target="_blank" rel="noopener noreferrer">
                    Checkout
                    </a>
                  </div>
                  ))}
                </div>
        )}
      </div>
    </div>
  );
};
