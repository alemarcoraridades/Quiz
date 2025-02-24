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
    finalResultScreen: {
      message: string; // Custom message for the final result screen
      productMapping: {
        questionId: string; // ID of the question
        answer: string | number | boolean; // Specific answer to map
        product: {
          imageUrl: string; // URL of the product image
          checkoutLink: string; // Link to the checkout page
        };
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
