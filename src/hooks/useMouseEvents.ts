import { useState, useCallback, useEffect } from 'react';
import { BoardCell, CursorModeType, MouseStatuses } from '../App';

interface UseMouseEventParams {
  cursorMode: CursorModeType;
  updateBoardNode: (coordinates: string, boardCell: BoardCell) => void;
}

export const useMouseEvents = ({
  cursorMode,
  updateBoardNode,
}: UseMouseEventParams) => {
  const [mouseStatus, setMouseStatus] = useState<MouseStatuses>({
    down: false,
    move: false,
    up: true,
  });

  const handleMouseDown = useCallback(
    (coordinates: string): void => {
      setMouseStatus({ down: true, move: false, up: false });
      if (cursorMode === 'start') {
        const startCell: BoardCell = {
          visited: false,
          startNode: true,
          targetNode: false,
          wall: false,
        };
        updateBoardNode(coordinates, startCell);
      } else if (cursorMode === 'target') {
        const targetCell: BoardCell = {
          visited: false,
          startNode: false,
          targetNode: true,
          wall: false,
        };
        updateBoardNode(coordinates, targetCell);
      } else if (cursorMode === 'walls') {
        const wallCell: BoardCell = {
          visited: false,
          startNode: false,
          targetNode: false,
          wall: true,
        };
        updateBoardNode(coordinates, wallCell);
      }

      const handleMouseUp = () => {
        setMouseStatus({ down: false, move: false, up: true });
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mouseup', handleMouseUp, { once: true });
    },
    [cursorMode, updateBoardNode]
  );

  const handleMouseMove = useCallback(
    (coordinates: string): void => {
      if (cursorMode === 'walls' && mouseStatus.down) {
        setMouseStatus({ down: true, move: true, up: false });

        const boardCell: BoardCell = {
          visited: false,
          startNode: false,
          targetNode: false,
          wall: true,
        };
        updateBoardNode(coordinates, boardCell);
      }
    },
    [cursorMode, updateBoardNode, mouseStatus]
  );

  const handleMouseUp = useCallback((): void => {
    setMouseStatus({ down: false, move: false, up: true });
    document.removeEventListener('mouseup', handleMouseUp);
  }, []);

  useEffect(() => {
    const handleDragStart = (event: DragEvent) => {
      event.preventDefault();
    };

    document.addEventListener('dragstart', handleDragStart);

    return () => {
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
};
