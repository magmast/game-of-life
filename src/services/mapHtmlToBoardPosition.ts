import Position from "../entities/Position";
import mapHtmlToKonvaPosition from "./mapHtmlToKonvaPosition";
import mapKonvaToBoardPosition from "./mapKonvaToBoardPosition";

export interface HtmlToBoardPositionOptions {
  /** Konva canvas element. */
  canvas: HTMLCanvasElement;
  /** Cell size in pixels. */
  cellSize: number;
  /** Position to be converted. */
  position: Position;
  /** Camera offset. */
  offset: Position;
}

/** Converts HTML position to board domain position. */
const mapHtmlToBoardPosition = ({
  canvas,
  cellSize,
  position,
  offset,
}: HtmlToBoardPositionOptions) =>
  mapKonvaToBoardPosition({
    cellSize,
    position: mapHtmlToKonvaPosition({
      position,
      canvas,
      offset,
    }),
  });

export default mapHtmlToBoardPosition;
