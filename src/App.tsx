import { useState } from 'react';
import { CursorModeType } from './types/CursorTypes';
import Navbar from './components/Navbar';
import Maze from './components/Maze';
import './App.css';

function App() {
  const [cursorMode, setCursorMode] = useState<CursorModeType>('none');

  return (
    <>
      <Navbar setCursorMode={setCursorMode} />
      <Maze cursorMode={cursorMode}/>
    </>
  );
}

export default App;
