import React from 'react';
import '../styles/Button.css';

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button 
      className="calculator-button" 
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;