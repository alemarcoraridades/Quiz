import React from 'react';

interface BooleanResponseProps {
  value?: boolean;
  onChange: (value: boolean) => void;
}

export const BooleanResponse: React.FC<BooleanResponseProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onChange(true)} // Call onChange when the user selects "true"
        className={`p-2 border rounded-md ${
          value === true ? 'bg-blue-100 border-blue-500' : 'hover:bg-gray-100'
        }`}
      >
        True
      </button>
      <button
        onClick={() => onChange(false)} // Call onChange when the user selects "false"
        className={`p-2 border rounded-md ${
          value === false ? 'bg-blue-100 border-blue-500' : 'hover:bg-gray-100'
        }`}
      >
        False
      </button>
    </div>
  );
};
