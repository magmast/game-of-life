import { useElementSize } from "@mantine/hooks";
import { pipe } from "fp-ts/function";
import { useAtom } from "jotai";
import Konva from "konva";
import { MutableRefObject, useEffect, useRef } from "react";
import { boardAtom, viewportAtom } from "../atoms";
import * as Board from "../entities/Board";
import { Position } from "../entities/Position";
import * as Viewport from "../entities/Viewport";
import mapHtmlToViewportPosition from "../services/mapHtmlToViewportPosition";

export default interface BoardViewController {
  stage: MutableRefObject<Konva.Stage | null>;
  root: MutableRefObject<HTMLDivElement | null>;
  offset: Position;
  aliveCellsPositions: Position[];
  cellSize: number;
  handleStageWheel: (event: WheelEvent) => void;
  handleStageMouseMove: (event: MouseEvent) => void;
  handleStageMouseDown: (event: MouseEvent) => void;
  handleStageMouseUp: (event: MouseEvent) => void;
}

export const useBoardViewController = (): BoardViewController => {
  const [board, setBoard] = useAtom(boardAtom);
  const [viewport, setViewport] = useAtom(viewportAtom);

  const clickTimestamp = useRef<number | null>(null);

  const stage = useRef<Konva.Stage | null>(null);

  const { ref: root, width: rootWidth, height: rootHeight } = useElementSize();

  useEffect(() => {
    if (!stage.current) {
      return;
    }

    setViewport(Viewport.resize({ width: rootWidth, height: rootHeight }));
    stage.current.width(rootWidth);
    stage.current.height(rootHeight);
  }, [rootHeight, rootWidth, setViewport]);

  return {
    stage,
    root,
    aliveCellsPositions: board.aliveCellsPositions,
    offset: viewport.offset,
    cellSize: Viewport.getCellSize(viewport),
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
        setBoard(
          pipe(
            event,
            mapHtmlToViewportPosition({
              canvas: event.target as HTMLCanvasElement,
              offset: viewport.offset,
            }),
            (position) => Viewport.getBoardPosition(position, viewport),
            (position) => Board.toggleCell(position)
          )
        );
      }
    },
    handleStageWheel: (event) => setViewport(Viewport.zoom(event.deltaY)),
    handleStageMouseMove: (event) => {
      if (event.buttons !== 1) {
        return;
      }

      setViewport(Viewport.move({ x: event.movementX, y: event.movementY }));
    },
  };
};
