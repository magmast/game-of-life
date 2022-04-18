import * as Board from "./Board";
import { Dimensions } from "./Dimensions";
import * as Player from "./Player";
import * as Position from "./Position";
import * as Viewport from "./Viewport";

export interface Game {
  board: Board.Board;
  player: Player.Player;
  viewport: Viewport.Viewport;
}

export interface GameOptions {
  boardSize: Dimensions;
  viewportConfig: Viewport.ViewportConfig;
}

export const create = ({ boardSize, viewportConfig }: GameOptions): Game => ({
  board: Board.create(),
  player: Player.create(),
  viewport: Viewport.create(boardSize, viewportConfig),
});

export const tick = <T extends Game>(game: T): T => ({
  ...game,
  board: Board.tick(game.board),
});

/**
 * Toggles cell at `position`. Position is expected to be relative to the
 * viewport not the board.
 */
export const toggleCell =
  (position: Position.Position): (<T extends Game>(game: T) => T) =>
  (game) => {
    return {
      ...game,
      board: Board.toggleCell(
        Viewport.getBoardPosition(position, game.viewport)
      )(game.board),
    };
  };

export const clearBoard = <T extends Game>(game: T): T => ({
  ...game,
  board: Board.create(),
});

export const zoom =
  (value: number): (<T extends Game>(game: T) => T) =>
  (game) => ({
    ...game,
    viewport: Viewport.zoom(value)(game.viewport),
  });

export const move =
  (position: Position.Position): (<T extends Game>(game: T) => T) =>
  (game) => ({
    ...game,
    viewport: Viewport.move(position)(game.viewport),
  });

export const getCellSize = ({ viewport }: Game): number =>
  Viewport.getCellSize(viewport);

export const pause = <T extends Game>(game: T): T => ({
  ...game,
  player: {
    ...game.player,
    playing: false,
  },
});

export const play = <T extends Game>(game: T): T => ({
  ...game,
  player: {
    ...game.player,
    playing: true,
  },
});

export const changeSpeed =
  (speed: number): (<T extends Game>(game: T) => T) =>
  (game) => ({
    ...game,
    player: {
      ...game.player,
      speed,
    },
  });
