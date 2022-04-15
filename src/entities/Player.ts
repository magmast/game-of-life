export default interface Player {
  playing: boolean;
  speed: number;
}

export const createPlayer = (): Player => ({
  playing: false,
  speed: 5,
});

export const getTickInterval = (player: Player): number => 1000 / player.speed;
