import { useState, useEffect, useCallback } from 'react';
import { CursorModeType } from './types/CursorTypes';
import Navbar from './components/Navbar';
import Maze from './components/Maze';
import './App.css';
import { useMouseEvents } from './hooks/useMouseEvents';

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
  const [startCoordinates, setStartCoordinates] = useState<string>('7,6');
  const [targetCoordinates, setTargetCoordinates] = useState<string>('7,23');
  const [testCoordinates, setTestCoordinates] = useState<string>('');
  const [cursorMode, setCursorMode] = useState<CursorModeType>('none');
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

  // const handleMouseUp = (): void => {
  //   setMouseStatus({ down: false, move: false, up: true });
  // };

  // const addWalls = useCallback((coordinates: string): void => {
  //   setBoard((prevBoard) => ({
  //     ...prevBoard,
  //     [coordinates]: { ...prevBoard[coordinates], wall: true },
  //   }));
  // }, []);

  // const updateBoardNode = (
  //   coordinates: string,
  //   updatedNode: BoardCell
  // ): void => {
  //   console.log('update board plz', updatedNode);
  //   setBoard((prevBoard) => ({
  //     ...prevBoard,
  //     [coordinates]: { ...prevBoard[coordinates], wall: true },
  //   }));
  //   setTestCoordinates(coordinates)
  //   console.log(board[coordinates])
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
    setTestCoordinates(coordinates)
  };

  // const updateBoardNode = useCallback((
  //   coordinates: string,
  //   updatedNode: BoardCell
  // ): void => {
  //   console.log('update board plz', updatedNode)
  //   setBoard((prevBoard) => ({
  //     ...prevBoard,
  //     [coordinates]: { ...prevBoard[coordinates], updatedNode },
  //   }));
  // },[]);

  const { handleMouseDown, handleMouseMove, handleMouseUp } = useMouseEvents({
    cursorMode,
    // addWalls,
    updateBoardNode,
    setStartCoordinates,
    setTargetCoordinates,
  });

  const generateBoard = useCallback(
    (
      rows: number,
      columns: number,
      startCoordinates: string,
      targetCoordinates: string
    ) => {
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
    []
  );

  const resetBoard = (): void => {
    setStartCoordinates('7,6');
    setTargetCoordinates('7,23');
    const newBoard = generateBoard(
      rows,
      columns,
      startCoordinates,
      targetCoordinates
    );
    setBoard(newBoard);
  };

  useEffect(() => {
    const newboard: Board = generateBoard(
      rows,
      columns,
      startCoordinates,
      targetCoordinates
    );
    setBoard(newboard);
  }, [generateBoard, rows, columns, startCoordinates, targetCoordinates]);

  useEffect(() => {
    console.log('test coord: ', testCoordinates)
    console.log('hello ', board[testCoordinates])
  }, [testCoordinates, board])

  return (
    <>
      <Navbar setCursorMode={setCursorMode} resetBoard={resetBoard} />
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
