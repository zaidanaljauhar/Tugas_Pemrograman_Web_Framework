import React, { useState } from 'react';
import Display from './Display';
import ButtonGrid from './ButtonGrid';
import '../styles/Calculator.css';

const Calculator: React.FC = () => {
  const [displayValue, setDisplayValue] = useState<string>('');
  const [prevValue, setPrevValue] = useState<string>('');
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);

  const handleDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplayValue(digit);
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
    }
  };

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(displayValue);

    if (prevValue === '') {
      setPrevValue(displayValue);
    } else if (operator) {
      const result = performCalculation(parseFloat(prevValue), inputValue, operator);
      setPrevValue(String(result));
      setDisplayValue(String(result));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const performCalculation = (
    firstOperand: number,
    secondOperand: number,
    operator: string
  ): number => {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };

  const handleEquals = () => {
    if (!operator || prevValue === '') return;

    const inputValue = parseFloat(displayValue);
    const result = performCalculation(parseFloat(prevValue), inputValue, operator);
    
    setDisplayValue(String(result));
    setPrevValue('');
    setOperator(null);
    setWaitingForOperand(true);
  };

  const handleClear = () => {
    setDisplayValue('');
    setPrevValue('');
    setOperator(null);
    setWaitingForOperand(false);
  };

  return (
    <div className="calculator">
      <Display value={displayValue} />
      <ButtonGrid
        onDigitClick={handleDigit}
        onOperatorClick={handleOperator}
        onEqualsClick={handleEquals}
        onClearClick={handleClear}
      />
    </div>
  );
};

export default Calculator;