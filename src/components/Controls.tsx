import React from 'react';
import { Difficulty } from '../types/sudoku';
import { RefreshCw, Trash2, Lightbulb } from 'lucide-react';

interface ControlsProps {
  difficulty: Difficulty;
  onNewGame: () => void;
  onClear: () => void;
  onHint: () => void;
  onDifficultyChange: (difficulty: Difficulty) => void;
}

export const Controls: React.FC<ControlsProps> = ({
  difficulty,
  onNewGame,
  onClear,
  onHint,
  onDifficultyChange,
}) => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex gap-2">
        {(['easy', 'medium', 'hard'] as Difficulty[]).map((d) => (
          <button
            key={d}
            onClick={() => onDifficultyChange(d)}
            className={`
              px-4 py-2 rounded-lg capitalize
              ${difficulty === d
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
              }
            `}
          >
            {d}
          </button>
        ))}
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={onNewGame}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <RefreshCw size={16} /> New Game
        </button>
        
        <button
          onClick={onClear}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          <Trash2 size={16} /> Clear
        </button>
        
        <button
          onClick={onHint}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
        >
          <Lightbulb size={16} /> Hint
        </button>
      </div>
    </div>
  );
};