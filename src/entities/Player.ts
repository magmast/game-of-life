export interface Player {
  readonly playing: boolean;
  readonly speed: number;
}

export const create = (): Player => ({
  playing: false,
  speed: 5,
});

export const getTickInterval = (player: Player): number => 1000 / player.speed;
