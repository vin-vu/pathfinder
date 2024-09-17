import { Board } from '../App';

interface BFS {
  board: Board;
  startCoordinates: string;
  targetCoordinates: string;
  rows: number;
  columns: number;
}

export default function BreadthFirstSearch({
  board,
  startCoordinates,
  targetCoordinates,
  rows,
  columns,
}: BFS) {
  const queue: [string] = [startCoordinates];
  const visited: Set<string> = new Set();
  const parentMap: { [key: string]: string | null } = {
    [startCoordinates]: null,
  };
  console.log('board: ', board);

  visited.add(startCoordinates);

  const directions = [
    [0, 1],
    [-1, 0],
    [0, -1],
    [1, 0],
  ];

  // while (queue.length > 0) {
  //   const current = queue.shift();

  //   if (current === targetCoordinates) {
  //     // handle the short path here
  //   }

  //   // explore neighbors
  //   for (const direction of directions) {
  //     const [currentCoordinateRow, currentCoordinateCol] = current.split(',').map(Number);
  //   }
  // }
}
