import React from 'react';
import { Check, X, RefreshCcw, LogOut } from 'lucide-react';
import { Quiz } from '@/types/quiz';
import { Button } from '../ui/button';

interface QuizResultsProps {
  quiz: Quiz;
  answers: Record<string, string | number | boolean>;
  onRestart: () => void;
  onClose: () => void;
}

export const QuizResults: React.FC<QuizResultsProps> = ({
  quiz,
  answers,
  onRestart,
  onClose,
}) => {
  const getAnswerDisplay = (questionId: string) => {
    const question = quiz.questions.find((q) => q.id === questionId);
    const answer = answers[questionId];

    if (!question || answer === undefined) {
      return 'Not answered';
    }

    switch (question.type) {
      case 'multiple-choice':
        return answer as string;
      case 'text':
        return answer as string;
      case 'rating':
        return `${answer}/5`;
      case 'boolean':
        return answer ? 'Yes' : 'No';
      default:
        return String(answer);
    }
  };

  const answeredQuestions = quiz.questions.filter(
    (q) => answers[q.id] !== undefined
  );

  const completionRate = Math.round(
    (answeredQuestions.length / quiz.questions.length) * 100
  );

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-4">
          <span className="text-3xl font-bold text-blue-600">{completionRate}%</span>
        </div>
        <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
        <p className="text-lg text-gray-600">
          You answered {answeredQuestions.length} out of {quiz.questions.length} questions
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-xl font-semibold mb-6">Your Responses</h3>
        <div className="space-y-6">
          {quiz.questions.map((question, index) => (
            <div
              key={question.id}
              className="p-6 rounded-lg bg-gray-50 border border-gray-100"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-sm font-medium">
                      {index + 1}
                    </span>
                    <h4 className="font-medium text-lg">{question.title}</h4>
                  </div>
                  {question.description && (
                    <p className="text-gray-600 mb-3">{question.description}</p>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">Your answer:</span>
                    <span className="text-gray-900">{getAnswerDisplay(question.id)}</span>
                  </div>
                </div>
                {answers[question.id] !== undefined ? (
                  <Check className="w-6 h-6 text-green-500 flex-shrink-0" />
                ) : (
                  <X className="w-6 h-6 text-red-500 flex-shrink-0" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <Button
          variant="outline"
          onClick={onRestart}
          leftIcon={<RefreshCcw className="w-4 h-4" />}
        >
          Take Quiz Again
        </Button>
        <Button
          onClick={onClose}
          leftIcon={<LogOut className="w-4 h-4" />}
        >
          Exit Quiz
        </Button>
      </div>
    </div>
  );
};