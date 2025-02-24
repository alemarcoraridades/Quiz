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
    console.log("useQuizResponses - Setting answer:", questionId, value); // Debugging    
    console.log("Answers state:", answers); // Debugging
  setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const clearResponses = () => {
    console.log("useQuizResponses - Clearing responses"); // Debugging
    setAnswers({});
  };

  const getResponseStats = (totalQuestions: number): ResponseStats => {
    const responses = Object.values(answers);
    const ratingResponses = responses.filter(r => typeof r === 'number') as number[];
    const textResponses = responses.filter(r => typeof r === 'string' && !r.startsWith('choice:')); // Example logic
    const multipleChoiceResponses = responses.filter(r => typeof r === 'string' && r.startsWith('choice:')); // Example logic
    
    return {
      totalQuestions,
      answeredQuestions: responses.length,
      completionRate: (responses.length / totalQuestions) * 100,
      averageRating: ratingResponses.length > 0 
        ? ratingResponses.reduce((a, b) => a + b, 0) / ratingResponses.length 
        : undefined,
      textResponseCount: textResponses.length,
      multipleChoiceCount: multipleChoiceResponses.length,
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
