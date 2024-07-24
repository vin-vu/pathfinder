import { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';

interface BoardCell {
  visited: boolean;
  startNode: boolean;
  targetNode: boolean;
}

type Board = {
  [key: string]: BoardCell;
};

export default function Maze() {
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

  const handleCellBackgroundColor = (cell: BoardCell) => {
    if (cell.visited) {
      return 'black';
    } else if (cell.startNode) {
      return 'blue';
    } else if (cell.targetNode) {
      return 'red';
    }
    return 'white';
  };

  return (
    <Grid
      container
      sx={{
        display: 'grid',
        'grid-template-columns': `repeat(${columns}, 1fr)`,
      }}
    >
      {Object.entries(board).map(([key, cell]) => (
        <Grid key={key} item>
          <Box
            sx={{
              height: '30px',
              width: '30px',
              border: '1px solid gray',
              backgroundColor: handleCellBackgroundColor(cell),
            }}
          ></Box>
        </Grid>
      ))}
    </Grid>
  );
}
