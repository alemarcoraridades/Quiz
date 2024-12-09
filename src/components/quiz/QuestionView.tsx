import React from 'react';
import { Question } from '@/types/quiz';
import { ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { QuestionOptions } from './question-types/QuestionOptions';

interface QuestionViewProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  answer?: string | number | boolean;
  onAnswer: (value: string | number | boolean) => void;
  allowSkip: boolean;
  onNext: () => void;
  onPrevious: () => void;
  isLastQuestion: boolean;
}

export const QuestionView: React.FC<QuestionViewProps> = ({
  question,
  questionIndex,
  totalQuestions,
  answer,
  onAnswer,
  allowSkip,
  onNext,
  onPrevious,
  isLastQuestion,
}) => {
  const isRequired = question.required && !allowSkip;
  const isAnswered = answer !== undefined;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-500">
            Question {questionIndex + 1} of {totalQuestions}
          </span>
          {isRequired && (
            <span className="inline-flex items-center text-sm font-medium text-red-600">
              <AlertCircle className="w-4 h-4 mr-1" />
              Required
            </span>
          )}
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
          {question.title}
        </h2>
        {question.description && (
          <p className="text-gray-600 text-lg">{question.description}</p>
        )}
      </div>

      <QuestionOptions
        question={question}
        answer={answer}
        onAnswer={onAnswer}
      />

      <div className="flex justify-between items-center mt-8">
        <Button
          onClick={onPrevious}
          disabled={questionIndex === 0}
          variant="outline"
          leftIcon={<ChevronLeft className="w-4 h-4" />}
        >
          Previous
        </Button>
        <div className="text-sm text-gray-500">
          {isAnswered ? (
            <span className="text-green-600">✓ Question answered</span>
          ) : isRequired ? (
            <span className="text-red-600">* Response required</span>
          ) : (
            <span>Optional question</span>
          )}
        </div>
        <Button
          onClick={onNext}
          disabled={isRequired && !isAnswered}
          rightIcon={<ChevronRight className="w-4 h-4" />}
        >
          {isLastQuestion ? 'Finish' : 'Next'}
        </Button>
      </div>
    </div>
  );
};