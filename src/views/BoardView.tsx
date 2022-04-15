import { css } from "@emotion/react";
import CellView from "./CellView";
import { getBoardSize } from "../entities/Board";
import config from "../config";
import { State, useStore } from "../store";

const selector = ({ board, toggleCell }: State) => ({ board, toggleCell });

const BoardView = () => {
  const { board, toggleCell } = useStore(selector);

  return (
    <div
      css={css({
        width: config.board.width,
        height: config.board.height,
        display: "flex",
        flexWrap: "wrap",
        marginBottom: 16,
      })}
    >
      {board.map((cell, index) => (
        <CellView
          key={index}
          cell={cell}
          width={config.board.width / getBoardSize(board) + 1}
          height={config.board.height / getBoardSize(board) + 1}
          onClick={() => toggleCell(index)}
        />
      ))}
    </div>
  );
};

export default BoardView;
