import { Grid, Box } from '@mui/material';
import { CursorModeType } from '../types/CursorTypes';
import { BoardCell, MouseStatuses } from '../App';

interface MazeCellProps {
  setStartCoordinates: React.Dispatch<React.SetStateAction<string>>;
  setTargetCoordinates: React.Dispatch<React.SetStateAction<string>>;
  // setMouseStatus: React.Dispatch<React.SetStateAction<MouseStatuses>>;
  // mouseStatus: MouseStatuses;
  onMouseDown: (coordinates: string) => void;
  onMouseMove: (coordinates: string) => void;
  onMouseUp: () => void;
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
  } else if (cell.wall) {
    return 'black';
  }
  return 'white';
};

export default function MazeCell({
  cell,
  coordinates,
  setStartCoordinates,
  setTargetCoordinates,
  // setMouseStatus,
  // mouseStatus,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  cursorMode,
}: MazeCellProps) {
  // const updateStartCoordinates = (
  //   coordinates: string,
  //   cursorMode: CursorModeType
  // ) => {
  //   if (cursorMode === 'start') {
  //     console.log('clicked start coordinates: ', coordinates);
  //     setStartCoordinates(coordinates);
  //   } else if (cursorMode === 'target') {
  //     console.log('clicked target coordinates: ', coordinates);
  //     setTargetCoordinates(coordinates);
  //   } 
  //   // else if (cursorMode === 'walls') {
  //   //   console.log('clicked wall coordinates: ', coordinates);
  //   // }
  // };

  return (
    <Grid item>
      <Box
        sx={{
          height: '30px',
          width: '30px',
          border: '1px solid gray',
          backgroundColor: handleCellBackgroundColor(cell),
        }}
        // onMouseDown={() => updateStartCoordinates(coordinates, cursorMode)}
        onMouseDown={() => onMouseDown(coordinates)}
        onMouseMove={() => onMouseMove(coordinates)}
        onMouseUp={() => onMouseUp()}

      ></Box>
    </Grid>
  );
}
