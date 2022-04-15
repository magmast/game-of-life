import create, { SetState } from "zustand";
import config from "./config";
import Board, { createBoard } from "./entities/Board";
import Player, { createPlayer } from "./entities/Player";

export interface State {
  board: Board;
  player: Player;
  set: SetState<State>;
}

export const useStore = create<State>((set) => ({
  board: createBoard(config.boardSize),
  player: createPlayer(),
  set,
}));
