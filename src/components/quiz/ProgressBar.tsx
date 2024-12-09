import React from 'react';

interface ProgressBarProps {
  progress: number;
  primaryColor: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  primaryColor,
}) => (
  <div className="w-full h-2 bg-gray-100 rounded-full mb-8 overflow-hidden">
    <div
      className="h-full rounded-full transition-all duration-500 ease-out"
      style={{
        width: `${progress}%`,
        backgroundColor: primaryColor,
      }}
    />
  </div>
);