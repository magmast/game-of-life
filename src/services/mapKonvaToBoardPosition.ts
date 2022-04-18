import { Position } from "../entities/Position";

/** Converts `Position` origin from the Konva canvas to the board domain. */
const mapKonvaToBoardPosition =
  (cellSize: number): ((position: Position) => Position) =>
  (position) => ({
    x: Math.floor(position.x / cellSize),
    y: Math.floor(position.y / cellSize),
  });

export default mapKonvaToBoardPosition;
