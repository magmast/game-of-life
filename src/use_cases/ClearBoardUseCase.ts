import config from "../config";
import { createBoard } from "../entities/Board";
import BoardRepository from "../repositories/BoardRepository";

type ClearBoardUseCase = () => void;

export default ClearBoardUseCase;

export interface ClearBoardUseCaseOptions {
  boardRepository: BoardRepository;
}

export const createClearBoardUseCase =
  ({ boardRepository }: ClearBoardUseCaseOptions) =>
  () =>
    boardRepository.set(createBoard(config.boardSize));
