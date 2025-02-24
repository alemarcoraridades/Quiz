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
}) => {
  // Debugging: Log the options and selected option
  console.log("MultipleChoice - Options:", options);
  console.log("MultipleChoice - Selected Option:", selectedOption);
  console.log("onChange is a function:", typeof onChange === 'function'); // Debugging

  const handleOptionChange = (value: string) => {
    console.log("MultipleChoice - Option selected:", value); // Debugging
    onChange(value);
  };

  return (
    <div>
      {options.map((option, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <input
            type="radio"
            id={`option-${index}`}
            name="answer"
            value={option}
            checked={selectedOption === option}
            onChange={() => handleOptionChange(option)}
            style={{ marginRight: '8px' }} // Add some spacing
          />
          <label htmlFor={`option-${index}`}>{option}</label>
        </div>
      ))}
    </div>
  );
};
