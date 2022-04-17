import { Map } from "immutable";
import Cell, { getNeighbours, isEqual, toString, fromString } from "./Cell";

/** `Board` is just a collection of alive `Cell`s. */
type Board = Cell[];

export default Board;

export const createBoard = (): Board => [];

export const updateBoard = (board: Board): Board => {
  const dayingCells = getDayingCells(board);
  const borningCells = getBorningCells(board);
  return [...board, ...borningCells].filter(
    (cell) => !dayingCells.includes(cell)
  );
};

export const toggleCell = (board: Board, cell: Cell): Board =>
  isAlive(board, cell)
    ? board.filter((c) => !isEqual(cell, c))
    : [...board, cell];

export const isAlive = (board: Board, cell: Cell): boolean =>
  board.some((c) => isEqual(c, cell));

const getDayingCells = (board: Board): Cell[] =>
  board.filter((cell) => {
    const aliveNeighbours = countAliveNeighbours(board, cell);
    return aliveNeighbours < 2 || aliveNeighbours > 3;
  });

const getBorningCells = (board: Board): Cell[] => {
  const allAliveCellsNeighbours = board.reduce(
    (acc, cell) => [...acc, ...getNeighbours(cell)],
    [] as Cell[]
  );

  const neighboursOccurenceCounts = allAliveCellsNeighbours.reduce(
    (acc, cell) => acc.update(toString(cell), 0, (count) => count + 1),
    Map<string, number>()
  );

  const borningCells = neighboursOccurenceCounts
    .filter((count) => count === 3)
    .keySeq()
    .map((str) => fromString(str))
    .filter((cell) => !isAlive(board, cell));

  return borningCells.toArray();
};

const countAliveNeighbours = (board: Board, cell: Cell): number =>
  getNeighbours(cell).reduce(
    (acc, cell) => (isAlive(board, cell) ? acc + 1 : acc),
    0
  );
