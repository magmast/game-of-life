import { useAtomValue } from "jotai";
import { useMemo } from "react";
import config from "../config";
import * as G from "../entities/Game";
import { Position } from "../entities/Position";
import { gameAtom } from "../atoms";
import range from "../utils/range";

export interface GridController {
  lines: { start: Position; end: Position }[];
  strokeWidth: number;
}

export const useGridController = (): GridController => {
  const game = useAtomValue(gameAtom);
  const cellSize = G.getCellSize(game);

  const lines = useMemo(() => {
    const cellsPerRow = Math.ceil(game.viewport.size.width / cellSize) + 1;
    const cellsPerCol = Math.ceil(game.viewport.size.height / cellSize) + 1;

    return [
      ...range(cellsPerRow).map((x) => ({
        start: {
          x: x * cellSize + (game.viewport.offset.x % cellSize),
          y: 0,
        },
        end: {
          x: game.viewport.zoom * config.board.cellStrokeWidth,
          y: config.board.height,
        },
      })),
      ...range(cellsPerCol).map((y) => ({
        start: { x: 0, y: y * cellSize + (game.viewport.offset.y % cellSize) },
        end: {
          x: config.board.width,
          y: game.viewport.zoom * config.board.cellStrokeWidth,
        },
      })),
    ];
  }, [
    cellSize,
    game.viewport.offset.x,
    game.viewport.offset.y,
    game.viewport.size.height,
    game.viewport.size.width,
    game.viewport.zoom,
  ]);

  return {
    lines,
    strokeWidth: config.board.cellStrokeWidth * game.viewport.zoom,
  };
};
