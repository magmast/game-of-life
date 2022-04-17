export default interface Position {
  x: number;
  y: number;
}

export const add = (a: Position, b: Position): Position => ({
  x: a.x + b.x,
  y: a.y + b.y,
});
