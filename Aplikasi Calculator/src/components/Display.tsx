import React from 'react';
import '../styles/Display.css';

interface DisplayProps {
  value: string;
}

const Display: React.FC<DisplayProps> = ({ value }) => {
  return (
    <div className="display">
      <input 
        type="text" 
        className="display-input" 
        value={value} 
        readOnly 
      />
    </div>
  );
};

export default Display;