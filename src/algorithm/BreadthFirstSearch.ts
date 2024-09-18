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

  visited.add(startCoordinates);

  const directions = [
    [0, 1],
    [-1, 0],
    [0, -1],
    [1, 0],
  ];

  while (queue.length > 0) {
    const current = queue.shift()!;

    if (current === targetCoordinates) {
      // handle the short path here
      console.log('found target: ', targetCoordinates)
      return
    }

    const [currentRow, currentCol] = current.split(',').map(Number);
    // explore neighbors
    for (const direction of directions) {
      const newRow = currentRow + direction[0];
      const newCol = currentCol + direction[1];
      const newCoordinate = `${newRow},${newCol}`;

      // make sure neighbors are within grid boundaries, not a wall, and unvisited
      if (
        0 <= newRow &&
        newRow < rows &&
        0 <= newCol &&
        newCol < columns &&
        !board[newCoordinate].wall &&
        !visited.has(newCoordinate)
      ) {
        queue.push(newCoordinate);
        visited.add(newCoordinate);
        parentMap[newCoordinate] = current;
        // console.log('new coord: ', newCoordinate);
      }
    }
  }
  console.log('parent map: ', parentMap)
}
