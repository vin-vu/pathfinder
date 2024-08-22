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
  const [board, setBoard] = useState<Board>({});
  const [cursorMode, setCursorMode] = useState<CursorModeType>('none');
  const [resetStatus, setResetStatus] = useState<boolean>(false);
  // const [startCoordinates, setStartCoordinates] = useState<string>('7,6');
  // const [targetCoordinates, setTargetCoordinates] = useState<string>('7,23');
  // const [mouseStatus, setMouseStatus] = useState<MouseStatuses>({
  //   down: false,
  //   move: false,
  //   up: false,
  // });

  // const handleMouseDown = (coordinates: string): void => {
  //   // setMouseStatus({ ...mouseStatus, down: true });
  //   setMouseStatus({down: true, move: false, up: false });
  //   if (cursorMode === 'start') {
  //     setStartCoordinates(coordinates);
  //   } else if (cursorMode === 'target') {
  //     setTargetCoordinates(coordinates);
  //   } else if (cursorMode === 'walls') {
  //     addWalls(coordinates);
  //   }
  // };

  // const handleMouseMove = (coordinates: string): void => {
  //   setMouseStatus({ ...mouseStatus, move: true });
  //   if (cursorMode === 'walls') {
  //     addWalls(coordinates);
  //   }
  // };

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

  const { handleMouseDown, handleMouseMove, handleMouseUp } = useMouseEvents({
    cursorMode,
    updateBoardNode,
    // setStartCoordinates,
    // setTargetCoordinates,
  });

  const initalStartCoordinates: string = '7,6';
  const initialTargetCoordinates: string = '7,23';

  const generateBoardNew = useCallback(
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

  const resetBoardNew = useCallback((): void => {
    const newBoard: Board = generateBoardNew(rows, columns);
    setBoard(newBoard);
  }, [generateBoardNew]);

  const updateResetStateTrue = (): void => {
    setResetStatus(true);
  };

  useEffect(() => {
    const newBoard: Board = generateBoardNew(rows, columns);
    setBoard(newBoard);
  }, [generateBoardNew]);

  useEffect(() => {
    if (resetStatus) {
      resetBoardNew();
      setResetStatus(false);
    }
  }, [resetBoardNew, resetStatus]);

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
