import { css } from "@emotion/react";
import produce from "immer";
import { Cell, CellView } from "./cell";
import { range } from "./utils";

export type Board = Cell[];

export const create = (size: number): Board =>
  range(size * size).map(() => Cell.dead);

export const size = (board: Board): number => Math.sqrt(board.length);

export const update = (board: Board): Board =>
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

export const neighbours = (board: Board, cellIndex: number) => {
  const boardSize = size(board);

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
  neighbours(board, cellIndex).reduce(
    (count, index) => (board[index] === Cell.alive ? count + 1 : count),
    0
  );

export interface BoardViewProps {
  width: number;
  height: number;
  board: Board;
  onBoardChange: (board: Board) => void;
}

export const BoardView = ({
  width,
  height,
  board,
  onBoardChange,
}: BoardViewProps) => (
  <div
    css={css({
      width: width,
      height: height,
      display: "flex",
      flexWrap: "wrap",
      marginBottom: 16,
    })}
  >
    {board.map((cell, index) => (
      <CellView
        key={index}
        cell={cell}
        width={width / size(board) + 1}
        height={height / size(board) + 1}
        onChange={(cell) =>
          onBoardChange(
            produce((board) => {
              board[index] = cell;
            })(board)
          )
        }
      />
    ))}
  </div>
);
