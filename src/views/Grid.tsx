import { Layer, Line } from "react-konva";
import config from "../config";
import { useGridController } from "../controllers/GridController";
import Position from "../entities/Position";

export interface GridProps {
  zoom: number;
  cellSize: number;
  offset: Position;
}

const Grid = ({ zoom, offset, cellSize }: GridProps) => {
  const { lines } = useGridController({ zoom, offset, cellSize });

  return (
    <Layer>
      {lines.map(({ start, end }, index) => (
        <Line
          key={index}
          x={start.x}
          y={start.y}
          points={[0, 0, end.x, end.y]}
          stroke="#999"
          strokeWidth={config.board.cellStrokeWidth * zoom}
        />
      ))}
    </Layer>
  );
};

export default Grid;
