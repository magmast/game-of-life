import { useRef, useState } from "react";
import config from "../config";
import Board from "../entities/Board";
import Position, { add } from "../entities/Position";
import mapHtmlToBoardPosition from "../services/mapHtmlToBoardPosition";
import { State, useStore } from "../store";

export default interface BoardViewController {
  board: Board;
  zoom: number;
  cellSize: number;
  offset: Position;
  handleStageWheel: (event: WheelEvent) => void;
  handleStageMouseMove: (event: MouseEvent) => void;
  handleStageMouseDown: (event: MouseEvent) => void;
  handleStageMouseUp: (event: MouseEvent) => void;
}

const selector = ({ board }: State) => board;

export const useBoardViewController = (): BoardViewController => {
  const [zoom, setZoom] = useState(10);

  const cellSize = config.board.cellSize * zoom;

  const [offset, setOffset] = useState<Position>({ x: 0, y: 0 });

  const clickTimestamp = useRef<number | null>(null);

  return {
    board: useStore(selector),
    cellSize,
    zoom,
    offset,
    handleStageMouseDown: (event) => {
      if (event.buttons === 1) {
        clickTimestamp.current = Date.now();
        console.log(clickTimestamp.current);
      }
    },
    handleStageMouseUp: (event) => {
      if (
        clickTimestamp.current !== null &&
        Date.now() - clickTimestamp.current < 200
      ) {
        clickTimestamp.current = null;
        const canvas = event.target as HTMLCanvasElement;
        const position = mapHtmlToBoardPosition({
          cellSize,
          canvas,
          offset,
          position: event,
        });
        useStore.getState().toggleCell(position);
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

      setOffset(add(offset, { x: event.movementX, y: event.movementY }));
    },
  };
};
