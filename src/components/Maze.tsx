import { Grid } from '@mui/material';
import { CursorModeType } from '../types/CursorTypes';
import MazeCell from './MazeCell';
import { Board } from '../App';

interface MazeProps {
  board: Board;
  setStartCoordinates: React.Dispatch<React.SetStateAction<string>>;
  setTargetCoordinates: React.Dispatch<React.SetStateAction<string>>;
  cursorMode: CursorModeType;
  columns: number;
}

export default function Maze({
  board,
  setStartCoordinates,
  setTargetCoordinates,
  cursorMode,
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
