import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';

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
    <Grid container>
      {Object.entries(board).map(([key, cell]) => (
        <Grid key={key} item>
          <div
            style={{
              height: '20px',
              width: '20px',
              backgroundColor: cell.visited === true ? 'white' : 'black',
            }}
          ></div>
        </Grid>
      ))}
    </Grid>
  );
}
