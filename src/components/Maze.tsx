import { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { CursorModeType } from '../types/CursorTypes';
import MazeCell from './MazeCell';

interface MazeProps {
  cursorMode: CursorModeType;
}

export interface BoardCell {
  visited: boolean;
  startNode: boolean;
  targetNode: boolean;
}

type Board = {
  [key: string]: BoardCell;
};

export default function Maze({ cursorMode }: MazeProps) {
  console.log('cursor mode: ', cursorMode);
  const [board, setBoard] = useState<Board>({});

  const rows: number = 15;
  const columns: number = 30;
  const startCoordinates: string = '7,6';
  const targetCoordinates: string = '7,23';

  useEffect(() => {
    const newBoard: Board = {};
    for (let i = 0; i < rows; i += 1) {
      for (let j = 0; j < columns; j += 1) {
        const coordinates: string = `${i},${j}`;
        if (coordinates === startCoordinates) {
          newBoard[coordinates] = {
            visited: false,
            startNode: true,
            targetNode: false,
          };
        } else if (coordinates === targetCoordinates) {
          newBoard[coordinates] = {
            visited: false,
            startNode: false,
            targetNode: true,
          };
        } else {
          newBoard[coordinates] = {
            visited: false,
            startNode: false,
            targetNode: false,
          };
        }
      }
    }
    setBoard(newBoard);
  }, []);

  return (
    <Grid
      container
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {Object.entries(board).map(([key, cell]) => (
        <MazeCell key={key} cell={cell} />
      ))}
    </Grid>
  );
}
