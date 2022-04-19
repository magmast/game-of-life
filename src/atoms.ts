import { atom } from "jotai";
import config from "./config";
import * as Board from "./entities/Board";
import * as Grid from "./entities/Grid";
import * as Viewport from "./entities/Viewport";
import * as Player from "./entities/Player";

export const viewportAtom = atom(
  Viewport.create(config.viewport, {
    ...config.viewport,
    cellSize: config.cell.size,
  })
);

export const playerAtom = atom(Player.create());

export const boardAtom = atom(Board.create());

export const gridAtom = atom((get) => Grid.create(get(viewportAtom)));
