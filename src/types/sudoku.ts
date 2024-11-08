export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Cell {
  value: number;
  isFixed: boolean;
  isSelected: boolean;
  isValid: boolean;
  notes: number[];
}

export type Board = Cell[][];