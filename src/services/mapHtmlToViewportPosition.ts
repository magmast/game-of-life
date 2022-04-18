import * as P from "../entities/Position";

export interface HtmlToViewportPositionOptions {
  /** Konva canvas element. */
  canvas: HTMLCanvasElement;
  /** Camera offset. */
  offset: P.Position;
}

/**
 * Transforms `Position` origin from the HTML document to the Konva canvas.
 */
const mapHtmlToViewportPosition =
  ({
    canvas,
    offset,
  }: HtmlToViewportPositionOptions): ((position: P.Position) => P.Position) =>
  (position) => {
    const canvasRect = canvas.getBoundingClientRect();
    return P.sub(P.sub(position, canvasRect), offset);
  };

export default mapHtmlToViewportPosition;
