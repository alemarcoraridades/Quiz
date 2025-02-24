import React from 'react';
import { Question } from '@/types/quiz';
import { MultipleChoice } from './MultipleChoice';
import { TextResponse } from './TextResponse';
import { RatingResponse } from './RatingResponse';
import { BooleanResponse } from './BooleanResponse';

interface QuestionOptionsProps {
  question: Question;
  answer?: string | number | boolean;
  onAnswer: (value: string | number | boolean) => void;
}

export const QuestionOptions: React.FC<QuestionOptionsProps> = ({
  question,
  answer,
  onAnswer,
}) => {
  // Debugging: Log the question and answer
  console.log("QuestionOptions - Question:", question);
  console.log("QuestionOptions - Answer:", answer);

  const handleAnswer = (value: string | number | boolean) => {
    console.log("QuestionOptions - Answer selected:", value); // Debugging
    console.log("onAnswer is a function:", typeof onAnswer === 'function'); // Debugging
    onAnswer(value);
  };

  switch (question.type) {
    case 'multiple-choice':
      return (
        <MultipleChoice
          options={question.options || []}
          selectedOption={answer as string}
          onChange={handleAnswer}
        />
      );
    case 'text':
      return (
        <TextResponse
          value={answer as string}
          onChange={handleAnswer}
          validations={question.validations}
        />
      );
    case 'rating':
      return (
        <RatingResponse
          value={answer as number}
          onChange={handleAnswer}
        />
      );
    case 'boolean':
      return (
        <BooleanResponse
          value={answer as boolean}
          onChange={handleAnswer}
        />
      );
    default:
      return null;
  }
};
