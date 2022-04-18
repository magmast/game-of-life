import { useAtom } from "jotai";
import { useEffect } from "react";
import { gameAtom } from "../atoms";
import * as G from "../entities/Game";
import * as P from "../entities/Player";

/**
 * A component that displays nothing, but manages ticking the game when it's in
 * playing state.
 */
const Player = (): null => {
  const [game, setGame] = useAtom(gameAtom);

  useEffect(() => {
    if (!game.player.playing) {
      return;
    }

    const interval = setInterval(
      () => setGame(G.tick),
      P.getTickInterval(game.player)
    );

    return () => clearInterval(interval);
  }, [game.player, game.player.playing, setGame]);

  return null;
};

export default Player;
