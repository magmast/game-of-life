import { useAtom } from "jotai";
import { useRef } from "react";
import * as G from "../entities/Game";
import { Position } from "../entities/Position";
import * as V from "../entities/Viewport";
import mapHtmlToViewportPosition from "../services/mapHtmlToViewportPosition";
import { gameAtom } from "../atoms";

export default interface BoardViewController {
  offset: Position;
  aliveCellsPositions: Position[];
  cellSize: number;
  handleStageWheel: (event: WheelEvent) => void;
  handleStageMouseMove: (event: MouseEvent) => void;
  handleStageMouseDown: (event: MouseEvent) => void;
  handleStageMouseUp: (event: MouseEvent) => void;
}

export const useBoardViewController = (): BoardViewController => {
  const [game, setGame] = useAtom(gameAtom);

  const clickTimestamp = useRef<number | null>(null);

  return {
    aliveCellsPositions: game.board.aliveCellsPositions,
    offset: game.viewport.offset,
    cellSize: V.getCellSize(game.viewport),
    handleStageMouseDown: (event) => {
      if (event.buttons === 1) {
        clickTimestamp.current = Date.now();
      }
    },
    handleStageMouseUp: (event) => {
      if (
        clickTimestamp.current !== null &&
        Date.now() - clickTimestamp.current < 200
      ) {
        clickTimestamp.current = null;
        setGame(
          G.toggleCell(
            mapHtmlToViewportPosition({
              canvas: event.target as HTMLCanvasElement,
              offset: game.viewport.offset,
            })(event)
          )
        );
      }
    },
    handleStageWheel: (event) => setGame(G.zoom(event.deltaY)),
    handleStageMouseMove: (event) => {
      if (event.buttons !== 1) {
        return;
      }

      setGame(G.move({ x: event.movementX, y: event.movementY }));
    },
  };
};
