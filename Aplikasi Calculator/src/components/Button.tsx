import React from 'react';

interface ButtonProps {
  value: string;
  onClick: (value: string) => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ value, onClick, className = '' }) => {
  const handleClick = () => {
    onClick(value);
  };

  return (
    <button 
      className={`w-full h-16 rounded-lg text-2xl font-medium transition-all 
                 duration-150 transform hover:brightness-110 active:scale-95 
                 focus:outline-none ${className}`}
      onClick={handleClick}
    >
      {value}
    </button>
  );
};

export default Button;