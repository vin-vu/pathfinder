import { useState, useEffect, useCallback } from 'react';
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
      setMouseStatus({ down: true, move: true, up: false });
      if (cursorMode === 'walls' && mouseStatus.down && mouseStatus.move) {
        addWalls(coordinates);
        console.log('painting: ', mouseStatus)
      }
      document.addEventListener(
        'mouseup',
        () => {
          console.log('mouse up');
          setMouseStatus({ down: false, move: false, up: true });
        },
        { once: true }
      );
    },
    [cursorMode, addWalls, mouseStatus]
  );

  // const handleMouseLeave = useCallback(() => {
  //   if (mouseStatus.down) {
  //     setMouseStatus((prev) => ({ ...prev, move: false }));
  //   }
  // }, [mouseStatus.down]);

  const handleMouseUp = useCallback((): void => {
    setMouseStatus({ down: false, move: false, up: true });
  }, []);

  // useEffect(() => {
  //   const handleMouseOut = (event: MouseEvent) => {
  //     if (mouseStatus.down) {
  //       setMouseStatus({ down: false, move: false, up: true });
  //       console.log('mouse out down')
  //     }
  //   };
  //   document.addEventListener('mouseup', handleMouseUp);
  //   document.addEventListener('mouseout', handleMouseOut);

  //   return () => {
  //     document.removeEventListener('mouseup', handleMouseUp);
  //     document.removeEventListener('mouseout', handleMouseOut);
  //   };
  // }, [mouseStatus.down, handleMouseUp]);

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    mouseStatus,
  };
};
