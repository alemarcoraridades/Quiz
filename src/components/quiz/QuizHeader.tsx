import React from 'react';

interface QuizHeaderProps {
  title: string;
  description: string;
  primaryColor: string;
}

export const QuizHeader: React.FC<QuizHeaderProps> = ({
  title,
  description,
  primaryColor,
}) => (
  <div>
    <h1 
      className="text-3xl font-bold mb-3" 
      style={{ color: primaryColor }}
    >
      {title}
    </h1>
    <p className="text-gray-600 text-lg">{description}</p>
  </div>
);