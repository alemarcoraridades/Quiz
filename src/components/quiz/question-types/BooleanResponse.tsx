import React from 'react';

interface BooleanResponseProps {
  value?: boolean;
  onChange: (value: boolean) => void;
}

export const BooleanResponse: React.FC<BooleanResponseProps> = ({
  value,
  onChange,
}) => (
  <div className="flex justify-center space-x-6">
    {['Yes', 'No'].map((option) => (
      <button
        key={option}
        onClick={() => onChange(option === 'Yes')}
        className={`px-8 py-3 rounded-lg font-medium transition-all ${
          value === (option === 'Yes')
            ? 'bg-blue-600 text-white ring-2 ring-blue-600 ring-offset-2'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
        }`}
      >
        {option}
      </button>
    ))}
  </div>
);