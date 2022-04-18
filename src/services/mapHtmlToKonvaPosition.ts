import * as P from "../entities/Position";

export interface HtmlToKonvaPositionOptions {
  /** Konva canvas element. */
  canvas: HTMLCanvasElement;
  /** Camera offset. */
  offset: P.Position;
}

/**
 * Transforms `Position` origin from the HTML document to the Konva canvas.
 */
const mapHtmlToKonvaPosition =
  ({
    canvas,
    offset,
  }: HtmlToKonvaPositionOptions): ((position: P.Position) => P.Position) =>
  (position) => {
    const canvasRect = canvas.getBoundingClientRect();
    return P.sub(P.sub(position, canvasRect), offset);
  };

export default mapHtmlToKonvaPosition;
