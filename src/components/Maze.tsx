import { useEffect } from 'react';
import { Grid } from '@mui/material';
import { CursorModeType } from '../types/CursorTypes';
import MazeCell from './MazeCell';
import { Board } from '../App';

interface MazeProps {
  board: Board;
  startCoordinates: string;
  targetCoordinates: string;
  setBoard: React.Dispatch<React.SetStateAction<Board>>;
  setStartCoordinates: React.Dispatch<React.SetStateAction<string>>;
  setTargetCoordinates: React.Dispatch<React.SetStateAction<string>>;
  cursorMode: CursorModeType;
}

export default function Maze({
  board,
  setBoard,
  startCoordinates,
  setStartCoordinates,
  targetCoordinates,
  setTargetCoordinates,
  cursorMode,
}: MazeProps) {
  const rows: number = 15;
  const columns: number = 30;

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
  }, [startCoordinates, targetCoordinates]);

  return (
    <Grid
      container
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {Object.entries(board).map(([key, cell]) => (
        <MazeCell
          key={key}
          cell={cell}
          coordinates={key}
          setStartCoordinates={setStartCoordinates}
          setTargetCoordinates={setTargetCoordinates}
          cursorMode={cursorMode}
        />
      ))}
    </Grid>
  );
}
