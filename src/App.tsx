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

  const generateBoard = useCallback(
    (rows: number, columns: number): Board => {
      const newBoard: Board = {};
      for (let i = 0; i < rows; i += 1) {
        for (let j = 0; j < columns; j += 1) {
          const coordinates: string = `${i},${j}`;
          if (coordinates === initalStartCoordinates) {
            newBoard[coordinates] = {
              visited: false,
              startNode: true,
              targetNode: false,
              wall: false,
            };
          } else if (coordinates === initialTargetCoordinates) {
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
    []
  );

  const resetBoard = useCallback((): void => {
    const newBoard: Board = generateBoard(rows, columns);
    setBoard(newBoard);
  }, [generateBoard]);

  const updateBoardNode = (
    coordinates: string,
    updatedNode: BoardCell
  ): void => {
    console.log('update board plz', updatedNode);
    setBoard((prevBoard) => ({
      ...prevBoard,
      [coordinates]: { ...prevBoard[coordinates], ...updatedNode },
    }));
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
