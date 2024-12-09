import React from 'react';

interface MultipleChoiceProps {
  options: string[];
  selectedOption?: string;
  onChange: (value: string) => void;
}

export const MultipleChoice: React.FC<MultipleChoiceProps> = ({
  options,
  selectedOption,
  onChange,
}) => (
  <div className="space-y-3">
    {options.map((option, index) => (
      <label
        key={index}
        className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer"
      >
        <input
          type="radio"
          value={option}
          checked={selectedOption === option}
          onChange={(e) => onChange(e.target.value)}
          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
        />
        <span className="ml-3 text-gray-700">{option}</span>
      </label>
    ))}
  </div>
);