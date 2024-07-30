import { useState } from 'react';
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

  return (
    <>
      <Navbar setCursorMode={setCursorMode} />
      <Maze
        board={board}
        setBoard={setBoard}
        startCoordinates={startCoordinates}
        setStartCoordinates={setStartCoordinates}
        targetCoordinates={targetCoordinates}
        setTargetCoordinates={setTargetCoordinates}
        cursorMode={cursorMode}
      />
    </>
  );
}

export default App;
