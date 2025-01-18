import { useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";

import { boardAtom, playerAtom } from "../atoms";
import * as Board from "../entities/Board";
import * as Player from "../entities/Player";

/**
 * A component that displays nothing, but manages ticking the game when it's in
 * playing state.
 */
const PlayerView = (): null => {
  const [player, setPlayer] = useAtom(playerAtom);
  const setBoard = useSetAtom(boardAtom);

  useEffect(() => {
    if (!player.playing) {
      return;
    }

    const interval = setInterval(
      () => setBoard(Board.tick),
      Player.getTickInterval(player),
    );

    return () => clearInterval(interval);
  }, [player, setBoard, setPlayer]);

  return null;
};

export default PlayerView;
