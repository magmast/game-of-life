import { css } from "@emotion/react";
import { Layer, Rect, Stage } from "react-konva";
import config from "../config";
import { useBoardViewController } from "../controllers/BoardViewController";
import * as Position from "../entities/Position";
import GridView from "./GridView";

const BoardView = () => {
  const {
    aliveCellsPositions,
    offset,
    cellSize,
    handleStageWheel,
    handleStageMouseMove,
    handleStageMouseDown,
    handleStageMouseUp,
  } = useBoardViewController();

  return (
    <Stage
      css={css({ marginBottom: 12 })}
      width={config.viewport.width}
      height={config.viewport.height}
      onWheel={({ evt }) => handleStageWheel(evt)}
      onMouseMove={({ evt }) => handleStageMouseMove(evt)}
      onMouseDown={({ evt }) => handleStageMouseDown(evt)}
      onMouseUp={({ evt }) => handleStageMouseUp(evt)}
    >
      <Layer>
        {aliveCellsPositions.map((cell) => (
          <Rect
            key={Position.toString(cell)}
            x={cell.x * cellSize + offset.x}
            y={cell.y * cellSize + offset.y}
            width={cellSize}
            height={cellSize}
            fill="#000"
          />
        ))}
      </Layer>
      <GridView />
    </Stage>
  );
};

export default BoardView;
