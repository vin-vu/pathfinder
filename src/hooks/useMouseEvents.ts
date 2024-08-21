import { useState, useCallback } from 'react';
import { BoardCell, MouseStatuses } from '../App';
import { CursorModeType } from '../types/CursorTypes';

interface UseMouseEventParams {
  cursorMode: CursorModeType;
  // addWalls: (coordinates: string) => void;
  updateBoardNode: (coordinates: string, boardCell: BoardCell) => void;
  setStartCoordinates: (coordinates: string) => void;
  setTargetCoordinates: (coordinates: string) => void;
}

export const useMouseEvents = ({
  cursorMode,
  // addWalls,
  updateBoardNode,
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
        // addWalls(coordinates);
        const boardCell: BoardCell = {visited: false, startNode: false, targetNode: false, wall: true}
        updateBoardNode(coordinates, boardCell)
      }
    },
    [cursorMode, updateBoardNode, setStartCoordinates, setTargetCoordinates]
  );

  // const handleMouseMove = useCallback(
  //   (coordinates: string): void => {
  //     // setMouseStatus({ ...mouseStatus, move: true });
  //     // if (cursorMode === 'walls' && mouseStatus.down && mouseStatus.move) {
  //     if (cursorMode === 'walls' && mouseStatus.down) {
  //       setMouseStatus((prev) => ({ ...prev, move: true }));
  //             // setMouseStatus({ ...mouseStatus, move: true });


  //       addWalls(coordinates);
  //       console.log('painting: ', mouseStatus);
  //     }
  //     document.addEventListener(
  //       'mouseup',
  //       () => {
  //         setMouseStatus({ down: false, move: false, up: true });
  //       },
  //       { once: true }
  //     );
  //   },
  //   [cursorMode, addWalls, mouseStatus]
  // );

  const handleMouseMove = useCallback(
    (coordinates: string): void => {
      // setMouseStatus((prevStatus) => {
      //   if (prevStatus.down && cursorMode === 'walls') {
      //     addWalls(coordinates); // Add wall on drag
      //     return { ...prevStatus, move: true };
      //   }
      //   return prevStatus;
      // });
      // console.log('coordinates: ', coordinates)
    },
    // [cursorMode, addWalls]
    []
  );

  const handleMouseUp = useCallback((): void => {
    setMouseStatus({ down: false, move: false, up: true });
  }, []);

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
};
