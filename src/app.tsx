import { css } from "@emotion/react";
import { useCallback, useEffect, useState } from "react";
import { useImmer } from "use-immer";
import { Board, create, update } from "./board";
import { BoardView } from "./board";
import { Toolbar } from "./toolbar";

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;
const BOARD_SIZE = 30;

interface AppState {
  board: Board;
  tick: () => void;
  clear: () => void;
  setBoard: (value: Board) => void;

  playing: boolean;
  play: () => void;
  pause: () => void;

  speed: number;
  setSpeed: (value: number) => void;
}

const useAppController = (): AppState => {
  const [board, setBoard] = useImmer(() => create(BOARD_SIZE));
  const [speed, setSpeed] = useState(5);
  const [playing, setPlaying] = useState(false);

  const tick = useCallback(() => setBoard(update(board)), [board, setBoard]);

  useEffect(() => {
    if (!playing) {
      return;
    }

    const interval = setInterval(tick, 1000 / speed);
    return () => clearInterval(interval);
  }, [playing, speed, tick]);

  return {
    board,
    setBoard,
    tick,
    clear: () => setBoard(() => create(BOARD_SIZE)),

    speed: speed,
    setSpeed,

    playing,
    play: () => setPlaying(true),
    pause: () => setPlaying(false),
  };
};

export const App = () => {
  const {
    board,
    setBoard,
    tick,
    clear,

    playing,
    play,
    pause,

    speed,
    setSpeed,
  } = useAppController();

  return (
    <div
      css={css({
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      })}
    >
      <BoardView
        board={board}
        height={CANVAS_HEIGHT}
        width={CANVAS_WIDTH}
        onBoardChange={setBoard}
      />

      <Toolbar
        onClear={clear}
        onNext={tick}
        onPause={pause}
        onPlay={play}
        onPlaySpeedChange={setSpeed}
        speed={speed}
        playing={playing}
      />
    </div>
  );
};
