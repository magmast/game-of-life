import produce from "immer";
import Board from "../entities/Board";
import { toggleCell } from "../entities/Cell";
import BoardRepository from "../repositories/BoardRepository";

type ToggleCellUseCase = (index: number) => void;

export default ToggleCellUseCase;

export interface ToggleCellUseCaseOptions {
  boardRepository: BoardRepository;
}

export const createToggleCellUseCase =
  ({ boardRepository }: ToggleCellUseCaseOptions): ToggleCellUseCase =>
  (index) =>
    boardRepository.set(
      produce<Board>((board) => {
        board[index] = toggleCell(board[index]);
      })(boardRepository.get())
    );
