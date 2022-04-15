import { updateBoard } from "../entities/Board";
import BoardRepository from "../repositories/BoardRepository";

type TickUseCase = () => void;

export default TickUseCase;

export interface TickUseCaseOptions {
  boardRepository: BoardRepository;
}

export const createTickUseCase =
  ({ boardRepository }: TickUseCaseOptions) =>
  () =>
    boardRepository.set(updateBoard(boardRepository.get()));
