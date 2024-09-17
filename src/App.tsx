import { useState, useEffect, useCallback } from 'react';
import { useMouseEvents } from './hooks/useMouseEvents';
import Navbar from './components/Navbar';
import Maze from './components/Maze';
import BreadthFirstSearch from './algorithm/BreadthFirstSearch';
import './App.css';

export interface BoardCell {
  visited: boolean;
  startNode: boolean;
  targetNode: boolean;
  wall: boolean;
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
          visited: false,
          startNode: coordinates === initalStartCoordinates,
          targetNode: coordinates === initialTargetCoordinates,
          wall: false,
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

  const updateBoardNode = (
    coordinates: string,
    updatedNode: BoardCell
  ): void => {
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
    }
  };

  const updateResetStateTrue = (): void => {
    setResetStatus(true);
  };

  const runAlgo = () => {
    BreadthFirstSearch({
      board,
      startCoordinates,
      targetCoordinates,
      rows,
      columns,
    });
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
