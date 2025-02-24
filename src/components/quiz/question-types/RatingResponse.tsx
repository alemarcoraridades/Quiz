import React from 'react';

interface RatingResponseProps {
  value?: number;
  onChange: (value: number) => void;
}

export const RatingResponse: React.FC<RatingResponseProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onChange(star)} // Call onChange when the user selects a rating
          className={`text-2xl ${
            value === star ? 'text-yellow-500' : 'text-gray-300'
          }`}
        >
          ⭐
        </button>
      ))}
    </div>
  );
};
