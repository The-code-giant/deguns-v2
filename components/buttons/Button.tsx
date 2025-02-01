'use client'
import { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge'; // You'll need to install this package

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'medium' | 'large' | 'none';
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'success';
  variant?: 'text' | 'outlined' | 'contained';
  fullwidth?: boolean;
}

const Button = ({
  children,
  className,
  color = 'primary',
  size = 'small',
  variant = 'contained',
  fullwidth = false,
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles = 'flex items-center justify-center font-semibold transition-all duration-150 outline-none';
  
  const sizeStyles = {
    small: 'h-10 px-6 text-sm',
    medium: 'h-12 px-8 text-base',
    large: 'h-14 px-8 text-base',
    none: ''
  };

  const colorStyles = {
    primary: {
      text: 'text-blue-600 hover:bg-blue-50',
      outlined: 'border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white',
      contained: 'bg-blue-600 text-white hover:bg-blue-700'
    },
    secondary: {
      text: 'text-gray-600 hover:bg-gray-50',
      outlined: 'border border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white',
      contained: 'bg-gray-600 text-white hover:bg-gray-700'
    },
    error: {
      text: 'text-red-600 hover:bg-red-50',
      outlined: 'border border-red-600 text-red-600 hover:bg-red-600 hover:text-white',
      contained: 'bg-red-600 text-white hover:bg-red-700'
    },
    warning: {
      text: 'text-yellow-600 hover:bg-yellow-50',
      outlined: 'border border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white',
      contained: 'bg-yellow-600 text-white hover:bg-yellow-700'
    },
    success: {
      text: 'text-green-600 hover:bg-green-50',
      outlined: 'border border-green-600 text-green-600 hover:bg-green-600 hover:text-white',
      contained: 'bg-green-600 text-white hover:bg-green-700'
    }
  };

  const disabledStyles = 'disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed disabled:border-gray-200';
  const fullwidthStyles = fullwidth ? 'w-full' : 'w-auto';

  return (
    <button
      className={twMerge(
        baseStyles,
        sizeStyles[size],
        colorStyles[color][variant],
        disabledStyles,
        fullwidthStyles,
        'rounded-md',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
