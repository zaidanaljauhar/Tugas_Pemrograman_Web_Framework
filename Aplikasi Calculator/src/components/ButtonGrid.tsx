import React from 'react';
import Button from './Button';
import '../styles/ButtonGrid.css';

interface ButtonGridProps {
  onDigitClick: (digit: string) => void;
  onOperatorClick: (operator: string) => void;
  onEqualsClick: () => void;
  onClearClick: () => void;
}

const ButtonGrid: React.FC<ButtonGridProps> = ({
  onDigitClick,
  onOperatorClick,
  onEqualsClick,
  onClearClick,
}) => {
  const renderButton = (label: string, clickHandler: () => void) => {
    return <Button label={label} onClick={clickHandler} />;
  };

  return (
    <div className="button-grid">
      <div className="button-row">
        {renderButton('1', () => onDigitClick('1'))}
        {renderButton('2', () => onDigitClick('2'))}
        {renderButton('3', () => onDigitClick('3'))}
        {renderButton('4', () => onDigitClick('4'))}
      </div>
      <div className="button-row">
        {renderButton('5', () => onDigitClick('5'))}
        {renderButton('6', () => onDigitClick('6'))}
        {renderButton('7', () => onDigitClick('7'))}
        {renderButton('8', () => onDigitClick('8'))}
      </div>
      <div className="button-row">
        {renderButton('9', () => onDigitClick('9'))}
        {renderButton('0', () => onDigitClick('0'))}
        {renderButton('+', () => onOperatorClick('+'))}
        {renderButton('-', () => onOperatorClick('-'))}
      </div>
      <div className="button-row">
        {renderButton('*', () => onOperatorClick('*'))}
        {renderButton('/', () => onOperatorClick('/'))}
        {renderButton('=', onEqualsClick)}
        {renderButton('C', onClearClick)}
      </div>
    </div>
  );
};

export default ButtonGrid;