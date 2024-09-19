import { useState, useEffect, useCallback } from 'react';
import { useMouseEvents } from './hooks/useMouseEvents';
import Navbar from './components/Navbar';
import Maze from './components/Maze';
import BreadthFirstSearch from './algorithm/BreadthFirstSearch';
import './App.css';

export interface BoardCell {
  startNode: boolean;
  targetNode: boolean;
  wall: boolean;
  highlighted: boolean;
}

export interface MouseStatuses {
  down: boolean;
  move: boolean;
  up: boolean;
}

export type Board = {
  [key: string]: BoardCell;
};

export type CursorModeType = 'none' | 'start' | 'target' | 'walls';

function App() {
  const rows: number = 15;
  const columns: number = 30;
  const initalStartCoordinates: string = '7,6';
  const initialTargetCoordinates: string = '7,23';
  const [board, setBoard] = useState<Board>({});
  const [cursorMode, setCursorMode] = useState<CursorModeType>('none');
  const [resetStatus, setResetStatus] = useState<boolean>(false);
  const [path, setPath] = useState<string[]>([]);
  const [startCoordinates, setStartCoordinates] = useState<string>(
    initalStartCoordinates
  );
  const [targetCoordinates, setTargetCoordinates] = useState<string>(
    initialTargetCoordinates
  );

  const generateBoard = useCallback((rows: number, columns: number): Board => {
    const newBoard: Board = {};
    for (let i = 0; i < rows; i += 1) {
      for (let j = 0; j < columns; j += 1) {
        const coordinates: string = `${i},${j}`;
        newBoard[coordinates] = {
          startNode: coordinates === initalStartCoordinates,
          targetNode: coordinates === initialTargetCoordinates,
          wall: false,
          highlighted: false,
        };
      }
    }
    return newBoard;
  }, []);

  const resetBoard = useCallback((): void => {
    const newBoard: Board = generateBoard(rows, columns);
    setBoard(newBoard);
    setStartCoordinates(initalStartCoordinates);
    setTargetCoordinates(initialTargetCoordinates);
  }, [generateBoard]);

  const updateBoardNode = useCallback(
    (coordinates: string, updatedNode: BoardCell): void => {
      if (updatedNode.startNode) {
        setBoard((prevBoard) => ({
          ...prevBoard,
          [coordinates]: { ...prevBoard[coordinates], ...updatedNode },
          [startCoordinates]: {
            ...prevBoard[startCoordinates],
            startNode: false,
          },
        }));
        setStartCoordinates(coordinates);
      } else if (updatedNode.targetNode) {
        setBoard((prevBoard) => ({
          ...prevBoard,
          [coordinates]: { ...prevBoard[coordinates], ...updatedNode },
          [targetCoordinates]: {
            ...prevBoard[targetCoordinates],
            targetNode: false,
          },
        }));
        setTargetCoordinates(coordinates);
      } else if (updatedNode.wall) {
        setBoard((prevBoard) => ({
          ...prevBoard,
          [coordinates]: { ...prevBoard[coordinates], ...updatedNode },
        }));
      } else if (updatedNode.highlighted) {
        setBoard((prevBoard) => ({
          ...prevBoard,
          [coordinates]: { ...prevBoard[coordinates], ...updatedNode },
        }));
      }
    },
    [startCoordinates, targetCoordinates]
  );

  const updateResetStateTrue = (): void => {
    setResetStatus(true);
    setPath([]);
  };

  const runAlgo = () => {
    const shortestPath: string[] = BreadthFirstSearch({
      board,
      startCoordinates,
      targetCoordinates,
      rows,
      columns,
    });
    if (!shortestPath.length) {
      alert('No viable path possible!');
    }
    setPath(shortestPath);
  };

  useEffect(() => {
    const newBoard: Board = generateBoard(rows, columns);
    setBoard(newBoard);
  }, [generateBoard]);

  useEffect(() => {
    if (resetStatus) {
      resetBoard();
      setResetStatus(false);
    }
  }, [resetBoard, resetStatus]);

  useEffect(() => {
    path.forEach((coordinates, index) => {
      setTimeout(() => {
        const highlightedCell: BoardCell = {
          startNode: false,
          targetNode: false,
          wall: false,
          highlighted: true,
        };
        if (index !== 0 && index !== path.length - 1) {
          updateBoardNode(coordinates, highlightedCell);
        }
      }, index * 50);
    });
  }, [path, updateBoardNode]);

  const { handleMouseDown, handleMouseMove } = useMouseEvents({
    cursorMode,
    updateBoardNode,
  });

  return (
    <>
      <Navbar
        setCursorMode={setCursorMode}
        updateResetStateTrue={updateResetStateTrue}
        runAlgo={runAlgo}
      />
      <Maze
        board={board}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        columns={columns}
      />
    </>
  );
}

export default App;
