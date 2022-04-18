import create, { GetState, Mutate, SetState, StoreApi } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import * as Board from "./entities/Board";
import * as Player from "./entities/Player";
import * as Position from "./entities/Position";

export interface State {
  board: Board.Board;
  toggleCell(position: Position.Position): void;
  clearBoard(): void;
  tick(): void;

  player: Player.Player;
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
    board: Board.create(),
    toggleCell: (position) =>
      set((state) => ({
        board: Board.toggleCell(position)(state.board),
      })),
    clearBoard: () => set({ board: Board.create() }),
    tick: () => set((state) => ({ board: Board.tick(state.board) })),

    player: Player.create(),
    play: () =>
      set((state) => ({
        player: { ...state.player, playing: true },
      })),
    pause: () =>
      set((state) => ({
        player: { ...state.player, playing: false },
      })),
    changeSpeed: (speed) =>
      set((state) => ({
        player: { ...state.player, speed },
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
      interval = setInterval(tick, Player.getTickInterval(player));
    }
  }
);
