import { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';

interface BoardCell {
  visited: boolean;
}

type Board = {
  [key: string]: BoardCell;
};

export default function Maze() {
  const [board, setBoard] = useState<Board>({});

  useEffect(() => {
    const newBoard: Board = {};
    for (let i = 0; i < 15; i += 1) {
      for (let j = 0; j < 30; j += 1) {
        newBoard[`${i},${j}`] = { visited: false };
      }
    }
    setBoard(newBoard);
  }, []);

  return (
    <Grid
      container
      sx={{
        display: 'grid',
        'grid-template-columns': 'repeat(30, 1fr)',
      }}
    >
      {Object.entries(board).map(([key, cell]) => (
        <Grid key={key} item>
          <Box
            sx={{
              height: '20px',
              width: '20px',
              border: '1px solid gray',
              backgroundColor: cell.visited === true ? 'black' : 'white',
            }}
          ></Box>
        </Grid>
      ))}
    </Grid>
  );
}
