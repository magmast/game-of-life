import PlayerRepository from "../repositories/PlayerRepository";
import PauseUseCase from "./PauseUseCase";
import PlayUseCase from "./PlayUseCase";

type ChangeSpeedUseCase = (value: number) => void;

export default ChangeSpeedUseCase;

export interface ChangeSpeedUseCaseOptions {
  playerRepository: PlayerRepository;
  play: PlayUseCase;
  pause: PauseUseCase;
}

export const createChangeSpeedUseCase =
  ({
    playerRepository,
    pause,
    play,
  }: ChangeSpeedUseCaseOptions): ChangeSpeedUseCase =>
  (speed) => {
    const player = playerRepository.get();
    playerRepository.set({ ...player, speed });
    if (player.playing) {
      pause();
      play();
    }
  };
