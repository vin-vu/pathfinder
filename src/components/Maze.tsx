import useState from 'react';
import { useEffect } from 'react';

interface BoardCell {
  visited: boolean;
}

type Board = {
  [key: string] : BoardCell;
}

export default function Maze() {
  const [board, setBoard] = useState<Board>({});

  useEffect(() => {
    const newBoard : Board = {};
    for (let i = 0; i < 15; i += 1) {
      for (let j = 0; j < 30; j += 1) {
        newBoard[`{i},{j}`] = { visited: false };
      }
    }
    setBoard(newBoard);
  }, []);
}
