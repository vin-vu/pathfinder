import { Grid, Box } from '@mui/material';
import { BoardCell } from './Maze';
import { CursorModeType } from '../types/CursorTypes';

interface MazeCellProps {
  setStartCoordinates: React.Dispatch<React.SetStateAction<string>>;
  setTargetCoordinates: React.Dispatch<React.SetStateAction<string>>;
  cell: BoardCell;
  coordinates: string;
  cursorMode: CursorModeType;
}

const handleCellBackgroundColor = (cell: BoardCell): string => {
  if (cell.visited) {
    return 'black';
  } else if (cell.startNode) {
    return 'blue';
  } else if (cell.targetNode) {
    return 'red';
  }
  return 'white';
};

export default function MazeCell({
  cell,
  coordinates,
  setStartCoordinates,
  setTargetCoordinates,
  cursorMode,
}: MazeCellProps) {
  const updateStartCoordinates = (
    coordinates: string,
    cursorMode: CursorModeType
  ) => {
    if (cursorMode === 'start') {
      console.log('clicked start coordinates: ', coordinates);
      setStartCoordinates(coordinates);
    } else if (cursorMode === 'target') {
      console.log('clicked target coordinates: ', coordinates);

      setTargetCoordinates(coordinates);
    }
  };

  return (
    <Grid item>
      <Box
        sx={{
          height: '30px',
          width: '30px',
          border: '1px solid gray',
          backgroundColor: handleCellBackgroundColor(cell),
        }}
        onMouseDown={() => updateStartCoordinates(coordinates, cursorMode)}
      ></Box>
    </Grid>
  );
}
