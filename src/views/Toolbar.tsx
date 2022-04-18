import { css } from "@emotion/react";
import { useAtom } from "jotai";
import * as G from "../entities/Game";
import { gameAtom } from "../atoms";

export const Toolbar = () => {
  const [game, setGame] = useAtom(gameAtom);

  return (
    <div
      css={css({
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      })}
    >
      <div
        css={css({
          marginBottom: 12,
        })}
      >
        <button
          type="button"
          onClick={() => setGame(G.clearBoard)}
          css={css({ marginRight: 16 })}
        >
          CLEAR
        </button>
        <button
          type="button"
          onClick={() =>
            setGame(game.player.playing ? G.pause(game) : G.play(game))
          }
          css={css({ marginRight: 16 })}
        >
          {game.player.playing ? "PAUSE" : "PLAY"}
        </button>
        <button type="button" onClick={() => setGame(G.tick)}>
          NEXT
        </button>
      </div>
      <div>
        <input
          type="range"
          min={1}
          max={10}
          value={game.player.speed}
          onChange={(event) =>
            setGame(G.changeSpeed(event.target.valueAsNumber))
          }
        />
      </div>
    </div>
  );
};
