import { Grid } from '@mui/material';
import { CursorModeType } from '../types/CursorTypes';
import MazeCell from './MazeCell';
import { Board, MouseStatuses } from '../App';

interface MazeProps {
  board: Board;
  setStartCoordinates: React.Dispatch<React.SetStateAction<string>>;
  setTargetCoordinates: React.Dispatch<React.SetStateAction<string>>;
  onMouseDown: (coordinates: string) => void;
  onMouseMove: (coordinates: string) => void;
  onMouseUp: () => void;
  cursorMode: CursorModeType;
  columns: number;
}

export default function Maze({
  board,
  setStartCoordinates,
  setTargetCoordinates,
  onMouseDown,
  onMouseMove,
  onMouseUp,
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
          onMouseDown={() => onMouseDown(key)}
          onMouseMove={() => onMouseMove(key)}
          onMouseUp={() => onMouseUp()}
          // setMouseStatus={setMouseStatus}
          // mouseStatus={mouseStatus}
          cursorMode={cursorMode}
        />
      ))}
    </Grid>
  );
}
