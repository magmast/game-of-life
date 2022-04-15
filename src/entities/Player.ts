export default interface Player {
  playing: boolean;
  speed: number;
  interval: number | null;
}

export const createPlayer = (): Player => ({
  playing: false,
  speed: 5,
  interval: null,
});
