import { useState, useEffect, useCallback } from 'react';
import { CursorModeType } from './types/CursorTypes';
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
  const [board, setBoard] = useState<Board>({});
  const [startCoordinates, setStartCoordinates] = useState<string>('7,6');
  const [targetCoordinates, setTargetCoordinates] = useState<string>('7,23');
  const [cursorMode, setCursorMode] = useState<CursorModeType>('none');
  const [mouseStatus, setMouseStatus] = useState<MouseStatuses>({
    down: false,
    move: false,
    up: false,
  });
  const rows: number = 15;
  const columns: number = 30;

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

  const resetBoard = () => {
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

  const handleMouseDown = (coordinates: string) => {
    setMouseStatus({ ...mouseStatus, down: true });
    if (cursorMode === 'walls') {
      updateBoardWithWalls(coordinates);
      console.log('mouse down walls: ', coordinates)
    }
  };

  const handleMouseMove = (coordinates: string) => {
    setMouseStatus({ ...mouseStatus, move: true });
    if (cursorMode === 'walls' && mouseStatus.down) {
      updateBoardWithWalls(coordinates);
      console.log('mouse move walls: ', coordinates)

    }
  };

  const handleMouseUp = () => {
    setMouseStatus({ down: false, move: false, up: true });
    console.log('mouse up')
  };

  const updateBoardWithWalls = (coordinates: string) => {
    const updatedBoard = {
      ...board,
      [coordinates]: { ...board[coordinates], wall: true },
    };
    setBoard(updatedBoard);
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

  return (
    <>
      <Navbar setCursorMode={setCursorMode} resetBoard={resetBoard} />
      <Maze
        board={board}
        setStartCoordinates={setStartCoordinates}
        setTargetCoordinates={setTargetCoordinates}
        cursorMode={cursorMode}
        // mouseStatus={mouseStatus}
        // setMouseStatus={setMouseStatus}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        columns={columns}
      />
    </>
  );
}

export default App;
