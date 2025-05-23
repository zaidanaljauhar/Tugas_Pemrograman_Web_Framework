import React, { useState } from 'react';
import Display from './components/Display';
import ButtonPanel from './components/ButtonPanel';

function App() {
  const [display, setDisplay] = useState('0');
  const [operator, setOperator] = useState<string | null>(null);
  const [firstOperand, setFirstOperand] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleButtonClick = (value: string) => {
    if (value === 'C') {
      setDisplay('0');
      setOperator(null);
      setFirstOperand(null);
      setNewNumber(true);
      return;
    }

    if ('0123456789'.includes(value)) {
      if (display === '0' || newNumber) {
        setDisplay(value);
        setNewNumber(false);
      } else {
        setDisplay(display + value);
      }
      return;
    }

    if (['+', '-', '*', '/'].includes(value)) {
      setOperator(value);
      setFirstOperand(display);
      setNewNumber(true);
      return;
    }

    if (value === '=' && operator && firstOperand) {
      const num1 = parseFloat(firstOperand);
      const num2 = parseFloat(display);
      let result = 0;

      switch (operator) {
        case '+':
          result = num1 + num2;
          break;
        case '-':
          result = num1 - num2;
          break;
        case '*':
          result = num1 * num2;
          break;
        case '/':
          result = num2 !== 0 ? num1 / num2 : 0;
          break;
      }

      setDisplay(result.toString());
      setOperator(null);
      setFirstOperand(null);
      setNewNumber(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <Display value={display} />
        <ButtonPanel onButtonClick={handleButtonClick} />
      </div>
    </div>
  );
}

export default App;