import { pipe } from "fp-ts/lib/function";
import { Position } from "../entities/Position";
import mapHtmlToKonvaPosition from "./mapHtmlToKonvaPosition";
import mapKonvaToBoardPosition from "./mapKonvaToBoardPosition";

export interface HtmlToBoardPositionOptions {
  /** Konva canvas element. */
  canvas: HTMLCanvasElement;
  /** Cell size in pixels. */
  cellSize: number;
  /** Camera offset. */
  offset: Position;
}

/** Converts HTML position to board domain position. */
const mapHtmlToBoardPosition =
  ({
    canvas,
    cellSize,
    offset,
  }: HtmlToBoardPositionOptions): ((position: Position) => Position) =>
  (position) =>
    pipe(
      position,
      mapHtmlToKonvaPosition({ canvas, offset }),
      mapKonvaToBoardPosition(cellSize)
    );

export default mapHtmlToBoardPosition;
