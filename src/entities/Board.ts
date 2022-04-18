import { Map } from "immutable";
import * as P from "./Position";

export interface Board {
  readonly aliveCellsPositions: P.Position[];
}

export const create = (): Board => ({ aliveCellsPositions: [] });

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

const getDayingCellsPositions = (board: Board): P.Position[] =>
  board.aliveCellsPositions.filter((position) => {
    const aliveNeighbours = countAliveNeighbours(board, position);
    return aliveNeighbours < 2 || aliveNeighbours > 3;
  });

const getBorningCellsPositions = (board: Board): P.Position[] => {
  const allAliveNeighboursPositions = board.aliveCellsPositions.reduce(
    (acc, position) => [...acc, ...getNeighbours(position)],
    [] as P.Position[]
  );

  const neighboursOccurencesCounts = allAliveNeighboursPositions.reduce(
    (acc, position) =>
      acc.update(P.toString(position), 0, (count) => count + 1),
    Map<string, number>()
  );

  const borningCells = neighboursOccurencesCounts
    .filter((count) => count === 3)
    .keySeq()
    .map(P.fromString)
    .filter((position) => !isAlive(board, position));

  return borningCells.toArray();
};

const countAliveNeighbours = (board: Board, position: P.Position): number =>
  getNeighbours(position).reduce(
    (acc, position) => (isAlive(board, position) ? acc + 1 : acc),
    0
  );

const isAlive = (board: Board, position: P.Position): boolean =>
  board.aliveCellsPositions.some((p) => P.isEqual(p, position));

const getNeighbours = (position: P.Position): P.Position[] => [
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
  (position: P.Position) =>
  <T extends Board>(board: T): T => ({
    ...board,
    aliveCellsPositions: isAlive(board, position)
      ? board.aliveCellsPositions.filter((p) => !P.isEqual(p, position))
      : [...board.aliveCellsPositions, position],
  });
