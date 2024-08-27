import { Grid } from '@mui/material';
import MazeCell from './MazeCell';
import { Board } from '../App';

interface MazeProps {
  board: Board;
  onMouseDown: (coordinates: string) => void;
  onMouseMove: (coordinates: string) => void;
  columns: number;
}

export default function Maze({
  board,
  onMouseDown,
  onMouseMove,
  columns,
}: MazeProps) {
  return (
    <Grid
      container
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {Object.entries(board).map(([coordinates, cell]) => (
        <MazeCell
          key={coordinates}
          cell={cell}
          coordinates={coordinates}
          onMouseDown={() => onMouseDown(coordinates)}
          onMouseMove={() => onMouseMove(coordinates)}
        />
      ))}
    </Grid>
  );
}
