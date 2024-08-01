import { useState, useEffect, useCallback } from 'react';
import { MouseStatuses } from '../App';
import { CursorModeType } from '../types/CursorTypes';

interface UseMouseEventParams {
  cursorMode: CursorModeType;
  addWalls: (coordinates: string) => void;
  setStartCoordinates: (coordinates: string) => void;
  setTargetCoordinates: (coordinates: string) => void;
}

const useMouseEvents = ({cursorMode, addWalls, setStartCoordinates, setTargetCoordinates}: UseMouseEventParams) => {
  const [mouseStatus, setMouseStatus] = useState<MouseStatuses>({
    down: false,
    move: false,
    up: false,
  });

  const handleMouseDown = useCallback((coordinates: string): void => {
    // setMouseStatus({ ...mouseStatus, down: true });
    setMouseStatus({down: true, move: false, up: false });
    if (cursorMode === 'start') {
      setStartCoordinates(coordinates);
    } else if (cursorMode === 'target') {
      setTargetCoordinates(coordinates);
    } else if (cursorMode === 'walls') {
      addWalls(coordinates);
    }
  }, [cursorMode, addWalls, setStartCoordinates, setTargetCoordinates]);


};
