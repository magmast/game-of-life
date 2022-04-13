import { css } from "@emotion/react";

export interface ToolbarProps {
  playing: boolean;
  onPlay: () => void;
  onPause: () => void;

  speed: number;
  onPlaySpeedChange: (value: number) => void;

  onNext: () => void;
  onClear: () => void;
}

export const Toolbar = ({
  playing,
  onPlay,
  onPause,
  speed,
  onPlaySpeedChange,
  onNext,
  onClear,
}: ToolbarProps) => (
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
      <button type="button" onClick={onClear} css={css({ marginRight: 16 })}>
        CLEAR
      </button>
      <button
        type="button"
        onClick={() => (playing ? onPause() : onPlay())}
        css={css({ marginRight: 16 })}
      >
        {playing ? "PAUSE" : "PLAY"}
      </button>
      <button type="button" onClick={onNext}>
        NEXT
      </button>
    </div>
    <div>
      <input
        type="range"
        min={1}
        max={10}
        value={speed}
        onChange={(event) => onPlaySpeedChange(event.target.valueAsNumber)}
      />
    </div>
  </div>
);
