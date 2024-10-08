import { CursorModeType } from '../types/CursorTypes';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import React from 'react';

interface NavbarProps {
  setCursorMode: React.Dispatch<React.SetStateAction<CursorModeType>>;
  updateResetStateTrue: () => void;
  runAlgo: () => void;
}

export default function Navbar({
  setCursorMode,
  updateResetStateTrue,
  runAlgo,
}: NavbarProps) {
  return (
    <>
      <AppBar>
        <Toolbar>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 10,
              width: '100%',
            }}
          >
            <Button color="inherit" onClick={() => setCursorMode('start')}>
              SET START NODE
            </Button>
            <Button color="inherit" onClick={() => setCursorMode('target')}>
              SET TARGET NODE
            </Button>
            <Button color="inherit" onClick={() => setCursorMode('walls')}>
              ADD WALLS
            </Button>
            <Button color="inherit" onClick={() => updateResetStateTrue()}>
              CLEAR BOARD
            </Button>
            <Button color="inherit" onClick={() => runAlgo()}>
              RUN ALGORITHM
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
