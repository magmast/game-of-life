import { Layer, Line } from "react-konva";
import { useGridViewController } from "../controllers/GridViewController";

const GridView = () => {
  const { grid, strokeWidth } = useGridViewController();

  return (
    <Layer>
      {grid.map(({ start, end }, index) => (
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

export default GridView;
