import React from 'react';
import Button from './Button';

interface ButtonPanelProps {
  onButtonClick: (value: string) => void;
}

const ButtonPanel: React.FC<ButtonPanelProps> = ({ onButtonClick }) => {
  const buttons = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', 'C', '=', '+']
  ];

  return (
    <div className="grid grid-cols-4 gap-3">
      {buttons.map((row, rowIndex) => (
        <React.Fragment key={`row-${rowIndex}`}>
          {row.map((button) => {
            let className = '';
            if (['+', '-', '*', '/', '='].includes(button)) {
              className = 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700';
            } else if (button === 'C') {
              className = 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700';
            } else {
              className = 'bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400';
            }

            return (
              <div key={button}>
                <Button value={button} onClick={onButtonClick} className={className} />
              </div>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ButtonPanel;