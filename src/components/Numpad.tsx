import React from 'react';

interface NumpadProps {
  onNumberSelect: (num: number) => void;
  onDelete: () => void;
}

export const Numpad: React.FC<NumpadProps> = ({ onNumberSelect, onDelete }) => {
  return (
    <div className="grid grid-cols-5 gap-2 p-4">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <button
          key={num}
          onClick={() => onNumberSelect(num)}
          className="w-12 h-12 flex items-center justify-center
                   bg-gray-100 rounded-lg text-xl font-semibold
                   hover:bg-gray-200 transition-colors"
        >
          {num}
        </button>
      ))}
      <button
        onClick={onDelete}
        className="w-12 h-12 flex items-center justify-center
                 bg-red-100 rounded-lg text-xl font-semibold
                 hover:bg-red-200 transition-colors"
      >
        ⌫
      </button>
    </div>
  );
};