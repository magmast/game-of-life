import { Axis } from "./Axis";

export interface Dimensions {
  width: number;
  height: number;
}

export const getByAxis =
  (axis: Axis): ((dimensions: Dimensions) => number) =>
  (dimensions) => {
    switch (axis) {
      case "x":
        return dimensions.width;
      case "y":
        return dimensions.height;
    }
  };
