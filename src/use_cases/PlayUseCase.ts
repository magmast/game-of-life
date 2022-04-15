import PlayerRepository from "../repositories/PlayerRepository";
import TickUseCase from "./TickUseCase";

type PlayUseCase = () => void;

export default PlayUseCase;

export interface PlayUseCaseOptions {
  playerRepository: PlayerRepository;
  tick: TickUseCase;
}

export const createPlayUseCase =
  ({ playerRepository, tick }: PlayUseCaseOptions): PlayUseCase =>
  () => {
    const player = playerRepository.get();
    if (player.playing) {
      return;
    }

    playerRepository.set({
      ...player,
      playing: true,
      interval: setInterval(tick, 1000 / player.speed),
    });
  };
