import { useAtom, useSetAtom } from "jotai";
import { boardAtom, playerAtom } from "../atoms";
import * as Board from "../entities/Board";
import * as Player from "../entities/Player";

export default interface ToolbarController {
  playButtonText: string;
  speed: number;
  clear: () => void;
  playOrPause: () => void;
  next: () => void;
  changeSpeed: (speed: number) => void;
}

export const useToolbarController = (): ToolbarController => {
  const [player, setPlayer] = useAtom(playerAtom);
  const setBoard = useSetAtom(boardAtom);

  return {
    speed: player.speed,
    playButtonText: player.playing ? "PAUSE" : "PLAY",
    clear: () => setBoard(Board.clear),
    playOrPause: () =>
      player.playing ? setPlayer(Player.pause) : setPlayer(Player.play),
    next: () => setBoard(Board.tick),
    changeSpeed: (speed) => setPlayer(Player.changeSpeed(speed)),
  };
};
