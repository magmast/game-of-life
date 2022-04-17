import { useMemo } from "react";
import config from "../config";
import Position from "../entities/Position";
import range from "../utils/range";

export interface GridController {
  lines: { start: Position; end: Position }[];
}

export interface GridControllerOptions {
  cellSize: number;
  offset: Position;
  zoom: number;
}

export const useGridController = ({
  cellSize,
  offset,
  zoom,
}: GridControllerOptions) => {
  const lines = useMemo(() => {
    const cellsPerRow = Math.ceil(config.board.width / cellSize) + 1;
    const cellsPerCol = Math.ceil(config.board.height / cellSize) + 1;

    return [
      ...range(cellsPerRow).map((x) => ({
        start: {
          x: x * cellSize + (offset.x % cellSize),
          y: 0,
        },
        end: {
          x: zoom * config.board.cellStrokeWidth,
          y: config.board.height,
        },
      })),
      ...range(cellsPerCol).map((y) => ({
        start: { x: 0, y: y * cellSize + (offset.y % cellSize) },
        end: {
          x: config.board.width,
          y: zoom * config.board.cellStrokeWidth,
        },
      })),
    ];
  }, [cellSize, offset, zoom]);

  return { lines };
};
