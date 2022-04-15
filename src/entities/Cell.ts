enum Cell {
  dead,
  alive,
}

export default Cell;

export const mapCell = <T>(
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

export const toggleCell = (state: Cell) => {
  switch (state) {
    case Cell.alive:
      return Cell.dead;
    case Cell.dead:
      return Cell.alive;
  }
};
