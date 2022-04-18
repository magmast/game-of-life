import { pipe } from "fp-ts/lib/function";
import { useRef, useState } from "react";
import config from "../config";
import { Board } from "../entities/Board";
import * as P from "../entities/Position";
import mapHtmlToBoardPosition from "../services/mapHtmlToBoardPosition";
import { State, useStore } from "../store";

export default interface BoardViewController {
  board: Board;
  zoom: number;
  cellSize: number;
  offset: P.Position;
  handleStageWheel: (event: WheelEvent) => void;
  handleStageMouseMove: (event: MouseEvent) => void;
  handleStageMouseDown: (event: MouseEvent) => void;
  handleStageMouseUp: (event: MouseEvent) => void;
}

const selector = ({ board }: State) => board;

export const useBoardViewController = (): BoardViewController => {
  const [zoom, setZoom] = useState(10);

  const cellSize = config.board.cellSize * zoom;

  const [offset, setOffset] = useState<P.Position>({ x: 0, y: 0 });

  const clickTimestamp = useRef<number | null>(null);

  return {
    board: useStore(selector),
    cellSize,
    zoom,
    offset,
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
        pipe(
          event,
          mapHtmlToBoardPosition({
            cellSize,
            canvas: event.target as HTMLCanvasElement,
            offset,
          }),
          useStore.getState().toggleCell
        );
      }
    },
    handleStageWheel: (event) => {
      const delta = event.deltaY / ((config.board.maxZoom + 1 - zoom) * 20);
      setZoom(
        Math.max(
          Math.min(zoom - delta, config.board.maxZoom),
          config.board.minZoom
        )
      );
    },
    handleStageMouseMove: (event) => {
      if (event.buttons !== 1) {
        return;
      }

      setOffset(P.add(offset, { x: event.movementX, y: event.movementY }));
    },
  };
};
