import React, { useState, useEffect } from 'react';
import { Cell as CellType, Board, Difficulty } from './types/sudoku';
import { generateSudoku, validateBoard } from './utils/sudokuGenerator';
import { Cell } from './components/Cell';
import { Controls } from './components/Controls';
import { Numpad } from './components/Numpad';
import { Github } from 'lucide-react';

function App() {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [board, setBoard] = useState<Board>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const initializeBoard = () => {
    const puzzle = generateSudoku(difficulty);
    const newBoard: Board = puzzle.map(row =>
      row.map(value => ({
        value,
        isFixed: value !== 0,
        isSelected: false,
        isValid: true,
        notes: []
      }))
    );
    setBoard(newBoard);
    setSelectedCell(null);
    setIsComplete(false);
  };

  useEffect(() => {
    initializeBoard();
  }, [difficulty]);

  const handleCellClick = (row: number, col: number) => {
    const newBoard = board.map((r, i) =>
      r.map((cell, j) => ({
        ...cell,
        isSelected: i === row && j === col
      }))
    );
    setBoard(newBoard);
    setSelectedCell([row, col]);
  };

  const handleNumberSelect = (num: number) => {
    if (!selectedCell) return;
    const [row, col] = selectedCell;
    if (board[row][col].isFixed) return;

    const newBoard = [...board];
    newBoard[row][col] = {
      ...newBoard[row][col],
      value: num,
      notes: []
    };

    // Validate the board
    const numberBoard = newBoard.map(row => row.map(cell => cell.value));
    const isValid = validateBoard(numberBoard);
    
    // Check if the game is complete
    const isBoardFull = newBoard.every(row => 
      row.every(cell => cell.value !== 0)
    );

    if (isBoardFull && isValid) {
      setIsComplete(true);
    }

    setBoard(newBoard);
  };

  const handleDelete = () => {
    if (!selectedCell) return;
    const [row, col] = selectedCell;
    if (board[row][col].isFixed) return;

    const newBoard = [...board];
    newBoard[row][col] = {
      ...newBoard[row][col],
      value: 0,
      notes: []
    };
    setBoard(newBoard);
  };

  const handleNoteToggle = (row: number, col: number, note: number) => {
    if (board[row][col].isFixed) return;

    const newBoard = [...board];
    const cell = newBoard[row][col];
    const noteIndex = cell.notes.indexOf(note);

    if (noteIndex === -1) {
      cell.notes.push(note);
    } else {
      cell.notes.splice(noteIndex, 1);
    }

    setBoard(newBoard);
  };

  const handleHint = () => {
    if (!selectedCell) return;
    const [row, col] = selectedCell;
    if (board[row][col].isFixed) return;

    // Simple hint: try each number and check if it's valid
    for (let num = 1; num <= 9; num++) {
      const testBoard = board.map(row => row.map(cell => cell.value));
      testBoard[row][col] = num;
      if (validateBoard(testBoard)) {
        handleNumberSelect(num);
        break;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 bg-blue-600 text-white">
          <h1 className="text-3xl font-bold text-center">Sudoku</h1>
          {isComplete && (
            <div className="mt-2 text-center text-green-200">
              Congratulations! You've completed the puzzle!
            </div>
          )}
        </div>

        <Controls
          difficulty={difficulty}
          onNewGame={initializeBoard}
          onClear={() => initializeBoard()}
          onHint={handleHint}
          onDifficultyChange={setDifficulty}
        />

        <div className="p-4">
          <div className="grid grid-cols-9 gap-0.5 bg-gray-300 p-0.5 aspect-square">
            {board.map((row, i) =>
              row.map((cell, j) => (
                <Cell
                  key={`${i}-${j}`}
                  cell={cell}
                  onClick={() => handleCellClick(i, j)}
                  onNoteToggle={(note) => handleNoteToggle(i, j, note)}
                />
              ))
            )}
          </div>
        </div>

        <Numpad
          onNumberSelect={handleNumberSelect}
          onDelete={handleDelete}
        />

        <div className="p-4 border-t flex justify-center">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-700 flex items-center gap-2"
          >
            <Github size={20} />
            <span>View on GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;