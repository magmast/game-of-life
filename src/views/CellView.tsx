import { css } from "@emotion/react";
import CellEntity, { mapCell } from "../entities/Cell";

export interface CellViewProps {
  cell: CellEntity;
  onClick: () => void;
  width: number;
  height: number;
}

const CellView = ({ width, height, cell, onClick }: CellViewProps) => (
  <button
    css={css({
      background: mapCell(cell, {
        alive: () => "black",
        dead: () => "transparent",
      }),
      border: "1px solid gray",
      margin: "-0.5px -0.5px -0.5px -0.5px",
      boxSizing: "border-box",
      width: width,
      height: height,
      cursor: "pointer",
      "&:hover": {
        background: mapCell(cell, { alive: () => "#333", dead: () => "#CCC" }),
      },
    })}
    type="button"
    onClick={onClick}
  />
);

export default CellView;
