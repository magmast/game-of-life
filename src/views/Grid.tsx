import { Layer, Line } from "react-konva";
import { useGridController } from "../controllers/GridController";

const Grid = () => {
  const { lines, strokeWidth } = useGridController();

  return (
    <Layer>
      {lines.map(({ start, end }, index) => (
        <Line
          key={index}
          x={start.x}
          y={start.y}
          points={[0, 0, end.x, end.y]}
          stroke="#999"
          strokeWidth={strokeWidth}
        />
      ))}
    </Layer>
  );
};

export default Grid;
