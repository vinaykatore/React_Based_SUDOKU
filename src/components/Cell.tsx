import React from 'react';
import { Cell as CellType } from '../types/sudoku';

interface CellProps {
  cell: CellType;
  onClick: () => void;
  onNoteToggle: (note: number) => void;
}

export const Cell: React.FC<CellProps> = ({ cell, onClick, onNoteToggle }) => {
  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!cell.isFixed && !cell.value) {
      const note = parseInt(prompt('Enter note (1-9):') || '0');
      if (note >= 1 && note <= 9) {
        onNoteToggle(note);
      }
    }
  };

  return (
    <div
      className={`
        w-full h-full border border-gray-200
        flex items-center justify-center
        cursor-pointer select-none
        transition-colors duration-200
        ${cell.isSelected ? 'bg-blue-100' : 'hover:bg-gray-50'}
        ${cell.isFixed ? 'font-bold' : 'text-blue-600'}
        ${!cell.isValid ? 'text-red-500' : ''}
      `}
      onClick={onClick}
      onContextMenu={handleRightClick}
    >
      {cell.value ? (
        <span className="text-xl">{cell.value}</span>
      ) : (
        <div className="grid grid-cols-3 gap-0.5 p-0.5 text-[8px] text-gray-400">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <div key={num}>
              {cell.notes.includes(num) ? num : ''}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};