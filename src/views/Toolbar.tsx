import { css } from "@emotion/react";
import { useToolbarController } from "../controllers/ToolbarController";

export const Toolbar = () => {
  const { speed, playButtonText, clear, playOrPause, next, changeSpeed } =
    useToolbarController();

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
        <button type="button" onClick={clear} css={css({ marginRight: 16 })}>
          CLEAR
        </button>
        <button
          type="button"
          onClick={playOrPause}
          css={css({ marginRight: 16 })}
        >
          {playButtonText}
        </button>
        <button type="button" onClick={next}>
          NEXT
        </button>
      </div>
      <div>
        <input
          type="range"
          min={1}
          max={10}
          value={speed}
          onChange={(event) => changeSpeed(event.target.valueAsNumber)}
        />
      </div>
    </div>
  );
};
