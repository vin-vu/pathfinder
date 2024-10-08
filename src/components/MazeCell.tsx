import { Grid, Box } from '@mui/material';
import { BoardCell } from '../App';

interface MazeCellProps {
  onMouseDown: (coordinates: string) => void;
  onMouseMove: (coordinates: string) => void;
  cell: BoardCell;
  coordinates: string;
}

const handleCellBackgroundColor = (cell: BoardCell): string => {
  if (cell.startNode) {
    return 'blue';
  } else if (cell.targetNode) {
    return 'red';
  } else if (cell.wall) {
    return 'black';
  } else if (cell.highlighted) {
    return 'orange';
  }
  return 'white';
};

const handleTransition = (cell: BoardCell): string => {
  if (cell.highlighted) {
    return 'background-color 0.2s ease-in-out';
  } else {
    return '0';
  }
};

export default function MazeCell({
  cell,
  coordinates,
  onMouseDown,
  onMouseMove,
}: MazeCellProps) {
  return (
    <Grid item role="gridcell">
      <Box
        sx={{
          height: '30px',
          width: '30px',
          border: '1px solid gray',
          backgroundColor: handleCellBackgroundColor(cell),
          transition: handleTransition(cell),
        }}
        onMouseDown={() => onMouseDown(coordinates)}
        onMouseMove={() => onMouseMove(coordinates)}
      ></Box>
    </Grid>
  );
}
