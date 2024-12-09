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
  switch (question.type) {
    case 'multiple-choice':
      return (
        <MultipleChoice
          options={question.options || []}
          selectedOption={answer as string}
          onChange={onAnswer}
        />
      );
    case 'text':
      return (
        <TextResponse
          value={answer as string}
          onChange={onAnswer}
          validations={question.validations}
        />
      );
    case 'rating':
      return (
        <RatingResponse
          value={answer as number}
          onChange={onAnswer}
        />
      );
    case 'boolean':
      return (
        <BooleanResponse
          value={answer as boolean}
          onChange={onAnswer}
        />
      );
    default:
      return null;
  }
};