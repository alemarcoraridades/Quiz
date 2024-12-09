import React from 'react';
import { Question } from '@/types/quiz';

interface TextResponseProps {
  value?: string;
  onChange: (value: string) => void;
  validations?: Question['validations'];
}

export const TextResponse: React.FC<TextResponseProps> = ({
  value = '',
  onChange,
  validations,
}) => (
  <textarea
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px] resize-y"
    placeholder="Type your answer here..."
    minLength={validations?.minLength}
    maxLength={validations?.maxLength}
    pattern={validations?.pattern}
  />
);