import create, { GetState, Mutate, SetState, StoreApi } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import config from "./config";
import Board, { createBoard, toggleCell, updateBoard } from "./entities/Board";
import Player, { createPlayer, getTickInterval } from "./entities/Player";

export interface State {
  board: Board;
  toggleCell(index: number): void;
  clearBoard(): void;
  tick(): void;

  player: Player;
  play: () => void;
  pause: () => void;
  changeSpeed: (value: number) => void;
}

export const useStore = create<
  State,
  SetState<State>,
  GetState<State>,
  Mutate<StoreApi<State>, [["zustand/subscribeWithSelector", never]]>
>(
  subscribeWithSelector((set) => ({
    board: createBoard(config.boardSize),
    toggleCell: (index: number) =>
      set((state) => ({
        board: toggleCell(state.board, index),
      })),
    clearBoard: () => set({ board: createBoard(config.boardSize) }),
    tick: () => set((state) => ({ board: updateBoard(state.board) })),

    player: createPlayer(),
    play: () =>
      set((state) => ({
        player: {
          ...state.player,
          playing: true,
        },
      })),
    pause: () =>
      set((state) => ({
        player: {
          ...state.player,
          playing: false,
        },
      })),
    changeSpeed: (speed) =>
      set((state) => ({
        player: {
          ...state.player,
          speed,
        },
      })),
  }))
);

let interval: number | undefined;

useStore.subscribe(
  ({ player, tick }) => ({ player, tick }),
  ({ player, tick }) => {
    if (interval !== undefined) {
      clearInterval(interval);
    }

    if (player.playing) {
      interval = setInterval(tick, getTickInterval(player));
    }
  }
);
