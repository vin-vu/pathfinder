import { Board } from '../App';

interface BFS {
  board: Board;
  startCoordinates: string;
  targetCoordinates: string;
  row: number;
  col: number;
}

export default function BreadthFirstSearch({
  board,
  startCoordinates,
  targetCoordinates,
  row,
  col,
}: BFS) {

  const queue: [string] = [startCoordinates];
  const visited: Set<string> = new Set();
  const parentMap: { [key: string]: string | null } = {
    [startCoordinates]: null,
  };

  


}
