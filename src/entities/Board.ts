import Cell, { toggleCell as cellToggleCell } from "./Cell";
import { range } from "../utils";
import produce from "immer";

type Board = Cell[];

export default Board;

export const createBoard = (size: number): Board =>
  range(size * size).map(() => Cell.dead);

export const getBoardSize = (board: Board): number => Math.sqrt(board.length);

export const updateBoard = (board: Board): Board =>
  board.map((cell, index) => {
    const neighbours = countAliveNeighbours(board, index);

    if (cell === Cell.alive && (neighbours === 2 || neighbours === 3)) {
      return Cell.alive;
    }

    if (cell === Cell.dead && neighbours === 3) {
      return Cell.alive;
    }

    return Cell.dead;
  });

export const getNeighbourIndexes = (board: Board, cellIndex: number) => {
  const boardSize = getBoardSize(board);

  const neighbours = [
    cellIndex - boardSize - 1,
    cellIndex - boardSize,
    cellIndex - boardSize + 1,
    cellIndex + boardSize - 1,
    cellIndex + boardSize,
    cellIndex + boardSize + 1,
  ].filter((index) => index >= 0 && index < board.length);

  const isOnLeftEdge = cellIndex % boardSize === 0;
  if (!isOnLeftEdge) {
    neighbours.push(cellIndex - 1);
  }

  const isOnRightEdge = cellIndex % boardSize === boardSize - 1;
  if (!isOnRightEdge) {
    neighbours.push(cellIndex + 1);
  }

  return neighbours;
};

export const countAliveNeighbours = (board: Board, cellIndex: number): number =>
  getNeighbourIndexes(board, cellIndex).reduce(
    (count, index) => (board[index] === Cell.alive ? count + 1 : count),
    0
  );

export const toggleCell = (board: Board, cellIndex: number): Board =>
  produce<Board>((board) => {
    board[cellIndex] = cellToggleCell(board[cellIndex]);
  })(board);
