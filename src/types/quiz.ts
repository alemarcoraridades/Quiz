export interface Question {
  id: string;
  type: 'multiple-choice' | 'text' | 'rating' | 'boolean';
  title: string;
  description?: string;
  options?: string[];
  required: boolean;
  validations?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  theme: {
    primaryColor: string;
    backgroundColor: string;
    fontFamily: string;
  };
  settings: {
    showProgressBar: boolean;
    allowSkip: boolean;
    shuffleQuestions: boolean;
    showQuestionNumbers: boolean;
    showDescription: boolean;
  };
  publishStatus: 'draft' | 'published' | 'archived';
  publishedAt?: string;
  expiresAt?: string;
  accessCode?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PublishSettings {
  expiresAt?: string;
  accessCode?: string;
}