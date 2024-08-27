import { Grid, Box } from '@mui/material';
import { BoardCell } from '../App';

interface MazeCellProps {
  onMouseDown: (coordinates: string) => void;
  onMouseMove: (coordinates: string) => void;
  cell: BoardCell;
  coordinates: string;
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
  onMouseDown,
  onMouseMove,
}: MazeCellProps) {
  return (
    <Grid item>
      <Box
        sx={{
          height: '30px',
          width: '30px',
          border: '1px solid gray',
          backgroundColor: handleCellBackgroundColor(cell),
        }}
        onMouseDown={() => onMouseDown(coordinates)}
        onMouseMove={() => onMouseMove(coordinates)}
      ></Box>
    </Grid>
  );
}
