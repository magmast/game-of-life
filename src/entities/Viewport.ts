import { Dimensions } from "./Dimensions";
import * as Position from "./Position";

export interface Viewport {
  readonly zoom: number;
  readonly offset: Position.Position;
  readonly size: Dimensions;
  readonly config: ViewportConfig;
}

export interface ViewportConfig {
  readonly minZoom: number;
  readonly maxZoom: number;
  readonly cellSize: number;
}

export const create = (size: Dimensions, config: ViewportConfig): Viewport => ({
  size,
  config,
  zoom: 10,
  offset: { x: 0, y: 0 },
});

export const move =
  (delta: Position.Position): (<T extends Viewport>(viewport: T) => T) =>
  (viewport) => ({
    ...viewport,
    offset: Position.add(viewport.offset, delta),
  });

export const zoom =
  (value: number): (<T extends Viewport>(viewport: T) => T) =>
  (viewport) => ({
    ...viewport,
    zoom: Math.max(
      Math.min(
        viewport.zoom -
          value / ((viewport.config.maxZoom + 1 - viewport.zoom) * 20),
        viewport.config.maxZoom,
      ),
      viewport.config.minZoom,
    ),
  });

export const getCellSize = (viewport: Viewport): number =>
  viewport.config.cellSize * viewport.zoom;

export const getBoardPosition = (
  position: Position.Position,
  viewport: Viewport,
) => {
  const cellSize = getCellSize(viewport);
  return {
    x: Math.floor(position.x / cellSize),
    y: Math.floor(position.y / cellSize),
  };
};

export const resize =
  (size: Dimensions) =>
  (viewport: Viewport): Viewport => ({
    ...viewport,
    size,
  });
