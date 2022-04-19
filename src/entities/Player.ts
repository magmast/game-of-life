export interface Player {
  readonly playing: boolean;
  readonly speed: number;
}

export const create = (): Player => ({
  playing: false,
  speed: 5,
});

export const getTickInterval = (player: Player): number => 1000 / player.speed;

export const play = (player: Player): Player => ({
  ...player,
  playing: true,
});

export const pause = (player: Player): Player => ({
  ...player,
  playing: false,
});

export const changeSpeed =
  (speed: number) =>
  (player: Player): Player => ({
    ...player,
    speed,
  });
