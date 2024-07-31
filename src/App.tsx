import { useState, useEffect } from 'react';
import { CursorModeType } from './types/CursorTypes';
import Navbar from './components/Navbar';
import Maze from './components/Maze';
import './App.css';

export interface BoardCell {
  visited: boolean;
  startNode: boolean;
  targetNode: boolean;
}

export type Board = {
  [key: string]: BoardCell;
};

function App() {
  const [board, setBoard] = useState<Board>({});
  const [startCoordinates, setStartCoordinates] = useState<string>('7,6');
  const [targetCoordinates, setTargetCoordinates] = useState<string>('7,23');
  const [cursorMode, setCursorMode] = useState<CursorModeType>('none');
  const rows: number = 15;
  const columns: number = 30;

  const generateBoard = (
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
          };
        } else if (coordinates === targetCoordinates) {
          newBoard[coordinates] = {
            visited: false,
            startNode: false,
            targetNode: true,
          };
        } else {
          newBoard[coordinates] = {
            visited: false,
            startNode: false,
            targetNode: false,
          };
        }
      }
    }
    return newBoard;
  };

  useEffect(() => {
    const board: Board = generateBoard(
      rows,
      columns,
      startCoordinates,
      targetCoordinates
    );
    setBoard(board);
  }, [rows, columns, startCoordinates, targetCoordinates]);

  return (
    <>
      <Navbar setCursorMode={setCursorMode} />
      <Maze
        board={board}
        setStartCoordinates={setStartCoordinates}
        setTargetCoordinates={setTargetCoordinates}
        cursorMode={cursorMode}
        columns={columns}
      />
    </>
  );
}

export default App;
