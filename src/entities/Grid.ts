import * as Array from "fp-ts/Array";
import { pipe } from "fp-ts/function";

import range from "../utils/range";
import * as Axis from "./Axis";
import * as Dimensions from "./Dimensions";
import { Position } from "./Position";
import * as Viewport from "./Viewport";

export type Grid = Line[];

export type Line = { axis: Axis.Axis; start: Position; end: Position };

export const create = (viewport: Viewport.Viewport): Grid =>
  pipe(
    ["x", "y"] as Axis.Axis[],
    Array.map(createPlainAxisLines(viewport)),
    Array.flatten,
    Array.map(applyViewportOffsetToLine(viewport)),
  );

interface IndexLineOptions {
  axis: Axis.Axis;
  viewport: Viewport.Viewport;
}

const createIndexLine =
  ({ axis, viewport }: IndexLineOptions) =>
  (index: number): Line => {
    const cellSize = Viewport.getCellSize(viewport);

    const position = index * cellSize;
    const length = Dimensions.getByAxis(Axis.perpendicular(axis))(
      viewport.size,
    );

    return {
      axis,
      start: {
        x: axis === "x" ? position : 0,
        y: axis === "y" ? position : 0,
      },
      end: {
        x: axis === "x" ? position : length,
        y: axis === "y" ? position : length,
      },
    };
  };

interface ApplyViewportOffsetToPositionOptions {
  viewport: Viewport.Viewport;
  axis: Axis.Axis;
}

const applyViewportOffsetToPosition =
  ({ viewport, axis }: ApplyViewportOffsetToPositionOptions) =>
  (position: Position): Position => ({
    ...position,
    [axis]:
      position[axis] + (viewport.offset[axis] % Viewport.getCellSize(viewport)),
  });

const applyViewportOffsetToLine =
  (viewport: Viewport.Viewport) =>
  ({ start, axis, ...line }: Line): Line => ({
    ...line,
    axis,
    start: applyViewportOffsetToPosition({ axis, viewport })(start),
  });

const createPlainAxisLines =
  (viewport: Viewport.Viewport) => (axis: Axis.Axis) =>
    pipe(
      viewport.size,
      Dimensions.getByAxis(axis),
      (dimension) => Math.ceil(dimension / Viewport.getCellSize(viewport)) + 2,
      range,
      Array.map(createIndexLine({ axis, viewport })),
    );
