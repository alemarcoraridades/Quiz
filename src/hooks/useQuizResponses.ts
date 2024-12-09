import { useState } from 'react';

interface ResponseStats {
  totalQuestions: number;
  answeredQuestions: number;
  completionRate: number;
  averageRating?: number;
  textResponseCount: number;
  multipleChoiceCount: number;
  booleanCount: number;
}

export const useQuizResponses = () => {
  const [answers, setAnswers] = useState<Record<string, string | number | boolean>>({});

  const setAnswer = (questionId: string, value: string | number | boolean) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const clearResponses = () => {
    setAnswers({});
  };

  const getResponseStats = (): ResponseStats => {
    const responses = Object.values(answers);
    const ratingResponses = responses.filter(r => typeof r === 'number') as number[];
    
    return {
      totalQuestions: 0, // This will be set by the quiz component
      answeredQuestions: responses.length,
      completionRate: 0, // This will be calculated by the quiz component
      averageRating: ratingResponses.length > 0 
        ? ratingResponses.reduce((a, b) => a + b, 0) / ratingResponses.length 
        : undefined,
      textResponseCount: responses.filter(r => typeof r === 'string').length,
      multipleChoiceCount: responses.filter(r => typeof r === 'string').length,
      booleanCount: responses.filter(r => typeof r === 'boolean').length
    };
  };

  return {
    answers,
    setAnswer,
    clearResponses,
    getResponseStats
  };
};