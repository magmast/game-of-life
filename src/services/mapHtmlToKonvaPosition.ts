import Position from "../entities/Position";

export interface HtmlToKonvaPositionOptions {
  /** Position to be mapped. */
  position: Position;
  /** Konva canvas element. */
  canvas: HTMLCanvasElement;
  /** Camera offset. */
  offset: Position;
}

/**
 * Transforms `Position` origin from the HTML document to the Konva canvas.
 */
const mapHtmlToKonvaPosition = ({
  position,
  canvas,
  offset,
}: HtmlToKonvaPositionOptions): Position => {
  const canvasRect = canvas.getBoundingClientRect();
  return {
    x: position.x - canvasRect.x - offset.x,
    y: position.y - canvasRect.y - offset.y,
  };
};

export default mapHtmlToKonvaPosition;
