import { css } from "@emotion/react";
import { useToolbarController } from "../controllers/ToolbarController";

export const Toolbar = () => {
  const {
    tick,
    clearBoard,

    player,
    play,
    pause,
    changeSpeed,
  } = useToolbarController();

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
          onClick={clearBoard}
          css={css({ marginRight: 16 })}
        >
          CLEAR
        </button>
        <button
          type="button"
          onClick={() => (player.playing ? pause() : play())}
          css={css({ marginRight: 16 })}
        >
          {player.playing ? "PAUSE" : "PLAY"}
        </button>
        <button type="button" onClick={tick}>
          NEXT
        </button>
      </div>
      <div>
        <input
          type="range"
          min={1}
          max={10}
          value={player.speed}
          onChange={(event) => changeSpeed(event.target.valueAsNumber)}
        />
      </div>
    </div>
  );
};
