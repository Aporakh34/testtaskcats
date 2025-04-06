
import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full py-2 px-4 border border-gray-300 bg-white hover:bg-gray-50 
                text-sm font-medium text-gray-700 focus:outline-none 
                focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 
                disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
};

export default Button;
