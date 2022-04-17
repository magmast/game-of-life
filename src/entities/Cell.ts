import Position from "./Position";

type Cell = Position;

export default Cell;

export const isEqual = (a: Cell, b: Cell) => a.x === b.x && a.y === b.y;

export const getNeighbours = (cell: Cell): Cell[] => [
  { x: cell.x - 1, y: cell.y - 1 },
  { x: cell.x, y: cell.y - 1 },
  { x: cell.x + 1, y: cell.y - 1 },
  { x: cell.x - 1, y: cell.y },
  { x: cell.x + 1, y: cell.y },
  { x: cell.x - 1, y: cell.y + 1 },
  { x: cell.x, y: cell.y + 1 },
  { x: cell.x + 1, y: cell.y + 1 },
];

export const toString = (cell: Cell) => JSON.stringify(cell);

export const fromString = (str: string): Cell => JSON.parse(str);
