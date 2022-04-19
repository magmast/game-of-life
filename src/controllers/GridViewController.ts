import * as Array from "fp-ts/Array";
import { pipe } from "fp-ts/function";
import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { viewportAtom } from "../atoms";
import config from "../config";
import * as Grid from "../entities/Grid";

export interface GridViewController {
  grid: Grid.Grid;
  strokeWidth: number;
}

export const useGridViewController = (): GridViewController => {
  const viewport = useAtomValue(viewportAtom);

  const grid = useMemo(() => {
    const mapEndToKonvaCoordinates = (line: Grid.Line) => ({
      ...line,
      end: {
        x: line.axis === "x" ? 0 : line.end.x,
        y: line.axis === "y" ? 0 : line.end.y,
      },
    });

    return pipe(viewport, Grid.create, Array.map(mapEndToKonvaCoordinates));
  }, [viewport]);

  return {
    grid: grid,
    strokeWidth: config.grid.lineWidth * viewport.zoom,
  };
};
