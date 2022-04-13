import { css } from "@emotion/react";

export enum Cell {
  dead,
  alive,
}

export const map = <T extends unknown>(
  cell: Cell,
  { alive, dead }: { alive: () => T; dead: () => T }
) => {
  switch (cell) {
    case Cell.alive:
      return alive();
    case Cell.dead:
      return dead();
  }
};

export const toggle = (state: Cell) => {
  switch (state) {
    case Cell.alive:
      return Cell.dead;
    case Cell.dead:
      return Cell.alive;
  }
};

export interface CellViewProps {
  cell: Cell;
  onChange: (cell: Cell) => void;
  width: number;
  height: number;
}

export const CellView = ({ width, height, cell, onChange }: CellViewProps) => (
  <button
    css={css({
      background: map(cell, {
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
        background: map(cell, { alive: () => "#333", dead: () => "#CCC" }),
      },
    })}
    type="button"
    onClick={() => onChange(toggle(cell))}
  />
);
