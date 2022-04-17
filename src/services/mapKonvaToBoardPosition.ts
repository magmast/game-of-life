import Position from "../entities/Position";

export interface KonvaToBoardPositionOptions {
  /** Position to be converted. */
  position: Position;
  /** Cell size in pixels. */
  cellSize: number;
}

/** Converts `Position` origin from the Konva canvas to the board domain. */
const mapKonvaToBoardPosition = ({
  position,
  cellSize,
}: KonvaToBoardPositionOptions): Position => ({
  x: Math.floor(position.x / cellSize),
  y: Math.floor(position.y / cellSize),
});

export default mapKonvaToBoardPosition;
