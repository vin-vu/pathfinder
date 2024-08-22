import { useState, useEffect, useCallback } from 'react';
import { CursorModeType } from './types/CursorTypes';
import { useMouseEvents } from './hooks/useMouseEvents';
import Navbar from './components/Navbar';
import Maze from './components/Maze';
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

function App() {
  const rows: number = 15;
  const columns: number = 30;
  const initalStartCoordinates: string = '7,6';
  const initialTargetCoordinates: string = '7,23';
  const [board, setBoard] = useState<Board>({});
  const [cursorMode, setCursorMode] = useState<CursorModeType>('none');
  const [resetStatus, setResetStatus] = useState<boolean>(false);
  const [startCoordinates, setStartCoordinates] = useState<string>('7,6');
  const [targetCoordinates, setTargetCoordinates] = useState<string>('7,23');

  const generateBoard = useCallback(
    (rows: number, columns: number): Board => {
      const newBoard: Board = {};
      for (let i = 0; i < rows; i += 1) {
        for (let j = 0; j < columns; j += 1) {
          const coordinates: string = `${i},${j}`;
          if (coordinates === startCoordinates) {
            newBoard[coordinates] = {
              visited: false,
              startNode: true,
              targetNode: false,
              wall: false,
            };
          } else if (coordinates === targetCoordinates) {
            newBoard[coordinates] = {
              visited: false,
              startNode: false,
              targetNode: true,
              wall: false,
            };
          } else {
            newBoard[coordinates] = {
              visited: false,
              startNode: false,
              targetNode: false,
              wall: false,
            };
          }
        }
      }
      return newBoard;
    },
    [startCoordinates, targetCoordinates]
  );

  const resetBoard = useCallback((): void => {
    const newBoard: Board = generateBoard(rows, columns);
    setBoard(newBoard);
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

  const { handleMouseDown, handleMouseMove, handleMouseUp } = useMouseEvents({
    cursorMode,
    updateBoardNode,
  });

  return (
    <>
      <Navbar
        setCursorMode={setCursorMode}
        updateResetStateTrue={updateResetStateTrue}
      />
      <Maze
        board={board}
        cursorMode={cursorMode}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        columns={columns}
      />
    </>
  );
}

export default App;
