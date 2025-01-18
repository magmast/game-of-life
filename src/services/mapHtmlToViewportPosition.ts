import * as Position from "../entities/Position";

export interface HtmlToViewportPositionOptions {
  /** Konva canvas element. */
  canvas: HTMLCanvasElement;
  /** Camera offset. */
  offset: Position.Position;
}

/**
 * Transforms `Position` origin from the HTML document to the Konva canvas.
 */
const mapHtmlToViewportPosition =
  ({
    canvas,
    offset,
  }: HtmlToViewportPositionOptions): ((
    position: Position.Position,
  ) => Position.Position) =>
  (position) => {
    const canvasRect = canvas.getBoundingClientRect();
    return Position.sub(Position.sub(position, canvasRect), offset);
  };

export default mapHtmlToViewportPosition;
