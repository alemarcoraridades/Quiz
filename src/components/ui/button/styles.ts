import { ButtonSize, ButtonVariant } from './types';

export const getButtonStyles = (
  variant: ButtonVariant,
  size: ButtonSize,
  fullWidth: boolean,
  disabled: boolean
): string => {
  const baseStyles = [
    'rounded-lg',
    'font-medium',
    'transition-all',
    'duration-200',
    'inline-flex',
    'items-center',
    'justify-center',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    fullWidth ? 'w-full' : '',
  ];

  const variantStyles: Record<ButtonVariant, string[]> = {
    primary: [
      'bg-blue-600',
      'text-white',
      'hover:bg-blue-700',
      'active:bg-blue-800',
      'focus:ring-blue-500',
    ],
    secondary: [
      'bg-gray-100',
      'text-gray-900',
      'hover:bg-gray-200',
      'active:bg-gray-300',
      'focus:ring-gray-500',
    ],
    outline: [
      'border-2',
      'border-gray-300',
      'hover:border-gray-400',
      'active:bg-gray-50',
      'focus:ring-gray-500',
    ],
  };

  const sizeStyles: Record<ButtonSize, string[]> = {
    sm: ['px-3', 'py-1.5', 'text-sm'],
    md: ['px-4', 'py-2', 'text-base'],
    lg: ['px-6', 'py-3', 'text-lg'],
  };

  return [...baseStyles, ...variantStyles[variant], ...sizeStyles[size]].filter(Boolean).join(' ');
};