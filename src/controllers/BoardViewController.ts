import toggleCell from "../adapters/use_cases/toggleCell";
import Board from "../entities/Board";
import { State, useStore } from "../store";
import ToggleCellUseCase from "../use_cases/ToggleCellUseCase";

export default interface BoardViewController {
  board: Board;
  toggleCell: ToggleCellUseCase;
}

const selector = ({ board }: State) => board;

export const useBoardViewController = (): BoardViewController => ({
  board: useStore(selector),
  toggleCell,
});
