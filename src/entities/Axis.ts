export type Axis = "x" | "y";

export const perpendicular = (axis: Axis): Axis => {
  switch (axis) {
    case "x":
      return "y";
    case "y":
      return "x";
  }
};
