import { Map } from "immutable";
import * as Position from "./Position";

export interface Board {
  readonly aliveCellsPositions: Position.Position[];
}

export const create = (): Board => ({ aliveCellsPositions: [] });

export const clear = (board: Board): Board => ({
  ...board,
  aliveCellsPositions: [],
});

export const tick = <T extends Board>(board: T): T => {
  const dayingCells = getDayingCellsPositions(board);
  const borningCells = getBorningCellsPositions(board);

  return {
    ...board,
    aliveCellsPositions: [...board.aliveCellsPositions, ...borningCells].filter(
      (cell) => !dayingCells.includes(cell)
    ),
  };
};

const getDayingCellsPositions = (board: Board): Position.Position[] =>
  board.aliveCellsPositions.filter((position) => {
    const aliveNeighbours = countAliveNeighbours(board, position);
    return aliveNeighbours < 2 || aliveNeighbours > 3;
  });

const getBorningCellsPositions = (board: Board): Position.Position[] => {
  const allAliveNeighboursPositions = board.aliveCellsPositions.reduce(
    (acc, position) => [...acc, ...getNeighbours(position)],
    [] as Position.Position[]
  );

  const neighboursOccurencesCounts = allAliveNeighboursPositions.reduce(
    (acc, position) =>
      acc.update(Position.toString(position), 0, (count) => count + 1),
    Map<string, number>()
  );

  const borningCells = neighboursOccurencesCounts
    .filter((count) => count === 3)
    .keySeq()
    .map(Position.fromString)
    .filter((position) => !isAlive(board, position));

  return borningCells.toArray();
};

const countAliveNeighbours = (
  board: Board,
  position: Position.Position
): number =>
  getNeighbours(position).reduce(
    (acc, position) => (isAlive(board, position) ? acc + 1 : acc),
    0
  );

const isAlive = (board: Board, position: Position.Position): boolean =>
  board.aliveCellsPositions.some((p) => Position.isEqual(p, position));

const getNeighbours = (position: Position.Position): Position.Position[] => [
  { x: position.x - 1, y: position.y - 1 },
  { x: position.x, y: position.y - 1 },
  { x: position.x + 1, y: position.y - 1 },
  { x: position.x - 1, y: position.y },
  { x: position.x + 1, y: position.y },
  { x: position.x - 1, y: position.y + 1 },
  { x: position.x, y: position.y + 1 },
  { x: position.x + 1, y: position.y + 1 },
];

export const toggleCell =
  (position: Position.Position) =>
  <T extends Board>(board: T): T => ({
    ...board,
    aliveCellsPositions: isAlive(board, position)
      ? board.aliveCellsPositions.filter((p) => !Position.isEqual(p, position))
      : [...board.aliveCellsPositions, position],
  });
