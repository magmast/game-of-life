import * as Array from "fp-ts/Array";
import { pipe } from "fp-ts/function";
import { useAtomValue } from "jotai";
import { useMemo } from "react";
import config from "../config";
import * as Grid from "../entities/Grid";
import { gameAtom } from "../atoms";

export interface GridViewController {
  grid: Grid.Grid;
  strokeWidth: number;
}

export const useGridViewController = (): GridViewController => {
  const game = useAtomValue(gameAtom);

  const grid = useMemo(() => {
    const mapEndToKonvaCoordinates = (line: Grid.Line) => ({
      ...line,
      end: {
        x: line.axis === "x" ? 0 : line.end.x,
        y: line.axis === "y" ? 0 : line.end.y,
      },
    });

    return pipe(
      game.viewport,
      Grid.create,
      Array.map(mapEndToKonvaCoordinates)
    );
  }, [game.viewport]);

  return {
    grid: grid,
    strokeWidth: config.board.cellStrokeWidth * game.viewport.zoom,
  };
};
