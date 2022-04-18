import { atom } from "jotai";
import config from "./config";
import * as Game from "./entities/Game";

export const gameAtom = atom(
  Game.create({
    boardSize: config.board,
    viewportConfig: config.viewport,
  })
);
