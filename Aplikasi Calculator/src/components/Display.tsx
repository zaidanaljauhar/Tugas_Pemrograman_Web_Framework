import React from 'react';

interface DisplayProps {
  value: string;
}

const Display: React.FC<DisplayProps> = ({ value }) => {
  return (
    <div className="w-full p-4 mb-4 bg-gray-800 rounded-lg shadow-inner">
      <div className="text-right text-4xl font-mono text-white overflow-x-auto whitespace-nowrap">
        {value || '0'}
      </div>
    </div>
  );
};

export default Display;