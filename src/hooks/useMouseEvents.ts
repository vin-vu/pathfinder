import { useState, useCallback } from 'react';
import { MouseStatuses } from '../App';
import { CursorModeType } from '../types/CursorTypes';

interface UseMouseEventParams {
  cursorMode: CursorModeType;
  addWalls: (coordinates: string) => void;
  setStartCoordinates: (coordinates: string) => void;
  setTargetCoordinates: (coordinates: string) => void;
}

export const useMouseEvents = ({
  cursorMode,
  addWalls,
  setStartCoordinates,
  setTargetCoordinates,
}: UseMouseEventParams) => {
  const [mouseStatus, setMouseStatus] = useState<MouseStatuses>({
    down: false,
    move: false,
    up: false,
  });

  const handleMouseDown = useCallback(
    (coordinates: string): void => {
      setMouseStatus({ down: true, move: false, up: false });
      if (cursorMode === 'start') {
        setStartCoordinates(coordinates);
      } else if (cursorMode === 'target') {
        setTargetCoordinates(coordinates);
      } else if (cursorMode === 'walls') {
        addWalls(coordinates);
      }
    },
    [cursorMode, addWalls, setStartCoordinates, setTargetCoordinates]
  );

  const handleMouseMove = useCallback(
    (coordinates: string): void => {
      setMouseStatus({ ...mouseStatus, move: true });
      if (cursorMode === 'walls' && mouseStatus.down && mouseStatus.move) {
        addWalls(coordinates);
        console.log('painting: ', mouseStatus);
      }
      document.addEventListener(
        'mouseup',
        () => {
          setMouseStatus({ down: false, move: false, up: true });
        },
        { once: true }
      );
    },
    [cursorMode, addWalls, mouseStatus]
  );

  const handleMouseUp = useCallback((): void => {
    setMouseStatus({ down: false, move: false, up: true });
  }, []);

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    mouseStatus,
  };
};
