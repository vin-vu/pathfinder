import { Grid, Box } from '@mui/material';
import { BoardCell } from './Maze';

interface MazeCellProps {
  cell: BoardCell;
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

export default function MazeCell({ cell }: MazeCellProps) {
  return (
    <Grid item>
      <Box
        sx={{
          height: '30px',
          width: '30px',
          border: '1px solid gray',
          backgroundColor: handleCellBackgroundColor(cell),
        }}
      ></Box>
    </Grid>
  );
}
