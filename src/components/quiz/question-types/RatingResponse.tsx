import React from 'react';

interface RatingResponseProps {
  value?: number;
  onChange: (value: number) => void;
}

export const RatingResponse: React.FC<RatingResponseProps> = ({
  value,
  onChange,
}) => (
  <div className="flex space-x-4 justify-center">
    {[1, 2, 3, 4, 5].map((rating) => (
      <button
        key={rating}
        onClick={() => onChange(rating)}
        className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium transition-all ${
          value === rating
            ? 'bg-blue-600 text-white ring-2 ring-blue-600 ring-offset-2'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
        }`}
      >
        {rating}
      </button>
    ))}
  </div>
);