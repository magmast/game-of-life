export interface Position {
  readonly x: number;
  readonly y: number;
}

export const add = (lhs: Position, rhs: Position): Position => ({
  x: lhs.x + rhs.x,
  y: lhs.y + rhs.y,
});

export const sub = (lhs: Position, rhs: Position): Position => ({
  x: lhs.x - rhs.x,
  y: lhs.y - rhs.y,
});

export const isEqual = (lhs: Position, rhs: Position): boolean =>
  lhs.x === rhs.x && lhs.y === rhs.y;

export const toString = (p: Position): string => `(${p.x}, ${p.y})`;

export const fromString = (str: string): Position => {
  const [x, y] = str.substring(1, str.length - 1).split(", ");
  return { x: parseFloat(x), y: parseFloat(y) };
};
